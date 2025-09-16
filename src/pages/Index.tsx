import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import heroImage from "@/assets/hero-image.jpg";
import summarizationIcon from "@/assets/summarization-icon.png";
import highlightingIcon from "@/assets/highlighting-icon.png";
import { AlertTriangle, Clock, Shield, TrendingUp } from "lucide-react";

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
                >
                  <Link to="/features">Learn More</Link>
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

      {/* Features Teaser */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-heading font-bold text-4xl text-foreground mb-6">
              Powerful Features for Smart Analysis
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our AI-powered platform transforms complex legal documents into clear, actionable insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="animate-scale-in">
              <FeatureCard
                title="Instant Summarization"
                description="Get concise summaries of lengthy contracts and agreements in seconds. Our AI identifies the most important clauses and presents them in plain English."
                image={summarizationIcon}
                linkTo="/features"
                variant="large"
              />
            </div>
            <div className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <FeatureCard
                title="Clause & Risk Highlighting"
                description="Visually identify potentially problematic clauses, hidden fees, and unfavorable terms. Never miss important details again."
                image={highlightingIcon}
                linkTo="/features"
                variant="large"
              />
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-primary hover:bg-primary-dark shadow-lg">
              <Link to="/features">Explore All Features</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <h2 className="font-heading font-bold text-4xl text-primary-foreground">
              Start using Quick Quill today to take control of what you sign
            </h2>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Join thousands of users who have already saved time and money by understanding their legal documents before signing.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-accent hover:bg-accent-dark text-accent-foreground shadow-glow animate-glow"
            >
              <Link to="/upload">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
