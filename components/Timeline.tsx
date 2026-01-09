"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInViewOnce } from "@/components/motion/useInViewOnce";
import { fadeUp, staggerContainer } from "@/components/motion/variants";

const timelineItems = [
  {
    title: "NightOwlTGT",
    role: "Admin",
    description: "Run content + support for Play Together tools community."
  },
  {
    title: "Bis",
    role: "Moderator",
    description: "Keep chat clean, friendly, and fun."
  },
  {
    title: "Community Builder",
    role: "Creator",
    description: "Design spaces where people stick around and share energy."
  }
];

export default function Timeline() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ threshold: 0.3 });
  const reduceMotion = useReducedMotion();
  const initialState = reduceMotion ? false : "hidden";

  return (
    <section ref={ref} className="relative mx-auto max-w-5xl px-6 pb-24">
      <motion.div variants={fadeUp} initial={initialState} animate={inView ? "show" : "hidden"}>
        <h2 className="font-display text-3xl text-slate-900 dark:text-white sm:text-4xl">
          Roles & Communities
        </h2>
        <p className="mt-2 text-slate-500 dark:text-white/60">
          Where I show up and keep the vibes alive
        </p>
      </motion.div>

      <div className="relative mt-10">
        <motion.div
          initial={reduceMotion ? false : { scaleY: 0 }}
          animate={{ scaleY: inView ? 1 : 0 }}
          transition={reduceMotion ? undefined : { duration: 1, ease: "easeOut" }}
          className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-neon-cyan/60 via-slate-300/50 to-neon-pink/60 dark:via-white/10"
        />
        <motion.div
          variants={staggerContainer}
          initial={initialState}
          animate={inView ? "show" : "hidden"}
          className="space-y-8"
        >
          {timelineItems.map((item) => (
            <motion.div key={item.title} variants={fadeUp} className="relative pl-12">
              <span className="absolute left-3 top-1.5 h-3 w-3 rounded-full bg-neon-cyan shadow-glow ring-4 ring-neon-cyan/20 animate-pulse" />
              <div className="glass rounded-3xl px-6 py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg text-slate-900 dark:text-white">{item.title}</h3>
                  <span className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-white/60">
                    {item.role}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-white/70">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
