# backend/app.py
import os
import uuid
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from dotenv import load_dotenv

# Load env vars
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Google Gen AI SDK
from google import genai
from google.genai import types

# Text extractors
from pdfminer.high_level import extract_text as extract_pdf_text
import docx

# ---- Config ----
UPLOAD_FOLDER = "uploads"
ALLOWED_EXT = {"pdf", "docx", "txt"}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

API_KEY = os.getenv("GOOGLE_API_KEY")
GEN_AI_MODEL = os.getenv("GEN_AI_MODEL", "gemini-1.5-flash")  # default fast model

if not API_KEY:
    raise RuntimeError("Set GOOGLE_API_KEY in .env")

client = genai.Client(api_key=API_KEY)


# ---- Helper: Extract text ----
def extract_text(path):
    if path.endswith(".pdf"):
        return extract_pdf_text(path)
    elif path.endswith(".docx"):
        doc = docx.Document(path)
        return "\n".join([p.text for p in doc.paragraphs])
    elif path.endswith(".txt"):
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    else:
        return ""


# ---- Routes ----
@app.route("/", methods=["GET"])
def index():
    return "✅ Backend is running!"


@app.route("/api/upload", methods=["POST"])
def upload():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "Empty filename"}), 400

        # Save file
        filename = secure_filename(file.filename)
        path = os.path.join(UPLOAD_FOLDER, f"{uuid.uuid4()}_{filename}")
        file.save(path)

        # Extract text
        text = extract_text(path)
        if not text.strip():
            return jsonify({"error": "Could not extract text"}), 400

        # Limit to avoid token overflow
        prompt_text = text[:3000]

        # Gemini call
        prompt = f"Summarize this legal document in simple terms:\n\n{prompt_text}"
        res = client.models.generate_content(
            model=GEN_AI_MODEL,
            contents=prompt
        )

        summary = res.candidates[0].content.parts[0].text

        return jsonify({
            "summary": summary
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
