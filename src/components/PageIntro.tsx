'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageIntro() {
  const [show, setShow] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleComplete = useCallback(() => {
    sessionStorage.setItem('elvia_intro_shown', 'true');
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.splashActive = 'false';
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('elvia:splash-end'));
    }
    setShow(false);
  }, []);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('elvia_intro_shown');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasSeenIntro && !prefersReducedMotion) {
      document.documentElement.dataset.splashActive = 'true';
      window.dispatchEvent(new CustomEvent('elvia:splash-start'));

      const showTimer = setTimeout(() => {
        setShow(true);
      }, 0);

      // Numeric counter 0 -> 100 during 1.1s - 1.7s
      const counterStartTimer = setTimeout(() => {
        const interval = setInterval(() => {
          setCounter((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 5;
          });
        }, 28);
      }, 1050);

      // Auto-exit curtain slide-up at 2.15s
      const exitTimer = setTimeout(() => {
        handleComplete();
      }, 2150);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(counterStartTimer);
        clearTimeout(exitTimer);
      };
    }
  }, [handleComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro-splash"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] bg-[#16301F] flex flex-col items-center justify-center overflow-hidden px-6 text-white"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,151,58,0.2)_0%,transparent_70%)] pointer-events-none" />

          {/* Always-visible Skip Button */}
          <button
            onClick={handleComplete}
            className="absolute top-6 right-6 text-xs uppercase tracking-widest text-[#E8EFE3]/80 hover:text-white px-3.5 py-1.5 rounded-full border border-[#C9973A]/40 transition-colors z-30 backdrop-blur-sm"
          >
            Skip ✕
          </button>

          {/* Bottom-right Corner 0-100 Counter */}
          <div className="absolute bottom-6 right-8 text-right font-mono text-xs text-[#E5C07B]/80 z-20">
            <span>{counter}%</span>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* 0.0s - 0.6s: Falling Golden Oil Drop */}
            <div className="relative w-28 h-28 flex items-center justify-center mb-6">
              <motion.svg
                viewBox="0 0 24 24"
                className="w-10 h-10 text-[#C9973A] fill-current absolute"
                initial={{ y: -70, scale: 0.6, opacity: 0 }}
                animate={{
                  y: [-70, 0, 0],
                  scale: [0.6, 1.1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.65,
                  times: [0, 0.7, 1],
                  ease: 'easeIn',
                }}
              >
                <path d="M12 2C12 2 4 10 4 15C4 19.4 7.6 23 12 23C16.4 23 20 19.4 20 15C20 10 12 2 12 2Z" />
              </motion.svg>

              {/* 0.6s - 1.1s: Landing Ripples Expanding */}
              <motion.div
                className="absolute w-12 h-12 rounded-full border-2 border-[#C9973A]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.8, 2.8],
                  opacity: [0, 0.9, 0],
                }}
                transition={{
                  delay: 0.6,
                  duration: 0.6,
                  ease: 'easeOut',
                }}
              />
              <motion.div
                className="absolute w-12 h-12 rounded-full border border-[#E8EFE3]/60"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.4, 2.2],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  delay: 0.7,
                  duration: 0.55,
                  ease: 'easeOut',
                }}
              />

              {/* 1.1s - 1.7s: Botanical Leaf SVG Stroke Reveal */}
              <motion.svg
                className="w-20 h-20 text-[#C9973A] absolute"
                viewBox="0 0 100 100"
                fill="none"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.05, duration: 0.4 }}
              >
                <motion.path
                  d="M50 12 C32 26 22 50 26 74 C29 84 40 90 50 90 C60 90 71 84 74 74 C78 50 68 26 50 12 Z"
                  stroke="#C9973A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.1, duration: 0.65, ease: 'easeInOut' }}
                />
                <motion.path
                  d="M50 22 V85"
                  stroke="#4C8C4A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.3, duration: 0.45, ease: 'easeInOut' }}
                />
              </motion.svg>
            </div>

            {/* Staggered Brand Wordmark */}
            <div className="overflow-hidden mb-1 flex items-center justify-center gap-0.5">
              {'Elvia'.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 35, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 1.15 + index * 0.05,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#FDF6EC] inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Tracking Expansion on HERBALS */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.35em' }}
              transition={{ delay: 1.35, duration: 0.55, ease: 'easeOut' }}
              className="text-xs uppercase text-[#C9973A] font-semibold"
            >
              HERBALS
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
              className="font-handwriting text-xl text-[#E5C07B] mt-3"
            >
              Made by hand, with love
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
