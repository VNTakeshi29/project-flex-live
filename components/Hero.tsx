"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Toggle from "@/components/ui/Toggle";
import VisitCounter from "@/components/VisitCounter";
import StayTimer from "@/components/ui/StayTimer";
import TypeRotate from "@/components/ui/TypeRotate";
import { useInViewOnce } from "@/components/motion/useInViewOnce";
import { fadeUp, headlineItem, headlineStagger } from "@/components/motion/variants";

const HERO_LINES = [
  "I build communities and ship small things that feel like magic.",
  "I like turning quiet ideas into living spaces.",
  "Most things here were built late at night.",
  "Still building. Still learning."
];

type HeroProps = {
  theme: "dark" | "light";
  onThemeChange: (value: "dark" | "light") => void;
  musicEnabled: boolean;
  onMusicToggle: () => void;
  onCopyContact: (value: string) => void;
  onHeroMediaHover?: (active: boolean) => void;
};

export default function Hero({
  theme,
  onThemeChange,
  musicEnabled,
  onMusicToggle,
  onCopyContact,
  onHeroMediaHover
}: HeroProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ threshold: 0.3 });
  const reduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, -40]);
  const parallaxStyle = !reduceMotion ? { y: parallaxY } : undefined;
  const headline = "Takeshi".split("");
  const animateState = reduceMotion ? "show" : inView ? "show" : "hidden";
  const initialState = reduceMotion ? false : "hidden";

  const handleExplore = () => {
    const target = document.getElementById("projects");
    if (target) {
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    setIsDesktop(finePointer);
  }, []);

  const heroImage = (
    <motion.div
      whileHover={reduceMotion ? undefined : { rotate: -1.5, scale: 1.02 }}
      onMouseEnter={() => (isDesktop ? onHeroMediaHover?.(true) : undefined)}
      onMouseLeave={() => (isDesktop ? onHeroMediaHover?.(false) : undefined)}
      className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/70 shadow-soft transition-transform dark:border-white/10 dark:bg-white/5"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-pink/15 opacity-70" />
      <Image
        src="/hero-anime.jpg"
        alt="Anime cat portrait"
        width={520}
        height={680}
        className="relative z-10 h-auto w-full object-cover"
        priority
      />
    </motion.div>
  );

  return (
    <section ref={ref} id="hero" className="relative mx-auto max-w-6xl px-6 pb-24 pt-24">
      <div className="flex flex-wrap items-start justify-between gap-8">
        <div className="max-w-2xl">
          <motion.h1
            variants={headlineStagger}
            initial={initialState}
            animate={animateState}
            className="hero-signature flex flex-wrap gap-1 font-display text-5xl font-semibold sm:text-7xl"
          >
            {headline.map((char, index) => (
              <motion.span key={`${char}-${index}`} variants={headlineItem} className="inline-block">
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.div variants={fadeUp} initial={initialState} animate={animateState} className="mt-5">
            <TypeRotate
              lines={HERO_LINES}
              typeMs={70}
              deleteMs={50}
              holdMs={1800}
              startDelayMs={400}
              className="text-lg text-slate-600 dark:text-white/70"
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial={initialState}
            animate={animateState}
            className="mt-6 lg:hidden"
          >
            <div className="max-w-xs">{heroImage}</div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial={initialState}
            animate={animateState}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button onClick={handleExplore}>Start exploring</Button>
            <div className="flex items-center gap-3">
              <ThemeToggle value={theme} onChange={onThemeChange} />
              <Toggle
                label={`Music: ${musicEnabled ? "ON" : "OFF"}`}
                value={musicEnabled}
                onChange={() => onMusicToggle()}
              />
            </div>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial={initialState}
            animate={animateState}
            className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-white/60"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400 dark:text-white/40">
              Contact
            </span>
            <button
              type="button"
              onClick={() => onCopyContact("vntakeshii@gmail.com")}
              className="transition hover:text-slate-900 dark:hover:text-white"
            >
              vntakeshii@gmail.com
            </button>
            <button
              type="button"
              onClick={() => onCopyContact("vntakeshii")}
              className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600 transition hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:text-white"
            >
              Discord: vntakeshii
            </button>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial={initialState}
            animate={animateState}
            className="mt-6 max-w-sm"
          >
            <VisitCounter />
            <div className="mt-3">
              <StayTimer />
            </div>
          </motion.div>
        </div>

        <div className="hidden w-full max-w-sm lg:block">
          <motion.div style={parallaxStyle} className="space-y-6">
            {heroImage}
            <motion.div
              variants={fadeUp}
              initial={initialState}
              animate={animateState}
              className="glass relative w-full rounded-3xl px-6 py-6"
            >
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%] animate-shimmer" />
              </div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-white/50">
                    Now Playing
                  </p>
                  <p className="mt-2 font-display text-lg text-slate-900 dark:text-white">
                    Neon Drift // Project Flex
                  </p>
                </div>
                <div className="flex items-end gap-1">
                  {[0, 1, 2, 3].map((bar) => (
                    <span
                      key={bar}
                      className="equalizer-bar"
                      style={{ animationDelay: `${bar * 0.12}s` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
