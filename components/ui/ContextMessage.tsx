"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type ContextMessageProps = {
  message: string | null;
  position?: "left" | "center";
};

export default function ContextMessage({ message, position = "left" }: ContextMessageProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`pointer-events-none fixed bottom-6 z-50 w-full px-6 ${
        position === "center" ? "left-0 flex justify-center" : "left-0 flex justify-start"
      }`}
      aria-live="polite"
      role="status"
    >
      <AnimatePresence>
        {message ? (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="glass rounded-2xl border border-white/10 px-4 py-3 text-xs text-white/80 shadow-glow backdrop-blur-2xl"
          >
            {message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
