"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInViewOnce } from "@/components/motion/useInViewOnce";
import { fadeUp, staggerContainer } from "@/components/motion/variants";

const fragments = [
  "Built most things at night.",
  "Communities taught me more than tutorials.",
  "Started small. Stayed consistent.",
  "Some projects end. The habit doesn't.",
  "Still building."
];

export default function Fragments() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ threshold: 0.2 });
  const reduceMotion = useReducedMotion();
  const initialState = reduceMotion ? false : "hidden";

  return (
    <section ref={ref} className="relative mx-auto max-w-5xl px-6 pb-24">
      <motion.div variants={fadeUp} initial={initialState} animate={inView ? "show" : "hidden"}>
        <h2 className="font-display text-3xl text-slate-900 dark:text-white sm:text-4xl">Fragments</h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial={initialState}
        animate={inView ? "show" : "hidden"}
        className="mt-8 space-y-4"
      >
        {fragments.map((text) => (
          <motion.p
            key={text}
            variants={fadeUp}
            className="text-lg text-slate-600 transition hover:underline hover:decoration-neon-cyan/40 hover:decoration-2 dark:text-white/70"
          >
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.p
        variants={fadeUp}
        initial={initialState}
        animate={inView ? "show" : "hidden"}
        className="mt-10 text-xs text-slate-400/70 dark:text-white/30"
      >
        This site is intentionally unfinished.
      </motion.p>
    </section>
  );
}
