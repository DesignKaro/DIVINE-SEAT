"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export default function AncientWisdomSection() {
  return (
    <section
      id="ancient-wisdom"
      data-header-theme="light"
      className="relative w-full bg-[#E6DFD4] text-[#402E1D] py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-14 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Sacred Mandala Motifs */}
      <div className="absolute left-0 top-1/4 -translate-x-1/3 w-[360px] sm:w-[480px] lg:w-[560px] aspect-square pointer-events-none select-none z-0 opacity-[0.14] mix-blend-multiply">
        <Image
          src="/images/about.png"
          alt="Sacred Mandala Motif (Left)"
          fill
          unoptimized
          sizes="(max-width: 1024px) 40vw, 30vw"
          className="object-contain object-center"
        />
      </div>

      <div className="absolute right-0 bottom-1/4 translate-x-1/3 w-[360px] sm:w-[480px] lg:w-[560px] aspect-square pointer-events-none select-none z-0 opacity-[0.14] mix-blend-multiply">
        <Image
          src="/images/about.png"
          alt="Sacred Mandala Motif (Right)"
          fill
          unoptimized
          sizes="(max-width: 1024px) 40vw, 30vw"
          className="object-contain object-center"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto">
        
        {/* Full-Width Section Header (Matches Problems & Solution Sections) */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-[660px]">
            {/* Eyebrow Label */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="font-sans text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.16em] uppercase text-[#876540]">
                /THE WISDOM OF SITTING
              </span>
            </div>
            {/* Editorial Display Heading */}
            <h2 className="font-display font-semibold text-[32px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[1.12] tracking-[-0.015em] text-[#402E1D]">
              We did not discover the importance of sitting well.
            </h2>
          </div>

          {/* Right Lead Paragraph */}
          <p className="font-sans text-[14px] sm:text-[15px] leading-[1.65] text-[#402E1D]/80 font-normal max-w-[480px] md:pb-1">
            Long before modern ergonomics, yogic traditions were exploring the relationship between <strong className="font-semibold text-[#402E1D]">posture, breath and attention</strong>. A steady, comfortable seat was understood as part of creating the conditions for the body to become still and the practice to turn inward.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* ROW 1: 01 ASANA — IMAGE LEFT | TEXT RIGHT */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Featured Image (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative w-full aspect-square max-w-[540px] mx-auto rounded-[24px] sm:rounded-[32px] overflow-hidden group"
          >
            <Image
              src="/images/asana_steadiness_ease.png"
              alt="Siddhasana and Padmasana Classical Yogic Meditation Postures"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 540px"
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
              priority={false}
            />
          </motion.div>

          {/* RIGHT COLUMN: Asana: Steadiness & Ease (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center text-left"
          >
            {/* Sub-Section Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-sans text-[11.5px] sm:text-[12.5px] font-bold tracking-normal uppercase text-[#876540]">
                /ASANA: STEADINESS &amp; EASE
              </span>
            </div>

            {/* Sutra 2.46 Highlight Box (Features Glass Style) */}
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
                  Yoga Sutra 2.46 — posture is steady and comfortable.
                </p>
              </div>
            </div>

            {/* Classical Postures Explanation */}
            <div className="space-y-3.5 font-sans text-[14px] sm:text-[15px] leading-[1.68] text-[#5C4D40] font-normal">
              <p>
                For meditation, the aim is not simply to arrange the body into a particular shape, but to find a posture that can remain <strong className="font-semibold text-[#402E1D]">steady without unnecessary discomfort</strong>.
              </p>
              <p>
                Classical seated postures such as <strong className="font-semibold text-[#402E1D]">Siddhasana and Padmasana</strong> have long been used for meditation. The Lotus Seat is designed to provide an elevated, stable foundation for these postures while allowing each practitioner to sit according to their own mobility.
              </p>
            </div>

          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* ROW 2: POSTURE, BREATH & PRANA — TEXT LEFT | IMAGE RIGHT */}
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
              <div className="flex items-center gap-2 mb-2.5 sm:mb-3.5">
                <span className="font-sans text-[11.5px] sm:text-[12.5px] font-bold tracking-normal uppercase text-[#876540]">
                  /SUBTLE ANATOMY &amp; ENERGY
                </span>
              </div>

              {/* Heading */}
              <h3 className="font-display font-semibold text-[28px] sm:text-[36px] md:text-[40px] leading-[1.14] tracking-[-0.015em] text-[#2C2016] mb-4 sm:mb-5">
                Posture, Breath &amp; Prana
              </h3>

              {/* Narrative Content */}
              <div className="space-y-3.5 font-sans text-[14px] sm:text-[15px] leading-[1.68] text-[#5C4D40] font-normal mb-6">
                <p>
                  Traditional yogic teachings also place importance on an <strong className="font-semibold text-[#402E1D]">upright, balanced posture</strong> during meditation and pranayama.
                </p>
                <p>
                  Within the yogic subtle-body tradition, <strong className="font-semibold text-[#402E1D]">Ida and Pingala</strong> are described as two principal nadis, while <strong className="font-semibold text-[#402E1D]">Sushumna</strong> is described as the central channel.
                </p>
                <p>
                  Practices such as <strong className="font-semibold text-[#402E1D]">Nadi Shodhana</strong> are traditionally associated with balancing Ida and Pingala and preparing the conditions for prana to move through Sushumna.
                </p>
              </div>

              {/* Elegant Subtle Energy Flow Diagram Indicator (Features Glass Style) */}
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
                  <div className="mb-2.5 text-[#876540]">
                    <span className="font-sans text-[11.5px] font-bold tracking-normal uppercase text-[#876540]">
                      Subtle Energy Alignment
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-[12.5px] sm:text-[13.5px] font-sans font-medium text-[#402E1D]">
                    <span className="px-3 py-1 rounded-full bg-white/60 border border-white/80">
                      Human Silhouette
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#876540] shrink-0" />
                    <span className="px-3 py-1 rounded-full bg-white/60 border border-white/80">
                      Ida + Pingala gently crossing
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#876540] shrink-0" />
                    <span className="px-3 py-1 rounded-full bg-[#876540] text-white font-semibold">
                      Sushumna through the centre
                    </span>
                  </div>
                </div>
              </div>

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
                src="/images/subtle_anatomy_nadi_v2.png"
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
        {/* ROW 3: ANCIENT WISDOM × MODERN COMFORT — IMAGE LEFT | TEXT RIGHT */}
        {/* ========================================================================= */}
        <div className="mt-16 sm:mt-24 lg:mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: Featured Lifestyle Seat Photography (6 Cols) */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative w-full aspect-square max-w-[540px] mx-auto rounded-[24px] sm:rounded-[32px] overflow-hidden group"
            >
              <Image
                src="/images/ancient_wisdom_modern_comfort.png"
                alt="The Lotus Seat — Ancient Wisdom and Modern Ergonomic Support"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 540px"
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
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
              <div className="flex items-center gap-2 mb-2.5 sm:mb-3.5">
                <span className="font-sans text-[11.5px] sm:text-[12.5px] font-bold tracking-normal uppercase text-[#876540]">
                  /ANCIENT WISDOM × MODERN COMFORT
                </span>
              </div>

              {/* Heading */}
              <h3 className="font-display font-semibold text-[28px] sm:text-[36px] md:text-[40px] leading-[1.14] tracking-[-0.015em] text-[#2C2016] mb-4 sm:mb-5">
                Ancient wisdom. Modern support.
              </h3>

              {/* Narrative Content */}
              <div className="space-y-3.5 font-sans text-[14px] sm:text-[15px] leading-[1.68] text-[#5C4D40] font-normal mb-5 sm:mb-6">
                <p>
                  Yogic traditions remind us why the seat and posture matter. Modern ergonomics and materials give us new ways to support them.
                </p>
                <p>
                  The Lotus Seat brings the two together — an ergonomic foundation designed for the body, in service of a practice that has always looked beyond it.
                </p>
              </div>

              {/* Highlight Affirmation Box (Features Glass Style) */}
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

            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}

