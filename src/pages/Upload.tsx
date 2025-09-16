import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FeatureCard from "@/components/FeatureCard";
import summarizationIcon from "@/assets/summarization-icon.png";
import highlightingIcon from "@/assets/highlighting-icon.png";
import {
  Upload as UploadIcon,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Zap,
} from "lucide-react";

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [docId, setDocId] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // === Drag & Drop ===
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
      resetState();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      resetState();
    }
  };

  const resetState = () => {
    setSummary(null);
    setDocId(null);
    setAnswer(null);
  };

  const removeFile = () => {
    setUploadedFile(null);
    resetState();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // === Call backend /api/upload ===
  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    setLoading(true);
    resetState();

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.error) {
        alert("Error: " + data.error);
      } else {
        setSummary(data.summary);
        setDocId(data.doc_id || null);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // === Call backend /api/query ===
  const handleQuery = async () => {
    if (!docId || !question.trim()) return;
    try {
      const res = await fetch("http://127.0.0.1:5000/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doc_id: docId, question }),
      });
      const data = await res.json();
      if (data.error) {
        alert("Error: " + data.error);
      } else {
        setAnswer(data.answer);
      }
    } catch (err) {
      console.error("Query failed:", err);
      alert("Query failed. Check console for details.");
    }
  };

  const isValidFileType = (file: File) => {
    const validTypes = [".pdf", ".docx", ".txt", ".rtf"];
    const extension = "." + file.name.split(".").pop()?.toLowerCase();
    return validTypes.includes(extension);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen py-12">
      {/* Header */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-heading font-bold text-4xl lg:text-5xl mb-6">
            Upload Your Document
          </h1>
          <p className="text-xl text-muted-foreground">
            Upload your legal document and let our AI provide instant summaries and Q&A.
          </p>
        </div>
      </section>

      {/* Upload Interface */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto bg-card rounded-lg border p-8 shadow-md">
          {!uploadedFile ? (
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center ${
                dragActive
                  ? "border-accent bg-accent/5"
                  : "border-muted hover:border-accent/50 hover:bg-accent/5"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <UploadIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Drag & drop your document here</h3>
              <p className="text-muted-foreground mb-6">or click to browse and select a file</p>
              <Button onClick={() => fileInputRef.current?.click()}>
                Choose File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt,.rtf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* File Card */}
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">{uploadedFile.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(uploadedFile.size)} • {uploadedFile.type || "Unknown type"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isValidFileType(uploadedFile) ? (
                    <CheckCircle className="w-6 h-6 text-success" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-destructive" />
                  )}
                  <Button variant="ghost" size="sm" onClick={removeFile}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Analyze Button */}
              {isValidFileType(uploadedFile) && (
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-success">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Ready for analysis</span>
                  </div>
                  <Button
                    onClick={handleAnalyze}
                    size="lg"
                    className="bg-accent shadow-lg"
                    disabled={loading}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    {loading ? "Analyzing..." : "Analyze Document"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Show summary */}
        {summary && (
          <div className="mt-8 p-6 bg-secondary/20 rounded-lg shadow">
            <h3 className="font-heading font-bold text-2xl mb-4">Document Summary</h3>
            <pre className="whitespace-pre-wrap text-sm bg-white p-4 rounded border">
              {summary}
            </pre>
          </div>
        )}

        {/* Ask Question */}
        {docId && (
          <div className="mt-8 p-6 bg-secondary/20 rounded-lg shadow">
            <h3 className="font-heading font-bold text-2xl mb-4">Ask a Question</h3>
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. What is the rent amount?"
                className="flex-1 border px-3 py-2 rounded"
              />
              <Button onClick={handleQuery} disabled={!question.trim()}>
                Ask
              </Button>
            </div>
            {answer && (
              <div className="mt-4 bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2">Answer</h4>
                <p>{answer}</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Upload;
