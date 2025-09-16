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
  Clock,
  Zap
} from "lucide-react";

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    {
      id: "contracts",
      title: "Contracts & Agreements",
      description: "Employment contracts, service agreements, lease agreements, and business contracts",
    },
    {
      id: "privacy",
      title: "Privacy Policies",
      description: "Data protection policies, cookie policies, and privacy statements",
    },
    {
      id: "terms",
      title: "Terms & Conditions",
      description: "Terms of service, user agreements, and platform-specific terms",
    },
    {
      id: "financial",
      title: "Financial Documents",
      description: "Investment documents, insurance policies, loan agreements, and financial disclosures",
    },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyze = () => {
    // Simulate analysis process
    alert("Analysis would start here! This is a demo interface - no actual document processing occurs.");
  };

  const isValidFileType = (file: File) => {
    const validTypes = ['.pdf', '.docx', '.txt', '.rtf'];
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    return validTypes.includes(extension);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
            Upload your legal document and let our AI provide instant analysis, summaries, and risk assessment.
          </p>
        </div>
      </section>

      {/* Upload Instructions */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg border border-border p-8 shadow-md">
            <h2 className="font-heading font-bold text-2xl text-foreground mb-6 text-center">
              File Requirements
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <FileText className="w-8 h-8 text-primary mx-auto" />
                <h3 className="font-semibold text-foreground">Supported Formats</h3>
                <p className="text-muted-foreground text-sm">PDF, DOCX, TXT, RTF</p>
              </div>
              <div className="space-y-2">
                <Shield className="w-8 h-8 text-primary mx-auto" />
                <h3 className="font-semibold text-foreground">Maximum Size</h3>
                <p className="text-muted-foreground text-sm">Up to 50MB per file</p>
              </div>
              <div className="space-y-2">
                <Clock className="w-8 h-8 text-primary mx-auto" />
                <h3 className="font-semibold text-foreground">Processing Time</h3>
                <p className="text-muted-foreground text-sm">5 minutes or less</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Document Categories */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-bold text-2xl text-foreground mb-6 text-center">
            Select Document Category
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 animate-scale-in ${
                  selectedCategory === category.id
                    ? "border-accent bg-accent/5 shadow-md"
                    : "border-border hover:border-accent/50 hover:bg-accent/5"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center ${
                    selectedCategory === category.id
                      ? "border-accent bg-accent"
                      : "border-muted-foreground"
                  }`}>
                    {selectedCategory === category.id && (
                      <CheckCircle className="w-3 h-3 text-accent-foreground" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{category.title}</h3>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">{uploadedFile.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {formatFileSize(uploadedFile.size)} • {uploadedFile.type || 'Unknown type'}
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

                {isValidFileType(uploadedFile) && selectedCategory ? (
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-success">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Ready for analysis</span>
                    </div>
                    <Button
                      onClick={handleAnalyze}
                      size="lg"
                      className="bg-accent hover:bg-accent-dark shadow-lg hover:shadow-glow transition-all duration-300"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Analyze Document
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    {!isValidFileType(uploadedFile) && (
                      <p className="text-destructive mb-2">
                        Unsupported file type. Please upload a PDF, DOCX, TXT, or RTF file.
                      </p>
                    )}
                    {!selectedCategory && isValidFileType(uploadedFile) && (
                      <p>Please select a document category above to continue.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
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
            Your documents are processed securely and are never permanently stored on our servers. 
            We use enterprise-grade encryption and delete all uploaded files immediately after analysis. 
            Your data remains completely confidential.
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