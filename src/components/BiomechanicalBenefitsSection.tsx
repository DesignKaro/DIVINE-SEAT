"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import {
  MoveUp,
  Layers,
  Scale,
  Feather,
  Wind,
  Cloud,
  Infinity as InfinityIcon,
  ArrowUpRight,
} from "lucide-react";
import React from "react";

interface BenefitCard {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const benefitsList: BenefitCard[] = [
  {
    icon: <MoveUp className="w-5 h-5 stroke-[1.4]" />,
    title: "Naturally Upright",
    desc: "Sit tall without constantly reminding yourself to sit tall. The seat supports the body from beneath the pelvis rather than holding the back from behind.",
  },
  {
    icon: <Layers className="w-5 h-5 stroke-[1.4]" />,
    title: "Pelvic Support",
    desc: "A better foundation changes everything above it. The inclined and elevated foundation helps create a natural starting position for cross-legged meditation.",
  },
  {
    icon: <Scale className="w-5 h-5 stroke-[1.4]" />,
    title: "Hips Above the Knees",
    desc: "Elevating the sitting position gives the hips more room to open and can help the knees settle lower, creating a comfortable balanced base.",
  },
  {
    icon: <Feather className="w-5 h-5 stroke-[1.4]" />,
    title: "Tailbone & Pressure Comfort",
    desc: "The broad sitting surface and responsive cushioning distribute weight across the area rather than concentrating it beneath a small point.",
  },
  {
    icon: <Wind className="w-5 h-5 stroke-[1.4]" />,
    title: "Less Physical Distraction",
    desc: "Spend less time rearranging the body. Elevation and pressure distribution help address discomforts that interrupt longer sessions.",
  },
  {
    icon: <Cloud className="w-5 h-5 stroke-[1.4]" />,
    title: "Cloud-Like Comfort",
    desc: "Natural latex responds immediately. It gently gives beneath the sitter while maintaining support without the deep sinking sensation of soft foam.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function BiomechanicalBenefitsSection() {
  return (
    <section
      id="benefits"
      data-header-theme="light"
      className="relative w-full bg-[#E6DFD4] text-[#402E1D] py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-14 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1280px] mx-auto">
        
        {/* Section Header (Matches Solution Section Header Layout & Typography) */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12 lg:mb-14">
          <div className="max-w-[640px]">
            {/* Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-3 sm:mb-4"
            >
              <span className="font-sans text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.16em] uppercase text-[#876540]">
                /BENEFITS
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="font-display font-semibold text-[32px] sm:text-[42px] md:text-[46px] lg:text-[50px] leading-[1.12] tracking-[-0.015em] text-[#402E1D]"
            >
              What Changes When You Sit
            </motion.h2>
          </div>

          {/* Description Paragraph on Right */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-sans text-[14px] sm:text-[15px] leading-[1.65] text-[#402E1D]/80 font-normal max-w-[420px] md:pb-1"
          >
            Seven tangible structural shifts that occur the moment your pelvis meets the seat.
          </motion.p>
        </div>

        {/* 6 Grid Cards (3 Columns) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-6"
        >
          {benefitsList.map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group relative bg-white rounded-[26px] sm:rounded-[30px] p-7 sm:p-8 border border-[#402E1D]/6 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Hover Bottom-Right Corner Sacred Mandala Quadrant (Exact 1 Quadrant Centered at Corner) */}
              <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 w-[280px] sm:w-[340px] aspect-square pointer-events-none select-none z-0 opacity-0 group-hover:opacity-[0.24] scale-95 group-hover:scale-100 transition-all duration-500 ease-out mix-blend-multiply">
                <Image
                  src="/images/about.png"
                  alt="Sacred Mandala Quadrant Watermark"
                  fill
                  unoptimized
                  className="object-contain object-center"
                />
              </div>

              <div className="relative z-10">
                {/* Clean Borderless Icon Badge */}
                <div className="w-11 h-11 rounded-2xl bg-[#F6F3ED] text-[#876540] flex items-center justify-center mb-5 group-hover:bg-[#876540] group-hover:text-white transition-all duration-300">
                  {card.icon}
                </div>

                {/* Card Title (Bold Display) */}
                <h3 className="font-display font-bold text-[20px] sm:text-[22px] text-[#1E140D] tracking-[-0.01em] mb-2.5 leading-snug">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="font-sans text-[13px] sm:text-[13.5px] leading-[1.68] text-[#402E1D]/75 font-normal">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 7th Feature Card (Full Width Hero Bar, Shadowless) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="group relative bg-white rounded-[26px] sm:rounded-[30px] p-7 sm:p-8 lg:p-9 border border-[#402E1D]/6 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden"
        >
          {/* Hover Bottom-Right Corner Sacred Mandala Quadrant (Exact 1 Quadrant) */}
          <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 w-[360px] sm:w-[460px] aspect-square pointer-events-none select-none z-0 opacity-0 group-hover:opacity-[0.24] scale-95 group-hover:scale-100 transition-all duration-500 ease-out mix-blend-multiply">
            <Image
              src="/images/about.png"
              alt="Sacred Mandala Quadrant Watermark"
              fill
              unoptimized
              className="object-contain object-center"
            />
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-5 max-w-[760px]">
            {/* Clean Borderless Icon Badge */}
            <div className="w-11 h-11 rounded-2xl bg-[#F6F3ED] text-[#876540] flex items-center justify-center shrink-0 group-hover:bg-[#876540] group-hover:text-white transition-all duration-300">
              <InfinityIcon className="w-5 h-5 stroke-[1.4]" />
            </div>

            <div>
              {/* Card Title (Bold Display) */}
              <h3 className="font-display font-bold text-[21px] sm:text-[24px] text-[#1E140D] tracking-[-0.01em] mb-2 leading-snug">
                Longer Sitting
              </h3>

              {/* Card Description */}
              <p className="font-sans text-[13.5px] sm:text-[14px] leading-[1.68] text-[#402E1D]/75 font-normal">
                When the body asks for less attention, more attention remains for the practice. The seat does not meditate for us—it simply helps remove unnecessary physical friction.
              </p>
            </div>
          </div>

          {/* Signature Fused Pill Capsule Action Button (Exact About Section Style) */}
          <div className="shrink-0 relative inline-flex items-center">
            <a
              href="#pricing"
              className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              {/* SVG Fused Pill + Circle Background */}
              <svg
                className="w-[215px] sm:w-[230px] h-[44px] sm:h-[46px]"
                viewBox="0 0 236 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="btn-benefits-fill" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#F9F7F4" />
                    <stop offset="100%" stopColor="#FFFFFF" />
                  </linearGradient>
                  <linearGradient id="btn-benefits-border" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="rgba(64, 46, 29, 0.25)" />
                    <stop offset="50%" stopColor="rgba(216, 204, 189, 0.8)" />
                    <stop offset="100%" stopColor="rgba(64, 46, 29, 0.2)" />
                  </linearGradient>
                </defs>

                <path
                  d="M 23 0 L 173 0 C 180 0 185 7 190 7 C 195 7 200 0 213 0 A 23 23 0 1 1 213 46 C 200 46 195 39 190 39 C 185 39 180 46 173 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                  fill="url(#btn-benefits-fill)"
                  stroke="url(#btn-benefits-border)"
                  strokeWidth="1.4"
                />
              </svg>

              {/* Button Text */}
              <div className="absolute left-0 top-0 bottom-0 w-[170px] sm:w-[180px] flex items-center justify-center pointer-events-none">
                <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.06em] uppercase text-[#1E140D] whitespace-nowrap">
                  Experience It
                </span>
              </div>

              {/* Button Right Bronze Circle with Arrow */}
              <div className="absolute right-[4px] top-[4px] w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#876540] flex items-center justify-center group-hover:bg-[#6D5133] transition-colors duration-300">
                <ArrowUpRight className="w-[16px] h-[16px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
