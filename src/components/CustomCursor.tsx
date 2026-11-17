'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 24, stiffness: 280, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || isReducedMotion) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('a, button, input, textarea, select, [data-interactive="true"], [role="button"]');
      setIsHovered(!!interactive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      {/* Outer Leaf Halo / Glow */}
      <motion.div
        animate={{
          scale: isClicked ? 0.8 : isHovered ? 1.7 : 1,
          rotate: isHovered ? 45 : 0,
          opacity: isHovered ? 0.9 : 0.6,
        }}
        transition={{ duration: 0.2 }}
        className="w-8 h-8 rounded-full border border-[#C9973A] bg-[#2F5D3A]/10 backdrop-blur-[1px] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      >
        {/* Inner Leaf Accent */}
        <svg
          className="w-3.5 h-3.5 text-[#2F5D3A] opacity-75"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-4.97-4.48-9-10-9z" opacity="0.3" />
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66C7.57 17.5 9.5 12 17 10V8z" fill="#4C8C4A" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
