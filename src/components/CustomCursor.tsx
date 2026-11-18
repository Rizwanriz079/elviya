'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePerfMode } from '@/lib/perf';

const subscribeClient = () => () => {};
const getClientSnapshot = () => true;
const getServerClientSnapshot = () => false;

export default function CustomCursor() {
  const isMounted = useSyncExternalStore(subscribeClient, getClientSnapshot, getServerClientSnapshot);
  const { isLite, isFinePointer, isReducedMotion } = usePerfMode();
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInput, setIsInput] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Dot spring physics
  const dotSpring = { damping: 30, stiffness: 450, mass: 0.2 };
  const dotX = useSpring(cursorX, dotSpring);
  const dotY = useSpring(cursorY, dotSpring);

  // Ring spring physics
  const ringSpring = { damping: 24, stiffness: 220, mass: 0.6 };
  const ringX = useSpring(cursorX, ringSpring);
  const ringY = useSpring(cursorY, ringSpring);

  useEffect(() => {
    if (isLite || !isFinePointer || isReducedMotion) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('input, textarea, select, [contenteditable="true"]')) {
        setIsInput(true);
        setIsHovered(false);
        setCursorLabel(null);
        return;
      }
      setIsInput(false);

      const cursorTarget = target.closest('[data-cursor]');
      if (cursorTarget) {
        const label = cursorTarget.getAttribute('data-cursor');
        setCursorLabel(label);
        setIsHovered(true);
        return;
      }

      const whatsappEl = target.closest('a[href*="wa.me"], button[class*="whatsapp"], .btn-whatsapp');
      if (whatsappEl) {
        setCursorLabel('Order');
        setIsHovered(true);
        return;
      }

      const productEl = target.closest('[data-cursor-view], a[href^="/product"], .product-card');
      if (productEl) {
        setCursorLabel('View');
        setIsHovered(true);
        return;
      }

      const carouselEl = target.closest('[data-carousel], .carousel-container');
      if (carouselEl) {
        setCursorLabel('Drag');
        setIsHovered(true);
        return;
      }

      const interactive = target.closest('a, button, [role="button"]');
      if (interactive) {
        setIsHovered(true);
        setCursorLabel(null);
      } else {
        setIsHovered(false);
        setCursorLabel(null);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isLite, isFinePointer, isReducedMotion]);

  if (!isMounted || isLite || !isFinePointer || isReducedMotion || isInput) return null;

  return (
    <>
      {/* 8px Solid Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ x: dotX, y: dotY }}
      >
        <div className="w-2 h-2 rounded-full bg-[#C9973A] shadow-[0_0_6px_rgba(201,151,58,0.8)]" />
      </motion.div>

      {/* 36px Ring Follower with Spring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform flex items-center justify-center"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          animate={{
            width: cursorLabel ? 56 : isHovered ? 44 : 36,
            height: cursorLabel ? 56 : isHovered ? 44 : 36,
            borderColor: isHovered ? '#C9973A' : 'rgba(47, 93, 58, 0.45)',
            backgroundColor: isHovered ? 'rgba(201, 151, 58, 0.12)' : 'rgba(201, 151, 58, 0)',
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full border border-dashed flex items-center justify-center backdrop-blur-[0.5px]"
        >
          {cursorLabel && (
            <span className="text-[10px] font-bold text-[#2F5D3A] uppercase tracking-wider select-none font-sans bg-[#FDF6EC]/85 px-1.5 py-0.5 rounded-full border border-[#C9973A]/40 shadow-xs">
              {cursorLabel}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
