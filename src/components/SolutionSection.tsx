"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import AnimatedReveal from "@/components/ui/AnimatedReveal";

interface SolutionStep {
  number: string;
  badge: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
}

const solutionSteps: SolutionStep[] = [
  {
    number: "01",
    badge: "Pelvic Support",
    title: "A stable foundation from the pelvis up.",
    desc: "Supports the base of the posture so the spine can rise more naturally.",
    image: "/images/solution/solution_step_1.avif",
    alt: "Pelvic support foundation for natural spine alignment",
  },
  {
    number: "02",
    badge: "Hip Elevation",
    title: "More room for the hips to settle.",
    desc: "Gentle elevation makes cross-legged sitting less demanding on the hips.",
    image: "/images/solution/solution_step_2.avif",
    alt: "Hip elevation for comfortable cross-legged sitting",
  },
  {
    number: "03",
    badge: "Knee Comfort",
    title: "Less strain through the legs.",
    desc: "A more balanced sitting position gives the knees more freedom to settle naturally.",
    image: "/images/solution/solution_step_3.avif",
    alt: "Knee comfort and reduced leg strain",
  },
  {
    number: "04",
    badge: "Tailbone & Lower-Back Comfort",
    title: "Support where long sitting is often felt most.",
    desc: "Responsive cushioning helps distribute pressure around the pelvis and sitting area.",
    image: "/images/solution/solution_step_4.avif",
    alt: "Tailbone and lower back pressure relief",
  },
  {
    number: "05",
    badge: "Naturally Upright Posture",
    title: "Upright without being held upright.",
    desc: "The seat supports the foundation of the posture rather than relying on a backrest.",
    image: "/images/solution/solution_step_5.avif",
    alt: "Natural upright posture support without backrest",
  },
  {
    number: "06",
    badge: "Less Readjustment",
    title: "Settle in and stay with it.",
    desc: "A stable, comfortable sitting position means less need to keep shifting in search of comfort.",
    image: "/images/solution/solution_step_6.avif",
    alt: "Stable sitting position with less need to readjust",
  },
];

