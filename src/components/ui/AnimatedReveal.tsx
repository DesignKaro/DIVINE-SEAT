"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { premiumEase } from "./motion";

interface AnimatedRevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
}

export default function AnimatedReveal({
  children,
  delay = 0.1,
  y = 18,
  duration = 0.8,
  className = "",
  ...props
}: AnimatedRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: premiumEase,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
