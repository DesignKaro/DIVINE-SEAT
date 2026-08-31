"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Menu, X, ArrowUpRight, CheckCircle2, User, Mail, Phone, Box, ArrowRight } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", whatsapp: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const notifyRef = useRef<HTMLDivElement>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const notifyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMenuEnter = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setMenuOpen(true);
  };

  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setMenuOpen(false);
    }, 180);
  };

  const handleNotifyEnter = () => {
    if (notifyTimeoutRef.current) clearTimeout(notifyTimeoutRef.current);
    setNotifyOpen(true);
  };

  const handleNotifyLeave = () => {
    notifyTimeoutRef.current = setTimeout(() => {
      setNotifyOpen(false);
    }, 180);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect active section under header (approx y=60)
      const sections = document.querySelectorAll("[data-header-theme]");
      let currentTheme = "dark";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 70 && rect.bottom >= 70) {
          currentTheme = section.getAttribute("data-header-theme") || "dark";
        }
      });
      setIsDarkTheme(currentTheme === "dark");
      setIsHidden(currentTheme === "hidden");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (notifyRef.current && !notifyRef.current.contains(event.target as Node)) {
        setNotifyOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
      if (notifyTimeoutRef.current) clearTimeout(notifyTimeoutRef.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email && !formData.whatsapp) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setNotifyOpen(false);
      setFormData({ name: "", email: "", whatsapp: "" });
    }, 2800);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 py-3 sm:py-5 md:py-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}>
      {/* Dynamic Header Background Bar */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
          scrolled
            ? "bg-white/[0.08] backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            : "bg-transparent opacity-0"
        }`}
      />

      <div className="relative w-full max-w-[1400px] mx-auto px-3.5 sm:px-6 md:px-12 flex items-center justify-between">
        
        {/* LEFT: Menu Button + 3D Experience Button */}
        <div className="relative flex items-center gap-2 sm:gap-3 z-30">
          <div
            ref={menuRef}
            onMouseEnter={handleMenuEnter}
            onMouseLeave={handleMenuLeave}
            className="relative flex items-center justify-start"
          >
          <button
            onClick={() => {
              setMenuOpen(!menuOpen);
              if (notifyOpen) setNotifyOpen(false);
            }}
            className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] cursor-pointer"
            aria-label="Toggle Menu"
          >
            {/* Custom Organic SVG Fused Pill + Circle Background */}
            <svg
              className="w-[98px] sm:w-[122px] h-[34px] sm:h-[38px] transition-all duration-300"
              viewBox="0 0 120 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Vector ClipPath for Exact Interior Backdrop Blur */}
                <clipPath id="clip-btn-menu">
                  <path d="M 19 0 L 69 0 C 74.5 0 78.5 5.5 82.5 5.5 C 86.5 5.5 90.5 0 101 0 A 19 19 0 1 1 101 38 C 90.5 38 86.5 32.5 82.5 32.5 C 78.5 32.5 74.5 38 69 38 L 19 38 A 19 19 0 0 1 19 0 Z" />
                </clipPath>

                {/* Mineral Crystal Frosted Glass Fill (matching Hero Cards) */}
                <linearGradient id="btn-glass-fill-menu" x1="0" y1="0" x2="120" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.16)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 0.08)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.04)" />
                </linearGradient>
                <linearGradient id="btn-glass-border-menu" x1="0" y1="0" x2="120" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
                  <stop offset="35%" stopColor="rgba(255, 255, 255, 0.45)" />
                  <stop offset="70%" stopColor="rgba(216, 204, 189, 0.35)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.75)" />
                </linearGradient>
                <linearGradient id="btn-shine-overlay-menu" x1="0" y1="0" x2="120" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
                  <stop offset="35%" stopColor="rgba(255, 255, 255, 0.12)" />
                  <stop offset="70%" stopColor="rgba(255, 255, 255, 0)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
                </linearGradient>

                {/* Dark Theme Fill (for Light Sections like About) */}
                <linearGradient id="btn-dark-fill-menu" x1="0" y1="0" x2="120" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#876540" />
                  <stop offset="50%" stopColor="#967355" />
                  <stop offset="100%" stopColor="#876540" />
                </linearGradient>
                <linearGradient id="btn-dark-border-menu" x1="0" y1="0" x2="120" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.25)" />
                  <stop offset="50%" stopColor="rgba(216, 204, 189, 0.4)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
                </linearGradient>
                <linearGradient id="btn-dark-shine-menu" x1="0" y1="0" x2="120" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                  <stop offset="40%" stopColor="rgba(255, 255, 255, 0.05)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.15)" />
                </linearGradient>
              </defs>

              {/* Clipped Backdrop Blur (Strictly inside borders) */}
              <g clipPath="url(#clip-btn-menu)">
                <foreignObject x="0" y="0" width="120" height="38" className="w-full h-full">
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
                d="M 19 0 L 69 0 C 74.5 0 78.5 5.5 82.5 5.5 C 86.5 5.5 90.5 0 101 0 A 19 19 0 1 1 101 38 C 90.5 38 86.5 32.5 82.5 32.5 C 78.5 32.5 74.5 38 69 38 L 19 38 A 19 19 0 0 1 19 0 Z"
                fill={isDarkTheme ? "url(#btn-glass-fill-menu)" : "url(#btn-dark-fill-menu)"}
                stroke={isDarkTheme ? "url(#btn-glass-border-menu)" : "url(#btn-dark-border-menu)"}
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
            </svg>

            {/* Menu Text */}
            <div className="absolute left-0 top-0 bottom-0 w-[64px] sm:w-[84px] flex items-center justify-center pointer-events-none">
              <span className="font-sans text-[11.5px] sm:text-[13px] font-semibold text-white transition-colors duration-300">
                Menu
              </span>
            </div>

            {/* Menu / Close Icon */}
            <div className="absolute right-0 top-0 bottom-0 w-[32px] sm:w-[38px] flex items-center justify-center pointer-events-none">
              {menuOpen ? (
                <X className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] stroke-[2.2] text-white transition-colors duration-300" />
              ) : (
                <Menu className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] stroke-[2.2] text-white transition-colors duration-300 group-hover:scale-110" />
              )}
            </div>
          </button>

          {/* Exact Card Frosted Glass Menu Dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute left-0 top-[calc(100%+16px)] sm:top-[calc(100%+28px)] w-[calc(100vw-32px)] max-w-[285px] max-h-[min(82vh,600px)] overflow-y-auto p-2 sm:p-2.5 rounded-[22px] sm:rounded-[24px] z-50 transition-colors duration-300 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/25 [&::-webkit-scrollbar-track]:bg-transparent ${
                  isDarkTheme
                    ? "shadow-[0_24px_50px_rgba(0,0,0,0.25)]"
                    : "shadow-[0_24px_50px_rgba(135,101,64,0.35)]"
                }`}
                style={{
                  backdropFilter: "blur(28px) saturate(140%) brightness(1.04)",
                  WebkitBackdropFilter: "blur(28px) saturate(140%) brightness(1.04)",
                  transform: "translateZ(0)",
                  willChange: "transform, backdrop-filter",
                  background: isDarkTheme
                    ? "linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.04) 100%)"
                    : "linear-gradient(135deg, rgba(135, 101, 64, 0.96) 0%, rgba(115, 82, 50, 0.96) 100%)",
                }}
              >
                {/* Invisible hover bridge to maintain hover over gap */}
                <div className="absolute -top-[30px] left-0 right-0 h-[30px] pointer-events-auto" />

                {/* Polished Mineral Curved Specular Reflection Layer (Identical to Cards) */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-[22px] sm:rounded-[24px]"
                  style={{
                    background: isDarkTheme
                      ? "radial-gradient(120% 90% at 85% 10%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)"
                      : "radial-gradient(120% 90% at 85% 10%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.03) 40%, transparent 70%)",
                  }}
                />

                <div className="relative z-10 flex flex-col space-y-0.5 sm:space-y-1">
                  {[
                    { label: "The Seat", href: "/#the-seat" },
                    { label: "The Problem", href: "/#the-problem" },
                    { label: "The Solution", href: "/#the-solution" },
                    { label: "3D Experience", href: "/#real-thing" },
                    { label: "Choose Your Seat", href: "/#pricing" },
                    { label: "Materials", href: "/#materials" },
                    { label: "Meditation & Posture", href: "/#ancient-wisdom" },
                    { label: "The Difference", href: "/#comparison" },
                    { label: "FAQ", href: "/#faq" },
                    { label: "Contact Us", href: "/contact" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2 sm:py-2.5 rounded-[12px] sm:rounded-[14px] text-[12.5px] sm:text-[13px] font-medium transition-all duration-200 group/item ${
                        isDarkTheme
                          ? "text-white hover:bg-white/20"
                          : "text-[#FAF6F0] hover:bg-white/10"
                      }`}
                    >
                      <span className="tracking-wide">{item.label}</span>
                      <ArrowUpRight className={`w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 ${
                        isDarkTheme ? "text-white" : "text-[#D8CCBD]"
                      }`} />
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>

          {/* 3D Experience Action Button with Matching Fused Dumbbell Silhouette */}
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
            className="group relative hidden sm:inline-flex items-center select-none transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] cursor-pointer"
            aria-label="3D Experience"
          >
            <svg
              className="w-[136px] sm:w-[176px] h-[34px] sm:h-[38px] transition-all duration-300"
              viewBox="0 0 176 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="clip-btn-exp">
                  <path d="M 19 0 L 125 0 C 130.5 0 134.5 5.5 138.5 5.5 C 142.5 5.5 146.5 0 157 0 A 19 19 0 1 1 157 38 C 146.5 38 142.5 32.5 138.5 32.5 C 134.5 32.5 130.5 38 125 38 L 19 38 A 19 19 0 0 1 19 0 Z" />
                </clipPath>

                <linearGradient id="btn-glass-fill-exp" x1="0" y1="0" x2="176" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.16)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 0.08)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.04)" />
                </linearGradient>
                <linearGradient id="btn-glass-border-exp" x1="0" y1="0" x2="176" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
                  <stop offset="35%" stopColor="rgba(255, 255, 255, 0.45)" />
                  <stop offset="70%" stopColor="rgba(216, 204, 189, 0.35)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.75)" />
                </linearGradient>

                <linearGradient id="btn-dark-fill-exp" x1="0" y1="0" x2="176" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#876540" />
                  <stop offset="50%" stopColor="#967355" />
                  <stop offset="100%" stopColor="#876540" />
                </linearGradient>
                <linearGradient id="btn-dark-border-exp" x1="0" y1="0" x2="176" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.25)" />
                  <stop offset="50%" stopColor="rgba(216, 204, 189, 0.4)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
                </linearGradient>
              </defs>

              <g clipPath="url(#clip-btn-exp)">
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
                fill={isDarkTheme ? "url(#btn-glass-fill-exp)" : "url(#btn-dark-fill-exp)"}
                stroke={isDarkTheme ? "url(#btn-glass-border-exp)" : "url(#btn-dark-border-exp)"}
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
            </svg>

            {/* Text */}
            <div className="absolute left-0 top-0 bottom-0 w-[104px] sm:w-[138px] flex items-center justify-center pointer-events-none">
              <span className="font-sans text-[11px] sm:text-[12.5px] font-semibold text-white transition-colors duration-300">
                3D Experience
              </span>
            </div>

            {/* Box Icon */}
            <div className="absolute right-0 top-0 bottom-0 w-[32px] sm:w-[38px] flex items-center justify-center pointer-events-none">
              <Box className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] stroke-[2.2] text-white transition-colors duration-300 group-hover:rotate-12 group-hover:scale-110" />
            </div>
          </Link>
        </div>

        {/* CENTER: Lotus Logo Icon + Text Below - Locked to Exact Horizontal Center (50%) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center z-10 pointer-events-auto">
          <Link
            href="/"
            className="group flex flex-col items-center justify-center gap-0.5 transition-transform duration-300 hover:scale-[1.04]"
          >
            {/* Golden 3D Lotus Logo Icon */}
            <div className="relative w-16 h-5 sm:w-22 sm:h-7 md:w-28 md:h-10 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Divine Lotus Logo"
                fill
                priority
                unoptimized
                quality={100}
                sizes="(max-width: 640px) 64px, (max-width: 768px) 88px, 112px"
                className="object-contain"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.src.includes("lotus_logo.jpeg")) {
                    target.src = "/lotus_logo.jpeg";
                  }
                }}
              />
            </div>

            {/* Brand Logo Text Below Icon in Primary Font (Glacier) */}
            <span className={`font-display font-bold text-[11px] sm:text-[14px] md:text-[17px] uppercase tracking-[0.08em] sm:tracking-[0.12em] transition-colors duration-300 select-none leading-none mt-0.5 sm:mt-1 ${
              isDarkTheme ? "text-white group-hover:text-white/95" : "text-[#402E1D] group-hover:text-[#402E1D]/90"
            }`}>
              DIVINE LOTUS
            </span>
          </Link>
        </div>

        {/* RIGHT: Action / CTA Buttons - Notify me + Buy Now */}
        <div className="relative flex items-center gap-2 sm:gap-3 z-30">
          <div
            ref={notifyRef}
            onMouseEnter={handleNotifyEnter}
            onMouseLeave={handleNotifyLeave}
            className="relative flex items-center justify-end"
          >
          <button
            onClick={() => {
              setNotifyOpen(!notifyOpen);
              if (menuOpen) setMenuOpen(false);
            }}
            className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] cursor-pointer"
            aria-label="Notify Me"
          >
            <svg
              className="w-[110px] sm:w-[142px] h-[34px] sm:h-[38px] transition-all duration-300"
              viewBox="0 0 144 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Vector ClipPath for Exact Interior Backdrop Blur */}
                <clipPath id="clip-btn-notify">
                  <path d="M 19 0 L 93 0 C 98.5 0 102.5 5.5 106.5 5.5 C 110.5 5.5 114.5 0 125 0 A 19 19 0 1 1 125 38 C 114.5 38 110.5 32.5 106.5 32.5 C 102.5 32.5 98.5 38 93 38 L 19 38 A 19 19 0 0 1 19 0 Z" />
                </clipPath>

                {/* Mineral Crystal Frosted Glass Fill (matching Hero Cards) */}
                <linearGradient id="btn-glass-fill-notify" x1="0" y1="0" x2="144" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.16)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 0.08)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.04)" />
                </linearGradient>
                <linearGradient id="btn-glass-border-notify" x1="0" y1="0" x2="144" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
                  <stop offset="35%" stopColor="rgba(255, 255, 255, 0.45)" />
                  <stop offset="70%" stopColor="rgba(216, 204, 189, 0.35)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.75)" />
                </linearGradient>
                <linearGradient id="btn-shine-overlay-notify" x1="0" y1="0" x2="144" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
                  <stop offset="35%" stopColor="rgba(255, 255, 255, 0.12)" />
                  <stop offset="70%" stopColor="rgba(255, 255, 255, 0)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
                </linearGradient>

                {/* Dark Theme Fill (for Light Sections) */}
                <linearGradient id="btn-dark-fill-notify" x1="0" y1="0" x2="144" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#876540" />
                  <stop offset="50%" stopColor="#967355" />
                  <stop offset="100%" stopColor="#876540" />
                </linearGradient>
                <linearGradient id="btn-dark-border-notify" x1="0" y1="0" x2="144" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.25)" />
                  <stop offset="50%" stopColor="rgba(216, 204, 189, 0.4)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
                </linearGradient>
                <linearGradient id="btn-dark-shine-notify" x1="0" y1="0" x2="144" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                  <stop offset="40%" stopColor="rgba(255, 255, 255, 0.05)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.15)" />
                </linearGradient>
              </defs>

              {/* Clipped Backdrop Blur (Strictly inside borders) */}
              <g clipPath="url(#clip-btn-notify)">
                <foreignObject x="0" y="0" width="144" height="38" className="w-full h-full">
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
                d="M 19 0 L 93 0 C 98.5 0 102.5 5.5 106.5 5.5 C 110.5 5.5 114.5 0 125 0 A 19 19 0 1 1 125 38 C 114.5 38 110.5 32.5 106.5 32.5 C 102.5 32.5 98.5 38 93 38 L 19 38 A 19 19 0 0 1 19 0 Z"
                fill={isDarkTheme ? "url(#btn-glass-fill-notify)" : "url(#btn-dark-fill-notify)"}
                stroke={isDarkTheme ? "url(#btn-glass-border-notify)" : "url(#btn-dark-border-notify)"}
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
            </svg>

            {/* Notify Me Text */}
            <div className="absolute left-0 top-0 bottom-0 w-[78px] sm:w-[104px] flex items-center justify-center pointer-events-none">
              <span className="font-sans text-[11.5px] sm:text-[13px] font-semibold text-white transition-colors duration-300">
                Notify me
              </span>
            </div>

            {/* Bell Icon */}
            <div className="absolute right-0 top-0 bottom-0 w-[32px] sm:w-[38px] flex items-center justify-center pointer-events-none">
              {notifyOpen ? (
                <X className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] stroke-[2.2] text-white transition-colors duration-300" />
              ) : (
                <Bell className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] stroke-[2.2] text-white transition-colors duration-300 group-hover:rotate-12 group-hover:scale-110" />
              )}
            </div>
          </button>

          {/* Notify Me Exact Card Frosted Glass Dropdown */}
          <AnimatePresence>
            {notifyOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute right-0 top-[calc(100%+16px)] sm:top-[calc(100%+28px)] w-[calc(100vw-32px)] max-w-[325px] p-4 sm:p-5 rounded-[22px] sm:rounded-[24px] overflow-hidden z-50 transition-colors duration-300 ${
                  isDarkTheme
                    ? "shadow-[0_24px_50px_rgba(0,0,0,0.25)]"
                    : "shadow-[0_24px_50px_rgba(135,101,64,0.45)]"
                }`}
                style={{
                  backdropFilter: "blur(28px) saturate(140%) brightness(1.04)",
                  WebkitBackdropFilter: "blur(28px) saturate(140%) brightness(1.04)",
                  transform: "translateZ(0)",
                  willChange: "transform, backdrop-filter",
                  background: isDarkTheme
                    ? "linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.04) 100%)"
                    : "linear-gradient(135deg, rgba(135, 101, 64, 0.96) 0%, rgba(115, 82, 50, 0.96) 100%)",
                }}
              >
                {/* Invisible hover bridge */}
                <div className="absolute -top-[30px] left-0 right-0 h-[30px] pointer-events-auto" />
                {/* Polished Mineral Curved Specular Reflection Layer */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-[24px]"
                  style={{
                    background: isDarkTheme
                      ? "radial-gradient(120% 90% at 85% 10%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)"
                      : "radial-gradient(120% 90% at 85% 10%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.03) 40%, transparent 70%)",
                  }}
                />

                <div className="relative z-10">
                  {isSubmitted ? (
                    <div className="py-4 text-center space-y-2.5 animate-in fade-in zoom-in-95 duration-300">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto bg-white/20 border border-white/40 text-white">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <h4 className="font-display font-bold text-[16px] text-white">
                        You're on the list!
                      </h4>
                      <p className="text-[12px] leading-relaxed text-white/90">
                        We'll notify you as soon as Divine Lotus reservations go live.
                      </p>
                    </div>
                  ) : (
                    <div>
                      {/* Header */}
                      <div className="mb-4">
                        <h4 className="font-display font-bold text-[16px] sm:text-[17px] mb-1 text-white">
                          Get Early Access
                        </h4>
                        <p className="text-[11.5px] leading-snug text-white/90">
                          Reserve priority allocation and receive launch updates.
                        </p>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-2.5">
                        {/* Name Field */}
                        <div className="relative flex items-center">
                          <div className="absolute left-1.5 w-7 h-7 rounded-full bg-white text-[#876540] flex items-center justify-center pointer-events-none shadow-xs z-10">
                            <User className="w-3.5 h-3.5 stroke-[2.4]" />
                          </div>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your Name"
                            className="w-full pl-10 pr-4 py-2.5 rounded-full text-[12px] border-0 focus:outline-none transition-all duration-200 bg-white/20 hover:bg-white/25 focus:bg-white/30 text-white placeholder-white/75"
                          />
                        </div>

                        {/* Email Field */}
                        <div className="relative flex items-center">
                          <div className="absolute left-1.5 w-7 h-7 rounded-full bg-white text-[#876540] flex items-center justify-center pointer-events-none shadow-xs z-10">
                            <Mail className="w-3.5 h-3.5 stroke-[2.4]" />
                          </div>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Email Address *"
                            className="w-full pl-10 pr-4 py-2.5 rounded-full text-[12px] border-0 focus:outline-none transition-all duration-200 bg-white/20 hover:bg-white/25 focus:bg-white/30 text-white placeholder-white/75"
                          />
                        </div>

                        {/* WhatsApp Field */}
                        <div className="relative flex items-center">
                          <div className="absolute left-1.5 w-7 h-7 rounded-full bg-white text-[#876540] flex items-center justify-center pointer-events-none shadow-xs z-10">
                            <Phone className="w-3.5 h-3.5 stroke-[2.4]" />
                          </div>
                          <input
                            type="tel"
                            value={formData.whatsapp}
                            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                            placeholder="WhatsApp Number"
                            className="w-full pl-10 pr-4 py-2.5 rounded-full text-[12px] border-0 focus:outline-none transition-all duration-200 bg-white/20 hover:bg-white/25 focus:bg-white/30 text-white placeholder-white/75"
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full mt-1.5 py-2.5 px-4 rounded-full font-sans font-semibold text-[12.5px] hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-sm flex items-center justify-center gap-1.5 bg-white text-[#876540] hover:bg-[#FAF6F0]"
                        >
                          <span>Notify Me</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>

          {/* Buy Now Action Button with Matching Fused Dumbbell Silhouette */}
          <Link
            href="/#pricing"
            className="group relative hidden sm:inline-flex items-center select-none transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] cursor-pointer"
            aria-label="Buy Now"
          >
            <svg
              className="w-[108px] sm:w-[136px] h-[34px] sm:h-[38px] transition-all duration-300"
              viewBox="0 0 136 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="clip-btn-buy">
                  <path d="M 19 0 L 85 0 C 90.5 0 94.5 5.5 98.5 5.5 C 102.5 5.5 106.5 0 117 0 A 19 19 0 1 1 117 38 C 106.5 38 102.5 32.5 98.5 32.5 C 94.5 32.5 90.5 38 85 38 L 19 38 A 19 19 0 0 1 19 0 Z" />
                </clipPath>

                <linearGradient id="btn-glass-fill-buy" x1="0" y1="0" x2="136" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.16)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 0.08)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.04)" />
                </linearGradient>
                <linearGradient id="btn-glass-border-buy" x1="0" y1="0" x2="136" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
                  <stop offset="35%" stopColor="rgba(255, 255, 255, 0.45)" />
                  <stop offset="70%" stopColor="rgba(216, 204, 189, 0.35)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.75)" />
                </linearGradient>

                <linearGradient id="btn-dark-fill-buy" x1="0" y1="0" x2="136" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#876540" />
                  <stop offset="50%" stopColor="#967355" />
                  <stop offset="100%" stopColor="#876540" />
                </linearGradient>
                <linearGradient id="btn-dark-border-buy" x1="0" y1="0" x2="136" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.25)" />
                  <stop offset="50%" stopColor="rgba(216, 204, 189, 0.4)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
                </linearGradient>
              </defs>

              <g clipPath="url(#clip-btn-buy)">
                <foreignObject x="0" y="0" width="136" height="38" className="w-full h-full">
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
                d="M 19 0 L 85 0 C 90.5 0 94.5 5.5 98.5 5.5 C 102.5 5.5 106.5 0 117 0 A 19 19 0 1 1 117 38 C 106.5 38 102.5 32.5 98.5 32.5 C 94.5 32.5 90.5 38 85 38 L 19 38 A 19 19 0 0 1 19 0 Z"
                fill={isDarkTheme ? "url(#btn-glass-fill-buy)" : "url(#btn-dark-fill-buy)"}
                stroke={isDarkTheme ? "url(#btn-glass-border-buy)" : "url(#btn-dark-border-buy)"}
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
            </svg>

            {/* Text */}
            <div className="absolute left-0 top-0 bottom-0 w-[76px] sm:w-[98px] flex items-center justify-center pointer-events-none">
              <span className="font-sans text-[11.5px] sm:text-[13px] font-bold text-white transition-colors duration-300">
                Buy Now
              </span>
            </div>

            {/* Arrow Icon */}
            <div className="absolute right-0 top-0 bottom-0 w-[32px] sm:w-[38px] flex items-center justify-center pointer-events-none">
              <ArrowRight className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] stroke-[2.4] text-white transition-colors duration-300 group-hover:translate-x-0.5 group-hover:scale-110" />
            </div>
          </Link>
        </div>

      </div>
    </header>
  );
}