export default function SolutionSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<1 | -1>(1);
  const [flipProgress, setFlipProgress] = useState(0); // 0 (flat) to 1 (fully flipped)
  const [targetStep, setTargetStep] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const bookContainerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const totalSteps = solutionSteps.length;

  const startPageFlip = (dir: 1 | -1, customTarget?: number, customDuration = 820) => {
    if (isFlipping && !isDragging) return;

    const nextIndex = customTarget !== undefined 
      ? customTarget 
      : (activeStep + dir + totalSteps) % totalSteps;
      
    if (nextIndex === activeStep && !isDragging) return;

    setFlipDirection(dir);
    setTargetStep(nextIndex);
    setIsFlipping(true);
    
    const startProgress = flipProgress;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / customDuration, 1);
      
      // S-curve ease-in-out for natural start, steady roll, and soft landing
      const ease = t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
        
      const current = startProgress + (1 - startProgress) * ease;

      setFlipProgress(current);

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setActiveStep(nextIndex);
        setIsFlipping(false);
        setIsDragging(false);
        setFlipProgress(0);
        setTargetStep(null);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  };

  const paginate = (dir: 1 | -1) => {
    startPageFlip(dir);
  };

  // Interactive Drag-to-Peel Support (Desktop & Mobile)
  const handleGenericPointerDown = (clientX: number, rect: DOMRect) => {
    if (isFlipping) return;
    const x = clientX - rect.left;
    if (x > rect.width * 0.45) {
      setIsDragging(true);
      setIsFlipping(true);
      setFlipDirection(1);
      setTargetStep((activeStep + 1) % totalSteps);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    } else if (x < rect.width * 0.45) {
      setIsDragging(true);
      setIsFlipping(true);
      setFlipDirection(-1);
      setTargetStep((activeStep - 1 + totalSteps) % totalSteps);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    }
  };

  const handleGenericPointerMove = (clientX: number, rect: DOMRect) => {
    if (!isDragging) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    if (flipDirection === 1) {
      const progress = Math.max(0, Math.min((rect.width - x) / (rect.width * 0.85), 1));
      setFlipProgress(progress);
    } else {
      const progress = Math.max(0, Math.min(x / (rect.width * 0.85), 1));
      setFlipProgress(progress);
    }
  };

  const handleGenericPointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (flipProgress > 0.25) {
      startPageFlip(flipDirection, targetStep !== null ? targetStep : undefined, 420);
    } else {
      const startTime = performance.now();
      const startP = flipProgress;
      const revertAnim = (now: number) => {
        const t = Math.min((now - startTime) / 300, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        setFlipProgress(startP * (1 - ease));
        if (t < 1) {
          animFrameRef.current = requestAnimationFrame(revertAnim);
        } else {
          setIsFlipping(false);
          setFlipProgress(0);
          setTargetStep(null);
        }
      };
      animFrameRef.current = requestAnimationFrame(revertAnim);
    }
  };

  // Autoplay 3.0s
  useEffect(() => {
    if (isPaused || isFlipping || isDragging) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, isFlipping, isDragging, activeStep]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const currentStepData = solutionSteps[activeStep];
  const targetStepData = targetStep !== null 
    ? solutionSteps[targetStep] 
    : solutionSteps[(activeStep + flipDirection + totalSteps) % totalSteps];

  // In Next (+1): Base is Target (Next Step), Overlay is Current (Peeling away)
  // In Prev (-1): Base is Current (Flat), Overlay is Target (Previous Step unrolling on top)
  const baseData = isFlipping && flipDirection === 1 ? targetStepData : currentStepData;
  const overlayData = isFlipping && flipDirection === -1 ? targetStepData : currentStepData;

  // Dynamic Physical Polygon Calculations
  const fwdPeelTop = Math.max(0, 100 - flipProgress * 128);
  const fwdPeelBottom = Math.max(0, 100 - flipProgress * 95);

  const bwdUnrollTop = Math.min(100, flipProgress * 128);
  const bwdUnrollBottom = Math.min(100, flipProgress * 95);

  // Dynamic Flap Wave Width (0 at start, expands mid-roll, flattens at landing)
  const flapWidth = Math.sin(flipProgress * Math.PI) * 22;

  const overlayClipPath = isFlipping
    ? flipDirection === 1
      ? `polygon(0% 0%, ${fwdPeelTop}% 0%, ${fwdPeelBottom}% 100%, 0% 100%)`
      : `polygon(0% 0%, ${bwdUnrollTop}% 0%, ${bwdUnrollBottom}% 100%, 0% 100%)`
    : "none";

  const flapClipPath = flipDirection === 1
    ? `polygon(${fwdPeelTop}% 0%, ${Math.min(100, fwdPeelTop + flapWidth)}% 0%, ${Math.min(100, fwdPeelBottom + flapWidth)}% 100%, ${fwdPeelBottom}% 100%)`
    : `polygon(${Math.max(0, bwdUnrollTop - flapWidth)}% 0%, ${bwdUnrollTop}% 0%, ${bwdUnrollBottom}% 100%, ${Math.max(0, bwdUnrollBottom - flapWidth)}% 100%)`;

  const creaseX = flipDirection === 1
    ? `${(fwdPeelTop + fwdPeelBottom) / 2}%`
    : `${(bwdUnrollTop + bwdUnrollBottom) / 2}%`;

  return (
    <section
      id="the-solution"
      data-header-theme="light"
      className="relative w-full text-[#402E1D] py-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 overflow-hidden flex flex-col items-center justify-center scroll-mt-16 sm:scroll-mt-24"
    >
      {/* Full-cover Background Image */}
      <Image
        src="/images/about-bg.avif"
        alt="Solution section background"
        fill
        priority={false}
        unoptimized
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Warm overlay for legibility with section color */}
      <div className="absolute inset-0 bg-[#E6DFD4]/45 backdrop-blur-[1px]" />

      {/* Section Container */}
      <div className="relative z-10 w-full max-w-[1360px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-10 lg:mb-12">
          <div className="max-w-[640px]">
            {/* Eyebrow Label */}
            <AnimatedReveal delay={0.02} y={12} className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="font-sans text-[13.5px] sm:text-[15px] font-extrabold tracking-[0.03em] uppercase text-[#73512E] underline underline-offset-4 decoration-2 decoration-[#876540]/80 pb-0.5">
                THE SOLUTION
              </span>
            </AnimatedReveal>

            {/* Headline with kinetic character reveal */}
            <AnimatedHeading
              text="Designed to help the body settle."
              className="font-display font-semibold text-[24px] sm:text-[36px] md:text-[44px] lg:text-[48px] leading-[1.22] sm:leading-[1.28] lg:leading-[1.3] tracking-[-0.015em] text-[#402E1D]"
            />
          </div>

          {/* Description Paragraph */}
          <AnimatedReveal delay={0.15} y={16} className="max-w-[460px] md:pb-1">
            <p className="font-sans text-[13px] sm:text-[15px] leading-[1.65] sm:leading-[1.7] text-[#402E1D]/80 font-normal">
              The Lotus Seat brings support, elevation and comfort together in one foundation — helping the body find a naturally upright position, settle comfortably, and stay there with less need to readjust.
            </p>
          </AnimatedReveal>
        </div>

        {/* ================= DESKTOP VIEW: PHOTOREALISTIC LEATHER JOURNAL (md and above) ================= */}
        <div 
          ref={bookContainerRef}
          onPointerDown={(e) => {
            const rect = bookContainerRef.current?.getBoundingClientRect();
            if (rect) handleGenericPointerDown(e.clientX, rect);
          }}
          onPointerMove={(e) => {
            const rect = bookContainerRef.current?.getBoundingClientRect();
            if (rect) handleGenericPointerMove(e.clientX, rect);
          }}
          onPointerUp={handleGenericPointerUp}
          onPointerLeave={handleGenericPointerUp}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={`hidden md:block relative w-full max-w-[1240px] aspect-[1683/935] min-h-[350px] sm:min-h-[430px] lg:min-h-[490px] select-none [perspective:2400px] ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {/* 1. Photorealistic Leather Book Background (Spine + Outer Stitching + Parchment Stack) */}
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            <Image
              src="/images/leather_book_cover.avif"
              alt="Handcrafted Leather Journal"
              fill
              priority
              unoptimized
              className="object-contain object-center drop-shadow-[0_24px_55px_rgba(20,10,4,0.38)]"
            />
          </div>

          {/* 2. Dynamic Content Spread (Starts at Left Page Margin past Spine) */}
          <div className="absolute left-[20.6%] top-[15.6%] right-[7.55%] bottom-[20.1%] z-10 overflow-hidden rounded-r-[20px] sm:rounded-r-[26px]">
            
            {/* LAYER 1: BASE PAGE (Only during transition) */}
            {isFlipping && (
              <div 
                style={{
                  background: "linear-gradient(to right, transparent 0%, rgba(250, 246, 238, 0.3) 1.5%, #FAF6EE 4%, #FAF6EE 100%)",
                }}
                className="absolute inset-0 pl-6 sm:pl-10 lg:pl-14 pr-4 sm:pr-8 lg:pr-10 py-3 sm:py-5 flex items-center z-0"
              >
                {/* Soft Left Spine Crease Blend Shadow */}
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#2A150A]/10 to-transparent pointer-events-none z-20" />

                {/* Sacred Mandala Motif */}
                <div className="absolute -left-6 -top-6 w-[200px] sm:w-[280px] aspect-square pointer-events-none select-none z-0 opacity-[0.09] mix-blend-multiply">
                  <Image
                    src="/images/about.avif"
                    alt="Sacred Mandala Motif"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>

                {/* Two-Column Layout (Fills Page Proportions) */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 lg:gap-8 items-center w-full h-full">
                  <div className="w-full md:col-span-7 flex flex-col justify-center pr-0 sm:pr-4">
                    <div className="flex items-center gap-2 mb-2.5 sm:mb-3.5 lg:mb-4">
                      <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#876540]/10 text-[#876540] font-sans text-[9.5px] sm:text-[11px] lg:text-[12px] font-bold tracking-wider uppercase">
                        SOLUTION {baseData.number}
                      </span>
                      <span className="font-sans text-[11px] sm:text-[12.5px] lg:text-[13.5px] font-semibold text-[#876540]/90">
                        {baseData.badge}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-[18px] sm:text-[23px] md:text-[25px] lg:text-[29px] text-[#1E140D] leading-[1.24] sm:leading-[1.26] tracking-[-0.015em] mb-2 sm:mb-3 lg:mb-3.5">
                      {baseData.title}
                    </h3>
                    <p className="font-sans text-[11.5px] sm:text-[13px] lg:text-[14.5px] leading-[1.65] text-[#402E1D]/85 font-normal max-w-[440px]">
                      {baseData.desc}
                    </p>
                  </div>

                  <div className="w-full md:col-span-5 h-full flex items-center justify-center md:justify-end py-1">
                    <div className="relative w-full max-w-[280px] md:max-w-none h-full max-h-[260px] sm:max-h-[310px] lg:max-h-[350px] aspect-[4/3.8] rounded-[14px] sm:rounded-[20px] overflow-hidden shadow-[0_8px_22px_rgba(40,20,10,0.12)] border border-black/5">
                      <Image
                        src={baseData.image}
                        alt={baseData.alt}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 35vw"
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAYER 2: PRIMARY ACTIVE / OVERLAY SHEET */}
            <div 
              style={{ 
                clipPath: overlayClipPath, 
                transform: isFlipping
                  ? `perspective(1200px) rotateY(${flipDirection === 1 ? -flipProgress * 10 : -(1 - flipProgress) * 10}deg)`
                  : "none",
                transformOrigin: "0% 50%",
                background: "linear-gradient(to right, transparent 0%, rgba(250, 246, 238, 0.3) 1.5%, #FAF6EE 4%, #FAF6EE 100%)",
              }}
              className={`relative w-full h-full pl-6 sm:pl-10 lg:pl-14 pr-4 sm:pr-8 lg:pr-10 py-3 sm:py-5 flex items-center z-10 ${
                isFlipping ? "shadow-[0_6px_20px_rgba(20,10,4,0.10)]" : ""
              }`}
            >
              {/* Soft Left Spine Crease Blend Shadow */}
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#2A150A]/10 to-transparent pointer-events-none z-20" />
              
              {/* Sacred Mandala Motif */}
              <div className="absolute -left-6 -top-6 w-[200px] sm:w-[280px] aspect-square pointer-events-none select-none z-0 opacity-[0.09] mix-blend-multiply">
                <Image
                  src="/images/about.avif"
                  alt="Sacred Mandala Motif"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>

              {/* Two-Column Layout (Fills Page Proportions) */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 lg:gap-8 items-center w-full h-full">
                <div className="w-full md:col-span-7 flex flex-col justify-center pr-0 sm:pr-4">
                  <div className="flex items-center gap-2 mb-2.5 sm:mb-3.5 lg:mb-4">
                    <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#876540]/10 text-[#876540] font-sans text-[9.5px] sm:text-[11px] lg:text-[12px] font-bold tracking-wider uppercase">
                      SOLUTION {overlayData.number}
                    </span>
                    <span className="font-sans text-[11px] sm:text-[12.5px] lg:text-[13.5px] font-semibold text-[#876540]/90">
                      {overlayData.badge}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-[18px] sm:text-[23px] md:text-[25px] lg:text-[29px] text-[#1E140D] leading-[1.24] sm:leading-[1.26] tracking-[-0.015em] mb-2 sm:mb-3 lg:mb-3.5">
                    {overlayData.title}
                  </h3>
                  <p className="font-sans text-[11.5px] sm:text-[13px] lg:text-[14.5px] leading-[1.65] text-[#402E1D]/85 font-normal max-w-[440px]">
                    {overlayData.desc}
                  </p>
                </div>

                <div className="w-full md:col-span-5 h-full flex items-center justify-center md:justify-end py-1">
                  <div className="relative w-full max-w-[280px] md:max-w-none h-full max-h-[260px] sm:max-h-[310px] lg:max-h-[350px] aspect-[4/3.8] rounded-[14px] sm:rounded-[20px] overflow-hidden shadow-[0_8px_22px_rgba(40,20,10,0.12)] border border-black/5">
                    <Image
                      src={overlayData.image}
                      alt={overlayData.alt}
                      fill
                      unoptimized
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 35vw"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* LAYER 3: REALISTIC 3D PEELING / UNROLLING FLAP */}
            {(isFlipping || isDragging) && (
              <div 
                className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
                style={{
                  clipPath: flapClipPath,
                  filter: `drop-shadow(-${Math.sin(flipProgress * Math.PI) * 12}px ${Math.sin(flipProgress * Math.PI) * 12}px ${Math.max(2, Math.sin(flipProgress * Math.PI) * 20)}px rgba(20,10,4,${Math.sin(flipProgress * Math.PI) * 0.38}))`,
                }}
              >
                {/* The Back-side of the Parchment Sheet */}
                <div 
                  className="w-full h-full bg-gradient-to-br from-[#F5EDE0] via-[#EFE5D4] to-[#E3D6C1] relative"
                  style={{
                    transform: `rotateY(${flipDirection === 1 ? -180 * flipProgress : 180 * (1 - flipProgress)}deg)`,
                    transformOrigin: creaseX + " 50%",
                    opacity: flipProgress > 0.88 
                      ? Math.max(0, (1 - flipProgress) / 0.12) 
                      : flipProgress < 0.12 
                      ? Math.max(0, flipProgress / 0.12) 
                      : 1,
                  }}
                >
                  {/* Paper Texture Grain & Watermark Mirror */}
                  <div className="absolute inset-0 opacity-[0.08] mix-blend-multiply flex items-center justify-center pointer-events-none scale-x-[-1]">
                    <Image
                      src="/images/about.avif"
                      alt="Watermark Mirror"
                      width={220}
                      height={220}
                      unoptimized
                      className="object-contain"
                    />
                  </div>

                  {/* Traveling Crease Highlight & Drop Shadow Shader */}
                  <div 
                    className="absolute inset-y-0 w-[160px] pointer-events-none"
                    style={{
                      left: creaseX,
                      transform: "translateX(-50%)",
                      background: "linear-gradient(to right, rgba(0,0,0,0.40) 0%, rgba(255,255,255,0.80) 15%, rgba(0,0,0,0.06) 45%, transparent 100%)",
                      opacity: Math.sin(flipProgress * Math.PI),
                    }}
                  />
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ================= MOBILE VIEW: 3D REALISTIC FOLDING LEATHER JOURNAL CARD (< md) ================= */}
        <div 
          ref={mobileContainerRef}
          onPointerDown={(e) => {
            const rect = mobileContainerRef.current?.getBoundingClientRect();
            if (rect) handleGenericPointerDown(e.clientX, rect);
          }}
          onPointerMove={(e) => {
            const rect = mobileContainerRef.current?.getBoundingClientRect();
            if (rect) handleGenericPointerMove(e.clientX, rect);
          }}
          onPointerUp={handleGenericPointerUp}
          onPointerLeave={handleGenericPointerUp}
          className="md:hidden relative w-full max-w-[440px] bg-[#3B2213] rounded-[24px] p-2.5 sm:p-3.5 shadow-[0_16px_36px_rgba(20,10,4,0.32)] border border-[#52301A] overflow-hidden select-none touch-pan-y [perspective:2000px]"
        >
          {/* Decorative Outer Stitching Rim */}
          <div className="absolute inset-1 rounded-[20px] border border-dashed border-[#D29E5A]/35 pointer-events-none z-40" />
          
          {/* Relative Container for 3-Layer Mobile Page Engine */}
          <div className="relative w-full overflow-hidden rounded-[17px]">

            {/* MOBILE LAYER 1: BASE PAGE (Visible beneath the peel) */}
            {isFlipping && (
              <div className="absolute inset-0 w-full h-full bg-[#FAF6EE] p-4 sm:p-5 flex flex-col z-0 shadow-[inset_0_2px_8px_rgba(40,20,10,0.08)]">
                {/* Mandala Motif */}
                <div className="absolute -left-6 -top-6 w-[160px] aspect-square pointer-events-none select-none z-0 opacity-[0.08] mix-blend-multiply">
                  <Image
                    src="/images/about.avif"
                    alt="Sacred Mandala Motif"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>

                <div className="relative z-10 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#876540]/10 text-[#876540] font-sans text-[10px] font-bold tracking-wider uppercase">
                      SOLUTION {baseData.number}
                    </span>
                    <span className="font-sans text-[11.5px] font-semibold text-[#876540]/90">
                      {baseData.badge}
                    </span>
                  </div>

                  <div className="min-h-[50px] sm:min-h-[56px] flex items-center mb-2.5">
                    <h3 className="font-display font-bold text-[18.5px] sm:text-[21px] text-[#1E140D] leading-[1.24] tracking-[-0.015em]">
                      {baseData.title}
                    </h3>
                  </div>

                  <div className="relative w-full max-w-[300px] aspect-square rounded-[16px] overflow-hidden shadow-[0_6px_18px_rgba(40,20,10,0.12)] border border-black/5 mx-auto mb-2.5">
                    <Image
                      src={baseData.image}
                      alt={baseData.alt}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 90vw, 300px"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="min-h-[44px] sm:min-h-[48px] flex items-start">
                    <p className="font-sans text-[12.5px] sm:text-[13.5px] leading-[1.58] text-[#402E1D]/85 font-normal">
                      {baseData.desc}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* MOBILE LAYER 2: PRIMARY ACTIVE / OVERLAY SHEET */}
            <div 
              style={{
                clipPath: overlayClipPath,
                transform: isFlipping
                  ? `perspective(1000px) rotateY(${flipDirection === 1 ? -flipProgress * 10 : -(1 - flipProgress) * 10}deg)`
                  : "none",
                transformOrigin: "0% 50%",
              }}
              className={`relative w-full bg-[#FAF6EE] p-4 sm:p-5 flex flex-col z-10 shadow-[inset_0_2px_8px_rgba(40,20,10,0.08)] ${
                isFlipping ? "shadow-[0_6px_20px_rgba(20,10,4,0.12)]" : ""
              }`}
            >
              {/* Mandala Motif */}
              <div className="absolute -left-6 -top-6 w-[160px] aspect-square pointer-events-none select-none z-0 opacity-[0.08] mix-blend-multiply">
                <Image
                  src="/images/about.avif"
                  alt="Sacred Mandala Motif"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>

              <div className="relative z-10 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#876540]/10 text-[#876540] font-sans text-[10px] font-bold tracking-wider uppercase">
                    SOLUTION {overlayData.number}
                  </span>
                  <span className="font-sans text-[11.5px] font-semibold text-[#876540]/90">
                    {overlayData.badge}
                  </span>
                </div>

                <div className="min-h-[50px] sm:min-h-[56px] flex items-center mb-2.5">
                  <h3 className="font-display font-bold text-[18.5px] sm:text-[21px] text-[#1E140D] leading-[1.24] tracking-[-0.015em]">
                    {overlayData.title}
                  </h3>
                </div>

                <div className="relative w-full max-w-[300px] aspect-square rounded-[16px] overflow-hidden shadow-[0_6px_18px_rgba(40,20,10,0.12)] border border-black/5 mx-auto mb-2.5">
                  <Image
                    src={overlayData.image}
                    alt={overlayData.alt}
                    fill
                    unoptimized
                    priority
                    sizes="(max-width: 640px) 90vw, 300px"
                    className="object-cover object-center"
                  />
                </div>

                <div className="min-h-[44px] sm:min-h-[48px] flex items-start">
                  <p className="font-sans text-[12.5px] sm:text-[13.5px] leading-[1.58] text-[#402E1D]/85 font-normal">
                    {overlayData.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* MOBILE LAYER 3: REALISTIC 3D PEELING / UNROLLING FLAP */}
            {(isFlipping || isDragging) && (
              <div 
                className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
                style={{
                  clipPath: flapClipPath,
                  filter: `drop-shadow(-${Math.sin(flipProgress * Math.PI) * 10}px ${Math.sin(flipProgress * Math.PI) * 10}px ${Math.max(2, Math.sin(flipProgress * Math.PI) * 16)}px rgba(20,10,4,${Math.sin(flipProgress * Math.PI) * 0.35}))`,
                }}
              >
                {/* Back-side parchment flap */}
                <div 
                  className="w-full h-full bg-gradient-to-br from-[#F5EDE0] via-[#EFE5D4] to-[#E3D6C1] relative"
                  style={{
                    transform: `rotateY(${flipDirection === 1 ? -180 * flipProgress : 180 * (1 - flipProgress)}deg)`,
                    transformOrigin: creaseX + " 50%",
                    opacity: flipProgress > 0.88 
                      ? Math.max(0, (1 - flipProgress) / 0.12) 
                      : flipProgress < 0.12 
                      ? Math.max(0, flipProgress / 0.12) 
                      : 1,
                  }}
                >
                  <div className="absolute inset-0 opacity-[0.08] mix-blend-multiply flex items-center justify-center pointer-events-none scale-x-[-1]">
                    <Image
                      src="/images/about.avif"
                      alt="Watermark Mirror"
                      width={160}
                      height={160}
                      unoptimized
                      className="object-contain"
                    />
                  </div>

                  <div 
                    className="absolute inset-y-0 w-[120px] pointer-events-none"
                    style={{
                      left: creaseX,
                      transform: "translateX(-50%)",
                      background: "linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(255,255,255,0.75) 15%, rgba(0,0,0,0.05) 45%, transparent 100%)",
                      opacity: Math.sin(flipProgress * Math.PI),
                    }}
                  />
                </div>
              </div>
            )}

          </div>
        </div>

        {/* BOTTOM NAVIGATION: Minimal Prev / Next Arrows */}
        <div className="relative z-20 flex items-center justify-center gap-3 mt-4 sm:mt-5 md:-mt-4 lg:-mt-12">
          <button
            onClick={() => paginate(-1)}
            disabled={isFlipping}
            aria-label="Previous page"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/70 hover:bg-white text-[#402E1D] flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.4]" />
          </button>

          {/* Subtle Page Counter */}
          <span className="font-sans text-[12.5px] sm:text-[13.5px] font-semibold text-[#876540] px-2 select-none tracking-wider">
            {activeStep + 1} / {totalSteps}
          </span>

          <button
            onClick={() => paginate(1)}
            disabled={isFlipping}
            aria-label="Next page"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/70 hover:bg-white text-[#402E1D] flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.4]" />
          </button>
        </div>

      </div>
    </section>
  );
}
