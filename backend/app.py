# backend/app.py
import os
import uuid
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from dotenv import load_dotenv

# File extractors
from pdfminer.high_level import extract_text as extract_pdf_text
import docx
import re

# ML Pipeline helpers
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
    """Split doc into clauses and classify them"""
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

# ==== LLM Setup ====
import google.genai as genai
from groq import Groq

load_dotenv()
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
google_client = genai.Client(api_key=GOOGLE_API_KEY) if GOOGLE_API_KEY else None
groq_client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

DOCS = {}

def extract_text(path):
    ext = path.split(".")[-1].lower()
    if ext == "pdf":
        return extract_pdf_text(path)
    elif ext == "docx":
        doc = docx.Document(path)
        return "\n".join([p.text for p in doc.paragraphs])
    elif ext == "txt":
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()
    return ""

def call_llm(prompt, mode="summary"):
    if groq_client:
        model = "llama-3.1-8b-instant" if mode == "summary" else "llama-3.3-70b-versatile"
        resp = groq_client.chat.completions.create(
            model=model, messages=[{"role": "user", "content": prompt}]
        )
        return resp.choices[0].message.content.strip()
    elif google_client:
        model = "gemini-1.5-flash" if mode == "summary" else "gemini-1.5-pro"
        resp = google_client.models.generate_content(model=model, contents=prompt)
        return resp.candidates[0].content.parts[0].text.strip()
    return "No LLM available"

# ==== Flask App ====
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/api/upload", methods=["POST"])
def upload():
    if "file" not in request.files:
        return jsonify({"error": "No file"}), 400
    file = request.files["file"]
    filename = secure_filename(file.filename)
    path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(path)

    text = extract_text(path)
    if not text.strip():
        return jsonify({"error": "No text extracted"}), 400

    doc_id = str(uuid.uuid4())
    DOCS[doc_id] = text

    # Run ML pipeline
    pipeline_result = pipeline_analysis(text)

    # LLM Summary
    prompt = f"Summarize this legal document in plain English:\n\n{pipeline_result['refined_text'][:4000]}"
    summary = call_llm(prompt, mode="summary")

    # LLM Risk Analysis
    risk_prompt = f"Based on the following extracted clauses, explain in plain English which clauses might be problematic for a user:\n\n{pipeline_result['refined_text'][:4000]}"
    risks = call_llm(risk_prompt, mode="qa")

    return jsonify({
        "doc_id": doc_id,
        "summary": summary,
        "risks": risks,
        "clauses": pipeline_result["clauses"]
    })

@app.route("/api/query", methods=["POST"])
def query():
    data = request.json
    doc_id = data.get("doc_id")
    question = data.get("question")
    if not doc_id or doc_id not in DOCS:
        return jsonify({"error": "Invalid doc_id"}), 400

    context = DOCS[doc_id]
    prompt = f"""
    Use only the following document to answer.
    Document: {context[:8000]}
    Question: {question}
    Answer:
    """
    answer = call_llm(prompt, mode="qa")
    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)
