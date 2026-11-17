'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#C9973A] uppercase">
            Customer Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B1D0E] mt-2 mb-4">
            Words from Our Community
          </h2>
          <p className="text-base sm:text-lg text-[#2B1D0E]/80">
            Real feedback from customers who order through WhatsApp across India.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-3xl mx-auto relative px-4">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl shadow-botanical-lg border border-[#C9973A]/30 relative overflow-hidden min-h-[300px] flex flex-col justify-between">
            {/* Big Decorative Botanical Quote Mark */}
            <Quote className="absolute top-6 right-6 w-16 h-16 text-[#C9973A]/20 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {/* Star Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#C9973A] text-[#C9973A]" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-[#2F5D3A] px-2 py-0.5 rounded-full bg-[#E8EFE3]">
                    {current.product}
                  </span>
                </div>

                {/* Review Quote */}
                <p className="font-serif text-lg sm:text-2xl text-[#2B1D0E] leading-relaxed italic">
                  {current.text}
                </p>

                {/* Customer Info */}
                <div className="pt-4 border-t border-[#C9973A]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#2F5D3A]">
                      {current.name}
                    </h4>
                    <p className="text-xs text-[#2B1D0E]/70">
                      {current.location}
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-[#4C8C4A] bg-[#E8EFE3] px-3 py-1 rounded-full w-max">
                    {current.tag}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Navigation Controls */}
            <div className="flex items-center justify-between pt-8 mt-6">
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? 'w-8 bg-[#2F5D3A]' : 'w-2 bg-[#C9973A]/40'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Testimonial"
                  className="p-2.5 rounded-full bg-[#FDF6EC] hover:bg-[#E8EFE3] text-[#2F5D3A] transition-colors border border-[#C9973A]/30 shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next Testimonial"
                  className="p-2.5 rounded-full bg-[#FDF6EC] hover:bg-[#E8EFE3] text-[#2F5D3A] transition-colors border border-[#C9973A]/30 shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
