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
    if (!words || words.length === 0) return;
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  // If used for words carousel
  if (words && words.length > 0) {
    return (
      <span className={`inline-block relative overflow-hidden align-baseline ${className}`}>
        <AnimatePresence mode="wait">
          <motion.span
            key={words[wordIndex]}
            initial={{ y: '100%', opacity: 0, rotateX: 45 }}
            animate={{ y: '0%', opacity: 1, rotateX: 0 }}
            exit={{ y: '-100%', opacity: 0, rotateX: -45 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block whitespace-nowrap bg-gradient-to-r from-[#C9973A] via-[#E5C07B] to-[#C9973A] bg-clip-text text-transparent font-serif italic"
          >
            {words[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  }

  // If used for numeric value rolling
  return (
    <span className={`inline-block relative overflow-hidden align-baseline ${className}`}>
      <AnimatePresence mode="wait">
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
