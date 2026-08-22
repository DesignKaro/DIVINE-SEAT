"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface AnswerItem {
  id: string;
  number: string;
  pillTitle: string;
  question: string;
  answer: string;
  image: string;
  alt: string;
}

const answerItems: AnswerItem[] = [
  {
    id: "dual-core",
    number: "/01",
    pillTitle: "Dual-Density Latex & Cork Core",
    question: "What makes the dual-layer material unique?",
    answer:
      "Unlike memory foam that compresses flat or hard wood benches, our responsive botanical latex cushion absorbs sit-bone pressure with active rebound, anchored by a high-density renewable cork foundation.",
    image: "/images/seat-stack.webp",
    alt: "Lotus seat dual density latex and cork foundation",
  },
  {
    id: "coccyx-relief",
    number: "/02",
    pillTitle: "Coccyx & Tailbone Relief Groove",
    question: "How does it prevent tailbone ache and numbness?",
    answer:
      "The anatomical center relief groove provides zero-contact suspension for your tailbone, while contoured side slopes cradle the thighs to prevent nerve compression and numbness during extended practice.",
    image: "/images/seat-profile.webp",
    alt: "Meditation seat ergonomic relief groove",
  },
  {
    id: "body-fit",
    number: "/03",
    pillTitle: "Sizing, Posture & Leg Positions",
    question: "Which sitting postures work best with the Divine Seat?",
    answer:
      "Engineered for versatile comfort across Half Lotus (Ardha Padmasana), Full Lotus (Padmasana), Easy Cross-Legged (Sukhasana), Seiza kneeling, and Burmese postures across all heights and flexibility levels.",
    image: "/images/about_seat_lifestyle.jpg",
    alt: "Lotus seat versatile posture and body fit",
  },
  {
    id: "spinal-alignment",
    number: "/04",
    pillTitle: "Spinal Alignment & Pelvic Balance",
    question: "How does it support effortless upright posture?",
    answer:
      "By elevating your hips above knee level with a calibrated contour, it naturally tilts the pelvis forward to prevent lumbar rounding and release tension from the lower back and neck muscles.",
    image: "/images/seat-elevation.webp",
    alt: "Spinal alignment and pelvic posture elevation",
  },
  {
    id: "care-materials",
    number: "/05",
    pillTitle: "Washable Linen & Sustainable Care",
    question: "How do I care for and clean the seat?",
    answer:
      "The outer cover is woven from breathable organic linen with a concealed YKK zipper, easily removable for gentle machine washing. The antimicrobial cork base wipes clean with a damp cloth.",
    image: "/images/cork-tray.webp",
    alt: "Lotus seat washable organic linen and cork",
  },
  {
    id: "lifestyle-space",
    number: "/06",
    pillTitle: "Portability & Daily Space Integration",
    question: "Can it be used beyond traditional meditation?",
    answer:
      "Yes, its architectural silhouette doubles as a floor lounge chair, breathwork seat, tea ceremony cushion, or mindful reading perch in any contemporary living sanctuary.",
    image: "/images/gallery/01.png",
    alt: "Architectural floor chair in contemporary living sanctuary",
  },
  {
    id: "craft-longevity",
    number: "/07",
    pillTitle: "Materials, Longevity & Sourcing",
    question: "Where are the materials sourced and how long does it last?",
    answer:
      "Handcrafted from 100% biodegradable FSC-certified Mediterranean cork, natural rubber tree latex, and organic linen. Built to withstand daily practice for over a decade without sagging.",
    image: "/images/about_seat_inset.jpg",
    alt: "Handcrafted natural sustainable materials and artisan joinery",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function TheAnswerSection() {
  const [activeIndex, setActiveIndex] = useState(0); // Default to first item /01

  const currentItem = activeIndex >= 0 ? answerItems[activeIndex] : answerItems[0];

  return (
    <section
      id="questions-answers"
      data-header-theme="light"
      className="relative w-full bg-[#F6F3ED] text-[#402E1D] py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 flex flex-col items-center justify-center"
    >
      {/* Background Sacred Mandala Quadrants (Contained to preserve sticky behaviour) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* 1. Top-Left Corner Quadrant */}
        <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[560px] md:w-[680px] lg:w-[750px] aspect-square pointer-events-none select-none opacity-[0.24] mix-blend-multiply">
          <Image
            src="/images/about.png"
            alt="Sacred Mandala Motif (Top Left Quadrant)"
            fill
            unoptimized
            sizes="(max-width: 1024px) 50vw, 40vw"
            className="object-contain object-center"
          />
        </div>

        {/* 2. Bottom-Right Corner Quadrant */}
        <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 w-[420px] sm:w-[560px] md:w-[680px] lg:w-[750px] aspect-square pointer-events-none select-none opacity-[0.24] mix-blend-multiply">
          <Image
            src="/images/about.png"
            alt="Sacred Mandala Motif (Bottom Right Quadrant)"
            fill
            unoptimized
            sizes="(max-width: 1024px) 50vw, 40vw"
            className="object-contain object-center"
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1360px] mx-auto">
        
        {/* TOP SECTION HEADER (Reference Image Layout) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 lg:mb-12"
        >
          <div>
            {/* Eyebrow */}
            <motion.div variants={headerVariants} className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="font-sans text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.16em] uppercase text-[#876540]">
                /ABOUT DIVINE SEAT
              </span>
            </motion.div>

            {/* Main Headline (Normal Case) */}
            <motion.h2
              variants={headerVariants}
              className="font-display font-bold text-[34px] sm:text-[44px] md:text-[50px] lg:text-[56px] leading-[1.06] tracking-[-0.015em] text-[#1E140D]"
            >
              Your Questions<br />Our Answers
            </motion.h2>
          </div>

          {/* Narrative Paragraph on Right */}
          <motion.p
            variants={headerVariants}
            className="font-sans text-[14px] sm:text-[15.5px] leading-[1.68] text-[#402E1D]/80 font-normal max-w-[460px] md:pb-1"
          >
            Find answers to the most frequently asked questions about its advanced features, how to use and maintain it, and what makes it the perfect choice for improving your meditation posture.
          </motion.p>
        </motion.div>

        {/* MAIN TWO-COLUMN SHOWCASE (Left: /0X + Compact Image | Right: Accordion Stack) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start relative">
          
          {/* LEFT COLUMN (5 Cols): Compact Image (Sticky on Scroll) */}
          <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-28 xl:top-32 self-start z-10">
            
            {/* Top Row: Ghost Number + Compact Rounded Image */}
            <div className="flex items-start gap-3.5 sm:gap-5">
              
              {/* Big Ghost Number (/0X) */}
              <div className="shrink-0 pt-1.5 sm:pt-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentItem.number}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="font-sans font-bold text-[38px] sm:text-[48px] lg:text-[56px] leading-none text-[#402E1D]/25 select-none"
                  >
                    {currentItem.number}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Compact Showcase Image Container */}
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px] aspect-[4/3] rounded-[20px] sm:rounded-[24px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={currentItem.image}
                      alt={currentItem.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 30vw"
                      className="object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN (7 Cols): Interactive Dropdown Accordion Stack */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-3 sm:space-y-3.5 pt-2 lg:pt-0">
            {answerItems.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={item.id}
                  className={`w-full rounded-[18px] sm:rounded-[20px] select-none overflow-hidden transition-all duration-300 ${
                    isActive
                      ? "bg-[#7A5836] text-white shadow-[0_12px_32px_-10px_rgba(122,88,54,0.3)]"
                      : "bg-white hover:bg-[#FAF8F5] text-[#1E140D] shadow-[0_4px_20px_-8px_rgba(64,46,29,0.05)] border border-[#402E1D]/6"
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => setActiveIndex(isActive ? -1 : idx)}
                    className="w-full px-5 sm:px-7 py-3.5 sm:py-4 flex items-center justify-between cursor-pointer text-left focus:outline-none"
                    aria-expanded={isActive}
                    aria-label={`Toggle ${item.pillTitle}`}
                  >
                    {/* Left: Number + Title */}
                    <div className="flex items-center gap-3.5 sm:gap-4.5">
                      <span
                        className={`font-sans text-[13px] sm:text-[14px] font-bold transition-colors duration-200 ${
                          isActive ? "text-white/80" : "text-[#876540]"
                        }`}
                      >
                        {item.number}
                      </span>
                      <span
                        className={`font-display text-[17px] sm:text-[18.5px] md:text-[20px] font-bold tracking-[0.015em] transition-colors duration-200 ${
                          isActive ? "text-white" : "text-[#1E140D]"
                        }`}
                      >
                        {item.pillTitle}
                      </span>
                    </div>

                    {/* Right: Circular Action Arrow */}
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "text-[#1E140D]/80 group-hover:text-[#1E140D]"
                      }`}
                    >
                      <ArrowUpRight
                        className={`w-4 h-4 stroke-[2.4] transition-transform duration-300 ${
                          isActive ? "rotate-90" : "rotate-0"
                        }`}
                      />
                    </div>
                  </button>

                  {/* Accordion Expandable Dropdown Body (Zero Radius Distortion, No Divider) */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-350 ease-out ${
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`px-5 sm:px-7 pb-5 sm:pb-6 pt-0 transition-opacity duration-300 ${
                          isActive ? "opacity-100 delay-75" : "opacity-0"
                        }`}
                      >
                        <p className="font-display text-[17px] sm:text-[18.5px] font-bold text-white leading-snug mb-2 pt-1">
                          {item.question}
                        </p>
                        <p className="font-sans text-[13.5px] sm:text-[14.5px] leading-[1.65] text-white/85 font-normal">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
