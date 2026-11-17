'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Heart, Truck } from 'lucide-react';
import { fadeUp } from '@/lib/motion';

function BentoCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -200, y: -200 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl transition-all duration-300 border border-[#C9973A]/25 group ${className}`}
    >
      {/* Mouse Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201,151,58,0.18), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

export default function WhyChooseSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#F7EFE2]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest text-[#C9973A] uppercase"
          >
            The Elvia Standard
          </motion.span>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B1D0E] mt-2 mb-4"
          >
            Why Choose Elvia Herbals?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="text-[#2B1D0E]/75 text-base sm:text-lg"
          >
            Pure homemade herbal oils, made by hand with love in Kerala.
          </motion.p>
        </div>

        {/* Bento Grid: 1 Large + 3 Small Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Large Bento Card (Spans 2 columns on lg) */}
          <BentoCard className="lg:col-span-2 bg-[#FDF6EC] shadow-botanical p-8 sm:p-10 flex flex-col justify-between">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EFE3] text-[#2F5D3A] text-xs font-semibold tracking-wide border border-[#4C8C4A]/30">
                  <Shield className="w-3.5 h-3.5 text-[#4C8C4A]" />
                  100% Pure & Authentic
                </span>
                <span className="font-serif text-2xl font-bold text-[#C9973A]">01</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D0E] mb-4">
                Pure Ingredients, Zero Chemicals
              </h3>

              <p className="text-base text-[#2B1D0E]/80 max-w-xl leading-relaxed">
                Made with pure virgin coconut oil and fresh neem. For healthy hair, a clean scalp and clear skin. No silicones, liquid paraffin, synthetic preservatives or artificial colorants.
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-[#C9973A]/20 flex flex-wrap items-center justify-between gap-4 relative z-10 text-xs sm:text-sm text-[#2F5D3A] font-medium">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C9973A]" />
                Pure Virgin Coconut Oil Base
              </span>
              <span className="text-[#C9973A]">•</span>
              <span>Fresh Neem Infusion</span>
              <span className="text-[#C9973A]">•</span>
              <span>No Chemicals</span>
            </div>
          </BentoCard>

          {/* 2. Small Bento Card: Handmade in Kerala */}
          <BentoCard className="bg-[#FDF6EC] shadow-botanical p-8 flex flex-col justify-between">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E8EFE3] flex items-center justify-center text-xl border border-[#4C8C4A]/25">
                  🌿
                </div>
                <span className="font-serif text-2xl font-bold text-[#C9973A]">02</span>
              </div>

              <span className="text-xs uppercase tracking-wider text-[#C9973A] font-semibold block mb-1">
                Authentic Craft
              </span>
              <h3 className="font-serif text-xl font-bold text-[#2B1D0E] mb-3">
                Handmade in Kerala
              </h3>
              <p className="text-sm text-[#2B1D0E]/75 leading-relaxed">
                Prepared with care by hand in Kerala, following traditional time-honored infusion techniques.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#C9973A]/15 text-xs text-[#2F5D3A] font-semibold flex items-center gap-2 relative z-10">
              <Heart className="w-3.5 h-3.5 text-[#C9973A]" />
              <span>Made with love</span>
            </div>
          </BentoCard>

          {/* 3. Small Bento Card: Small Batches */}
          <BentoCard className="bg-[#FDF6EC] shadow-botanical p-8 flex flex-col justify-between">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E8EFE3] flex items-center justify-center text-xl border border-[#4C8C4A]/25">
                  🏺
                </div>
                <span className="font-serif text-2xl font-bold text-[#C9973A]">03</span>
              </div>

              <span className="text-xs uppercase tracking-wider text-[#C9973A] font-semibold block mb-1">
                Fresh & Potent
              </span>
              <h3 className="font-serif text-xl font-bold text-[#2B1D0E] mb-3">
                Small Batches
              </h3>
              <p className="text-sm text-[#2B1D0E]/75 leading-relaxed">
                Crafted in limited micro-batches so that every bottle reaches you freshly made and naturally active.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#C9973A]/15 text-xs text-[#2F5D3A] font-semibold flex items-center gap-2 relative z-10">
              <span>✦ Freshly Bottled</span>
            </div>
          </BentoCard>

          {/* 4. Small Bento Card (Spans 2 columns on lg): Delivery across India */}
          <BentoCard className="lg:col-span-2 bg-[#FDF6EC] shadow-botanical p-8 sm:p-10 flex flex-col justify-between">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EFE3] text-[#2F5D3A] text-xs font-semibold tracking-wide border border-[#4C8C4A]/30">
                  <Truck className="w-3.5 h-3.5 text-[#C9973A]" />
                  Pan-India Shipping
                </span>
                <span className="font-serif text-2xl font-bold text-[#C9973A]">04</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#2B1D0E] mb-3">
                Direct Delivery Across India
              </h3>
              <p className="text-sm sm:text-base text-[#2B1D0E]/80 max-w-xl leading-relaxed">
                Carefully packaged by hand and shipped across India. Kerala flat delivery at ₹50. Rest of India confirmed directly on WhatsApp.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#C9973A]/15 flex items-center justify-between text-xs text-[#2F5D3A] font-semibold relative z-10">
              <span>Kerala: +₹50 (Total ₹319)</span>
              <span>Fast WhatsApp Dispatch ✦</span>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
