"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

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
      className="relative w-full bg-[#E6DFD4] text-[#402E1D] py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-14 flex flex-col items-center justify-center overflow-hidden scroll-mt-16 sm:scroll-mt-24"
    >
      {/* Full-cover Background Image with Soft Edge Blending */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 120px, black calc(100% - 120px), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 120px, black calc(100% - 120px), transparent 100%)",
        }}
      >
        <Image
          src="/images/about-bg.avif"
          alt="Comparison section background"
          fill
          priority={false}
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Warm overlay for legibility with increased opacity */}
        <div className="absolute inset-0 bg-[#E6DFD4]/78 backdrop-blur-[1px]" />
      </div>

      {/* Background Sacred Mandala Motif (Centered Vertically and Horizontally) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[720px] md:w-[850px] lg:w-[980px] aspect-square pointer-events-none select-none z-0 opacity-[0.20] mix-blend-multiply">
        <Image
          src="/images/about.avif"
          alt="Sacred Mandala Background Motif (Centered)"
          fill
          unoptimized
          sizes="(max-width: 1024px) 70vw, 50vw"
          className="object-contain object-center"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14 lg:mb-16">
          
          <div className="max-w-[680px]">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-3 sm:mb-4"
            >
              <span className="font-sans text-[13.5px] sm:text-[15px] font-extrabold tracking-[0.03em] uppercase text-[#73512E] underline underline-offset-4 decoration-2 decoration-[#876540]/80 pb-0.5">
                THE DIFFERENCE
              </span>
            </motion.div>

            {/* Main Headline with kinetic reveal */}
            <AnimatedHeading
              text="More than a softer place to sit."
              className="font-display font-semibold text-[32px] sm:text-[42px] md:text-[48px] lg:text-[52px] leading-[1.10] tracking-[-0.015em] text-[#402E1D]"
            />
          </div>

          {/* Right Lead Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans text-[14px] sm:text-[15.5px] leading-[1.65] text-[#402E1D]/80 font-normal max-w-[460px] md:pb-1"
          >
            <p>
              Traditional cushions and zafus soften the floor. The Lotus Seat rethinks the whole foundation — combining purposeful elevation, pelvic positioning, and responsive materials.
            </p>
          </motion.div>
        </div>

        {/* Comparison Showcase Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full"
        >
          {/* MOBILE NATIVE CARD VIEW (< 640px) */}
          <div className="block sm:hidden space-y-3.5">
            {comparisonData.map((row, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[22px] p-5 shadow-[0_8px_24px_rgba(44,32,22,0.04)] space-y-3"
              >
                <div className="font-display font-bold text-[16.5px] text-[#2C2016]">
                  {row.feature}
                </div>

                {/* The Lotus Seat Advantage (Highlighted) */}
                <div className="p-3.5 rounded-2xl bg-[#FBF9F5] space-y-1">
                  <div className="flex items-center gap-1.5 font-display font-semibold text-[13px] text-[#876540]">
                    <Check className="w-3.5 h-3.5 stroke-[2.4]" />
                    <span>The Lotus Seat</span>
                  </div>
                  <p className="font-sans text-[13px] text-[#2C2016] font-medium leading-relaxed">
                    {row.lotusSeat}
                  </p>
                </div>

                {/* Traditional Cushion */}
                <div className="px-1 pt-0.5 space-y-1">
                  <div className="font-display font-semibold text-[13.5px] text-[#5C4D40]">
                    Traditional Cushion / Zafu
                  </div>
                  <p className="font-sans text-[12.5px] text-[#6B5A4D] leading-relaxed">
                    {row.traditional}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* TABLET & DESKTOP TABLE VIEW (>= 640px) */}
          <div className="hidden sm:block w-full bg-white rounded-[28px] lg:rounded-[32px] border border-[#E8E1D5] overflow-hidden">
            <div className="overflow-x-auto">
              {/* Relative wrapper so ghost overlays and column background are positioned cleanly */}
              <div className="relative">
                
                {/* Background column highlight for The Lotus Seat column */}
                <div
                  className="absolute top-0 bottom-0 pointer-events-none z-0 bg-[#FBF9F5]"
                  style={{
                    left: "63%",
                    width: "37%",
                  }}
                />

                {/* Single ghost image covering the entire Traditional column (Always on by default) */}
                <div
                  className="absolute top-0 bottom-0 pointer-events-none z-10"
                  style={{
                    left: "26%",
                    width: "37%",
                  }}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 10%, transparent 80%)",
                      WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 10%, transparent 80%)",
                    }}
                  >
                    <Image
                      src="/images/traditional-cushion-ghost.avif"
                      alt="Traditional Cushion Ghost"
                      width={320}
                      height={320}
                      className="object-contain opacity-[0.24] mix-blend-multiply select-none"
                      unoptimized
                    />
                  </div>
                </div>

                {/* Single ghost image covering the entire Lotus Seat column (Always on by default) */}
                <div
                  className="absolute top-0 bottom-0 pointer-events-none z-10"
                  style={{
                    left: "63%",
                    width: "37%",
                  }}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 10%, transparent 80%)",
                      WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 10%, transparent 80%)",
                    }}
                  >
                    <Image
                      src="/images/lotus-seat-ghost.avif"
                      alt="Lotus Seat Ghost"
                      width={320}
                      height={320}
                      className="object-contain opacity-[0.32] mix-blend-multiply select-none"
                      unoptimized
                    />
                  </div>
                </div>

                <table className="w-full text-left border-collapse relative z-20">
                  <thead>
                    <tr className="border-b border-[#EBE4D8]/30">
                      <th className="py-5 sm:py-6 px-6 sm:px-8 font-sans font-medium text-[13px] sm:text-[14px] text-[#876540] uppercase tracking-[0.08em] w-[26%]">
                        Feature
                      </th>
                      <th className="py-5 sm:py-6 px-6 sm:px-8 font-display font-semibold text-[16px] sm:text-[18px] text-[#5C4D40] w-[37%]">
                        Traditional Cushion / Zafu
                      </th>
                      <th className="py-5 sm:py-6 px-6 sm:px-8 font-display font-semibold text-[17px] sm:text-[19px] text-[#2C2016] w-[37%]">
                        <div className="flex items-center gap-2">
                          <span>The Lotus Seat</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EBE4D8]/30 font-sans text-[14px] sm:text-[15px]">
                    {comparisonData.map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-[#FAF7F2]/40 transition-colors duration-150"
                      >
                        {/* Feature Column */}
                        <td className="py-5 sm:py-6 px-6 sm:px-8 font-semibold text-[#2C2016]">
                          {row.feature}
                        </td>

                        {/* Traditional Cushion Column */}
                        <td className="py-5 sm:py-6 px-6 sm:px-8 text-[#6B5A4D] leading-relaxed">
                          {row.traditional}
                        </td>

                        {/* The Lotus Seat Column (Highlighted) */}
                        <td className="py-5 sm:py-6 px-6 sm:px-8 font-medium text-[#2C2016] leading-relaxed">
                          <div className="flex items-start gap-2.5">
                            <span className="text-[#876540] mt-0.5 shrink-0">
                              <Check className="w-4 h-4 stroke-[2.4]" />
                            </span>
                            <span>{row.lotusSeat}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
