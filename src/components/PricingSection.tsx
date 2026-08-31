"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import CustomizeModal from "./CustomizeModal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  description: string;
  originalPrice: string;
  discountBadge: string;
  price: string;
  priceSuffix: string;
  image?: string;
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
    originalPrice: "€215",
    discountBadge: "30% OFF",
    price: "€149",
    priceSuffix: "+ shipping + applicable taxes",
    image: "/images/ancient_wisdom_modern_comfort.avif",
    features: [
      "Ergonomic meditation seat",
      "Natural latex cushioning",
      "Cork-composite structured base",
      "Removable/washable cover",
      "Free meditation mat included",
    ],
    bonus: "Includes a Free Meditation Mat + complete Sadhana Practice Guide.",
    ctaText: "ORDER NOW • €149",
  },
  {
    id: "custom",
    name: "The Lotus Seat — Custom",
    description: "The same ergonomic Lotus Seat with the ability to personalize its appearance.",
    originalPrice: "€285",
    discountBadge: "30% OFF",
    price: "€199",
    priceSuffix: "+ shipping + applicable taxes",
    features: [
      "Choice of available colors & finish pairings",
      "Choice of available design combinations",
      "Natural latex cushioning",
      "Cork-composite structured base",
      "Removable zippered cover system",
      "Washable and replaceable cover",
      "Free meditation mat included",
    ],
    bonus: "Includes a Free Meditation Mat + complete Sadhana Practice Guide.",
    ctaText: "CUSTOMISE NOW • €199",
    highlighted: true,
  },
];

const customColorSwatches = [
  { id: "1", name: "Slate Mist", src: "/images/custom-colors/swatch_1.avif" },
  { id: "2", name: "Terracotta Rose", src: "/images/custom-colors/swatch_2.avif" },
  { id: "3", name: "Ochre Gold", src: "/images/custom-colors/swatch_3.avif" },
  { id: "4", name: "Natural Sand", src: "/images/custom-colors/swatch_4.avif" },
  { id: "5", name: "Ivory Cream", src: "/images/custom-colors/swatch_5.avif" },
  { id: "6", name: "Warm Taupe", src: "/images/custom-colors/swatch_6.avif" },
  { id: "7", name: "Espresso Earth", src: "/images/custom-colors/swatch_7.avif" },
];

