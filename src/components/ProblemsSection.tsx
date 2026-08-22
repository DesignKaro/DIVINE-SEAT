"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProblemItem {
  number: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
}

const problems: ProblemItem[] = [
  {
    number: "01",
    title: "Your back slumps",
    desc: "A flat cushion lets your hips roll backward. Your spine curves, your shoulders round, and holding yourself up becomes work.",
    image: "/images/problems/01.png",
    alt: "Meditation back slump caused by flat cushion",
  },
  {
    number: "02",
    title: "Your tailbone aches",
    desc: "All your weight presses onto one small spot. After a while, it’s the only thing you can feel.",
    image: "/images/problems/02.png",
    alt: "Tailbone ache and pressure point strain",
  },
  {
    number: "03",
    title: "Your legs go numb",
    desc: "Poor support squeezes the blood flow in your legs, and your feet start to fall asleep within minutes.",
    image: "/images/problems/03.png",
    alt: "Leg numbness and restricted circulation",
  },
  {
    number: "04",
    title: "You keep shifting",
    desc: "So you fidget and re-adjust to find a bearable position — and every time, your focus goes with it.",
    image: "/images/problems/04.png",
    alt: "Constant shifting and distraction during sitting",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ProblemsSection() {
  return (
    <section
      id="the-problem"
      data-header-theme="light"
      className="relative w-full bg-[#ECE7DE] text-[#402E1D] py-20 sm:py-28 lg:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden flex items-center justify-center border-t border-[#402E1D]/6"
    >
      {/* 1. Top-Left Corner Quadrant Motif (1/4 Quadrant Bleed) */}
      <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[560px] md:w-[680px] lg:w-[750px] aspect-square pointer-events-none select-none z-0 opacity-[0.24] mix-blend-multiply">
        <Image
          src="/images/about.png"
          alt="Sacred Mandala Motif (Top Left Quadrant)"
          fill
          unoptimized
          sizes="(max-width: 1024px) 50vw, 40vw"
          className="object-contain object-center"
        />
      </div>

      {/* 2. Bottom-Right Corner Quadrant Motif (1/4 Quadrant Bleed) */}
      <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 w-[420px] sm:w-[560px] md:w-[680px] lg:w-[750px] aspect-square pointer-events-none select-none z-0 opacity-[0.24] mix-blend-multiply">
        <Image
          src="/images/about.png"
          alt="Sacred Mandala Motif (Bottom Right Quadrant)"
          fill
          unoptimized
          sizes="(max-width: 1024px) 50vw, 40vw"
          className="object-contain object-center"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1360px] mx-auto">
        
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="max-w-[620px]">
            {/* Eyebrow Label */}
            <motion.div variants={headerVariants} className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="font-sans text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.16em] uppercase text-[#876540]">
                /THE PROBLEM
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={headerVariants}
              className="font-display font-semibold text-[32px] sm:text-[42px] md:text-[46px] lg:text-[50px] leading-[1.12] tracking-[-0.015em] text-[#402E1D]"
            >
              Why traditional cushions fail your body
            </motion.h2>
          </div>

          {/* Description Paragraph */}
          <motion.p
            variants={headerVariants}
            className="font-sans text-[14px] sm:text-[15px] leading-[1.65] text-[#402E1D]/80 font-normal max-w-[420px] md:pb-1"
          >
            Sitting on a flat surface forces the spine to fight gravity. Without forward pelvic elevation and ergonomic relief, physical friction breaks your stillness within minutes.
          </motion.p>
        </motion.div>

        {/* 4 Problem Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-7"
        >
          {problems.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="group relative w-full aspect-[3/4] sm:aspect-[3/4.1] lg:aspect-[3/4.2] rounded-[26px] sm:rounded-[30px] overflow-hidden bg-[#E2DCD2] border border-[#402E1D]/8 shadow-[0_16px_36px_-12px_rgba(64,46,29,0.08)] cursor-pointer select-none"
            >
              {/* Card Image */}
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106 will-change-transform"
              />

              {/* Subtle Top-to-Bottom Gradient Scrim for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

              {/* Bottom Frosted Glass Interactive Text Overlay (Hero Section Style) */}
              <div className="absolute bottom-3 sm:bottom-3.5 inset-x-3 sm:inset-x-3.5 z-20">
                <div
                  className="relative p-4 sm:p-4.5 rounded-[20px] sm:rounded-[22px] overflow-hidden border border-white/80 transition-all duration-500 ease-out"
                  style={{
                    backdropFilter: "blur(28px) saturate(140%) brightness(1.04)",
                    WebkitBackdropFilter: "blur(28px) saturate(140%) brightness(1.04)",
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.04) 100%)",
                    boxShadow: "0 16px 40px -8px rgba(0,0,0,0.28)",
                  }}
                >
                  {/* Polished Mineral Curved Specular Reflection */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-[20px] sm:rounded-[22px]"
                    style={{
                      background: "radial-gradient(120% 90% at 85% 10%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)",
                    }}
                  />

                  {/* Title & Arrow Row */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <h3 className="font-display font-bold text-[16.5px] sm:text-[17.5px] text-white leading-tight tracking-[0.02em]">
                      {item.title}
                    </h3>
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:bg-white group-hover:scale-110">
                      <ArrowUpRight className="w-3.5 h-3.5 text-white transition-colors group-hover:text-[#1E140D] stroke-[2.4]" />
                    </div>
                  </div>

                  {/* Expandable Description Revealed On Hover */}
                  <div className="relative z-10 grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
                    <div className="overflow-hidden">
                      <p className="font-sans text-[12px] sm:text-[12.5px] leading-[1.55] text-white/90 font-normal pt-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-100">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
