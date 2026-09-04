"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Menu, X, ArrowUpRight, CheckCircle2, User, Mail, Phone, Box, ArrowRight, ChevronDown, Search, Loader2 } from "lucide-react";
import { COUNTRIES, Country, detectUserCountry, detectCountryFromIP } from "@/lib/countries";
import { submitFluentForm } from "@/lib/fluentform";
import { validateName, validateEmail, validatePhone } from "@/lib/validation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", whatsapp: "" });
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; whatsapp?: string }>({});
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]); // default US (+1)
  const userSelectedCountryRef = useRef(false);
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const notifyRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const notifyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const outsideClickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInputActiveRef = useRef(false);
  const lastAutofillTimeRef = useRef(0);
  const isSubmittingRef = useRef(false);

  const handleMenuEnter = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setMenuOpen(true);
  };

  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setMenuOpen(false);
    }, 180);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      if (!notifyRef.current?.contains(document.activeElement)) {
        isInputActiveRef.current = false;
      }
    }, 250);
  };

  useEffect(() => {
    // 1. Instantly detect country based on user's timezone / browser locale
    if (!userSelectedCountryRef.current) {
      const detected = detectUserCountry();
      if (detected) {
        setSelectedCountry(detected);
      }

      // 2. High-precision background Geo-IP verification
      detectCountryFromIP().then((geoCountry) => {
        if (geoCountry && !userSelectedCountryRef.current) {
          setSelectedCountry(geoCountry);
        }
      });
    }

    let ticking = false;
    let cachedSections: Element[] = [];
    const refreshSections = () => {
      cachedSections = Array.from(document.querySelectorAll("[data-header-theme]"));
    };
    refreshSections();

    const checkHeaderTheme = () => {
      setScrolled(window.scrollY > 20);

      if (cachedSections.length === 0) {
        refreshSections();
      }

      // Detect active section under header (approx y=70)
      let currentTheme = "dark";
      for (let i = 0; i < cachedSections.length; i++) {
        const rect = cachedSections[i].getBoundingClientRect();
        if (rect.top <= 70 && rect.bottom >= 70) {
          currentTheme = cachedSections[i].getAttribute("data-header-theme") || "dark";
          break;
        }
      }
      setIsDarkTheme(currentTheme === "dark");
      setIsHidden(currentTheme === "hidden");
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkHeaderTheme);
        ticking = true;
      }
    };

    checkHeaderTheme();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", refreshSections, { passive: true });

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (notifyRef.current && !notifyRef.current.contains(event.target as Node)) {
        // If an input inside Notify Me currently has focus, do NOT close (e.g. user interacting with browser autofill)
        if (notifyRef.current.contains(document.activeElement)) {
          return;
        }

        // If an input was recently active, wait a moment to allow browser autofill selection to complete
        if (isInputActiveRef.current) {
          if (outsideClickTimerRef.current) clearTimeout(outsideClickTimerRef.current);
          outsideClickTimerRef.current = setTimeout(() => {
            // If autofill or input change occurred during this grace period, keep modal open
            if (Date.now() - lastAutofillTimeRef.current < 400) {
              return;
            }
            if (notifyRef.current?.contains(document.activeElement)) {
              return;
            }
            setNotifyOpen(false);
            setCountryPickerOpen(false);
          }, 180);
          return;
        }

        setNotifyOpen(false);
        setCountryPickerOpen(false);
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setCountryPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
      if (notifyTimeoutRef.current) clearTimeout(notifyTimeoutRef.current);
      if (outsideClickTimerRef.current) clearTimeout(outsideClickTimerRef.current);
    };
  }, []);

  const filteredCountries = COUNTRIES.filter((c) => {
    if (!countrySearch.trim()) return true;
    const q = countrySearch.toLowerCase().trim();
    return (
      c.name.toLowerCase().includes(q) ||
      c.dialCode.includes(q) ||
      c.code.toLowerCase().includes(q)
    );
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingRef.current || isSubmitting) return;

    // Strict Frontend Validation matching Fluent Forms rules
    const nameCheck = validateName(formData.name);
    const emailCheck = validateEmail(formData.email);
    const phoneCheck = validatePhone(formData.whatsapp, true);

    const errors: { name?: string; email?: string; whatsapp?: string } = {};
    if (!nameCheck.isValid) errors.name = nameCheck.error;
    if (!emailCheck.isValid) errors.email = emailCheck.error;
    if (!phoneCheck.isValid) errors.whatsapp = phoneCheck.error;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstError = errors.name || errors.email || errors.whatsapp;
      setSubmitError(firstError || "Please check the required fields.");
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Make sure while submitting it will submit country code + phone number
      const fullPhone = `${selectedCountry.dialCode} ${formData.whatsapp.trim()}`;

      const result = await submitFluentForm(1, {
        names: formData.name.trim(),
        "names[first_name]": formData.name.trim(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: fullPhone,
        subject: `Early Access Request from ${formData.name.trim()}`,
      });

      if (result.success) {
        setIsSubmitted(true);
        setFieldErrors({});
        setTimeout(() => {
          setIsSubmitted(false);
          setNotifyOpen(false);
          setFormData({ name: "", email: "", whatsapp: "" });
          setSubmitError(null);
        }, 3200);
      } else {
        setSubmitError(result.message || "Unable to submit. Please try again.");
      }
    } catch {
      setSubmitError("An error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
      // Keep isSubmittingRef active briefly to lock out rapid double clicks
      setTimeout(() => {
        isSubmittingRef.current = false;
      }, 1500);
    }
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
        <div className="relative flex flex-col items-start gap-2 sm:gap-3 z-30">
          <div className="flex items-center gap-2 sm:gap-3">
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

                  {/* Clipped Backdrop Blur */}
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

                  {/* Base Fused Silhouette Path */}
                  <path
                    d="M 19 0 L 69 0 C 74.5 0 78.5 5.5 82.5 5.5 C 86.5 5.5 90.5 0 101 0 A 19 19 0 1 1 101 38 C 90.5 38 86.5 32.5 82.5 32.5 C 78.5 32.5 74.5 38 69 38 L 19 38 A 19 19 0 0 1 19 0 Z"
                    fill={isDarkTheme ? "url(#btn-glass-fill-menu)" : "url(#btn-dark-fill-menu)"}
                    stroke={isDarkTheme ? "url(#btn-glass-border-menu)" : "url(#btn-dark-border-menu)"}
                    strokeWidth="1.2"
                    className="transition-all duration-300"
                  />
                </svg>

                {/* Menu Text Inside Left Pill Section */}
                <div className="absolute left-0 top-0 bottom-0 w-[68px] sm:w-[86px] flex items-center justify-center pointer-events-none">
                  <span className="font-sans text-[12px] sm:text-[13px] font-semibold text-white transition-colors duration-300">
                    Menu
                  </span>
                </div>

                {/* Hamburger Icon Inside Right Circle Section */}
                <div className="absolute right-0 top-0 bottom-0 w-[30px] sm:w-[36px] flex items-center justify-center pointer-events-none">
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
                    className={`absolute left-0 top-[calc(100%+16px)] sm:top-[calc(100%+28px)] w-[240px] sm:w-[260px] p-3 sm:p-3.5 rounded-[22px] sm:rounded-[24px] overflow-hidden z-50 transition-colors duration-300 ${
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
                        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%)"
                        : "linear-gradient(135deg, #876540 0%, #967355 100%)",
                      border: isDarkTheme
                        ? "1px solid rgba(255, 255, 255, 0.65)"
                        : "1px solid rgba(255, 255, 255, 0.35)",
                    }}
                  >
                    {/* Specular Curved Sheen */}
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
                        { label: "Wisdom of Sitting", href: "/#ancient-wisdom" },
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

            {/* Desktop 3D Experience Action Button */}
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
        </div>

        {/* CENTER: Lotus Logo Icon + Text Below - Locked to Exact Horizontal Center (50%) */}
        <div className={`absolute left-1/2 -translate-x-1/2 flex items-center justify-center text-center z-10 pointer-events-auto transition-all duration-300 ${
          scrolled ? "top-1/2 -translate-y-1/2" : "top-[29px] sm:top-1/2 -translate-y-1/2"
        }`}>
          <Link
            href="/"
            className="group flex flex-col items-center justify-center gap-0.5 transition-transform duration-300 hover:scale-[1.04]"
          >
            {/* Golden 3D Lotus Logo Icon */}
            <div className="relative w-16 h-5 sm:w-22 sm:h-7 md:w-28 md:h-10 flex items-center justify-center">
              <Image
                src="/logo.avif"
                alt="Divine Lotus Logo"
                fill
                priority
                unoptimized
                quality={100}
                sizes="(max-width: 640px) 64px, (max-width: 768px) 88px, 112px"
                className="object-contain"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.src.includes("lotus_logo.avif")) {
                    target.src = "/lotus_logo.avif";
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

        {/* RIGHT: Action / CTA Buttons - Notify me + Wisdom of Sitting */}
        <div className="relative flex flex-col items-end gap-2 sm:gap-3 z-30">
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              ref={notifyRef}
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
                      <h3 className="font-display font-bold text-[16px] text-white">
                        You're on the list!
                      </h3>
                      <p className="text-[12px] leading-relaxed text-white/90">
                        We'll notify you as soon as Divine Lotus reservations go live.
                      </p>
                    </div>
                  ) : countryPickerOpen ? (
                    /* In-Card Country Selector View (Zero Clipping, 100% Fluid & Accessible) */
                    <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
                      {/* Country Picker Header */}
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-[15px] text-white">
                          Select Country
                        </h3>
                        <button
                          type="button"
                          onClick={() => {
                            setCountryPickerOpen(false);
                            setCountrySearch("");
                          }}
                          className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer transition-colors"
                          aria-label="Back to form"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Live Country Search */}
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-white/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          placeholder="Search country or code (e.g. +1, UK, India)..."
                          className="w-full bg-white/20 focus:bg-white/30 text-white placeholder-white/60 text-[12px] pl-8.5 pr-3 py-2 rounded-full border-0 focus:outline-none transition-all"
                          autoFocus
                        />
                      </div>

                      {/* Scrollable Country List (Scrollbar hidden) */}
                      <div className="overflow-y-auto max-h-[175px] space-y-1 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {filteredCountries.map((c) => {
                          const isSelected = selectedCountry.code === c.code;
                          return (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => {
                                userSelectedCountryRef.current = true;
                                setSelectedCountry(c);
                                setCountryPickerOpen(false);
                                setCountrySearch("");
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[12px] text-left transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-white text-[#876540] font-bold shadow-xs"
                                  : "text-white/95 hover:bg-white/20"
                              }`}
                            >
                              <span className="flex items-center gap-2 truncate">
                                <span className="text-[14px] leading-none">{c.flag}</span>
                                <span className="truncate">{c.name}</span>
                              </span>
                              <span
                                className={`font-mono text-[11.5px] ml-2 shrink-0 ${
                                  isSelected ? "text-[#876540]" : "text-white/75"
                                }`}
                              >
                                {c.dialCode}
                              </span>
                            </button>
                          );
                        })}
                        {filteredCountries.length === 0 && (
                          <p className="text-[12px] text-white/70 text-center py-4">
                            No matching country found
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Main Form View */
                    <div>
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-display font-bold text-[16px] sm:text-[17px] mb-1 text-white">
                            Get Early Access
                          </h3>
                          <p className="text-[11.5px] leading-snug text-white/90">
                            Reserve priority allocation and receive launch updates.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setNotifyOpen(false);
                            setCountryPickerOpen(false);
                          }}
                          className="text-white/70 hover:text-white p-1 -mr-1 -mt-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                          aria-label="Close"
                        >
                          <X className="w-4 h-4" />
                        </button>
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
                            name="name"
                            id="notify-name"
                            autoComplete="name"
                            value={formData.name}
                            onFocus={() => {
                              isInputActiveRef.current = true;
                            }}
                            onBlur={handleInputBlur}
                            onChange={(e) => {
                              lastAutofillTimeRef.current = Date.now();
                              isInputActiveRef.current = true;
                              setFormData((prev) => ({ ...prev, name: e.target.value }));
                              if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
                              if (submitError) setSubmitError(null);
                            }}
                            placeholder="Your Name *"
                            className={`w-full pl-10 pr-4 py-2.5 rounded-full text-[12px] border-0 focus:outline-none transition-all duration-200 text-white placeholder-white/75 ${
                              fieldErrors.name 
                                ? "bg-red-500/25 ring-1.5 ring-red-300" 
                                : "bg-white/20 hover:bg-white/25 focus:bg-white/30"
                            }`}
                          />
                        </div>

                        {/* Email Field */}
                        <div className="relative flex items-center">
                          <div className="absolute left-1.5 w-7 h-7 rounded-full bg-white text-[#876540] flex items-center justify-center pointer-events-none shadow-xs z-10">
                            <Mail className="w-3.5 h-3.5 stroke-[2.4]" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            id="notify-email"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onFocus={() => {
                              isInputActiveRef.current = true;
                            }}
                            onBlur={handleInputBlur}
                            onChange={(e) => {
                              lastAutofillTimeRef.current = Date.now();
                              isInputActiveRef.current = true;
                              setFormData((prev) => ({ ...prev, email: e.target.value }));
                              if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                              if (submitError) setSubmitError(null);
                            }}
                            placeholder="Email Address *"
                            className={`w-full pl-10 pr-4 py-2.5 rounded-full text-[12px] border-0 focus:outline-none transition-all duration-200 text-white placeholder-white/75 ${
                              fieldErrors.email 
                                ? "bg-red-500/25 ring-1.5 ring-red-300" 
                                : "bg-white/20 hover:bg-white/25 focus:bg-white/30"
                            }`}
                          />
                        </div>

                        {/* WhatsApp / Phone Field with matching pill country selector */}
                        <div className="relative flex items-center">
                          {/* Country Code Pill Button on the left matching the circle badges */}
                          <button
                            type="button"
                            onClick={() => setCountryPickerOpen(true)}
                            className="absolute left-1.5 z-10 h-7 pl-2 pr-1.5 rounded-full bg-white text-[#876540] flex items-center gap-1 shadow-xs hover:bg-white/95 active:scale-95 transition-all cursor-pointer select-none"
                            title={`Selected: ${selectedCountry.name} (${selectedCountry.dialCode}) - Click to change`}
                          >
                            <span className="text-[13px] leading-none">{selectedCountry.flag}</span>
                            <span className="font-sans font-bold text-[#1E140D] text-[11px] tracking-tight">
                              {selectedCountry.dialCode}
                            </span>
                            <ChevronDown className="w-2.5 h-2.5 text-[#876540]" />
                          </button>
                          <input
                            type="tel"
                            name="tel"
                            id="notify-tel"
                            autoComplete="tel-national"
                            required
                            value={formData.whatsapp}
                            onFocus={() => {
                              isInputActiveRef.current = true;
                            }}
                            onBlur={handleInputBlur}
                            onChange={(e) => {
                              lastAutofillTimeRef.current = Date.now();
                              isInputActiveRef.current = true;
                              setFormData((prev) => ({ ...prev, whatsapp: e.target.value }));
                              if (fieldErrors.whatsapp) setFieldErrors((prev) => ({ ...prev, whatsapp: undefined }));
                              if (submitError) setSubmitError(null);
                            }}
                            placeholder="Phone / WhatsApp Number *"
                            className={`w-full pr-4 py-2.5 rounded-full text-[12px] border-0 focus:outline-none transition-all duration-200 text-white placeholder-white/75 ${
                              fieldErrors.whatsapp 
                                ? "bg-red-500/25 ring-1.5 ring-red-300" 
                                : "bg-white/20 hover:bg-white/25 focus:bg-white/30"
                            }`}
                            style={{
                              paddingLeft:
                                selectedCountry.dialCode.length <= 2
                                  ? "84px"
                                  : selectedCountry.dialCode.length === 3
                                    ? "94px"
                                    : "104px",
                            }}
                          />
                        </div>

                        {submitError && (
                          <p className="text-[11px] text-red-200 text-center font-medium bg-red-900/30 py-1 px-2 rounded-lg border border-red-400/30">
                            {submitError}
                          </p>
                        )}

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full mt-1.5 py-2.5 px-4 rounded-full font-sans font-semibold text-[12.5px] hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-sm flex items-center justify-center gap-1.5 bg-white text-[#876540] hover:bg-[#FAF6F0] disabled:opacity-75"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <span>Notify Me</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>

          {/* Wisdom of Sitting Action Button with Matching Fused Dumbbell Silhouette */}
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
            className="group relative hidden sm:inline-flex items-center select-none transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] cursor-pointer"
            aria-label="Wisdom of Sitting"
          >
            <svg
              className="w-[145px] sm:w-[192px] h-[34px] sm:h-[38px] transition-all duration-300"
              viewBox="0 0 192 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="clip-btn-wisdom">
                  <path d="M 19 0 L 141 0 C 146.5 0 150.5 5.5 154.5 5.5 C 158.5 5.5 162.5 0 173 0 A 19 19 0 1 1 173 38 C 162.5 38 158.5 32.5 154.5 32.5 C 150.5 32.5 146.5 38 141 38 L 19 38 A 19 19 0 0 1 19 0 Z" />
                </clipPath>

                <linearGradient id="btn-glass-fill-wisdom" x1="0" y1="0" x2="192" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.16)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 0.08)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.04)" />
                </linearGradient>
                <linearGradient id="btn-glass-border-wisdom" x1="0" y1="0" x2="192" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
                  <stop offset="35%" stopColor="rgba(255, 255, 255, 0.45)" />
                  <stop offset="70%" stopColor="rgba(216, 204, 189, 0.35)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.75)" />
                </linearGradient>

                <linearGradient id="btn-dark-fill-wisdom" x1="0" y1="0" x2="192" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#876540" />
                  <stop offset="50%" stopColor="#967355" />
                  <stop offset="100%" stopColor="#876540" />
                </linearGradient>
                <linearGradient id="btn-dark-border-wisdom" x1="0" y1="0" x2="192" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.25)" />
                  <stop offset="50%" stopColor="rgba(216, 204, 189, 0.4)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
                </linearGradient>
              </defs>

              <g clipPath="url(#clip-btn-wisdom)">
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
                fill={isDarkTheme ? "url(#btn-glass-fill-wisdom)" : "url(#btn-dark-fill-wisdom)"}
                stroke={isDarkTheme ? "url(#btn-glass-border-wisdom)" : "url(#btn-dark-border-wisdom)"}
                strokeWidth="1.2"
                className="transition-all duration-300"
              />
            </svg>

            {/* Text */}
            <div className="absolute left-0 top-0 bottom-0 w-[112px] sm:w-[154px] flex items-center justify-center pointer-events-none px-2">
              <span className="font-sans text-[11px] sm:text-[12.5px] font-medium text-white transition-colors duration-300 whitespace-nowrap">
                Wisdom of Sitting
              </span>
            </div>

            {/* Arrow Icon */}
            <div className="absolute right-0 top-0 bottom-0 w-[32px] sm:w-[38px] flex items-center justify-center pointer-events-none">
              <ArrowRight className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] stroke-[2.4] text-white transition-colors duration-300 group-hover:translate-x-0.5 group-hover:scale-110" />
            </div>
          </Link>
        </div>
      </div>

      </div>
    </header>
  );
}
