"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { type ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  title?: string;
}

export function Modal({ open, onClose, children, className, title }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "relative w-full sm:max-w-md bg-bg-secondary rounded-t-[2rem] sm:rounded-[var(--radius-card)] shadow-hover border border-border/50 z-10 overflow-visible",
              "px-5 py-5 sm:p-6",
              "max-h-[90vh] overflow-y-auto",
              className
            )}
          >
            {/* Drag handle on mobile */}
            <div className="flex justify-center mb-3 sm:hidden">
              <div className="h-1 w-10 rounded-full bg-border/60" />
            </div>

            {/* Header */}
            {title && (
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <h2 className="text-base sm:text-lg font-bold text-text-primary font-display">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary hover:bg-bg-tertiary hover:text-text-primary hover:rotate-90 transition-all duration-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
