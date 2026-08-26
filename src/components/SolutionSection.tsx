"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

interface SolutionStep {
  number: string;
  badge: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
}

const solutionSteps: SolutionStep[] = [
  {
    number: "01",
    badge: "Pelvic Support",
    title: "A stable foundation from the pelvis up.",
    desc: "Supports the base of the posture so the spine can rise more naturally.",
    image: "/images/solution/solution_step_1.avif",
    alt: "Pelvic support foundation for natural spine alignment",
  },
  {
    number: "02",
    badge: "Hip Elevation",
    title: "More room for the hips to settle.",
    desc: "Gentle elevation makes cross-legged sitting less demanding on the hips.",
    image: "/images/solution/solution_step_2.avif",
    alt: "Hip elevation for comfortable cross-legged sitting",
  },
  {
    number: "03",
    badge: "Knee Comfort",
    title: "Less strain through the legs.",
    desc: "A more balanced sitting position gives the knees more freedom to settle naturally.",
    image: "/images/solution/solution_step_3.avif",
    alt: "Knee comfort and reduced leg strain",
  },
  {
    number: "04",
    badge: "Tailbone & Lower-Back Comfort",
    title: "Support where long sitting is often felt most.",
    desc: "Responsive cushioning helps distribute pressure around the pelvis and sitting area.",
    image: "/images/solution/solution_step_4.avif",
    alt: "Tailbone and lower back pressure relief",
  },
  {
    number: "05",
    badge: "Naturally Upright Posture",
    title: "Upright without being held upright.",
    desc: "The seat supports the foundation of the posture rather than relying on a backrest.",
    image: "/images/solution/solution_step_5.avif",
    alt: "Natural upright posture support without backrest",
  },
  {
    number: "06",
    badge: "Less Readjustment",
    title: "Settle in and stay with it.",
    desc: "A stable, comfortable sitting position means less need to keep shifting in search of comfort.",
    image: "/images/solution/solution_step_6.avif",
    alt: "Stable sitting position with less need to readjust",
  },
];

