"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import CushionFeatureCard from "./CushionFeatureCard";
import BaseFeatureCard from "./BaseFeatureCard";

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.15 });

  const textLines = [
    ["Sit", "better."],
    ["Meditate", "longer."],
  ];

  // Parent container orchestrating the typography sequence
  const titleContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.025,
        delayChildren: 0.15,
      },
    },
  };

  // Masked slide-up variant for title characters (Hardware-accelerated)
  const letterVariants: Variants = {
    hidden: {
      y: "115%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // Product Seat smooth slide-up variant (Hardware-accelerated)
  const productVariants: Variants = {
    hidden: {
      y: 50,
      opacity: 0,
      scale: 0.98,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.95,
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen min-h-[650px] flex items-center justify-center overflow-hidden bg-[#241a12]"
      data-header-theme="dark"
    >
      
      {/* 1. Background Layer (Static & optimized for zero lag) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src="/hero_bg_v3.avif"
            alt="Divine Lotus Zen Sanctuary Background"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-left md:object-[25%_center]"
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Ambient Lighting Scrim */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      {/* 2. Middle Layer: Display Typography (z-10) */}
      <div className="absolute inset-x-0 bottom-[34%] sm:bottom-[35%] md:bottom-[36%] lg:bottom-[37.5%] z-10 flex flex-col items-center justify-end px-4 select-none pointer-events-none -translate-y-[155px]">
        
        <motion.h1
          variants={titleContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
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
                    className="inline-block will-change-transform"
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
                    className="inline-block will-change-transform"
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
          description="Engineered with responsive botanical latex to dissipate pressure points while maintaining upright spinal balance."
          imageLoaded={isInView}
        />
      </div>

      {/* 3b. Right Feature Card Layer: Glassmorphic Card Pointing to Cork Base (z-30) */}
      <div className="absolute right-[3%] sm:right-[4%] md:right-[6%] lg:right-[8%] xl:right-[11%] bottom-[16%] sm:bottom-[18%] md:bottom-[19%] lg:bottom-[20%] z-30 pointer-events-none">
        <BaseFeatureCard
          title="Natural Cork Base"
          description="Portuguese cork with an 8.5° forward slope naturally tilts the pelvis to align the spine."
          imageLoaded={isInView}
        />
      </div>

      {/* 4. Foreground Layer: Divine Lotus Product Aligned Over Mat (z-20) */}
      <div className="absolute bottom-[36px] sm:bottom-[44px] md:bottom-[54px] lg:bottom-[68px] z-20 w-full flex justify-center items-end px-6 pointer-events-none">
        <motion.div
          variants={productVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[420px] lg:max-w-[490px] will-change-transform"
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
              alt="The Divine Lotus Ergonomic Meditation Cushion"
              fill
              priority
              sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, (max-width: 1024px) 420px, 490px"
              className="object-contain drop-shadow-[18px_24px_32px_rgba(36,20,8,0.38)] drop-shadow-[6px_10px_14px_rgba(25,12,4,0.22)] transition-transform duration-700 hover:scale-[1.015]"
            />
          </div>
        </motion.div>
      </div>

      {/* 5. Bottom Center Organic 'Scroll down' Dome Element (z-30) */}
      <div className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 z-30 flex items-end justify-center pointer-events-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={
            isInView
              ? { y: 0, opacity: 1 }
              : { y: 30, opacity: 0 }
          }
          transition={{
            duration: 0.8,
            delay: 0.35,
            ease: [0.16, 1, 0.3, 1],
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
            {/* Symmetrical Rounded Pill Arch Background blending into #F6F3ED below */}
            <svg
              className="w-[200px] sm:w-[225px] md:w-[245px] h-[38px] sm:h-[42px] drop-shadow-[0_-4px_16px_rgba(0,0,0,0.12)]"
              viewBox="0 0 240 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="scroll-btn-border" x1="0" y1="0" x2="0" y2="44" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
                  <stop offset="40%" stopColor="rgba(216, 204, 189, 0.8)" />
                  <stop offset="85%" stopColor="rgba(246, 243, 237, 0)" />
                  <stop offset="100%" stopColor="rgba(246, 243, 237, 0)" />
                </linearGradient>
                <linearGradient id="scroll-btn-shine" x1="0" y1="0" x2="0" y2="44" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 0)" />
                </linearGradient>
              </defs>

              {/* Seamless Arch Fill with exact #F6F3ED background */}
              <path
                d="M 0 44 C 24 44 38 41 46 26 C 54 10 68 0 88 0 L 152 0 C 172 0 186 10 194 26 C 202 41 216 44 240 44 Z"
                fill="#F6F3ED"
                stroke="url(#scroll-btn-border)"
                strokeWidth="1.3"
              />
              {/* Top Specular Rim Layer */}
              <path
                d="M 46 26 C 54 10 68 1.2 88 1.2 L 152 1.2 C 172 1.2 186 10 194 26 C 184 14 172 3 152 3 L 88 3 C 68 3 56 14 46 26 Z"
                fill="url(#scroll-btn-shine)"
                opacity="0.8"
              />
            </svg>

            {/* Content Inside Dome: Text + Arrow in Same Row */}
            <div className="absolute inset-0 pb-1 sm:pb-1.5 flex items-center justify-center gap-1.5 sm:gap-2 pointer-events-none">
              <span className="font-sans text-[12px] sm:text-[12.5px] font-semibold text-[#402E1D] tracking-[0.01em] leading-none select-none">
                Scroll down
              </span>
              <motion.div
                animate={{ y: [0, 2.5, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-[#402E1D] flex items-center"
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
