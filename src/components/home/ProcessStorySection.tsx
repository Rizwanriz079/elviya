'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROCESS_STEPS } from '@/lib/constants';
import OutlineToFill from '@/components/text/OutlineToFill';

export default function ProcessStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Desktop horizontal scroll transform (4 cards: translates left as scrolled)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-52%']);
  const progressLineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const stepSvgs = [
    '/images/step-1.svg',
    '/images/step-2.svg',
    '/images/step-3.svg',
    '/images/step-4.svg',
  ];

  return (
    <div ref={sectionRef} className="relative lg:h-[240vh] bg-[#FDF6EC] border-b border-[#C9973A]/20">
      {/* DESKTOP PINNED HORIZONTAL CONTAINER */}
      <div className="hidden lg:flex sticky top-0 h-screen flex-col justify-center overflow-hidden py-12">
        <div className="max-w-7xl mx-auto px-8 w-full mb-8">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#2F5D3A] uppercase">
                Traditional Craftsmanship
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#2B1D0E] mt-2">
                From Leaf to Bottle
              </h2>
            </div>
            <p className="text-sm text-[#2B1D0E]/75 font-medium max-w-xs text-right">
              Scroll to explore how our herbal oils are prepared by hand in Kerala.
            </p>
          </div>

          {/* Progress Line */}
          <div className="mt-6 w-full h-[2px] bg-[#C9973A]/20 rounded-full overflow-hidden">
            <motion.div
              style={{ width: progressLineWidth }}
              className="h-full bg-[#C9973A] rounded-full"
            />
          </div>
        </div>

        {/* Horizontal Track */}
        <motion.div style={{ x }} className="flex gap-8 pl-8 pr-28 w-max">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="w-[440px] bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-botanical border border-[#C9973A]/25 flex flex-col justify-between shrink-0 group hover:shadow-botanical-lg transition-all duration-300 relative overflow-hidden"
            >
              {/* Giant Outlined Step Number in Background */}
              <div className="absolute top-4 right-6 pointer-events-none select-none">
                <OutlineToFill
                  text={step.step}
                  className="text-7xl sm:text-8xl opacity-30 group-hover:opacity-60 transition-opacity"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#E8EFE3] flex items-center justify-center border border-[#C9973A]/30 p-2 group-hover:scale-105 transition-transform">
                    <Image
                      src={stepSvgs[idx]}
                      alt={step.title}
                      width={44}
                      height={44}
                      className="object-contain"
                    />
                  </div>
                </div>

                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#4C8C4A] block mb-1">
                  {step.subtitle}
                </span>

                <h3 className="font-serif text-2xl font-bold text-[#2B1D0E] mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-[#2B1D0E]/75 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#C9973A]/20 flex items-center justify-between text-xs text-[#2F5D3A] font-semibold">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4C8C4A]" />
                  Small batch preparation
                </span>
                <span>✦ Kerala</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* MOBILE SNAP CAROUSEL */}
      <div className="lg:hidden py-20 px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold tracking-widest text-[#2F5D3A] uppercase">
            Traditional Craftsmanship
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#2B1D0E] mt-2 mb-3">
            From Leaf to Bottle
          </h2>
          <p className="text-sm text-[#2B1D0E]/80">
            Swipe to see our traditional preparation in Kerala.
          </p>
        </div>

        {/* Snap Track */}
        <div
          onScroll={(e) => {
            const el = e.currentTarget;
            const scrollLeft = el.scrollLeft;
            const cardWidth = el.scrollWidth / PROCESS_STEPS.length;
            const index = Math.round(scrollLeft / cardWidth);
            setActiveMobileIndex(index);
          }}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 px-2"
        >
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="w-[84vw] max-w-[340px] snap-center shrink-0 bg-white/80 p-7 rounded-3xl shadow-botanical border border-[#C9973A]/25 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Outlined Step Number */}
              <div className="absolute top-4 right-6 pointer-events-none select-none">
                <span className="font-serif font-black text-6xl text-transparent [-webkit-text-stroke:1px_rgba(201,151,58,0.35)]">
                  {step.step}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#E8EFE3] flex items-center justify-center border border-[#C9973A]/25 p-2">
                    <Image
                      src={stepSvgs[idx]}
                      alt={step.title}
                      width={38}
                      height={38}
                      className="object-contain"
                    />
                  </div>
                </div>

                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#4C8C4A] block mb-1">
                  {step.subtitle}
                </span>

                <h3 className="font-serif text-xl font-bold text-[#2B1D0E] mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#2B1D0E]/75 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#C9973A]/20 flex items-center justify-between text-xs text-[#2F5D3A] font-semibold">
                <span>Handmade in Kerala</span>
                <span>✦</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {PROCESS_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeMobileIndex === i ? 'w-6 bg-[#2F5D3A]' : 'w-2 bg-[#C9973A]/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
