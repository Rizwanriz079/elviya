/**
 * Reusable Motion Presets for Botanical Luxe Organic Design System
 * 
 * | Preset Name       | Used In Section / Component                              | Description                                      |
 * |-------------------|----------------------------------------------------------|--------------------------------------------------|
 * | fadeUp            | Global cards, testimonials, footer links, text blocks    | Soft upward motion with spring dampening         |
 * | blurIn            | Headings, hero subtitles, contact title                  | Filter blur(8px) -> 0 with opacity               |
 * | maskRevealUp      | Hero kinetic headline, section titles                    | Vertical clip-path mask reveal (curtain up)      |
 * | clipRevealLeft    | Story alternating blocks (left image), bento feature     | Horizontal clip-path mask reveal from left       |
 * | clipRevealRight   | Story alternating blocks (right image), process steps    | Horizontal clip-path mask reveal from right      |
 * | scaleIn           | Product bottles, badges, floating cards                  | Scale 0.92 -> 1.0 with natural bounce            |
 * | slideInLeft       | Featured Neem callouts (odd items), timeline steps       | Translate X from -40px to 0                      |
 * | slideInRight      | Featured Neem callouts (even items), values cards        | Translate X from +40px to 0                      |
 * | wordStagger       | Hero description, scrubFill statement container          | Staggered container for word-by-word reveal      |
 * | charStagger       | PageIntro brand title, About hero title                  | Staggered container for character-by-character   |
 * | countUp           | PageIntro loading counter (0-100), About purity stats    | Number counting animation helper                 |
 * | drawPath          | Leaf SVG outlines, timeline connectors, intro ripples    | SVG stroke pathLength: 0 -> 1                    |
 * | parallax          | Background leaves, golden dust particles, hero bottle    | Parallax scroll offset calculations              |
 * | scrubFill         | Big statement section ("Made by hand...")                | Color scrub reveal on scroll                     |
 * | spotlight         | Bento cards, contact info boxes, why-choose cards        | Mouse-following radial highlight effect          |
 * | tilt              | Desktop product preview card, values flip cards          | 3D perspective mouse tilt                        |
 * | magnetic          | WhatsApp primary CTAs, order buttons                     | Physics magnetic pull toward mouse               |
 * | flipCard          | About page value pillars (interactive 3D flip)           | 180-degree Y-axis flip                           |
 */

import { Variants, Transition } from 'framer-motion';

// Easing presets
export const EASINGS = {
  luxury: [0.22, 1, 0.36, 1] as const, // Custom botanical ease-out
  curtain: [0.76, 0, 0.24, 1] as const, // Expressive reveal
  gentleSpring: { type: 'spring', stiffness: 260, damping: 25 },
  fluidSpring: { type: 'spring', stiffness: 350, damping: 30 },
  bouncySpring: { type: 'spring', stiffness: 400, damping: 18 },
};

// 1. fadeUp
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASINGS.luxury,
      delay: custom * 0.1,
    },
  }),
};

// 2. blurIn
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(8px)', y: 16 },
  visible: (custom = 0) => ({
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASINGS.luxury,
      delay: custom * 0.1,
    },
  }),
};

// 3. maskRevealUp (Clip path mask from bottom to top)
export const maskRevealUp: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: EASINGS.curtain,
      delay: custom * 0.1,
    },
  }),
};

// 4. clipRevealLeft & clipRevealRight
export const clipRevealLeft: Variants = {
  hidden: { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 },
  visible: (custom = 0) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: EASINGS.curtain,
      delay: custom * 0.1,
    },
  }),
};

export const clipRevealRight: Variants = {
  hidden: { clipPath: 'inset(0% 0% 0% 100%)', opacity: 0 },
  visible: (custom = 0) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: EASINGS.curtain,
      delay: custom * 0.1,
    },
  }),
};

// 5. scaleIn
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: EASINGS.luxury,
      delay: custom * 0.1,
    },
  }),
};

// 6. slideInLeft & slideInRight
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: EASINGS.luxury,
      delay: custom * 0.1,
    },
  }),
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: EASINGS.luxury,
      delay: custom * 0.1,
    },
  }),
};

// 7. wordStagger
export const wordStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const wordStaggerItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: EASINGS.luxury,
    },
  },
};

// 8. charStagger
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

// 9. drawPath (SVG drawing)
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (custom = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 1.2,
        ease: 'easeInOut',
        delay: custom * 0.1,
      },
      opacity: { duration: 0.3, delay: custom * 0.1 },
    },
  }),
};

// 10. flipCard (3D perspective flip)
export const flipCardInner: Variants = {
  front: {
    rotateY: 0,
    transition: { duration: 0.6, ease: EASINGS.luxury },
  },
  back: {
    rotateY: 180,
    transition: { duration: 0.6, ease: EASINGS.luxury },
  },
};

// Standard transition helpers
export const transitionNormal: Transition = {
  duration: 0.6,
  ease: EASINGS.luxury,
};

export const transitionSpring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 25,
};
