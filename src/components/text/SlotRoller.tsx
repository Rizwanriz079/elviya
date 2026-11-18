'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlotRollerProps {
  words?: string[];
  value?: number;
  prefix?: string;
  suffix?: string;
  interval?: number;
  className?: string;
}

export default function SlotRoller({
  words,
  value,
  prefix = '',
  suffix = '',
  interval = 2800,
  className = '',
}: SlotRollerProps) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (!words || words.length <= 1) return;
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  // If used for words carousel
  if (words && words.length > 0) {
    const currentWord = words[wordIndex] ?? words[0];
    return (
      <span
        className={`inline-flex items-center relative overflow-hidden align-middle h-[1.4em] min-w-[6.5rem] sm:min-w-[8rem] ${className}`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={currentWord}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block whitespace-nowrap text-[#C9973A] font-serif font-bold italic drop-shadow-xs"
          >
            {currentWord}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  }

  // If used for numeric value rolling
  return (
    <span className={`inline-flex items-center relative overflow-hidden align-middle h-[1.4em] ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {prefix}
          {value}
          {suffix}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
