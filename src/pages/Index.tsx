import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import heroImage from "@/assets/hero-image.jpg";
import summarizationIcon from "@/assets/summarization-icon.png";
import highlightingIcon from "@/assets/highlighting-icon.png";
import { 
  AlertTriangle, 
  Clock, 
  Shield, 
  TrendingUp, 
  FileText, 
  Languages, 
  Zap, 
  CheckCircle,
  Users
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-primary/10"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8 animate-fade-in">
              <h1 className="font-heading font-bold text-4xl lg:text-6xl text-primary-foreground leading-tight">
                Understand legal documents in 
                <span className="text-accent"> seconds</span>, not hours
              </h1>
              <p className="text-xl text-primary-foreground/90 leading-relaxed">
                Stop losing money because you don't understand contracts. Quick Quill uses AI to break down complex legal language into plain English.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-accent hover:bg-accent-dark text-accent-foreground shadow-lg hover:shadow-glow transition-all duration-300"
                >
                  <Link to="/upload">Analyze Document Now</Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-slide-up">
              <img 
                src={heroImage} 
                alt="Professional document analysis interface"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -inset-4 bg-gradient-accent/20 rounded-2xl -z-10 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-accent mr-3" />
              <h2 className="font-heading font-bold text-3xl text-foreground">
                The Hidden Cost of Not Reading
              </h2>
            </div>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Did you know <span className="font-bold text-accent text-2xl">91%</span> of people 
              sign legal documents without reading them? Don't be part of that statistic.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg">5 Minutes</h3>
                <p className="text-muted-foreground text-sm">Average analysis time</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">100% Secure</h3>
                <p className="text-muted-foreground text-sm">Your documents stay private</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-success" />
                </div>
                <h3 className="font-semibold text-lg">Save Money</h3>
                <p className="text-muted-foreground text-sm">Avoid costly mistakes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-heading font-bold text-4xl text-foreground mb-6">
              Powerful Features for Smart Document Analysis
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform complex legal documents into clear, actionable insights with our comprehensive suite of AI-powered features.
            </p>
          </div>

          {/* Supported Formats */}
          <div className="max-w-6xl mx-auto mb-20">
            <h3 className="font-heading font-bold text-2xl text-foreground mb-8 text-center">
              Supported File Formats
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { name: "PDF", description: "Portable Document Format" },
                { name: "DOCX", description: "Microsoft Word Documents" },
                { name: "TXT", description: "Plain Text Files" },
                { name: "RTF", description: "Rich Text Format" },
              ].map((format, index) => (
                <div 
                  key={format.name}
                  className="bg-card rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-lg text-foreground mb-2">{format.name}</h4>
                  <p className="text-muted-foreground text-sm">{format.description}</p>
                </div>
              ))}
            </div>

            {/* Core Features */}
            <h3 className="font-heading font-bold text-2xl text-foreground mb-12 text-center">
              Core Features
            </h3>
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Instant Summarization */}
              <div className="space-y-6 animate-slide-up">
                <div className="flex items-center space-x-4">
                  <img 
                    src={summarizationIcon} 
                    alt="Summarization"
                    className="w-16 h-16"
                  />
                  <h4 className="font-heading font-bold text-xl text-foreground">
                    Instant Summarization
                  </h4>
                </div>
                <p className="text-muted-foreground leading-relaxed">
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
                  <h4 className="font-heading font-bold text-xl text-foreground">
                    Clause & Risk Highlighting
                  </h4>
                </div>
                <p className="text-muted-foreground leading-relaxed">
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
              {[
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
              ].map((category, index) => (
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

      {/* Why Choose Quick Quill */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading font-bold text-3xl text-foreground mb-12 text-center">
              Why Choose Quick Quill?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
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
              ].map((feature, index) => (
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

      {/* Final CTA Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <h2 className="font-heading font-bold text-4xl text-foreground">
              Ready to understand your documents?
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Stop signing documents blindly. Start using Quick Quill today and take control of what you agree to.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-accent hover:bg-accent-dark text-accent-foreground shadow-glow animate-glow"
            >
              <Link to="/upload">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
