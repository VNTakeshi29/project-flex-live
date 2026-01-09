"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useSessionTimer } from "@/lib/hooks/useSessionTimer";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export default function StayTimer() {
  const seconds = useSessionTimer();
  const reduceMotion = useReducedMotion();

  return (
    <motion.p
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-xs text-slate-400 dark:text-white/40"
    >
      You've been here for {formatTime(seconds)}
    </motion.p>
  );
}
