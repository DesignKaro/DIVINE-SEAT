"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { 
  ShieldAlert, 
  Sparkles, 
  Clock, 
  Layers, 
  Mail,
  ArrowRight,
  HelpCircle,
  AlertCircle,
  HeartHandshake,
  Compass,
  Activity,
  BookOpen,
  Info,
  ShieldCheck
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

const disclaimerSections = [
  {
    id: "meditation-wellness-product",
    number: "01",
    title: "The Lotus Seat Is a Meditation & Wellness Product",
    content: (
      <>
        <p>
          The Lotus Seat is an ergonomic meditation seat designed to support comfortable seated practice.
        </p>
        <div className="my-3 p-3.5 rounded-2xl bg-[#EFECE5] border-l-2 border-[#876540]">
          <p className="font-semibold text-[#1E140D] text-[13.5px]">Not a Medical Device</p>
          <p className="text-[12.5px] text-[#402E1D]/85 mt-1">
            It is not a medical device and is not intended to diagnose, treat, cure or prevent any disease, injury or medical condition.
          </p>
        </div>
        <p className="text-[#402E1D]/85">
          References on our website to comfort, pressure distribution, pelvic support, posture, numbness, the tailbone, lower-back discomfort or similar experiences describe the design intention and general experience of sitting. They should not be understood as promises of medical treatment or guaranteed outcomes.
        </p>
      </>
    ),
  },
  {
    id: "every-body-is-different",
    number: "02",
    title: "Every Body Is Different",
    content: (
      <>
        <p className="mb-2">People differ in:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 my-2.5 text-[12.5px] text-[#1E140D]">
          <div className="p-2 rounded-lg bg-[#EFECE5]">Anatomy</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">Mobility</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">Flexibility</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">Previous injuries</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">Sitting habits</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">Experience</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">Posture</div>
          <div className="p-2 rounded-lg bg-[#EFECE5]">Condition</div>
        </div>
        <p className="mt-3 text-[13px] text-[#402E1D]/85">
          For this reason, the experience of using The Lotus Seat will naturally vary from person to person. No particular level of comfort, meditation duration, posture or physical result can be guaranteed for every individual.
        </p>
      </>
    ),
  },
  {
    id: "pain-numbness-discomfort",
    number: "03",
    title: "Pain, Numbness & Physical Discomfort",
    content: (
      <>
        <p className="font-medium text-[#1E140D]">
          Meditation should not require ignoring significant physical warning signs.
        </p>
        <p className="mt-2 text-[#402E1D]/90">
          If sitting causes persistent or significant:
        </p>
        <div className="my-2.5 p-3 rounded-xl bg-[#EFECE5] font-semibold text-[#876540] text-[13px] text-center">
          Pain · Numbness · Tingling · Weakness · Loss of sensation · Joint discomfort · Other concerning symptoms
        </div>
        <p className="text-[13px] text-[#402E1D]/90">
          please change position or stop the practice as appropriate.
        </p>
        <p className="mt-2.5 text-[12.5px] text-[#402E1D]/80">
          Persistent or concerning symptoms should be discussed with an appropriately qualified healthcare professional. The Lotus Seat should not be used as a substitute for medical assessment or treatment.
        </p>
      </>
    ),
  },
  {
    id: "meditation-postures",
    number: "04",
    title: "Meditation Postures",
    content: (
      <>
        <p>
          Our website may discuss or illustrate traditional seated postures including:
        </p>
        <ul className="list-disc list-inside space-y-1 my-2 pl-1 text-[13.5px]">
          <li>Siddhasana</li>
          <li>Padmasana</li>
          <li>Sukhasana</li>
          <li>Other seated meditation positions</li>
        </ul>
        <p className="text-[#402E1D]/85">
          These references are educational and are not an instruction to force the body into a particular posture. Meditation postures should be approached according to individual mobility, comfort, experience and appropriate guidance.
        </p>
        <div className="mt-3 p-3.5 rounded-2xl bg-[#EFECE5] border-l-2 border-[#876540]">
          <p className="font-semibold text-[#1E140D] text-[13px]">
            Important Posture Note
          </p>
          <p className="text-[12.5px] text-[#402E1D]/85 mt-0.5">
            In particular, Padmasana should never be forced through the knees or hips. The purpose of The Lotus Seat is to provide a supportive foundation for sitting  - not to make every posture suitable for every person.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "yoga-sutras-teachings",
    number: "05",
    title: "Yoga Sutras & Traditional Teachings",
    content: (
      <>
        <p>
          Divine Lotus may refer to classical yogic teachings concerning asana, meditation, steadiness, comfort, breath and inward practice.
        </p>
        <p className="mt-2.5">
          These teachings are presented in their traditional, philosophical and contemplative context.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          Where a quotation from a traditional text is used, we aim to identify the source appropriately. Translations and interpretations of classical texts can differ between traditions, teachers and translators.
        </p>
      </>
    ),
  },
  {
    id: "prana-nadis-concepts",
    number: "06",
    title: "Prana, Nadis, Ida, Pingala & Sushumna",
    content: (
      <>
        <p>
          Our educational material may discuss traditional yogic concepts including:
        </p>
        <div className="my-2.5 p-3 rounded-xl bg-[#EFECE5] font-semibold text-[#1E140D] text-[13px] text-center">
          Prana · Nadis · Ida · Pingala · Sushumna · Nadi Shodhana
        </div>
        <p className="text-[#402E1D]/85">
          Within yogic traditions, these concepts form part of teachings concerning the subtle body, breath, energy and spiritual practice. They are presented on Divine Lotus in that traditional yogic context.
        </p>
        <p className="mt-2.5 text-[12.5px] text-[#402E1D]/80">
          References to nadis should not be understood as claims that Ida, Pingala or Sushumna are established physical anatomical structures in the same sense as nerves, blood vessels or other structures described by modern anatomy.
        </p>
        <p className="mt-2 text-[12.5px] font-semibold text-[#876540]">
          Similarly, The Lotus Seat does not promise a particular energetic, spiritual or physiological outcome.
        </p>
      </>
    ),
  },
  {
    id: "pranayama",
    number: "07",
    title: "Pranayama",
    content: (
      <>
        <p>
          Breathing practices can vary considerably in intensity and technique.
        </p>
        <p className="mt-2.5">
          Information about pranayama on Divine Lotus is intended for general educational purposes and should not replace appropriate instruction where instruction is needed.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80 text-[13px]">
          More advanced practices including prolonged breath retention or other intensive techniques should be approached with appropriate knowledge and guidance.
        </p>
      </>
    ),
  },
  {
    id: "meditation-spiritual-experience",
    number: "08",
    title: "Meditation & Spiritual Experience",
    content: (
      <>
        <p>
          The Lotus Seat can support the physical conditions of sitting. Meditation itself remains a practice.
        </p>
        <p className="mt-2.5 font-medium text-[#1E140D]">
          We do not guarantee that using The Lotus Seat will produce:
        </p>
        <ul className="list-disc list-inside space-y-1 my-2 pl-1 text-[13.5px]">
          <li>Deeper meditation</li>
          <li>Particular states of consciousness</li>
          <li>Spiritual awakening</li>
          <li>Energetic experiences</li>
          <li>Improved concentration</li>
          <li>Specific emotional or psychological outcomes</li>
        </ul>
        <div className="mt-3 p-3.5 rounded-2xl bg-[#EFECE5]">
          <p className="font-semibold text-[#1E140D] text-[13px]">Our Intention</p>
          <p className="text-[12.5px] text-[#402E1D]/85 mt-0.5">
            To help create a comfortable, stable place from which practice can unfold.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "sadhana-practice-guide",
    number: "09",
    title: "Sadhana Practice Guide",
    content: (
      <>
        <p>
          Customers may receive access to a Sadhana Practice Guide or related meditation resources. These materials are intended for educational and contemplative purposes.
        </p>
        <p className="mt-2.5">
          Where teachings originate from a particular teacher, tradition or source, they should be understood within that context.
        </p>
        <p className="mt-2.5 text-[#402E1D]/80">
          The guide does not replace personalised instruction from an appropriately qualified teacher where such guidance is needed.
        </p>
      </>
    ),
  },
  {
    id: "not-professional-advice",
    number: "10",
    title: "Educational Content Is Not Professional Advice",
    content: (
      <>
        <p>
          Information provided through Divine Lotus  - including the website, Sadhana materials, social media, emails and other communications  - is general information.
        </p>
        <p className="mt-2.5 font-medium text-[#1E140D]">
          It should not be considered personalised:
        </p>
        <div className="my-2 p-3 rounded-xl bg-[#EFECE5] text-[#876540] font-semibold text-[13px] text-center">
          Medical · Physiotherapy · Psychological · Therapeutic · Nutritional · Legal or other professional advice.
        </div>
        <p className="text-[12.5px] text-[#402E1D]/80">
          Questions relating to individual health circumstances should be directed to an appropriately qualified professional.
        </p>
      </>
    ),
  },
  {
    id: "product-use",
    number: "11",
    title: "Product Use",
    content: (
      <>
        <p className="mb-2">
          Customers are responsible for using The Lotus Seat reasonably and according to:
        </p>
        <ul className="list-disc list-inside space-y-1.5 pl-1 text-[13.5px]">
          <li>Their own physical comfort</li>
          <li>Product instructions</li>
          <li>Care instructions</li>
          <li>Appropriate meditation/yoga guidance where relevant</li>
        </ul>
        <p className="mt-3 text-[13px] text-[#402E1D]/85">
          If a particular posture or use causes significant discomfort, the appropriate response is to adjust or stop  - not to remain in the position simply because the seat is designed for meditation.
        </p>
      </>
    ),
  },
  {
    id: "our-philosophy",
    number: "12",
    title: "Our Philosophy",
    content: (
      <>
        <p>
          The Lotus Seat does not replace the practice, the teacher or the wisdom of the traditions from which meditation comes.
        </p>
        <div className="my-3.5 p-4 rounded-2xl bg-[#EFECE5] text-center">
          <p className="font-display font-semibold text-[16px] sm:text-[18px] text-[#1E140D] leading-relaxed italic">
            &ldquo;The seat supports the body.<br />The practice takes us inward.&rdquo;
          </p>
        </div>
      </>
    ),
  },
  {
    id: "contact",
    number: "13",
    title: "Contact",
    content: (
      <>
        <p>
          For questions concerning the product or this disclaimer:
        </p>
        <div className="mt-3.5 p-4 rounded-2xl bg-[#EFECE5] space-y-1.5">
          <div className="font-bold text-[#1E140D] text-[14px]">Divine Lotus Concierge</div>
          <div className="text-[13px]">
            <span className="text-[#402E1D]/75">Email:</span>{" "}
            <a href="mailto:theedivinelotuss@gmail.com" className="text-[#876540] hover:text-[#1E140D] font-bold transition-colors">
              theedivinelotuss@gmail.com
            </a>
          </div>
        </div>
      </>
    ),
  },
];

export default function DisclaimerPage() {
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
              /PRODUCT & WELLNESS DISCLAIMER
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
            Product, Meditation & Wellness Disclaimer
          </motion.h1>

          {/* Summary Lead */}
          <motion.p 
            variants={heroItemVariants}
            className="font-sans text-[13.5px] sm:text-[15.5px] md:text-[17px] leading-[1.6] sm:leading-[1.65] text-[#F0EBE3] max-w-[760px] mb-5 sm:mb-6"
          >
            The Lotus Seat was created to support a more comfortable and stable foundation for meditation. Understand what the product and our educational content are and what they are not.
          </motion.p>

          {/* Guarantee Card */}
          <motion.div 
            variants={heroItemVariants}
            className="bg-white/12 backdrop-blur-md rounded-[22px] sm:rounded-[28px] p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 max-w-[820px]"
          >
            <div>
              <div className="font-display font-semibold text-[15px] sm:text-[18px] text-white mb-0.5">
                Our Foundation & Philosophy
              </div>
              <p className="font-sans text-[12px] sm:text-[13px] text-[#F0EBE3]/85 leading-relaxed">
                Ergonomic sitting foundation designed for practice. Educational yogic content for wellness learning.
              </p>
            </div>
            <a
              href="#our-philosophy"
              className="px-4 py-2 rounded-full bg-white text-[#1E140D] hover:bg-[#F6F3ED] font-sans text-[11.5px] sm:text-[12px] font-semibold transition-colors shrink-0 text-center self-start sm:self-auto"
            >
              Our Philosophy
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
                <span>Disclaimer Index ({disclaimerSections.length} Sections)</span>
                <span className="text-[11px] font-bold text-[#876540] transition-transform duration-200 group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <nav className="mt-3 pt-3 border-t border-[#402E1D]/8 space-y-1 font-sans text-[12.5px]">
                {disclaimerSections.map((item) => (
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
                Disclaimer Index
              </div>

              <nav className="space-y-1 font-sans text-[12.5px] max-h-[36vh] overflow-y-auto no-scrollbar">
                {disclaimerSections.map((item) => (
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
                Have Questions?
              </div>
              <p className="font-sans text-[12px] text-[#402E1D]/75 leading-relaxed">
                Contact our concierge team for any questions regarding product use or guidance.
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
                      <linearGradient id="btn-disc-fill" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FAF7F2" />
                        <stop offset="50%" stopColor="#F4EFE9" />
                        <stop offset="100%" stopColor="#FAF7F2" />
                      </linearGradient>
                      <linearGradient id="btn-disc-border" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="rgba(64, 46, 29, 0.15)" />
                        <stop offset="50%" stopColor="rgba(135, 101, 64, 0.35)" />
                        <stop offset="100%" stopColor="rgba(64, 46, 29, 0.15)" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 23 0 L 173 0 C 180 0 185 7 190 7 C 195 7 200 0 213 0 A 23 23 0 1 1 213 46 C 200 46 195 39 190 39 C 185 39 180 46 173 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                      fill="url(#btn-disc-fill)"
                      stroke="url(#btn-disc-border)"
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
                <Info className="w-4 h-4" />
                <span>Disclaimer Notice</span>
              </div>
              <p className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.7] text-[#402E1D]/90">
                The Lotus Seat was created to support a more comfortable and stable foundation for meditation.
              </p>
              <p className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.7] text-[#402E1D]/90 mt-2.5">
                The information shared by Divine Lotus about meditation, posture, asana, pranayama and traditional yogic teachings is intended to support learning and practice. It is important, however, to understand what the product and this information are and what they are not.
              </p>
              <p className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.7] text-[#402E1D]/90 mt-2.5">
                Nothing in this disclaimer limits any consumer rights that cannot legally be excluded or restricted under applicable law.
              </p>
            </motion.section>

            {/* All 13 Sections */}
            {disclaimerSections.map((item) => (
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
                Have Questions?
              </div>
              <p className="font-sans text-[12.5px] text-[#402E1D]/80 leading-relaxed">
                Contact our support desk directly for questions regarding product guidance or care.
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
                      <linearGradient id="btn-disc-mob-fill" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FAF7F2" />
                        <stop offset="50%" stopColor="#F3EFE8" />
                        <stop offset="100%" stopColor="#FAF7F2" />
                      </linearGradient>
                      <linearGradient id="btn-disc-mob-border" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="rgba(64, 46, 29, 0.15)" />
                        <stop offset="50%" stopColor="rgba(135, 101, 64, 0.4)" />
                        <stop offset="100%" stopColor="rgba(64, 46, 29, 0.15)" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 23 0 L 173 0 C 180 0 185 7 190 7 C 195 7 200 0 213 0 A 23 23 0 1 1 213 46 C 200 46 195 39 190 39 C 185 39 180 46 173 46 L 23 46 A 23 23 0 0 1 23 0 Z"
                      fill="url(#btn-disc-mob-fill)"
                      stroke="url(#btn-disc-mob-border)"
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
