'use client';

import { motion } from 'framer-motion';

export default function ScriptDraw({
  text,
  className = '',
  withUnderline = true,
}: {
  text: string;
  className?: string;
  withUnderline?: boolean;
}) {
  return (
    <div className={`inline-flex flex-col items-center sm:items-start ${className}`}>
      <motion.span
        initial={{ clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="font-handwriting text-3xl sm:text-4xl text-[#2F5D3A] whitespace-nowrap block"
      >
        {text}
      </motion.span>
      {withUnderline && (
        <svg
          viewBox="0 0 200 12"
          fill="none"
          className="w-36 sm:w-44 h-2.5 text-[#C9973A] mt-0.5 overflow-visible"
        >
          <motion.path
            d="M 5 6 Q 100 12 195 4"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          />
        </svg>
      )}
    </div>
  );
}
