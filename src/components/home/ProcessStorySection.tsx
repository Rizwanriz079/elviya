'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROCESS_STEPS } from '@/lib/constants';

export default function ProcessStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Desktop horizontal scroll transform (4 cards: translates left as scrolled)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-48%']);

  const stepIcons = [
    // 01: Fresh Neem Leaves
    (
      <svg key="icon-0" className="w-9 h-9 text-[#4C8C4A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    // 02: Pure Virgin Coconut Oil
    (
      <svg key="icon-1" className="w-9 h-9 text-[#C9973A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        <path d="M12 9v5" />
      </svg>
    ),
    // 03: Gentle Traditional Infusion
    (
      <svg key="icon-2" className="w-9 h-9 text-[#2F5D3A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
    // 04: Bottled by Hand
    (
      <svg key="icon-3" className="w-9 h-9 text-[#E0B35C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M9 3h6v3H9z" />
        <path d="M10 6v3a4 4 0 0 1-2 3.46V20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-7.54A4 4 0 0 1 14 9V6" />
        <line x1="8" y1="15" x2="16" y2="15" />
      </svg>
    ),
  ];

  return (
    <div ref={sectionRef} className="relative lg:h-[220vh] bg-[#E8EFE3]/35">
      {/* DESKTOP PINNED HORIZONTAL CONTAINER */}
      <div className="hidden lg:flex sticky top-0 h-screen flex-col justify-center overflow-hidden py-12">
        <div className="max-w-7xl mx-auto px-8 w-full mb-10">
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
        </div>

        {/* Horizontal Track */}
        <motion.div style={{ x }} className="flex gap-8 pl-8 pr-24 w-max">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="w-[420px] bg-[#FDF6EC] p-8 rounded-3xl shadow-botanical border border-[#C9973A]/25 flex flex-col justify-between shrink-0 group hover:shadow-botanical-lg transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-3xl font-bold text-[#C9973A]">
                    {step.step}
                  </span>
                  <div className="w-14 h-14 rounded-2xl bg-[#E8EFE3] flex items-center justify-center border border-[#C9973A]/25 group-hover:scale-105 transition-transform">
                    {stepIcons[idx]}
                  </div>
                </div>

                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#4C8C4A] block mb-1">
                  {step.subtitle}
                </span>

                <h3 className="font-serif text-2xl font-bold text-[#2B1D0E] mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-[#2B1D0E]/75 leading-relaxed">
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
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 px-2">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="w-[84vw] max-w-[340px] snap-center shrink-0 bg-[#FDF6EC] p-7 rounded-3xl shadow-botanical border border-[#C9973A]/25 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-serif text-2xl font-bold text-[#C9973A]">
                    {step.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#E8EFE3] flex items-center justify-center border border-[#C9973A]/25">
                    {stepIcons[idx]}
                  </div>
                </div>

                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#4C8C4A] block mb-1">
                  {step.subtitle}
                </span>

                <h3 className="font-serif text-xl font-bold text-[#2B1D0E] mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#2B1D0E]/75 leading-relaxed">
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
      </div>
    </div>
  );
}
