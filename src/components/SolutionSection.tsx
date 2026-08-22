"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger safely on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
    badge: "8.5° Pelvic Elevation",
    title: "It tips you forward",
    desc: "The whole seat leans forward by 8°. That small angle rolls your hips into the right spot, so your back stacks up straight — you don’t have to hold it there.",
    image: "/images/solution/02.png",
    alt: "Forward pelvic tilt 8 degree angle support",
  },
  {
    number: "02",
    badge: "Botanical Latex Core",
    title: "It holds you up",
    desc: "Firm, springy latex supports your weight without letting you sink. You stay upright the whole sit, not just the first few minutes.",
    image: "/images/solution/01.png",
    alt: "Firm springy latex posture support",
  },
  {
    number: "03",
    badge: "Tailbone Pressure Channel",
    title: "It takes the pressure off",
    desc: "A soft dip down the middle keeps your tailbone from pressing into the seat — the one spot that usually starts to ache first.",
    image: "/images/solution/03.png",
    alt: "Tailbone pressure relief channel",
  },
];

export default function SolutionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < 0.33) {
            setActiveStep(0);
          } else if (progress < 0.66) {
            setActiveStep(1);
          } else {
            setActiveStep(2);
          }
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const current = solutionSteps[activeStep];

  return (
    <section
      ref={containerRef}
      id="the-solution"
      data-header-theme="light"
      className="relative w-full bg-[#F6F3ED] text-[#402E1D] h-[300vh]"
    >
      {/* Sticky Full-Screen Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 sm:px-10 lg:px-16">
        
        {/* Section Container */}
        <div className="relative z-10 w-full max-w-[1360px] mx-auto flex flex-col items-center">
          
          {/* Section Header */}
          <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12 lg:mb-14">
            <div className="max-w-[640px]">
              {/* Eyebrow Label */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="font-sans text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.16em] uppercase text-[#876540]">
                  /THE SOLUTION
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-display font-semibold text-[32px] sm:text-[42px] md:text-[46px] lg:text-[50px] leading-[1.12] tracking-[-0.015em] text-[#402E1D]">
                A seat that puts you in the right posture — for you.
              </h2>
            </div>

            {/* Description Paragraph */}
            <p className="font-sans text-[14px] sm:text-[15px] leading-[1.65] text-[#402E1D]/80 font-normal max-w-[420px] md:pb-1">
              You shouldn’t have to concentrate on sitting up straight. The Lotus Seat does the work, so all that’s left is the practice.
            </p>
          </div>

          {/* SINGLE UNIFIED SOLUTION CARD CONTAINER (Content Left, Image Right) */}
          <div 
            className="relative w-full rounded-[34px] sm:rounded-[40px] overflow-hidden border border-white/85 shadow-[0_24px_54px_-16px_rgba(64,46,29,0.08)] transition-all duration-500 backdrop-blur-3xl"
            style={{
              backdropFilter: "blur(48px) saturate(140%) brightness(1.05)",
              WebkitBackdropFilter: "blur(48px) saturate(140%) brightness(1.05)",
              transform: "translateZ(0)",
              willChange: "transform, backdrop-filter",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(249, 246, 240, 0.70) 50%, rgba(255, 255, 255, 0.82) 100%)",
              boxShadow: "inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.45), 0 20px 48px -12px rgba(64,46,29,0.08)",
            }}
          >
            {/* Ambient Glass Specular Sheen */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_90%_70%_at_45%_0%,rgba(255,255,255,0.75)_0%,transparent_75%)]" />

            {/* Dedicated High-Diffusion Blur Layer */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backdropFilter: "blur(36px)",
                WebkitBackdropFilter: "blur(36px)",
              }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center min-h-[450px] sm:min-h-[480px] lg:min-h-[500px]">
              
              {/* LEFT COLUMN INSIDE CARD: Content, Details & Button (8 Cols) */}
              <div className="relative lg:col-span-8 p-7 sm:p-9 lg:p-12 xl:p-14 flex flex-col justify-between h-full overflow-hidden">
                
                {/* Sacred Mandala Motif inside Card Left */}
                <div className="absolute -left-16 sm:-left-20 top-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] md:w-[480px] aspect-square pointer-events-none select-none z-0 opacity-15 mix-blend-multiply">
                  <Image
                    src="/images/about.png"
                    alt="Sacred Mandala Background Motif"
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 50vw, 40vw"
                    className="object-contain object-center"
                  />
                </div>
                
                {/* Dynamic Title & Narrative (Animated with step change) */}
                <div className="my-auto py-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h3 className="font-display font-bold text-[28px] sm:text-[34px] md:text-[38px] text-[#1E140D] leading-[1.12] tracking-[0.01em] mb-3.5 max-w-[540px]">
                        {current.title}
                      </h3>
                      <p className="font-sans text-[14px] sm:text-[15.5px] leading-[1.68] text-[#402E1D]/80 font-normal max-w-[500px]">
                        {current.desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom Actions & Step Navigation */}
                <div className="pt-6 sm:pt-8 mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  
                  {/* Circular Image Thumbnail Step Navigation */}
                  <div className="flex items-center gap-3 sm:gap-3.5">
                    {solutionSteps.map((step, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveStep(idx);
                          if (!containerRef.current) return;
                          const scrollY = containerRef.current.offsetTop + (idx / 2.2) * (containerRef.current.offsetHeight - window.innerHeight);
                          window.scrollTo({ top: scrollY, behavior: "smooth" });
                        }}
                        className={`group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center select-none ${
                          activeStep === idx
                            ? "ring-2 ring-[#876540] ring-offset-2 ring-offset-[#F6F3ED] scale-110 shadow-md"
                            : "opacity-55 hover:opacity-100 hover:scale-105 border border-[#402E1D]/20 hover:border-[#876540]/60"
                        }`}
                        aria-label={`Switch to step ${step.number}: ${step.title}`}
                      >
                        <div className="relative w-full h-full rounded-full overflow-hidden bg-[#EDEAE3]">
                          <Image
                            src={step.image}
                            alt={step.alt}
                            fill
                            sizes="48px"
                            className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Signature Fused Pill Capsule Action Button */}
                  <div className="relative inline-flex items-center">
                    <a
                      href="#buy"
                      className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                    >
                      {/* SVG Fused Pill + Circle Background */}
                      <svg
                        className="w-[200px] sm:w-[212px] h-[42px] sm:h-[44px]"
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
                      <div className="absolute left-0 top-0 bottom-0 w-[155px] sm:w-[165px] flex items-center justify-center pointer-events-none">
                        <span className="font-sans text-[11px] sm:text-[11.5px] font-bold tracking-[0.04em] uppercase text-[#1E140D] whitespace-nowrap">
                          Check how it works
                        </span>
                      </div>

                      {/* Button Right Dark Circle with Arrow */}
                      <div className="absolute right-[3px] top-[3px] w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#1E140D] flex items-center justify-center group-hover:bg-[#876540] transition-colors duration-300">
                        <ArrowUpRight className="w-[15px] h-[15px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </a>
                  </div>

                </div>

              </div>

              {/* RIGHT COLUMN INSIDE CARD: Compact Portrait Solution Photography (4 Cols) */}
              <div className="lg:col-span-4 p-3.5 sm:p-4 lg:p-5 flex items-center justify-center">
                <div className="relative w-full max-w-[360px] aspect-[3/3.8] sm:aspect-[3/3.9] lg:aspect-[3/3.7] min-h-[280px] sm:min-h-[340px] lg:min-h-[400px] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-white/90 bg-[#EDEAE3]">
                  
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

      </div>
    </section>
  );
}
