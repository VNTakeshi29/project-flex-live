"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type Ripple = {
  id: number;
  x: number;
  y: number;
  size: number;
};

type ButtonProps = Omit<ComponentPropsWithoutRef<"button">, "onDrag"> & {
  variant?: "primary" | "ghost";
};

export default function Button({
  className,
  children,
  onClick,
  variant = "primary",
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 200, damping: 14 });
  const ySpring = useSpring(y, { stiffness: 200, damping: 14 });

  const handleMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (reduceMotion || !ref.current) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    x.set(offsetX * 0.18);
    y.set(offsetY * 0.18);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!reduceMotion && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.2;
      const ripple = {
        id: Date.now(),
        x: event.clientX - rect.left - size / 2,
        y: event.clientY - rect.top - size / 2,
        size
      };
      setRipples((prev) => [...prev, ripple]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((item) => item.id !== ripple.id));
      }, 600);
    }
    onClick?.(event);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      style={reduceMotion ? undefined : { x: xSpring, y: ySpring }}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900 dark:text-white",
        variant === "primary"
          ? "bg-slate-900/5 shadow-soft transition hover:bg-slate-900/10 dark:bg-white/10 dark:hover:bg-white/15"
          : "border border-slate-200/70 text-slate-600 hover:text-slate-900 dark:border-white/20 dark:text-white/70 dark:hover:text-white",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-neon-cyan/40 via-neon-purple/40 to-neon-pink/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/40 opacity-70 animate-ripple"
            style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }}
          />
        ))}
      </span>
    </motion.button>
  );
}
