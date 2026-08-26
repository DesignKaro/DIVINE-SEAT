"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import CustomizeModal from "./CustomizeModal";

interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  description: string;
  price: string;
  priceSuffix: string;
  features: string[];
  bonus: string;
  ctaText: string;
  ctaAction?: string;
  highlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    id: "standard",
    name: "The Lotus Seat",
    description: "The original Lotus Seat in the standard signature color and design.",
    price: "€149",
    priceSuffix: "+ shipping + applicable taxes",
    features: [
      "Ergonomic meditation seat",
      "Natural latex cushioning",
      "Cork-composite structured base",
      "Removable/washable cover",
      "One additional cover included",
    ],
    bonus: "Includes the complete Sadhana Practice Guide.",
    ctaText: "ORDER NOW • €149",
  },
  {
    id: "custom",
    name: "The Lotus Seat — Custom",
    description: "The same ergonomic Lotus Seat with the ability to personalize its appearance.",
    price: "€199",
    priceSuffix: "+ shipping + applicable taxes",
    features: [
      "Choice of available colors & finish pairings",
      "Choice of available design combinations",
      "Natural latex cushioning",
      "Cork-composite structured base",
      "Removable zippered cover system",
      "Washable and replaceable cover",
      "One additional cover included",
    ],
    bonus: "Includes the complete Sadhana Practice Guide.",
    ctaText: "CUSTOMISE NOW • €199",
    highlighted: true,
  },
];

