"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { 
  RotateCcw, 
  Sparkles, 
  Clock, 
  Truck, 
  PackageCheck, 
  ShieldCheck, 
  Layers, 
  Mail,
  ArrowRight,
  HelpCircle,
  Globe,
  AlertCircle,
  HeartHandshake
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

const refundSections = [
  {
    id: "change-of-mind",
    number: "01",
    title: "Change-of-Mind Returns",
    content: (
      <>
        <p>
          If you simply decide that The Lotus Seat is not right for you, you may request a return within <strong>14 days of delivery</strong>, subject to the consumer rights applicable in your country.
        </p>
        <p className="mt-3 mb-2 text-[#1E140D] font-medium">
          The product must be returned in a condition that allows us to offer it for resale. It should be:
        </p>
        <ul className="list-disc list-inside space-y-1.5 pl-1 text-[13.5px]">
          <li>Clean and free from stains, marks or damage</li>
          <li>Undamaged and complete</li>
          <li>Returned with the included accessories and additional cover</li>
          <li>Handled only to the extent reasonably necessary to inspect and understand the product</li>
        </ul>
        <p className="mt-3.5 text-[#402E1D]/80">
          Where legally permitted, the customer is responsible for the cost of returning the product.
        </p>
      </>
    ),
  },
  {
    id: "customised-seats",
    number: "02",
    title: "Customised Lotus Seats",
    content: (
      <>
        <p>
          The Custom Lotus Seat is made according to the colour/design selected by the customer.
        </p>
        <p className="mt-2.5">
          Because customised products may be made specifically for an individual order, change-of-mind returns may be restricted where applicable law permits.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          This does not affect your rights if the product is defective, damaged, incorrectly supplied or otherwise covered by mandatory consumer protection laws.
        </p>
      </>
    ),
  },
  {
    id: "damaged-defective",
    number: "03",
    title: "Damaged, Defective or Incorrect Products",
    content: (
      <>
        <p>
          We want every Lotus Seat to arrive as it was intended. If your order arrives:
        </p>
        <ul className="list-disc list-inside space-y-1.5 my-2.5 pl-1 text-[13.5px]">
          <li>Damaged during delivery</li>
          <li>Defective due to a manufacturing issue</li>
          <li>Incorrect</li>
          <li>Different from the product or configuration you ordered</li>
        </ul>
        <p>
          please contact us as soon as reasonably possible with your order number and photographs or other information showing the issue.
        </p>
        <div className="mt-3 p-3.5 rounded-2xl bg-[#EFECE5] border-l-2 border-[#876540]">
          <p className="font-semibold text-[#1E140D] text-[13.5px]">
            &ldquo;When the mistake is ours, making it right is ours too.&rdquo;
          </p>
          <p className="text-[12.5px] text-[#402E1D]/80 mt-1">
            Depending on the situation and applicable law, we may arrange a replacement, repair or refund at no additional cost to you.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "damaged-after-delivery",
    number: "04",
    title: "Products Damaged or Altered After Delivery",
    content: (
      <>
        <p>
          Products that have been damaged through misuse, accidents, improper washing or care, stains, cuts, burns, modifications or other customer-caused damage may not qualify for a change-of-mind return or replacement, except where mandatory consumer law provides otherwise.
        </p>
        <p className="mt-2.5">
          Normal wear and reasonable use are treated separately from manufacturing defects.
        </p>
      </>
    ),
  },
  {
    id: "how-to-request",
    number: "05",
    title: "How to Request a Return",
    content: (
      <>
        <p>
          To request a return, contact us at:
        </p>
        <div className="my-3 p-4 rounded-2xl bg-[#EFECE5]">
          <div className="text-[12px] font-bold text-[#876540] uppercase tracking-wider">Email Concierge</div>
          <a 
            href="mailto:theedivinelotuss@gmail.com"
            className="text-[#1E140D] hover:text-[#876540] font-bold text-[14px] transition-colors mt-0.5 inline-block"
          >
            theedivinelotuss@gmail.com
          </a>
        </div>
        <p className="font-medium text-[#1E140D] mb-1.5">Please include:</p>
        <ul className="list-disc list-inside space-y-1.5 pl-1 text-[13.5px] mb-3">
          <li>Order number</li>
          <li>Name used for the order</li>
          <li>Reason for the return</li>
          <li>Photographs/videos where relevant</li>
        </ul>
        <p className="text-[#402E1D]/85">
          We will provide the return instructions if your request is eligible.
        </p>
        <p className="mt-2 text-[12.5px] font-semibold text-[#876540]">
          Please do not send a product back without first receiving return instructions from us.
        </p>
      </>
    ),
  },
  {
    id: "return-shipping",
    number: "06",
    title: "Return Shipping",
    content: (
      <>
        <p>
          For a change-of-mind return, the customer is responsible for return shipping costs where permitted by applicable law.
        </p>
        <p className="mt-2.5">
          For a product that is defective, damaged on arrival, or incorrectly supplied by Divine Lotus, we will cover the reasonable return/replacement shipping costs where required.
        </p>
      </>
    ),
  },
  {
    id: "inspection",
    number: "07",
    title: "Inspection",
    content: (
      <>
        <p>
          Once the returned product reaches us, we may inspect its condition before processing the applicable refund or replacement.
        </p>
        <p className="mt-2.5">
          Where a reduction in refund is legally permitted because the product has been handled beyond what is reasonably necessary to inspect it, that reduction may apply.
        </p>
      </>
    ),
  },
  {
    id: "refunds",
    number: "08",
    title: "Refunds",
    content: (
      <>
        <p>
          Where a refund is approved, it will normally be sent to the original payment method used for the purchase.
        </p>
        <p className="mt-2.5">
          We will process eligible refunds as promptly as reasonably possible and within the period required by applicable law.
        </p>
        <p className="mt-2.5">
          Your bank, card issuer or payment provider may take additional time to reflect the refund in your account.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          Shipping charges, return costs, taxes or duties may be treated separately depending on the circumstances and the laws applicable to your purchase.
        </p>
      </>
    ),
  },
  {
    id: "pre-orders-production",
    number: "09",
    title: "Pre-Orders and Production",
    content: (
      <>
        <p>
          The first Lotus Seats may be offered as a pre-order while the initial production batch is being prepared.
        </p>
        <p className="mt-2.5">
          The estimated production/dispatch period will be stated on the product page at the time of purchase.
        </p>
        <p className="mt-2.5">
          If an unexpected delay occurs, we will communicate the revised timing and provide any cancellation or refund options required by applicable law.
        </p>
      </>
    ),
  },
  {
    id: "international-orders",
    number: "10",
    title: "International Orders",
    content: (
      <>
        <p>
          For international orders, customs duties, import taxes and other destination-country charges may apply unless clearly stated otherwise at checkout.
        </p>
        <p className="mt-2.5">
          These charges may not be refundable by Divine Lotus where they are imposed by the customer’s country or customs authority.
        </p>
      </>
    ),
  },
  {
    id: "our-commitment",
    number: "11",
    title: "Our Commitment",
    content: (
      <>
        <p>
          We are a young brand, and every customer matters to us. We want the process to be straightforward:
        </p>
        <ul className="list-disc list-inside space-y-2 mt-3 pl-1 text-[13.5px]">
          <li>If you’ve simply changed your mind, we’ll follow a fair return process.</li>
          <li>If something went wrong on our side, we’ll work to make it right.</li>
          <li>If a situation is covered by mandatory consumer law, those rights will always apply.</li>
        </ul>
      </>
    ),
  },
  {
    id: "contact",
    number: "12",
    title: "Contact",
    content: (
      <>
        <p>
          For any questions about returns or refunds:
        </p>
        <div className="mt-3.5 p-4 rounded-2xl bg-[#EFECE5] space-y-2">
          <div className="font-bold text-[#1E140D] text-[14px]">Divine Lotus</div>
          <div className="text-[13px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <span className="text-[#402E1D]/75">Email:</span>
            <a 
              href="mailto:theedivinelotuss@gmail.com"
              className="text-[#876540] hover:text-[#1E140D] font-bold transition-colors"
            >
              theedivinelotuss@gmail.com
            </a>
          </div>
          <div className="text-[13px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <span className="text-[#402E1D]/75">Website:</span>
            <a 
              href="https://thedivinelotus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#876540] hover:text-[#1E140D] font-bold transition-colors"
            >
              thedivinelotus.com
            </a>
          </div>
        </div>
      </>
    ),
  },
];

export default function RefundPolicyPage() {
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
            alt="Divine Lotus Room Environment"
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
              /RETURNS & REFUNDS POLICY
            </span>
            <span className="text-white/40 text-[11px]">•</span>
            <span className="font-sans text-[11px] sm:text-[12px] text-white/80 font-medium">
              Last updated: 01/09/2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={heroItemVariants}
            className="font-display font-semibold text-[28px] sm:text-[42px] md:text-[52px] lg:text-[62px] leading-[1.12] sm:leading-[1.08] text-white tracking-tight mb-3 sm:mb-4 max-w-[900px]"
          >
            Returns & Refunds Policy
          </motion.h1>

          {/* Summary Lead */}
          <motion.p 
            variants={heroItemVariants}
            className="font-sans text-[13.5px] sm:text-[15.5px] md:text-[17px] leading-[1.6] sm:leading-[1.65] text-[#F0EBE3] max-w-[760px] mb-5 sm:mb-6"
          >
            At Divine Lotus, we want you to feel comfortable not only while using The Lotus Seat, but also when ordering it. Our returns policy is designed to be fair to both you and us.
          </motion.p>

          {/* Guarantee Card */}
          <motion.div 
            variants={heroItemVariants}
            className="bg-white/12 backdrop-blur-md rounded-[22px] sm:rounded-[28px] p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 max-w-[820px]"
          >
            <div>
              <div className="font-display font-semibold text-[15px] sm:text-[18px] text-white mb-0.5">
                Fair & Transparent Protection
              </div>
              <p className="font-sans text-[12px] sm:text-[13px] text-[#F0EBE3]/85 leading-relaxed">
                14-day change-of-mind returns, customized seat guidelines, and prompt refund processing.
              </p>
            </div>
            <a
              href="#how-to-request"
              className="px-4 py-2 rounded-full bg-white text-[#1E140D] hover:bg-[#F6F3ED] font-sans text-[11.5px] sm:text-[12px] font-semibold transition-colors shrink-0 text-center self-start sm:self-auto"
            >
              How to Return
            </a>
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
                <span>Policy Index ({refundSections.length} Sections)</span>
                <span className="text-[11px] font-bold text-[#876540] transition-transform duration-200 group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <nav className="mt-3 pt-3 border-t border-[#402E1D]/8 space-y-1 font-sans text-[12.5px]">
                {refundSections.map((item) => (
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
                Policy Index
              </div>

              <nav className="space-y-1 font-sans text-[12.5px] max-h-[36vh] overflow-y-auto no-scrollbar">
                {refundSections.map((item) => (
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

            {/* Quick Action Contact Card */}
            <div className="p-5 rounded-[22px] bg-white text-[#402E1D] space-y-3">
              <div className="font-display font-semibold text-[15px] text-[#1E140D]">
                Need a Return?
              </div>
              <p className="font-sans text-[12px] text-[#402E1D]/75 leading-relaxed">
                Email our support desk with your order number and photos to receive instructions.
              </p>
              <div className="pt-1">
                <a
                  href="mailto:theedivinelotuss@gmail.com"
                  className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                >
                  <svg
                    className="w-[214px] h-[42px]"
                    viewBox="0 0 236 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="btn-refund-fill" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FAF7F2" />
                        <stop offset="50%" stopColor="#F4EFE9" />
                        <stop offset="100%" stopColor="#FAF7F2" />
                      </linearGradient>
                      <linearGradient id="btn-refund-border" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="rgba(64, 46, 29, 0.15)" />
                        <stop offset="50%" stopColor="rgba(135, 101, 64, 0.35)" />
                        <stop offset="100%" stopColor="rgba(64, 46, 29, 0.15)" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 23 0 L 173 0 C 180 0 185 7 190 7 C 195 7 200 0 213 0 A 23 23 0 1 1 213 46 C 200 46 195 39 190 39 C 185 39 180 46 173 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                      fill="url(#btn-refund-fill)"
                      stroke="url(#btn-refund-border)"
                      strokeWidth="1.4"
                    />
                  </svg>

                  {/* Button Text */}
                  <div className="absolute left-0 top-0 bottom-0 w-[170px] flex items-center justify-center pointer-events-none px-2">
                    <span className="font-sans text-[11.5px] font-bold tracking-[0.02em] text-[#1E140D] truncate">
                      Email Support Desk
                    </span>
                  </div>

                  {/* Button Right Bronze Circle with Arrow */}
                  <div className="absolute right-[3px] top-[3px] w-[36px] h-[36px] rounded-full bg-[#876540] flex items-center justify-center group-hover:bg-[#6D5133] transition-colors duration-300">
                    <ArrowRight className="w-[15px] h-[15px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </a>
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
                <span>Our Principles</span>
              </div>
              <p className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.7] text-[#402E1D]/90">
                At Divine Lotus, we want you to feel comfortable not only while using The Lotus Seat, but also when ordering it.
              </p>
              <p className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.7] text-[#402E1D]/90 mt-2.5">
                Our returns policy is designed to be fair to both you and us. Nothing in this policy limits any consumer rights that cannot legally be excluded or restricted under the laws that apply to your purchase.
              </p>
            </motion.section>

            {/* All 12 Sections */}
            {refundSections.map((item) => (
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
                Need a Return?
              </div>
              <p className="font-sans text-[12.5px] text-[#402E1D]/80 leading-relaxed">
                Contact our support team directly with your order number to receive return instructions.
              </p>
              <div className="pt-1">
                <a
                  href="mailto:theedivinelotuss@gmail.com"
                  className="group relative inline-flex items-center select-none transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  <svg
                    className="w-[214px] h-[42px]"
                    viewBox="0 0 236 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="btn-refund-mob-fill" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FAF7F2" />
                        <stop offset="50%" stopColor="#F3EFE8" />
                        <stop offset="100%" stopColor="#FAF7F2" />
                      </linearGradient>
                      <linearGradient id="btn-refund-mob-border" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="rgba(64, 46, 29, 0.15)" />
                        <stop offset="50%" stopColor="rgba(135, 101, 64, 0.4)" />
                        <stop offset="100%" stopColor="rgba(64, 46, 29, 0.15)" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 23 0 L 173 0 C 180 0 185 7 190 7 C 195 7 200 0 213 0 A 23 23 0 1 1 213 46 C 200 46 195 39 190 39 C 185 39 180 46 173 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                      fill="url(#btn-refund-mob-fill)"
                      stroke="url(#btn-refund-mob-border)"
                      strokeWidth="1.4"
                    />
                  </svg>

                  <div className="absolute left-0 top-0 bottom-0 w-[170px] flex items-center justify-center pointer-events-none px-2">
                    <span className="font-sans text-[11.5px] font-bold tracking-[0.02em] text-[#1E140D] truncate">
                      Email Support Desk
                    </span>
                  </div>

                  <div className="absolute right-[3px] top-[3px] w-[36px] h-[36px] rounded-full bg-[#876540] flex items-center justify-center">
                    <ArrowRight className="w-[15px] h-[15px] text-white stroke-[2.4]" />
                  </div>
                </a>
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
