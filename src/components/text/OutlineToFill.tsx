'use client';

import { motion } from 'framer-motion';

export default function OutlineToFill({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0.4 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-block font-serif font-black transition-all duration-700 text-transparent [-webkit-text-stroke:1.5px_rgba(201,151,58,0.45)] hover:text-[#2F5D3A] hover:[-webkit-text-stroke:0px] ${className}`}
    >
      {text}
    </motion.span>
  );
}
