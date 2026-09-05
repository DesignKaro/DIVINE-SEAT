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
  ArrowRight,
  ShieldCheck,
  Mail,
  AlertCircle
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
    id: "about-divine-lotus",
    number: "01",
    title: "About Divine Lotus",
    content: (
      <>
        <p>The Lotus Seat is offered by:</p>
        <div className="my-3 p-3.5 rounded-2xl bg-[#EFECE5] space-y-1 text-[13px]">
          <p><span className="font-semibold text-[#1E140D]">Legal company name:</span> Divine Lotus</p>
          <p><span className="font-semibold text-[#1E140D]">Brand:</span> Divine Lotus / The Lotus Seat</p>
          <p>
            <span className="font-semibold text-[#1E140D]">Email:</span>{" "}
            <a href="mailto:theedivinelotuss@gmail.com" className="text-[#876540] hover:text-[#1E140D] font-bold transition-colors">
              theedivinelotuss@gmail.com
            </a>
          </p>
        </div>
      </>
    ),
  },
  {
    id: "the-lotus-seat",
    number: "02",
    title: "The Lotus Seat",
    content: (
      <>
        <p>
          The Lotus Seat is an ergonomic meditation seat designed to provide a comfortable and supportive foundation for seated meditation.
        </p>
        <p className="mt-2.5 font-medium text-[#1E140D]">We currently offer:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
          <div className="p-3.5 rounded-2xl bg-[#EFECE5]">
            <div className="font-bold text-[#1E140D] text-[13.5px]">The Lotus Seat  - €149 / ₹14,999</div>
            <p className="text-[12.5px] text-[#402E1D]/80 mt-1">Our standard colour and design.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#EFECE5]">
            <div className="font-bold text-[#1E140D] text-[13.5px]">The Lotus Seat  - Custom  - €199 / ₹19,999</div>
            <p className="text-[12.5px] text-[#402E1D]/80 mt-1">Our customisable version, allowing customers to choose from available colour and design combinations.</p>
          </div>
        </div>
        <p className="text-[12.5px] text-[#402E1D]/80">
          Shipping, applicable taxes, customs duties and other charges are separate unless expressly stated as included.
        </p>
      </>
    ),
  },
  {
    id: "product-information",
    number: "03",
    title: "Product Information",
    content: (
      <>
        <p>
          We make reasonable efforts to present our products accurately. Because screens, photography, lighting, materials and manufacturing processes can vary, slight differences may occur in:
        </p>
        <ul className="list-disc list-inside space-y-1.5 my-2.5 pl-1 text-[13.5px]">
          <li>Colour</li>
          <li>Texture</li>
          <li>Stitching</li>
          <li>Natural cork appearance</li>
          <li>Fabric appearance</li>
          <li>Dimensions</li>
          <li>Other minor finishing details</li>
        </ul>
        <p className="text-[#402E1D]/85">
          Natural materials may also contain normal variations that are part of their character rather than defects. Material differences or manufacturing tolerances that do not materially affect the product’s intended use are not automatically considered defects, subject to applicable consumer law.
        </p>
      </>
    ),
  },
  {
    id: "custom-products",
    number: "04",
    title: "Custom Products",
    content: (
      <>
        <p>
          Customers ordering The Lotus Seat  - Custom are responsible for reviewing their selected colour/design configuration before confirming the order.
        </p>
        <p className="mt-2.5">
          Once production of a genuinely personalised product begins, changes or change-of-mind cancellations may be restricted where permitted by applicable law.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          This does not affect rights relating to defective, damaged, incorrect or non-conforming products.
        </p>
      </>
    ),
  },
  {
    id: "prices-and-currency",
    number: "05",
    title: "Prices and Currency",
    content: (
      <>
        <p>
          Unless otherwise stated, prices displayed on the website are in Euros (EUR) for international orders or Indian Rupees (INR) for orders placed within India. Current intended prices are:
        </p>
        <ul className="list-disc list-inside space-y-1 my-2 pl-1 text-[13.5px]">
          <li><strong>The Lotus Seat</strong>  - €149 (or ₹14,999 for India)</li>
          <li><strong>The Lotus Seat  - Custom</strong>  - €199 (or ₹19,999 for India)</li>
        </ul>
        <p className="mt-2 text-[#402E1D]/85">
          Prices may change for future orders. A price change after an order has been accepted will not normally alter the agreed product price for that order, except where required by law or where an obvious pricing error applies.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          Customers whose payment account uses another currency may be charged currency-conversion or foreign-transaction fees by their bank, card issuer or payment provider. These charges are outside Divine Lotus’s control.
        </p>
      </>
    ),
  },
  {
    id: "shipping-taxes-duties",
    number: "06",
    title: "Shipping, Taxes and Duties",
    content: (
      <>
        <p className="mb-2">Unless expressly stated otherwise:</p>
        <ul className="list-disc list-inside space-y-1.5 pl-1 text-[13.5px]">
          <li>Product price does not include shipping or destination-country taxes/duties.</li>
          <li>Applicable shipping charges will be shown or communicated during ordering.</li>
          <li>International customers may also be responsible for import duties, VAT/GST, customs fees or other charges imposed by their destination country.</li>
        </ul>
        <p className="mt-3 text-[13px]">
          Please review the <Link href="/shipping-policy" className="text-[#876540] hover:underline font-bold">Shipping & Delivery Policy</Link> for further information.
        </p>
      </>
    ),
  },
  {
    id: "orders",
    number: "07",
    title: "Orders",
    content: (
      <>
        <p>
          Submitting an order means the customer is offering to purchase the selected product under these Terms.
        </p>
        <p className="mt-2.5">
          An order is considered accepted when we provide confirmation of acceptance or otherwise begin processing it, depending on the checkout system and applicable law.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          We may contact the customer if additional information is reasonably required to process or deliver the order.
        </p>
      </>
    ),
  },
  {
    id: "payment",
    number: "08",
    title: "Payment",
    content: (
      <>
        <p>
          Payment must be made through the payment methods available at checkout. Payments may be processed by independent payment providers. Divine Lotus does not need to directly store complete payment-card details where those details are securely handled by the payment provider.
        </p>
        <p className="mt-2.5 font-medium text-[#1E140D]">An order may not proceed if payment:</p>
        <ul className="list-disc list-inside space-y-1.5 my-2 pl-1 text-[13.5px]">
          <li>Fails</li>
          <li>Is declined</li>
          <li>Cannot be verified</li>
          <li>Is reversed</li>
          <li>Is reasonably suspected of fraud or unauthorised use</li>
        </ul>
      </>
    ),
  },
  {
    id: "production-preorders",
    number: "09",
    title: "First Production Batch & Pre-Orders",
    content: (
      <>
        <p>
          Early Lotus Seat orders may form part of our first production batches. The expected production period will be disclosed before purchase. Our current expectation for the initial batch is approximately:
        </p>
        <div className="my-3 p-3.5 rounded-2xl bg-[#EFECE5] border-l-2 border-[#876540]">
          <p className="font-semibold text-[#1E140D] text-[13.5px]">3–4 weeks before dispatch</p>
          <p className="text-[12.5px] text-[#402E1D]/80 mt-0.5">
            This is an estimated production/preparation period and is separate from courier transit time.
          </p>
        </div>
        <p className="text-[#402E1D]/85">
          We will communicate meaningful unexpected delays and provide any cancellation, revised-delivery or refund options required by applicable law.
        </p>
      </>
    ),
  },
  {
    id: "changes-cancellations",
    number: "10",
    title: "Order Changes and Cancellations",
    content: (
      <>
        <p>
          If a customer needs to change an order, they should contact us as soon as possible. We will make reasonable efforts to accommodate requests before production or dispatch, but changes cannot always be guaranteed once work on the order has begun.
        </p>
        <p className="mt-2.5">
          Custom products may have additional restrictions once personalisation/production begins.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          Nothing in this section removes cancellation rights that customers may have under mandatory applicable consumer law.
        </p>
      </>
    ),
  },
  {
    id: "delivery",
    number: "11",
    title: "Delivery",
    content: (
      <>
        <p>
          Customers are responsible for providing accurate delivery and contact information. Delivery estimates depend on production, destination, courier service, customs and other circumstances.
        </p>
        <p className="mt-2.5">
          Tracking will be provided where available.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          Detailed shipping rules including international duties, delays, failed deliveries, lost parcels and transit damage are contained in our <Link href="/shipping-policy" className="text-[#876540] hover:underline font-bold">Shipping & Delivery Policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "returns-refunds",
    number: "12",
    title: "Returns & Refunds",
    content: (
      <>
        <p>
          Eligible returns and refunds are governed by our <Link href="/refund-policy" className="text-[#876540] hover:underline font-bold">Returns & Refunds Policy</Link>. Our general approach is simple:
        </p>
        <ul className="list-disc list-inside space-y-2 my-2.5 pl-1 text-[13.5px]">
          <li><strong>Changed your mind:</strong> return rules and applicable return costs apply.</li>
          <li><strong>We sent something damaged, defective or incorrect:</strong> we’ll work to make it right at no additional cost where required.</li>
          <li><strong>Customer-caused damage or misuse:</strong> this will generally not qualify as a product defect or ordinary return.</li>
        </ul>
        <p className="text-[#402E1D]/85">
          Mandatory consumer rights always remain applicable.
        </p>
      </>
    ),
  },
  {
    id: "damaged-defective",
    number: "13",
    title: "Damaged or Defective Products",
    content: (
      <>
        <p>
          If a Lotus Seat arrives damaged, defective or materially different from what was ordered, contact us with the order information and reasonable evidence such as photographs.
        </p>
        <p className="mt-2.5 font-medium text-[#1E140D]">
          Depending on the circumstances and applicable law, the appropriate remedy may include:
        </p>
        <p className="mt-1 text-[#402E1D]/90">
          Repair, replacement, refund or another suitable resolution.
        </p>
        <div className="mt-3 p-3.5 rounded-2xl bg-[#EFECE5] border-l-2 border-[#876540]">
          <p className="font-semibold text-[#1E140D] text-[13px]">
            &ldquo;When the mistake is ours, making it right is ours too.&rdquo;
          </p>
        </div>
      </>
    ),
  },
  {
    id: "product-use",
    number: "14",
    title: "Product Use",
    content: (
      <>
        <p>
          The Lotus Seat should be used for its intended purpose and in accordance with any care/use instructions supplied with the product.
        </p>
        <p className="mt-2.5 font-medium text-[#1E140D]">Customers should:</p>
        <ul className="list-disc list-inside space-y-1.5 my-2 pl-1 text-[13.5px]">
          <li>Use meditation postures appropriate for their own mobility and comfort</li>
          <li>Avoid forcing Siddhasana, Padmasana or other positions</li>
          <li>Stop or change position if significant discomfort occurs</li>
          <li>Follow washing and care instructions</li>
          <li>Avoid misuse that could damage the seat</li>
        </ul>
        <p className="mt-2.5 font-semibold text-[#876540]">
          The product is not intended as a substitute for appropriate medical care.
        </p>
      </>
    ),
  },
  {
    id: "meditation-wellness-info",
    number: "15",
    title: "Meditation & Wellness Information",
    content: (
      <>
        <p>
          Content on our website relating to meditation, posture, back discomfort, numbness, pelvic positioning, asana, pranayama, Siddhasana, Padmasana, prana, nadis, Ida, Pingala, and Sushumna is provided for general educational, wellness or traditional-practice purposes.
        </p>
        <div className="my-3 p-3.5 rounded-2xl bg-[#EFECE5] space-y-2 text-[13px]">
          <p className="font-semibold text-[#1E140D]">
            Not a Medical Device
          </p>
          <p className="text-[#402E1D]/85 leading-relaxed">
            The Lotus Seat is not represented as a medical device, and website content should not be understood as medical diagnosis, treatment or advice.
          </p>
        </div>
        <p className="text-[#402E1D]/85">
          Traditional yogic concepts such as prana and nadis are presented in the context of yogic teachings and traditions. Please see our <Link href="/disclaimer" className="text-[#876540] hover:underline font-bold">Product &amp; Meditation Disclaimer</Link> for further information.
        </p>
      </>
    ),
  },
  {
    id: "sadhana-practice-guide",
    number: "16",
    title: "Sadhana Practice Guide & Digital Content",
    content: (
      <>
        <p>
          Where included with an order, the Sadhana Practice Guide and related meditation resources are intended for the customer’s personal use.
        </p>
        <p className="mt-2.5">
          Unless expressly permitted, customers may not commercially reproduce, sell, redistribute, upload or republish Divine Lotus digital content.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          Where teachings or material belong to third parties, their respective rights remain with the relevant rights holders.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    number: "17",
    title: "Intellectual Property",
    content: (
      <>
        <p>
          Unless otherwise stated, Divine Lotus or its licensors own or have permission to use the website’s:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 my-2.5 text-[12.5px] text-[#1E140D]">
          <div className="p-2 rounded-lg bg-[#EFECE5]">Brand names & logos</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">Product designs / visuals</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">Photographs & videos</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">3D models & illustrations</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">Graphics & written content</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">Guides & educational materials</div>
        </div>
        <p className="text-[#402E1D]/85 mt-2.5">
          Website content may not be copied, reproduced, commercially exploited or presented as another party’s work without appropriate permission.
        </p>
      </>
    ),
  },
  {
    id: "reviews-customer-content",
    number: "18",
    title: "Reviews, Photos and Customer Content",
    content: (
      <>
        <p>
          If customers voluntarily submit reviews, photographs or other content, Divine Lotus will not automatically assume unrestricted ownership of that material.
        </p>
        <p className="mt-2.5">
          If we want to use identifiable customer content in advertising or marketing, we may request appropriate permission where required.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          Customers should only submit content they have the right to share.
        </p>
      </>
    ),
  },
  {
    id: "website-availability",
    number: "19",
    title: "Website Availability",
    content: (
      <>
        <p>
          We aim to keep the website accurate and available, but temporary interruptions may occur because of:
        </p>
        <ul className="list-disc list-inside space-y-1.5 my-2.5 pl-1 text-[13.5px]">
          <li>Maintenance</li>
          <li>Technical problems</li>
          <li>Hosting failures</li>
          <li>Payment-provider issues</li>
          <li>Security incidents</li>
          <li>Events outside our reasonable control</li>
        </ul>
        <p className="text-[#402E1D]/80 text-[13px]">
          We may update or improve the website over time.
        </p>
      </>
    ),
  },
  {
    id: "obvious-errors",
    number: "20",
    title: "Obvious Errors",
    content: (
      <>
        <p>
          Occasionally, an obvious error may appear in a price, description, promotion or other website information.
        </p>
        <p className="mt-2.5">
          Where legally permitted, we may correct an obvious error and contact an affected customer before proceeding.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          For example, if a €199 product is accidentally displayed as €19 because of a clear technical error, we may explain the mistake and provide appropriate options rather than being required to fulfil an obviously erroneous price where applicable law allows.
        </p>
      </>
    ),
  },
  {
    id: "fraud-and-misuse",
    number: "21",
    title: "Fraud and Misuse",
    content: (
      <>
        <p>
          We may refuse, suspend or cancel transactions where we reasonably believe there is:
        </p>
        <ul className="list-disc list-inside space-y-1.5 my-2.5 pl-1 text-[13.5px]">
          <li>Fraud</li>
          <li>Unauthorised payment use</li>
          <li>Abuse of return/refund systems</li>
          <li>Deliberate false claims</li>
          <li>Attempts to manipulate promotions</li>
          <li>Unlawful use of the website</li>
        </ul>
        <p className="text-[#402E1D]/85">
          This does not permit Divine Lotus to deny legitimate consumer claims simply because a customer exercises their legal rights.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    number: "22",
    title: "Liability",
    content: (
      <>
        <p>
          Nothing in these Terms excludes or limits liability where doing so would be unlawful.
        </p>
        <p className="mt-2.5 font-medium text-[#1E140D]">
          To the extent permitted by applicable law, Divine Lotus is not responsible for losses resulting solely from:
        </p>
        <ul className="list-disc list-inside space-y-1.5 my-2 pl-1 text-[13.5px]">
          <li>Improper or unintended product use</li>
          <li>Ignoring care instructions</li>
          <li>Customer-caused damage</li>
          <li>Forcing meditation/yoga postures beyond personal mobility</li>
          <li>Third-party services outside our reasonable control</li>
          <li>Events that could not reasonably have been prevented</li>
        </ul>
        <p className="mt-2.5 text-[#402E1D]/85">
          Any limitation of liability in these Terms remains subject to mandatory consumer protection laws.
        </p>
      </>
    ),
  },
  {
    id: "events-outside-control",
    number: "23",
    title: "Events Outside Our Reasonable Control",
    content: (
      <>
        <p>
          Production or delivery may occasionally be affected by events outside our reasonable control, including natural disasters, transportation disruptions, customs delays, strikes, governmental restrictions, supply-chain interruptions or similar events.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          We will communicate meaningful impacts where reasonably possible and respect any rights customers have under applicable law.
        </p>
      </>
    ),
  },
  {
    id: "changes-to-terms",
    number: "24",
    title: "Changes to These Terms",
    content: (
      <>
        <p>
          These Terms may be updated as Divine Lotus grows, enters new markets, introduces new products or responds to legal/operational changes.
        </p>
        <p className="mt-2.5">
          The version applicable to an order will generally be the version presented at the relevant time, subject to applicable law.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          The Last updated date will appear at the top of this page.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    number: "25",
    title: "Governing Law & International Customers",
    content: (
      <>
        <p>
          Divine Lotus operates from India. These Terms are intended to be governed by the applicable laws of India, subject to any mandatory consumer protections, jurisdictional rights or other laws that cannot legally be excluded for customers in their country of residence.
        </p>
        <p className="mt-2.5 font-medium text-[#876540]">
          Nothing in these Terms is intended to deprive an international customer of mandatory rights available to them under applicable law.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
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
              /TERMS & CONDITIONS
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
            Terms & Conditions
          </motion.h1>

          {/* Summary Lead */}
          <motion.p 
            variants={heroItemVariants}
            className="font-sans text-[13.5px] sm:text-[15.5px] md:text-[17px] leading-[1.6] sm:leading-[1.65] text-[#F0EBE3] max-w-[760px] mb-5 sm:mb-6"
          >
            These Terms & Conditions govern the use of thelotusseat.com and purchases made through our website. Welcome to Divine Lotus.
          </motion.p>

          {/* Guarantee Card */}
          <motion.div 
            variants={heroItemVariants}
            className="bg-white/12 backdrop-blur-md rounded-[22px] sm:rounded-[28px] p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 max-w-[820px]"
          >
            <div>
              <div className="font-display font-semibold text-[15px] sm:text-[18px] text-white mb-0.5">
                Transparent Agreements & Policies
              </div>
              <p className="font-sans text-[12px] sm:text-[13px] text-[#F0EBE3]/85 leading-relaxed">
                Clear terms covering product information, small-batch crafting, wellness disclaimers, and legal rights.
              </p>
            </div>
            <a
              href="#the-lotus-seat"
              className="px-4 py-2 rounded-full bg-white text-[#1E140D] hover:bg-[#F6F3ED] font-sans text-[11.5px] sm:text-[12px] font-semibold transition-colors shrink-0 text-center self-start sm:self-auto"
            >
              Seat Editions
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

              <nav className="space-y-1 font-sans text-[12.5px] max-h-[36vh] overflow-y-auto no-scrollbar">
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

            {/* Quick Action Contact Card */}
            <div className="p-5 rounded-[22px] bg-white text-[#402E1D] space-y-3">
              <div className="font-display font-semibold text-[15px] text-[#1E140D]">
                Questions on Terms?
              </div>
              <p className="font-sans text-[12px] text-[#402E1D]/75 leading-relaxed">
                Contact our concierge team for any questions regarding our terms or orders.
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
                      Email Concierge
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
                <Scale className="w-4 h-4" />
                <span>Agreement Notice</span>
              </div>
              <p className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.7] text-[#402E1D]/90">
                Welcome to Divine Lotus. These Terms & Conditions govern the use of <a href="https://thelotusseat.com" target="_blank" rel="noopener noreferrer" className="text-[#876540] font-bold hover:underline">thelotusseat.com</a> and purchases made through our website.
              </p>
              <p className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.7] text-[#402E1D]/90 mt-2.5">
                By placing an order, customers agree to these Terms together with our <Link href="/privacy-policy" className="text-[#876540] font-bold hover:underline">Privacy Policy</Link>, <Link href="/refund-policy" className="text-[#876540] font-bold hover:underline">Returns & Refunds Policy</Link>, <Link href="/shipping-policy" className="text-[#876540] font-bold hover:underline">Shipping & Delivery Policy</Link>, and other policies referenced here.
              </p>
              <p className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.7] text-[#402E1D]/90 mt-2.5">
                Nothing in these Terms limits consumer rights that cannot legally be excluded or restricted under applicable law.
              </p>
            </motion.section>

            {/* All 25 Sections */}
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
                Questions on Terms?
              </div>
              <p className="font-sans text-[12.5px] text-[#402E1D]/80 leading-relaxed">
                Contact our support team directly for any clarification regarding our terms or policies.
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
                      Email Concierge
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
