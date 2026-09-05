"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { submitFluentForm } from "@/lib/fluentform";
import { validateEmail } from "@/lib/validation";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import AnimatedReveal from "@/components/ui/AnimatedReveal";
import { useCurrency } from "@/context/CurrencyContext";

const CustomizeModal = dynamic(() => import("./CustomizeModal"), { ssr: false });

export default function Footer() {
  const { standard, custom } = useCurrency();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingRef.current || isSubmitting) return;

    // Strict Frontend Email Validation
    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      setEmailError(emailCheck.error || "Please enter a valid email address.");
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setEmailError(null);

    try {
      const result = await submitFluentForm(2, { email: email.trim() });
      if (result.success) {
        setSubscribed(true);
        setEmailError(null);
        setTimeout(() => {
          setEmail("");
          setSubscribed(false);
        }, 4000);
      } else {
        setEmailError(result.message || "Unable to subscribe. Please try again.");
      }
    } catch {
      setEmailError("Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        isSubmittingRef.current = false;
      }, 1500);
    }
  };

  return (
    <footer className="relative w-full bg-transparent text-white flex flex-col items-center">

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
        <div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-16 pt-14 sm:pt-20 lg:pt-28 pb-8">

          {/* FINAL EMOTIONAL CTA SECTION (2-Column Layout above 5-column menu) */}
          <div className="mb-14 sm:mb-20 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 sm:gap-10 lg:gap-16 w-full">
            
            {/* Left Column: Eyebrow, Large Headline & Subtitle */}
            <div className="flex-1 max-w-[760px]">
              {/* Eyebrow */}
              <AnimatedReveal delay={0.03} y={12}>
                <span className="font-sans text-[12.5px] sm:text-[14px] font-semibold tracking-[0.05em] uppercase text-white/75 mb-3 sm:mb-4 inline-block">
                  The practice begins with sitting down.
                </span>
              </AnimatedReveal>

              {/* Large Bold Emotional Headline */}
              <AnimatedHeading
                text={"Sit with ease.\nStay with the practice."}
                as="h2"
                className="font-display font-medium text-[34px] sm:text-[48px] md:text-[54px] lg:text-[64px] leading-[1.12] sm:leading-[1.10] tracking-[-0.02em] text-white mb-3 sm:mb-3.5"
              />

              {/* Subtitle */}
              <AnimatedReveal delay={0.18} y={18}>
                <p className="font-sans text-[15.5px] sm:text-[17.5px] lg:text-[19px] leading-relaxed text-white/85 font-normal max-w-[560px]">
                  A better foundation for the stillness within.
                </p>
              </AnimatedReveal>
            </div>

            {/* Right Column: Two Action Buttons + Included Guarantee Note */}
            <AnimatedReveal delay={0.24} y={20} className="shrink-0 flex flex-col items-start md:items-end gap-3 sm:gap-3.5 w-fit">
              
              {/* Button 1: ORDER THE LOTUS SEAT  - €149 */}
              <a
                href="/#pricing"
                className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer shrink-0 w-fit"
              >
                <svg
                  className="w-[252px] sm:w-[268px] h-[44px] sm:h-[46px] overflow-visible"
                  viewBox="0 0 268 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="btn-footer-order-fill" x1="0" y1="0" x2="268" y2="46" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="50%" stopColor="#F9F7F4" />
                      <stop offset="100%" stopColor="#FFFFFF" />
                    </linearGradient>
                    <linearGradient id="btn-footer-order-border" x1="0" y1="0" x2="268" y2="46" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
                      <stop offset="50%" stopColor="rgba(255, 255, 255, 0.9)" />
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0.6)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 23 0 L 205 0 C 212 0 217 7 222 7 C 227 7 232 0 245 0 A 23 23 0 1 1 245 46 C 232 46 227 39 222 39 C 217 39 212 46 205 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                    fill="url(#btn-footer-order-fill)"
                    stroke="url(#btn-footer-order-border)"
                    strokeWidth="1.4"
                  />
                </svg>
                <div className="absolute left-0 top-0 bottom-0 w-[202px] sm:w-[218px] flex items-center justify-center pointer-events-none px-3">
                  <span className="font-sans text-[10.5px] sm:text-[11.5px] font-bold tracking-[0.04em] uppercase text-[#1E140D] whitespace-nowrap">
                    ORDER THE LOTUS SEAT  - {standard.price}
                  </span>
                </div>
                <div className="absolute right-[4px] top-[4px] w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#1E140D] flex items-center justify-center group-hover:bg-[#382618] transition-colors duration-300">
                  <ArrowUpRight className="w-[15px] h-[15px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>

              {/* Button 2: CUSTOMISE YOURS (Matched Width & Geometry) */}
              <button
                type="button"
                onClick={() => setIsCustomizeModalOpen(true)}
                className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer shrink-0 w-fit"
              >
                <svg
                  className="w-[252px] sm:w-[268px] h-[44px] sm:h-[46px] overflow-visible"
                  viewBox="0 0 268 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="btn-footer-custom-fill" x1="0" y1="0" x2="268" y2="46" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="rgba(255, 255, 255, 0.20)" />
                      <stop offset="50%" stopColor="rgba(255, 255, 255, 0.12)" />
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0.20)" />
                    </linearGradient>
                    <linearGradient id="btn-footer-custom-border" x1="0" y1="0" x2="268" y2="46" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
                      <stop offset="50%" stopColor="rgba(255, 255, 255, 0.75)" />
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0.45)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 23 0 L 205 0 C 212 0 217 7 222 7 C 227 7 232 0 245 0 A 23 23 0 1 1 245 46 C 232 46 227 39 222 39 C 217 39 212 46 205 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                    fill="url(#btn-footer-custom-fill)"
                    stroke="url(#btn-footer-custom-border)"
                    strokeWidth="1.4"
                  />
                </svg>
                <div className="absolute left-0 top-0 bottom-0 w-[202px] sm:w-[218px] flex items-center justify-center pointer-events-none px-3">
                  <span className="font-sans text-[10.5px] sm:text-[11.5px] font-bold tracking-[0.04em] uppercase text-white whitespace-nowrap">
                    CUSTOMISE YOURS  - {custom.price}
                  </span>
                </div>
                <div className="absolute right-[4px] top-[4px] w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                  <ArrowUpRight className="w-[15px] h-[15px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </button>

              {/* Note Underneath */}
              <p className="font-sans text-[12px] sm:text-[12.5px] text-white/70 font-medium mt-1 text-left md:text-right">
                Includes an additional cover + Sadhana Practice Guide
              </p>

            </AnimatedReveal>

          </div>

          {/* Newsletter Subscribe Row (Inline above the 5-column menu) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6 mb-12 sm:mb-16 pt-8 border-t border-white/15">
            <div>
              <AnimatedHeading
                text="Stay connected with the practice."
                as="h3"
                className="font-display font-medium text-[20px] sm:text-[24px] text-white"
              />
              <AnimatedReveal delay={0.12} y={12}>
                <p className="font-sans text-[12.5px] sm:text-[13.5px] text-white/75 font-normal mt-0.5">
                  Receive mindful practice insights, artisanal batch drops, and invitations.
                </p>
              </AnimatedReveal>
            </div>

            {/* Subscribe Pill Form (Borderless Frosted Glass) */}
            <form onSubmit={handleSubscribe} className="relative flex flex-col w-full max-w-full sm:max-w-[420px]">
              <div className={`relative w-full flex items-center rounded-full bg-white/[0.08] backdrop-blur-[28px] p-1 sm:p-1.5 transition-all ${
                emailError ? "ring-1.5 ring-red-400 bg-red-950/30" : ""
              }`}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError(null);
                  }}
                  placeholder={subscribed ? "Thank you for subscribing!" : "Subscribe Newsletter..."}
                  disabled={subscribed}
                  required
                  className="w-full bg-transparent font-sans text-[12.5px] sm:text-[13.5px] text-white placeholder:text-white/70 focus:outline-none pl-3.5 sm:pl-5 pr-2"
                />
                
                {/* Signature Fused Pill Capsule "Subscribe" Button */}
                <button
                  type="submit"
                  disabled={subscribed}
                  className="shrink-0 group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer disabled:opacity-80"
                >
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
                    <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.06em] uppercase text-[#1E140D] whitespace-nowrap">
                      {subscribed ? "Subscribed" : isSubmitting ? "Joining..." : "Subscribe"}
                    </span>
                  </div>

                  {/* Button Right Bronze Circle with Arrow */}
                  <div className="absolute right-[3px] top-[3px] w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] rounded-full bg-[#1E140D] flex items-center justify-center group-hover:bg-[#382618] transition-colors duration-300">
                    {isSubmitting ? (
                      <Loader2 className="w-[12px] h-[12px] sm:w-[13px] sm:h-[13px] text-white animate-spin" />
                    ) : (
                      <ArrowUpRight className="w-[12px] h-[12px] sm:w-[13px] sm:h-[13px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    )}
                  </div>
                </button>
              </div>

              {emailError && (
                <p className="text-[11.5px] text-red-300 font-medium pt-1.5 pl-3 flex items-center gap-1 animate-in fade-in">
                  <span>•</span> {emailError}
                </p>
              )}
            </form>
          </div>

          {/* 5-Column Navigation Links Grid (2-col mobile, 3-col tablet, 5-col desktop) */}
          <AnimatedReveal delay={0.16} y={16} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-6 xl:gap-8 mb-10 sm:mb-14 font-sans text-[13px] sm:text-[14px] leading-relaxed text-white">

            {/* Column 1: EXPLORE */}
            <div className="space-y-2">
              <p className="font-semibold text-white mb-2 text-[13.5px] sm:text-[14.5px] tracking-wider uppercase">
                Explore
              </p>
              <div className="space-y-2">
                {[
                  { label: "The Seat", href: "/#the-seat" },
                  { label: "Why It Works", href: "/#the-solution" },
                  { label: "The Wisdom", href: "/#ancient-wisdom" },
                  { label: "Materials", href: "/#materials" },
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

            {/* Column 2: SHOP */}
            <div className="space-y-2">
              <p className="font-semibold text-white mb-2 text-[13.5px] sm:text-[14.5px] tracking-wider uppercase">
                Shop
              </p>
              <div className="space-y-2">
                {[
                  { label: "The Lotus Seat", href: "/#pricing" },
                  { label: "Customise Yours", href: "/#pricing" },
                  { label: "Shipping & Returns", href: "/shipping-policy" },
                  { label: "Order Tracking", href: "/shipping-policy#order-tracking" },
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

            {/* Column 3: SUPPORT */}
            <div className="space-y-2">
              <p className="font-semibold text-white mb-2 text-[13.5px] sm:text-[14.5px] tracking-wider uppercase">
                Support
              </p>
              <div className="space-y-2">
                {[
                  { label: "FAQ", href: "/#faq" },
                  { label: "Contact Us", href: "/contact" },
                  { label: "Care Guide", href: "/warranty-policy#covers-zippers" },
                  { label: "Returns & Refunds", href: "/refund-policy" },
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

            {/* Column 4: POLICIES */}
            <div className="space-y-2">
              <p className="font-semibold text-white mb-2 text-[13.5px] sm:text-[14.5px] tracking-wider uppercase">
                Policies
              </p>
              <div className="space-y-2">
                {[
                  { label: "Shipping Policy", href: "/shipping-policy" },
                  { label: "Refund Policy", href: "/refund-policy" },
                  { label: "Warranty Policy", href: "/warranty-policy" },
                  { label: "Disclaimer", href: "/disclaimer" },
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

            {/* Column 5: SOCIAL CHANNELS */}
            <div className="space-y-2">
              <p className="font-semibold text-white mb-2 text-[13.5px] sm:text-[14.5px] tracking-wider uppercase">
                Connect
              </p>
              <div className="space-y-2.5">
                {[
                  {
                    label: "Instagram",
                    href: "https://instagram.com",
                    icon: (
                      <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Facebook",
                    href: "https://facebook.com",
                    icon: (
                      <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Threads",
                    href: "https://www.threads.com/@theedivinelotus?igshid=NTc4MTIwNjQ2YQ==",
                    icon: (
                      <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z" />
                      </svg>
                    ),
                  },
                  {
                    label: "YouTube",
                    href: "https://youtube.com",
                    icon: (
                      <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    ),
                  },
                ].map((link) => (
                  <div key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-2 text-white/85 hover:text-white transition-colors duration-200 leading-snug"
                    >
                      <span className="text-white/80 group-hover/link:text-white transition-colors">{link.icon}</span>
                      <span className="relative inline-block">
                        <span>{link.label}</span>
                        <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-white transition-all duration-300 ease-out group-hover/link:w-full" />
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </AnimatedReveal>

          {/* 3. BOTTOM COPYRIGHT & LEGAL BAR (3 Core Menus in Single Line) */}
          <AnimatedReveal delay={0.22} y={12} className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-sans text-[11.5px] sm:text-[12.5px] text-white/90 text-center sm:text-left">
            <p>All Rights Reserved - Copyright © 2026 Divine Lotus</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-5 sm:gap-8">
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
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-cookie-settings"));
                  }
                }}
                className="group/link relative inline-block w-fit text-white/90 hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-0 p-0"
              >
                <span>Cookie Settings</span>
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-white transition-all duration-300 ease-out group-hover/link:w-full" />
              </button>
            </div>
          </AnimatedReveal>

        </div>

      </div>

      {/* Customization Atelier Modal */}
      {isCustomizeModalOpen && (
        <CustomizeModal
          isOpen={isCustomizeModalOpen}
          onClose={() => setIsCustomizeModalOpen(false)}
        />
      )}

    </footer>
  );
}
