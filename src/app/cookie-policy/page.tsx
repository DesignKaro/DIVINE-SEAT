"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { 
  Cookie, 
  Sparkles, 
  Clock, 
  Layers, 
  Mail, 
  ArrowRight, 
  HelpCircle, 
  AlertCircle, 
  ShieldCheck, 
  Sliders, 
  Lock, 
  Activity, 
  Target, 
  Settings,
  CheckCircle2
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cookieSections = [
  {
    id: "what-are-cookies",
    number: "01",
    title: "What Are Cookies?",
    content: (
      <>
        <p>
          Cookies are small pieces of information stored on or accessed from your device when you visit a website.
        </p>
        <p className="mt-2.5">
          They can help a website remember information, operate important functions, understand how visitors use the site, and measure marketing performance.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          We may also use similar technologies such as pixels, tags or local storage. For simplicity, this notice refers to these collectively as cookies and tracking technologies.
        </p>
      </>
    ),
  },
  {
    id: "essential-cookies",
    number: "02",
    title: "Essential Cookies",
    content: (
      <>
        <p className="mb-2">
          Some technologies are necessary for the website to function properly. They may be used for things such as:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 my-2.5 text-[13px] text-[#1E140D]">
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ Website security</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ Shopping cart & checkout</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ Session information</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ Fraud prevention</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ Payment functionality</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ Website stability</div>
        </div>
        <p className="text-[12.5px] text-[#402E1D]/80 mt-2.5">
          Where permitted by applicable law, these essential technologies may operate without optional consent because the website cannot function properly without them.
        </p>
      </>
    ),
  },
  {
    id: "analytics-cookies",
    number: "03",
    title: "Analytics Cookies",
    content: (
      <>
        <p>
          We may use analytics services such as Google Analytics (GA4) to understand how visitors use Divine Lotus. Analytics may help us understand:
        </p>
        <ul className="list-disc list-inside space-y-1.5 my-2.5 pl-1 text-[13.5px]">
          <li>How many people visit the website</li>
          <li>Which pages are viewed</li>
          <li>How visitors found us</li>
          <li>Which devices or browsers are used</li>
          <li>How visitors move through the website</li>
          <li>Whether important actions such as purchases or sign-ups are completed</li>
          <li>Where website performance can be improved</li>
        </ul>
        <div className="mt-3 p-3.5 rounded-2xl bg-[#EFECE5]">
          <p className="text-[12.5px] font-semibold text-[#876540]">
            Consent-Based Activation
          </p>
          <p className="text-[12.5px] text-[#402E1D]/80 mt-0.5">
            Where consent is legally required for these technologies, they will only operate after the appropriate permission has been provided.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "advertising-meta-pixel",
    number: "04",
    title: "Advertising & Meta Pixel",
    content: (
      <>
        <p>
          We may use advertising and measurement technologies such as Meta Pixel in connection with advertising on Instagram, Facebook and other Meta services.
        </p>
        <p className="mt-2.5">
          Subject to applicable privacy and consent requirements, this can help us understand actions such as:
        </p>
        <div className="my-3 p-3 rounded-xl bg-[#EFECE5] font-medium text-[#1E140D] text-[12.5px] sm:text-[13px] text-center">
          Ad viewed/clicked → Website visited → Product viewed → Added to cart → Checkout started → Purchase
        </div>
        <p className="text-[#402E1D]/85">
          This allows us to understand whether our advertising is actually working and may also support relevant advertising or retargeting. Advertising cookies will be treated as non-essential where required by applicable law.
        </p>
      </>
    ),
  },
  {
    id: "your-choices",
    number: "05",
    title: "Your Choices",
    content: (
      <>
        <p>
          Where required, visitors will be shown a cookie-consent control allowing them to make choices before non-essential tracking begins:
        </p>
        <div className="my-3 flex flex-wrap items-center gap-2 text-[12.5px]">
          <span className="px-3 py-1.5 rounded-full bg-[#EFECE5] font-bold text-[#1E140D]">Accept All</span>
          <span className="px-3 py-1.5 rounded-full bg-[#EFECE5] font-bold text-[#1E140D]">Reject Non-Essential</span>
          <span className="px-3 py-1.5 rounded-full bg-[#EFECE5] font-bold text-[#1E140D]">Manage Preferences</span>
        </div>
        <p className="font-medium text-[#1E140D] mb-1">Under Manage Preferences, you can control categories:</p>
        <ul className="list-disc list-inside space-y-1 pl-1 text-[13.5px]">
          <li><strong>Essential:</strong> Always Active</li>
          <li><strong>Analytics:</strong> Optional</li>
          <li><strong>Advertising:</strong> Optional</li>
        </ul>
        <p className="mt-3 text-[12.5px] font-semibold text-[#876540]">
          The website will not make rejecting optional tracking deliberately more difficult than accepting it.
        </p>
      </>
    ),
  },
  {
    id: "changing-your-mind",
    number: "06",
    title: "Changing Your Mind",
    content: (
      <>
        <p>
          Where technically and legally applicable, visitors can change or withdraw their cookie choices at any time.
        </p>
        <p className="mt-2.5">
          A permanent link <strong>Cookie Settings</strong> is placed in our website footer so you can modify your choices at any moment.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80 text-[12.5px]">
          Withdrawing consent will not affect processing that lawfully occurred before the preference was changed.
        </p>
      </>
    ),
  },
  {
    id: "third-party-services",
    number: "07",
    title: "Third-Party Services",
    content: (
      <>
        <p>
          Some cookies or tracking technologies may be provided by third parties whose services we use. These may include providers such as:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 my-2.5 text-[12.5px] text-[#1E140D]">
          <div className="p-2 rounded-lg bg-[#EFECE5]">Google</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">Meta</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">Payment providers</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">Hosting providers</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">E-commerce services</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">Customer support tools</div>
        </div>
        <p className="text-[12.5px] text-[#402E1D]/80 mt-2">
          The exact services used may change as Divine Lotus develops. Relevant third parties process information according to their own privacy policies and applicable agreements with us.
        </p>
      </>
    ),
  },
  {
    id: "cookie-duration",
    number: "08",
    title: "How Long Cookies Remain",
    content: (
      <>
        <p>Different cookies may remain for different periods:</p>
        <ul className="list-disc list-inside space-y-1.5 my-2.5 pl-1 text-[13.5px]">
          <li><strong>Session cookies:</strong> Disappear when your browser session ends.</li>
          <li><strong>Persistent cookies:</strong> Remain for a defined period so that preferences, analytics or permitted functions operate seamlessly across visits.</li>
        </ul>
        <p className="text-[#402E1D]/80 text-[12.5px]">
          Once the website’s technical setup evolves, our cookie-management system will provide detailed information about individual cookies and their duration where required.
        </p>
      </>
    ),
  },
  {
    id: "sell-personal-info",
    number: "09",
    title: "Do We Use Cookies to Sell Personal Information?",
    content: (
      <>
        <p>
          Divine Lotus does not sell personal information to advertisers in the ordinary meaning of selling customer information for money.
        </p>
        <p className="mt-2.5 text-[#402E1D]/85">
          However, some privacy laws use broader definitions for concepts such as sale, sharing or targeted advertising. Where such laws apply, we will provide the choices and disclosures required for the technologies we actually use.
        </p>
      </>
    ),
  },
  {
    id: "cookies-and-order",
    number: "10",
    title: "Cookies and Your Order",
    content: (
      <>
        <p className="font-semibold text-[#1E140D]">
          Rejecting optional analytics or advertising cookies will never prevent a customer from purchasing The Lotus Seat.
        </p>
        <p className="mt-2 text-[#402E1D]/80">
          Essential technologies required for cart functionality, security, payment verification and checkout will continue to operate as necessary.
        </p>
      </>
    ),
  },
  {
    id: "updates-to-notice",
    number: "11",
    title: "Updates to This Notice",
    content: (
      <>
        <p>
          This notice may change as we add or remove technologies from the website.
        </p>
        <p className="mt-2 text-[#402E1D]/80">
          The Last updated date at the top of this page indicates when the current version was revised.
        </p>
      </>
    ),
  },
];

export default function CookiePolicyPage() {
  const openPreferences = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-cookie-settings"));
    }
  };

  return (
    <main className="min-h-screen bg-[#ECE7DE] text-[#402E1D] flex flex-col justify-between overflow-x-clip">
      {/* Header */}
      <Header />

      {/* Hero Header Section with Sanctuary Glass Sheen & Frosted Overlay */}
      <section 
        data-header-theme="dark"
        className="relative pt-32 sm:pt-40 lg:pt-44 pb-14 sm:pb-18 px-4 sm:px-8 lg:px-16 text-white rounded-b-[22px] sm:rounded-b-[28px] lg:rounded-b-[34px] overflow-hidden border-b border-white/35 shadow-[inset_0_-1px_1px_rgba(255,255,255,0.5),inset_0_-24px_60px_rgba(255,255,255,0.15)]"
      >
        {/* Top Edge Specular White Sheen Line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-[3]" />

        {/* Bottom Edge Specular White Sheen Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-[3]" />

        {/* Ambient Top Inner White Glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[80%] max-w-[1000px] h-[140px] bg-white/20 rounded-full blur-3xl pointer-events-none z-[2]" />

        {/* Ambient Bottom Inner White Glow */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[80%] max-w-[1000px] h-[140px] bg-white/20 rounded-full blur-3xl pointer-events-none z-[2]" />

        {/* Sanctuary Gallery Lifestyle Background Image Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <Image
            src="/images/real-thing-bg-v2.avif"
            alt="Divine Lotus Sanctuary Environment"
            fill
            priority
            unoptimized
            className="object-cover object-center brightness-[0.92] contrast-[1.02] scale-[1.02]"
          />
          {/* Soft Scrim Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/30 to-black/45" />
        </div>

        {/* Hero Card Frosted Glass Overlay */}
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

        {/* Polished Mineral Curved Specular Reflection Layer */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: "radial-gradient(120% 90% at 85% 10%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)",
          }}
        />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-[1360px] mx-auto text-left"
        >
          {/* Eyebrow & Last Updated */}
          <motion.div variants={heroItemVariants} className="flex flex-wrap items-center gap-3 mb-2 sm:mb-4">
            <span className="font-sans text-[10.5px] sm:text-[12px] font-bold tracking-[0.18em] uppercase text-[#D8CCBD]">
              /COOKIE & TRACKING NOTICE
            </span>
            <span className="text-white/40 text-[11px]">•</span>
            <span className="font-sans text-[11px] sm:text-[12px] text-white/80 font-medium">
              Last updated: 01/09/2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={heroItemVariants}
            className="font-display font-semibold text-[28px] sm:text-[42px] md:text-[52px] lg:text-[62px] leading-[1.12] sm:leading-[1.08] text-white tracking-tight mb-3 sm:mb-4 max-w-[950px]"
          >
            Cookie & Tracking Notice
          </motion.h1>

          {/* Summary Lead */}
          <motion.p 
            variants={heroItemVariants}
            className="font-sans text-[13.5px] sm:text-[15.5px] md:text-[17px] leading-[1.6] sm:leading-[1.65] text-[#F0EBE3] max-w-[760px] mb-5 sm:mb-6"
          >
            Divine Lotus uses cookies and similar technologies to keep our website working, understand how it is used, and  - where you choose to allow it  - measure and improve our advertising.
          </motion.p>

          {/* Guarantee / Action Card */}
          <motion.div 
            variants={heroItemVariants}
            className="bg-white/12 backdrop-blur-md rounded-[22px] sm:rounded-[28px] p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 max-w-[820px]"
          >
            <div>
              <div className="font-display font-semibold text-[15px] sm:text-[18px] text-white mb-0.5">
                Your Privacy, Your Choice
              </div>
              <p className="font-sans text-[12px] sm:text-[13px] text-[#F0EBE3]/85 leading-relaxed">
                Essential cookies keep our site working. Analytics and advertising operate only with your consent.
              </p>
            </div>
            <button
              type="button"
              onClick={openPreferences}
              className="px-4 py-2 rounded-full bg-white text-[#1E140D] hover:bg-[#F6F3ED] font-sans text-[11.5px] sm:text-[12px] font-semibold transition-colors shrink-0 text-center self-start sm:self-auto cursor-pointer"
            >
              Manage Preferences
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content Layout */}
      <section data-header-theme="light" className="py-8 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-16 bg-[#ECE7DE]">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
          
          {/* Mobile Quick-Navigation Dropdown (Hidden on Desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden col-span-1"
          >
            <details className="group bg-white rounded-2xl p-4 sm:p-5 transition-all">
              <summary className="flex items-center justify-between cursor-pointer list-none font-display font-semibold text-[15px] sm:text-[16px] text-[#1E140D]">
                <span>Notice Index ({cookieSections.length} Sections)</span>
                <span className="text-[11px] font-bold text-[#876540] transition-transform duration-200 group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <nav className="mt-3 pt-3 border-t border-[#402E1D]/8 space-y-1 font-sans text-[12.5px]">
                {cookieSections.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center justify-between py-2 px-2.5 rounded-xl text-[#402E1D]/80 hover:text-[#1E140D] hover:bg-[#EFECE5] transition-colors"
                  >
                    <span className="truncate pr-2 font-medium">
                      {item.number}. {item.title}
                    </span>
                    <span className="text-[10.5px] font-bold text-[#876540] shrink-0">
                      Jump →
                    </span>
                  </a>
                ))}
              </nav>
            </details>
          </motion.div>

          {/* Desktop Left Column: Sticky Navigation (4 Cols) */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="hidden lg:block lg:col-span-4 lg:sticky lg:top-28 xl:top-32 self-start h-fit space-y-4"
          >
            <div className="bg-white rounded-[26px] p-5 sm:p-6">
              <div className="font-display font-semibold text-[17px] text-[#1E140D] mb-3.5">
                Notice Index
              </div>

              <nav className="space-y-1 font-sans text-[12.5px] max-h-[36vh] overflow-y-auto no-scrollbar">
                {cookieSections.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="group flex items-center justify-between p-2 rounded-xl text-[#402E1D]/70 hover:text-[#1E140D] hover:bg-[#EFECE5] transition-all duration-200"
                  >
                    <span className="truncate pr-2 font-medium">
                      {item.number}. {item.title}
                    </span>
                    <span className="text-[10.5px] font-bold text-[#876540] opacity-60 group-hover:opacity-100 shrink-0">
                      Jump →
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Quick Action Preferences Card */}
            <div className="p-5 rounded-[22px] bg-white text-[#402E1D] space-y-3">
              <div className="font-display font-semibold text-[15px] text-[#1E140D]">
                Manage Your Cookies
              </div>
              <p className="font-sans text-[12px] text-[#402E1D]/75 leading-relaxed">
                Adjust your privacy preferences for analytics and advertising tracking at any time.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={openPreferences}
                  className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                >
                  <svg
                    className="w-[214px] h-[42px]"
                    viewBox="0 0 236 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="btn-cookie-fill" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FAF7F2" />
                        <stop offset="50%" stopColor="#F4EFE9" />
                        <stop offset="100%" stopColor="#FAF7F2" />
                      </linearGradient>
                      <linearGradient id="btn-cookie-border" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="rgba(64, 46, 29, 0.15)" />
                        <stop offset="50%" stopColor="rgba(135, 101, 64, 0.35)" />
                        <stop offset="100%" stopColor="rgba(64, 46, 29, 0.15)" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 23 0 L 173 0 C 180 0 185 7 190 7 C 195 7 200 0 213 0 A 23 23 0 1 1 213 46 C 200 46 195 39 190 39 C 185 39 180 46 173 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                      fill="url(#btn-cookie-fill)"
                      stroke="url(#btn-cookie-border)"
                      strokeWidth="1.4"
                    />
                  </svg>

                  {/* Button Text */}
                  <div className="absolute left-0 top-0 bottom-0 w-[170px] flex items-center justify-center pointer-events-none px-2">
                    <span className="font-sans text-[11.5px] font-bold tracking-[0.02em] text-[#1E140D] truncate">
                      Cookie Preferences
                    </span>
                  </div>

                  {/* Button Right Bronze Circle with Settings Icon */}
                  <div className="absolute right-[3px] top-[3px] w-[36px] h-[36px] rounded-full bg-[#876540] flex items-center justify-center group-hover:bg-[#6D5133] transition-colors duration-300">
                    <Settings className="w-[15px] h-[15px] text-white stroke-[2.4] transition-transform duration-300 group-hover:rotate-45" />
                  </div>
                </button>
              </div>
            </div>
          </motion.aside>

          {/* Right Column: Policy Cards (8 Cols) */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6 font-sans">
            {/* Introductory Card */}
            <motion.section
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              className="bg-white rounded-[22px] sm:rounded-[30px] p-5 sm:p-7 lg:p-8"
            >
              <div className="flex items-center gap-2 mb-2 text-[#876540] font-medium text-[12px] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Transparent Tracking</span>
              </div>
              <p className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.7] text-[#402E1D]/90">
                Divine Lotus uses cookies and similar technologies to keep our website working, understand how it is used, and  - where you choose to allow it  - measure and improve our advertising.
              </p>
              <p className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.7] text-[#402E1D]/90 mt-2.5">
                We believe these technologies should be used transparently. Where applicable law requires your consent, non-essential cookies and tracking technologies will not be activated until that consent is provided.
              </p>
              <p className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.7] text-[#402E1D]/90 mt-2.5">
                Nothing in this notice limits privacy rights that cannot legally be excluded or restricted under applicable law.
              </p>
            </motion.section>

            {/* All 11 Sections */}
            {cookieSections.map((item) => (
              <motion.section
                key={item.id}
                id={item.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                className="scroll-mt-24 sm:scroll-mt-28 bg-white rounded-[22px] sm:rounded-[30px] p-5 sm:p-7 lg:p-8"
              >
                {/* Title */}
                <h2 className="font-display font-semibold text-[19px] sm:text-[22px] lg:text-[24px] text-[#1E140D] mb-2.5 sm:mb-3 leading-snug">
                  {item.number}. {item.title}
                </h2>

                {/* Body Content */}
                <div className="font-sans text-[13px] sm:text-[14px] lg:text-[14.5px] leading-[1.65] sm:leading-[1.7] text-[#402E1D]/85">
                  {item.content}
                </div>
              </motion.section>
            ))}

            {/* Mobile Bottom Contact Box */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden p-5 rounded-[22px] bg-white text-[#402E1D] space-y-3 mt-4"
            >
              <div className="font-display font-semibold text-[16px] text-[#1E140D]">
                Cookie Settings
              </div>
              <p className="font-sans text-[12.5px] text-[#402E1D]/80 leading-relaxed">
                Click below to update your cookie preferences at any time.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={openPreferences}
                  className="group relative inline-flex items-center select-none transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  <svg
                    className="w-[214px] h-[42px]"
                    viewBox="0 0 236 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="btn-cookie-mob-fill" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FAF7F2" />
                        <stop offset="50%" stopColor="#F3EFE8" />
                        <stop offset="100%" stopColor="#FAF7F2" />
                      </linearGradient>
                      <linearGradient id="btn-cookie-mob-border" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="rgba(64, 46, 29, 0.15)" />
                        <stop offset="50%" stopColor="rgba(135, 101, 64, 0.4)" />
                        <stop offset="100%" stopColor="rgba(64, 46, 29, 0.15)" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 23 0 L 173 0 C 180 0 185 7 190 7 C 195 7 200 0 213 0 A 23 23 0 1 1 213 46 C 200 46 195 39 190 39 C 185 39 180 46 173 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                      fill="url(#btn-cookie-mob-fill)"
                      stroke="url(#btn-cookie-mob-border)"
                      strokeWidth="1.4"
                    />
                  </svg>

                  <div className="absolute left-0 top-0 bottom-0 w-[170px] flex items-center justify-center pointer-events-none px-2">
                    <span className="font-sans text-[11.5px] font-bold tracking-[0.02em] text-[#1E140D] truncate">
                      Manage Preferences
                    </span>
                  </div>

                  <div className="absolute right-[3px] top-[3px] w-[36px] h-[36px] rounded-full bg-[#876540] flex items-center justify-center">
                    <Settings className="w-[15px] h-[15px] text-white stroke-[2.4]" />
                  </div>
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
