import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6
    }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
};

export const floatingAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    repeatType: "loop" as const
  }
};

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  opacity: [0.7, 0.9, 0.7],
  transition: {
    duration: 3,
    repeat: Infinity,
    repeatType: "loop" as const
  }
};

export const waterAnimation = {
  rotate: [0, 360],
  transition: {
    duration: 15,
    repeat: Infinity,
    ease: "linear"
  }
};
