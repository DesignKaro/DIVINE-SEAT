import type { Variants } from "framer-motion";

export const premiumEase = [0.16, 1, 0.3, 1] as const;

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.7,
      delay,
      ease: premiumEase,
    },
  }),
};

export const slideUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      delay,
      ease: premiumEase,
    },
  }),
};

export const cardRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.98,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay,
      ease: premiumEase,
    },
  }),
};

export const containerStaggerVariants: Variants = {
  hidden: {},
  visible: (stagger: number = 0.08) => ({
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.05,
    },
  }),
};
