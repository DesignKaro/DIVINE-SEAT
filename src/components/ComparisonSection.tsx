"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import AnimatedReveal from "@/components/ui/AnimatedReveal";

interface ComparisonRow {
  feature: string;
  traditional: string;
  lotusSeat: string;
}

const comparisonData: ComparisonRow[] = [
  {
    feature: "Foundation",
    traditional: "Soft or filled structure that can shift with use",
    lotusSeat: "Structured cork foundation that keeps its form",
  },
  {
    feature: "Pelvic Position",
    traditional: "Elevation depends on shape, filling and how it is used",
    lotusSeat: "Purposeful incline designed to support the pelvis",
  },
  {
    feature: "Posture",
    traditional: "The practitioner finds and maintains their own alignment",
    lotusSeat: "Designed to make a naturally upright position easier to find and maintain",
  },
  {
    feature: "Hip Position",
    traditional: "Provides elevation, depending on cushion height",
    lotusSeat: "Elevates the pelvis to give the hips more room to settle",
  },
  {
    feature: "Pressure & Comfort",
    traditional: "Depends heavily on filling, firmness and sitting position",
    lotusSeat: "Responsive natural latex distributes support across the sitting surface",
  },
  {
    feature: "Longer Sitting",
    traditional: "Comfort varies by body, filling and posture",
    lotusSeat: "Designed specifically around reducing physical distraction during longer sits",
  },
  {
    feature: "Shape Over Time",
    traditional: "Loose fillings can shift or compress over time",
    lotusSeat: "Structured base + resilient latex designed to retain their form",
  },
  {
    feature: "Cover",
    traditional: "Varies by product",
    lotusSeat: "Removable, washable and replaceable",
  },
  {
    feature: "Customisation",
    traditional: "Usually limited",
    lotusSeat: "Choice of colour combinations and replaceable covers",
  },
  {
    feature: "Design Approach",
    traditional: "Traditional general-purpose meditation cushion",
    lotusSeat: "Purpose-built ergonomic meditation seat",
  },
];

