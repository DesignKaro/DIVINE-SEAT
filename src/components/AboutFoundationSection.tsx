"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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
      className="relative w-full min-h-screen bg-[#F6F3ED] text-[#402E1D] py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden flex items-center justify-center"
    >
      {/* Main Content Grid Container */}
      <div className="relative z-10 w-full max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Editorial Narrative & Inset Detail Card (5 Cols) */}
          <motion.div
            variants={leftContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            className="lg:col-span-5 flex flex-col justify-center items-start"
          >
            {/* Category Eyebrow Tag with Forward Slash */}
            <motion.div variants={leftItemVariants} className="flex items-center gap-2 mb-3.5 sm:mb-4.5">
              <span className="font-sans text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.16em] uppercase text-[#876540]">
                /ABOUT THE SEAT
              </span>
            </motion.div>

            {/* Large Bold Editorial Headline */}
            <motion.h2 
              variants={leftItemVariants}
              className="font-display font-bold text-[34px] sm:text-[44px] md:text-[50px] lg:text-[56px] leading-[1.08] tracking-[-0.015em] text-[#402E1D] mb-8 sm:mb-10 max-w-[480px]"
            >
              Anatomically sculpted foundation
            </motion.h2>

            {/* Inset Secondary Visual Card */}
            <motion.div
              variants={leftItemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
              className="relative w-full max-w-[280px] sm:max-w-[310px] aspect-[16/10] rounded-[22px] overflow-hidden shadow-[0_10px_30px_-8px_rgba(64,46,29,0.08)] bg-[#EDEFE0]/50 mb-7 group cursor-pointer"
            >
              <Image
                src="/images/about_seat_inset.jpg"
                alt="Divine Lotus Precision Studio Profile"
                fill
                sizes="(max-width: 640px) 280px, 310px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
              />
              
              {/* Micro Tag Badge */}
              <div className="absolute bottom-2.5 left-3 px-2.5 py-1 rounded-full bg-[#1E140D]/75 backdrop-blur-md border border-white/20 text-[10px] font-medium tracking-wider text-white/90 uppercase">
                Dual-Density Core
              </div>
            </motion.div>

            {/* Editorial Narrative Copy */}
            <motion.p 
              variants={leftItemVariants}
              className="font-sans text-[14px] sm:text-[15px] leading-[1.68] text-[#402E1D]/80 font-normal max-w-[410px] mb-8"
            >
              Crafted around an essential biomechanical truth: rather than continuously forcing the spine to fight gravity, begin with an unyielding 8.5° pelvic foundation that restores effortless anatomical alignment.
            </motion.p>

            {/* Signature Fused Pill Capsule Action Button */}
            <motion.div variants={leftItemVariants} className="relative inline-flex items-center">
              <a
                href="#why-it-works"
                className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                {/* SVG Fused Pill + Circle Background */}
                <svg
                  className="w-[230px] sm:w-[244px] h-[46px] sm:h-[48px]"
                  viewBox="0 0 236 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="btn-about-fill" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="50%" stopColor="#F9F7F4" />
                      <stop offset="100%" stopColor="#FFFFFF" />
                    </linearGradient>
                    <linearGradient id="btn-about-border" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="rgba(64, 46, 29, 0.25)" />
                      <stop offset="50%" stopColor="rgba(216, 204, 189, 0.8)" />
                      <stop offset="100%" stopColor="rgba(64, 46, 29, 0.2)" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M 23 0 L 173 0 C 180 0 185 7 190 7 C 195 7 200 0 213 0 A 23 23 0 1 1 213 46 C 200 46 195 39 190 39 C 185 39 180 46 173 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                    fill="url(#btn-about-fill)"
                    stroke="url(#btn-about-border)"
                    strokeWidth="1.4"
                  />
                </svg>

                {/* Button Text */}
                <div className="absolute left-0 top-0 bottom-0 w-[182px] sm:w-[192px] flex items-center justify-center pointer-events-none">
                  <span className="font-sans text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.04em] uppercase text-[#1E140D] whitespace-nowrap">
                    Check how it works
                  </span>
                </div>

                {/* Button Right Bronze Circle with Arrow */}
                <div className="absolute right-[4px] top-[4px] w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-full bg-[#876540] flex items-center justify-center group-hover:bg-[#6D5133] transition-colors duration-300">
                  <ArrowUpRight className="w-[17px] h-[17px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            </motion.div>

          </motion.div>

          {/* RIGHT COLUMN: Dominant Featured Lifestyle Frame (7 Cols) */}
          <motion.div
            variants={rightFrameVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            className="lg:col-span-7 relative flex flex-col items-end"
          >
            {/* Background Sacred Mandala Motif (With Soft Faded Radial Edges) */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] sm:w-[700px] md:w-[820px] lg:w-[940px] aspect-square pointer-events-none select-none -z-10 opacity-[0.28] mix-blend-multiply"
              style={{
                maskImage: "radial-gradient(circle at center, black 40%, rgba(0,0,0,0.6) 65%, transparent 92%)",
                WebkitMaskImage: "radial-gradient(circle at center, black 40%, rgba(0,0,0,0.6) 65%, transparent 92%)",
              }}
            >
              <Image
                src="/images/about.png"
                alt="Sacred Mandala Motif"
                fill
                unoptimized
                sizes="(max-width: 1024px) 80vw, 55vw"
                className="object-contain object-center"
              />
            </div>
            
            {/* Top-Right Corner Notched Architectural Frame Container */}
            <div className="relative w-full aspect-[4/3.45] sm:aspect-[4/3.35] max-h-[640px] min-h-[440px] sm:min-h-[520px] rounded-[34px] overflow-hidden group shadow-[0_24px_54px_-16px_rgba(64,46,29,0.12)] bg-[#EDEFE0]">
              
              {/* Featured High-Res Editorial Photography */}
              <Image
                src="/images/about_seat_lifestyle.jpg"
                alt="The Divine Lotus in Minimalist Japanese Sanctuary"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
              />

              {/* Soft Ambient Inner Corner Vignette / Scrim to prevent harsh edges */}
              <div className="absolute inset-0 pointer-events-none rounded-[34px] shadow-[inset_0_0_50px_rgba(30,20,13,0.12)]" />

              {/* Floating Frosted Glass Feature Highlights Card - Single Horizontal Row (Exact Hero Glass Style) */}
              <div className="absolute bottom-3.5 sm:bottom-5 inset-x-3.5 sm:inset-x-5 z-20 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative p-4 sm:p-5 md:p-5.5 rounded-[22px] sm:rounded-[26px] overflow-hidden border border-white/80 shadow-[0_20px_48px_rgba(0,0,0,0.25)] pointer-events-auto w-full"
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
                    className="absolute inset-0 pointer-events-none rounded-[22px] sm:rounded-[26px]"
                    style={{
                      background: "radial-gradient(120% 90% at 85% 10%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)",
                    }}
                  />

                  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
                    {[
                      {
                        title: "8.5° Cork Base",
                        desc: "Neutral pelvic tilt",
                      },
                      {
                        title: "Botanical Latex",
                        desc: "Zero-pressure relief",
                      },
                      {
                        title: "Organic Linen",
                        desc: "Breathable cover",
                      },
                    ].map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.25 }}
                        transition={{ duration: 0.6, delay: 0.3 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ y: -2 }}
                        className={`flex flex-col justify-center transition-colors ${idx > 0 ? "pt-2.5 sm:pt-0 sm:pl-4 md:pl-6" : ""}`}
                      >
                        <h4 className="font-display font-bold text-[17px] sm:text-[18.5px] md:text-[20px] text-white leading-tight tracking-[0.025em]">
                          {feature.title}
                        </h4>
                        <p className="font-sans text-[12px] sm:text-[13px] text-white/90 font-normal tracking-normal mt-0.5 sm:mt-1">
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

