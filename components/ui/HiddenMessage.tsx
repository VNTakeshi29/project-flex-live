"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const MESSAGE = "Most people don't stay this long.";
const STORAGE_KEY = "hidden-message-seen";

export default function HiddenMessage() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();
  const showTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") {
        return;
      }
    } catch {
      // Ignore storage errors
    }

    showTimerRef.current = window.setTimeout(() => {
      setVisible(true);
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // Ignore storage errors
      }
      hideTimerRef.current = window.setTimeout(() => {
        setVisible(false);
      }, 4600);
    }, 10000);

    return () => {
      if (showTimerRef.current) {
        window.clearTimeout(showTimerRef.current);
      }
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-6 left-6 z-50 max-w-xs">
      <AnimatePresence>
        {visible ? (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="glass rounded-2xl border border-white/10 px-4 py-3 text-xs text-white/80 shadow-glow backdrop-blur-2xl"
          >
            {MESSAGE}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