export default function ComparisonSection() {
  return (
    <section
      id="comparison"
      data-header-theme="light"
      className="relative w-full bg-transparent text-[#402E1D] py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-14 flex flex-col items-center justify-center scroll-mt-16 sm:scroll-mt-24"
    >
      <div className="relative z-10 w-full max-w-[1280px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="w-full mb-10 sm:mb-14 lg:mb-16">
          {/* Eyebrow */}
          <AnimatedReveal delay={0.03} y={12} className="flex items-center gap-2 mb-3 sm:mb-4">
            <span className="font-sans text-[13.5px] sm:text-[15px] font-extrabold tracking-[0.03em] uppercase text-[#73512E] underline underline-offset-4 decoration-2 decoration-[#876540]/80 pb-0.5">
              THE DIFFERENCE
            </span>
          </AnimatedReveal>

          <div className="w-full flex flex-col md:flex-row md:items-start justify-between gap-6 sm:gap-10">
            <div className="max-w-[680px]">
              {/* Main Headline with kinetic reveal */}
              <AnimatedHeading
                text="More than a softer place to sit."
                className="font-display font-semibold text-[32px] sm:text-[42px] md:text-[48px] lg:text-[52px] leading-[1.10] tracking-[-0.015em] text-[#402E1D]"
              />
            </div>

            {/* Right Lead Paragraph */}
            <AnimatedReveal delay={0.18} y={18} className="max-w-[540px] md:pt-1.5">
              <p className="font-sans text-[16px] sm:text-[17.5px] lg:text-[18.5px] leading-[1.65] sm:leading-[1.7] text-[#402E1D]/85 font-normal">
                Traditional cushions and zafus soften the floor. The Lotus Seat rethinks the whole foundation  - combining purposeful elevation, pelvic positioning, and responsive materials.
              </p>
            </AnimatedReveal>
          </div>
        </div>

        {/* Comparison Showcase Container */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          {/* Comparison Table Grid (Matching Reference Matrix - No Horizontal Scroll, Exact Brand Color Tones) */}
          <div className="w-full bg-[#FAF6F0] rounded-[18px] sm:rounded-[24px] lg:rounded-[28px] border border-[#D8CCBD] overflow-hidden shadow-[0_10px_35px_rgba(64,46,29,0.06)]">
            <table className="w-full table-fixed border-collapse text-left">
              <thead>
                <tr className="border-b border-[#D8CCBD]">
                  {/* Column 1 Header */}
                  <th className="w-[28%] sm:w-[26%] py-3.5 sm:py-5 px-2.5 xs:px-3 sm:px-6 lg:px-8 bg-[#F7F2EA] border-r border-[#D8CCBD] font-sans font-semibold text-[12px] xs:text-[13px] sm:text-[15px] md:text-[16px] text-[#73512E] tracking-tight align-middle">
                    Factor
                  </th>

                  {/* Column 2 Header */}
                  <th className="w-[34%] sm:w-[37%] py-3.5 sm:py-5 px-2.5 xs:px-3 sm:px-6 lg:px-8 bg-[#FDFBF7] border-r border-[#D8CCBD] font-display font-semibold text-[11.5px] xs:text-[12.5px] sm:text-[15.5px] md:text-[17px] text-[#5C4D40] tracking-tight align-middle">
                    Typical Cushion
                  </th>

                  {/* Column 3 Header (Highlighted with Logo Icon on both Phone & Desktop) */}
                  <th className="w-[38%] sm:w-[37%] py-3.5 sm:py-5 px-2.5 xs:px-3 sm:px-6 lg:px-8 bg-[#EFE4D6] font-display font-semibold text-[11.5px] xs:text-[13px] sm:text-[16px] md:text-[18px] text-[#2C2016] tracking-tight align-middle">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2.5">
                      <div className="relative w-12 xs:w-14 sm:w-20 lg:w-24 h-5 xs:h-6 sm:h-8 lg:h-9 shrink-0 flex items-center">
                        <Image
                          src="/logo.avif"
                          alt="Divine Lotus Logo"
                          fill
                          unoptimized
                          className="object-contain object-left"
                        />
                      </div>
                      <span className="leading-tight">The Lotus Seat</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => {
                  const isLast = idx === comparisonData.length - 1;
                  return (
                    <tr
                      key={idx}
                      className={`group transition-colors duration-150 ${
                        !isLast ? "border-b border-[#D8CCBD]" : ""
                      }`}
                    >
                      {/* Factor Cell */}
                      <td className="w-[28%] sm:w-[26%] py-3 sm:py-4.5 md:py-5 px-2.5 xs:px-3 sm:px-6 lg:px-8 bg-[#F7F2EA] border-r border-[#D8CCBD] font-sans font-semibold text-[11px] xs:text-[12px] sm:text-[13.5px] md:text-[14.5px] text-[#2C2016] align-middle leading-snug">
                        {row.feature}
                      </td>

                      {/* Traditional Cushion Cell */}
                      <td className="w-[34%] sm:w-[37%] py-3 sm:py-4.5 md:py-5 px-2.5 xs:px-3 sm:px-6 lg:px-8 bg-[#FDFBF7] border-r border-[#D8CCBD] font-sans text-[10.5px] xs:text-[11.5px] sm:text-[13px] md:text-[14px] text-[#635345] align-middle leading-snug sm:leading-relaxed">
                        {row.traditional}
                      </td>

                      {/* The Lotus Seat Cell (Highlighted Winner) */}
                      <td className="w-[38%] sm:w-[37%] py-3 sm:py-4.5 md:py-5 px-2.5 xs:px-3 sm:px-6 lg:px-8 bg-[#EFE4D6] font-sans font-medium text-[10.5px] xs:text-[11.5px] sm:text-[13px] md:text-[14px] text-[#1E140D] align-middle leading-snug sm:leading-relaxed group-hover:bg-[#ECE0D1] transition-colors duration-150">
                        <div className="flex items-start gap-1.5 sm:gap-2">
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#73512E] stroke-[2.8] shrink-0 mt-0.5" />
                          <span>{row.lotusSeat}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
