"use client";

import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "accent"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "social-white"
    | "social-black";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

    // Size variants
    const sizes = {
      sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
      md: "px-5 py-2.5 text-sm rounded-xl gap-2",
      lg: "px-7 py-3.5 text-base font-bold rounded-xl gap-2.5",
    };

    // Style variants
    const variants = {
      primary:
        "bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0",
      accent:
        "bg-accent text-white hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 active:translate-y-0",
      secondary:
        "bg-secondary text-primary hover:bg-secondary/80 focus:ring-secondary/50",
      outline:
        "bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 focus:ring-gray-200",
      ghost:
        "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-200",
      danger:
        "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/50 hover:shadow-lg hover:shadow-red-500/25 hover:-translate-y-0.5 active:translate-y-0",
      "social-white":
        "bg-white border-2 border-gray-200 text-gray-900 hover:bg-gray-50 focus:ring-gray-200 shadow-sm hover:shadow",
      "social-black":
        "bg-gray-900 border-2 border-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900 shadow-sm hover:shadow",
    };

    const isButtonDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isButtonDisabled}
        className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-1 h-4 w-4 text-current flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="flex items-center flex-shrink-0">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="flex items-center flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