export default function PricingSection() {
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  return (
    <section
      id="pricing"
      data-header-theme="light"
      className="relative w-full bg-[#ECE7DE] text-[#402E1D] py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-14 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Sacred Mandala Motif (Half Bleed from Top Center) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[620px] md:w-[760px] lg:w-[860px] aspect-square pointer-events-none select-none z-0 opacity-[0.11] mix-blend-multiply">
        <Image
          src="/images/about.png"
          alt="Sacred Mandala Top Center Motif"
          fill
          unoptimized
          sizes="(max-width: 1024px) 80vw, 55vw"
          className="object-contain object-center"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1240px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-[720px] mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <span className="font-sans text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.2em] uppercase text-[#876540]">
              /CHOOSE YOUR SEAT
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-display font-bold text-[34px] sm:text-[46px] md:text-[52px] leading-[1.08] tracking-[-0.015em] text-[#1E140D] mb-3.5"
          >
            Order Your Lotus Seat
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-sans text-[14.5px] sm:text-[15.5px] leading-[1.65] text-[#402E1D]/80 font-normal max-w-[560px] mx-auto"
          >
            Invest in daily stillness with artisanal cork, natural botanical latex, and conscious ergonomic design.
          </motion.p>
        </div>

        {/* Two-Column Pricing Cards Grid with Slide In Animations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-14 lg:gap-8 max-w-[1100px] mx-auto items-stretch">
          {pricingTiers.map((tier, index) => {
            const isLeftCard = index === 0;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, x: isLeftCard ? -60 : 60, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.85,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -5 }}
                className="relative flex flex-col transition-shadow duration-300"
              >
                {/* Main White Card with Rounded Corners */}
                <div
                  className={`relative w-full h-full bg-white ${
                    isLeftCard
                      ? "rounded-[32px] sm:rounded-[36px]"
                      : "rounded-bl-[32px] rounded-br-[32px] rounded-tl-[32px] sm:rounded-bl-[36px] sm:rounded-br-[36px] sm:rounded-tl-[36px] rounded-tr-none"
                  } p-7 sm:p-10 lg:p-11 border border-[#402E1D]/6 flex flex-col justify-between transition-all duration-300`}
                >
                  {/* Seamless Notched Corner Ear Tab with "Personalized" Text on Second Card */}
                  {!isLeftCard && (
                    <div className="absolute -top-[31px] -right-[1px] w-[180px] sm:w-[195px] h-[32px] pointer-events-none z-20">
                      <svg
                        className="w-full h-full overflow-visible"
                        viewBox="0 0 195 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M 0 32 C 26 32 38 0 68 0 L 167 0 A 28 28 0 0 1 195 28 L 195 32 Z"
                          fill="#FFFFFF"
                          stroke="rgba(64, 46, 29, 0.06)"
                          strokeWidth="1"
                        />
                        {/* Cover bottom seam between notch and card */}
                        <path d="M 0 31.5 L 195 31.5" stroke="#FFFFFF" strokeWidth="2.5" />
                      </svg>

                      {/* "Personalized" Clean Text Label */}
                      <div className="absolute top-[5px] sm:top-[6px] right-[14px] sm:right-[18px] flex items-center justify-center">
                        <span className="font-sans text-[10.5px] sm:text-[11.5px] font-bold tracking-[0.14em] uppercase text-[#876540] select-none">
                          Personalized
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Watermark layer clipped to card */}
                  <div className="absolute inset-0 rounded-[32px] sm:rounded-[36px] overflow-hidden pointer-events-none z-0">
                    {/* Half Mandala Watermark Pattern (Precisely 50% Half Bleed) */}
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 w-[380px] sm:w-[460px] lg:w-[500px] aspect-square pointer-events-none select-none opacity-[0.13] mix-blend-multiply transition-transform duration-700 ${
                        isLeftCard
                          ? "left-0 -translate-x-1/2"
                          : "right-0 translate-x-1/2"
                      }`}
                    >
                      <Image
                        src="/images/about.png"
                        alt="Sacred Mandala Background Motif"
                        fill
                        unoptimized
                        sizes="(max-width: 1024px) 50vw, 30vw"
                        className="object-contain object-center"
                      />
                    </div>
                  </div>

                  <div className="relative z-10">
                    {/* Title & Description */}
                    <h3 className="font-display font-bold text-[30px] sm:text-[36px] text-[#1E140D] tracking-[-0.015em] mb-2">
                      {tier.name}
                    </h3>
                    <p className="font-sans text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#402E1D]/75 mb-6 sm:mb-8 min-h-[42px]">
                      {tier.description}
                    </p>

                    {/* Price Row */}
                    <div className="flex items-baseline gap-2.5 mb-8">
                      <span className="font-display text-[46px] sm:text-[56px] font-bold text-[#1E140D] tracking-tight leading-none">
                        {tier.price}
                      </span>
                      <span className="font-sans text-[12.5px] sm:text-[13px] text-[#402E1D]/60 font-medium">
                        {tier.priceSuffix}
                      </span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3.5 mb-8">
                      {tier.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-[#876540] shrink-0 mt-0.5 stroke-[2.4]" />
                          <span className="font-sans text-[14px] sm:text-[14.5px] text-[#1E140D]/90 font-normal leading-snug">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                {/* Bottom Bonus + CTA Button */}
                <div className="pt-4 mt-auto">
                  {/* Bonus Highlight Pill */}
                  <div className="w-full bg-[#F6F3ED] rounded-2xl px-4 sm:px-5 py-3 mb-5 text-[13px] sm:text-[13.5px] text-[#402E1D]/85 leading-snug font-sans">
                    <span className="font-bold text-[#876540]">Bonus:</span> {tier.bonus}
                  </div>

                  {/* Action CTA Button (Exact Small Left-Aligned Fused Pinched-Neck Pill Design) */}
                  <div className="flex justify-start pt-1">
                    <button
                      onClick={() => {
                        if (tier.id === "custom") {
                          setIsCustomizeOpen(true);
                        } else {
                          // Standard tier reservation/order scroll or notify
                          const notifyBtn = document.querySelector('[aria-label="Notify Me"]') as HTMLButtonElement;
                          if (notifyBtn) notifyBtn.click();
                        }
                      }}
                      className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                    >
                      {/* SVG Fused Pill + Pinched Neck + Circle Background */}
                      <svg
                        className="w-[228px] sm:w-[244px] h-[46px] sm:h-[48px]"
                        viewBox="0 0 236 46"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient id={`btn-pricing-fill-${tier.id}`} x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="50%" stopColor="#F9F7F4" />
                            <stop offset="100%" stopColor="#FFFFFF" />
                          </linearGradient>
                          <linearGradient id={`btn-pricing-border-${tier.id}`} x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="rgba(64, 46, 29, 0.25)" />
                            <stop offset="50%" stopColor="rgba(216, 204, 189, 0.8)" />
                            <stop offset="100%" stopColor="rgba(64, 46, 29, 0.2)" />
                          </linearGradient>
                        </defs>

                        <path
                          d="M 23 0 L 173 0 C 180 0 185 7 190 7 C 195 7 200 0 213 0 A 23 23 0 1 1 213 46 C 200 46 195 39 190 39 C 185 39 180 46 173 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                          fill={`url(#btn-pricing-fill-${tier.id})`}
                          stroke={`url(#btn-pricing-border-${tier.id})`}
                          strokeWidth="1.4"
                        />
                      </svg>

                      {/* Button Label */}
                      <div className="absolute left-0 top-0 bottom-0 w-[176px] sm:w-[190px] flex items-center justify-center pointer-events-none px-3">
                        <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.04em] uppercase text-[#1E140D] whitespace-nowrap">
                          {tier.ctaText}
                        </span>
                      </div>

                      {/* Right Circular Bronze Button with Arrow */}
                      <div className="absolute right-[4px] top-[4px] w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-full bg-[#876540] flex items-center justify-center group-hover:bg-[#6D5133] transition-colors duration-300">
                        <ArrowUpRight className="w-[17px] h-[17px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>

      </div>

      {/* Bespoke Customization Studio Modal */}
      <CustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
      />
    </section>
  );
}
