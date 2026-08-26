"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
  threshold?: number;
}

const getVariants = (direction: string): Variants => {
  const offset = 30;
  const initial: Record<string, Record<string, number>> = {
    up: { y: offset, opacity: 0 },
    down: { y: -offset, opacity: 0 },
    left: { x: offset, opacity: 0 },
    right: { x: -offset, opacity: 0 },
    none: { opacity: 0 },
  };

  return {
    hidden: initial[direction] || initial.up,
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
    },
  };
};

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
  threshold = 0.15,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: `-${Math.round(threshold * 100)}px` as any,
  });

  return (
    <motion.div
      ref={ref}
      variants={getVariants(direction)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger container for children ─── */

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function StaggerContainer({
  children,
  className = "",
  once = true,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" as any });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
