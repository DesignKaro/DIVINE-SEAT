"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface BaseFeatureCardProps {
  title?: string;
  description?: string;
  className?: string;
  imageLoaded?: boolean;
}

export default function BaseFeatureCard({
  title = "Natural Cork Base",
  description = "Portuguese cork with an 8.5° forward slope naturally tilts the pelvis to align the spine.",
  className = "",
  imageLoaded = true,
}: BaseFeatureCardProps) {
  return (
    <motion.div
      initial={{ x: 22, scale: 0.96 }}
      animate={
        imageLoaded
          ? { x: 0, scale: 1 }
          : { x: 22, scale: 0.96 }
      }
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative select-none pointer-events-auto group ${className}`}
    >
      {/* 1. Main Mineral Crystal Glass Container */}
      <div className="relative w-[290px] sm:w-[320px] h-[155px] sm:h-[160px] transition-transform duration-500 hover:-translate-y-1">
        {/* Base Pure Transparent Frosted Glass Layer Clipped to Notch Shape - Always Blurred */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: "url(#glass-notch-clip-base)",
            WebkitClipPath: "url(#glass-notch-clip-base)",
            backdropFilter: "blur(28px) saturate(140%) brightness(1.04)",
            WebkitBackdropFilter: "blur(28px) saturate(140%) brightness(1.04)",
            transform: "translateZ(0)",
            willChange: "transform, backdrop-filter",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.04) 100%)",
          }}
        />

        {/* Polished Mineral Curved Specular Reflection */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: "url(#glass-notch-clip-base)",
            WebkitClipPath: "url(#glass-notch-clip-base)",
            background: "radial-gradient(120% 90% at 85% 10%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)",
          }}
        />

        {/* SVG Border, Sheen, and Outline */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          viewBox="0 0 320 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="glass-notch-clip-base" clipPathUnits="userSpaceOnUse">
              <path d="M 24 22 L 165 22 C 190 22 200 0 228 0 L 292 0 A 28 28 0 0 1 320 28 L 320 132 A 28 28 0 0 1 292 160 L 24 160 A 24 24 0 0 1 0 136 L 0 46 A 24 24 0 0 1 24 22 Z" />
            </clipPath>
            
            {/* Pure Transparent Glass Fill */}
            <linearGradient id="card-glass-fill-base" x1="0" y1="0" x2="320" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.14)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.05)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.10)" />
            </linearGradient>

            {/* Glowing Crisp Crystal Rim Border - Defined & Luminous */}
            <linearGradient id="card-glass-border-base" x1="0" y1="0" x2="320" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
              <stop offset="35%" stopColor="rgba(255, 255, 255, 0.85)" />
              <stop offset="70%" stopColor="rgba(255, 255, 255, 0.65)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.95)" />
            </linearGradient>
          </defs>

          {/* Rendered Shape with Pure Transparent Glass Fill & Defined Border */}
          <path
            d="M 24 22 L 165 22 C 190 22 200 0 228 0 L 292 0 A 28 28 0 0 1 320 28 L 320 132 A 28 28 0 0 1 292 160 L 24 160 A 24 24 0 0 1 0 136 L 0 46 A 24 24 0 0 1 24 22 Z"
            fill="url(#card-glass-fill-base)"
            stroke="url(#card-glass-border-base)"
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Top-Right White Circular Button with Arrow */}
        <div className="absolute top-[6px] right-[10px] w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center transition-all duration-300 group-hover:scale-105 cursor-pointer shadow-md">
          <ArrowUpRight className="w-[18px] h-[18px] text-[#1E140D] stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* Card Body Content - Bottom Aligned */}
        <div className="relative z-10 px-5 sm:px-6 pb-4 sm:pb-5 pt-2 h-full flex flex-col justify-end">
          <h3 className="font-display font-bold text-white text-[18.5px] sm:text-[20.5px] tracking-[0.03em] leading-tight mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
            {title}
          </h3>
          <p className="font-sans text-[12px] sm:text-[13px] leading-[1.48] tracking-[0.015em] text-white/90 font-normal max-w-[265px] drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
            {description}
          </p>
        </div>
      </div>

      {/* 2. Pointer Line & Hotspot Pin pointing leftwards to the Bottom Cork Base */}
      <div className="hidden md:block absolute right-full top-[98px] pointer-events-none w-[170px] lg:w-[210px] xl:w-[240px] h-[140px]">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 200 130"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Animated Glow Connector Line */}
          <motion.path
            d="M 200 0 L 140 0 L 95 103 L 45 103"
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={imageLoaded ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Pulsing Outer Echo Ring */}
          <motion.circle
            cx="45"
            cy="103"
            r="12"
            fill="rgba(255, 255, 255, 0.2)"
            vectorEffect="non-scaling-stroke"
            initial={{ scale: 0, opacity: 0 }}
            animate={
              imageLoaded
                ? {
                    scale: [0.8, 1.8, 0.8],
                    opacity: [0.8, 0, 0.8],
                  }
                : { scale: 0, opacity: 0 }
            }
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: 1.2,
              ease: "easeInOut",
            }}
          />

          {/* Middle Glass Disc Ring */}
          <motion.circle
            cx="45"
            cy="103"
            r="7"
            fill="rgba(255, 255, 255, 0.35)"
            stroke="#ffffff"
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
            initial={{ scale: 0, opacity: 0 }}
            animate={imageLoaded ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Inner Solid Luminous White Dot */}
          <motion.circle
            cx="45"
            cy="103"
            r="3"
            fill="#ffffff"
            vectorEffect="non-scaling-stroke"
            initial={{ scale: 0, opacity: 0 }}
            animate={imageLoaded ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </div>

    </motion.div>
  );
}
