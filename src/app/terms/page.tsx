"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { 
  FileText, 
  Sparkles, 
  PackageCheck, 
  CreditCard, 
  Truck, 
  RotateCcw, 
  ShieldAlert, 
  Scale, 
  HeartHandshake, 
  Compass,
  ArrowRight
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

const termSections = [
  {
    id: "agreement",
    number: "01",
    title: "Agreement to Terms",
    content: (
      <>
        <p>
          By accessing this website, configuring a seat, or placing an order with Divine Lotus, you agree to be bound by these Terms and Conditions, our Privacy Policy, and our Refund Policy.
        </p>
      </>
    ),
  },
  {
    id: "materials",
    number: "02",
    title: "Materials & Natural Variations",
    content: (
      <>
        <p className="mb-2">
          The Lotus Seat is manufactured with natural, renewable materials:
        </p>
        <div className="space-y-2.5 my-3">
          <div className="p-3.5 rounded-2xl bg-[#EFECE5]">
            <div className="font-bold text-[#1E140D] text-[13px] mb-0.5">
              Cork Base Foundation
            </div>
            <p className="text-[12.5px] leading-relaxed text-[#402E1D]/80">
              Molded from natural Portuguese cork. Minor variations in grain, tone, and aggregation are natural characteristics of cork material.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#EFECE5]">
            <div className="font-bold text-[#1E140D] text-[13px] mb-0.5">
              Botanical Latex Core
            </div>
            <p className="text-[12.5px] leading-relaxed text-[#402E1D]/80">
              Made from natural rubber tree sap with pin-core venting for durable posture rebound.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#EFECE5]">
            <div className="font-bold text-[#1E140D] text-[13px] mb-0.5">
              Fabric Cover
            </div>
            <p className="text-[12.5px] leading-relaxed text-[#402E1D]/80">
              Zippered removable cover made of durable linen-blend textile.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "orders-production",
    number: "03",
    title: "Orders & Small-Batch Production",
    content: (
      <>
        <p>
          The Lotus Seat is produced in limited small batches. Orders and batch reservations are fulfilled in the order received.
        </p>
        <p className="mt-2.5">
          Estimated shipping dates provided during checkout represent our expected production timeline. If any component delay occurs, we will notify you by email with updated delivery schedules.
        </p>
      </>
    ),
  },
  {
    id: "pricing-payment",
    number: "04",
    title: "Pricing & Payments",
    content: (
      <>
        <p>
          Prices are listed in USD or EUR as shown at checkout. Full payment is required at the time of purchase or pre-order reservation.
        </p>
        <p className="mt-2.5">
          We accept major credit cards (Visa, MasterCard, American Express), Apple Pay, and Google Pay through secure payment gateways.
        </p>
      </>
    ),
  },
  {
    id: "shipping-delivery",
    number: "05",
    title: "Shipping & Customs",
    content: (
      <>
        <p>
          We ship worldwide via insured express couriers (DHL Express, FedEx, UPS). Real-time tracking information is sent upon dispatch.
        </p>
        <p className="mt-2.5">
          For orders delivered outside the EU, US, and UK, import duties and local taxes may be assessed by local customs authorities and are the responsibility of the recipient.
        </p>
      </>
    ),
  },
  {
    id: "trial-period",
    number: "06",
    title: "30-Day Practice Trial",
    content: (
      <>
        <p>
          All standard orders include a 30-day practice trial from the date of delivery. If the seat does not meet your ergonomic needs, you may return it within 30 days for a full refund in accordance with our <Link href="/refund-policy" className="text-[#876540] font-bold underline hover:text-[#1E140D]">Refund Policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "warranty",
    number: "07",
    title: "3-Year Structural Warranty",
    content: (
      <>
        <p className="mb-2">
          Divine Lotus provides a 3-Year Limited Structural Warranty covering:
        </p>
        <ul className="list-disc list-inside space-y-1.5 pl-1 text-[13.5px]">
          <li>Structural cracking or breakage of the cork base foundation under normal indoor meditation use.</li>
          <li>Abnormal permanent compression or core breakdown of the botanical latex cushion exceeding 25% of original height.</li>
        </ul>
        <p className="mt-2.5">
          The warranty does not cover normal cosmetic wear, textile staining, pet damage, improper outdoor storage, or use of harsh chemical cleaners.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    number: "08",
    title: "Intellectual Property",
    content: (
      <>
        <p>
          The seat design, pelvic tilt angle geometry, tailbone relief groove profile, 3D customizer tools, images, and brand trademarks are the proprietary intellectual property of Divine Lotus.
        </p>
        <p className="mt-2">
          Unauthorized commercial reproduction, copying, or reverse engineering is prohibited.
        </p>
      </>
    ),
  },
  {
    id: "health-disclaimer",
    number: "09",
    title: "Ergonomic & Health Disclaimer",
    content: (
      <>
        <p>
          The Lotus Seat is designed for ergonomic posture support during sitting and meditation. It is not a medical device and is not intended to treat, cure, or diagnose acute spinal injuries, medical conditions, or chronic orthopedic ailments.
        </p>
        <p className="mt-2.5">
          If you have pre-existing spinal conditions or medical injuries, please consult your physician or physical therapist before beginning an extended meditation routine.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    number: "10",
    title: "Governing Law & Contact",
    content: (
      <>
        <p>
          These Terms are governed by the laws of Switzerland and the European Union.
        </p>
        <div className="mt-3 p-4 rounded-2xl bg-[#EFECE5]">
          <div className="font-bold text-[#1E140D] text-[13.5px]">Divine Lotus Concierge</div>
          <a 
            href="mailto:concierge@divinelotus.com"
            className="text-[#876540] hover:text-[#1E140D] font-bold text-[13px] transition-colors mt-1 block"
          >
            concierge@divinelotus.com
          </a>
        </div>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#ECE7DE] text-[#402E1D] flex flex-col justify-between overflow-x-clip">
      {/* Header */}
      <Header />

      {/* Hero Header Section with Exact Footer Background, Frosted Glass Overlay, and Rounded Bottom */}
      <section 
        data-header-theme="dark"
        className="relative pt-32 sm:pt-40 lg:pt-44 pb-14 sm:pb-18 px-4 sm:px-8 lg:px-16 text-white rounded-b-[22px] sm:rounded-b-[28px] lg:rounded-b-[34px] overflow-hidden border-b border-white/35 shadow-[inset_0_-1px_1px_rgba(255,255,255,0.5),inset_0_-24px_60px_rgba(255,255,255,0.15)]"
      >
        {/* Top Edge Specular White Sheen Line (Exact same as Footer) */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-[3]" />

        {/* Bottom Edge Specular White Sheen Line (Footer Rounded Edge Specular) */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-[3]" />

        {/* Ambient Top Inner White Glow (Exact same as Footer) */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[80%] max-w-[1000px] h-[140px] bg-white/20 rounded-full blur-3xl pointer-events-none z-[2]" />

        {/* Ambient Bottom Inner White Glow */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[80%] max-w-[1000px] h-[140px] bg-white/20 rounded-full blur-3xl pointer-events-none z-[2]" />

        {/* Sanctuary Gallery Lifestyle Background Image Layer (Exact same as Footer) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <Image
            src="/images/real-thing-bg-v2.png"
            alt="Divine Lotus Room Environment"
            fill
            priority
            unoptimized
            className="object-cover object-center brightness-[0.92] contrast-[1.02] scale-[1.02]"
          />
          {/* Soft Scrim Gradient (Exact same as Footer) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/30 to-black/45" />
        </div>

        {/* Hero Card Frosted Glass Overlay (Exact same as Footer) */}
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

        {/* Polished Mineral Curved Specular Reflection Layer (Exact same as Footer) */}
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
          {/* Eyebrow */}
          <motion.div variants={heroItemVariants} className="flex items-center gap-2 mb-2 sm:mb-4">
            <span className="font-sans text-[10.5px] sm:text-[12px] font-bold tracking-[0.18em] uppercase text-[#D8CCBD]">
              /TERMS & CONDITIONS
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={heroItemVariants}
            className="font-display font-semibold text-[28px] sm:text-[42px] md:text-[52px] lg:text-[62px] leading-[1.12] sm:leading-[1.08] text-white tracking-tight mb-3 sm:mb-4 max-w-[900px]"
          >
            Terms & Conditions
          </motion.h1>

          {/* Summary Lead */}
          <motion.p 
            variants={heroItemVariants}
            className="font-sans text-[13.5px] sm:text-[15.5px] md:text-[17px] leading-[1.6] sm:leading-[1.65] text-[#F0EBE3] max-w-[720px] mb-5 sm:mb-6"
          >
            Commercial terms of sale, 3-year structural warranty details, and website usage policies.
          </motion.p>

          {/* Metadata Badges */}
          <motion.div variants={heroItemVariants} className="flex items-center gap-2 sm:gap-3 flex-wrap font-sans text-[11px] sm:text-[12.5px] text-white/90 font-medium">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white">
              Last updated: January 2026
            </span>
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white">
              3-Year Warranty Included
            </span>
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
                <span>Terms Index ({termSections.length} Sections)</span>
                <span className="text-[11px] font-bold text-[#876540] transition-transform duration-200 group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <nav className="mt-3 pt-3 border-t border-[#402E1D]/8 space-y-1 font-sans text-[12.5px]">
                {termSections.map((item) => (
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
                Terms Index
              </div>

              <nav className="space-y-1 font-sans text-[12.5px]">
                {termSections.map((item) => (
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

            {/* Warranty Info Card */}
            <div className="p-5 rounded-[22px] bg-white text-[#402E1D] space-y-3">
              <div className="font-display font-semibold text-[15px] text-[#1E140D]">
                3-Year Warranty
              </div>
              <p className="font-sans text-[12px] text-[#402E1D]/75 leading-relaxed">
                Coverage for cork base and botanical latex core against structural failure under normal use.
              </p>
              <div className="pt-1">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                >
                  <svg
                    className="w-[214px] h-[42px]"
                    viewBox="0 0 236 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="btn-terms-fill" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FAF7F2" />
                        <stop offset="50%" stopColor="#F4EFE9" />
                        <stop offset="100%" stopColor="#FAF7F2" />
                      </linearGradient>
                      <linearGradient id="btn-terms-border" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="rgba(64, 46, 29, 0.15)" />
                        <stop offset="50%" stopColor="rgba(135, 101, 64, 0.35)" />
                        <stop offset="100%" stopColor="rgba(64, 46, 29, 0.15)" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 23 0 L 173 0 C 180 0 185 7 190 7 C 195 7 200 0 213 0 A 23 23 0 1 1 213 46 C 200 46 195 39 190 39 C 185 39 180 46 173 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                      fill="url(#btn-terms-fill)"
                      stroke="url(#btn-terms-border)"
                      strokeWidth="1.4"
                    />
                  </svg>

                  {/* Button Text */}
                  <div className="absolute left-0 top-0 bottom-0 w-[170px] flex items-center justify-center pointer-events-none px-2">
                    <span className="font-sans text-[11.5px] font-bold tracking-[0.02em] text-[#1E140D] truncate">
                      Contact Concierge
                    </span>
                  </div>

                  {/* Button Right Bronze Circle with Arrow */}
                  <div className="absolute right-[3px] top-[3px] w-[36px] h-[36px] rounded-full bg-[#876540] flex items-center justify-center group-hover:bg-[#6D5133] transition-colors duration-300">
                    <ArrowRight className="w-[15px] h-[15px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </div>
            </div>
          </motion.aside>

          {/* Right Column: Term Cards (8 Cols) */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6 font-sans">
            {termSections.map((item) => (
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
                3-Year Warranty & Inquiries
              </div>
              <p className="font-sans text-[12.5px] text-[#402E1D]/80 leading-relaxed">
                Connect with our concierge team for custom configurations, warranty questions, or order support.
              </p>
              <div className="pt-1">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center select-none transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  <svg
                    className="w-[214px] h-[42px]"
                    viewBox="0 0 236 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="btn-terms-mob-fill" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FAF7F2" />
                        <stop offset="50%" stopColor="#F3EFE8" />
                        <stop offset="100%" stopColor="#FAF7F2" />
                      </linearGradient>
                      <linearGradient id="btn-terms-mob-border" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="rgba(64, 46, 29, 0.15)" />
                        <stop offset="50%" stopColor="rgba(135, 101, 64, 0.4)" />
                        <stop offset="100%" stopColor="rgba(64, 46, 29, 0.15)" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 23 0 L 173 0 C 180 0 185 7 190 7 C 195 7 200 0 213 0 A 23 23 0 1 1 213 46 C 200 46 195 39 190 39 C 185 39 180 46 173 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                      fill="url(#btn-terms-mob-fill)"
                      stroke="url(#btn-terms-mob-border)"
                      strokeWidth="1.4"
                    />
                  </svg>

                  <div className="absolute left-0 top-0 bottom-0 w-[170px] flex items-center justify-center pointer-events-none px-2">
                    <span className="font-sans text-[11.5px] font-bold tracking-[0.02em] text-[#1E140D] truncate">
                      Contact Concierge
                    </span>
                  </div>

                  <div className="absolute right-[3px] top-[3px] w-[36px] h-[36px] rounded-full bg-[#876540] flex items-center justify-center">
                    <ArrowRight className="w-[15px] h-[15px] text-white stroke-[2.4]" />
                  </div>
                </Link>
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
