"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInViewOnce } from "@/components/motion/useInViewOnce";
import { fadeUp } from "@/components/motion/variants";

export default function Footer() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ threshold: 0.2 });
  const reduceMotion = useReducedMotion();
  const initialState = reduceMotion ? false : "hidden";

  return (
    <footer ref={ref} className="relative mx-auto max-w-6xl px-6 pb-16">
      <motion.div
        variants={fadeUp}
        initial={initialState}
        animate={inView ? "show" : "hidden"}
        className="glass rounded-3xl px-6 py-6 text-sm text-slate-600 dark:text-white/70"
      >
        <p className="text-center sm:text-left">
          This site is a personal playground — not a resume.
        </p>
        <div className="mt-3 h-px w-40 bg-gradient-to-r from-neon-cyan/40 via-neon-purple/30 to-neon-pink/40" />
      </motion.div>
    </footer>
  );
}
