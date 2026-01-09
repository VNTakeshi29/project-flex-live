"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import ConstellationOverlay from "@/components/effects/ConstellationOverlay";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const canAnimate = !reduceMotion;

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!canAnimate || !ref.current) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateRange = 10;
    const rotateXValue = ((y / rect.height) * 2 - 1) * -rotateRange;
    const rotateYValue = ((x / rect.width) * 2 - 1) * rotateRange;
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={canAnimate ? { rotateX: springX, rotateY: springY, transformPerspective: 800 } : undefined}
      className={cn("group relative rounded-3xl p-[1px] card-border transform-gpu", className)}
    >
      <div className="glass relative rounded-3xl px-6 py-6">
        {children}
        {canAnimate ? <ConstellationOverlay /> : null}
      </div>
    </motion.div>
  );
}
