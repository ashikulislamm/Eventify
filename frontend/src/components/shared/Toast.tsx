"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiCheckCircle,
  HiXCircle,
  HiExclamationCircle,
  HiInformationCircle,
  HiX,
} from "react-icons/hi";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType, duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm sm:max-w-md w-full pointer-events-none px-4 sm:px-0">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastComponent key={toast.id} toast={toast} onClose={removeToast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

const ToastComponent: React.FC<{ toast: ToastItem; onClose: (id: string) => void }> = ({
  toast,
  onClose,
}) => {
  const icons = {
    success: <HiCheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />,
    error: <HiXCircle className="w-6 h-6 text-red-600 flex-shrink-0" />,
    warning: <HiExclamationCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />,
    info: <HiInformationCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />,
  };

  const containerStyles = {
    success: "bg-green-50 border-green-200 text-green-900 shadow-green-100/40",
    error: "bg-red-50 border-red-200 text-red-900 shadow-red-100/40",
    warning: "bg-amber-50 border-amber-200 text-amber-900 shadow-amber-100/40",
    info: "bg-blue-50 border-blue-200 text-blue-900 shadow-blue-100/40",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border-2 shadow-xl backdrop-blur-md ${containerStyles[toast.type]}`}
    >
      {icons[toast.type]}
      <p className="flex-1 text-sm font-semibold leading-5 mt-0.5">{toast.message}</p>
      <button
        type="button"
        onClick={() => onClose(toast.id)}
        className="text-gray-400 hover:text-gray-600 transition-colors p-0.5 rounded-lg hover:bg-black/5 flex-shrink-0 cursor-pointer"
      >
        <HiX className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
