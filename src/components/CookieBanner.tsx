"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Cookie, X, Check, Sliders, ChevronRight } from "lucide-react";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
  hasConsented: boolean;
}

const STORAGE_KEY = "divine_lotus_cookie_consent_v1";

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    advertising: false,
    hasConsented: false,
  });

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setPreferences(parsed);
      } else {
        // First visit: show simple banner after slight delay
        const timer = setTimeout(() => {
          setShowBanner(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      setShowBanner(true);
    }

    const handleOpenSettings = () => {
      setShowModal(true);
      setShowBanner(false);
    };

    window.addEventListener("open-cookie-settings", handleOpenSettings);
    return () => {
      window.removeEventListener("open-cookie-settings", handleOpenSettings);
    };
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Ignore localStorage errors in private modes
    }
    setPreferences(prefs);
    setShowBanner(false);
    setShowModal(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      advertising: true,
      hasConsented: true,
    });
  };

  const handleRejectNonEssential = () => {
    saveConsent({
      essential: true,
      analytics: false,
      advertising: false,
      hasConsented: true,
    });
  };

  const handleSaveCustom = () => {
    saveConsent({
      ...preferences,
      essential: true,
      hasConsented: true,
    });
  };

  if (!mounted) return null;

  return (
    <>
      {/* 1. SIMPLE FIRST-VISIT FLOATING BANNER */}
      <AnimatePresence>
        {showBanner && !showModal && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-3 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-[540px] z-[9999] pointer-events-auto pb-[env(safe-area-inset-bottom,0px)]"
          >
            <div className="relative rounded-[22px] sm:rounded-[26px] bg-[#1E140D]/95 text-white p-4 sm:p-5 md:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.4),0_1px_1px_rgba(255,255,255,0.2)_inset] backdrop-blur-2xl border border-white/15">
              {/* Top Row: Title & Close */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Cookie className="w-3.5 h-3.5 text-[#D8CCBD]" />
                  </div>
                  <h3 className="font-display font-semibold text-[15.5px] sm:text-[16.5px] text-white tracking-wide">
                    Your privacy, your choice.
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  aria-label="Close and reject non-essential"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Body Text */}
              <p className="font-sans text-[12px] sm:text-[13px] leading-relaxed text-[#F0EBE3]/85 mb-3.5 sm:mb-4">
                We use essential cookies to make Divine Lotus work. With your permission, we’d also like to use analytics and advertising technologies to understand how the website is used and improve what we do.
              </p>

              {/* Action Buttons: Stacked Prominent Accept on Mobile, 2-Col Secondary, Full Single Line on Desktop */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2.5">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="w-full sm:w-auto sm:flex-1 py-2.5 sm:py-2 px-3 sm:px-3.5 rounded-full bg-white text-[#1E140D] hover:bg-[#F6F3ED] font-sans text-[12.5px] sm:text-[12px] font-bold transition-all text-center cursor-pointer active:scale-[0.98] whitespace-nowrap shadow-sm"
                >
                  Accept All
                </button>

                <div className="grid grid-cols-2 sm:contents gap-2 sm:gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleRejectNonEssential}
                    className="py-2.5 sm:py-2 px-2.5 sm:px-3 rounded-full bg-white/12 hover:bg-white/20 text-white font-sans text-[11.5px] sm:text-[12px] font-semibold transition-all text-center cursor-pointer active:scale-[0.98] whitespace-nowrap border border-white/10"
                  >
                    Reject Non-Essential
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowBanner(false);
                      setShowModal(true);
                    }}
                    className="py-2.5 sm:py-2 px-2.5 sm:px-3 rounded-full bg-white/12 hover:bg-white/20 text-[#E8DFD4] hover:text-white font-sans text-[11.5px] sm:text-[12px] font-medium transition-all text-center cursor-pointer active:scale-[0.98] whitespace-nowrap border border-white/10"
                  >
                    <span className="sm:hidden">Preferences</span>
                    <span className="hidden sm:inline">Manage Preferences</span>
                  </button>
                </div>
              </div>

              {/* Policy Link */}
              <div className="mt-3 pt-2.5 border-t border-white/10 text-center">
                <Link
                  href="/cookie-policy"
                  className="font-sans text-[11px] text-[#D8CCBD]/80 hover:text-white transition-colors inline-block"
                >
                  Read our full Cookie &amp; Tracking Notice →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. GRANULAR PREFERENCES MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[560px] rounded-[30px] bg-[#FAF8F5] text-[#402E1D] p-6 sm:p-8 shadow-2xl border border-[#402E1D]/10 overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#402E1D]/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#876540]/10 flex items-center justify-center text-[#876540]">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-[19px] sm:text-[21px] text-[#1E140D]">
                      Cookie Preferences
                    </h2>
                    <p className="font-sans text-[11.5px] text-[#402E1D]/70">
                      Customize how Divine Lotus uses tracking technologies
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full bg-[#EFECE5] hover:bg-[#E5E0D8] flex items-center justify-center text-[#402E1D] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body with Categories */}
              <div className="py-4 space-y-3.5 overflow-y-auto flex-1 font-sans pr-1">
                {/* 1. Essential */}
                <div className="p-4 rounded-2xl bg-white border border-[#402E1D]/8">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[14px] text-[#1E140D]">
                      Essential Technologies
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#EFECE5] text-[#876540] uppercase tracking-wider">
                      Always Active
                    </span>
                  </div>
                  <p className="text-[12px] text-[#402E1D]/75 leading-relaxed">
                    Necessary for core website operations, security, shopping cart functions, and payment verification. These cannot be disabled.
                  </p>
                </div>

                {/* 2. Analytics */}
                <div className="p-4 rounded-2xl bg-white border border-[#402E1D]/8">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[14px] text-[#1E140D]">
                      Analytics &amp; Performance
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) =>
                          setPreferences({ ...preferences, analytics: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#E5E0D8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#876540]" />
                    </label>
                  </div>
                  <p className="text-[12px] text-[#402E1D]/75 leading-relaxed">
                    Helps us understand how visitors interact with the site (e.g. Google Analytics GA4) so we can measure traffic and improve page responsiveness.
                  </p>
                </div>

                {/* 3. Advertising */}
                <div className="p-4 rounded-2xl bg-white border border-[#402E1D]/8">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[14px] text-[#1E140D]">
                      Advertising &amp; Meta Pixel
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.advertising}
                        onChange={(e) =>
                          setPreferences({ ...preferences, advertising: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#E5E0D8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#876540]" />
                    </label>
                  </div>
                  <p className="text-[12px] text-[#402E1D]/75 leading-relaxed">
                    Measures the effectiveness of our campaigns on Instagram and Facebook (Meta Pixel) and supports relevant marketing without selling data.
                  </p>
                </div>
              </div>

              {/* Modal Footer Buttons */}
              <div className="pt-4 border-t border-[#402E1D]/10 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="w-full sm:w-auto px-4 py-2 rounded-full bg-[#EFECE5] hover:bg-[#E5E0D8] text-[#1E140D] font-sans text-[12px] font-semibold transition-colors cursor-pointer"
                >
                  Reject Non-Essential
                </button>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleSaveCustom}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-full bg-[#876540] hover:bg-[#6D5133] text-white font-sans text-[12px] font-semibold transition-colors cursor-pointer"
                  >
                    Save Preferences
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-full bg-[#1E140D] hover:bg-[#382618] text-white font-sans text-[12px] font-semibold transition-colors cursor-pointer"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
