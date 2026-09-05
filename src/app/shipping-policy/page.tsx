"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { 
  Truck, 
  Sparkles, 
  Clock, 
  PackageCheck, 
  ShieldCheck, 
  Layers, 
  Mail,
  ArrowRight,
  Globe,
  AlertCircle,
  HelpCircle,
  Camera,
  Compass
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

const shippingSections = [
  {
    id: "where-we-ship",
    number: "01",
    title: "Where We Ship",
    content: (
      <>
        <p>
          Divine Lotus intends to ship within India and internationally to supported countries and regions.
        </p>
        <p className="mt-2.5">
          Availability may vary depending on courier coverage, customs restrictions, local regulations and other logistical considerations.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          If we are unable to ship to your location, we will let you know before accepting or fulfilling the order.
        </p>
      </>
    ),
  },
  {
    id: "production-batch",
    number: "02",
    title: "First Production Batch",
    content: (
      <>
        <p>
          Our first Lotus Seats are being produced in limited batches.
        </p>
        <div className="my-3 p-3.5 rounded-2xl bg-[#EFECE5] border-l-2 border-[#876540]">
          <p className="font-semibold text-[#1E140D] text-[13.5px]">
            Production Timeline
          </p>
          <p className="text-[12.5px] text-[#402E1D]/85 mt-1">
            For initial orders, please allow approximately <strong>3–4 weeks</strong> for production and preparation before dispatch. This is production time, not courier transit time.
          </p>
        </div>
        <p className="text-[#402E1D]/85">
          As one of our early customers, your order is helping begin the journey of The Lotus Seat. We appreciate the trust that comes with ordering from our first production batches, and we will keep you informed about meaningful changes to your order status.
        </p>
      </>
    ),
  },
  {
    id: "dispatch-delivery-time",
    number: "03",
    title: "Dispatch & Delivery Time",
    content: (
      <>
        <p>
          Once your Lotus Seat is ready and handed to the courier, delivery time will depend on:
        </p>
        <ul className="list-disc list-inside space-y-1.5 my-2.5 pl-1 text-[13.5px]">
          <li>Destination country</li>
          <li>Courier service</li>
          <li>Customs clearance</li>
          <li>Local delivery network</li>
          <li>Weather or transportation disruptions</li>
          <li>Other circumstances outside our reasonable control</li>
        </ul>
        <p className="text-[#402E1D]/85">
          Where possible, an estimated delivery timeframe will be provided during checkout or after dispatch. Estimated dates are not guaranteed unless expressly stated otherwise.
        </p>
      </>
    ),
  },
  {
    id: "shipping-charges",
    number: "04",
    title: "Shipping Charges",
    content: (
      <>
        <p>
          Shipping is not included in the listed product price unless specifically stated otherwise.
        </p>
        <p className="mt-2">
          The applicable shipping charge will be calculated or communicated based on the destination and available delivery service.
        </p>
        <div className="my-3.5 p-4 rounded-2xl bg-[#EFECE5] space-y-2">
          <div className="text-[12px] font-bold text-[#876540] uppercase tracking-wider">Current Product Catalog Pricing</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-medium text-[#1E140D] text-[13.5px]">
            <div className="p-2.5 rounded-xl bg-white/70 flex items-center justify-between">
              <span>The Lotus Seat</span>
              <span className="font-bold text-[#876540]">€149 / ₹14,999</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/70 flex items-center justify-between">
              <span>The Lotus Seat Custom</span>
              <span className="font-bold text-[#876540]">€199 / ₹19,999</span>
            </div>
          </div>
          <p className="text-[12px] text-[#402E1D]/75 pt-1">
            plus applicable shipping, taxes and duties unless otherwise stated. (EUR for International, INR for India).
          </p>
        </div>
      </>
    ),
  },
  {
    id: "customs-duties-taxes",
    number: "05",
    title: "International Customs, Duties & Taxes",
    content: (
      <>
        <p>
          International shipments may be subject to:
        </p>
        <ul className="list-disc list-inside space-y-1.5 my-2.5 pl-1 text-[13.5px]">
          <li>Customs duties</li>
          <li>Import taxes</li>
          <li>VAT/GST or similar taxes</li>
          <li>Customs processing or brokerage charges</li>
          <li>Other charges imposed by the destination country</li>
        </ul>
        <p>
          Unless checkout specifically states that these charges are included, the customer is responsible for applicable destination-country duties, taxes and customs charges.
        </p>
        <p className="mt-2 text-[#402E1D]/80">
          These amounts are determined by local authorities and are generally outside Divine Lotus’s control.
        </p>
      </>
    ),
  },
  {
    id: "order-tracking",
    number: "06",
    title: "Order Tracking",
    content: (
      <>
        <p>
          Once the order has been dispatched, tracking information will be provided where the selected courier service supports tracking.
        </p>
        <p className="mt-2.5 font-medium text-[#1E140D]">
          Customers will normally receive:
        </p>
        <ul className="list-disc list-inside space-y-1.5 my-2 pl-1 text-[13.5px]">
          <li>Courier name</li>
          <li>Tracking number</li>
          <li>Tracking link or instructions</li>
        </ul>
        <p className="text-[#402E1D]/80 text-[12.5px] mt-2">
          Tracking information may take some time after dispatch to become active in the courier’s system.
        </p>
      </>
    ),
  },
  {
    id: "delivery-address",
    number: "07",
    title: "Delivery Address",
    content: (
      <>
        <p className="mb-2">
          Customers are responsible for providing a complete and accurate delivery address, including:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 my-2.5 text-[13px] text-[#1E140D]">
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ Recipient name</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ Street / address details</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ City</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ State / province (where applicable)</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ Postal / ZIP code</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ Country & contact phone number</div>
        </div>
        <p className="text-[#402E1D]/90 mt-3">
          Please check these details carefully before completing the order.
        </p>
        <p className="mt-2 text-[#402E1D]/80">
          If an address needs to be changed, contact us as soon as possible. We will try to help, but an address may no longer be changeable after dispatch.
        </p>
      </>
    ),
  },
  {
    id: "failed-delivery",
    number: "08",
    title: "Failed Delivery or Incorrect Address",
    content: (
      <>
        <p>
          If delivery fails because of an incorrect/incomplete address, repeated unsuccessful delivery attempts, refusal to accept the parcel, or another circumstance attributable to the recipient, additional shipping or return costs may apply where legally permitted.
        </p>
        <p className="mt-2.5">
          If the parcel is returned to Divine Lotus, we will contact the customer to discuss the available options.
        </p>
      </>
    ),
  },
  {
    id: "customs-clearance",
    number: "09",
    title: "Customs Clearance",
    content: (
      <>
        <p>
          International customers may occasionally be asked by the courier or customs authority to provide information required for customs clearance.
        </p>
        <p className="mt-2.5">
          Customers should respond to legitimate customs/courier requests within a reasonable period.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          Divine Lotus will provide reasonable shipment documentation required from us as the seller/exporter.
        </p>
      </>
    ),
  },
  {
    id: "unexpected-delays",
    number: "10",
    title: "Unexpected Delays",
    content: (
      <>
        <p>
          Sometimes a production or shipment may take longer than expected.
        </p>
        <p className="mt-2.5 font-medium text-[#1E140D]">
          If we become aware of a meaningful delay affecting your order, we will communicate it rather than leave you wondering where your order is.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          Where applicable law gives customers the right to accept a revised delivery date, cancel the order or receive a refund because of a delay, those rights will be respected.
        </p>
      </>
    ),
  },
  {
    id: "lost-shipments",
    number: "11",
    title: "Lost Shipments",
    content: (
      <>
        <p>
          If tracking indicates that a shipment may have been lost, please contact us. We will investigate the shipment with the courier.
        </p>
        <p className="mt-2.5">
          Where a shipment is confirmed lost, Divine Lotus will work with the customer toward an appropriate replacement or refund, subject to applicable law and the circumstances of the shipment.
        </p>
        <p className="mt-2.5 font-semibold text-[#876540]">
          Customers should not be expected to resolve a confirmed courier loss entirely on their own.
        </p>
      </>
    ),
  },
  {
    id: "damaged-in-transit",
    number: "12",
    title: "Damaged During Transit",
    content: (
      <>
        <p>
          Every Lotus Seat will be packed for safe transportation, but international shipping involves multiple stages of handling.
        </p>
        <p className="mt-2.5 font-medium text-[#1E140D]">
          If the parcel or product arrives visibly damaged:
        </p>
        <ul className="list-disc list-inside space-y-1.5 my-2.5 pl-1 text-[13.5px]">
          <li>Take photographs of the outer shipping carton before discarding it.</li>
          <li>Photograph the damage to the product and packaging.</li>
          <li>Keep the packaging until the issue has been resolved.</li>
          <li>Contact Divine Lotus as soon as reasonably possible with your order number and photographs.</li>
        </ul>
        <div className="mt-3.5 p-3.5 rounded-2xl bg-[#EFECE5] border-l-2 border-[#876540]">
          <p className="font-semibold text-[#1E140D] text-[13.5px]">
            &ldquo;When something goes wrong before the product reaches you safely, we’ll work to make it right.&rdquo;
          </p>
          <p className="text-[12.5px] text-[#402E1D]/80 mt-1">
            Depending on the circumstances and applicable law, this may involve replacement, repair or refund at no additional cost to the customer.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "refused-shipments",
    number: "13",
    title: "Refused International Shipments",
    content: (
      <>
        <p>
          If a customer refuses an international shipment because they do not wish to pay properly disclosed customs duties, import taxes or other destination charges, the shipment may be returned to us.
        </p>
        <p className="mt-2.5">
          Where legally permitted, actual costs incurred because of the refusal including return transportation or non-recoverable customs charges may be deducted from any applicable refund.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          This does not apply where the refusal results from an error by Divine Lotus or where applicable consumer law provides otherwise.
        </p>
      </>
    ),
  },
  {
    id: "separate-packages",
    number: "14",
    title: "Separate Packages",
    content: (
      <>
        <p>
          If an order contains multiple products or accessories, they may occasionally be shipped separately.
        </p>
        <p className="mt-2.5">
          Where this happens, additional tracking information will be provided where available.
        </p>
      </>
    ),
  },
  {
    id: "our-commitment",
    number: "15",
    title: "Our Commitment",
    content: (
      <>
        <p>
          International shipping can involve many hands between our door and yours. What remains our responsibility is communication.
        </p>
        <p className="mt-2.5">
          We’ll prepare your order carefully, provide tracking where available, keep you informed about meaningful delays, and work with you if something genuinely goes wrong along the way.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    number: "16",
    title: "Contact",
    content: (
      <>
        <p>
          For shipping or delivery questions:
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
        </div>
      </>
    ),
  },
];

export default function ShippingPolicyPage() {
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
              /SHIPPING & DELIVERY POLICY
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
            Shipping & Delivery Policy
          </motion.h1>

          {/* Summary Lead */}
          <motion.p 
            variants={heroItemVariants}
            className="font-sans text-[13.5px] sm:text-[15.5px] md:text-[17px] leading-[1.6] sm:leading-[1.65] text-[#F0EBE3] max-w-[760px] mb-5 sm:mb-6"
          >
            At Divine Lotus, every Lotus Seat is prepared, packed and shipped with care. This policy explains what to expect from the moment an order is placed until it reaches you.
          </motion.p>

          {/* Dispatch Card */}
          <motion.div 
            variants={heroItemVariants}
            className="bg-white/12 backdrop-blur-md rounded-[22px] sm:rounded-[28px] p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 max-w-[820px]"
          >
            <div>
              <div className="font-display font-semibold text-[15px] sm:text-[18px] text-white mb-0.5">
                Batch Production & Global Transit
              </div>
              <p className="font-sans text-[12px] sm:text-[13px] text-[#F0EBE3]/85 leading-relaxed">
                Initial production batches: 3–4 weeks crafting before dispatch with worldwide courier tracking.
              </p>
            </div>
            <a
              href="#production-batch"
              className="px-4 py-2 rounded-full bg-white text-[#1E140D] hover:bg-[#F6F3ED] font-sans text-[11.5px] sm:text-[12px] font-semibold transition-colors shrink-0 text-center self-start sm:self-auto"
            >
              Timeline Details
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
                <span>Policy Index ({shippingSections.length} Sections)</span>
                <span className="text-[11px] font-bold text-[#876540] transition-transform duration-200 group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <nav className="mt-3 pt-3 border-t border-[#402E1D]/8 space-y-1 font-sans text-[12.5px]">
                {shippingSections.map((item) => (
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
                {shippingSections.map((item) => (
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
                Shipping Questions?
              </div>
              <p className="font-sans text-[12px] text-[#402E1D]/75 leading-relaxed">
                Reach out to our logistics desk for order tracking and shipping inquiries.
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
                      <linearGradient id="btn-ship-fill" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FAF7F2" />
                        <stop offset="50%" stopColor="#F4EFE9" />
                        <stop offset="100%" stopColor="#FAF7F2" />
                      </linearGradient>
                      <linearGradient id="btn-ship-border" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="rgba(64, 46, 29, 0.15)" />
                        <stop offset="50%" stopColor="rgba(135, 101, 64, 0.35)" />
                        <stop offset="100%" stopColor="rgba(64, 46, 29, 0.15)" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 23 0 L 173 0 C 180 0 185 7 190 7 C 195 7 200 0 213 0 A 23 23 0 1 1 213 46 C 200 46 195 39 190 39 C 185 39 180 46 173 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                      fill="url(#btn-ship-fill)"
                      stroke="url(#btn-ship-border)"
                      strokeWidth="1.4"
                    />
                  </svg>

                  {/* Button Text */}
                  <div className="absolute left-0 top-0 bottom-0 w-[170px] flex items-center justify-center pointer-events-none px-2">
                    <span className="font-sans text-[11.5px] font-bold tracking-[0.02em] text-[#1E140D] truncate">
                      Email Shipping Desk
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
                <Truck className="w-4 h-4" />
                <span>Our Principles</span>
              </div>
              <p className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.7] text-[#402E1D]/90">
                At Divine Lotus, every Lotus Seat is prepared, packed and shipped with care. This policy explains what to expect from the moment an order is placed until it reaches you.
              </p>
              <p className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.7] text-[#402E1D]/90 mt-2.5">
                Nothing in this policy limits any consumer rights that cannot legally be excluded or restricted under the laws applicable to your purchase.
              </p>
            </motion.section>

            {/* All 16 Sections */}
            {shippingSections.map((item) => (
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
                Shipping Questions?
              </div>
              <p className="font-sans text-[12.5px] text-[#402E1D]/80 leading-relaxed">
                Contact our support team directly for order tracking or customs assistance.
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
                      <linearGradient id="btn-ship-mob-fill" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FAF7F2" />
                        <stop offset="50%" stopColor="#F3EFE8" />
                        <stop offset="100%" stopColor="#FAF7F2" />
                      </linearGradient>
                      <linearGradient id="btn-ship-mob-border" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="rgba(64, 46, 29, 0.15)" />
                        <stop offset="50%" stopColor="rgba(135, 101, 64, 0.4)" />
                        <stop offset="100%" stopColor="rgba(64, 46, 29, 0.15)" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 23 0 L 173 0 C 180 0 185 7 190 7 C 195 7 200 0 213 0 A 23 23 0 1 1 213 46 C 200 46 195 39 190 39 C 185 39 180 46 173 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                      fill="url(#btn-ship-mob-fill)"
                      stroke="url(#btn-ship-mob-border)"
                      strokeWidth="1.4"
                    />
                  </svg>

                  <div className="absolute left-0 top-0 bottom-0 w-[170px] flex items-center justify-center pointer-events-none px-2">
                    <span className="font-sans text-[11.5px] font-bold tracking-[0.02em] text-[#1E140D] truncate">
                      Email Shipping Desk
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
