"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { ArrowUpRight } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const seatAndPracticeFAQs: FAQItem[] = [
  {
    id: "numbness-discomfort",
    question: "How does The Lotus Seat help with numbness and discomfort?",
    answer:
      "The elevated sitting position, supportive shape and responsive cushioning are designed to distribute pressure more comfortably and reduce some of the physical discomfort that can build during longer sits. Since every body is different, the experience may vary from person to person.",
  },
  {
    id: "back-straight",
    question: "Will The Lotus Seat keep my back straight?",
    answer:
      "The Lotus Seat doesn’t hold the back upright like a chair or backrest. Instead, it supports and gently elevates the pelvis, creating a more balanced foundation from which the spine can rise naturally.",
  },
  {
    id: "postures",
    question: "Can I use it for Siddhasana, Padmasana and Sukhasana?",
    answer:
      "Yes. The Lotus Seat is designed to provide a comfortable, elevated foundation for traditional seated meditation postures such as Siddhasana, Padmasana and Sukhasana. Each posture should always be approached according to individual comfort and mobility.",
  },
  {
    id: "beginners",
    question: "Is it suitable for beginners?",
    answer:
      "Absolutely. The Lotus Seat is made for anyone building a meditation practice as well as experienced practitioners who spend longer periods sitting. There is no required level of flexibility or meditation experience.",
  },
  {
    id: "one-size",
    question: "Will one size work for everyone?",
    answer:
      "The Lotus Seat has been designed to accommodate a broad range of adult sitting positions and body types. Individual comfort will naturally vary depending on height, flexibility, preferred posture and body proportions.",
  },
  {
    id: "long-sessions",
    question: "Can I use The Lotus Seat for long meditation sessions?",
    answer:
      "That’s one of the main reasons it was created. The combination of elevation, pelvic support and responsive cushioning is designed to make longer periods of sitting more comfortable.\n\nThat said, meditation duration should always be increased according to individual comfort rather than forcing the body to remain in a painful position.",
  },
  {
    id: "washable-cover",
    question: "Is the cover removable and washable?",
    answer:
      "Yes. The cover is removable for easy cleaning, and every Lotus Seat also comes with an additional cover. Detailed care instructions will be included with the seat.",
  },
];