export default function SolutionSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Smooth Autoplay interval
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % solutionSteps.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, activeStep]);

  const current = solutionSteps[activeStep];

  return (
    <section
      id="the-solution"
      data-header-theme="light"
      className="relative w-full bg-[#E6DFD4] text-[#402E1D] py-12 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-14 overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Section Container */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-10 lg:mb-12">
          <div className="max-w-[640px]">
            {/* Eyebrow Label */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.16em] uppercase text-[#876540]">
                /THE SOLUTION
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-display font-semibold text-[26px] sm:text-[38px] md:text-[44px] lg:text-[48px] leading-[1.14] tracking-[-0.015em] text-[#402E1D]">
              Designed to help the body settle.
            </h2>
          </div>

          {/* Description Paragraph */}
          <p className="font-sans text-[13px] sm:text-[15px] leading-[1.6] text-[#402E1D]/80 font-normal max-w-[420px] md:pb-1">
            The Lotus Seat brings comfort and support together in one foundation, helping the body sit naturally upright and stay comfortable for longer without constantly fighting the posture.
          </p>
        </div>

        {/* SINGLE UNIFIED SOLUTION CARD CONTAINER (Autoplay Card with pause on hover - No Shadows) */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative w-full rounded-[26px] sm:rounded-[36px] lg:rounded-[40px] overflow-hidden border border-white/85 transition-all duration-500"
          style={{
            backdropFilter: "blur(36px) saturate(130%)",
            WebkitBackdropFilter: "blur(36px) saturate(130%)",
            transform: "translateZ(0)",
            WebkitTransform: "translateZ(0)",
            willChange: "transform, backdrop-filter",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(249, 246, 240, 0.65) 50%, rgba(255, 255, 255, 0.80) 100%)",
          }}
        >
          {/* Ambient Glass Specular Sheen */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_90%_70%_at_45%_0%,rgba(255,255,255,0.75)_0%,transparent_75%)]" />

          {/* Dedicated Always-Active Blur Layer */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backdropFilter: "blur(32px) saturate(130%)",
              WebkitBackdropFilter: "blur(32px) saturate(130%)",
              transform: "translateZ(0)",
              WebkitTransform: "translateZ(0)",
              willChange: "transform, backdrop-filter",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center min-h-0 sm:min-h-[460px] lg:min-h-[500px]">
            
            {/* LEFT COLUMN INSIDE CARD: Content, Details & Button (8 Cols) */}
            <div className="relative lg:col-span-8 p-5 sm:p-8 lg:p-12 xl:p-14 flex flex-col justify-between h-full overflow-hidden">
              
              {/* Sacred Mandala Motif inside Card Left */}
              <div className="absolute -left-16 sm:-left-20 top-1/2 -translate-y-1/2 w-[300px] sm:w-[420px] md:w-[480px] aspect-square pointer-events-none select-none z-0 opacity-15 mix-blend-multiply">
                <Image
                  src="/images/about.avif"
                  alt="Sacred Mandala Background Motif"
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 50vw, 40vw"
                  className="object-contain object-center"
                />
              </div>
              
              {/* Dynamic Title & Narrative (Animated with step change) */}
              <div className="my-auto py-1 sm:py-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Badge as primary heading */}
                    <h3 className="font-display font-semibold text-[22px] sm:text-[30px] md:text-[34px] text-[#1E140D] leading-[1.15] tracking-[-0.01em] mb-2 sm:mb-3 max-w-[540px]">
                      {current.badge}
                    </h3>

                    {/* Title as subtitle */}
                    <p className="font-sans text-[13px] sm:text-[15px] leading-[1.62] text-[#402E1D] font-medium max-w-[500px] mb-1">
                      {current.title}
                    </p>

                    {/* Description */}
                    <p className="font-sans text-[13px] sm:text-[15px] leading-[1.62] text-[#402E1D]/70 font-normal max-w-[500px]">
                      {current.desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Actions & Step Navigation */}
              <div className="pt-4 sm:pt-6 mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Circular Image Thumbnail Step Navigation & Prev / Next Controls */}
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  {/* Thumbnails */}
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    {solutionSteps.map((step, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveStep(idx);
                        }}
                        className={`group relative w-9 h-9 sm:w-11 sm:h-11 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center select-none ${
                          activeStep === idx
                            ? "ring-2 ring-[#876540] ring-offset-2 ring-offset-[#E6DFD4] scale-105"
                            : "opacity-55 hover:opacity-100 hover:scale-105 border border-[#402E1D]/20 hover:border-[#876540]/60"
                        }`}
                        aria-label={`Switch to step ${step.number}: ${step.title}`}
                      >
                        <div className="relative w-full h-full rounded-full overflow-hidden bg-[#EDEAE3]">
                          <Image
                            src={step.image}
                            alt={step.alt}
                            fill
                            unoptimized
                            sizes="44px"
                            className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Prev & Next Arrow Controls */}
                  <div className="flex items-center gap-1 ml-0.5 sm:ml-1">
                    <button
                      onClick={() => {
                        setActiveStep((prev) => (prev - 1 + solutionSteps.length) % solutionSteps.length);
                      }}
                      aria-label="Previous step"
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/75 hover:bg-white text-[#402E1D] flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer shadow-sm"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.4]" />
                    </button>
                    <button
                      onClick={() => {
                        setActiveStep((prev) => (prev + 1) % solutionSteps.length);
                      }}
                      aria-label="Next step"
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/75 hover:bg-white text-[#402E1D] flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer shadow-sm"
                    >
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.4]" />
                    </button>
                  </div>
                </div>

                {/* Signature Fused Pill Capsule Action Button */}
                <div className="relative inline-flex items-center">
                  <a
                    href="#buy"
                    className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                  >
                    {/* SVG Fused Pill + Circle Background */}
                    <svg
                      className="w-[185px] sm:w-[212px] h-[39px] sm:h-[44px]"
                      viewBox="0 0 236 46"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id="btn-sol-card-fill" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#FFFFFF" />
                          <stop offset="50%" stopColor="#F9F7F4" />
                          <stop offset="100%" stopColor="#FFFFFF" />
                        </linearGradient>
                        <linearGradient id="btn-sol-card-border" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="rgba(64, 46, 29, 0.25)" />
                          <stop offset="50%" stopColor="rgba(216, 204, 189, 0.8)" />
                          <stop offset="100%" stopColor="rgba(64, 46, 29, 0.2)" />
                        </linearGradient>
                      </defs>

                      <path
                        d="M 23 0 L 173 0 C 180 0 185 7 190 7 C 195 7 200 0 213 0 A 23 23 0 1 1 213 46 C 200 46 195 39 190 39 C 185 39 180 46 173 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                        fill="url(#btn-sol-card-fill)"
                        stroke="url(#btn-sol-card-border)"
                        strokeWidth="1.4"
                      />
                    </svg>

                    {/* Button Text */}
                    <div className="absolute left-0 top-0 bottom-0 w-[145px] sm:w-[165px] flex items-center justify-center pointer-events-none px-2">
                      <span className="font-sans text-[10.5px] sm:text-[11.5px] font-bold tracking-[0.02em] uppercase text-[#1E140D] whitespace-nowrap">
                        Check how it works
                      </span>
                    </div>

                    {/* Button Right Dark Circle with Arrow */}
                    <div className="absolute right-[3px] top-[3px] w-[33px] h-[33px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#1E140D] flex items-center justify-center group-hover:bg-[#876540] transition-colors duration-300">
                      <ArrowUpRight className="w-[13px] h-[13px] sm:w-[15px] sm:h-[15px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </a>
                </div>

              </div>

            </div>

            {/* RIGHT COLUMN INSIDE CARD: Compact Solution Photography (4 Cols) */}
            <div className="lg:col-span-4 p-3 sm:p-4 lg:p-5 flex items-center justify-center">
              <div className="relative w-full max-w-[340px] aspect-[16/11] sm:aspect-[3/3.8] lg:aspect-[3/3.7] min-h-[190px] sm:min-h-[300px] lg:min-h-[380px] rounded-[18px] sm:rounded-[26px] overflow-hidden border border-white/90 bg-[#EDEAE3]">
                
                {/* Stacked Images crossfading smoothly with active step */}
                {solutionSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-700 ease-out will-change-[opacity,transform] ${
                      activeStep === idx
                        ? "opacity-100 scale-100 z-10"
                        : "opacity-0 scale-104 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      unoptimized
                      priority={idx === 0}
                      sizes="(max-width: 1024px) 100vw, 34vw"
                      className="object-cover object-center"
                    />

                    {/* Subtle Vignette Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none" />

                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
