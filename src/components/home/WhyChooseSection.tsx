'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, Variants } from 'framer-motion';
import { Sparkles, Shield, Heart, Truck } from 'lucide-react';
import { clipRevealLeft, scaleIn, rotateIn, cardStackIn, fadeUp } from '@/lib/motion';
import Container from '@/components/ui/Container';

function TiltBentoCard({
  children,
  className = '',
  variants,
  custom,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  custom?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [isDesktop, setIsDesktop] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && window.matchMedia('(pointer: fine)').matches);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    setMousePos({ x: mouseX, y: mouseY });

    if (isDesktop) {
      const normalizedX = mouseX / rect.width - 0.5;
      const normalizedY = mouseY / rect.height - 0.5;
      x.set(normalizedX);
      y.set(normalizedY);
    }
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -200, y: -200 });
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={custom}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isDesktop ? rotateX : 0,
        rotateY: isDesktop ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden rounded-3xl transition-shadow duration-300 border border-[#C9973A]/25 group ${className}`}
    >
      {/* Mouse Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201,151,58,0.18), transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

export default function WhyChooseSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#E8EFE3]">
      {/* Background Texture & Ambient Glow */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: `url('/images/bg-sage.webp')` }}
      />
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[#C9973A]/10 blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest text-[#2F5D3A] uppercase"
          >
            The Elvia Standard
          </motion.span>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="font-serif fluid-section-h2 font-bold text-[#2B1D0E] mt-2 mb-4"
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

        {/* Bento Grid: 1 Large + 3 Small Cards with distinct entrance animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Large Bento Card (Spans 2 columns on lg): clipRevealLeft */}
          <TiltBentoCard
            variants={clipRevealLeft}
            custom={0}
            className="lg:col-span-2 bg-[#FDF6EC] shadow-botanical p-8 sm:p-10 flex flex-col justify-between"
          >
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
                Made with pure virgin coconut oil and fresh neem. Traditionally used for healthy hair, a clean scalp and clear skin. No silicones, liquid paraffin, synthetic preservatives or artificial colorants.
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
              <span>Zero Preservatives</span>
            </div>
          </TiltBentoCard>

          {/* 2. Small Bento Card: scaleIn */}
          <TiltBentoCard
            variants={scaleIn}
            custom={1}
            className="bg-[#FDF6EC] shadow-botanical p-8 flex flex-col justify-between"
          >
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
          </TiltBentoCard>

          {/* 3. Small Bento Card: rotateIn */}
          <TiltBentoCard
            variants={rotateIn}
            custom={2}
            className="bg-[#FDF6EC] shadow-botanical p-8 flex flex-col justify-between"
          >
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
                Crafted in limited batches so that every bottle reaches you freshly made and naturally active.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#C9973A]/15 text-xs text-[#2F5D3A] font-semibold flex items-center gap-2 relative z-10">
              <span>✦ Freshly Bottled</span>
            </div>
          </TiltBentoCard>

          {/* 4. Small Bento Card (Spans 2 columns on lg): cardStackIn */}
          <TiltBentoCard
            variants={cardStackIn}
            custom={3}
            className="lg:col-span-2 bg-[#FDF6EC] shadow-botanical p-8 sm:p-10 flex flex-col justify-between"
          >
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
              <span>Direct WhatsApp Order ✦</span>
            </div>
          </TiltBentoCard>
        </div>
      </Container>
    </section>
  );
}
