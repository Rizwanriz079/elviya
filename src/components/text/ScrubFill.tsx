'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function ScrubWord({
  word,
  range,
  progress,
  isHighlight,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  isHighlight: boolean;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const y = useTransform(progress, range, [6, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block mr-3 sm:mr-4 ${
        isHighlight ? 'text-[#C9973A]' : 'text-[#2F5D3A]'
      }`}
    >
      {word}
    </motion.span>
  );
}

export default function ScrubFill({
  words,
  className = '',
}: {
  words: { text: string; highlight?: boolean }[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.45'],
  });

  return (
    <div ref={containerRef} className={className}>
      {words.map((item, idx) => {
        const start = idx / words.length;
        const end = (idx + 1) / words.length;
        return (
          <ScrubWord
            key={idx}
            word={item.text}
            range={[start, end]}
            progress={scrollYProgress}
            isHighlight={!!item.highlight}
          />
        );
      })}
    </div>
  );
}
