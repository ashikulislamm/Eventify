"use client";

import React from "react";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      helperText,
      className = "",
      containerClassName = "",
      disabled,
      id,
      name,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const inputId = id || name || Math.random().toString(36).substr(2, 9);

    return (
      <div className={`w-full flex flex-col gap-1.5 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-gray-700 select-none"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          name={name}
          disabled={disabled}
          rows={rows}
          className={`w-full rounded-xl border border-gray-200 outline-none transition-all bg-gray-50 focus:bg-white focus:border-primary/50 focus:ring-2 focus:ring-primary/10 disabled:opacity-50 disabled:bg-gray-100/50 disabled:cursor-not-allowed
            px-4 py-3.5 text-gray-900 placeholder-gray-400 text-sm md:text-base resize-none
            ${error ? "border-red-300 focus:border-red-500 focus:ring-red-500/10" : ""}
            ${className}
          `}
          {...props}
        />
        {error ? (
          <p className="text-xs md:text-sm text-red-600 font-medium animate-in fade-in slide-in-from-top-1 duration-150">
            {error}
          </p>
        ) : (
          helperText && (
            <p className="text-xs text-gray-400 font-medium">
              {helperText}
            </p>
          )
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
