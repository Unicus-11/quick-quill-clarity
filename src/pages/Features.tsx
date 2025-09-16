import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import summarizationIcon from "@/assets/summarization-icon.png";
import highlightingIcon from "@/assets/highlighting-icon.png";
import { 
  FileText, 
  Languages, 
  Shield, 
  Zap, 
  CheckCircle,
  TrendingUp,
  Clock,
  Users
} from "lucide-react";

const Features = () => {
  const supportedFormats = [
    { name: "PDF", description: "Portable Document Format" },
    { name: "DOCX", description: "Microsoft Word Documents" },
    { name: "TXT", description: "Plain Text Files" },
    { name: "RTF", description: "Rich Text Format" },
  ];

  const documentCategories = [
    {
      title: "Contracts & Agreements",
      description: "Employment contracts, service agreements, lease agreements, and business contracts",
      icon: FileText,
    },
    {
      title: "Privacy Policies",
      description: "Data protection policies, cookie policies, and privacy statements from websites and apps",
      icon: Shield,
    },
    {
      title: "Terms & Conditions",
      description: "Terms of service, user agreements, and platform-specific terms and conditions",
      icon: CheckCircle,
    },
    {
      title: "Financial Reports",
      description: "Investment documents, insurance policies, loan agreements, and financial disclosures",
      icon: TrendingUp,
    },
  ];

  const features = [
    {
      title: "AI-Powered Summarization",
      description: "Our advanced AI analyzes complex legal language and provides clear, concise summaries that highlight the most important points.",
      icon: Zap,
    },
    {
      title: "Clause & Risk Highlighting",
      description: "Automatically identify potentially problematic clauses, hidden fees, penalty terms, and unfavorable conditions.",
      icon: CheckCircle,
    },
    {
      title: "Multi-Language Support",
      description: "Analyze documents in multiple languages including English, Spanish, French, German, and more.",
      icon: Languages,
    },
    {
      title: "Secure & Confidential",
      description: "Your documents are processed securely and never stored. Complete privacy and confidentiality guaranteed.",
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Header Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-6">
            Powerful Features for Smart Document Analysis
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Transform complex legal documents into clear, actionable insights with our comprehensive suite of AI-powered features.
          </p>
        </div>
      </section>

      {/* Supported Formats */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-bold text-3xl text-foreground mb-8 text-center">
            Supported File Formats
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportedFormats.map((format, index) => (
              <div 
                key={format.name}
                className="bg-card rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{format.name}</h3>
                <p className="text-muted-foreground text-sm">{format.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-bold text-3xl text-foreground mb-12 text-center">
            Core Features
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Instant Summarization */}
            <div className="space-y-6 animate-slide-up">
              <div className="flex items-center space-x-4">
                <img 
                  src={summarizationIcon} 
                  alt="Summarization"
                  className="w-16 h-16"
                />
                <h3 className="font-heading font-bold text-2xl text-foreground">
                  Instant Summarization
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Get comprehensive summaries of lengthy legal documents in seconds. Our AI identifies key clauses, 
                important terms, and critical information, presenting everything in plain, understandable language.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-success mr-3" />
                  Key clause identification
                </li>
                <li className="flex items-center text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-success mr-3" />
                  Plain language summaries
                </li>
                <li className="flex items-center text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-success mr-3" />
                  Quick 5-minute analysis
                </li>
              </ul>
            </div>

            {/* Risk Highlighting */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center space-x-4">
                <img 
                  src={highlightingIcon} 
                  alt="Risk Highlighting"
                  className="w-16 h-16"
                />
                <h3 className="font-heading font-bold text-2xl text-foreground">
                  Clause & Risk Highlighting
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Visually identify potentially problematic clauses, hidden fees, penalty terms, and unfavorable 
                conditions. Never miss important details that could cost you money.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-success mr-3" />
                  Risk assessment scoring
                </li>
                <li className="flex items-center text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-success mr-3" />
                  Hidden fee detection
                </li>
                <li className="flex items-center text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-success mr-3" />
                  Visual highlighting system
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Document Categories */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading font-bold text-3xl text-foreground mb-8 text-center">
              Document Categories We Support
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {documentCategories.map((category, index) => (
                <div 
                  key={category.title}
                  className="bg-card rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <category.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">{category.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{category.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Quick Quill */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-bold text-3xl text-foreground mb-12 text-center">
            Why Choose Quick Quill?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="text-center space-y-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics & Impact */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h2 className="font-heading font-bold text-3xl mb-8">
              The Impact of Understanding Your Documents
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <div className="text-3xl font-bold text-accent">5 Minutes</div>
                <p className="text-primary-foreground/80">Average analysis time vs. hours of manual reading</p>
              </div>
              <div className="space-y-2">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <div className="text-3xl font-bold text-accent">10,000+</div>
                <p className="text-primary-foreground/80">Documents analyzed and users protected</p>
              </div>
              <div className="space-y-2">
                <Shield className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <div className="text-3xl font-bold text-accent">100%</div>
                <p className="text-primary-foreground/80">Secure and confidential processing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
          <h2 className="font-heading font-bold text-4xl text-foreground">
            Ready to understand your documents?
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Stop signing documents blindly. Start using Quick Quill today and take control of what you agree to.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-accent hover:bg-accent-dark shadow-lg hover:shadow-glow transition-all duration-300"
            >
              <Link to="/upload">Upload Document Now</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-border hover:bg-secondary"
            >
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;