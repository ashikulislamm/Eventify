"use client";

import React, { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      type = "text",
      className = "",
      containerClassName = "",
      disabled,
      id,
      name,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || name || Math.random().toString(36).substr(2, 9);

    const isPassword = type === "password";
    const actualType = isPassword ? (showPassword ? "text" : "password") : type;

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
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={actualType}
            disabled={disabled}
            className={`w-full rounded-xl border border-gray-200 outline-none transition-all bg-gray-50 focus:bg-white focus:border-primary/50 focus:ring-2 focus:ring-primary/10 disabled:opacity-50 disabled:bg-gray-100/50 disabled:cursor-not-allowed
              ${leftIcon ? "pl-11" : "pl-4"}
              ${isPassword || rightIcon ? "pr-11" : "pr-4"}
              ${error ? "border-red-300 focus:border-red-500 focus:ring-red-500/10" : ""}
              py-3.5 text-gray-900 placeholder-gray-400 text-sm md:text-base
              ${className}
            `}
            {...props}
          />
          {/* Custom right icon or automatic password toggle */}
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              disabled={disabled}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              {showPassword ? (
                <HiOutlineEyeOff className="w-5 h-5" />
              ) : (
                <HiOutlineEye className="w-5 h-5" />
              )}
            </button>
          ) : (
            rightIcon && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                {rightIcon}
              </div>
            )
          )}
        </div>
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

Input.displayName = "Input";
