'use client';

import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '@/lib/constants';

export default function ProcessStorySection() {
  const stepIcons = [
    // 01: Neem
    (
      <svg key="icon-0" className="w-10 h-10 text-[#4C8C4A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    // 02: Cleaned
    (
      <svg key="icon-1" className="w-10 h-10 text-[#C9973A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        <path d="M12 9v5" />
      </svg>
    ),
    // 03: Infusion
    (
      <svg key="icon-2" className="w-10 h-10 text-[#2F5D3A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
    // 04: Bottled
    (
      <svg key="icon-3" className="w-10 h-10 text-[#E0B35C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M9 3h6v3H9z" />
        <path d="M10 6v3a4 4 0 0 1-2 3.46V20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-7.54A4 4 0 0 1 14 9V6" />
        <line x1="8" y1="15" x2="16" y2="15" />
      </svg>
    ),
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#E8EFE3]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#2F5D3A] uppercase">
            Process
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B1D0E] mt-2 mb-4">
            From Leaf to Bottle
          </h2>
          <p className="text-base sm:text-lg text-[#2B1D0E]/80">
            Handmade in Kerala in small batches.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-[2px] bg-gradient-to-r from-[#4C8C4A] via-[#C9973A] to-[#2F5D3A] -translate-y-12 z-0 opacity-40" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-8 rounded-3xl shadow-botanical hover:shadow-botanical-lg transition-all duration-300 border border-[#C9973A]/25 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-bold text-[#C9973A]">
                      {step.step}
                    </span>
                    <div className="w-16 h-16 rounded-2xl bg-[#FDF6EC] shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300 border border-[#C9973A]/20">
                      {stepIcons[idx]}
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#4C8C4A] block mb-1">
                    {step.subtitle}
                  </span>

                  <h3 className="font-serif text-xl font-bold text-[#2B1D0E] mb-3">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#2B1D0E]/75 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#C9973A]/20 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4C8C4A]" />
                  <span className="text-xs font-semibold text-[#2F5D3A]">
                    {step.highlight}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
