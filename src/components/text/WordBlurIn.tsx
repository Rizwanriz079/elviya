'use client';

import { motion } from 'framer-motion';

export default function WordBlurIn({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(' ');

  return (
    <p className={className}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ filter: 'blur(8px)', opacity: 0, y: 10 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + idx * 0.05,
          }}
          className="inline-block mr-1.5"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}
