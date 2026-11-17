/**
 * Reusable Motion & Animation System for Botanical Luxe Organic Design
 * 
 * | Section / Component            | Entrance Preset   | Scroll / Interaction       | Ambient Preset       |
 * |--------------------------------|-------------------|----------------------------|----------------------|
 * | Hero Section (Light Scene)     | maskRevealUp      | parallax, magnetic         | floatY, rotateSlow   |
 * | Trust Wave Strip (Deep Forest) | dropIn (bounce)   | drawPath (line icons)      | pulseRing            |
 * | Two-Row Marquee                | fadeUp            | marqueeLoop                | -                    |
 * | Featured Neem (Deep Forest)    | slideInLeft/Right | stickyScrollTelling, scale | bobIndependent       |
 * | Big Statement (Cream)          | scrubFill         | scroll-scrubbed text       | driftLeaf            |
 * | Why Choose Bento (Sage)        | rotateIn, scaleIn | spotlight, tilt3D          | hoverLiftGlow        |
 * | From Leaf to Bottle (Paper)    | cardStackIn       | pinnedHorizontal           | drawPath             |
 * | Traditional Benefits (Cream)   | blurIn            | crossfade + blur           | swayLeaf             |
 * | Almond Oil (Beige/Dark Split)  | clipRevealRight   | spotlight                  | rotateSlow           |
 * | Final CTA (Gold Gradient)      | charStagger       | magnetic, liquidWaveFill   | floatY               |
 * | Footer (Deep Brown)            | fadeUp            | outlineToFill on scroll    | -                    |
 * 
 * RULE: Neighbouring sections never share the same entrance animation preset!
 */

import { Variants, Transition } from 'framer-motion';

export const EASINGS = {
  luxury: [0.22, 1, 0.36, 1] as const,
  curtain: [0.76, 0, 0.24, 1] as const,
  springBounce: { type: 'spring', stiffness: 380, damping: 20 },
  springSmooth: { type: 'spring', stiffness: 320, damping: 28 },
  gentle: [0.25, 0.1, 0.25, 1] as const,
};

// ==================== ENTRANCE PRESETS ====================

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASINGS.luxury, delay: custom * 0.08 },
  }),
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(8px)', y: 18 },
  visible: (custom = 0) => ({
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.8, ease: EASINGS.luxury, delay: custom * 0.08 },
  }),
};

export const maskRevealUp: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, y: 24 },
  visible: (custom = 0) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASINGS.curtain, delay: custom * 0.08 },
  }),
};

export const clipRevealLeft: Variants = {
  hidden: { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 },
  visible: (custom = 0) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: { duration: 0.85, ease: EASINGS.curtain, delay: custom * 0.08 },
  }),
};

export const clipRevealRight: Variants = {
  hidden: { clipPath: 'inset(0% 0% 0% 100%)', opacity: 0 },
  visible: (custom = 0) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: { duration: 0.85, ease: EASINGS.curtain, delay: custom * 0.08 },
  }),
};

export const clipRevealUp: Variants = {
  hidden: { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 },
  visible: (custom = 0) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: { duration: 0.85, ease: EASINGS.curtain, delay: custom * 0.08 },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASINGS.luxury, delay: custom * 0.08 },
  }),
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -44 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: EASINGS.luxury, delay: custom * 0.08 },
  }),
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 44 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: EASINGS.luxury, delay: custom * 0.08 },
  }),
};

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -4, y: 24 },
  visible: (custom = 0) => ({
    opacity: 1,
    rotate: 0,
    y: 0,
    transition: { duration: 0.75, ease: EASINGS.luxury, delay: custom * 0.08 },
  }),
};

export const dropIn: Variants = {
  hidden: { opacity: 0, y: -30, scale: 0.95 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 22,
      delay: custom * 0.08,
    },
  }),
};

export const staggerChildren: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const charStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.15,
    },
  },
};

export const charStaggerItem: Variants = {
  hidden: { opacity: 0, y: 15, rotateZ: 3 },
  visible: {
    opacity: 1,
    y: 0,
    rotateZ: 0,
    transition: {
      duration: 0.45,
      ease: EASINGS.luxury,
    },
  },
};

export const cardStackIn: Variants = {
  hidden: { opacity: 0, y: 35, scale: 0.92 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: EASINGS.luxury, delay: custom * 0.1 },
  }),
};

// ==================== SCROLL PRESETS ====================

export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (custom = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.1, ease: 'easeInOut', delay: custom * 0.1 },
      opacity: { duration: 0.25, delay: custom * 0.1 },
    },
  }),
};

// ==================== AMBIENT PRESETS ====================

export const floatY: Variants = {
  animate: {
    y: [-7, 7, -7],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const rotateSlow: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 25,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export const bobIndependent: Variants = {
  animate: {
    y: [-5, 5, -5],
    x: [-2, 2, -2],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const createBobIndependent = (duration = 4.5, delay = 0): Variants => ({
  animate: {
    y: [-5, 5, -5],
    x: [-2, 2, -2],
    transition: {
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
});

export const pulseRing: Variants = {
  animate: {
    scale: [1, 1.4, 1.4],
    opacity: [0.7, 0, 0],
    transition: {
      duration: 2.2,
      repeat: Infinity,
      ease: 'easeOut',
    },
  },
};

export const transitionLuxury: Transition = {
  duration: 0.7,
  ease: EASINGS.luxury,
};
