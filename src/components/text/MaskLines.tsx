'use client';

import { motion } from 'framer-motion';

export default function MaskLines({
  lines,
  className = '',
  lineClassName = '',
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
}) {
  return (
    <div className={className}>
      {lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden py-0.5">
          <motion.span
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.75,
              ease: [0.76, 0, 0.24, 1],
              delay: idx * 0.12,
            }}
            className={`inline-block ${lineClassName}`}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
