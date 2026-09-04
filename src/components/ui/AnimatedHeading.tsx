"use client";

import { motion, type Variants } from "framer-motion";

interface AnimatedHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span";
  className?: string;
  delay?: number;
  viewportAmount?: number;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (delay: number = 0) => ({
    transition: {
      staggerChildren: 0.02,
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
      duration: 0.82,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function AnimatedHeading({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0.05,
  viewportAmount = 0.15,
}: AnimatedHeadingProps) {
  const MotionTag = motion[Tag];
  const isCentered = className.includes("text-center") || className.includes("justify-center");

  // Support multi-line strings separated by newline \n
  const lines = text.split("\n");

  return (
    <MotionTag
      custom={delay}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      className={className}
    >
      <span className="flex flex-col">
        {lines.map((line, lineIdx) => {
          const words = line.trim().split(" ");
          return (
            <span
              key={lineIdx}
              className={`flex flex-wrap items-baseline gap-x-[0.26em] gap-y-[0.05em] ${
                isCentered ? "justify-center" : ""
              }`}
            >
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
          );
        })}
      </span>
    </MotionTag>
  );
}

