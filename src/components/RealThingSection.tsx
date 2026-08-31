"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const TOTAL_FRAMES = 199;
const FRAME_PATH = (n: number) =>
  `/images/frames/frame_${String(n).padStart(6, "0")}.avif`;

export default function RealThingSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isCloseUpShot, setIsCloseUpShot] = useState(false);
  const [isWideShot, setIsWideShot] = useState(false);
  const [isPracticeShot, setIsPracticeShot] = useState(false);
  const [isBeginningShot, setIsBeginningShot] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Preload all frames progressively
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    // 1. Critical Wave: Load initial 25 frames immediately
    const priorityCount = Math.min(25, TOTAL_FRAMES);
    for (let i = 0; i < priorityCount; i++) {
      const img = new window.Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        if (i === 0 && canvasRef.current) {
          drawFrame(0);
        }
      };
      images[i] = img;
    }

    // 2. Background Wave: Stream remaining frames smoothly
    const loadRemaining = () => {
      for (let i = priorityCount; i < TOTAL_FRAMES; i++) {
        const img = new window.Image();
        img.src = FRAME_PATH(i);
        images[i] = img;
      }
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(loadRemaining, { timeout: 800 });
    } else {
      setTimeout(loadRemaining, 100);
    }

    imagesRef.current = images;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Draw a specific frame index (0-based)
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;
    const bufW = Math.round(cssWidth * dpr);
    const bufH = Math.round(cssHeight * dpr);

    // Only resize buffer when it actually changes — avoids unnecessary clears
    if (canvas.width !== bufW || canvas.height !== bufH) {
      canvas.width = bufW;
      canvas.height = bufH;
      ctx.scale(dpr, dpr);
    }

    // High-quality smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Cover-fit the image into the CSS viewport size
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = cssWidth / cssHeight;

    let sx = 0,
      sy = 0,
      sw = img.naturalWidth,
      sh = img.naturalHeight;

    if (imgAspect > canvasAspect) {
      sw = img.naturalHeight * canvasAspect;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / canvasAspect;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.clearRect(0, 0, cssWidth, cssHeight);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cssWidth, cssHeight);
  };

  // Scroll-driven frame scrubbing & title/cards visibility
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Progress: 0 when section top hits viewport top → 1 when section bottom hits viewport bottom
      const scrollable = sectionHeight - viewportHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = scrollable > 0 ? Math.min(scrolled / scrollable, 1) : 0;

      const frameIndex = Math.min(
        Math.floor(progress * TOTAL_FRAMES),
        TOTAL_FRAMES - 1
      );

      // Title & label: Fully visible during initial lotus embroidery (frames 0 to 18),
      // smoothly fades out as camera pulls back (frames 18 to 30), and is completely hidden from frame 30 onwards.
      if (titleRef.current) {
        if (frameIndex < 18) {
          titleRef.current.style.opacity = "1";
          titleRef.current.style.transform = "translate3d(0, 0, 0)";
          titleRef.current.style.visibility = "visible";
        } else if (frameIndex < 30) {
          const t = (frameIndex - 18) / 12;
          const opacity = Math.max(0, 1 - t);
          titleRef.current.style.opacity = String(opacity);
          titleRef.current.style.transform = `translate3d(0, ${-t * 20}px, 0)`;
          titleRef.current.style.visibility = opacity === 0 ? "hidden" : "visible";
        } else {
          titleRef.current.style.opacity = "0";
          titleRef.current.style.transform = "translate3d(0, -20px, 0)";
          titleRef.current.style.visibility = "hidden";
        }
      }

      // Discrete trigger for Scene 2 Close-Up Cards: exactly from frame 30 to frame 57
      const shouldShowCloseUp = frameIndex >= 30 && frameIndex <= 57;
      setIsCloseUpShot((prev) => (prev !== shouldShowCloseUp ? shouldShowCloseUp : prev));

      // Discrete trigger for Scene 3 Wide Seat Cards: frame 58 to frame 90 (hides after frame 90)
      const shouldShowWide = frameIndex >= 58 && frameIndex <= 90;
      setIsWideShot((prev) => (prev !== shouldShowWide ? shouldShowWide : prev));

      // Discrete trigger for Scene 4 Practice Cards: frame 117 to frame 172
      const shouldShowPractice = frameIndex >= 117 && frameIndex <= 172;
      setIsPracticeShot((prev) => (prev !== shouldShowPractice ? shouldShowPractice : prev));

      // Discrete trigger for Scene 5 Single Center Card: after frame 173 (frame 173 to 198)
      const shouldShowBeginning = frameIndex >= 173 && frameIndex <= 198;
      setIsBeginningShot((prev) => (prev !== shouldShowBeginning ? shouldShowBeginning : prev));

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // init
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Resize: reset canvas buffer so DPR recalc triggers, then redraw
  useEffect(() => {
    const onResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      // Force buffer size recalc on next drawFrame
      canvas.width = 1;
      canvas.height = 1;
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    // Outer section is TALL (scroll distance = 5× viewport = full 300-frame play)
    <div
      ref={sectionRef}
      id="real-thing"
      data-header-theme="hidden"
      className="relative scroll-mt-0"
      style={{ height: "500vh" }}
    >
      {/* Sticky inner — stays pinned while user scrolls */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Canvas renders each frame */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Label + headline: fades out permanently as soon as scroll begins */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 pointer-events-none">
          <div
            ref={titleRef}
            className="text-center will-change-transform transition-[opacity,transform] duration-150 ease-out"
          >
            <p className="font-sans text-[10px] sm:text-[12px] md:text-[12.5px] font-bold tracking-[0.18em] uppercase text-white/70 mb-2 sm:mb-3">
              /FEATURES
            </p>
            <h2 className="font-display font-semibold text-[26px] sm:text-[44px] md:text-[54px] lg:text-[64px] leading-[1.08] tracking-[-0.015em] text-white max-w-[90vw] sm:max-w-[820px]">
              A closer look at the real thing
            </h2>
          </div>
        </div>

        {/* Scene 2 Left Feature Card (Appears on close-up embroidery shot, frame 30-57) */}
        <div
          className={`absolute left-3 sm:left-8 lg:left-14 top-14 sm:top-1/2 sm:-translate-y-1/2 z-20 select-none transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isCloseUpShot
              ? "translate-x-0 pointer-events-auto"
              : "-translate-x-[calc(100%+80px)] pointer-events-none"
          }`}
        >
          <div className="relative w-[230px] min-[400px]:w-[260px] sm:w-[310px] md:w-[350px] lg:w-[380px] rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 transition-transform duration-500 hover:-translate-y-1">
            {/* Always-Active Frosted Glass Background Layer - 0ms Blur Delay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl"
              style={{
                backdropFilter: "blur(32px) saturate(130%)",
                WebkitBackdropFilter: "blur(32px) saturate(130%)",
                transform: "translateZ(0)",
                WebkitTransform: "translateZ(0)",
                willChange: "transform, backdrop-filter",
                background: "rgba(255, 255, 255, 0.14)",
              }}
            />

            <div className="relative z-10">
              <h3 className="font-display font-bold text-white text-[16px] min-[400px]:text-[17px] sm:text-[20px] md:text-[22px] lg:text-[24px] tracking-[0.015em] leading-tight mb-1 sm:mb-2">
                Made to be felt up close.
              </h3>
              <p className="font-sans text-[12px] min-[400px]:text-[12.5px] sm:text-[13.5px] md:text-[14px] lg:text-[14.5px] leading-[1.5] sm:leading-[1.6] tracking-[0.01em] text-white/90 font-normal">
                Carefully finished seams, tactile fabric and subtle embroidery bring softness and character to every detail.
              </p>
            </div>
          </div>
        </div>

        {/* Scene 2 Right Feature Card (Appears on close-up embroidery shot, frame 30-57) */}
        <div
          className={`absolute right-3 sm:right-8 lg:right-14 bottom-16 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-20 select-none transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isCloseUpShot
              ? "translate-x-0 pointer-events-auto"
              : "translate-x-[calc(100%+80px)] pointer-events-none"
          }`}
        >
          <div className="relative w-[230px] min-[400px]:w-[260px] sm:w-[310px] md:w-[350px] lg:w-[380px] rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 transition-transform duration-500 hover:-translate-y-1">
            {/* Always-Active Frosted Glass Background Layer - 0ms Blur Delay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl"
              style={{
                backdropFilter: "blur(32px) saturate(130%)",
                WebkitBackdropFilter: "blur(32px) saturate(130%)",
                transform: "translateZ(0)",
                WebkitTransform: "translateZ(0)",
                willChange: "transform, backdrop-filter",
                background: "rgba(255, 255, 255, 0.14)",
              }}
            />

            <div className="relative z-10">
              <h3 className="font-display font-bold text-white text-[16px] min-[400px]:text-[17px] sm:text-[20px] md:text-[22px] lg:text-[24px] tracking-[0.015em] leading-tight mb-1 sm:mb-2">
                Removable. Washable. Replaceable.
              </h3>
              <p className="font-sans text-[12px] min-[400px]:text-[12.5px] sm:text-[13.5px] md:text-[14px] lg:text-[14.5px] leading-[1.5] sm:leading-[1.6] tracking-[0.01em] text-white/90 font-normal">
                A zippered cover made to come off easily — so it can be washed, refreshed or changed whenever needed.
              </p>
            </div>
          </div>
        </div>

        {/* Scene 3 Left Feature Card (Appears on wide seat shot, frame 58-90) */}
        <div
          className={`absolute left-3 sm:left-8 lg:left-14 top-14 sm:top-1/2 sm:-translate-y-1/2 z-20 select-none transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isWideShot
              ? "translate-x-0 pointer-events-auto"
              : "-translate-x-[calc(100%+80px)] pointer-events-none"
          }`}
        >
          <div className="relative w-[230px] min-[400px]:w-[260px] sm:w-[310px] md:w-[350px] lg:w-[380px] rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 transition-transform duration-500 hover:-translate-y-1">
            {/* Always-Active Frosted Glass Background Layer - 0ms Blur Delay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl"
              style={{
                backdropFilter: "blur(32px) saturate(130%)",
                WebkitBackdropFilter: "blur(32px) saturate(130%)",
                transform: "translateZ(0)",
                WebkitTransform: "translateZ(0)",
                willChange: "transform, backdrop-filter",
                background: "rgba(255, 255, 255, 0.14)",
              }}
            />

            <div className="relative z-10">
              <h3 className="font-display font-bold text-white text-[16px] min-[400px]:text-[17px] sm:text-[20px] md:text-[22px] lg:text-[24px] tracking-[0.015em] leading-tight mb-1 sm:mb-2">
                Responsive Natural Latex
              </h3>
              <p className="font-sans text-[12px] min-[400px]:text-[12.5px] sm:text-[13.5px] md:text-[14px] lg:text-[14.5px] leading-[1.5] sm:leading-[1.6] tracking-[0.01em] text-white/90 font-normal">
                Soft enough to relieve concentrated pressure, supportive enough to keep the body from sinking too deeply.
              </p>
            </div>
          </div>
        </div>

        {/* Scene 3 Right Feature Card (Appears on wide seat shot, frame 58-90) */}
        <div
          className={`absolute right-3 sm:right-8 lg:right-14 bottom-16 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-20 select-none transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isWideShot
              ? "translate-x-0 pointer-events-auto"
              : "translate-x-[calc(100%+80px)] pointer-events-none"
          }`}
        >
          <div className="relative w-[230px] min-[400px]:w-[260px] sm:w-[310px] md:w-[350px] lg:w-[380px] rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 transition-transform duration-500 hover:-translate-y-1">
            {/* Always-Active Frosted Glass Background Layer - 0ms Blur Delay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl"
              style={{
                backdropFilter: "blur(32px) saturate(130%)",
                WebkitBackdropFilter: "blur(32px) saturate(130%)",
                transform: "translateZ(0)",
                WebkitTransform: "translateZ(0)",
                willChange: "transform, backdrop-filter",
                background: "rgba(255, 255, 255, 0.14)",
              }}
            />

            <div className="relative z-10">
              <h3 className="font-display font-bold text-white text-[16px] min-[400px]:text-[17px] sm:text-[20px] md:text-[22px] lg:text-[24px] tracking-[0.015em] leading-tight mb-1 sm:mb-2">
                Inclined Cork Base
              </h3>
              <p className="font-sans text-[12px] min-[400px]:text-[12.5px] sm:text-[13.5px] md:text-[14px] lg:text-[14.5px] leading-[1.5] sm:leading-[1.6] tracking-[0.01em] text-white/90 font-normal">
                Gently elevates the pelvis, helping create a more balanced foundation for a naturally upright posture.
              </p>
            </div>
          </div>
        </div>

        {/* Scene 4 Left Feature Card (Appears after frame 117, frame 117-172) */}
        <div
          className={`absolute left-3 sm:left-8 lg:left-14 top-14 sm:top-1/2 sm:-translate-y-1/2 z-20 select-none transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isPracticeShot
              ? "translate-x-0 pointer-events-auto"
              : "-translate-x-[calc(100%+80px)] pointer-events-none"
          }`}
        >
          <div className="relative w-[230px] min-[400px]:w-[260px] sm:w-[310px] md:w-[350px] lg:w-[380px] rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 transition-transform duration-500 hover:-translate-y-1">
            {/* Always-Active Frosted Glass Background Layer - 0ms Blur Delay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl"
              style={{
                backdropFilter: "blur(32px) saturate(130%)",
                WebkitBackdropFilter: "blur(32px) saturate(130%)",
                transform: "translateZ(0)",
                WebkitTransform: "translateZ(0)",
                willChange: "transform, backdrop-filter",
                background: "rgba(255, 255, 255, 0.14)",
              }}
            />

            <div className="relative z-10">
              <h3 className="font-display font-bold text-white text-[16px] min-[400px]:text-[17px] sm:text-[20px] md:text-[22px] lg:text-[24px] tracking-[0.015em] leading-tight mb-1 sm:mb-2">
                Less distraction. More stillness.
              </h3>
              <p className="font-sans text-[12px] min-[400px]:text-[12.5px] sm:text-[13.5px] md:text-[14px] lg:text-[14.5px] leading-[1.5] sm:leading-[1.6] tracking-[0.01em] text-white/90 font-normal">
                Designed so the body can ask for less attention, leaving more of it for the practice.
              </p>
            </div>
          </div>
        </div>

        {/* Scene 4 Right Feature Card (Appears after frame 117, frame 117-172) */}
        <div
          className={`absolute right-3 sm:right-8 lg:right-14 bottom-16 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-20 select-none transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isPracticeShot
              ? "translate-x-0 pointer-events-auto"
              : "translate-x-[calc(100%+80px)] pointer-events-none"
          }`}
        >
          <div className="relative w-[230px] min-[400px]:w-[260px] sm:w-[310px] md:w-[350px] lg:w-[380px] rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 transition-transform duration-500 hover:-translate-y-1">
            {/* Always-Active Frosted Glass Background Layer - 0ms Blur Delay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl"
              style={{
                backdropFilter: "blur(32px) saturate(130%)",
                WebkitBackdropFilter: "blur(32px) saturate(130%)",
                transform: "translateZ(0)",
                WebkitTransform: "translateZ(0)",
                willChange: "transform, backdrop-filter",
                background: "rgba(255, 255, 255, 0.14)",
              }}
            />

            <div className="relative z-10">
              <h3 className="font-display font-bold text-white text-[16px] min-[400px]:text-[17px] sm:text-[20px] md:text-[22px] lg:text-[24px] tracking-[0.015em] leading-tight mb-1 sm:mb-2">
                A place to return to.
              </h3>
              <p className="font-sans text-[12px] min-[400px]:text-[12.5px] sm:text-[13.5px] md:text-[14px] lg:text-[14.5px] leading-[1.5] sm:leading-[1.6] tracking-[0.01em] text-white/90 font-normal">
                Day after Day. Sit after sit. A familiar foundation for the practice that becomes your own.
              </p>
            </div>
          </div>
        </div>

        {/* Scene 5 Single Center Feature Card (Appears after frame 173, frame 173-198) */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 z-20 select-none transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isBeginningShot
              ? "-translate-y-1/2 pointer-events-auto"
              : "-translate-y-[calc(100vh+120px)] pointer-events-none"
          }`}
        >
          <div className="relative w-[calc(100vw-36px)] max-w-[340px] sm:max-w-none sm:w-[480px] md:w-[560px] lg:w-[600px] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-9 transition-transform duration-500 hover:-translate-y-1">
            {/* Always-Active Frosted Glass Background Layer - 0ms Blur Delay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl"
              style={{
                backdropFilter: "blur(32px) saturate(130%)",
                WebkitBackdropFilter: "blur(32px) saturate(130%)",
                transform: "translateZ(0)",
                WebkitTransform: "translateZ(0)",
                willChange: "transform, backdrop-filter",
                background: "rgba(255, 255, 255, 0.14)",
              }}
            />

            <div className="relative z-10 text-center flex flex-col items-center">
              <h3 className="font-display font-bold text-white text-[18px] min-[400px]:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[30px] tracking-[0.015em] leading-tight mb-2 sm:mb-3">
                THE SEAT IS ONLY THE BEGINNING
              </h3>
              <p className="font-sans text-[13px] min-[400px]:text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16.5px] leading-[1.5] sm:leading-[1.6] tracking-[0.01em] text-white/90 font-normal max-w-[480px]">
                Comfort can support the body. Stillness comes from the practice.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Right Glass Card with Logo Icon (Default static without entrance delay) */}
        <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 md:bottom-14 md:right-16 lg:bottom-16 lg:right-20 z-20 select-none pointer-events-auto">
          {/* Pure Colorless Frosted Glass Card - Square Dimension, No Border, No Shadows */}
          <div
            className="w-[52px] h-[52px] min-[400px]:w-[58px] min-[400px]:h-[58px] sm:w-[74px] sm:h-[74px] md:w-[88px] md:h-[88px] lg:w-[96px] lg:h-[96px] rounded-xl sm:rounded-2xl md:rounded-3xl flex items-center justify-center bg-white/[0.12] transition-transform duration-500 hover:-translate-y-1"
            style={{
              backdropFilter: "blur(32px) saturate(130%)",
              WebkitBackdropFilter: "blur(32px) saturate(130%)",
              transform: "translateZ(0)",
              WebkitTransform: "translateZ(0)",
              willChange: "transform, backdrop-filter",
            }}
          >
            <div className="relative w-8 h-4 min-[400px]:w-9 min-[400px]:h-5 sm:w-12 sm:h-6 md:w-15 md:h-7 lg:w-16 lg:h-8 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Divine Lotus Logo"
                fill
                priority
                unoptimized
                quality={100}
                sizes="(max-width: 640px) 40px, (max-width: 768px) 60px, 64px"
                className="object-contain"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.src.includes("lotus_logo.jpeg")) {
                    target.src = "/lotus_logo.jpeg";
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

