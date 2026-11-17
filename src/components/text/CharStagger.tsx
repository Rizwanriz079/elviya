'use client';

import { motion } from 'framer-motion';

export default function CharStagger({
  text,
  className = '',
  charClassName = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
}) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split('').map((char, idx) => (
        <motion.span
          key={idx}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + idx * 0.03,
          }}
          className={`inline-block ${charClassName}`}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}
