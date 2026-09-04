"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCtaSection() {
  const scrollToPricing = () => {
    const el = document.getElementById("pricing");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen bg-[#140D08] text-white flex flex-col justify-between overflow-hidden select-none">
      {/* 1. Cinematic Background Image: The Lotus Seat in Evening Stillness */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/final_cta_evening_seat.avif"
          alt="The Lotus Seat in serene evening atmosphere"
          fill
          priority={false}
          unoptimized
          className="object-cover object-center scale-100 sm:scale-105 transition-transform duration-1000 ease-out"
          sizes="100vw"
        />

        {/* Deep Sandalwood & Dusk Amber Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#140D08]/90 via-[#180F0A]/55 to-[#120B07]/95" />
        
        {/* Subtle Radial Vignette for Center Focus */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 45%, transparent 20%, rgba(18, 11, 7, 0.75) 85%, rgba(14, 8, 5, 0.95) 100%)",
          }}
        />

        {/* Top Smooth Transition Fade from FAQ */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#E6DFD4] to-transparent opacity-10" />
      </div>

      {/* 2. Top Breathing Space / Ambient Subtle Counter */}
      <div className="relative z-10 w-full pt-16 sm:pt-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#E6DFD4] font-sans text-[11.5px] sm:text-[13px] tracking-wide"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D8CCBD]" />
          <span>The practice begins with sitting down.</span>
        </motion.div>
      </div>

      {/* 3. Main Center Copy & Actions Block */}
      <div className="relative z-10 w-full max-w-[920px] mx-auto px-5 sm:px-8 py-10 sm:py-16 text-center flex flex-col items-center">
        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display font-medium text-[36px] sm:text-[54px] md:text-[66px] lg:text-[76px] leading-[1.12] sm:leading-[1.1] tracking-[-0.02em] text-white max-w-[780px]"
        >
          Sit with ease.
          <br />
          <span className="font-semibold text-[#F7F4EE]">Stay with the practice.</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-sans text-[15px] sm:text-[17px] md:text-[18.5px] text-[#EDE8DF]/90 font-normal mt-4 sm:mt-6 max-w-[540px] leading-relaxed"
        >
          A better foundation for the stillness within.
        </motion.p>

        {/* CTA Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 w-full max-w-[520px]"
        >
          {/* Primary CTA */}
          <button
            type="button"
            onClick={scrollToPricing}
            className="group relative flex-1 py-3.5 sm:py-4 px-6 sm:px-7 rounded-full bg-white text-[#1E140D] hover:bg-[#FAF8F5] font-sans text-[12.5px] sm:text-[13.5px] font-bold tracking-[0.03em] uppercase transition-all duration-300 shadow-[0_12px_32px_rgba(0,0,0,0.35)] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <span>ORDER THE LOTUS SEAT  - €149</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Secondary CTA */}
          <button
            type="button"
            onClick={scrollToPricing}
            className="group relative flex-1 py-3.5 sm:py-4 px-6 sm:px-7 rounded-full bg-white/12 hover:bg-white/20 text-white font-sans text-[12.5px] sm:text-[13.5px] font-semibold tracking-[0.03em] uppercase transition-all duration-300 backdrop-blur-md border border-white/20 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <span>CUSTOMISE YOURS  - €199</span>
            <ArrowRight className="w-4 h-4 text-white/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
          </button>
        </motion.div>

        {/* Inclusions Underneath */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 sm:mt-5 text-[#D8CCBD]/80 font-sans text-[12px] sm:text-[13px] tracking-wide"
        >
          Includes an additional cover + Sadhana Practice Guide
        </motion.div>
      </div>

      {/* 4. Whispered Closing Sign-off at the very bottom */}
      <div className="relative z-10 w-full pb-8 sm:pb-12 px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="font-display italic text-[14px] sm:text-[16px] md:text-[17px] text-[#EDE8DF]/60 tracking-wider hover:opacity-90 transition-opacity duration-300"
        >
          Close the screen when you’re ready. Sit for a while.
        </motion.p>
      </div>
    </section>
  );
}
