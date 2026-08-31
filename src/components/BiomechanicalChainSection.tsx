"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

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

  const handleNext = () => {
    const nextIdx = (activeStep + 1) % materialSteps.length;
    setActiveStepState([nextIdx, 1]);
  };

  // Autoplay timer with pause-on-hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStepState(([prev]) => [(prev + 1) % materialSteps.length, 1]);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const currentItem = materialSteps[activeStep];

  return (
    <section
      id="materials"
      data-header-theme="light"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full text-[#402E1D] py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-14 flex flex-col items-center justify-center overflow-hidden scroll-mt-16 sm:scroll-mt-24"
    >
      {/* Full-cover Background Image */}
      <Image
        src="/images/about-bg.avif"
        alt="Materials section background"
        fill
        priority={false}
        unoptimized
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Warm overlay for legibility with section color */}
      <div className="absolute inset-0 bg-[#E6DFD4]/45 backdrop-blur-[1px]" />

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
              <span className="font-sans text-[13.5px] sm:text-[15px] font-extrabold tracking-[0.12em] uppercase text-[#73512E] underline underline-offset-4 decoration-2 decoration-[#876540]/80 pb-0.5">
                MATERIALS
              </span>
            </motion.div>

            {/* Editorial Display Heading with kinetic reveal */}
            <AnimatedHeading
              text="Natural where it matters."
              className="font-display font-semibold text-[32px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.12] tracking-[-0.015em] text-[#402E1D]"
            />
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

        {/* Animated Banner Showcase with 3 Left Navigators | Center Image | Right Description */}
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
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/50" />
          </div>

          {/* Dynamic Content Body */}
          <div className="relative z-10 p-5 sm:p-8 lg:p-12 flex-1 flex items-center">
            <div className="w-full grid grid-cols-1 lg:grid-cols-[1.25fr_auto_1.1fr] items-center justify-items-stretch gap-6 lg:gap-10">
              
              {/* 1. LEFT: 3 Material Navigators (Only Title, No Step Row) */}
              <div className="w-full flex flex-col gap-2 sm:gap-3">
                {materialSteps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setStep(idx)}
                      onMouseEnter={() => setStep(idx)}
                      className={`relative w-full flex items-center gap-3.5 sm:gap-4 p-2.5 sm:p-3.5 rounded-[18px] sm:rounded-[22px] transition-all duration-300 cursor-pointer text-left select-none ${
                        isActive
                          ? "bg-white/15 backdrop-blur-md shadow-lg scale-[1.02]"
                          : "opacity-55 hover:opacity-100 hover:bg-white/5 hover:scale-[1.01]"
                      }`}
                      aria-label={`Select ${step.title}`}
                    >
                      {/* Left Circle Image (Borderless) */}
                      <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden shrink-0 transition-transform duration-300">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          unoptimized
                          sizes="56px"
                          className="object-cover object-center"
                        />
                      </div>

                      {/* Right Title Only */}
                      <h4 className="font-display font-semibold sm:font-bold text-[20px] sm:text-[23px] lg:text-[25px] text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                        {step.title}
                      </h4>
                    </button>
                  );
                })}
              </div>

              {/* 2. CENTER: Clean Aspect Ratio Image Frame (100% Full Width on phone view) */}
              <div
                onClick={handleNext}
                className="relative w-full sm:w-[300px] md:w-[340px] lg:w-[360px] aspect-square mx-auto shrink-0 flex items-center justify-center my-2 sm:my-0 cursor-pointer select-none group"
                title="Click to view next material"
              >
                <div className="relative z-10 w-full h-full rounded-[22px] sm:rounded-[28px] overflow-hidden shadow-2xl">
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
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 340px, 360px"
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
