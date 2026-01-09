"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ToastItem } from "@/lib/hooks/useToast";

type ToasterProps = {
  toasts: ToastItem[];
};

export default function Toaster({ toasts }: ToasterProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed right-6 top-6 z-50 space-y-3"
      aria-live="polite"
      role="status"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            className="glass w-fit rounded-2xl px-4 py-3 text-sm text-slate-700 shadow-soft dark:text-white/80"
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
