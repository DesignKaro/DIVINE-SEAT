"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import AnimatedReveal from "@/components/ui/AnimatedReveal";

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

  // Cached state refs to eliminate redundant setState and layout thrashing
  const closeUpRef = useRef(false);
  const wideRef = useRef(false);
  const practiceRef = useRef(false);
  const beginningRef = useRef(false);
  const dimsRef = useRef({ cssWidth: 0, cssHeight: 0, bufW: 0, bufH: 0, dpr: 1 });

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Layout metrics cache to eliminate layout thrashing during scroll
  const layoutMetricsRef = useRef({
    sectionHeight: 0,
    stickyHeight: 0,
    isMobile: false,
    topOffset: 0,
    scrollable: 0,
    isOffscreen: true,
  });

  // Draw a specific frame index (0-based) using cached dimensions with nearest loaded fallback
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Resolve nearest loaded frame if current frame is still streaming
    let targetIndex = index;
    const currentImg = imagesRef.current[targetIndex];
    if (!currentImg || !currentImg.complete || !currentImg.naturalWidth) {
      let found = false;
      for (let offset = 1; offset <= 4; offset++) {
        const prev = targetIndex - offset;
        if (prev >= 0 && imagesRef.current[prev]?.complete && imagesRef.current[prev]?.naturalWidth) {
          targetIndex = prev;
          found = true;
          break;
        }
        const next = targetIndex + offset;
        if (next < TOTAL_FRAMES && imagesRef.current[next]?.complete && imagesRef.current[next]?.naturalWidth) {
          targetIndex = next;
          found = true;
          break;
        }
      }
      if (!found && (!currentImg || !currentImg.complete || !currentImg.naturalWidth)) return;
    }

    const img = imagesRef.current[targetIndex];
    if (!img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let { cssWidth, cssHeight, bufW, bufH, dpr } = dimsRef.current;
    if (cssWidth === 0 || cssHeight === 0) {
      dpr = window.devicePixelRatio || 1;
      cssWidth = canvas.clientWidth || window.innerWidth;
      cssHeight = canvas.clientHeight || window.innerHeight;
      bufW = Math.round(cssWidth * dpr);
      bufH = Math.round(cssHeight * dpr);
      dimsRef.current = { cssWidth, cssHeight, bufW, bufH, dpr };
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

  // Preload frames progressively with adaptive mobile stepping and idle streaming
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    // 1. Critical: Load frame 0 immediately for initial canvas paint
    const initialImg = new window.Image();
    initialImg.src = FRAME_PATH(0);
    initialImg.onload = () => {
      if (canvasRef.current) {
        drawFrame(0);
      }
    };
    images[0] = initialImg;

    // Adaptive step: On mobile screens (<768px), download every 2nd frame (saving ~7MB network data)
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const step = isMobile ? 2 : 1;

    let hasStartedFullPreload = false;
    const startPreload = () => {
      if (hasStartedFullPreload) return;
      hasStartedFullPreload = true;

      // 2. Critical Wave: Load initial 20 frames (or 10 on mobile)
      const priorityCount = Math.min(isMobile ? 24 : 25, TOTAL_FRAMES);
      for (let i = step; i < priorityCount; i += step) {
        const img = new window.Image();
        img.src = FRAME_PATH(i);
        images[i] = img;
      }

      // 3. Background Wave: Stream remaining frames in gentle chunks on idle (avoids network queue congestion)
      let nextBatchStart = priorityCount;
      const CHUNK_SIZE = isMobile ? 12 : 16;
      const loadNextBatch = () => {
        if (nextBatchStart >= TOTAL_FRAMES) return;
        const end = Math.min(nextBatchStart + CHUNK_SIZE * step, TOTAL_FRAMES);
        for (let i = nextBatchStart; i < end; i += step) {
          if (!images[i]) {
            const img = new window.Image();
            img.src = FRAME_PATH(i);
            images[i] = img;
          }
        }
        nextBatchStart = end;
        if (nextBatchStart < TOTAL_FRAMES) {
          if (typeof window !== "undefined" && "requestIdleCallback" in window) {
            window.requestIdleCallback(loadNextBatch, { timeout: 800 });
          } else {
            setTimeout(loadNextBatch, 80);
          }
        }
      };

      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        window.requestIdleCallback(loadNextBatch, { timeout: 1000 });
      } else {
        setTimeout(loadNextBatch, 150);
      }
    };

    // Use IntersectionObserver to start streaming when within 800px of section
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startPreload();
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    } else {
      startPreload();
    }

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Update layout metrics on resize or mount to avoid layout thrashing in onScroll
  const updateLayoutMetrics = () => {
    const section = sectionRef.current;
    if (!section) return;
    const isMobile = window.innerWidth < 640;
    const sectionHeight = section.offsetHeight;
    const stickyHeight = canvasRef.current?.clientHeight || window.innerHeight;
    const topOffset = isMobile ? Math.max(0, (window.innerHeight - stickyHeight) / 2) : 0;
    const scrollable = sectionHeight - stickyHeight;
    layoutMetricsRef.current = {
      sectionHeight,
      stickyHeight,
      isMobile,
      topOffset,
      scrollable,
      isOffscreen: false,
    };
  };

  // Scroll-driven frame scrubbing & title/cards visibility (RAF throttled & layout cached)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    updateLayoutMetrics();

    let ticking = false;

    const handleScrollUpdate = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Early exit if completely offscreen (above or below viewport with generous margin)
      if (rect.bottom < -100 || rect.top > vh + 100) {
        return;
      }

      const { scrollable, topOffset } = layoutMetricsRef.current;

      // Progress: 0 when sticky container top hits topOffset → 1 when section bottom leaves
      const scrolled = Math.max(0, topOffset - rect.top);
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
      if (shouldShowCloseUp !== closeUpRef.current) {
        closeUpRef.current = shouldShowCloseUp;
        setIsCloseUpShot(shouldShowCloseUp);
      }

      // Discrete trigger for Scene 3 Wide Seat Cards: frame 58 to frame 90 (hides after frame 90)
      const shouldShowWide = frameIndex >= 58 && frameIndex <= 90;
      if (shouldShowWide !== wideRef.current) {
        wideRef.current = shouldShowWide;
        setIsWideShot(shouldShowWide);
      }

      // Discrete trigger for Scene 4 Practice Cards: frame 141 to frame 172
      const shouldShowPractice = frameIndex >= 141 && frameIndex <= 172;
      if (shouldShowPractice !== practiceRef.current) {
        practiceRef.current = shouldShowPractice;
        setIsPracticeShot(shouldShowPractice);
      }

      // Discrete trigger for Scene 5 Single Center Card: after frame 173 (frame 173 to 198)
      const shouldShowBeginning = frameIndex >= 173 && frameIndex <= 198;
      if (shouldShowBeginning !== beginningRef.current) {
        beginningRef.current = shouldShowBeginning;
        setIsBeginningShot(shouldShowBeginning);
      }

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScrollUpdate();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScrollUpdate(); // init paint
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Resize: cache canvas buffer dimensions and layout metrics so DPR recalc triggers, then redraw without layout thrashing
  useEffect(() => {
    const onResize = () => {
      updateLayoutMetrics();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const cssWidth = canvas.clientWidth || window.innerWidth;
      const cssHeight = canvas.clientHeight || window.innerHeight;
      const bufW = Math.round(cssWidth * dpr);
      const bufH = Math.round(cssHeight * dpr);
      dimsRef.current = { cssWidth, cssHeight, bufW, bufH, dpr };
      canvas.width = bufW;
      canvas.height = bufH;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      drawFrame(currentFrameRef.current);
    };

    onResize(); // calculate on mount
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
      {/* Sticky inner  - stays pinned while user scrolls (vertically centered at 20vh on phone view, top-0 on desktop) */}
      <div className="sticky top-[20vh] sm:top-0 w-full h-[60vh] sm:h-screen overflow-hidden">
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
            <AnimatedReveal delay={0.03} y={12}>
              <p className="font-sans text-[10px] sm:text-[12px] md:text-[12.5px] font-bold tracking-[0.18em] uppercase text-white/70 mb-2 sm:mb-3">
                /FEATURES
              </p>
            </AnimatedReveal>
            <AnimatedHeading
              text="A closer look at the real thing"
              as="h2"
              className="font-display font-semibold text-[26px] sm:text-[44px] md:text-[54px] lg:text-[64px] leading-[1.08] tracking-[-0.015em] text-white max-w-[90vw] sm:max-w-[820px] flex justify-center"
            />
          </div>
        </div>

        {/* Scene 2 Left Feature Card (Appears on close-up embroidery shot, frame 30-57) */}
        <div
          className={`absolute left-3 sm:left-8 lg:left-14 top-3 xs:top-4 sm:top-1/2 sm:-translate-y-1/2 z-20 select-none transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isCloseUpShot
              ? "translate-x-0 pointer-events-auto"
              : "-translate-x-[calc(100%+80px)] pointer-events-none"
          }`}
        >
          <div className="relative w-[210px] min-[380px]:w-[240px] sm:w-[310px] md:w-[350px] lg:w-[380px] rounded-2xl sm:rounded-3xl p-3.5 xs:p-4 sm:p-5 md:p-6 transition-transform duration-500 hover:-translate-y-1">
            {/* Always-Active Frosted Glass Background Layer - 0ms Blur Delay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl z-10"
              style={{
                backdropFilter: "blur(32px) saturate(130%)",
                WebkitBackdropFilter: "blur(32px) saturate(130%)",
                transform: "translateZ(0)",
                WebkitTransform: "translateZ(0)",
                willChange: "transform, backdrop-filter",
                background: "rgba(255, 255, 255, 0.14)",
              }}
            />

            {/* Pointer line extending from behind the top-right corner to embroidery detail */}
            <div
              className={`hidden sm:block absolute top-0 -right-[85px] md:-right-[105px] lg:-right-[125px] w-[85px] md:w-[105px] lg:w-[125px] h-[55px] md:h-[68px] lg:h-[80px] -translate-y-full pointer-events-none z-0 transition-opacity ease-out ${
                isCloseUpShot ? "opacity-100 duration-500 delay-200" : "opacity-0 duration-200"
              }`}
            >
              <svg className="w-full h-full overflow-visible" viewBox="0 0 140 90" fill="none">
                <circle cx="136" cy="4" r="3.5" fill="#FFFFFF" />
                <circle cx="136" cy="4" r="7" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                <path
                  d="M -12 98 L 136 4"
                  stroke="rgba(255, 255, 255, 0.95)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
                />
              </svg>
            </div>

            <div className="relative z-20">
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
          className={`absolute right-3 sm:right-8 lg:right-14 bottom-3 xs:bottom-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-20 select-none transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isCloseUpShot
              ? "translate-x-0 pointer-events-auto"
              : "translate-x-[calc(100%+80px)] pointer-events-none"
          }`}
        >
          <div className="relative w-[210px] min-[380px]:w-[240px] sm:w-[310px] md:w-[350px] lg:w-[380px] rounded-2xl sm:rounded-3xl p-3.5 xs:p-4 sm:p-5 md:p-6 transition-transform duration-500 hover:-translate-y-1">
            {/* Always-Active Frosted Glass Background Layer - 0ms Blur Delay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl z-10"
              style={{
                backdropFilter: "blur(32px) saturate(130%)",
                WebkitBackdropFilter: "blur(32px) saturate(130%)",
                transform: "translateZ(0)",
                WebkitTransform: "translateZ(0)",
                willChange: "transform, backdrop-filter",
                background: "rgba(255, 255, 255, 0.14)",
              }}
            />

            {/* Pointer line extending from behind the bottom-left corner to seam detail */}
            <div
              className={`hidden sm:block absolute bottom-0 -left-[85px] md:-left-[105px] lg:-left-[125px] w-[85px] md:w-[105px] lg:w-[125px] h-[55px] md:h-[68px] lg:h-[80px] translate-y-full pointer-events-none z-0 transition-opacity ease-out ${
                isCloseUpShot ? "opacity-100 duration-500 delay-200" : "opacity-0 duration-200"
              }`}
            >
              <svg className="w-full h-full overflow-visible" viewBox="0 0 140 90" fill="none">
                <circle cx="4" cy="86" r="3.5" fill="#FFFFFF" />
                <circle cx="4" cy="86" r="7" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                <path
                  d="M 152 -8 L 4 86"
                  stroke="rgba(255, 255, 255, 0.95)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
                />
              </svg>
            </div>

            <div className="relative z-20">
              <h3 className="font-display font-bold text-white text-[16px] min-[400px]:text-[17px] sm:text-[20px] md:text-[22px] lg:text-[24px] tracking-[0.015em] leading-tight mb-1 sm:mb-2">
                Removable. Washable. Replaceable.
              </h3>
              <p className="font-sans text-[12px] min-[400px]:text-[12.5px] sm:text-[13.5px] md:text-[14px] lg:text-[14.5px] leading-[1.5] sm:leading-[1.6] tracking-[0.01em] text-white/90 font-normal">
                A zippered cover made to come off easily  - so it can be washed, refreshed or changed whenever needed.
              </p>
            </div>
          </div>
        </div>

        {/* Scene 3 Left Feature Card (Appears on wide seat shot, frame 58-90) */}
        <div
          className={`absolute left-3 sm:left-8 lg:left-14 top-3 xs:top-4 sm:top-1/2 sm:-translate-y-1/2 z-20 select-none transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isWideShot
              ? "translate-x-0 pointer-events-auto"
              : "-translate-x-[calc(100%+80px)] pointer-events-none"
          }`}
        >
          <div className="relative w-[210px] min-[380px]:w-[240px] sm:w-[310px] md:w-[350px] lg:w-[380px] rounded-2xl sm:rounded-3xl p-3.5 xs:p-4 sm:p-5 md:p-6 transition-transform duration-500 hover:-translate-y-1">
            {/* Always-Active Frosted Glass Background Layer - 0ms Blur Delay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl z-10"
              style={{
                backdropFilter: "blur(32px) saturate(130%)",
                WebkitBackdropFilter: "blur(32px) saturate(130%)",
                transform: "translateZ(0)",
                WebkitTransform: "translateZ(0)",
                willChange: "transform, backdrop-filter",
                background: "rgba(255, 255, 255, 0.14)",
              }}
            />

            {/* Pointer line extending from behind the right edge to latex cushion groove */}
            <div
              className={`hidden sm:block absolute top-1/2 -translate-y-1/2 -right-[95px] md:-right-[120px] lg:-right-[150px] w-[95px] md:w-[120px] lg:w-[150px] h-[45px] md:h-[55px] lg:h-[70px] pointer-events-none z-0 transition-opacity ease-out ${
                isWideShot ? "opacity-100 duration-500 delay-200" : "opacity-0 duration-200"
              }`}
            >
              <svg className="w-full h-full overflow-visible" viewBox="0 0 140 65" fill="none">
                <circle cx="136" cy="60" r="3.5" fill="#FFFFFF" />
                <circle cx="136" cy="60" r="7" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                <path
                  d="M -10 -4 L 136 60"
                  stroke="rgba(255, 255, 255, 0.95)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
                />
              </svg>
            </div>

            <div className="relative z-20">
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
          className={`absolute right-3 sm:right-8 lg:right-14 bottom-3 xs:bottom-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-20 select-none transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isWideShot
              ? "translate-x-0 pointer-events-auto"
              : "translate-x-[calc(100%+80px)] pointer-events-none"
          }`}
        >
          <div className="relative w-[210px] min-[380px]:w-[240px] sm:w-[310px] md:w-[350px] lg:w-[380px] rounded-2xl sm:rounded-3xl p-3.5 xs:p-4 sm:p-5 md:p-6 transition-transform duration-500 hover:-translate-y-1">
            {/* Always-Active Frosted Glass Background Layer - 0ms Blur Delay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl z-10"
              style={{
                backdropFilter: "blur(32px) saturate(130%)",
                WebkitBackdropFilter: "blur(32px) saturate(130%)",
                transform: "translateZ(0)",
                WebkitTransform: "translateZ(0)",
                willChange: "transform, backdrop-filter",
                background: "rgba(255, 255, 255, 0.14)",
              }}
            />

            {/* Pointer line extending from behind the bottom-left corner down to inclined cork base */}
            <div
              className={`hidden sm:block absolute bottom-0 -left-[40px] md:-left-[50px] lg:-left-[60px] w-[40px] md:w-[50px] lg:w-[60px] h-[105px] md:h-[135px] lg:h-[165px] translate-y-full pointer-events-none z-0 transition-opacity ease-out ${
                isWideShot ? "opacity-100 duration-500 delay-200" : "opacity-0 duration-200"
              }`}
            >
              <svg className="w-full h-full overflow-visible" viewBox="0 0 60 160" fill="none">
                <circle cx="6" cy="154" r="3.5" fill="#FFFFFF" />
                <circle cx="6" cy="154" r="7" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                <path
                  d="M 68 -10 L 6 154"
                  stroke="rgba(255, 255, 255, 0.95)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
                />
              </svg>
            </div>

            <div className="relative z-20">
              <h3 className="font-display font-bold text-white text-[16px] min-[400px]:text-[17px] sm:text-[20px] md:text-[22px] lg:text-[24px] tracking-[0.015em] leading-tight mb-1 sm:mb-2">
                Inclined Cork Base
              </h3>
              <p className="font-sans text-[12px] min-[400px]:text-[12.5px] sm:text-[13.5px] md:text-[14px] lg:text-[14.5px] leading-[1.5] sm:leading-[1.6] tracking-[0.01em] text-white/90 font-normal">
                Gently elevates the pelvis, helping create a more balanced foundation for a naturally upright posture.
              </p>
            </div>
          </div>
        </div>

        {/* Scene 4 Left Feature Card (Appears after frame 141, frame 141-172) */}
        <div
          className={`absolute left-3 sm:left-8 lg:left-14 top-3 xs:top-4 sm:top-1/2 sm:-translate-y-1/2 z-20 select-none transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isPracticeShot
              ? "translate-x-0 pointer-events-auto"
              : "-translate-x-[calc(100%+80px)] pointer-events-none"
          }`}
        >
          <div className="relative w-[210px] min-[380px]:w-[240px] sm:w-[310px] md:w-[350px] lg:w-[380px] rounded-2xl sm:rounded-3xl p-3.5 xs:p-4 sm:p-5 md:p-6 transition-transform duration-500 hover:-translate-y-1">
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

        {/* Scene 4 Right Feature Card (Appears after frame 141, frame 141-172) */}
        <div
          className={`absolute right-3 sm:right-8 lg:right-14 bottom-3 xs:bottom-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-20 select-none transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isPracticeShot
              ? "translate-x-0 pointer-events-auto"
              : "translate-x-[calc(100%+80px)] pointer-events-none"
          }`}
        >
          <div className="relative w-[210px] min-[380px]:w-[240px] sm:w-[310px] md:w-[350px] lg:w-[380px] rounded-2xl sm:rounded-3xl p-3.5 xs:p-4 sm:p-5 md:p-6 transition-transform duration-500 hover:-translate-y-1">
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
          <div className="relative w-[calc(100vw-36px)] max-w-[340px] sm:max-w-none sm:w-[480px] md:w-[560px] lg:w-[600px] rounded-2xl sm:rounded-3xl p-4 xs:p-5 sm:p-8 md:p-9 transition-transform duration-500 hover:-translate-y-1">
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

        {/* Bottom Right Glass Card with Logo Icon (Hidden on phone view, visible on sm and up) */}
        <div className="hidden sm:block absolute sm:bottom-[50px] sm:right-10 md:bottom-[66px] md:right-16 lg:bottom-[74px] lg:right-20 z-20 select-none pointer-events-auto">
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
                src="/logo.avif"
                alt="Divine Lotus Logo"
                fill
                priority
                unoptimized
                quality={100}
                sizes="(max-width: 640px) 40px, (max-width: 768px) 60px, 64px"
                className="object-contain"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.src.includes("lotus_logo.avif")) {
                    target.src = "/lotus_logo.avif";
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

