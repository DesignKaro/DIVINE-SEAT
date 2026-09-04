"use client";

import { motion } from "framer-motion";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import AnimatedReveal from "@/components/ui/AnimatedReveal";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function AncientWisdomSection() {
  return (
    <section
      id="ancient-wisdom"
      data-header-theme="light"
      className="relative w-full bg-transparent text-[#402E1D] py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-14 flex flex-col items-center justify-center scroll-mt-16 sm:scroll-mt-24"
    >
      <div className="relative z-10 w-full max-w-[1280px] mx-auto">
        
        {/* Full-Width Section Header */}
        <div className="w-full mb-10 sm:mb-14">
          <div className="max-w-[840px]">
            {/* Eyebrow Label */}
            <AnimatedReveal delay={0.02} y={12} className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="font-sans text-[13.5px] sm:text-[15px] font-extrabold tracking-[0.03em] uppercase text-[#73512E] underline underline-offset-4 decoration-2 decoration-[#876540]/80 pb-0.5">
                THE WISDOM OF SITTING
              </span>
            </AnimatedReveal>
            {/* Editorial Display Heading with kinetic reveal */}
            <AnimatedHeading
              text="For centuries, the way we sit has been part of the practice."
              className="font-display font-semibold text-[32px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.12] tracking-[-0.015em] text-[#402E1D]"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 1: 01 ASANA  - IMAGE LEFT | TEXT RIGHT */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Featured Transparent Illustration (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative w-full max-w-[580px] mx-auto group flex flex-col items-center justify-center"
          >
            <div className="relative w-full aspect-[3/2]">
              <Image
                src="/images/asana_steadiness_ease.avif"
                alt="Siddhasana and Padmasana Classical Yogic Meditation Postures"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 580px"
                className="object-contain object-center transition-transform duration-1000 group-hover:scale-[1.03]"
                priority={false}
              />
            </div>

            {/* Posture Names Below Figures */}
            <AnimatedReveal delay={0.2} y={10} className="w-full grid grid-cols-2 text-center mt-2 sm:mt-3 px-2 sm:px-4">
              <div>
                <p className="font-display font-semibold text-[16px] sm:text-[18px] text-[#2C2016] tracking-[-0.01em]">
                  Siddhasana
                </p>
              </div>
              <div>
                <p className="font-display font-semibold text-[16px] sm:text-[18px] text-[#2C2016] tracking-[-0.01em]">
                  Padmasana
                </p>
              </div>
            </AnimatedReveal>
          </motion.div>

          {/* RIGHT COLUMN: Asana: Steadiness & Ease (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center text-left"
          >
            {/* Introductory Context Paragraph */}
            <AnimatedReveal delay={0.15} y={16}>
              <p className="font-sans text-[16px] sm:text-[17.5px] lg:text-[18.5px] leading-[1.65] sm:leading-[1.7] text-[#402E1D]/85 font-normal mb-5 sm:mb-6">
                Yogic traditions have long recognised the relationship between <strong className="font-semibold text-[#402E1D]">posture, breath and attention</strong>. A steady, comfortable seat allows the body to settle, creating a foundation from which the practice can naturally turn inward.
              </p>
            </AnimatedReveal>

            {/* Sub-Section Badge */}
            <AnimatedReveal delay={0.03} y={12} className="flex items-center gap-2 mb-3">
              <span className="font-sans text-[13.5px] sm:text-[15px] font-extrabold tracking-[0.03em] uppercase text-[#73512E] underline underline-offset-4 decoration-2 decoration-[#876540]/80 pb-0.5">
                ASANA: STEADINESS &amp; EASE
              </span>
            </AnimatedReveal>

            {/* Sutra 2.46 Highlight Box (Features Glass Style) */}
            <AnimatedReveal delay={0.22} y={16}>
              <div
                className="relative rounded-[18px] sm:rounded-[22px] p-4 sm:p-5 mb-5 border border-white/80 overflow-hidden"
                style={{
                  backdropFilter: "blur(28px) saturate(140%) brightness(1.04)",
                  WebkitBackdropFilter: "blur(28px) saturate(140%) brightness(1.04)",
                  transform: "translateZ(0)",
                  willChange: "transform, backdrop-filter",
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.20) 100%)",
                }}
              >
                {/* Specular curved sheen */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-[18px] sm:rounded-[22px]"
                  style={{
                    background: "radial-gradient(120% 90% at 85% 10%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)",
                  }}
                />
                <div className="relative z-10">
                  <p className="font-display font-semibold text-[18px] sm:text-[20px] text-[#2C2016] italic mb-1">
                    &ldquo;Sthira sukham asanam.&rdquo;
                  </p>
                  <p className="font-sans text-[12.5px] sm:text-[13.5px] text-[#876540] font-semibold tracking-wide">
                    Yoga Sutra 2.46  - posture is steady and comfortable.
                  </p>
                </div>
              </div>
            </AnimatedReveal>

            {/* Classical Postures Explanation */}
            <AnimatedReveal delay={0.28} y={16}>
              <div className="font-sans text-[15.5px] sm:text-[17px] leading-[1.7] text-[#5C4D40] font-normal">
                <p>
                  Steadiness and ease lie at the heart of a meditative posture. When the body finds both, sitting becomes less about maintaining a position and more about remaining with the practice.
                </p>
              </div>
            </AnimatedReveal>

          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* ROW 2: POSTURE, BREATH & PRANA  - TEXT LEFT | IMAGE RIGHT */}
        {/* ========================================================================= */}
        <div className="mt-16 sm:mt-24 lg:mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: Posture, Breath & Subtle Energy Narrative (6 Cols) */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col justify-center text-left order-2 lg:order-1"
            >
              {/* Eyebrow Label */}
              <AnimatedReveal delay={0.03} y={12} className="flex items-center gap-2 mb-2.5 sm:mb-3.5">
                <span className="font-sans text-[13.5px] sm:text-[15px] font-extrabold tracking-[0.03em] uppercase text-[#73512E] underline underline-offset-4 decoration-2 decoration-[#876540]/80 pb-0.5">
                  SUBTLE ANATOMY &amp; ENERGY
                </span>
              </AnimatedReveal>

              {/* Heading */}
              <AnimatedHeading
                text="Posture, Breath & Prana"
                as="h3"
                className="font-display font-semibold text-[28px] sm:text-[36px] md:text-[40px] leading-[1.14] tracking-[-0.015em] text-[#2C2016] mb-4 sm:mb-5"
              />

              {/* Narrative Content */}
              <AnimatedReveal delay={0.18} y={18} className="space-y-3.5 font-sans text-[15.5px] sm:text-[17px] leading-[1.68] text-[#5C4D40] font-normal mb-6">
                <p>
                  Traditional yogic teachings also place importance on an <strong className="font-semibold text-[#402E1D]">upright, balanced posture</strong> during meditation and pranayama.
                </p>
                <p>
                  Within the yogic subtle-body tradition, <strong className="font-semibold text-[#402E1D]">Ida and Pingala</strong> are described as two principal nadis, while <strong className="font-semibold text-[#402E1D]">Sushumna</strong> is described as the central channel.
                </p>
                <p>
                  Practices such as <strong className="font-semibold text-[#402E1D]">Nadi Shodhana</strong> are traditionally associated with balancing Ida and Pingala and preparing the conditions for prana to move through Sushumna.
                </p>
              </AnimatedReveal>

            </motion.div>

            {/* RIGHT COLUMN: Featured Photography (6 Cols) */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative w-full aspect-square max-w-[540px] mx-auto rounded-[24px] sm:rounded-[32px] overflow-hidden group order-1 lg:order-2"
            >
              <Image
                src="/images/subtle_anatomy_nadi_v2.avif"
                alt="Posture, Breath and Subtle Energy Nadi Flow in Meditation"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 540px"
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
                priority={false}
              />
            </motion.div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 3: ANCIENT WISDOM × MODERN COMFORT  - IMAGE LEFT | TEXT RIGHT */}
        {/* ========================================================================= */}
        <div className="mt-16 sm:mt-24 lg:mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: Featured Lifestyle Seat Photography (6 Cols) */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative w-full aspect-[3/2] max-w-[560px] mx-auto group flex items-center justify-center"
            >
              <Image
                src="/images/ancient_wisdom_modern_comfort.avif"
                alt="The Lotus Seat  - Ancient Wisdom and Modern Ergonomic Support"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-contain object-center transition-transform duration-1000 group-hover:scale-[1.03]"
                priority={false}
              />
            </motion.div>

            {/* RIGHT COLUMN: Ancient Wisdom × Modern Support Narrative (6 Cols) */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col justify-center text-left"
            >
              {/* Eyebrow Label */}
              <AnimatedReveal delay={0.03} y={12} className="flex items-center gap-2 mb-2.5 sm:mb-3.5">
                <span className="font-sans text-[13.5px] sm:text-[15px] font-extrabold tracking-[0.03em] uppercase text-[#73512E] underline underline-offset-4 decoration-2 decoration-[#876540]/80 pb-0.5">
                  ANCIENT WISDOM × MODERN COMFORT
                </span>
              </AnimatedReveal>

              {/* Heading */}
              <AnimatedHeading
                text="Ancient wisdom. Modern support."
                as="h3"
                className="font-display font-semibold text-[28px] sm:text-[36px] md:text-[40px] leading-[1.14] tracking-[-0.015em] text-[#2C2016] mb-4 sm:mb-5"
              />

              {/* Narrative Content */}
              <AnimatedReveal delay={0.18} y={18} className="space-y-3.5 font-sans text-[15.5px] sm:text-[17px] leading-[1.68] text-[#5C4D40] font-normal mb-5 sm:mb-6">
                <p>
                  Yogic traditions remind us why the seat and posture matter. Modern ergonomics and materials give us new ways to support them.
                </p>
                <p>
                  The Lotus Seat brings the two together  - an ergonomic foundation designed for the body, in service of a practice that has always looked beyond it.
                </p>
              </AnimatedReveal>

              {/* Highlight Affirmation Box (Features Glass Style) */}
              <AnimatedReveal delay={0.24} y={16}>
                <div
                  className="relative rounded-[18px] sm:rounded-[22px] p-4 sm:p-5 border border-white/80 overflow-hidden"
                  style={{
                    backdropFilter: "blur(28px) saturate(140%) brightness(1.04)",
                    WebkitBackdropFilter: "blur(28px) saturate(140%) brightness(1.04)",
                    transform: "translateZ(0)",
                    willChange: "transform, backdrop-filter",
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.20) 100%)",
                  }}
                >
                  {/* Specular curved sheen */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-[18px] sm:rounded-[22px]"
                    style={{
                      background: "radial-gradient(120% 90% at 85% 10%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)",
                    }}
                  />
                  <div className="relative z-10">
                    <p className="font-display font-medium text-[16.5px] sm:text-[18.5px] text-[#2C2016] italic leading-snug">
                      &ldquo;The seat supports the body. The practice takes us inward.&rdquo;
                    </p>
                  </div>
                </div>
              </AnimatedReveal>

            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}

