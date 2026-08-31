"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="relative w-full bg-[#ECE7DE] text-white flex flex-col items-center">

      {/* Main Hero Background Canvas with Smooth Top Rounded Corners on Left & Right */}
      <div className="relative w-full rounded-t-[22px] sm:rounded-t-[28px] lg:rounded-t-[34px] overflow-hidden flex flex-col items-center border-t border-white/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),inset_0_24px_60px_rgba(255,255,255,0.15)]">

        {/* Top Edge Specular White Sheen Line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-[3]" />

        {/* Ambient Top Inner White Glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[80%] max-w-[1000px] h-[140px] bg-white/20 rounded-full blur-3xl pointer-events-none z-[2]" />

        {/* Sanctuary Gallery Lifestyle Background Image Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <Image
            src="/images/real-thing-bg-v2.avif"
            alt="Footer Room Environment"
            fill
            priority={false}
            unoptimized
            className="object-cover object-center brightness-[0.92] contrast-[1.02] scale-[1.02]"
          />
          {/* Soft Scrim Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/30 to-black/45" />
        </div>

        {/* Hero Card Frosted Glass Overlay (Continuous Zero-Flicker Blur) */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.05) 100%)",
            backdropFilter: "blur(32px) saturate(140%) brightness(1.04)",
            WebkitBackdropFilter: "blur(32px) saturate(140%) brightness(1.04)",
            transform: "translateZ(0)",
            willChange: "transform, backdrop-filter",
          }}
        />

        {/* Polished Mineral Curved Specular Reflection Layer (from Hero Cards) */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: "radial-gradient(120% 90% at 85% 10%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)",
          }}
        />

        {/* Main Footer Content Container */}
        <div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-16 pt-12 sm:pt-16 lg:pt-24 pb-8">

          {/* Header Row: Big Bold Headline (Left) & 2-Line Description + Notify Me Button (Right) */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 sm:gap-6 mb-8 sm:mb-10 lg:mb-12">

            <h2 className="font-display font-medium text-[28px] sm:text-[40px] md:text-[48px] lg:text-[56px] leading-[1.12] tracking-[-0.015em] text-white max-w-[620px]">
              Stay in the loop with<br />our latest listings
            </h2>

            <div className="flex flex-col items-start gap-3.5 sm:gap-4 max-w-[360px] pt-1 self-start sm:self-auto">
              <p className="font-sans text-[13px] sm:text-[14px] md:text-[14.5px] leading-[1.6] sm:leading-[1.65] text-white font-normal">
                Receive mindful practice insights, artisanal batch drops, and early invitations directly to your inbox.
              </p>

              {/* Signature Fused Pill Capsule "Notify Me" Action Button (Hidden on Mobile/Phone View) */}
              <div className="relative hidden sm:inline-flex items-center">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                >
                  {/* SVG Fused Pill + Circle Background */}
                  <svg
                    className="w-[160px] sm:w-[186px] h-[36px] sm:h-[40px]"
                    viewBox="0 0 200 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="btn-footer-fill" x1="0" y1="0" x2="200" y2="42" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="50%" stopColor="#F9F7F4" />
                        <stop offset="100%" stopColor="#FFFFFF" />
                      </linearGradient>
                      <linearGradient id="btn-footer-border" x1="0" y1="0" x2="200" y2="42" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
                        <stop offset="50%" stopColor="rgba(255, 255, 255, 0.9)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.6)" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 21 0 L 145 0 C 151 0 155 6 159 6 C 163 6 167 0 179 0 A 21 21 0 1 1 179 42 C 167 42 163 36 159 36 C 155 36 151 42 145 42 L 21 42 A 21 21 0 0 1 21 0 Z"
                      fill="url(#btn-footer-fill)"
                      stroke="url(#btn-footer-border)"
                      strokeWidth="1.4"
                    />
                  </svg>

                  {/* Button Text */}
                  <div className="absolute left-0 top-0 bottom-0 w-[130px] sm:w-[153px] flex items-center justify-center pointer-events-none">
                    <span className="font-sans text-[10.5px] sm:text-[11.5px] font-bold tracking-[0.06em] uppercase text-[#1E140D] whitespace-nowrap">
                      Notify Me
                    </span>
                  </div>

                  {/* Button Right Bronze Circle with Arrow */}
                  <div className="absolute right-[3px] top-[3px] w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] rounded-full bg-[#1E140D] flex items-center justify-center group-hover:bg-[#382618] transition-colors duration-300">
                    <ArrowUpRight className="w-[13px] h-[13px] sm:w-[14px] sm:h-[14px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </button>
              </div>
            </div>

          </div>

          {/* Subscribe Form (Left) & Social Icons (Right) Inline Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">

            {/* Subscribe Pill Form (Borderless Frosted Glass) */}
            <form onSubmit={handleSubscribe} className="relative inline-flex items-center w-full max-w-full sm:max-w-[480px]">
              <div className="relative w-full flex items-center rounded-full bg-white/[0.08] backdrop-blur-[28px] p-1 sm:p-1.5 transition-all">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={subscribed ? "Thank you for subscribing!" : "Subscribe Newsletter..."}
                  disabled={subscribed}
                  required
                  className="w-full bg-transparent font-sans text-[12.5px] sm:text-[14px] text-white placeholder:text-white/70 focus:outline-none pl-3.5 sm:pl-5 pr-2"
                />
                
                {/* Signature Fused Pill Capsule "Subscribe" Button */}
                <button
                  type="submit"
                  disabled={subscribed}
                  className="shrink-0 group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer disabled:opacity-80"
                >
                  {/* SVG Fused Pill + Circle Background */}
                  <svg
                    className="w-[132px] sm:w-[156px] h-[34px] sm:h-[38px]"
                    viewBox="0 0 166 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="btn-submit-fill" x1="0" y1="0" x2="166" y2="38" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="50%" stopColor="#F9F7F4" />
                        <stop offset="100%" stopColor="#FFFFFF" />
                      </linearGradient>
                      <linearGradient id="btn-submit-border" x1="0" y1="0" x2="166" y2="38" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
                        <stop offset="50%" stopColor="rgba(255, 255, 255, 0.9)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.6)" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 19 0 L 115 0 C 120 0 124 5.5 128 5.5 C 132 5.5 136 0 147 0 A 19 19 0 1 1 147 38 C 136 38 132 32.5 128 32.5 C 124 32.5 120 38 115 38 L 19 38 A 19 19 0 0 1 19 0 Z"
                      fill="url(#btn-submit-fill)"
                      stroke="url(#btn-submit-border)"
                      strokeWidth="1.4"
                    />
                  </svg>

                  {/* Button Text */}
                  <div className="absolute left-0 top-0 bottom-0 w-[102px] sm:w-[125px] flex items-center justify-center pointer-events-none">
                    <span className="font-sans text-[10.5px] sm:text-[11.5px] font-bold tracking-[0.06em] uppercase text-[#1E140D] whitespace-nowrap">
                      {subscribed ? "Subscribed" : "Subscribe"}
                    </span>
                  </div>

                  {/* Button Right Bronze Circle with Arrow */}
                  <div className="absolute right-[3px] top-[3px] w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] rounded-full bg-[#1E140D] flex items-center justify-center group-hover:bg-[#382618] transition-colors duration-300">
                    <ArrowUpRight className="w-[12px] h-[12px] sm:w-[13px] sm:h-[13px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </button>
              </div>
            </form>

            {/* Inline Social Icons (Right) */}
            <div className="flex items-center gap-2.5 sm:gap-3 self-start sm:self-auto">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-sm shadow-sm"
              >
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current text-white group-hover:text-[#1E140D] transition-colors duration-200" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="group w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-sm shadow-sm"
              >
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current text-white group-hover:text-[#1E140D] transition-colors duration-200" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.365-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.546.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"
                  />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="group w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-sm shadow-sm"
              >
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current text-white group-hover:text-[#1E140D] transition-colors duration-200" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

          </div>

          {/* 4-Column Studio Addresses & Navigation Links Grid (2x2 on Mobile/Tablet) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8 mb-10 sm:mb-14 font-sans text-[13px] sm:text-[14px] leading-relaxed text-white">

            {/* Column 1: Studio / Location 1 */}
            <div className="space-y-1">
              <p className="font-semibold text-white mb-1 text-[13.5px] sm:text-[14.5px]">Paris</p>
              <p>
                <a
                  href="tel:+33145678901"
                  className="group/link relative inline-block w-fit text-white hover:text-white transition-colors duration-200"
                >
                  <span>T: (+33) 1 45 67 89 01</span>
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-white transition-all duration-300 ease-out group-hover/link:w-full" />
                </a>
              </p>
              <p className="text-white/90">23 Rue Saint-Honoré,</p>
              <p className="text-white/90">75001 Paris, France</p>
            </div>

            {/* Column 2: Studio / Location 2 */}
            <div className="space-y-1">
              <p className="font-semibold text-white mb-1 text-[13.5px] sm:text-[14.5px]">Bordeaux</p>
              <p>
                <a
                  href="tel:+33556789012"
                  className="group/link relative inline-block w-fit text-white hover:text-white transition-colors duration-200"
                >
                  <span>T: (+33) 5 56 78 90 12</span>
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-white transition-all duration-300 ease-out group-hover/link:w-full" />
                </a>
              </p>
              <p className="text-white/90">15 Cours de l'Intendance,</p>
              <p className="text-white/90">33000 Bordeaux, France</p>
            </div>

            {/* Column 3: Navigation Links */}
            <div className="space-y-2 col-span-2 sm:col-span-1 lg:col-span-1">
              <p className="font-semibold text-white mb-2 text-[13.5px] sm:text-[14.5px]">Navigation</p>
              <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-1.5 text-[12.5px] sm:text-[13px]">
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
                ].map((link) => (
                  <div key={link.label}>
                    <a
                      href={link.href}
                      className="group/link relative inline-block w-fit text-white/85 hover:text-white transition-colors duration-200 leading-snug"
                    >
                      <span>{link.label}</span>
                      <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-white transition-all duration-300 ease-out group-hover/link:w-full" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 4: Social Channels */}
            <div className="space-y-2">
              <p className="font-semibold text-white mb-1 text-[13.5px] sm:text-[14.5px]">Social</p>
              <div>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link relative inline-block w-fit text-white/90 hover:text-white transition-colors duration-200"
                >
                  <span>Instagram</span>
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-white transition-all duration-300 ease-out group-hover/link:w-full" />
                </a>
              </div>
              <div>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link relative inline-block w-fit text-white/90 hover:text-white transition-colors duration-200"
                >
                  <span>Pinterest</span>
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-white transition-all duration-300 ease-out group-hover/link:w-full" />
                </a>
              </div>
              <div>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link relative inline-block w-fit text-white/90 hover:text-white transition-colors duration-200"
                >
                  <span>YouTube</span>
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-white transition-all duration-300 ease-out group-hover/link:w-full" />
                </a>
              </div>
            </div>

          </div>

          {/* 3. BOTTOM COPYRIGHT & LEGAL BAR (Dividerless) */}
          <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-sans text-[11.5px] sm:text-[12.5px] text-white/90 text-center sm:text-left">
            <p>All Rights Reserved - Copyright © 2026 Divine Lotus</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-8">
              <a
                href="/privacy-policy"
                className="group/link relative inline-block w-fit text-white/90 hover:text-white transition-colors duration-200"
              >
                <span>Privacy Policy</span>
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-white transition-all duration-300 ease-out group-hover/link:w-full" />
              </a>
              <a
                href="/terms"
                className="group/link relative inline-block w-fit text-white/90 hover:text-white transition-colors duration-200"
              >
                <span>Terms & Conditions</span>
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-white transition-all duration-300 ease-out group-hover/link:w-full" />
              </a>
              <a
                href="/refund-policy"
                className="group/link relative inline-block w-fit text-white/90 hover:text-white transition-colors duration-200"
              >
                <span>Refund Policy</span>
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-white transition-all duration-300 ease-out group-hover/link:w-full" />
              </a>
            </div>
          </div>

        </div>

      </div>

    </footer>
  );
}
