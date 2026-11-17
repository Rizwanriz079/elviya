'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

function ScrubWord({
  word,
  range,
  progress,
  isHighlight = false,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  isHighlight?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const y = useTransform(progress, range, [8, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block mr-3 sm:mr-5 transition-colors duration-200 ${
        isHighlight ? 'text-[#C9973A]' : 'text-[#2F5D3A]'
      }`}
    >
      {word}
    </motion.span>
  );
}

export default function StatementSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.35'],
  });

  const leafY = useTransform(scrollYProgress, [0, 1], [-40, 180]);
  const leafRotate = useTransform(scrollYProgress, [0, 1], [-15, 35]);

  const statementWords = [
    { text: 'Made', highlight: false },
    { text: 'by', highlight: false },
    { text: 'hand,', highlight: true },
    { text: 'with', highlight: false },
    { text: 'love,', highlight: true },
    { text: 'in', highlight: false },
    { text: 'small', highlight: false },
    { text: 'batches', highlight: false },
    { text: 'in', highlight: false },
    { text: 'Kerala.', highlight: true },
  ];

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-36 relative bg-[#FDF6EC] overflow-hidden border-b border-[#C9973A]/20"
    >
      {/* Drifting Gold Leaf on Side (Desktop Only) */}
      <motion.div
        style={{ y: leafY, rotate: leafRotate }}
        className="hidden lg:block absolute right-12 top-16 w-20 h-28 pointer-events-none opacity-40"
      >
        <Image
          src="/images/leaf-1.png"
          alt="Botanical Leaf Accent"
          fill
          sizes="80px"
          className="object-contain"
        />
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <p className="text-xs uppercase tracking-[0.25em] text-[#C9973A] font-semibold mb-6">
          Our Guiding Philosophy
        </p>

        {/* Big ScrubFill Statement */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-snug sm:leading-tight">
          {statementWords.map((item, index) => {
            const start = index / statementWords.length;
            const end = (index + 1) / statementWords.length;
            return (
              <ScrubWord
                key={index}
                word={item.text}
                range={[start, end]}
                progress={scrollYProgress}
                isHighlight={item.highlight}
              />
            );
          })}
        </h2>

        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 bg-[#C9973A]/40" />
          <p className="font-handwriting text-2xl sm:text-3xl text-[#2F5D3A]">
            Pure Homemade Herbal Oils
          </p>
          <div className="h-[1px] w-12 bg-[#C9973A]/40" />
        </div>
      </div>
    </section>
  );
}
