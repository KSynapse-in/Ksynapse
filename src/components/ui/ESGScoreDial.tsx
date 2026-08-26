"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";

interface ESGScoreDialProps {
  score: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  tier?: "gold" | "silver" | "bronze";
  showTier?: boolean;
  animate?: boolean;
  className?: string;
}

const tierConfig = {
  gold: { color: "#A9793B", label: "Gold", bg: "#F1E3CB", range: "76–100" },
  silver: { color: "#8C9490", label: "Silver", bg: "#E4EAE3", range: "51–75" },
  bronze: { color: "#8A5A3B", label: "Bronze", bg: "#F1E3CB", range: "0–50" },
};

function getTier(score: number, maxScore: number): "gold" | "silver" | "bronze" {
  const pct = (score / maxScore) * 100;
  if (pct >= 76) return "gold";
  if (pct >= 51) return "silver";
  return "bronze";
}

export default function ESGScoreDial({
  score,
  maxScore = 100,
  size = 240,
  strokeWidth = 12,
  label,
  tier: tierProp,
  showTier = true,
  animate = true,
  className = "",
}: ESGScoreDialProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" as any });
  const [hasAnimated, setHasAnimated] = useState(false);

  const tier = tierProp || getTier(score, maxScore);
  const config = tierConfig[tier];

  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min((score / maxScore) * 100, 100);
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  const displayValue = useMotionValue(0);
  const springValue = useSpring(displayValue, {
    stiffness: 40,
    damping: 25,
    restDelta: 0.1,
  });
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    if (isInView && animate && !hasAnimated) {
      displayValue.set(score);
      setHasAnimated(true);
    } else if (!animate) {
      displayValue.set(score);
    }
  }, [isInView, animate, score, hasAnimated, displayValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (v) => {
      setDisplayNumber(Math.round(v));
    });
    return unsubscribe;
  }, [springValue]);

  // Gradient ID for uniqueness
  const gradientId = `dial-gradient-${size}-${tier}`;

  return (
    <div ref={ref} className={`relative inline-flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        {/* Subtle glow behind */}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-20"
          style={{ backgroundColor: config.color }}
        />

        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={config.color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={config.color} stopOpacity={1} />
            </linearGradient>
          </defs>

          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E8E2D6"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Progress arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView || !animate ? { strokeDashoffset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />

          {/* Tick marks */}
          {Array.from({ length: 40 }).map((_, i) => {
            const angle = (i / 40) * 360;
            const isMajor = i % 10 === 0;
            const innerR = radius - strokeWidth / 2 - (isMajor ? 12 : 8);
            const outerR = radius - strokeWidth / 2 - 4;
            const x1 = size / 2 + innerR * Math.cos((angle * Math.PI) / 180);
            const y1 = size / 2 + innerR * Math.sin((angle * Math.PI) / 180);
            const x2 = size / 2 + outerR * Math.cos((angle * Math.PI) / 180);
            const y2 = size / 2 + outerR * Math.sin((angle * Math.PI) / 180);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#D8D0BE"
                strokeWidth={isMajor ? 1.5 : 0.75}
                opacity={isMajor ? 0.6 : 0.3}
              />
            );
          })}
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-mono leading-none tracking-tight"
            style={{
              fontSize: size * 0.22,
              fontWeight: 600,
              color: config.color,
            }}
          >
            {displayNumber}
          </span>
          <span
            className="text-stone mt-1 font-body"
            style={{ fontSize: size * 0.06 }}
          >
            out of {maxScore}
          </span>
        </div>
      </div>

      {/* Tier badge */}
      {showTier && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full"
          style={{ backgroundColor: config.bg }}
        >
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: config.color }}
          />
          <span
            className="font-body font-medium text-sm"
            style={{ color: config.color }}
          >
            {config.label} Tier
          </span>
        </motion.div>
      )}

      {/* Label */}
      {label && (
        <span className="mt-2 text-sm text-stone font-body">{label}</span>
      )}
    </div>
  );
}
