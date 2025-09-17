import ReactMarkdown from "react-markdown";
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
  Shield,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [risks, setRisks] = useState<string | null>(null);
  const [clauses, setClauses] = useState<any[] | null>(null);
  const [docId, setDocId] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(
    undefined
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Refs for accordion scroll
  const summaryRef = useRef<HTMLDivElement>(null);
  const risksRef = useRef<HTMLDivElement>(null);
  const clausesRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const yOffset = -80; // adjust for sticky header
      const y =
        ref.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // ✅ Handle accordion open + scroll
  const handleAccordionChange = (value: string | undefined) => {
    setOpenAccordion(value);
    setTimeout(() => {
      if (value === "summary") scrollToSection(summaryRef);
      if (value === "risks") scrollToSection(risksRef);
      if (value === "clauses") scrollToSection(clausesRef);
    }, 200);
  };

  // === File Handlers ===
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
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setSummary(null);
    setRisks(null);
    setClauses(null);
    setDocId(null);
    setAnswer(null);
    setOpenAccordion(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // === Backend Calls ===
  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      const res = await fetch("http://127.0.0.1:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.error) {
        alert("Error: " + data.error);
      } else {
        setSummary(data.summary);
        setRisks(data.risks);
        setClauses(data.clauses);
        setDocId(data.doc_id);

        // ✅ Auto-open summary after analysis
        setTimeout(() => {
          setOpenAccordion("summary");
          scrollToSection(summaryRef);
        }, 300);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

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
        setTimeout(() => scrollToSection(answerRef), 200);
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
      {/* Header Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-6">
            Upload Your Document
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Upload your legal document and let our AI provide instant analysis,
            summaries, and risk assessment.
          </p>
        </div>
      </section>

      {/* Upload Interface */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg border border-border p-8 shadow-md">
            {!uploadedFile ? (
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
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
                <h3 className="font-semibold text-xl text-foreground mb-2">
                  Drag and drop your document here
                </h3>
                <p className="text-muted-foreground mb-6">
                  or click to browse and select a file
                </p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-primary hover:bg-primary-dark"
                >
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
                      <h3 className="font-semibold text-foreground">
                        {uploadedFile.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {formatFileSize(uploadedFile.size)} •{" "}
                        {uploadedFile.type || "Unknown type"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isValidFileType(uploadedFile) ? (
                      <CheckCircle className="w-6 h-6 text-success" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-destructive" />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Analyze Button */}
                {isValidFileType(uploadedFile) ? (
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-success">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Ready for analysis</span>
                    </div>
                    <Button
                      onClick={handleAnalyze}
                      size="lg"
                      className="bg-accent hover:bg-accent-dark shadow-lg hover:shadow-glow transition-all duration-300"
                      disabled={loading}
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      {loading ? "Analyzing..." : "Analyze Document"}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p className="text-destructive mb-2">
                      Unsupported file type. Please upload a PDF, DOCX, TXT, or
                      RTF file.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Results in Accordion */}
          <Accordion
            type="single"
            collapsible
            value={openAccordion}
            onValueChange={handleAccordionChange}
            className="mt-8 space-y-4"
          >
            {summary && (
              <div ref={summaryRef}>
                <AccordionItem value="summary">
                  <AccordionTrigger>
                    <span className="text-2xl font-bold">
                      📄 Document Summary
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="prose max-w-none text-gray-700 leading-relaxed">
                      <ReactMarkdown>{summary}</ReactMarkdown>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </div>
            )}

            {risks && (
              <div ref={risksRef}>
                <AccordionItem value="risks">
                  <AccordionTrigger>
                    <span className="text-2xl font-bold text-red-700">
                      ⚠️ Risk Analysis
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-2 text-red-800">
                      {risks
                        .split("\n")
                        .filter((line) => line.trim() !== "")
                        .map((line, i) => (
                          <li key={i}>
                            <ReactMarkdown>{line}</ReactMarkdown>
                          </li>
                        ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </div>
            )}

            {clauses && (
              <div ref={clausesRef}>
                <AccordionItem value="clauses">
                  <AccordionTrigger>
                    <span className="text-2xl font-bold">
                      🔍 Clauses & Risks
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border p-2 text-left">Category</th>
                          <th className="border p-2 text-left">Clause</th>
                          <th className="border p-2 text-left">Risk</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clauses.map((c, i) => (
                          <tr key={i}>
                            <td className="border p-2 font-semibold">
                              {c.category}
                            </td>
                            <td className="border p-2">{c.clause}</td>
                            <td
                              className={`border p-2 font-bold ${
                                c.risk === "High"
                                  ? "text-red-600"
                                  : c.risk === "Medium"
                                  ? "text-orange-500"
                                  : "text-green-600"
                              }`}
                            >
                              {c.risk}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </AccordionContent>
                </AccordionItem>
              </div>
            )}
          </Accordion>

          {/* Ask a Question */}
          {docId && (
            <div
              ref={answerRef}
              className="mt-8 p-6 bg-blue-50 rounded-lg shadow border border-blue-200"
            >
              <h3 className="text-2xl font-bold mb-4">❓ Ask a Question</h3>
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
                <div className="mt-4 space-y-2">
                  <div className="bg-white p-3 rounded border shadow-sm">
                    <p className="font-semibold text-gray-700">User:</p>
                    <p>{question}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded border shadow-sm">
                    <p className="font-semibold text-gray-700">AI Answer:</p>
                    <ReactMarkdown>{answer}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Feature Reminder */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading font-bold text-3xl text-foreground mb-8 text-center">
              What You'll Get After Analysis
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <FeatureCard
                title="Instant Summarization"
                description="Get a clear, concise summary highlighting the most important clauses and terms in plain English."
                image={summarizationIcon}
                linkTo="/features"
              />
              <FeatureCard
                title="Risk Assessment"
                description="Visual highlighting of potentially problematic clauses, hidden fees, and unfavorable terms."
                image={highlightingIcon}
                linkTo="/features"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Notice */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center space-x-2 text-success">
            <Shield className="w-6 h-6" />
            <h3 className="font-semibold text-lg">Your Privacy is Protected</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Your documents are processed securely and are never permanently
            stored on our servers. We use enterprise-grade encryption and delete
            all uploaded files immediately after analysis. Your data remains
            completely confidential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link to="/features">Learn More About Our Features</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Upload;
