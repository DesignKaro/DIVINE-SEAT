"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

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
    title: "Numb Legs",
    desc: "Restricted circulation from cross-legged sitting leaves the legs and feet numb within minutes.",
    image: "/images/problems/problem_v2_1.avif",
    alt: "Leg numbness and restricted circulation during meditation",
  },
  {
    number: "02",
    title: "Hip Tightness",
    desc: "Without the right support, the hips can't settle — creating tension that builds through the whole sit.",
    image: "/images/problems/problem_v2_2.avif",
    alt: "Hip tightness and tension during meditation sitting",
  },
  {
    number: "03",
    title: "Knee Pressure",
    desc: "When the hips can't open freely, the knees carry the strain — making longer sits increasingly uncomfortable.",
    image: "/images/problems/problem_v2_3.avif",
    alt: "Knee pressure and strain during cross-legged sitting",
  },
  {
    number: "04",
    title: "Tailbone & Lower Back",
    desc: "All body weight concentrates at the base of the spine — the spot that tends to ache first and longest.",
    image: "/images/problems/problem_v2_4.avif",
    alt: "Tailbone and lower back ache during meditation",
  },
  {
    number: "05",
    title: "Slouching",
    desc: "Without a foundation that supports the pelvis, the spine gradually curves and the shoulders round forward.",
    image: "/images/problems/problem_v2_slouching.avif",
    alt: "Slouching posture during meditation sitting",
  },
  {
    number: "06",
    title: "Constant Readjustment",
    desc: "Each shift to find comfort pulls attention away from the practice — making stillness harder to reach.",
    image: "/images/problems/problem_v2_readjustment.avif",
    alt: "Constant readjustment and distraction during meditation",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const GAP = 16;

function getVisible(width: number) {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 4;
}

export default function ProblemsSection() {
  const [visible, setVisible] = useState(4); // SSR-safe default (desktop)
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Responsive visible count
  useEffect(() => {
    const update = () => {
      const v = getVisible(window.innerWidth);
      setVisible(v);
      setActiveIndex((i) => Math.min(i, problems.length - v));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = problems.length - visible;
  const prev = () => setActiveIndex((i) => Math.max(i - 1, 0));
  const next = () => setActiveIndex((i) => Math.min(i + 1, maxIndex));

  return (
    <section
      id="the-problem"
      data-header-theme="light"
      className="relative w-full bg-[#ECE7DE] text-[#402E1D] py-14 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-14 overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Corner Mandala Motifs */}
      <div className="absolute left-0 top-0 -translate-x-1/3 -translate-y-1/3 w-[260px] sm:w-[380px] lg:w-[440px] aspect-square pointer-events-none select-none z-0 opacity-[0.20] mix-blend-multiply">
        <Image src="/images/about.avif" alt="" fill unoptimized sizes="440px" className="object-contain" />
      </div>
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 w-[260px] sm:w-[380px] lg:w-[440px] aspect-square pointer-events-none select-none z-0 opacity-[0.20] mix-blend-multiply">
        <Image src="/images/about.avif" alt="" fill unoptimized sizes="440px" className="object-contain" />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto">

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
              <span className="font-sans text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.16em] uppercase text-[#876540]">
                /THE PROBLEM
              </span>
            </motion.div>
            <motion.h2
              variants={headerVariants}
              className="font-display font-semibold text-[32px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.12] tracking-[-0.015em] text-[#402E1D]"
            >
              Meditation shouldn't have to become a test of endurance.
            </motion.h2>
          </div>

          <motion.p
            variants={headerVariants}
            className="font-sans text-[14px] sm:text-[15px] leading-[1.65] text-[#402E1D]/80 font-normal max-w-[480px] md:pb-1"
          >
            Meditation can bring its own physical challenges — numb legs, tightness in the hips, pressure around the knees, aching through the tailbone and lower back, and a posture that gradually begins to slump. When the body struggles to settle, staying still and focused becomes harder too.
          </motion.p>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Clipping wrapper */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              style={{ gap: `${GAP}px`, cursor: "grab" }}
              animate={{
                x: `calc(-${activeIndex} * (100% / ${visible} + ${GAP / visible}px))`,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.05}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) next();
                else if (info.offset.x > 50) prev();
              }}
            >
              {problems.map((item, idx) => {
                const isExpanded = expandedIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setExpandedIndex((p) => (p === idx ? null : idx))}
                    className="group relative shrink-0 rounded-[26px] sm:rounded-[30px] overflow-hidden bg-[#E2DCD2] border border-[#402E1D]/8 cursor-pointer select-none"
                    style={{
                      width: `calc((100% - ${(visible - 1) * GAP}px) / ${visible})`,
                      aspectRatio: "3/4.2",
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className={`object-cover object-center transition-transform duration-700 ease-out will-change-transform ${
                        isExpanded ? "scale-105" : "group-hover:scale-105"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 pointer-events-none" />

                    {/* Glass label */}
                    <div className="absolute bottom-3 sm:bottom-3.5 inset-x-3 sm:inset-x-3.5 z-20">
                      <div
                        className="relative p-4 rounded-[20px] sm:rounded-[22px] overflow-hidden border border-white/80 transition-all duration-500 ease-out"
                        style={{
                          backdropFilter: "blur(28px) saturate(140%) brightness(1.04)",
                          WebkitBackdropFilter: "blur(28px) saturate(140%) brightness(1.04)",
                          transform: "translateZ(0)",
                          WebkitTransform: "translateZ(0)",
                          willChange: "transform, backdrop-filter",
                          background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 100%)",
                        }}
                      >
                        <div
                          className="absolute inset-0 pointer-events-none rounded-[20px] sm:rounded-[22px]"
                          style={{ background: "radial-gradient(120% 90% at 85% 10%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)" }}
                        />
                        <div className="relative z-10 flex items-center justify-between gap-2">
                          <h3 className="font-display font-bold text-[16px] sm:text-[17px] text-white leading-tight tracking-[0.02em]">
                            {item.title}
                          </h3>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isExpanded
                              ? "bg-white text-[#1E140D] scale-110 rotate-45"
                              : "bg-white/20 text-white group-hover:bg-white group-hover:text-[#1E140D] group-hover:scale-110"
                          }`}>
                            <ArrowUpRight className="w-4 h-4 stroke-[2.4]" />
                          </div>
                        </div>
                        <div className={`relative z-10 grid transition-all duration-500 ease-out ${
                          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr] sm:group-hover:grid-rows-[1fr]"
                        }`}>
                          <div className="overflow-hidden">
                            <p className={`font-sans text-[13px] sm:text-[12.5px] leading-[1.6] text-white/90 font-normal pt-3 transition-opacity duration-300 delay-100 ${
                              isExpanded ? "opacity-100" : "opacity-0 sm:group-hover:opacity-100"
                            }`}>
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-5 sm:mt-8">

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    activeIndex === i
                      ? "w-6 h-2 bg-[#876540]"
                      : "w-2 h-2 bg-[#402E1D]/25 hover:bg-[#876540]/60"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                disabled={activeIndex === 0}
                aria-label="Previous slide"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/75 hover:bg-white text-[#402E1D] flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.4]" />
              </button>
              <button
                onClick={next}
                disabled={activeIndex === maxIndex}
                aria-label="Next slide"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/75 hover:bg-white text-[#402E1D] flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-sm"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.4]" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
