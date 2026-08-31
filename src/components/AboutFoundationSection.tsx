"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

const leftContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const leftItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const rightFrameVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      delay: 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function AboutFoundationSection() {
  return (
    <section 
      id="the-seat" 
      data-header-theme="light"
      className="relative w-full min-h-screen text-[#402E1D] py-14 sm:py-24 lg:py-36 px-4 sm:px-10 lg:px-16 overflow-hidden flex items-center justify-center scroll-mt-16 sm:scroll-mt-24"
    >
      {/* Full-cover Background Image */}
      <Image
        src="/images/about-bg.avif"
        alt="About section background"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Warm overlay for legibility */}
      <div className="absolute inset-0 bg-[#E6DFD4]/45 backdrop-blur-[1px]" />

      {/* Main Content Grid Container */}
      <div className="relative z-10 w-full max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Editorial Narrative & Inset Detail Card (6 Cols) */}
          <motion.div
            variants={leftContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            className="lg:col-span-6 flex flex-col justify-center items-start"
          >
            {/* Category Eyebrow Tag */}
            <motion.div variants={leftItemVariants} className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="font-sans text-[13.5px] sm:text-[15px] font-extrabold tracking-[0.03em] uppercase text-[#73512E] underline underline-offset-4 decoration-2 decoration-[#876540]/80 pb-0.5">
                ABOUT THE LOTUS SEAT
              </span>
            </motion.div>

            {/* Large Bold Editorial Headline with kinetic masked reveal */}
            <AnimatedHeading
              text="A better foundation for stillness."
              className="font-display font-bold text-[32px] sm:text-[42px] md:text-[48px] lg:text-[52px] leading-[1.1] tracking-[-0.015em] text-[#402E1D] mb-5 sm:mb-6 max-w-[540px]"
            />

            {/* Editorial Narrative Copy */}
            <motion.div 
              variants={leftItemVariants}
              className="space-y-3.5 sm:space-y-4 font-sans text-[14.5px] sm:text-[16px] leading-[1.7] text-[#402E1D]/85 font-normal max-w-[520px] mb-7 sm:mb-9"
            >
              <p>
                The Lotus Seat is an ergonomically designed meditation seat made for longer, more comfortable sitting—helping reduce physical distractions such as back discomfort, pressure, numbness and constant readjustment.
              </p>
            </motion.div>

            {/* Signature Fused Pill Capsule Action Button */}
            <motion.div variants={leftItemVariants} className="relative inline-flex items-center">
              <a
                href="#the-solution"
                className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                {/* SVG Fused Pill + Circle Background */}
                <svg
                  className="w-[245px] sm:w-[265px] h-[46px] sm:h-[48px]"
                  viewBox="0 0 256 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="btn-about-fill" x1="0" y1="0" x2="256" y2="46" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="50%" stopColor="#F9F7F4" />
                      <stop offset="100%" stopColor="#FFFFFF" />
                    </linearGradient>
                    <linearGradient id="btn-about-border" x1="0" y1="0" x2="256" y2="46" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="rgba(64, 46, 29, 0.25)" />
                      <stop offset="50%" stopColor="rgba(216, 204, 189, 0.8)" />
                      <stop offset="100%" stopColor="rgba(64, 46, 29, 0.2)" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M 23 0 L 193 0 C 200 0 205 7 210 7 C 215 7 220 0 233 0 A 23 23 0 1 1 233 46 C 220 46 215 39 210 39 C 205 39 200 46 193 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                    fill="url(#btn-about-fill)"
                    stroke="url(#btn-about-border)"
                    strokeWidth="1.4"
                  />
                </svg>

                {/* Button Text */}
                <div className="absolute left-0 top-0 bottom-0 w-[198px] sm:w-[212px] flex items-center justify-center pointer-events-none">
                  <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.05em] uppercase text-[#1E140D] whitespace-nowrap">
                    Discover how it works
                  </span>
                </div>

                {/* Button Right Bronze Circle with Arrow */}
                <div className="absolute right-[4px] top-[4px] w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-full bg-[#876540] flex items-center justify-center group-hover:bg-[#6D5133] transition-colors duration-300">
                  <ArrowUpRight className="w-[17px] h-[17px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            </motion.div>

          </motion.div>

          {/* RIGHT COLUMN: Dominant Featured Lifestyle Frame 1:1 (6 Cols) */}
          <motion.div
            variants={rightFrameVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            className="lg:col-span-6 relative flex flex-col items-center lg:items-end w-full"
          >
            {/* Background Sacred Mandala Motif */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[480px] md:w-[560px] lg:w-[620px] aspect-square pointer-events-none select-none -z-10 opacity-[0.20] mix-blend-multiply"
              style={{
                maskImage: "radial-gradient(circle at center, black 40%, rgba(0,0,0,0.6) 65%, transparent 92%)",
                WebkitMaskImage: "radial-gradient(circle at center, black 40%, rgba(0,0,0,0.6) 65%, transparent 92%)",
              }}
            >
              <Image
                src="/images/about.avif"
                alt="Sacred Mandala Motif"
                fill
                unoptimized
                sizes="(max-width: 1024px) 50vw, 35vw"
                className="object-contain object-center"
              />
            </div>
            
            {/* 1:1 Aspect Ratio Frame Container */}
            <div className="relative w-full max-w-[540px] lg:max-w-[580px] aspect-square rounded-[30px] sm:rounded-[36px] overflow-hidden group bg-[#EDEFE0] shadow-[0_20px_50px_rgba(64,46,29,0.08)]">
              
              {/* Featured High-Res Editorial Photography */}
              <Image
                src="/images/about_seat_lifestyle_v6.avif"
                alt="The Divine Lotus in Minimalist Japanese Sanctuary"
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
              />

              {/* Soft Ambient Inner Corner Vignette */}
              <div className="absolute inset-0 pointer-events-none rounded-[30px] sm:rounded-[36px]" />

              {/* Floating Frosted Glass Feature Highlights Card - Sleek Low-Profile Bar */}
              <div className="absolute bottom-2 sm:bottom-3 inset-x-2 sm:inset-x-3.5 z-20 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative py-2.5 sm:py-3.5 px-3 sm:px-4 md:px-5 rounded-[16px] sm:rounded-[22px] overflow-hidden border border-white/80 pointer-events-auto w-full"
                  style={{
                    backdropFilter: "blur(28px) saturate(140%) brightness(1.04)",
                    WebkitBackdropFilter: "blur(28px) saturate(140%) brightness(1.04)",
                    transform: "translateZ(0)",
                    willChange: "transform, backdrop-filter",
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.04) 100%)",
                  }}
                >
                  {/* Polished Mineral Curved Specular Reflection (Identical to Hero Cards) */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-[16px] sm:rounded-[22px]"
                    style={{
                      background: "radial-gradient(120% 90% at 85% 10%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)",
                    }}
                  />

                  <div className="relative z-10 grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 divide-x divide-white/20">
                    {[
                      {
                        title: "Steady",
                        desc: "Settle into the seat",
                      },
                      {
                        title: "Comfortable",
                        desc: "Stay with the practice",
                      },
                      {
                        title: "Upright",
                        desc: "Rise naturally",
                      },
                    ].map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.25 }}
                        transition={{ duration: 0.6, delay: 0.3 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ y: -2 }}
                        className={`flex flex-col justify-center transition-colors ${idx > 0 ? "pl-2 sm:pl-3 md:pl-4" : ""}`}
                      >
                        <h4 className="font-display font-black text-[13.5px] sm:text-[16px] md:text-[17.5px] text-white leading-tight tracking-[0.03em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]">
                          {feature.title}
                        </h4>
                        <p className="font-sans text-[10.5px] sm:text-[12px] md:text-[12.5px] text-white/95 font-medium tracking-normal mt-0.5 leading-snug">
                          {feature.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

