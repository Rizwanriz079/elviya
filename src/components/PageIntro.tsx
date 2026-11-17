'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageIntro() {
  const [show, setShow] = useState(false);

  const handleComplete = useCallback(() => {
    sessionStorage.setItem('elvia_intro_shown', 'true');
    setShow(false);
  }, []);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('elvia_intro_shown');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasSeenIntro && !prefersReducedMotion) {
      const showTimer = setTimeout(() => {
        setShow(true);
      }, 0);

      const timer = setTimeout(() => {
        handleComplete();
      }, 1900);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(timer);
      };
    }
  }, [handleComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro-curtain"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] bg-[#1E3F27] flex flex-col items-center justify-center overflow-hidden px-6 text-white"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(76,140,74,0.35)_0%,transparent_70%)] pointer-events-none" />

          {/* Skip Button */}
          <button
            onClick={handleComplete}
            className="absolute top-6 right-6 text-xs uppercase tracking-widest text-[#E8EFE3]/70 hover:text-white px-3 py-1.5 rounded-full border border-[#C9973A]/40 transition-colors z-20"
          >
            Skip ✕
          </button>

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* SVG Botanical Leaf Drawing */}
            <svg
              className="w-20 h-20 mb-4 text-[#C9973A]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M50 10 C30 25 20 50 25 75 C28 85 40 92 50 92 C60 92 72 85 75 75 C80 50 70 25 50 10 Z"
                stroke="#C9973A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
              />
              <motion.path
                d="M50 20 V88"
                stroke="#4C8C4A"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              />
              <motion.path
                d="M50 40 L65 32 M50 55 L35 48 M50 70 L65 62"
                stroke="#E0B35C"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
              />
            </svg>

            {/* Brand Title Revealed Wordmark */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="font-serif text-3xl sm:text-4xl tracking-wider text-[#FDF6EC]"
            >
              ELVIA <span className="text-[#C9973A] font-light tracking-widest text-2xl">HERBALS</span>
            </motion.h1>

            {/* Handwritten Tagline */}
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="font-script text-xl sm:text-2xl text-[#E0B35C] mt-2 tracking-wide"
            >
              Made by Hand, With Love
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
