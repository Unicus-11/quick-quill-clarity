import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  image?: string;
  linkTo?: string;
  variant?: "default" | "large";
  /**
   * If provided, the card renders as a <button> and calls this handler.
   * Use this to perform in-page scrolling or other actions instead of navigation.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  image,
  linkTo = "/features",
  variant = "default",
  onClick,
}) => {
  const content = (
    <div
      className={`group bg-card rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-border/50 hover:border-border ${
        variant === "large" ? "p-8" : "p-6"
      }`}
    >
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

      <div>
        <h3
          className={`font-heading font-semibold text-foreground mb-3 group-hover:text-primary transition-colors ${
            variant === "large" ? "text-xl" : "text-lg"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-muted-foreground leading-relaxed ${
            variant === "large" ? "text-base mb-6" : "text-sm mb-4"
          }`}
        >
          {description}
        </p>

        <div className="flex items-center text-accent group-hover:text-accent-dark transition-colors">
          <span className="text-sm font-medium">Learn more</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );

  // If an onClick handler is provided, render as a button (no navigation).
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full text-left p-0 border-0 bg-transparent"
        aria-label={`Open ${title}`}
      >
        {content}
      </button>
    );
  }

  // Otherwise behave as a Link (previous behavior).
  if (linkTo) {
    return <Link to={linkTo}>{content}</Link>;
  }

  return content;
};

export default FeatureCard;
