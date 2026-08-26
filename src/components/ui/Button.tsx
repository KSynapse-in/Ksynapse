"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost" | "gold" | "outline";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-forest text-white hover:bg-forest-deep shadow-subtle hover:shadow-card",
  secondary:
    "bg-parchment text-forest border border-divider hover:bg-sage-pale hover:border-sage",
  ghost:
    "bg-transparent text-forest hover:bg-parchment",
  gold:
    "bg-gold text-white hover:brightness-110 shadow-subtle hover:shadow-card",
  outline:
    "bg-transparent text-forest border-2 border-forest hover:bg-forest hover:text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-sm gap-2",
  lg: "px-8 py-3.5 text-base gap-2.5",
  xl: "px-10 py-4 text-base gap-3",
};

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={`
        inline-flex items-center justify-center font-body font-medium
        rounded-[10px] cursor-pointer select-none
        transition-all duration-200 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      {children}
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </motion.button>
  );
}
