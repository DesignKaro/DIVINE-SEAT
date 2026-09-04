"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { 
  ShieldCheck, 
  Database, 
  FileCheck2, 
  Cookie, 
  Layers, 
  EyeOff, 
  Globe2, 
  Lock, 
  UserCheck, 
  Mail,
  ArrowRight,
  Sparkles,
  HelpCircle,
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

const privacySections = [
  {
    id: "who-we-are",
    number: "01",
    title: "Who We Are",
    content: (
      <>
        <p>This website is operated by:</p>
        <div className="my-3 p-3.5 rounded-2xl bg-[#EFECE5] space-y-1 text-[13px]">
          <p><span className="font-semibold text-[#1E140D]">Brand:</span> Divine Lotus / The Lotus Seat</p>
          <p><span className="font-semibold text-[#1E140D]">Legal company name:</span> Divine Lotus</p>
          <p><span className="font-semibold text-[#1E140D]">Email:</span> <a href="mailto:theedivinelotuss@gmail.com" className="text-[#876540] hover:text-[#1E140D] font-bold transition-colors">theedivinelotuss@gmail.com</a></p>
          <p><span className="font-semibold text-[#1E140D]">Website:</span> <a href="https://thelotusseat.com" target="_blank" rel="noopener noreferrer" className="text-[#876540] hover:text-[#1E140D] font-bold transition-colors">thelotusseat.com</a></p>
        </div>
        <p className="text-[13px] text-[#402E1D]/80">
          For applicable privacy laws, the legal company operating Divine Lotus will generally be responsible for determining how personal information collected through this website is used.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    number: "02",
    title: "Information We May Collect",
    content: (
      <>
        <p className="mb-2.5">
          Depending on how you interact with Divine Lotus, we may collect:
        </p>
        <div className="space-y-2.5 my-3 text-[13px]">
          <div className="p-3 rounded-xl bg-[#EFECE5]">
            <span className="font-bold text-[#1E140D] block mb-0.5">Contact information</span>
            <span className="text-[#402E1D]/80">Name, Email address, Phone/WhatsApp number</span>
          </div>
          <div className="p-3 rounded-xl bg-[#EFECE5]">
            <span className="font-bold text-[#1E140D] block mb-0.5">Order and delivery information</span>
            <span className="text-[#402E1D]/80">Billing address, Shipping address, Country, Products ordered, Selected colours/designs, Order history, Delivery and tracking information</span>
          </div>
          <div className="p-3 rounded-xl bg-[#EFECE5]">
            <span className="font-bold text-[#1E140D] block mb-0.5">Payment information</span>
            <span className="text-[#402E1D]/80 leading-relaxed block">
              Payments may be processed by third-party payment providers. Where possible, Divine Lotus does not directly store complete card numbers or other sensitive payment credentials handled securely by the payment provider. We may receive transaction-related information such as payment status, transaction reference and payment method.
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[#EFECE5]">
            <span className="font-bold text-[#1E140D] block mb-0.5">Communications</span>
            <span className="text-[#402E1D]/80">If you contact us through email, WhatsApp, website forms or another support channel, we may retain the information necessary to respond and maintain appropriate customer-service records.</span>
          </div>
          <div className="p-3 rounded-xl bg-[#EFECE5]">
            <span className="font-bold text-[#1E140D] block mb-0.5">Website and device information</span>
            <span className="text-[#402E1D]/80">IP address, Device/browser type, Pages viewed, Referral source, Approximate location derived from technical information, Website interactions, Cookie and similar technology information</span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "why-we-use-information",
    number: "03",
    title: "Why We Use Your Information",
    content: (
      <>
        <p className="mb-2">We may use personal information to:</p>
        <ul className="list-disc list-inside space-y-2 pl-1 text-[13.5px]">
          <li><strong>Process and fulfil orders:</strong> Including payment confirmation, manufacturing, customisation, packaging, shipping and delivery.</li>
          <li><strong>Communicate about orders:</strong> Including confirmations, production updates, tracking, delays, returns and refunds.</li>
          <li><strong>Provide customer support:</strong> Including answering questions and resolving product or delivery issues.</li>
          <li><strong>Operate and improve the website:</strong> Including understanding how visitors use the website and identifying technical problems.</li>
          <li><strong>Prevent fraud and protect security:</strong> Including detecting suspicious transactions or misuse.</li>
          <li><strong>Meet legal and regulatory obligations:</strong> Including accounting, taxation, customs, consumer-protection and record-keeping requirements.</li>
          <li><strong>Send marketing communications:</strong> Where we have the appropriate permission or another lawful basis to do so.</li>
        </ul>
      </>
    ),
  },
  {
    id: "email-whatsapp-marketing",
    number: "04",
    title: "Email & WhatsApp Marketing",
    content: (
      <>
        <p>
          Providing a phone number or email address to complete an order does not automatically mean that the customer has agreed to receive unrelated promotional marketing. Where required, marketing consent will be requested separately.
        </p>
        <p className="mt-2.5 font-medium text-[#1E140D]">
          If you choose to receive updates from Divine Lotus, we may send information about:
        </p>
        <ul className="list-disc list-inside space-y-1 my-2 pl-1 text-[13.5px]">
          <li>Product launches</li>
          <li>New covers/designs</li>
          <li>Meditation resources</li>
          <li>Sadhana-related content</li>
          <li>Relevant brand updates</li>
        </ul>
        <p className="mt-2 text-[#402E1D]/85">
          You can unsubscribe from marketing emails using the unsubscribe option provided in the message. For WhatsApp marketing, you can ask us to stop promotional messages at any time.
        </p>
        <p className="mt-2 text-[12.5px] text-[#402E1D]/75">
          Stopping marketing messages will not prevent us from sending necessary communications relating to an existing order, transaction, return or customer-service request.
        </p>
      </>
    ),
  },
  {
    id: "notify-me-waitlist",
    number: "05",
    title: "Notify Me / Waitlist",
    content: (
      <>
        <p>
          Before products become available for purchase, we may offer a Notify Me or waitlist form. This may collect:
        </p>
        <div className="my-2.5 p-3 rounded-xl bg-[#EFECE5] font-medium text-[#1E140D] text-[13px]">
          Name + Email address + WhatsApp number
        </div>
        <p className="text-[#402E1D]/85">
          We use this information to provide requested launch/product availability updates and related communications consistent with the permission provided.
        </p>
        <p className="mt-2 text-[12.5px] font-semibold text-[#876540]">
          Participation in the waitlist does not create an obligation to purchase.
        </p>
      </>
    ),
  },
  {
    id: "google-analytics",
    number: "06",
    title: "Google Analytics",
    content: (
      <>
        <p>
          We may use Google Analytics (GA4) to understand how people find and use the website. This may help us understand information such as:
        </p>
        <ul className="list-disc list-inside space-y-1.5 my-2 pl-1 text-[13.5px]">
          <li>Number of visitors</li>
          <li>Pages viewed</li>
          <li>General traffic sources</li>
          <li>Website interactions</li>
          <li>Conversion activity</li>
          <li>Device/browser information</li>
        </ul>
        <p className="text-[#402E1D]/80 text-[12.5px] mt-2">
          Analytics technologies will be configured and used in accordance with applicable privacy and cookie requirements.
        </p>
      </>
    ),
  },
  {
    id: "meta-pixel-advertising",
    number: "07",
    title: "Meta Pixel & Advertising",
    content: (
      <>
        <p>
          We may use technologies such as Meta Pixel and related Meta advertising tools.
        </p>
        <p className="mt-2.5">
          Subject to applicable consent/privacy requirements, these technologies may help us understand whether advertising on platforms such as Instagram or Facebook leads to actions on our website  - for example:
        </p>
        <div className="my-3 p-3 rounded-xl bg-[#EFECE5] font-medium text-[#1E140D] text-[12.5px] sm:text-[13px] text-center">
          Website visit → product view → add to cart → checkout → purchase
        </div>
        <p className="text-[#402E1D]/85">
          They may also support advertising measurement and retargeting. Where applicable law requires consent before advertising cookies or similar tracking technologies are used, we will seek that consent.
        </p>
      </>
    ),
  },
  {
    id: "cookies-similar-tech",
    number: "08",
    title: "Cookies & Similar Technologies",
    content: (
      <>
        <p className="mb-2">
          The website may use cookies or similar technologies for purposes such as:
        </p>
        <ul className="list-disc list-inside space-y-1.5 pl-1 text-[13.5px]">
          <li><strong>Essential functionality:</strong> Keeping the website secure and enabling necessary website/checkout functions.</li>
          <li><strong>Preferences:</strong> Remembering certain website choices.</li>
          <li><strong>Analytics:</strong> Understanding how the website performs and is used.</li>
          <li><strong>Advertising/measurement:</strong> Measuring advertising effectiveness and supporting relevant advertising where permitted.</li>
        </ul>
        <p className="mt-2.5 text-[#402E1D]/80 text-[12.5px]">
          Where required, visitors will be given appropriate choices through a cookie/consent mechanism. Further details are provided in our <Link href="/cookie-policy" className="text-[#876540] hover:underline font-bold">Cookie &amp; Tracking Notice</Link>.
        </p>
      </>
    ),
  },
  {
    id: "who-we-share-with",
    number: "09",
    title: "Who We May Share Information With",
    content: (
      <>
        <p>
          We may share only the information reasonably necessary with service providers that help us operate Divine Lotus. These may include:
        </p>
        <ul className="list-disc list-inside space-y-1.5 my-2.5 pl-1 text-[13.5px]">
          <li><strong>Payment processors:</strong> To securely process transactions.</li>
          <li><strong>Courier and logistics providers:</strong> To deliver orders and provide tracking.</li>
          <li><strong>Website hosting and technical providers:</strong> To operate and maintain the website.</li>
          <li><strong>Analytics providers:</strong> To understand website performance.</li>
          <li><strong>Marketing platforms:</strong> Where appropriate permissions and legal requirements are satisfied.</li>
          <li><strong>Professional advisers:</strong> Such as accountants, legal advisers or auditors where reasonably necessary.</li>
          <li><strong>Government/customs/tax authorities:</strong> Where disclosure is legally required.</li>
        </ul>
        <div className="mt-3 p-3.5 rounded-2xl bg-[#EFECE5]">
          <p className="text-[12.5px] text-[#402E1D]/85">
            We do not give a courier someone’s entire customer history, for example. They receive only the information reasonably necessary to deliver the parcel.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "international-transfers",
    number: "10",
    title: "International Data Transfers",
    content: (
      <>
        <p>
          Because Divine Lotus intends to serve customers internationally, some service providers may process information in countries different from the customer’s own.
        </p>
        <p className="mt-2.5 text-[#402E1D]/85">
          Where privacy law requires safeguards for international transfers, we will use appropriate measures required by applicable law.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    number: "11",
    title: "How Long We Keep Information",
    content: (
      <>
        <p>
          We do not intend to retain personal information indefinitely without reason. Retention periods depend on why the information was collected. For example:
        </p>
        <ul className="list-disc list-inside space-y-1.5 my-2.5 pl-1 text-[13.5px]">
          <li><strong>Order/transaction records:</strong> May need to be retained for accounting, tax, warranty, fraud-prevention or legal purposes.</li>
          <li><strong>Customer-service records:</strong> May be retained for a reasonable period to resolve disputes or understand previous communications.</li>
          <li><strong>Marketing information:</strong> May be retained until consent is withdrawn or the information is no longer reasonably required, subject to applicable law.</li>
        </ul>
        <p className="text-[#402E1D]/80 text-[12.5px]">
          Information will be deleted, anonymised or otherwise handled appropriately when it is no longer reasonably required, subject to legal retention obligations.
        </p>
      </>
    ),
  },
  {
    id: "security",
    number: "12",
    title: "Security",
    content: (
      <>
        <p className="mb-2">
          We take reasonable organisational and technical measures to protect personal information. These may include:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 my-2.5 text-[13px] text-[#1E140D]">
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ HTTPS/SSL encryption</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ Secure hosting</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ Restricted administrative access</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ Strong account authentication</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ Secure payment providers</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">✓ Website backups & updates</div>
        </div>
        <p className="text-[12.5px] text-[#402E1D]/75 mt-2">
          However, no internet-based system can guarantee absolute security.
        </p>
      </>
    ),
  },
  {
    id: "privacy-rights",
    number: "13",
    title: "Your Privacy Rights",
    content: (
      <>
        <p className="mb-2">
          Depending on where you live, privacy law may give you rights regarding your personal information. These may include the right to:
        </p>
        <ul className="list-disc list-inside space-y-1.5 pl-1 text-[13.5px]">
          <li>Request access to personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion where applicable</li>
          <li>Withdraw consent</li>
          <li>Object to or restrict certain processing</li>
          <li>Request portability where applicable</li>
          <li>Opt out of marketing</li>
          <li>Raise a privacy complaint</li>
        </ul>
        <p className="mt-2.5 text-[#402E1D]/80 text-[12.5px]">
          The exact rights available depend on the law applicable to the individual and the processing involved.
        </p>
      </>
    ),
  },
  {
    id: "withdrawing-consent",
    number: "14",
    title: "Withdrawing Consent",
    content: (
      <>
        <p>
          Where we rely on consent, you may withdraw that consent.
        </p>
        <p className="mt-2.5">
          Withdrawing marketing consent does not affect the lawfulness of processing that occurred before withdrawal and does not prevent us from using information where another lawful reason applies  - for example, retaining transaction records required by tax law.
        </p>
        <p className="mt-2.5 text-[#402E1D]/85">
          We aim to make withdrawing consent reasonably straightforward.
        </p>
      </>
    ),
  },
  {
    id: "children-privacy",
    number: "15",
    title: "Children’s Privacy",
    content: (
      <>
        <p>
          The Lotus Seat and our commercial website are not specifically directed toward young children.
        </p>
        <p className="mt-2.5">
          We do not knowingly seek to collect children’s personal information for marketing purposes without any consent or other safeguards required by applicable law.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          If we become aware that personal information has been collected improperly from a child, we will take appropriate steps.
        </p>
      </>
    ),
  },
  {
    id: "third-party-links",
    number: "16",
    title: "Third-Party Links",
    content: (
      <>
        <p>
          Our website or Sadhana resources may occasionally link to external websites, videos or services.
        </p>
        <p className="mt-2.5">
          Those third parties operate under their own privacy practices. Divine Lotus is not responsible for the privacy practices of independent third-party websites.
        </p>
      </>
    ),
  },
  {
    id: "changes-to-policy",
    number: "17",
    title: "Changes to This Privacy Policy",
    content: (
      <>
        <p>
          We may update this Privacy Policy as:
        </p>
        <ul className="list-disc list-inside space-y-1 my-2 pl-1 text-[13.5px]">
          <li>Our services change</li>
          <li>New website technologies are introduced</li>
          <li>We enter new markets</li>
          <li>Privacy requirements change</li>
        </ul>
        <p className="text-[#402E1D]/85 mt-2">
          The current version will be published on this page with an updated Last updated date. Material changes will be communicated where required.
        </p>
      </>
    ),
  },
  {
    id: "privacy-questions-requests",
    number: "18",
    title: "Privacy Questions & Requests",
    content: (
      <>
        <p>
          To ask a privacy question or exercise an applicable privacy right, contact:
        </p>
        <div className="my-3.5 p-4 rounded-2xl bg-[#EFECE5] space-y-1.5">
          <div className="font-bold text-[#1E140D] text-[14px]">Divine Lotus</div>
          <div className="text-[13px]"><span className="text-[#402E1D]/75">Legal company name:</span> Divine Lotus</div>
          <div className="text-[13px]">
            <span className="text-[#402E1D]/75">Email:</span>{" "}
            <a href="mailto:theedivinelotuss@gmail.com" className="text-[#876540] hover:text-[#1E140D] font-bold transition-colors">
              theedivinelotuss@gmail.com
            </a>
          </div>
        </div>
        <p className="text-[12.5px] text-[#402E1D]/80">
          Please provide enough information for us to understand and appropriately verify the request without sending unnecessary sensitive information.
        </p>
      </>
    ),
  },
  {
    id: "mandatory-privacy-rights",
    number: "19",
    title: "Mandatory Privacy Rights",
    content: (
      <>
        <p className="font-medium text-[#876540]">
          Nothing in this Privacy Policy is intended to remove or restrict privacy rights that cannot legally be waived under applicable law.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
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
              /PRIVACY POLICY
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
            Privacy Policy
          </motion.h1>

          {/* Summary Lead */}
          <motion.p 
            variants={heroItemVariants}
            className="font-sans text-[13.5px] sm:text-[15.5px] md:text-[17px] leading-[1.6] sm:leading-[1.65] text-[#F0EBE3] max-w-[760px] mb-5 sm:mb-6"
          >
            At Divine Lotus, privacy should be simple: we collect only what is reasonably needed to operate our website, communicate with you, and fulfil orders. We do not sell your data to advertisers.
          </motion.p>

          {/* Guarantee Card */}
          <motion.div 
            variants={heroItemVariants}
            className="bg-white/12 backdrop-blur-md rounded-[22px] sm:rounded-[28px] p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 max-w-[820px]"
          >
            <div>
              <div className="font-display font-semibold text-[15px] sm:text-[18px] text-white mb-0.5">
                Data Transparency & Rights
              </div>
              <p className="font-sans text-[12px] sm:text-[13px] text-[#F0EBE3]/85 leading-relaxed">
                Full transparency across data collection, encryption, cookies, third-party services, and your rights.
              </p>
            </div>
            <a
              href="#privacy-rights"
              className="px-4 py-2 rounded-full bg-white text-[#1E140D] hover:bg-[#F6F3ED] font-sans text-[11.5px] sm:text-[12px] font-semibold transition-colors shrink-0 text-center self-start sm:self-auto"
            >
              Your Rights
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
                <span>Privacy Index ({privacySections.length} Sections)</span>
                <span className="text-[11px] font-bold text-[#876540] transition-transform duration-200 group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <nav className="mt-3 pt-3 border-t border-[#402E1D]/8 space-y-1 font-sans text-[12.5px]">
                {privacySections.map((item) => (
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
                Privacy Index
              </div>

              <nav className="space-y-1 font-sans text-[12.5px] max-h-[36vh] overflow-y-auto no-scrollbar">
                {privacySections.map((item) => (
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
                Privacy Questions?
              </div>
              <p className="font-sans text-[12px] text-[#402E1D]/75 leading-relaxed">
                Contact our data privacy desk for any inquiries or to exercise your privacy rights.
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
                      <linearGradient id="btn-privacy-fill" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FAF7F2" />
                        <stop offset="50%" stopColor="#F4EFE9" />
                        <stop offset="100%" stopColor="#FAF7F2" />
                      </linearGradient>
                      <linearGradient id="btn-privacy-border" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="rgba(64, 46, 29, 0.15)" />
                        <stop offset="50%" stopColor="rgba(135, 101, 64, 0.35)" />
                        <stop offset="100%" stopColor="rgba(64, 46, 29, 0.15)" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 23 0 L 173 0 C 180 0 185 7 190 7 C 195 7 200 0 213 0 A 23 23 0 1 1 213 46 C 200 46 195 39 190 39 C 185 39 180 46 173 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                      fill="url(#btn-privacy-fill)"
                      stroke="url(#btn-privacy-border)"
                      strokeWidth="1.4"
                    />
                  </svg>

                  {/* Button Text */}
                  <div className="absolute left-0 top-0 bottom-0 w-[170px] flex items-center justify-center pointer-events-none px-2">
                    <span className="font-sans text-[11.5px] font-bold tracking-[0.02em] text-[#1E140D] truncate">
                      Email Privacy Desk
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
                <span>Our Privacy Commitment</span>
              </div>
              <p className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.7] text-[#402E1D]/90">
                At Divine Lotus, privacy should be simple: we collect only the information we reasonably need to operate our website, communicate with you, fulfil orders, improve our services and meet our legal obligations.
              </p>
              <p className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.7] text-[#402E1D]/90 mt-2.5 font-semibold text-[#1E140D]">
                We do not sell your personal information to advertisers.
              </p>
              <p className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.7] text-[#402E1D]/90 mt-2.5">
                This Privacy Policy explains what information we may collect through <a href="https://thelotusseat.com" target="_blank" rel="noopener noreferrer" className="text-[#876540] font-bold hover:underline">thelotusseat.com</a>, why we use it, who we may share it with, and the choices and rights available to you.
              </p>
            </motion.section>

            {/* All 19 Sections */}
            {privacySections.map((item) => (
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
                Privacy Questions?
              </div>
              <p className="font-sans text-[12.5px] text-[#402E1D]/80 leading-relaxed">
                Contact our privacy team directly for data requests or questions.
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
                      <linearGradient id="btn-privacy-mob-fill" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FAF7F2" />
                        <stop offset="50%" stopColor="#F3EFE8" />
                        <stop offset="100%" stopColor="#FAF7F2" />
                      </linearGradient>
                      <linearGradient id="btn-privacy-mob-border" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="rgba(64, 46, 29, 0.15)" />
                        <stop offset="50%" stopColor="rgba(135, 101, 64, 0.4)" />
                        <stop offset="100%" stopColor="rgba(64, 46, 29, 0.15)" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 23 0 L 173 0 C 180 0 185 7 190 7 C 195 7 200 0 213 0 A 23 23 0 1 1 213 46 C 200 46 195 39 190 39 C 185 39 180 46 173 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                      fill="url(#btn-privacy-mob-fill)"
                      stroke="url(#btn-privacy-mob-border)"
                      strokeWidth="1.4"
                    />
                  </svg>

                  <div className="absolute left-0 top-0 bottom-0 w-[170px] flex items-center justify-center pointer-events-none px-2">
                    <span className="font-sans text-[11.5px] font-bold tracking-[0.02em] text-[#1E140D] truncate">
                      Email Privacy Desk
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
