'use client';

import { useSyncExternalStore } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { usePerfMode } from '@/lib/perf';

const subscribeClient = () => () => {};
const getClientSnapshot = () => true;
const getServerClientSnapshot = () => false;

export default function OilDropStoryLine() {
  const isClient = useSyncExternalStore(subscribeClient, getClientSnapshot, getServerClientSnapshot);
  const { isLite, isFinePointer, isReducedMotion } = usePerfMode();
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  const indicatorTop = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  if (!isClient || isLite || !isFinePointer || isReducedMotion) {
    return null;
  }

  const milestones = [
    { label: 'Purity', progress: 0.15 },
    { label: 'Craft', progress: 0.38 },
    { label: 'Care', progress: 0.65 },
    { label: 'Herbal', progress: 0.88 },
  ];

  return (
    <div
      aria-hidden="true"
      className="hidden xl:flex fixed left-5 2xl:left-8 top-36 bottom-28 w-4 flex-col items-center pointer-events-none z-30"
    >
      {/* Vertical Dashed Gold Line */}
      <div className="relative w-[1.5px] h-full bg-gradient-to-b from-[#C9973A]/20 via-[#C9973A]/40 to-[#25D366]/30">
        {/* Milestone Stops */}
        {milestones.map((ms, idx) => (
          <div
            key={idx}
            style={{ top: `${ms.progress * 100}%` }}
            className="absolute -left-[3px] -translate-y-1/2 w-2 h-2 rounded-full bg-[#FDF6EC] border border-[#C9973A] shadow-xs"
          />
        ))}

        {/* Traveling Oil Droplet Indicator */}
        <motion.div
          style={{ top: indicatorTop }}
          className="absolute -left-[7px] -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none"
        >
          {/* Subtle Ring Glow */}
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9973A] opacity-40" />
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#C9973A] fill-current drop-shadow-sm">
            <path d="M12 2C12 2 5 10.5 5 15.5C5 19.1 7.9 22 11.5 22C15.1 22 18 19.1 18 15.5C18 10.5 12 2 12 2Z" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
