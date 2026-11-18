'use client';

import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import { usePerfMode } from '@/lib/perf';

export default function MarqueeStrip() {
  const { isLite, isFinePointer, isReducedMotion } = usePerfMode();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Map scroll velocity to subtle skew (max 5 deg)
  const skewRaw = useTransform(scrollVelocity, [-2000, 0, 2000], [-5, 0, 5]);
  const smoothSkew = useSpring(skewRaw, { damping: 25, stiffness: 220 });

  const shouldSkew = !isLite && isFinePointer && !isReducedMotion;

  const items = [
    '100% Pure',
    'Handmade',
    'Small Batches',
    'No Preservatives',
    'Virgin Coconut Oil',
    'Made with Love',
    'Delivery Across India',
  ];

  return (
    <div className="relative overflow-hidden shadow-inner group">
      {/* Row 1: Gold text on forest green (#2F5D3A) moving left */}
      <div className="py-3 bg-[#2F5D3A] border-y border-[#C9973A]/40 overflow-hidden">
        <motion.div
          style={{ skewX: shouldSkew ? smoothSkew : 0 }}
          className="flex w-max space-x-8 animate-marquee-left group-hover:[animation-play-state:paused] whitespace-nowrap will-change-transform"
        >
          {[...items, ...items, ...items, ...items].map((text, idx) => (
            <div key={`r1-${idx}`} className="flex items-center space-x-8">
              <span className="font-serif text-xs sm:text-sm font-semibold tracking-wider text-[#E5C07B]">
                {text}
              </span>
              <span className="text-[#C9973A] text-xs">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2: Outlined text on cream moving right */}
      <div className="py-2.5 bg-[#FDF6EC] border-b border-[#C9973A]/25 overflow-hidden">
        <motion.div
          style={{ skewX: shouldSkew ? smoothSkew : 0 }}
          className="flex w-max space-x-8 animate-marquee-right group-hover:[animation-play-state:paused] whitespace-nowrap will-change-transform"
        >
          {[...items, ...items, ...items, ...items].map((text, idx) => (
            <div key={`r2-${idx}`} className="flex items-center space-x-8">
              <span className="font-serif text-xs sm:text-xs uppercase tracking-widest font-bold text-transparent [-webkit-text-stroke:1px_#2F5D3A]">
                {text}
              </span>
              <span className="text-[#C9973A] text-xs">❋</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
