"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { forwardRef, useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Ripple = {
  id: number;
  x: number;
  y: number;
  size: number;
};

export type ButtonProps = Omit<HTMLMotionProps<"button">, "ref"> & {
  variant?: "primary" | "ghost";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, children, onClick, variant = "primary", ...props },
  forwardedRef
) {
  const localRef = useRef<HTMLButtonElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 200, damping: 14 });
  const ySpring = useSpring(y, { stiffness: 200, damping: 14 });

  const setRefs = useCallback(
    (node: HTMLButtonElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef]
  );

  const handleMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (reduceMotion || !localRef.current) {
      return;
    }
    const rect = localRef.current.getBoundingClientRect();
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
    if (!reduceMotion && localRef.current) {
      const rect = localRef.current.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.2;
      const ripple = {
        id: Date.now(),
        x: event.clientX - rect.left - size / 2,
        y: event.clientY - rect.top - size / 2,
        size,
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
      ref={setRefs}
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
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}
      </span>
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;
