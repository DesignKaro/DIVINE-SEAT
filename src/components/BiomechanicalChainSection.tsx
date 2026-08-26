"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MaterialItem {
  id: string;
  num: string;
  step: string;
  tag: string;
  title: string;
  role: string;
  fullDesc: string;
  image: string;
  caption: string;
}

const materialSteps: MaterialItem[] = [
  {
    id: "cork",
    num: "01",
    step: "01 — NATURAL CORK",
    tag: "THE FOUNDATION",
    title: "Natural Cork",
    role: "The Foundation",
    fullDesc:
      "Firm, lightweight and naturally resilient, cork gives The Lotus Seat its stable, inclined foundation without adding unnecessary weight.",
    image: "/images/materials/01-cork.avif",
    caption: "100% NATURAL RESILIENT CORK",
  },
  {
    id: "latex",
    num: "02",
    step: "02 — NATURAL LATEX",
    tag: "THE COMFORT",
    title: "Natural Latex",
    role: "The Comfort",
    fullDesc:
      "Naturally responsive and resilient, latex gently gives under the body while returning to its shape — creating softness without the deep sinking feeling of conventional soft foam.",
    image: "/images/materials/02-latex.avif",
    caption: "BOTANICAL NATURAL LATEX CORE",
  },
  {
    id: "cotton",
    num: "03",
    step: "03 — BREATHABLE COTTON",
    tag: "THE TOUCH",
    title: "Breathable Cotton",
    role: "The Touch",
    fullDesc:
      "Soft, breathable and comfortable against the body, the cotton cover creates the final layer between the seat and the practice — removable and washable for everyday use.",
    image: "/images/materials/03-cotton.avif",
    caption: "REMOVABLE & WASHABLE COTTON COVER",
  },
];

const slideContentVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -30 : 30,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function BiomechanicalChainSection() {
  const [[activeStep, direction], setActiveStepState] = useState<[number, number]>([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const setStep = (newStep: number) => {
    if (newStep === activeStep) return;
    const dir = newStep > activeStep ? 1 : -1;
    setActiveStepState([newStep, dir]);
  };

  const handlePrev = () => {
    const nextIdx = (activeStep - 1 + materialSteps.length) % materialSteps.length;
    setActiveStepState([nextIdx, -1]);
  };

  const handleNext = () => {
    const nextIdx = (activeStep + 1) % materialSteps.length;
    setActiveStepState([nextIdx, 1]);
  };

  // Autoplay timer with pause-on-hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStepState(([prev]) => [(prev + 1) % materialSteps.length, 1]);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const currentItem = materialSteps[activeStep];

  return (
    <section
      id="materials"
      data-header-theme="light"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full bg-[#ECE7DE] text-[#402E1D] py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-14 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 1. Left-Side Half-Bleed Sacred Mandala Background Motif */}
      <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[560px] md:w-[680px] lg:w-[760px] aspect-square pointer-events-none select-none z-0 opacity-[0.14] mix-blend-multiply">
        <Image
          src="/images/about.avif"
          alt="Sacred Mandala Motif (Left Half Bleed)"
          fill
          unoptimized
          sizes="(max-width: 1024px) 40vw, 30vw"
          className="object-contain object-center"
        />
      </div>

      {/* 2. Right-Side Half-Bleed Sacred Mandala Background Motif */}
      <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[560px] md:w-[680px] lg:w-[760px] aspect-square pointer-events-none select-none z-0 opacity-[0.14] mix-blend-multiply">
        <Image
          src="/images/about.avif"
          alt="Sacred Mandala Motif (Right Half Bleed)"
          fill
          unoptimized
          sizes="(max-width: 1024px) 40vw, 30vw"
          className="object-contain object-center"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto flex flex-col items-center">
        
        {/* Full-Width Section Header (Standard across all sections) */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-[660px]">
            {/* Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-3 sm:mb-4"
            >
              <span className="font-sans text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.16em] uppercase text-[#876540]">
                /MATERIALS
              </span>
            </motion.div>

            {/* Editorial Display Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.05 }}
              className="font-display font-semibold text-[32px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.12] tracking-[-0.015em] text-[#402E1D]"
            >
              Natural where it matters.
            </motion.h2>
          </div>

          {/* Subtitle Description on Right */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans text-[14px] sm:text-[15px] leading-[1.65] text-[#402E1D]/80 font-normal max-w-[480px] md:pb-1"
          >
            Three materials, each chosen for a reason — a grounded foundation, responsive comfort, and a breathable surface against the body.
          </motion.p>
        </div>

        {/* Animated Banner Showcase with Dynamic Slide Transition (Left Title | Center Image | Right Description) */}
        <div className="w-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#241A12] text-white relative min-h-[440px] lg:min-h-[490px] flex flex-col justify-between shadow-2xl">
          
          {/* Hero Section Background Image Layer */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <Image
              src="/hero_bg_v3.avif"
              alt="Divine Lotus Zen Sanctuary Background"
              fill
              quality={95}
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover object-center brightness-[0.92] contrast-[1.02]"
            />
            {/* Soft Ambient Scrim for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-black/45" />
          </div>

          {/* Dynamic Content Body */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex-1 flex items-center">
            <div className="w-full grid grid-cols-1 lg:grid-cols-[1.1fr_auto_1.1fr] items-center justify-items-stretch gap-8 lg:gap-12">
              
              {/* 1. LEFT: Step Number, Role & Material Title */}
              <div className="w-full text-left">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={currentItem.id}
                    custom={direction}
                    variants={slideContentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    {/* Material Title */}
                    <h3 className="font-display font-semibold sm:font-bold text-[34px] sm:text-[40px] md:text-[48px] leading-[1.1] text-white mb-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                      {currentItem.title}
                    </h3>

                    {/* Role Headline */}
                    <p className="font-sans text-[16px] sm:text-[18px] text-[#D8C7B5] font-semibold leading-[1.4] drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
                      {currentItem.role}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 2. CENTER: Clean 1:1 Aspect Ratio Image Frame */}
              <div
                onClick={handleNext}
                className="relative w-[260px] sm:w-[320px] md:w-[360px] lg:w-[380px] aspect-square mx-auto shrink-0 flex items-center justify-center my-2 sm:my-0 cursor-pointer select-none group"
                title="Click to view next material"
              >
                <div className="relative z-10 w-full h-full rounded-[22px] sm:rounded-[28px] overflow-hidden">
                  <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                      key={currentItem.id}
                      custom={direction}
                      variants={slideContentVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="w-full h-full relative"
                    >
                      <Image
                        src={currentItem.image}
                        alt={currentItem.title}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 260px, (max-width: 1024px) 360px, 380px"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* 3. RIGHT: Detailed Material Narrative Description */}
              <div className="w-full text-left flex flex-col justify-center">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={currentItem.id}
                    custom={direction}
                    variants={slideContentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <p className="font-sans text-[15px] sm:text-[16.5px] leading-[1.7] text-white/95 font-normal drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]">
                      {currentItem.fullDesc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* Clean Floating Prev / Next Arrow Controls */}
          <div className="absolute right-4 sm:right-6 md:right-8 bottom-4 sm:bottom-6 z-20 flex items-center gap-2.5">
            <button
              onClick={handlePrev}
              aria-label="Previous material"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#1E140D] flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-md shadow-sm"
            >
              <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.4]" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next material"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#1E140D] flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-md shadow-sm"
            >
              <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.4]" />
            </button>
          </div>

        </div>

        {/* Yogic Traditions Insight Text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full max-w-[880px] mt-8 sm:mt-12 text-center px-4"
        >
          <p className="font-sans text-[14.5px] sm:text-[16px] leading-[1.7] text-[#5C4D40] font-normal">
            In yogic traditions, the material and foundation of one’s seat have also been given consideration in practice. The Lotus Seat takes inspiration from that relationship, favouring natural materials wherever they can serve both the body and the practice.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

