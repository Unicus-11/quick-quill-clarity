# backend/app.py
import os
import uuid
import re
import json
from io import BytesIO
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from dotenv import load_dotenv

# ==== File Extractors ====
from pdfminer.high_level import extract_text as extract_pdf_text
import docx
import requests

# ============================================================
#                  HELPER FUNCTIONS (ML PIPELINE)
# ============================================================

def classify_clause(text: str) -> str:
    """Classify clause by simple keywords"""
    text_lower = text.lower()
    if any(w in text_lower for w in ["payment", "fees", "amount", "invoice", "due"]):
        return "Payment"
    elif any(w in text_lower for w in ["terminate", "termination", "cancel", "end contract"]):
        return "Termination"
    elif any(w in text_lower for w in ["confidential", "privacy", "disclosure", "secret"]):
        return "Confidentiality"
    elif any(w in text_lower for w in ["penalty", "fine", "charge", "liability", "breach"]):
        return "Penalty"
    else:
        return "General"


def risk_score(text: str) -> str:
    """Assign Low/Medium/High risk"""
    text_lower = text.lower()
    if any(w in text_lower for w in ["penalty", "terminate", "lawsuit", "breach", "liability"]):
        return "High"
    elif any(w in text_lower for w in ["fees", "confidential", "disclosure", "privacy"]):
        return "Medium"
    else:
        return "Low"


def extract_clauses(text: str):
    """Split document text into clauses and classify them"""
    sentences = re.split(r'(?<=[.!?]) +', text)
    results = []
    for sent in sentences:
        if len(sent.strip()) < 10:
            continue
        category = classify_clause(sent)
        risk = risk_score(sent)
        results.append({
            "clause": sent.strip(),
            "category": category,
            "risk": risk
        })
    return results


def pipeline_analysis(doc_text: str):
    """Run ML pipeline and prepare refined text for LLM"""
    clauses = extract_clauses(doc_text)
    refined_text = "### Extracted Clauses with Risks ###\n"
    for c in clauses:
        refined_text += f"[{c['category']} | Risk: {c['risk']}] {c['clause']}\n"
    return {"clauses": clauses, "refined_text": refined_text}


# ============================================================
#                    LLM SETUP (GROQ)
# ============================================================


  # ============================================================
#                    LLM SETUP (GROQ)
# ============================================================

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    print("⚠️ Missing GROQ_API_KEY in .env")

# Correct active models
SUMMARY_MODEL = "llama-3.1-8b-instant"
QA_MODEL = "llama-3.1-70b-versatile"
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

def call_llm(prompt: str, mode: str = "summary") -> str:
    """Call Groq's OpenAI-compatible API endpoint"""
    if not GROQ_API_KEY:
        return "LLM unavailable (GROQ_API_KEY not set)."

    model = SUMMARY_MODEL if mode == "summary" else QA_MODEL
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    body = {
        "model": model,
        "messages": [
            {"role": "system", "content": "You are an expert legal assistant."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 512,
        "temperature": 0.3
    }

    try:
        r = requests.post(GROQ_API_URL, headers=headers, data=json.dumps(body), timeout=30)
        r.raise_for_status()
        data = r.json()
        return data["choices"][0]["message"]["content"].strip()
    except requests.exceptions.HTTPError as e:
        return f"Groq request failed: {r.status_code} - {r.text}"
    except Exception as e:
        return f"Groq request failed: {str(e)}"


# ============================================================
#                        FLASK APP
# ============================================================

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

DOCS = {}


@app.route("/")
def home():
    return "<h1>Welcome to Quick Quill Clarity Backend (Groq Version)</h1>"


# ------------------------------------------------------------
#                 UPLOAD AND PROCESS DOCUMENT
# ------------------------------------------------------------
@app.route("/api/upload", methods=["POST"])
def upload():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    filename = secure_filename(file.filename)
    ext = filename.split(".")[-1].lower()

    # Extract text from file in-memory
    text = ""
    try:
        if ext == "pdf":
            pdf_bytes = BytesIO(file.read())
            text = extract_pdf_text(pdf_bytes)
        elif ext == "docx":
            doc = docx.Document(BytesIO(file.read()))
            text = "\n".join([p.text for p in doc.paragraphs])
        elif ext == "txt":
            text = file.read().decode("utf-8", errors="ignore")
        else:
            return jsonify({"error": "Unsupported file type"}), 400
    except Exception as e:
        return jsonify({"error": f"Failed to read file: {e}"}), 500

    if not text.strip():
        return jsonify({"error": "No readable text found in document"}), 400

    # Store document in memory
    doc_id = str(uuid.uuid4())
    DOCS[doc_id] = text

    # Run local ML pipeline
    pipeline_result = pipeline_analysis(text)

    # Create prompts for Groq
    summary_prompt = f"Summarize this legal document in plain English:\n\n{pipeline_result['refined_text'][:4000]}"
    risk_prompt = f"Based on the extracted clauses, explain which clauses might be risky for a user:\n\n{pipeline_result['refined_text'][:4000]}"

    # LLM responses
    summary = call_llm(summary_prompt, mode="summary")
    risks = call_llm(risk_prompt, mode="qa")

    return jsonify({
        "doc_id": doc_id,
        "summary": summary,
        "risks": risks,
        "clauses": pipeline_result["clauses"]
    })


# ------------------------------------------------------------
#                        QUERY ROUTE
# ------------------------------------------------------------
@app.route("/api/query", methods=["POST"])
def query():
    data = request.get_json()
    doc_id = data.get("doc_id")
    question = data.get("question")

    if not doc_id or doc_id not in DOCS:
        return jsonify({"error": "Invalid document ID"}), 400
    if not question:
        return jsonify({"error": "No question provided"}), 400

    context = DOCS[doc_id]
    query_prompt = f"""
    Use only the following document content to answer the question.

    Document:
    {context[:8000]}

    Question:
    {question}

    Answer:
    """
    answer = call_llm(query_prompt, mode="qa")
    return jsonify({"answer": answer})


# ------------------------------------------------------------
#                        MAIN ENTRY
# ------------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
