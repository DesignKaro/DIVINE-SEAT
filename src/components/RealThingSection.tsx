"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const TOTAL_FRAMES = 240;
const FRAME_PATH = (n: number) =>
  `/images/frames/frame_${String(n).padStart(6, "0")}.jpg`;

export default function RealThingSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isWideShot, setIsWideShot] = useState(false);
  const [isSeamShot, setIsSeamShot] = useState(false);
  const [isPedestalShot, setIsPedestalShot] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loaded++;
        // Draw first frame once it's ready
        if (i === 0 && canvasRef.current) {
          drawFrame(0);
        }
      };
      images.push(img);
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

    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
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

      // Title & label: Stays fully visible through the embroidered lotus close-up (frames 0 to ~45),
      // then smoothly fades out as the wide view of the seat comes onto screen (frame 45 to 60, progress 0.18 -> 0.25).
      // Once the wide seat is in view (progress >= 0.25), it stays completely hidden for all remaining frames.
      if (titleRef.current) {
        if (progress <= 0.18) {
          titleRef.current.style.opacity = "1";
          titleRef.current.style.transform = "translate3d(0, 0, 0)";
          titleRef.current.style.visibility = "visible";
        } else if (progress < 0.25) {
          const t = (progress - 0.18) / (0.25 - 0.18);
          const opacity = Math.max(0, 1 - t);
          titleRef.current.style.opacity = String(opacity);
          titleRef.current.style.transform = `translate3d(0, ${-t * 24}px, 0)`;
          titleRef.current.style.visibility = opacity === 0 ? "hidden" : "visible";
        } else {
          titleRef.current.style.opacity = "0";
          titleRef.current.style.transform = "translate3d(0, -24px, 0)";
          titleRef.current.style.visibility = "hidden";
        }
      }

      // Discrete trigger for Left & Right cards (wide seat shot: frame 55-115, progress 0.21 - 0.49)
      const shouldShowWide = progress >= 0.21 && progress <= 0.49;
      setIsWideShot((prev) => (prev !== shouldShowWide ? shouldShowWide : prev));

      // Discrete trigger for Center Card (close-up seam shot: frame 120-175, progress 0.51 - 0.73)
      const shouldShowSeam = progress >= 0.51 && progress <= 0.73;
      setIsSeamShot((prev) => (prev !== shouldShowSeam ? shouldShowSeam : prev));

      // Discrete trigger for Scene 4 Left & Right cards (pedestal shot: frame 178-240, progress 0.75 - 1.00)
      const shouldShowPedestal = progress >= 0.75 && progress <= 1.0;
      setIsPedestalShot((prev) => (prev !== shouldShowPedestal ? shouldShowPedestal : prev));

      const frameIndex = Math.min(
        Math.floor(progress * TOTAL_FRAMES),
        TOTAL_FRAMES - 1
      );

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
      className="relative"
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

        {/* Scene 2 Left Feature Card (Appears on wide seat shot) */}
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
              <span className="block font-sans text-[10.5px] sm:text-[11.5px] md:text-[12px] font-bold tracking-normal uppercase text-white/80 mb-1 sm:mb-1.5">
                /CUSHION CORE
              </span>
              <h3 className="font-display font-bold text-white text-[16px] min-[400px]:text-[17px] sm:text-[20px] md:text-[22px] lg:text-[24px] tracking-[0.015em] leading-tight mb-1 sm:mb-2">
                Ergonomic Latex Core
              </h3>
              <p className="font-sans text-[12px] min-[400px]:text-[12.5px] sm:text-[13.5px] md:text-[14px] lg:text-[14.5px] leading-[1.5] sm:leading-[1.6] tracking-[0.01em] text-white/90 font-normal">
                Responsive botanical latex dissipates sit-bone pressure while maintaining upright pelvic balance.
              </p>
            </div>
          </div>
        </div>

        {/* Scene 2 Right Feature Card (Appears on wide seat shot) */}
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
              <span className="block font-sans text-[10.5px] sm:text-[11.5px] md:text-[12px] font-bold tracking-normal uppercase text-white/80 mb-1 sm:mb-1.5">
                /FOUNDATION
              </span>
              <h3 className="font-display font-bold text-white text-[16px] min-[400px]:text-[17px] sm:text-[20px] md:text-[22px] lg:text-[24px] tracking-[0.015em] leading-tight mb-1 sm:mb-2">
                8.5° Portuguese Cork Base
              </h3>
              <p className="font-sans text-[12px] min-[400px]:text-[12.5px] sm:text-[13.5px] md:text-[14px] lg:text-[14.5px] leading-[1.5] sm:leading-[1.6] tracking-[0.01em] text-white/90 font-normal">
                Calibrated forward tilt elevates hips above knees to align spine and relieve lumbar strain.
              </p>
            </div>
          </div>
        </div>

        {/* Scene 3 Center Feature Card (Appears on close-up seam shot, frame 120-175) */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 z-20 select-none transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isSeamShot
              ? "-translate-y-1/2 pointer-events-auto"
              : "-translate-y-[calc(100vh+120px)] pointer-events-none"
          }`}
        >
          <div className="relative w-[calc(100vw-36px)] max-w-[340px] sm:max-w-none sm:w-[460px] md:w-[540px] lg:w-[580px] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-9 transition-transform duration-500 hover:-translate-y-1">
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
              <span className="block font-sans text-[11px] sm:text-[12px] md:text-[12.5px] font-bold tracking-normal uppercase text-white/80 mb-1.5 sm:mb-2">
                /ARTISAN JOINERY
              </span>
              <h3 className="font-display font-bold text-white text-[18px] min-[400px]:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[30px] tracking-[0.015em] leading-tight mb-1.5 sm:mb-3">
                Precision Stitching & Dual-Textile Joinery
              </h3>
              <p className="font-sans text-[12.5px] min-[400px]:text-[13.5px] sm:text-[14.5px] md:text-[15.5px] lg:text-[16px] leading-[1.5] sm:leading-[1.6] tracking-[0.01em] text-white/90 font-normal max-w-[460px]">
                Hand-tailored seam integrating breathable raw organic linen with supple micro-velvet upholstery for enduring, friction-free tactile comfort.
              </p>
            </div>
          </div>
        </div>

        {/* Scene 4 Left Feature Card (Appears on pedestal architectural shot, frame 178-240) */}
        <div
          className={`absolute left-3 sm:left-8 lg:left-14 top-14 sm:top-1/2 sm:-translate-y-1/2 z-20 select-none transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isPedestalShot
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
              <span className="block font-sans text-[10.5px] sm:text-[11.5px] md:text-[12px] font-bold tracking-normal uppercase text-white/80 mb-1 sm:mb-1.5">
                /SUSTAINABLE MATERIALS
              </span>
              <h3 className="font-display font-bold text-white text-[16px] min-[400px]:text-[17px] sm:text-[20px] md:text-[22px] lg:text-[24px] tracking-[0.015em] leading-tight mb-1 sm:mb-2">
                100% Biodegradable & FSC-Certified
              </h3>
              <p className="font-sans text-[12px] min-[400px]:text-[12.5px] sm:text-[13.5px] md:text-[14px] lg:text-[14.5px] leading-[1.5] sm:leading-[1.6] tracking-[0.01em] text-white/90 font-normal">
                Harvested from renewable Mediterranean cork and natural rubber tree sap with zero synthetic foams.
              </p>
            </div>
          </div>
        </div>

        {/* Scene 4 Right Feature Card (Appears on pedestal architectural shot, frame 178-240) */}
        <div
          className={`absolute right-3 sm:right-8 lg:right-14 bottom-16 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-20 select-none transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isPedestalShot
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
              <span className="block font-sans text-[10.5px] sm:text-[11.5px] md:text-[12px] font-bold tracking-normal uppercase text-white/80 mb-1 sm:mb-1.5">
                /TIMELESS SANCTUARY
              </span>
              <h3 className="font-display font-bold text-white text-[16px] min-[400px]:text-[17px] sm:text-[20px] md:text-[22px] lg:text-[24px] tracking-[0.015em] leading-tight mb-1 sm:mb-2">
                Mindful Living Sanctuary
              </h3>
              <p className="font-sans text-[12px] min-[400px]:text-[12.5px] sm:text-[13.5px] md:text-[14px] lg:text-[14.5px] leading-[1.5] sm:leading-[1.6] tracking-[0.01em] text-white/90 font-normal">
                Architectural silhouette crafted to elevate your daily meditation ritual and blend harmoniously into any living space.
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

