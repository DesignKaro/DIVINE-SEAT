"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import AnimatedReveal from "@/components/ui/AnimatedReveal";

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
    step: "01  - NATURAL CORK",
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
    step: "02  - NATURAL LATEX",
    tag: "THE COMFORT",
    title: "Natural Latex",
    role: "The Comfort",
    fullDesc:
      "Naturally responsive and resilient, latex gently gives under the body while returning to its shape  - creating softness without the deep sinking feeling of conventional soft foam.",
    image: "/images/materials/02-latex.avif",
    caption: "BOTANICAL NATURAL LATEX CORE",
  },
  {
    id: "cotton",
    num: "03",
    step: "03  - BREATHABLE COTTON",
    tag: "THE TOUCH",
    title: "Breathable Cotton",
    role: "The Touch",
    fullDesc:
      "Soft, breathable and comfortable against the body, the cotton cover creates the final layer between the seat and the practice  - removable and washable for everyday use.",
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
      className="relative w-full bg-transparent text-[#402E1D] py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-14 flex flex-col items-center justify-center scroll-mt-16 sm:scroll-mt-24"
    >
      <div className="relative z-10 w-full max-w-[1280px] mx-auto flex flex-col items-center">
        
        {/* Full-Width Section Header (Standard across all sections) */}
        <div className="w-full mb-10 sm:mb-14">
          {/* Eyebrow Label */}
          <AnimatedReveal delay={0.03} y={12} className="flex items-center gap-2 mb-3 sm:mb-4">
            <span className="font-sans text-[13.5px] sm:text-[15px] font-extrabold tracking-[0.03em] uppercase text-[#73512E] underline underline-offset-4 decoration-2 decoration-[#876540]/80 pb-0.5">
              MATERIALS
            </span>
          </AnimatedReveal>

          <div className="w-full flex flex-col md:flex-row md:items-start justify-between gap-6 sm:gap-10">
            <div className="max-w-[660px]">
              {/* Editorial Display Heading with kinetic reveal */}
              <AnimatedHeading
                text="Natural where it matters."
                className="font-display font-semibold text-[32px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.12] tracking-[-0.015em] text-[#402E1D]"
              />
            </div>

            {/* Subtitle Description on Right */}
            <AnimatedReveal delay={0.18} y={18} className="max-w-[540px] md:pt-1.5">
              <p className="font-sans text-[16px] sm:text-[17.5px] lg:text-[18.5px] leading-[1.65] sm:leading-[1.7] text-[#402E1D]/85 font-normal">
                Three materials, each chosen for a reason  - a grounded foundation, responsive comfort, and a breathable surface against the body.
              </p>
            </AnimatedReveal>
          </div>
        </div>

        {/* Animated Banner Showcase with 3 Left Navigators | Center Image | Right Description */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#241A12] text-white relative min-h-[440px] lg:min-h-[490px] flex flex-col justify-between shadow-2xl"
        >
          
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
              
              {/* 1. LEFT: 3 Material Navigators (Compact & Sleek on Phone View) */}
              <div className="w-full flex flex-col gap-1.5 sm:gap-3">
                {materialSteps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setStep(idx)}
                      onMouseEnter={() => setStep(idx)}
                      className={`relative w-full flex items-center gap-2.5 sm:gap-4 py-1.5 px-2.5 sm:p-3.5 rounded-[13px] sm:rounded-[22px] transition-all duration-300 cursor-pointer text-left select-none ${
                        isActive
                          ? "bg-white/15 backdrop-blur-md shadow-lg scale-[1.01] sm:scale-[1.02]"
                          : "opacity-55 hover:opacity-100 hover:bg-white/5 hover:scale-[1.01]"
                      }`}
                      aria-label={`Select ${step.title}`}
                    >
                      {/* Left Circle Image (Borderless, compact on mobile) */}
                      <div className="relative w-8 h-8 sm:w-13 sm:h-13 rounded-full overflow-hidden shrink-0 transition-transform duration-300">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 32px, 56px"
                          className="object-cover object-center"
                        />
                      </div>

                      {/* Right Title Only */}
                      <h3 className="font-display font-semibold sm:font-bold text-[15px] xs:text-[16.5px] sm:text-[23px] lg:text-[25px] text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                        {step.title}
                      </h3>
                    </button>
                  );
                })}
              </div>

              {/* 2. CENTER: Clean Aspect Ratio Image Frame (Compact on Phone View) */}
              <div
                onClick={handleNext}
                className="relative w-full max-w-[230px] xs:max-w-[260px] sm:max-w-none sm:w-[300px] md:w-[340px] lg:w-[360px] aspect-square mx-auto shrink-0 flex items-center justify-center my-1.5 sm:my-0 cursor-pointer select-none group"
                title="Click to view next material"
              >
                <div className="relative z-10 w-full h-full rounded-[18px] sm:rounded-[28px] overflow-hidden shadow-2xl">
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

        </motion.div>

        {/* Yogic Traditions Insight Text */}
        <AnimatedReveal
          delay={0.18}
          y={16}
          className="w-full max-w-[880px] mt-8 sm:mt-12 text-center px-4"
        >
          <p className="font-sans text-[14.5px] sm:text-[16px] leading-[1.7] text-[#5C4D40] font-normal">
            In yogic traditions, the material and foundation of one’s seat have also been given consideration in practice. The Lotus Seat takes inspiration from that relationship, favouring natural materials wherever they can serve both the body and the practice.
          </p>
        </AnimatedReveal>

      </div>
    </section>
  );
}
