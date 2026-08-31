"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Zap, Compass, Flame, Activity, TrendingDown, RefreshCw } from "lucide-react";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

interface ProblemItem {
  number: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
  icon: React.ComponentType<{ className?: string }>;
}

const problems: ProblemItem[] = [
  {
    number: "01",
    title: "Numb Legs",
    desc: "Restricted circulation from cross-legged sitting leaves the legs and feet numb within minutes.",
    image: "/images/problems/problem_v2_1.avif",
    alt: "Leg numbness and restricted circulation during meditation",
    icon: Zap,
  },
  {
    number: "02",
    title: "Hip Tightness",
    desc: "Without the right support, the hips can't settle — creating tension that builds through the whole sit.",
    image: "/images/problems/problem_v2_2.avif",
    alt: "Hip tightness and tension during meditation sitting",
    icon: Compass,
  },
  {
    number: "03",
    title: "Knee Pressure",
    desc: "When the hips can't open freely, the knees carry the strain — making longer sits increasingly uncomfortable.",
    image: "/images/problems/problem_v2_3.avif",
    alt: "Knee pressure and strain during cross-legged sitting",
    icon: Flame,
  },
  {
    number: "04",
    title: "Tailbone & Lower Back",
    desc: "All body weight concentrates at the base of the spine — the spot that tends to ache first and longest.",
    image: "/images/problems/problem_v2_4.avif",
    alt: "Tailbone and lower back ache during meditation",
    icon: Activity,
  },
  {
    number: "05",
    title: "Slouching",
    desc: "Without a foundation that supports the pelvis, the spine gradually curves and the shoulders round forward.",
    image: "/images/problems/problem_v2_slouching.avif",
    alt: "Slouching posture during meditation sitting",
    icon: TrendingDown,
  },
  {
    number: "06",
    title: "Constant Readjustment",
    desc: "Each shift to find comfort pulls attention away from the practice — making stillness harder to reach.",
    image: "/images/problems/problem_v2_readjustment.avif",
    alt: "Constant readjustment and distraction during meditation",
    icon: RefreshCw,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ProblemsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section
      id="the-problem"
      data-header-theme="light"
      className="relative w-full text-[#402E1D] py-14 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-14 overflow-hidden flex flex-col items-center justify-center scroll-mt-16 sm:scroll-mt-24"
    >
      {/* Full-cover Background Image (Laterally Inverted) */}
      <Image
        src="/images/about-bg.avif"
        alt="Problems section background"
        fill
        priority={false}
        unoptimized
        sizes="100vw"
        className="object-cover object-center scale-x-[-1]"
      />

      {/* Warm overlay for legibility with section color */}
      <div className="absolute inset-0 bg-[#E6DFD4]/45 backdrop-blur-[1px]" />

      {/* Corner Mandala Motifs */}
      <div className="absolute left-0 top-0 -translate-x-1/3 -translate-y-1/3 w-[260px] sm:w-[380px] lg:w-[440px] aspect-square pointer-events-none select-none z-0 opacity-[0.20] mix-blend-multiply">
        <Image src="/images/about.avif" alt="" fill unoptimized sizes="440px" className="object-contain" />
      </div>
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 w-[260px] sm:w-[380px] lg:w-[440px] aspect-square pointer-events-none select-none z-0 opacity-[0.20] mix-blend-multiply">
        <Image src="/images/about.avif" alt="" fill unoptimized sizes="440px" className="object-contain" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto">

        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14"
        >
          <div className="max-w-[660px]">
            <motion.div variants={headerVariants} className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="font-sans text-[13.5px] sm:text-[15px] font-extrabold tracking-[0.12em] uppercase text-[#73512E] underline underline-offset-4 decoration-2 decoration-[#876540]/80 pb-0.5">
                THE PROBLEM
              </span>
            </motion.div>
            <AnimatedHeading
              text="Meditation shouldn't have to become a test of endurance."
              className="font-display font-semibold text-[32px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.12] tracking-[-0.015em] text-[#402E1D]"
            />
          </div>

          <motion.p
            variants={headerVariants}
            className="font-sans text-[14px] sm:text-[15px] leading-[1.65] text-[#402E1D]/80 font-normal max-w-[500px] md:pb-1"
          >
            Longer periods of meditation can bring physical discomfort — numb legs, tightness in the hips, pressure around the knees, aching through the tailbone and lower back, and a posture that gradually begins to slump. As the body becomes uncomfortable, the need to constantly readjust makes stillness harder to maintain.
          </motion.p>
        </motion.div>

        {/* 3x2 Animated Grid (Centered & Scaled Down) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.12 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 max-w-[1140px] mx-auto w-full"
        >
          {problems.map((item, idx) => {
            const isExpanded = expandedIndex === idx;
            const IconComponent = item.icon;

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                onClick={() => setExpandedIndex((p) => (p === idx ? null : idx))}
                className="group relative rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#E2DCD2] border border-[#402E1D]/10 cursor-pointer select-none shadow-[0_16px_36px_rgba(64,46,29,0.06)] hover:shadow-[0_24px_50px_rgba(64,46,29,0.12)] transition-shadow duration-500 aspect-square w-full"
              >
                {/* Background Photography */}
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out will-change-transform group-hover:scale-106"
                />

                {/* Ambient Scrim Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

                {/* Floating Frosted Glass Label Card */}
                <div className="absolute bottom-3 sm:bottom-3.5 inset-x-3 sm:inset-x-3.5 z-20">
                  <div
                    className="relative p-3.5 sm:p-4 rounded-[18px] sm:rounded-[22px] overflow-hidden border border-white/80 transition-all duration-500 ease-out"
                    style={{
                      backdropFilter: "blur(28px) saturate(140%) brightness(1.04)",
                      WebkitBackdropFilter: "blur(28px) saturate(140%) brightness(1.04)",
                      transform: "translateZ(0)",
                      WebkitTransform: "translateZ(0)",
                      willChange: "transform, backdrop-filter",
                      background: "linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 100%)",
                    }}
                  >
                    {/* Specular Curved Sheen */}
                    <div
                      className="absolute inset-0 pointer-events-none rounded-[18px] sm:rounded-[22px]"
                      style={{ background: "radial-gradient(120% 90% at 85% 10%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)" }}
                    />

                    {/* Title + Relevant Icon Badge (No Icon Border) */}
                    <div className="relative z-10 flex items-center justify-between gap-2.5">
                      <h3 className="font-display font-bold text-[15.5px] sm:text-[17px] text-white leading-tight tracking-[0.015em]">
                        {item.title}
                      </h3>

                      {/* Icon Circle on Right Side of Title (No Border) */}
                      <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 text-white group-hover:bg-white group-hover:text-[#876540] group-hover:scale-110 transition-all duration-300">
                        <IconComponent className="w-3.5 h-3.5 stroke-[2.2]" />
                      </div>
                    </div>

                    {/* Description Reveal on Hover / Click */}
                    <div className={`relative z-10 grid transition-all duration-500 ease-out ${
                      isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr] sm:group-hover:grid-rows-[1fr]"
                    }`}>
                      <div className="overflow-hidden">
                        <p className={`font-sans text-[12.5px] sm:text-[13px] leading-[1.6] text-white/90 font-normal pt-2.5 transition-opacity duration-300 delay-75 ${
                          isExpanded ? "opacity-100" : "opacity-0 sm:group-hover:opacity-100"
                        }`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
