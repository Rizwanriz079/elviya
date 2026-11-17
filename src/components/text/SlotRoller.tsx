'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function SlotRoller({
  value,
  prefix = '₹',
  className = '',
}: {
  value: number | string;
  prefix?: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-baseline overflow-hidden ${className}`}>
      <span>{prefix}</span>
      <span className="relative inline-block overflow-hidden h-[1.15em] leading-none">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={String(value)}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
