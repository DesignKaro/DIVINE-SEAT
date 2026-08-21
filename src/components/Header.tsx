"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Menu, X, ArrowUpRight, CheckCircle2, User, Mail, Phone } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", whatsapp: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const notifyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (notifyRef.current && !notifyRef.current.contains(event.target as Node)) {
        setNotifyOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/20 backdrop-blur-lg py-2 border-b border-white/10"
          : "bg-transparent py-3 md:py-4"
      }`}
    >
      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* LEFT: Menu Button with matching Fused Dumbbell Silhouette + Dropdown */}
        <div ref={menuRef} className="relative flex items-center justify-start z-30">
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
              className="w-[114px] sm:w-[122px] h-[36px] sm:h-[38px]"
              viewBox="0 0 120 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="btn-glass-fill-menu" x1="0" y1="0" x2="120" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#F9F7F4" />
                  <stop offset="100%" stopColor="#FFFFFF" />
                </linearGradient>
                <linearGradient id="btn-glass-border-menu" x1="0" y1="0" x2="120" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
                  <stop offset="35%" stopColor="rgba(255, 255, 255, 0.75)" />
                  <stop offset="70%" stopColor="rgba(216, 204, 189, 0.55)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.95)" />
                </linearGradient>
                <linearGradient id="btn-shine-overlay-menu" x1="0" y1="0" x2="120" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.7)" />
                  <stop offset="35%" stopColor="rgba(255, 255, 255, 0.1)" />
                  <stop offset="70%" stopColor="rgba(255, 255, 255, 0)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.35)" />
                </linearGradient>
              </defs>

              <path
                d="M 19 0 L 69 0 C 74.5 0 78.5 5.5 82.5 5.5 C 86.5 5.5 90.5 0 101 0 A 19 19 0 1 1 101 38 C 90.5 38 86.5 32.5 82.5 32.5 C 78.5 32.5 74.5 38 69 38 L 19 38 A 19 19 0 0 1 19 0 Z"
                fill="url(#btn-glass-fill-menu)"
                stroke="url(#btn-glass-border-menu)"
                strokeWidth="1.4"
              />
              <path
                d="M 19 1.2 L 69 1.2 C 74 1.2 78 6.5 82.5 6.5 C 87 6.5 91 1.2 101 1.2 A 17.8 17.8 0 0 1 118.8 19 C 118.8 11 110 1.2 101 1.2 L 69 1.2 C 56 1.2 25 1.2 19 1.2 Z"
                fill="url(#btn-shine-overlay-menu)"
                opacity="0.9"
              />
            </svg>

            {/* Menu Text */}
            <div className="absolute left-0 top-0 bottom-0 w-[78px] sm:w-[84px] flex items-center justify-center pointer-events-none">
              <span className="font-sans text-[12.5px] sm:text-[13px] font-semibold text-black">
                Menu
              </span>
            </div>

            {/* Menu / Close Icon */}
            <div className="absolute right-0 top-0 bottom-0 w-[36px] sm:w-[38px] flex items-center justify-center pointer-events-none">
              {menuOpen ? (
                <X className="w-[15px] h-[15px] sm:w-[16px] sm:h-[16px] text-black stroke-[2.2] transition-transform duration-300" />
              ) : (
                <Menu className="w-[15px] h-[15px] sm:w-[16px] sm:h-[16px] text-black stroke-[2.2] transition-transform duration-300 group-hover:scale-110" />
              )}
            </div>
          </button>

          {/* Frosted Mineral Crystal Glass Dropdown - Refined Glass Rim & Zero Shadows */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 8, scale: 0.96, filter: "blur(6px)" }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-[calc(100%+12px)] w-[245px] sm:w-[265px] p-2.5 rounded-[24px] border-[1.3px] border-white/40 overflow-hidden"
                style={{
                  backdropFilter: "blur(40px) saturate(180%)",
                  WebkitBackdropFilter: "blur(40px) saturate(180%)",
                  background: "linear-gradient(145deg, rgba(42, 32, 22, 0.92) 0%, rgba(74, 61, 48, 0.86) 50%, rgba(107, 92, 77, 0.9) 100%)",
                  boxShadow: "inset 0 1px 0.5px 0 rgba(255, 255, 255, 0.45)",
                }}
              >
                <div className="flex flex-col space-y-1">
                  {[
                    { label: "The Seat", href: "#the-seat" },
                    { label: "Why It Works", href: "#why-it-works" },
                    { label: "Meditation & Posture", href: "#posture" },
                    { label: "Materials", href: "#materials" },
                    { label: "FAQ", href: "#faq" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 rounded-[14px] text-[13px] sm:text-[13.5px] font-normal text-white/90 hover:text-white hover:bg-white/[0.12] transition-all duration-200 group/item"
                    >
                      <span className="tracking-wide">{item.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CENTER: Lotus Logo Icon + Text Below - Locked to Exact Horizontal Center (50%) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center z-10">
          <Link
            href="/"
            className="group flex flex-col items-center justify-center gap-0.5 transition-transform duration-300 hover:scale-[1.04]"
          >
            {/* Golden 3D Lotus Logo Icon - Raw Original Quality without Compression */}
            <div className="relative w-20 h-7 sm:w-24 sm:h-8 md:w-28 md:h-10 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Divine Seat Lotus Logo"
                fill
                priority
                unoptimized
                quality={100}
                className="object-contain"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.src.includes("lotus_logo.jpeg")) {
                    target.src = "/lotus_logo.jpeg";
                  }
                }}
              />
            </div>

            {/* Brand Logo Text Below Icon in Primary Font (Glacier) - Uppercase with Elegant Tracking */}
            <span className="font-display font-bold text-[14px] sm:text-[15.5px] md:text-[17px] uppercase tracking-[0.12em] text-white group-hover:text-white/95 transition-colors select-none leading-none mt-1">
              DIVINE SEAT
            </span>
          </Link>
        </div>

        {/* RIGHT: Action / CTA Button - Notify me + Dropdown Form */}
        <div ref={notifyRef} className="relative flex items-center justify-end z-30">
          <button
            onClick={() => {
              setNotifyOpen(!notifyOpen);
              if (menuOpen) setMenuOpen(false);
            }}
            className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] cursor-pointer"
            aria-label="Notify Me"
          >
            <svg
              className="w-[134px] sm:w-[142px] h-[36px] sm:h-[38px]"
              viewBox="0 0 144 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="btn-glass-fill-notify" x1="0" y1="0" x2="144" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#F9F7F4" />
                  <stop offset="100%" stopColor="#FFFFFF" />
                </linearGradient>
                <linearGradient id="btn-glass-border-notify" x1="0" y1="0" x2="144" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
                  <stop offset="35%" stopColor="rgba(255, 255, 255, 0.75)" />
                  <stop offset="70%" stopColor="rgba(216, 204, 189, 0.55)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.95)" />
                </linearGradient>
                <linearGradient id="btn-shine-overlay-notify" x1="0" y1="0" x2="144" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.7)" />
                  <stop offset="35%" stopColor="rgba(255, 255, 255, 0.1)" />
                  <stop offset="70%" stopColor="rgba(255, 255, 255, 0)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.35)" />
                </linearGradient>
              </defs>

              <path
                d="M 19 0 L 93 0 C 98.5 0 102.5 5.5 106.5 5.5 C 110.5 5.5 114.5 0 125 0 A 19 19 0 1 1 125 38 C 114.5 38 110.5 32.5 106.5 32.5 C 102.5 32.5 98.5 38 93 38 L 19 38 A 19 19 0 0 1 19 0 Z"
                fill="url(#btn-glass-fill-notify)"
                stroke="url(#btn-glass-border-notify)"
                strokeWidth="1.4"
              />
              <path
                d="M 19 1.2 L 93 1.2 C 98 1.2 102 6.5 106.5 6.5 C 111 6.5 115 1.2 125 1.2 A 17.8 17.8 0 0 1 142.8 19 C 142.8 11 134 1.2 125 1.2 L 93 1.2 C 80 1.2 25 1.2 19 1.2 Z"
                fill="url(#btn-shine-overlay-notify)"
                opacity="0.9"
              />
            </svg>

            <div className="absolute left-0 top-0 bottom-0 w-[100px] sm:w-[106px] flex items-center justify-center pointer-events-none">
              <span className="font-sans text-[12px] sm:text-[13px] font-semibold text-black">
                Notify me
              </span>
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-[36px] sm:w-[38px] flex items-center justify-center pointer-events-none">
              {notifyOpen ? (
                <X className="w-[15px] h-[15px] sm:w-[16px] sm:h-[16px] text-black stroke-[2.2] transition-transform duration-300" />
              ) : (
                <Bell className="w-[15px] h-[15px] sm:w-[16px] sm:h-[16px] text-black stroke-[2.2] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              )}
            </div>
          </button>

          {/* Notify Me Frosted Mineral Crystal Glass Dropdown Form */}
          <AnimatePresence>
            {notifyOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 8, scale: 0.96, filter: "blur(6px)" }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 top-[calc(100%+12px)] w-[290px] sm:w-[325px] p-5 rounded-[24px] border-[1.3px] border-white/40 overflow-hidden"
                style={{
                  backdropFilter: "blur(40px) saturate(180%)",
                  WebkitBackdropFilter: "blur(40px) saturate(180%)",
                  background: "linear-gradient(145deg, rgba(42, 32, 22, 0.94) 0%, rgba(74, 61, 48, 0.88) 50%, rgba(107, 92, 77, 0.92) 100%)",
                  boxShadow: "inset 0 1px 0.5px 0 rgba(255, 255, 255, 0.45)",
                }}
              >
                {isSubmitted ? (
                  <div className="py-4 text-center space-y-2.5 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center mx-auto text-[#D4AF37]">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-bold text-[16px] text-white">You're on the list!</h4>
                    <p className="text-[12px] text-white/75 leading-relaxed">
                      We'll notify you as soon as Divine Seat reservations go live.
                    </p>
                  </div>
                ) : (
                  <div>
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                        <h4 className="font-display font-bold text-[16px] sm:text-[17px] text-white">Get Early Access</h4>
                      </div>
                      <p className="text-[11.5px] text-white/70 leading-snug">
                        Reserve priority allocation and receive launch updates.
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-2.5">
                      {/* Name Field */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/50">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-[13px] bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.16] border-0 text-white placeholder-white/45 text-[12px] focus:outline-none transition-all duration-200"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/50">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Email Address *"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-[13px] bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.16] border-0 text-white placeholder-white/45 text-[12px] focus:outline-none transition-all duration-200"
                        />
                      </div>

                      {/* WhatsApp Field */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/50">
                          <Phone className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="tel"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          placeholder="WhatsApp Number"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-[13px] bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.16] border-0 text-white placeholder-white/45 text-[12px] focus:outline-none transition-all duration-200"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full mt-1.5 py-2.5 px-4 rounded-[13px] bg-white text-black font-sans font-semibold text-[12.5px] hover:bg-[#F9F7F4] hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-[0_2px_12px_rgba(255,255,255,0.15)] flex items-center justify-center gap-1.5"
                      >
                        <span>Notify Me</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                      </button>
                    </form>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
}
