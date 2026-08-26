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
    image: "/images/about_seat_lifestyle_v4.png",
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
      className="relative w-full bg-[#E6DFD4] text-[#402E1D] py-14 sm:py-20 lg:py-24 px-4 sm:px-10 lg:px-16 flex flex-col items-center justify-center"
    >
      {/* Background Sacred Mandala Motifs (Compact Corner Motifs) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* 1. Top-Left Corner Motif (Compact) */}
        <div className="absolute left-0 top-0 -translate-x-1/3 -translate-y-1/3 w-[260px] sm:w-[320px] md:w-[380px] lg:w-[440px] aspect-square pointer-events-none select-none opacity-[0.20] mix-blend-multiply">
          <Image
            src="/images/about.png"
            alt="Sacred Mandala Motif (Top Left)"
            fill
            unoptimized
            sizes="(max-width: 1024px) 30vw, 20vw"
            className="object-contain object-center"
          />
        </div>

        {/* 2. Bottom-Right Corner Motif (Compact) */}
        <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 w-[260px] sm:w-[320px] md:w-[380px] lg:w-[440px] aspect-square pointer-events-none select-none opacity-[0.20] mix-blend-multiply">
          <Image
            src="/images/about.png"
            alt="Sacred Mandala Motif (Bottom Right)"
            fill
            unoptimized
            sizes="(max-width: 1024px) 30vw, 20vw"
            className="object-contain object-center"
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto">
        
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
              <span className="font-sans text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.18em] uppercase text-[#876540]">
                /FAQS
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

        {/* MAIN TWO-COLUMN SHOWCASE (Left: Single Static Image | Right: Accordion Stack) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start relative">
          
          {/* LEFT COLUMN (5 Cols): Single Static Image (Sticky on Scroll) */}
          <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-28 xl:top-32 self-start z-10 h-fit">
            <div className="relative w-full max-w-[480px] lg:max-w-none aspect-[2752/1536] rounded-[20px] sm:rounded-[24px] overflow-hidden">
              <Image
                src="/images/faq_wedge_pillow.jpg"
                alt="The Lotus Seat — Frequently Asked Questions"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 40vw, 500px"
                className="object-contain sm:object-cover object-center"
                priority={false}
              />
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
                      ? "bg-[#7A5836] text-white"
                      : "bg-white hover:bg-[#FAF8F5] text-[#1E140D] border border-[#402E1D]/6"
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => setActiveIndex(isActive ? -1 : idx)}
                    className="w-full px-5 sm:px-7 py-3.5 sm:py-4 flex items-center justify-between cursor-pointer text-left focus:outline-none gap-3"
                    aria-expanded={isActive}
                    aria-label={`Toggle ${item.question}`}
                  >
                    {/* Left: Question Directly without Numbers */}
                    <div className="flex items-center min-w-0 pr-2">
                      <span
                        className={`font-display text-[16px] sm:text-[18.5px] md:text-[19.5px] font-bold tracking-[0.01em] leading-snug transition-colors duration-200 ${
                          isActive ? "text-white" : "text-[#1E140D]"
                        }`}
                      >
                        {item.question}
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

                  {/* Accordion Expandable Dropdown Body (Answer Only) */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-350 ease-out ${
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`px-5 sm:px-7 pb-4.5 sm:pb-5.5 pt-0 transition-opacity duration-300 ${
                          isActive ? "opacity-100 delay-75" : "opacity-0"
                        }`}
                      >
                        <p className="font-sans text-[13.5px] sm:text-[14.5px] leading-[1.65] text-white/90 font-normal">
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
