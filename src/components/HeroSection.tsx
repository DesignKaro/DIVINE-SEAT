"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import CushionFeatureCard from "./CushionFeatureCard";
import BaseFeatureCard from "./BaseFeatureCard";

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const textLines = [
    ["Sit", "better."],
    ["Meditate", "longer."],
  ];

  // Parent container orchestrating the typography sequence
  const titleContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.035,
        delayChildren: 0.25,
      },
    },
  };

  // Masked slide-up variant for title characters
  const letterVariants: Variants = {
    hidden: {
      y: "125%",
      opacity: 0,
      filter: "blur(14px)",
      rotate: 2,
    },
    visible: {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      rotate: 0,
      transition: {
        duration: 1.15,
        ease: [0.19, 1, 0.22, 1] as const, // Luxury exponential deceleration
      },
    },
  };

  // Product Seat pure slide-up variant (slides up from below the viewport onto the mat)
  const productVariants: Variants = {
    hidden: {
      y: "120%",
      opacity: 1,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 1.45,
        delay: 0.4, // Enters smoothly over the mat
        ease: [0.19, 1, 0.22, 1] as const, // Pure luxury deceleration slide
      },
    },
  };

  return (
    <section className="relative w-full h-screen min-h-[650px] flex items-center justify-center overflow-hidden bg-[#241a12]">
      
      {/* 1. Progressive Glass Blur Background Layer (z-0) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ filter: "blur(35px) saturate(180%) brightness(0.95)", scale: 1.14, opacity: 0 }}
          animate={
            imageLoaded
              ? { filter: "blur(0px) saturate(100%) brightness(1)", scale: 1.08, opacity: 1 }
              : { filter: "blur(35px) saturate(180%) brightness(0.95)", scale: 1.14, opacity: 0.7 }
          }
          transition={{
            duration: 2.0,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative w-full h-full will-change-[filter,transform,opacity]"
        >
          <Image
            src="/hero_bg_v3.avif"
            alt="Divine Seat Zen Sanctuary Background"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-left md:object-[25%_center]"
            onLoad={() => setImageLoaded(true)}
          />
        </motion.div>

        {/* Ambient Lighting Scrim */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      {/* 2. Middle Layer: Display Typography (z-10) */}
      <div className="absolute inset-x-0 bottom-[34%] sm:bottom-[35%] md:bottom-[36%] lg:bottom-[37.5%] z-10 flex flex-col items-center justify-end px-4 select-none pointer-events-none -translate-y-[155px]">
        
        <motion.h1
          variants={titleContainerVariants}
          initial="hidden"
          animate={imageLoaded ? "visible" : "hidden"}
          className="font-display font-medium tracking-[0.025em] text-[clamp(40px,6.4vw,88px)] leading-[1.05] text-white drop-shadow-[0_6px_35px_rgba(0,0,0,0.35)] flex flex-col items-start max-w-[92vw]"
        >
          {/* Row 1: Sit better. (Left aligned) */}
          <div className="flex items-center gap-[0.28em]">
            {["Sit", "better."].map((word, wordIndex) => (
              <span key={wordIndex} className="inline-flex overflow-hidden pt-2 pb-6 -mt-2 -mb-6">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    variants={letterVariants}
                    className="inline-block will-change-[transform,filter,opacity]"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </div>

          {/* Row 2: Meditate longer. (Shifted to start right where row 1 ends) */}
          <div className="flex items-center gap-[0.28em] pl-[8vw] sm:pl-[12vw] md:pl-[15vw] lg:pl-[190px]">
            {["Meditate", "longer."].map((word, wordIndex) => (
              <span key={wordIndex} className="inline-flex overflow-hidden pt-2 pb-6 -mt-2 -mb-6">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    variants={letterVariants}
                    className="inline-block will-change-[transform,filter,opacity]"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </div>
        </motion.h1>
      </div>

      {/* 3. Left Feature Card Layer: Glassmorphic Card Pointing to Cushion (z-30) */}
      <div className="absolute left-[3%] sm:left-[4%] md:left-[6%] lg:left-[8%] xl:left-[11%] bottom-[24%] sm:bottom-[26%] md:bottom-[29%] lg:bottom-[31%] z-30 pointer-events-none">
        <CushionFeatureCard
          title="Ergonomic Cushion Core"
          description="The Divine Seat uses minimal energy while delivering powerful air purification, removing 99.9% of posture stress."
          imageLoaded={imageLoaded}
        />
      </div>

      {/* 3b. Right Feature Card Layer: Glassmorphic Card Pointing to Cork Base (z-30) */}
      <div className="absolute right-[3%] sm:right-[4%] md:right-[6%] lg:right-[8%] xl:right-[11%] bottom-[16%] sm:bottom-[18%] md:bottom-[19%] lg:bottom-[20%] z-30 pointer-events-none">
        <BaseFeatureCard
          title="Natural Cork Base"
          description="Portuguese cork with an 8.5° forward slope naturally tilts the pelvis to align the spine."
          imageLoaded={imageLoaded}
        />
      </div>

      {/* 4. Foreground Layer: Divine Seat Product Aligned Over Mat (z-20) */}
      <div className="absolute bottom-[36px] sm:bottom-[44px] md:bottom-[54px] lg:bottom-[68px] z-20 w-full flex justify-center items-end px-6 pointer-events-none">
        <motion.div
          variants={productVariants}
          initial="hidden"
          animate={imageLoaded ? "visible" : "hidden"}
          className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[420px] lg:max-w-[490px] will-change-[transform,opacity,filter]"
        >
          {/* Directional Sunlight Cast Shadow on Right-Bottom of Tatami Mat */}
          <div 
            className="absolute -bottom-2 left-[15%] w-[95%] h-14 md:h-16 bg-[#241508]/30 rounded-[100%] blur-2xl transform translate-x-8 translate-y-4 rotate-[1.5deg] pointer-events-none"
            aria-hidden="true" 
          />
          
          {/* Tighter Ground Contact Occlusion Shadow beneath Cork Base */}
          <div 
            className="absolute bottom-1 left-[10%] w-[85%] h-8 bg-[#1a0e05]/45 rounded-[100%] blur-md transform translate-x-4 translate-y-1 pointer-events-none"
            aria-hidden="true" 
          />

          {/* Product Image Layer with Directional Bottom-Right Drop Shadow */}
          <div className="relative aspect-[16/10] w-full">
            <Image
              src="/lotus_product_v2.webp"
              alt="The Divine Seat Ergonomic Meditation Cushion"
              fill
              priority
              sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, (max-width: 1024px) 420px, 490px"
              className="object-contain drop-shadow-[18px_24px_32px_rgba(36,20,8,0.38)] drop-shadow-[6px_10px_14px_rgba(25,12,4,0.22)] transition-transform duration-700 hover:scale-[1.015]"
            />
          </div>
        </motion.div>
      </div>

      {/* 5. Bottom Center Organic 'Scroll down' Dome Element (z-30) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 flex items-end justify-center pointer-events-auto">
        <motion.div
          initial={{ y: "115%", opacity: 0, filter: "blur(6px)" }}
          animate={
            imageLoaded
              ? { y: "0%", opacity: 1, filter: "blur(0px)" }
              : { y: "115%", opacity: 0, filter: "blur(6px)" }
          }
          transition={{
            duration: 1.25,
            delay: 1.0,
            ease: [0.19, 1, 0.22, 1],
          }}
        >
          <button
            onClick={() => {
              const nextSection = document.getElementById("the-seat") || document.getElementById("why-it-works");
              if (nextSection) {
                nextSection.scrollIntoView({ behavior: "smooth" });
              } else {
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
              }
            }}
            className="group relative flex items-end justify-center select-none cursor-pointer focus:outline-none transition-all duration-300 active:scale-[0.98]"
            aria-label="Scroll down"
          >
            {/* Symmetrical Rounded Pill Arch Background matching Header Style */}
            <svg
              className="w-[200px] sm:w-[225px] md:w-[245px] h-[38px] sm:h-[42px] drop-shadow-[0_-4px_14px_rgba(0,0,0,0.08)]"
              viewBox="0 0 240 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="scroll-btn-fill" x1="0" y1="0" x2="240" y2="44" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#F9F7F4" />
                  <stop offset="100%" stopColor="#FFFFFF" />
                </linearGradient>
                <linearGradient id="scroll-btn-border" x1="0" y1="0" x2="240" y2="44" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
                  <stop offset="35%" stopColor="rgba(255, 255, 255, 0.75)" />
                  <stop offset="70%" stopColor="rgba(216, 204, 189, 0.55)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.95)" />
                </linearGradient>
                <linearGradient id="scroll-btn-shine" x1="0" y1="0" x2="240" y2="44" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
                  <stop offset="40%" stopColor="rgba(255, 255, 255, 0.15)" />
                  <stop offset="70%" stopColor="rgba(255, 255, 255, 0.0)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.4)" />
                </linearGradient>
              </defs>

              {/* Mathematically Smooth Continuous Capsule Arch */}
              <path
                d="M 0 44 C 24 44 38 41 46 26 C 54 10 68 0 88 0 L 152 0 C 172 0 186 10 194 26 C 202 41 216 44 240 44 Z"
                fill="url(#scroll-btn-fill)"
                stroke="url(#scroll-btn-border)"
                strokeWidth="1.3"
              />
              {/* Top Specular Sheen Layer */}
              <path
                d="M 46 26 C 54 10 68 1.2 88 1.2 L 152 1.2 C 172 1.2 186 10 194 26 C 184 14 172 3 152 3 L 88 3 C 68 3 56 14 46 26 Z"
                fill="url(#scroll-btn-shine)"
                opacity="0.9"
              />
            </svg>

            {/* Content Inside Dome: Text + Arrow in Same Row */}
            <div className="absolute inset-0 pb-1 sm:pb-1.5 flex items-center justify-center gap-1.5 sm:gap-2 pointer-events-none">
              <span className="font-sans text-[12px] sm:text-[12.5px] font-semibold text-black tracking-[0.01em] leading-none select-none">
                Scroll down
              </span>
              <motion.div
                animate={{ y: [0, 2.5, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-black flex items-center"
              >
                <ArrowDown className="w-3.5 h-3.5 stroke-[2.4] transition-transform duration-300 group-hover:translate-y-0.5" />
              </motion.div>
            </div>
          </button>
        </motion.div>
      </div>

    </section>
  );
}