const orderingAndOwnershipFAQs: FAQItem[] = [
  {
    id: "difference-original-custom",
    question: "What is the difference between the Original and Custom Lotus Seat?",
    answer:
      "The ergonomic design, materials and sitting experience are the same.\n\nThe Original comes in our signature colour and design.\n\nThe Custom allows you to choose from our available colour and design combinations, making the seat more personal to your practice and space.",
  },
  {
    id: "what-comes-with-order",
    question: "What comes with my order?",
    answer:
      "Every order includes The Lotus Seat, one additional meditation mat, and access to our Sadhana Practice Guide and meditation resources.\n\nEverything needed to begin using the seat will be included when it arrives.",
  },
  {
    id: "shipping-international",
    question: "Do you ship internationally?",
    answer:
      "Yes. We intend to ship The Lotus Seat internationally to supported destinations. Shipping charges and any applicable taxes or duties will depend on the destination and will be shown or communicated during ordering.",
  },
  {
    id: "shipping-time",
    question: "When will my order ship?",
    answer:
      "You’re joining us at the very beginning.\n\nAs part of our first production batch, each Lotus Seat will be prepared after your order is placed. Please allow approximately 3 - 4 weeks for your order to be ready for dispatch.\n\nWe know waiting for something you’ve already ordered requires trust, so we’ll keep you informed about your order as it moves through production and shipping.\n\nThank you for being one of the first people to make The Lotus Seat part of your practice.",
  },
  {
    id: "trial-returns",
    question: "What if The Lotus Seat isn’t right for me?",
    answer:
      "We want the decision to feel comfortable too.\n\nIf The Lotus Seat isn’t right for you, you may request a return in accordance with our return policy. The seat must be returned in its original condition, without damage, stains, marks or other signs of use beyond what our policy permits.\n\nOnce the returned product reaches us and passes inspection, the eligible purchase amount will be refunded, less the applicable return/refund costs.\n\nDepending on the return journey and payment method, the complete process may take approximately 3 - 4 weeks.\n\nWe’ll keep you informed throughout the process, and your eligible refund will remain protected while the return is being completed.",
  },
  {
    id: "cover-replacement",
    question: "Can the cover be replaced later?",
    answer:
      "Yes. The removable cover is designed to be replaceable, allowing the seat to be refreshed over time or given a different appearance without replacing the entire seat.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const headerVariants: Variants = {
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

export default function TheAnswerSection() {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderFAQColumn = (title: string, items: FAQItem[]) => (
    <div className="flex flex-col space-y-3 sm:space-y-3.5">
      {/* Column Category Title */}
      <div className="pb-1 sm:pb-1.5">
        <h3 className="font-sans text-[13px] sm:text-[14px] font-bold tracking-normal uppercase text-[#876540]">
          {title}
        </h3>
      </div>

      {/* Accordion Items */}
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={`w-full rounded-[18px] sm:rounded-[20px] select-none overflow-hidden transition-all duration-300 ${
              isOpen
                ? "bg-[#7A5836] text-white shadow-sm"
                : "bg-white/90 hover:bg-white text-[#1E140D] border border-[#402E1D]/8 shadow-xs"
            }`}
          >
            {/* Accordion Trigger Header */}
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-4.5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between cursor-pointer text-left focus:outline-none gap-3"
              aria-expanded={isOpen}
              aria-label={`Toggle ${item.question}`}
            >
              {/* Question */}
              <span
                className={`font-display text-[15px] sm:text-[16.5px] md:text-[17.5px] font-bold tracking-normal leading-snug transition-colors duration-200 ${
                  isOpen ? "text-white" : "text-[#1E140D]"
                }`}
              >
                {item.question}
              </span>

              {/* Action Arrow */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isOpen
                    ? "bg-white/20 text-white"
                    : "bg-[#FAF7F2] text-[#1E140D]/70"
                }`}
              >
                <ArrowUpRight
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.4] transition-transform duration-300 ${
                    isOpen ? "rotate-90" : "rotate-0"
                  }`}
                />
              </div>
            </button>

            {/* Accordion Body */}
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`px-4.5 sm:px-6 pb-4 sm:pb-5 pt-0 transition-opacity duration-300 ${
                    isOpen ? "opacity-100 delay-75" : "opacity-0"
                  }`}
                >
                  <p className="font-sans text-[13px] sm:text-[14px] leading-[1.65] text-white/90 font-normal whitespace-pre-line">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      id="faq"
      data-header-theme="light"
      className="relative w-full text-[#402E1D] py-14 sm:py-20 lg:py-24 px-4 sm:px-10 lg:px-16 flex flex-col items-center justify-center scroll-mt-16 sm:scroll-mt-24"
    >
      {/* Full-cover Background Image (Laterally Inverted) */}
      <Image
        src="/images/about-bg.avif"
        alt="FAQ section background"
        fill
        priority={false}
        unoptimized
        sizes="100vw"
        className="object-cover object-center scale-x-[-1]"
      />

      {/* Warm overlay for legibility with section color */}
      <div className="absolute inset-0 bg-[#E6DFD4]/45 backdrop-blur-[1px]" />

      {/* Background Sacred Mandala Motifs (Compact Corner Motifs) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute left-0 top-0 -translate-x-1/3 -translate-y-1/3 w-[260px] sm:w-[320px] md:w-[380px] lg:w-[440px] aspect-square pointer-events-none select-none opacity-[0.20] mix-blend-multiply">
          <Image
            src="/images/about.avif"
            alt="Sacred Mandala Motif (Top Left)"
            fill
            unoptimized
            sizes="(max-width: 1024px) 30vw, 20vw"
            className="object-contain object-center"
          />
        </div>

        <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 w-[260px] sm:w-[320px] md:w-[380px] lg:w-[440px] aspect-square pointer-events-none select-none opacity-[0.20] mix-blend-multiply">
          <Image
            src="/images/about.avif"
            alt="Sacred Mandala Motif (Bottom Right)"
            fill
            unoptimized
            sizes="(max-width: 1024px) 30vw, 20vw"
            className="object-contain object-center"
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto">
        {/* TOP SECTION HEADER */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12 lg:mb-14"
        >
          <div>
            {/* Eyebrow */}
            <motion.div variants={headerVariants} className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="font-sans text-[11.5px] sm:text-[12.5px] font-bold tracking-normal uppercase text-[#876540]">
                /FAQS
              </span>
            </motion.div>

            {/* Main Headline with kinetic reveal */}
            <AnimatedHeading
              text="Everything you might want to know."
              className="font-display font-bold text-[34px] sm:text-[44px] md:text-[50px] lg:text-[56px] leading-[1.06] tracking-[-0.015em] text-[#1E140D] max-w-[480px]"
            />
          </div>

          {/* Narrative Paragraph on Right */}
          <motion.p
            variants={headerVariants}
            className="font-sans text-[14px] sm:text-[15.5px] leading-[1.68] text-[#402E1D]/80 font-normal max-w-[460px] md:pb-1"
          >
            From how it feels to shipping, care and returns - here are the details before you decide.
          </motion.p>
        </motion.div>

        {/* 2-COLUMN CATEGORIZED FAQ GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start">
          {renderFAQColumn("THE SEAT & PRACTICE", seatAndPracticeFAQs)}
          {renderFAQColumn("ORDERING & OWNERSHIP", orderingAndOwnershipFAQs)}
        </div>
      </div>
    </section>
  );
}