export default function PricingSection() {
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  return (
    <section
      id="choose-seat"
      data-header-theme="light"
      className="relative w-full bg-[#E6DFD4] text-[#402E1D] py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-14 flex flex-col items-center justify-center overflow-hidden scroll-mt-16 sm:scroll-mt-24"
    >
      {/* Full-cover Background Image with Soft Edge Blending (Laterally Inverted) */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 120px, black calc(100% - 120px), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 120px, black calc(100% - 120px), transparent 100%)",
        }}
      >
        <Image
          src="/images/about-bg.avif"
          alt="Pricing section background"
          fill
          priority={false}
          unoptimized
          sizes="100vw"
          className="object-cover object-center scale-x-[-1]"
        />

        {/* Warm overlay for legibility with increased opacity */}
        <div className="absolute inset-0 bg-[#E6DFD4]/78 backdrop-blur-[1px]" />
      </div>

      {/* Background Sacred Mandala Motif (Half Bleed from Top Center) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[620px] md:w-[760px] lg:w-[860px] aspect-square pointer-events-none select-none z-0 opacity-[0.11] mix-blend-multiply">
        <Image
          src="/images/about.avif"
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
            <span className="font-sans text-[13.5px] sm:text-[15px] font-extrabold tracking-[0.03em] uppercase text-[#73512E] underline underline-offset-4 decoration-2 decoration-[#876540]/80 pb-0.5">
              CHOOSE YOUR SEAT
            </span>
          </motion.div>

          <AnimatedHeading
            text="Choose your Lotus Seat."
            className="font-display font-bold text-[34px] sm:text-[46px] md:text-[52px] leading-[1.08] tracking-[-0.015em] text-[#1E140D] mb-3.5 flex justify-center"
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-sans text-[14.5px] sm:text-[15.5px] leading-[1.65] text-[#402E1D]/80 font-normal max-w-[580px] mx-auto"
          >
            The same support, comfort and thoughtful design. Choose the finish that feels right for your practice and your space.
          </motion.p>
        </div>

        {/* Structured Two-Column Wide Pricing Cards Stack */}
        <div 
          id="pricing" 
          className="flex flex-col gap-10 sm:gap-12 lg:gap-14 max-w-[1140px] mx-auto scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-28"
        >
          {pricingTiers.map((tier, index) => {
            const isLeftCard = index === 0;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                className="relative w-full transition-shadow duration-300"
              >
                {/* Main White Wide Card with Rounded Corners */}
                <div
                  className={`relative w-full bg-white ${
                    isLeftCard
                      ? "rounded-[32px] sm:rounded-[38px]"
                      : "rounded-bl-[32px] rounded-br-[32px] rounded-tl-[32px] sm:rounded-bl-[38px] sm:rounded-br-[38px] sm:rounded-tl-[38px] rounded-tr-none"
                  } p-7 sm:p-10 lg:p-12 border border-[#402E1D]/8 shadow-[0_4px_24px_-4px_rgba(64,46,29,0.04)] transition-all duration-300`}
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
                          stroke="rgba(64, 46, 29, 0.08)"
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
                  <div className="absolute inset-0 rounded-[32px] sm:rounded-[38px] overflow-hidden pointer-events-none z-0">
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -right-16 sm:right-0 sm:translate-x-1/4 w-[420px] sm:w-[520px] lg:w-[600px] aspect-square pointer-events-none select-none opacity-[0.10] mix-blend-multiply"
                    >
                      <Image
                        src="/images/about.avif"
                        alt="Sacred Mandala Background Motif"
                        fill
                        unoptimized
                        sizes="(max-width: 1024px) 50vw, 40vw"
                        className="object-contain object-center"
                      />
                    </div>
                  </div>

                  {/* Two-Column Internal Layout */}
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-stretch">
                    
                    {/* LEFT COLUMN: Title, Description, (Pricing + CTA) with Showcase Image in Empty Space */}
                    <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-between">
                      <div>
                        {/* Divine Lotus Brand Icon above the title with grand prominent size & complete opacity */}
                        <div className="relative w-32 h-16 sm:w-36 sm:h-18 lg:w-[160px] lg:h-[80px] mb-4 sm:mb-5">
                          <Image
                            src="/logo.avif"
                            alt="Divine Lotus Icon"
                            fill
                            sizes="(max-width: 640px) 128px, (max-width: 1024px) 144px, 160px"
                            className="object-contain object-left"
                          />
                        </div>

                        {/* Title & Description */}
                        <h3 className="font-display font-bold text-[28px] sm:text-[34px] lg:text-[38px] text-[#1E140D] tracking-[-0.015em] mb-2.5">
                          {tier.name}
                        </h3>
                        <p className="font-sans text-[14px] sm:text-[15px] leading-relaxed text-[#402E1D]/75 mb-6 sm:mb-8 max-w-none">
                          {tier.description}
                        </p>

                        {/* Interactive Content & Image Flex Layout */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-2">
                          {/* Price & CTA Button Stack */}
                          <div className="flex flex-col">
                            {/* Price Row: Original Price & Active Price in Same Row with Matching Big Size */}
                            <div className="mb-5 sm:mb-6">
                              <div className="flex flex-wrap items-baseline gap-2.5 sm:gap-3.5 mb-2">
                                {/* Strikethrough Original Price */}
                                <span className="font-display text-[32px] sm:text-[40px] lg:text-[46px] font-medium text-[#402E1D]/35 line-through decoration-[#402E1D]/40 leading-none">
                                  {tier.originalPrice}
                                </span>

                                {/* Big Active Price */}
                                <span className="font-display text-[44px] sm:text-[52px] lg:text-[58px] font-bold text-[#1E140D] tracking-tight leading-none">
                                  {tier.price}
                                </span>

                                {/* Discount Badge */}
                                <span className="font-sans text-[10.5px] sm:text-[11.5px] font-bold text-[#876540] bg-[#876540]/10 px-2.5 py-1 rounded-full uppercase tracking-wider self-center">
                                  {tier.discountBadge}
                                </span>

                                {/* Only for Customised card: + shipping + applicable taxes on the same line */}
                                {tier.id === "custom" && (
                                  <span className="font-sans text-[12px] sm:text-[13px] text-[#402E1D]/60 font-medium whitespace-nowrap self-center sm:self-auto sm:ml-1">
                                    {tier.priceSuffix}
                                  </span>
                                )}
                              </div>

                              {/* Shipping / Taxes Subtitle (For Standard card) */}
                            {tier.id !== "custom" && (
                              <p className="font-sans text-[12px] sm:text-[13px] text-[#402E1D]/60 font-medium">
                                {tier.priceSuffix}
                              </p>
                            )}
                          </div>

                          {/* Color Swatch Cards (Only for Customised Card, below pricing) */}
                          {tier.id === "custom" && (
                            <div className="mb-5 sm:mb-6">
                              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                                {customColorSwatches.map((swatch) => (
                                  <button
                                    key={swatch.id}
                                    type="button"
                                    onClick={() => setIsCustomizeOpen(true)}
                                    title={swatch.name}
                                    className="relative w-[52px] sm:w-[60px] lg:w-[68px] h-[36px] sm:h-[42px] lg:h-[46px] hover:scale-110 transition-transform duration-300 group/swatch cursor-pointer p-0 bg-transparent border-0 outline-none"
                                  >
                                    <Image
                                      src={swatch.src}
                                      alt={swatch.name}
                                      fill
                                      sizes="(max-width: 640px) 52px, 68px"
                                      className="object-contain object-center drop-shadow-[0_2px_4px_rgba(64,46,29,0.08)]"
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Buy Action CTA Button Placed Directly Below */}
                            <div>
                              <button
                                onClick={() => {
                                  if (tier.id === "custom") {
                                    setIsCustomizeOpen(true);
                                  } else {
                                    const notifyBtn = document.querySelector('[aria-label="Notify Me"]') as HTMLButtonElement;
                                    if (notifyBtn) notifyBtn.click();
                                  }
                                }}
                                className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                              >
                                {/* SVG Fused Pill + Pinched Neck + Circle Background */}
                                <svg
                                  className="w-[218px] sm:w-[232px] h-[44px] sm:h-[46px]"
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
                                <div className="absolute left-0 top-0 bottom-0 w-[170px] sm:w-[180px] flex items-center justify-center pointer-events-none px-3">
                                  <span className="font-sans text-[11px] sm:text-[11.5px] font-bold tracking-[0.04em] uppercase text-[#1E140D] whitespace-nowrap">
                                    {tier.ctaText}
                                  </span>
                                </div>

                                {/* Right Circular Bronze Button with Arrow */}
                                <div className="absolute right-[4px] top-[4px] w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#876540] flex items-center justify-center group-hover:bg-[#6D5133] transition-colors duration-300">
                                  <ArrowUpRight className="w-[16px] h-[16px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>
                              </button>
                            </div>
                          </div>

                          {/* Clean Product Showcase Image (No border, no shadow, complete full view) */}
                          {tier.image && (
                            <div className="relative w-[160px] sm:w-[200px] lg:w-[240px] h-[125px] sm:h-[150px] lg:h-[170px] shrink-0 self-center sm:self-end pointer-events-none select-none transition-transform duration-500 hover:scale-105">
                              <Image
                                src={tier.image}
                                alt={tier.name}
                                fill
                                sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 240px"
                                className="object-contain object-center"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Features List and Included Bonus Box */}
                    <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-between md:border-l md:border-[#402E1D]/8 md:pl-8 lg:pl-10 pt-6 md:pt-0 border-t md:border-t-0 border-[#402E1D]/8">
                      <div>
                        <p className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.14em] uppercase text-[#876540] mb-4 sm:mb-5">
                          What&apos;s Included
                        </p>

                        {/* Features List */}
                        <div className="space-y-3 sm:space-y-3.5">
                          {tier.features.map((feature, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#876540]/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5 text-[#876540] stroke-[2.6]" />
                              </div>
                              <span className="font-sans text-[13.5px] sm:text-[14.5px] text-[#1E140D]/90 font-normal leading-snug">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Included Bonus Box */}
                      <div className="w-full bg-[#F6F3ED] rounded-2xl px-4 sm:px-5 py-3.5 mt-6 sm:mt-8 text-[13px] sm:text-[13.5px] text-[#402E1D]/85 leading-snug font-sans border border-[#876540]/10">
                        <span className="font-bold text-[#876540]">Bonus:</span> {tier.bonus}
                      </div>
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
