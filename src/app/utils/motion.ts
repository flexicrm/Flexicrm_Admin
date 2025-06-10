// utils/motion.ts
export const fadeIn = (direction = "up", type = "spring", delay = 0, duration = 0.75) => ({
  initial: {
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    opacity: 0,
  },
  animate: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

export const slideIn = (direction = "left", type = "tween", delay = 0, duration = 0.75) => ({
  initial: {
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
  },
  animate: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

export const zoomIn = (delay = 0, duration = 0.75) => ({
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0) => ({
  animate: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});
