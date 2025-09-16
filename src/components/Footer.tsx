import { FileText, Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6" />
              <span className="font-heading font-bold text-lg">Quick Quill</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Understand legal documents in seconds, not hours. AI-powered analysis for contracts, privacy policies, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/features" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link 
                  to="/upload" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  Upload Document
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>AI-Powered Summarization</li>
              <li>Risk Highlighting</li>
              <li>Multi-Language Support</li>
              <li>Secure & Confidential</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-light/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 Quick Quill. All rights reserved. | 
            <span className="ml-2">Empowering legal understanding through AI.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;