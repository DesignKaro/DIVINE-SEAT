"use client";

import { motion, type Variants } from "framer-motion";

interface AnimatedHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  delay?: number;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (delay: number = 0) => ({
    transition: {
      staggerChildren: 0.022,
      delayChildren: delay,
    },
  }),
};

const letterVariants: Variants = {
  hidden: {
    y: "115%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function AnimatedHeading({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0.05,
}: AnimatedHeadingProps) {
  const words = text.split(" ");

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      custom={delay}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      <span className="flex flex-wrap items-baseline gap-x-[0.26em] gap-y-[0.05em]">
        {words.map((word, wordIdx) => (
          <span
            key={wordIdx}
            className="inline-flex overflow-hidden pt-0.5 pb-2 -mt-0.5 -mb-2"
          >
            {word.split("").map((char, charIdx) => (
              <motion.span
                key={charIdx}
                variants={letterVariants}
                className="inline-block will-change-transform"
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </span>
    </MotionTag>
  );
}
