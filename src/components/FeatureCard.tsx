import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  image?: string;
  linkTo?: string;
  variant?: "default" | "large";
}

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  image, 
  linkTo = "/features",
  variant = "default" 
}: FeatureCardProps) => {
  const content = (
    <div 
      className={`group bg-card rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-border/50 hover:border-border ${
        variant === "large" ? "p-8" : "p-6"
      }`}
    >
      {/* Icon or Image */}
      <div className={`${variant === "large" ? "mb-6" : "mb-4"}`}>
        {image ? (
          <img 
            src={image} 
            alt={title}
            className={`${variant === "large" ? "w-16 h-16" : "w-12 h-12"} object-contain`}
          />
        ) : Icon ? (
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-accent" />
          </div>
        ) : null}
      </div>

      {/* Content */}
      <div>
        <h3 className={`font-heading font-semibold text-foreground mb-3 group-hover:text-primary transition-colors ${
          variant === "large" ? "text-xl" : "text-lg"
        }`}>
          {title}
        </h3>
        <p className={`text-muted-foreground leading-relaxed ${
          variant === "large" ? "text-base mb-6" : "text-sm mb-4"
        }`}>
          {description}
        </p>
        
        {/* Learn More */}
        <div className="flex items-center text-accent group-hover:text-accent-dark transition-colors">
          <span className="text-sm font-medium">Learn more</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo}>{content}</Link>;
  }

  return content;
};

export default FeatureCard;