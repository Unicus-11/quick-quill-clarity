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

# LLM Clients
import google.genai as genai
from groq import Groq

load_dotenv()

# ==== Config ====
UPLOAD_FOLDER = "uploads"
ALLOWED_EXT = {"pdf", "docx", "txt"}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# API Keys
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not (GOOGLE_API_KEY or GROQ_API_KEY):
    raise RuntimeError("Please set either GOOGLE_API_KEY or GROQ_API_KEY in .env")

# Init clients
google_client = genai.Client(api_key=GOOGLE_API_KEY) if GOOGLE_API_KEY else None
groq_client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

# In-memory storage for uploaded documents
DOCS = {}

# ==== Flask App ====
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# ---- Helpers ----
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

def call_llm(prompt, model="summary"):
    """
    Wrapper to call either Google or Groq model.
    """
    if groq_client:  # Prefer Groq for dev
        chosen_model = "llama-3.1-8b-instant" if model == "summary" else "llama-3.3-70b-versatile"
        response = groq_client.chat.completions.create(
            model=chosen_model,
            messages=[{"role": "user", "content": prompt}],
        )
        return response.choices[0].message.content.strip()

    elif google_client:  # Fallback to Google
        chosen_model = "gemini-1.5-flash" if model == "summary" else "gemini-1.5-pro"
        response = google_client.models.generate_content(
            model=chosen_model,
            contents=prompt,
        )
        return response.candidates[0].content.parts[0].text.strip()

    else:
        return "No LLM client available."

# ==== Routes ====
@app.route("/")
def home():
    return "✅ Backend is running!"

@app.route("/api/upload", methods=["POST"])
def upload():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    # Save file
    filename = secure_filename(file.filename)
    path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(path)

    # Extract text
    text = extract_text(path)
    if not text.strip():
        return jsonify({"error": "Could not extract text from document"}), 400

    # Store doc text in memory
    doc_id = str(uuid.uuid4())
    DOCS[doc_id] = text

    # Summarize
    summary_prompt = f"Summarize this legal document in plain English:\n\n{text[:4000]}"
    summary = call_llm(summary_prompt, model="summary")

    # Risk analysis
    risk_prompt = f"Identify any potential risks, unfair clauses, penalties, or hidden obligations in this legal document. Explain in plain English:\n\n{text[:4000]}"
    risks = call_llm(risk_prompt, model="qa")

    return jsonify({
        "doc_id": doc_id,
        "summary": summary,
        "risks": risks
    })

@app.route("/api/query", methods=["POST"])
def query():
    data = request.json
    doc_id = data.get("doc_id")
    question = data.get("question")

    if not doc_id or doc_id not in DOCS:
        return jsonify({"error": "Invalid doc_id"}), 400
    if not question:
        return jsonify({"error": "No question provided"}), 400

    context = DOCS[doc_id]
    prompt = f"""
    You are a helpful AI legal assistant.
    Answer the question ONLY using the following document.

    Document:
    {context[:8000]}

    Question: {question}
    Answer:
    """
    answer = call_llm(prompt, model="qa")

    return jsonify({"answer": answer})

# ==== Run App ====
if __name__ == "__main__":
    app.run(debug=True)
