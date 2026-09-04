"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowDown, Box, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.15 });

  // Guarantee iOS Safari / Mobile WebKit autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Direct DOM property enforcement required by iOS WebKit
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise
          .then(() => setImageLoaded(true))
          .catch(() => {
            // If iOS Low Power Mode restricts autoplay, resume on first user touch or swipe
            const unlockPlay = () => {
              video.play().catch(() => {});
              window.removeEventListener("touchstart", unlockPlay);
              window.removeEventListener("touchend", unlockPlay);
              window.removeEventListener("scroll", unlockPlay);
            };
            window.addEventListener("touchstart", unlockPlay, { once: true, passive: true });
            window.addEventListener("touchend", unlockPlay, { once: true, passive: true });
            window.addEventListener("scroll", unlockPlay, { once: true, passive: true });
          });
      }
    };

    playVideo();
  }, []);

  const textLines = [
    ["Sit", "better."],
    ["Meditate", "longer."],
  ];

  // Parent container orchestrating the typography sequence
  const titleContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.025,
        delayChildren: 0.15,
      },
    },
  };

  // Masked slide-up variant for title characters (Hardware-accelerated)
  const letterVariants: Variants = {
    hidden: {
      y: "115%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // Product Seat smooth slide-up variant (Hardware-accelerated)
  const productVariants: Variants = {
    hidden: {
      y: 50,
      opacity: 0,
      scale: 0.98,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.95,
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[580px] sm:min-h-[650px] flex items-center justify-center overflow-hidden bg-[#241a12]"
      data-header-theme="dark"
    >
      
      {/* 1. Background Video Layer (Autoplaying, seamless loop with poster fallback) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/hero_bg_poster.avif"
            // @ts-ignore
            webkit-playsinline="true"
            x5-playsinline="true"
            className="w-full h-full object-cover object-center pointer-events-none"
            onLoadedData={() => setImageLoaded(true)}
          >
            {/* High-efficiency modern WebM first (saves ~700KB), with MP4 fallback for legacy WebKit */}
            <source src="/videos/hero_bg_video.webm" type="video/webm" />
            <source src="/videos/hero_bg_video.mp4" type="video/mp4" />
          </video>

        {/* Ambient Darkening & Contrast Scrim Overlay (Softened) */}
        <div className="absolute inset-0 bg-black/18 pointer-events-none" />
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(26,16,8,0.08) 45%, rgba(0,0,0,0.25) 100%)",
          }}
        />
      </div>

      {/* 2. Middle Layer: Display Typography (z-10) */}
      <div className="absolute inset-x-0 bottom-[18%] sm:bottom-[30%] md:bottom-[36%] lg:bottom-[37.5%] z-10 flex flex-col items-center justify-end px-4 sm:px-6 select-none pointer-events-none -translate-y-0 sm:-translate-y-[55px]">
        
        <div className="flex flex-col items-start max-w-[92vw]">
          <motion.h1
            variants={titleContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-display font-semibold tracking-[0.035em] text-[clamp(34px,7.5vw,96px)] leading-[1.02] text-white drop-shadow-[0_6px_35px_rgba(0,0,0,0.4)] flex flex-col items-start"
          >
            {/* Row 1: THE LOTUS SEAT */}
            <div className="flex items-center gap-[0.24em] sm:gap-[0.28em] flex-wrap">
              {["THE", "LOTUS", "SEAT"].map((word, wordIndex) => (
                <span key={wordIndex} className="inline-flex overflow-hidden pt-1 pb-4 sm:pt-2 sm:pb-6 -mt-1 -mb-4 sm:-mt-2 sm:-mb-6">
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      variants={letterVariants}
                      className="inline-block will-change-transform"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </div>
          </motion.h1>

          {/* Subtitle / Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2.5 sm:mt-4 max-w-[620px]"
          >
            <p className="font-sans text-[14.5px] sm:text-[19px] md:text-[22px] lg:text-[24px] text-white/95 leading-[1.35] sm:leading-[1.4] font-medium drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)]">
              Where ancient wisdom meets modern comfort.
            </p>
          </motion.div>

          {/* Editorial Affirmations & Exploration Link */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 sm:mt-5 font-sans"
          >
            <p className="text-[12.5px] sm:text-[15.5px] md:text-[16.5px] text-white/85 font-medium leading-tight drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]">
              Sit with ease. Stay with the practice.
            </p>
            {/* Explore the Seat Fused Pill Button (Exact About Section Signature Style) */}
            <div className="pt-2.5 sm:pt-4">
              <a
                href="#the-seat"
                className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer pointer-events-auto"
              >
                {/* SVG Fused Pill + Circle Background */}
                <svg
                  className="w-[220px] sm:w-[236px] h-[44px] sm:h-[46px]"
                  viewBox="0 0 236 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="btn-hero-about-fill" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="50%" stopColor="#F9F7F4" />
                      <stop offset="100%" stopColor="#FFFFFF" />
                    </linearGradient>
                    <linearGradient id="btn-hero-about-border" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="rgba(64, 46, 29, 0.25)" />
                      <stop offset="50%" stopColor="rgba(216, 204, 189, 0.8)" />
                      <stop offset="100%" stopColor="rgba(64, 46, 29, 0.2)" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M 23 0 L 173 0 C 180 0 185 7 190 7 C 195 7 200 0 213 0 A 23 23 0 1 1 213 46 C 200 46 195 39 190 39 C 185 39 180 46 173 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                    fill="url(#btn-hero-about-fill)"
                    stroke="url(#btn-hero-about-border)"
                    strokeWidth="1.4"
                  />
                </svg>

                {/* Button Text */}
                <div className="absolute left-0 top-0 bottom-0 w-[176px] sm:w-[188px] flex items-center justify-center pointer-events-none">
                  <span className="font-sans text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.04em] uppercase text-[#1E140D] whitespace-nowrap">
                    Explore the Seat
                  </span>
                </div>

                {/* Button Right Bronze Circle with Arrow */}
                <div className="absolute right-[4px] top-[4px] w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#876540] flex items-center justify-center group-hover:bg-[#6D5133] transition-colors duration-300">
                  <ArrowDown className="w-[16px] h-[16px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-y-0.5" />
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. Bottom Right Glass Card with Logo Icon (Hidden on phone view, visible on sm and up) */}
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

      {/* 4. Mobile Bottom Action Buttons: 3D Experience (Left) & Wisdom of Sitting (Right) - Phone View Only */}
      <div className="sm:hidden absolute bottom-4 xs:bottom-5 inset-x-0 z-20 flex items-center justify-between px-3.5 xs:px-4.5 pointer-events-auto select-none max-w-[440px] mx-auto">
        {/* Left: 3D Experience Button */}
        <Link
          href="/#real-thing"
          onClick={(e) => {
            const target = document.getElementById("real-thing");
            if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: "smooth", block: "start" });
              window.history.pushState(null, "", "/#real-thing");
            }
          }}
          className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] cursor-pointer"
          aria-label="3D Experience"
        >
          <svg
            className="w-[124px] h-[34px] transition-all duration-300"
            viewBox="0 0 176 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="clip-hero-exp-mob">
                <path d="M 19 0 L 125 0 C 130.5 0 134.5 5.5 138.5 5.5 C 142.5 5.5 146.5 0 157 0 A 19 19 0 1 1 157 38 C 146.5 38 142.5 32.5 138.5 32.5 C 134.5 32.5 130.5 38 125 38 L 19 38 A 19 19 0 0 1 19 0 Z" />
              </clipPath>

              <linearGradient id="hero-btn-dark-fill-exp" x1="0" y1="0" x2="176" y2="38" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#876540" />
                <stop offset="50%" stopColor="#967355" />
                <stop offset="100%" stopColor="#876540" />
              </linearGradient>
              <linearGradient id="hero-btn-dark-border-exp" x1="0" y1="0" x2="176" y2="38" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                <stop offset="50%" stopColor="rgba(216, 204, 189, 0.55)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.35)" />
              </linearGradient>
            </defs>

            <g clipPath="url(#clip-hero-exp-mob)">
              <foreignObject x="0" y="0" width="176" height="38" className="w-full h-full">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backdropFilter: "blur(24px) saturate(140%) brightness(1.04)",
                    WebkitBackdropFilter: "blur(24px) saturate(140%) brightness(1.04)",
                  }}
                />
              </foreignObject>
            </g>

            <path
              d="M 19 0 L 125 0 C 130.5 0 134.5 5.5 138.5 5.5 C 142.5 5.5 146.5 0 157 0 A 19 19 0 1 1 157 38 C 146.5 38 142.5 32.5 138.5 32.5 C 134.5 32.5 130.5 38 125 38 L 19 38 A 19 19 0 0 1 19 0 Z"
              fill="url(#hero-btn-dark-fill-exp)"
              stroke="url(#hero-btn-dark-border-exp)"
              strokeWidth="1.2"
              className="transition-all duration-300"
            />
          </svg>

          {/* Text */}
          <div className="absolute left-0 top-0 bottom-0 w-[94px] flex items-center justify-center pointer-events-none pl-1">
            <span className="font-sans text-[11px] font-semibold text-white transition-colors duration-300">
              3D Experience
            </span>
          </div>

          {/* Box Icon */}
          <div className="absolute right-0 top-0 bottom-0 w-[30px] flex items-center justify-center pointer-events-none pr-0.5">
            <Box className="w-[13px] h-[13px] stroke-[2.2] text-white transition-colors duration-300 group-hover:rotate-12 group-hover:scale-110" />
          </div>
        </Link>

        {/* Right: Wisdom of Sitting Button */}
        <Link
          href="/#ancient-wisdom"
          onClick={(e) => {
            const target = document.getElementById("ancient-wisdom");
            if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: "smooth" });
              window.history.pushState(null, "", "/#ancient-wisdom");
            }
          }}
          className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] cursor-pointer"
          aria-label="Wisdom of Sitting"
        >
          <svg
            className="w-[136px] h-[34px] transition-all duration-300"
            viewBox="0 0 192 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="clip-hero-wisdom-mob">
                <path d="M 19 0 L 141 0 C 146.5 0 150.5 5.5 154.5 5.5 C 158.5 5.5 162.5 0 173 0 A 19 19 0 1 1 173 38 C 162.5 38 158.5 32.5 154.5 32.5 C 150.5 32.5 146.5 38 141 38 L 19 38 A 19 19 0 0 1 19 0 Z" />
              </clipPath>

              <linearGradient id="hero-btn-dark-fill-wisdom" x1="0" y1="0" x2="192" y2="38" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#876540" />
                <stop offset="50%" stopColor="#967355" />
                <stop offset="100%" stopColor="#876540" />
              </linearGradient>
              <linearGradient id="hero-btn-dark-border-wisdom" x1="0" y1="0" x2="192" y2="38" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                <stop offset="50%" stopColor="rgba(216, 204, 189, 0.55)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.35)" />
              </linearGradient>
            </defs>

            <g clipPath="url(#clip-hero-wisdom-mob)">
              <foreignObject x="0" y="0" width="192" height="38" className="w-full h-full">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backdropFilter: "blur(24px) saturate(140%) brightness(1.04)",
                    WebkitBackdropFilter: "blur(24px) saturate(140%) brightness(1.04)",
                  }}
                />
              </foreignObject>
            </g>

            <path
              d="M 19 0 L 141 0 C 146.5 0 150.5 5.5 154.5 5.5 C 158.5 5.5 162.5 0 173 0 A 19 19 0 1 1 173 38 C 162.5 38 158.5 32.5 154.5 32.5 C 150.5 32.5 146.5 38 141 38 L 19 38 A 19 19 0 0 1 19 0 Z"
              fill="url(#hero-btn-dark-fill-wisdom)"
              stroke="url(#hero-btn-dark-border-wisdom)"
              strokeWidth="1.2"
              className="transition-all duration-300"
            />
          </svg>

          {/* Text */}
          <div className="absolute left-0 top-0 bottom-0 w-[104px] flex items-center justify-center pointer-events-none pl-1">
            <span className="font-sans text-[11px] font-medium text-white transition-colors duration-300 whitespace-nowrap">
              Wisdom of Sitting
            </span>
          </div>

          {/* Arrow Icon */}
          <div className="absolute right-0 top-0 bottom-0 w-[30px] flex items-center justify-center pointer-events-none pr-0.5">
            <ArrowRight className="w-[13px] h-[13px] stroke-[2.4] text-white transition-colors duration-300 group-hover:translate-x-0.5 group-hover:scale-110" />
          </div>
        </Link>
      </div>

    </section>
  );
}
