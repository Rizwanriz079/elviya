'use client';

import { motion } from 'framer-motion';

export default function LetterSpaceExpand({
  text,
  className = '',
  targetSpacing = '0.28em',
}: {
  text: string;
  className?: string;
  targetSpacing?: string;
}) {
  return (
    <motion.span
      initial={{ letterSpacing: '0.05em', opacity: 0 }}
      whileInView={{ letterSpacing: targetSpacing, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-block uppercase font-semibold ${className}`}
    >
      {text}
    </motion.span>
  );
}
