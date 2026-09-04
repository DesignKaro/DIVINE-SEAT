"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Truck, 
  PackageCheck, 
  Layers, 
  Mail,
  ArrowRight,
  HelpCircle,
  AlertCircle,
  HeartHandshake,
  Camera,
  CheckCircle2,
  Hammer,
  Gift
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

const warrantySections = [
  {
    id: "manufacturing-defects",
    number: "01",
    title: "Manufacturing Defects",
    content: (
      <>
        <p>
          If your Lotus Seat develops or arrives with a genuine manufacturing defect, please contact Divine Lotus with your:
        </p>
        <ul className="list-disc list-inside space-y-1.5 my-2.5 pl-1 text-[13.5px]">
          <li>Name</li>
          <li>Order number</li>
          <li>Description of the problem</li>
          <li>Clear photographs or videos showing the issue</li>
        </ul>
        <div className="my-3 p-3.5 rounded-2xl bg-[#EFECE5] flex items-center justify-between font-semibold text-[#1E140D] text-[13.5px]">
          <span>Available Remedies:</span>
          <span className="text-[#876540]">Repair · Replacement · Refund</span>
        </div>
        <p className="text-[12.5px] text-[#402E1D]/80">
          We may ask for additional information where reasonably necessary to understand the issue.
        </p>
      </>
    ),
  },
  {
    id: "what-is-a-defect",
    number: "02",
    title: "What May Be Considered a Manufacturing Defect",
    content: (
      <>
        <p className="mb-2">
          Depending on the circumstances, this may include issues such as:
        </p>
        <ul className="list-disc list-inside space-y-1.5 pl-1 text-[13.5px]">
          <li>Structural failure of the base</li>
          <li>Significant defects in the latex cushion</li>
          <li>Stitching failure</li>
          <li>Zipper failure</li>
          <li>Cover defects present upon delivery</li>
          <li>Incorrect assembly</li>
          <li>Product materially different from what was ordered</li>
          <li>Other faults resulting from manufacturing rather than normal use</li>
        </ul>
        <p className="mt-3 text-[13px] text-[#402E1D]/85">
          Minor variations in natural materials, fabric texture, cork appearance, stitching or colour that do not materially affect the product’s intended use are not necessarily manufacturing defects.
        </p>
      </>
    ),
  },
  {
    id: "damage-during-delivery",
    number: "03",
    title: "Damage During Delivery",
    content: (
      <>
        <p>
          If your Lotus Seat arrives damaged, please contact us as soon as reasonably possible.
        </p>
        <p className="mt-2.5 font-medium text-[#1E140D]">Please keep:</p>
        <div className="grid grid-cols-2 gap-2 my-2.5 text-[12.5px] text-[#1E140D]">
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ The product</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ Premium product box</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ Outer shipping carton</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ Protective packaging</div>
        </div>
        <p className="mt-3 font-medium text-[#1E140D]">and take clear photographs of:</p>
        <ul className="list-disc list-inside space-y-1 my-2 pl-1 text-[13.5px]">
          <li>Outer carton</li>
          <li>Shipping label</li>
          <li>Damaged packaging</li>
          <li>Product damage</li>
        </ul>
        <p className="text-[12.5px] text-[#402E1D]/80">
          This helps us understand what happened and, where necessary, raise the issue with the courier.
        </p>
      </>
    ),
  },
  {
    id: "wrong-product",
    number: "04",
    title: "If We Sent the Wrong Product",
    content: (
      <>
        <p>If you receive:</p>
        <ul className="list-disc list-inside space-y-1.5 my-2.5 pl-1 text-[13.5px]">
          <li>The wrong Lotus Seat version</li>
          <li>The wrong colour/design</li>
          <li>Missing included items</li>
          <li>An incorrect cover</li>
          <li>Another product different from your confirmed order</li>
        </ul>
        <p>please contact us.</p>
        <div className="mt-3 p-3.5 rounded-2xl bg-[#EFECE5] border-l-2 border-[#876540]">
          <p className="font-semibold text-[#1E140D] text-[13.5px]">
            &ldquo;When the mistake is ours, making it right is ours too.&rdquo;
          </p>
          <p className="text-[12.5px] text-[#402E1D]/80 mt-1">
            We will arrange an appropriate correction at no additional cost to you, subject to applicable law.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "not-a-defect",
    number: "05",
    title: "What Is Not Normally Considered a Defect",
    content: (
      <>
        <p className="mb-2">
          Unless applicable consumer law provides otherwise, this policy does not normally cover damage resulting from:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 my-2.5 text-[13px] text-[#1E140D]">
          <div className="p-2 rounded-lg bg-[#EFECE5]">• Accidents</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">• Improper use</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">• Incorrect washing or cleaning</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">• Failure to follow care instructions</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">• Cuts, burns or tears after delivery</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">• Stains or liquid damage</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">• Pet damage</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">• Deliberate modification</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">• Improper storage</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">• Excessive or unintended loading</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">• Normal wear with regular use</div>
        </div>
        <p className="text-[#402E1D]/85 mt-2.5 text-[13px]">
          Natural materials may also develop subtle visual changes with age and use. Such changes are not necessarily defects.
        </p>
      </>
    ),
  },
  {
    id: "natural-latex",
    number: "06",
    title: "Natural Latex",
    content: (
      <>
        <p>
          Natural latex is a responsive material and may change subtly with prolonged use and age.
        </p>
        <p className="mt-2.5">
          Normal settling or minor changes that do not materially affect the intended function of the seat are not automatically considered manufacturing defects.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          Significant abnormal deterioration will be assessed according to the circumstances and applicable consumer rights.
        </p>
      </>
    ),
  },
  {
    id: "cork-foundation",
    number: "07",
    title: "Cork-Composite Base",
    content: (
      <>
        <p>
          The cork-composite foundation is intended to provide the structural support and geometry of The Lotus Seat.
        </p>
        <p className="mt-2.5">
          Natural variations in cork colour, granulation and appearance are part of the character of the material.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          Structural cracking, separation or other abnormal failure that results from manufacturing will be assessed separately from cosmetic variation or customer-caused damage.
        </p>
      </>
    ),
  },
  {
    id: "covers-zippers",
    number: "08",
    title: "Covers, Stitching & Zippers",
    content: (
      <>
        <p>
          Removable covers are subject to normal wear over time. Manufacturing defects in stitching, fabric construction or zippers will be considered according to the circumstances.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          Damage caused by incorrect washing, harsh chemicals, excessive heat, improper handling or use contrary to the care instructions may not qualify as a manufacturing defect.
        </p>
      </>
    ),
  },
  {
    id: "inspection",
    number: "09",
    title: "Inspection",
    content: (
      <>
        <p>
          Where necessary, we may ask for photographs, video, additional information or return of the affected product so that the issue can be inspected.
        </p>
        <p className="mt-2.5 font-medium text-[#1E140D]">
          We will not reject a genuine claim simply because the customer cannot diagnose the technical cause of the problem.
        </p>
        <p className="mt-2 text-[#402E1D]/85">
          The customer only needs to reasonably explain and demonstrate what has gone wrong.
        </p>
      </>
    ),
  },
  {
    id: "resolution",
    number: "10",
    title: "Resolution",
    content: (
      <>
        <p className="mb-2">Once the issue has been assessed, an appropriate solution may include:</p>
        <div className="space-y-2 my-3 text-[13px]">
          <div className="p-3 rounded-xl bg-[#EFECE5]">
            <span className="font-bold text-[#1E140D] block mb-0.5">Repair</span>
            <span className="text-[#402E1D]/80">Where the issue can reasonably and properly be repaired.</span>
          </div>
          <div className="p-3 rounded-xl bg-[#EFECE5]">
            <span className="font-bold text-[#1E140D] block mb-0.5">Replacement part or cover</span>
            <span className="text-[#402E1D]/80">Where only a particular component is affected.</span>
          </div>
          <div className="p-3 rounded-xl bg-[#EFECE5]">
            <span className="font-bold text-[#1E140D] block mb-0.5">Replacement seat</span>
            <span className="text-[#402E1D]/80">Where replacement is the appropriate solution.</span>
          </div>
          <div className="p-3 rounded-xl bg-[#EFECE5]">
            <span className="font-bold text-[#1E140D] block mb-0.5">Refund</span>
            <span className="text-[#402E1D]/80">Where required or appropriate under the circumstances and applicable law.</span>
          </div>
        </div>
        <p className="text-[12.5px] text-[#402E1D]/80">
          The appropriate remedy may depend on the nature and severity of the defect, availability of replacement products and the consumer rights applicable to the purchase.
        </p>
      </>
    ),
  },
  {
    id: "costs-brand-covered",
    number: "11",
    title: "Costs When the Problem Is Ours",
    content: (
      <>
        <p>
          Where a product is confirmed to be defective, damaged during delivery, or incorrectly supplied by Divine Lotus, the customer will not be expected to bear reasonable corrective shipping costs where we are responsible or applicable law requires us to cover them.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          We may provide a prepaid return method, arrange collection, reimburse reasonable approved return costs, or use another appropriate solution depending on the customer’s location.
        </p>
      </>
    ),
  },
  {
    id: "goodwill-gesture",
    number: "12",
    title: "A Small Gesture When Things Go Wrong",
    content: (
      <>
        <p>
          A replacement or refund fixes the transaction. Sometimes we may want to do a little more.
        </p>
        <div className="my-3 p-3.5 rounded-2xl bg-[#EFECE5] flex items-start gap-3">
          <Gift className="w-5 h-5 text-[#876540] shrink-0 mt-0.5" />
          <p className="text-[13px] text-[#1E140D] leading-relaxed">
            Where a customer has experienced a significant inconvenience because of an error on our side, Divine Lotus may choose to provide an additional gesture of goodwill, such as a complimentary accessory, credit, upgraded shipping or another appropriate gesture.
          </p>
        </div>
        <p className="text-[12.5px] text-[#402E1D]/80">
          Such gestures are discretionary and separate from the customer’s legal rights and the remedies owed for the underlying problem.
        </p>
      </>
    ),
  },
  {
    id: "commercial-warranty",
    number: "13",
    title: "Commercial Warranty",
    content: (
      <>
        <p>
          At this stage, Divine Lotus does not make an additional fixed-duration commercial warranty promise beyond the rights and remedies described in this policy and any mandatory statutory guarantees that apply to the customer.
        </p>
        <p className="mt-2.5">
          As we gather longer-term information from production and real-world use, we may introduce a separate commercial warranty in the future.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          Any future commercial warranty will supplement  - not replace  - mandatory consumer rights.
        </p>
      </>
    ),
  },
  {
    id: "international-customers",
    number: "14",
    title: "International Customers",
    content: (
      <>
        <p>
          Consumer guarantees and warranty rights differ between countries. Customers may have statutory rights in their country that provide additional remedies or protection beyond this policy.
        </p>
        <p className="mt-2.5 font-medium text-[#876540]">
          Nothing in this policy limits rights that cannot legally be excluded or restricted.
        </p>
      </>
    ),
  },
  {
    id: "making-a-claim",
    number: "15",
    title: "Making a Claim",
    content: (
      <>
        <p>
          For a warranty, damage or defective-product claim, contact:
        </p>
        <div className="my-3.5 p-4 rounded-2xl bg-[#EFECE5] space-y-1.5">
          <div className="font-bold text-[#1E140D] text-[14px]">Divine Lotus Claims Desk</div>
          <div className="text-[13px]">
            <span className="text-[#402E1D]/75">Email:</span>{" "}
            <a href="mailto:theedivinelotuss@gmail.com" className="text-[#876540] hover:text-[#1E140D] font-bold transition-colors">
              theedivinelotuss@gmail.com
            </a>
          </div>
        </div>
        <p className="text-[12.5px] text-[#402E1D]/80">
          Please include your order number and enough information for us to understand the issue.
        </p>
      </>
    ),
  },
];

export default function WarrantyPolicyPage() {
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
              /WARRANTY & DAMAGED PRODUCTS POLICY
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
            Warranty & Damaged Products Policy
          </motion.h1>

          {/* Summary Lead */}
          <motion.p 
            variants={heroItemVariants}
            className="font-sans text-[13.5px] sm:text-[15.5px] md:text-[17px] leading-[1.6] sm:leading-[1.65] text-[#F0EBE3] max-w-[760px] mb-5 sm:mb-6"
          >
            Every Lotus Seat is made to become part of a regular practice. If something is genuinely wrong with the product because of manufacturing, packing, or delivery, we’ll work with you to make it right.
          </motion.p>

          {/* Guarantee Card */}
          <motion.div 
            variants={heroItemVariants}
            className="bg-white/12 backdrop-blur-md rounded-[22px] sm:rounded-[28px] p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 max-w-[820px]"
          >
            <div>
              <div className="font-display font-semibold text-[15px] sm:text-[18px] text-white mb-0.5">
                Our Guarantee: We Make It Right
              </div>
              <p className="font-sans text-[12px] sm:text-[13px] text-[#F0EBE3]/85 leading-relaxed">
                Coverage for manufacturing defects, transit damage, and incorrect shipments with zero customer corrective fees.
              </p>
            </div>
            <a
              href="#making-a-claim"
              className="px-4 py-2 rounded-full bg-white text-[#1E140D] hover:bg-[#F6F3ED] font-sans text-[11.5px] sm:text-[12px] font-semibold transition-colors shrink-0 text-center self-start sm:self-auto"
            >
              Make a Claim
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
                <span>Policy Index ({warrantySections.length} Sections)</span>
                <span className="text-[11px] font-bold text-[#876540] transition-transform duration-200 group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <nav className="mt-3 pt-3 border-t border-[#402E1D]/8 space-y-1 font-sans text-[12.5px]">
                {warrantySections.map((item) => (
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
                {warrantySections.map((item) => (
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
                Have a Claim?
              </div>
              <p className="font-sans text-[12px] text-[#402E1D]/75 leading-relaxed">
                Contact our claims desk with your order number and photos to initiate an assessment.
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
                      <linearGradient id="btn-warranty-fill" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FAF7F2" />
                        <stop offset="50%" stopColor="#F4EFE9" />
                        <stop offset="100%" stopColor="#FAF7F2" />
                      </linearGradient>
                      <linearGradient id="btn-warranty-border" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="rgba(64, 46, 29, 0.15)" />
                        <stop offset="50%" stopColor="rgba(135, 101, 64, 0.35)" />
                        <stop offset="100%" stopColor="rgba(64, 46, 29, 0.15)" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 23 0 L 173 0 C 180 0 185 7 190 7 C 195 7 200 0 213 0 A 23 23 0 1 1 213 46 C 200 46 195 39 190 39 C 185 39 180 46 173 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                      fill="url(#btn-warranty-fill)"
                      stroke="url(#btn-warranty-border)"
                      strokeWidth="1.4"
                    />
                  </svg>

                  {/* Button Text */}
                  <div className="absolute left-0 top-0 bottom-0 w-[170px] flex items-center justify-center pointer-events-none px-2">
                    <span className="font-sans text-[11.5px] font-bold tracking-[0.02em] text-[#1E140D] truncate">
                      Email Claims Desk
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
                <span>Our Quality Commitment</span>
              </div>
              <p className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.7] text-[#402E1D]/90">
                Every Lotus Seat is made to become part of a regular practice, and we want it to arrive and perform as it should.
              </p>
              <p className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.7] text-[#402E1D]/90 mt-2.5 font-semibold text-[#1E140D]">
                If something is genuinely wrong with the product because of manufacturing, packing, or delivery, we’ll work with you to make it right.
              </p>
              <p className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.7] text-[#402E1D]/90 mt-2.5">
                Nothing in this policy limits any consumer rights or statutory guarantees that cannot legally be excluded or restricted under applicable law.
              </p>
            </motion.section>

            {/* All 15 Sections */}
            {warrantySections.map((item) => (
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
                Have a Claim?
              </div>
              <p className="font-sans text-[12.5px] text-[#402E1D]/80 leading-relaxed">
                Contact our claims desk directly with your order number and photographs.
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
                      <linearGradient id="btn-warranty-mob-fill" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FAF7F2" />
                        <stop offset="50%" stopColor="#F3EFE8" />
                        <stop offset="100%" stopColor="#FAF7F2" />
                      </linearGradient>
                      <linearGradient id="btn-warranty-mob-border" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="rgba(64, 46, 29, 0.15)" />
                        <stop offset="50%" stopColor="rgba(135, 101, 64, 0.4)" />
                        <stop offset="100%" stopColor="rgba(64, 46, 29, 0.15)" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 23 0 L 173 0 C 180 0 185 7 190 7 C 195 7 200 0 213 0 A 23 23 0 1 1 213 46 C 200 46 195 39 190 39 C 185 39 180 46 173 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                      fill="url(#btn-warranty-mob-fill)"
                      stroke="url(#btn-warranty-mob-border)"
                      strokeWidth="1.4"
                    />
                  </svg>

                  <div className="absolute left-0 top-0 bottom-0 w-[170px] flex items-center justify-center pointer-events-none px-2">
                    <span className="font-sans text-[11.5px] font-bold tracking-[0.02em] text-[#1E140D] truncate">
                      Email Claims Desk
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
