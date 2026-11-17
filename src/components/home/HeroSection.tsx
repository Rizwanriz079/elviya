'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Truck, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { PRODUCTS, getWhatsAppOrderUrl } from '@/lib/constants';
import ScriptDraw from '@/components/text/ScriptDraw';
import GoldShimmer from '@/components/text/GoldShimmer';
import WordBlurIn from '@/components/text/WordBlurIn';
import { floatY, rotateSlow } from '@/lib/motion';

export default function HeroSection() {
  const neemProduct = PRODUCTS.find((p) => p.id === 'neem-oil')!;
  const [isDesktop, setIsDesktop] = useState(false);

  // Parallax layers on desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for bottle, leaves, and background
  const bottleX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const bottleY = useSpring(mouseY, { damping: 30, stiffness: 100 });
  const leafX = useSpring(mouseX, { damping: 25, stiffness: 160 });
  const leafY = useSpring(mouseY, { damping: 25, stiffness: 160 });

  // Magnetic button physics
  const btnRef = useRef<HTMLAnchorElement>(null);
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const smoothBtnX = useSpring(btnX, { stiffness: 350, damping: 25 });
  const smoothBtnY = useSpring(btnY, { stiffness: 350, damping: 25 });

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && window.matchMedia('(pointer: fine)').matches);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 30;
      const y = (e.clientY - innerHeight / 2) / 30;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isDesktop || !btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const pullX = (e.clientX - (left + width / 2)) * 0.25;
    const pullY = (e.clientY - (top + height / 2)) * 0.25;
    btnX.set(pullX);
    btnY.set(pullY);
  };

  const handleMagneticLeave = () => {
    btnX.set(0);
    btnY.set(0);
  };

  return (
    <div className="relative overflow-hidden bg-[#FDF6EC]">
      {/* Background Hero Scene with WebP */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <picture className="block relative w-full h-full">
          <source media="(min-width: 1024px)" srcSet="/images/hero-bg.webp" />
          <Image
            src="/images/hero-bg-mobile.webp"
            alt="Elvia Herbals Botanical Scene"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-70"
          />
        </picture>
      </div>

      <section className="relative min-h-[92vh] flex flex-col justify-between page-top-padding pb-6 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline, Script & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              {/* ScriptDraw Line - Single Line, Never Wraps */}
              <ScriptDraw text="Made by hand, with love." withUnderline={true} />

              {/* Kinetic 3-Line Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#2B1D0E] leading-[1.08]">
                <span className="block overflow-hidden py-0.5">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                    className="inline-block"
                  >
                    Pure
                  </motion.span>
                </span>
                <span className="block overflow-hidden py-0.5">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.75, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                    className="inline-block relative"
                  >
                    Homemade
                    {/* Real two-leaf SVG sprig growing from the top of Homemade */}
                    <motion.svg
                      viewBox="0 0 50 50"
                      className="w-8 h-8 sm:w-10 sm:h-10 text-[#4C8C4A] absolute -top-5 right-[-2.2rem] overflow-visible"
                      initial={{ scale: 0, rotate: -30, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <path
                        d="M 12 38 Q 25 22 36 10"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M 22 26 C 14 20 12 10 20 12 C 28 14 28 22 22 26 Z"
                        fill="#4C8C4A"
                      />
                      <path
                        d="M 28 20 C 36 14 44 16 42 24 C 38 30 30 26 28 20 Z"
                        fill="#2F5D3A"
                      />
                    </motion.svg>
                  </motion.span>
                </span>
                <span className="block overflow-hidden py-0.5">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.75, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                    className="inline-block"
                  >
                    <GoldShimmer>Herbal Oils</GoldShimmer>
                  </motion.span>
                </span>
              </h1>

              {/* Body Text (Max 2 lines) with WordBlurIn */}
              <div className="max-w-xl text-base sm:text-lg text-[#2B1D0E]/85 leading-relaxed">
                <WordBlurIn
                  text="Made with pure virgin coconut oil and fresh neem. For healthy hair, a clean scalp and clear skin."
                  delay={0.3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
                {/* Dark-Forest Primary CTA with Arrow Circle */}
                <motion.a
                  ref={btnRef}
                  style={{
                    x: isDesktop ? smoothBtnX : 0,
                    y: isDesktop ? smoothBtnY : 0,
                  }}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  href={getWhatsAppOrderUrl(neemProduct, 'kerala')}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="order"
                  className="btn-shine relative group overflow-hidden inline-flex items-center justify-center gap-3 bg-[#16301F] hover:bg-[#2F5D3A] text-white px-8 py-4 rounded-full font-semibold shadow-xl shadow-[#16301F]/25 transition-colors active:scale-95 text-base text-center"
                >
                  <span>Get It Now – ₹{neemProduct.price}</span>
                  <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.a>

                {/* Outlined Explore Products */}
                <Link
                  href="/product"
                  data-cursor="view"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border-2 border-[#2F5D3A] text-[#2F5D3A] hover:bg-[#2F5D3A] hover:text-[#FDF6EC] font-semibold transition-all duration-300 text-base"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Delivery across India with truck between thin lines */}
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#2B1D0E]/75 pt-2 w-full max-w-md">
                <div className="h-[1px] flex-1 bg-[#C9973A]/40" />
                <span className="flex items-center gap-1.5 font-medium text-[#2F5D3A]">
                  <Truck className="w-4 h-4 text-[#C9973A]" />
                  <span>Delivery across India</span>
                  <span className="text-[#C9973A]">•</span>
                  <span>Kerala flat ₹50</span>
                </span>
                <div className="h-[1px] flex-1 bg-[#C9973A]/40" />
              </div>
            </div>

            {/* Right Column: Scene + Real Bottle on Podium */}
            <div className="lg:col-span-5 relative flex items-center justify-center py-6">
              <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
                {/* Rotating Stamp Badge (Never clipped, fully inside viewport) */}
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30">
                  <motion.div
                    variants={rotateSlow}
                    animate="animate"
                    className="w-24 h-24 flex items-center justify-center bg-[#FDF6EC]/85 rounded-full shadow-botanical backdrop-blur-sm border border-[#C9973A]/40"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full p-1">
                      <path
                        id="heroBadgePath"
                        d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                        fill="none"
                      />
                      <text className="text-[9px] uppercase tracking-[0.18em] fill-[#2F5D3A] font-bold">
                        <textPath href="#heroBadgePath" startOffset="0%">
                          HANDMADE IN KERALA • SMALL BATCHES •
                        </textPath>
                      </text>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[#4C8C4A]">
                      <Sparkles className="w-4 h-4 text-[#C9973A]" />
                    </div>
                  </motion.div>
                </div>

                {/* Floating Oil Drops on Desktop */}
                {isDesktop && (
                  <>
                    <motion.div
                      style={{ x: leafX, y: leafY }}
                      className="absolute top-16 left-2 z-20 pointer-events-none drop-shadow-md"
                    >
                      <Image
                        src="/images/drop-1.png"
                        alt="Golden Oil Drop"
                        width={38}
                        height={48}
                      />
                    </motion.div>
                    <motion.div
                      style={{ x: leafX, y: leafY }}
                      className="absolute bottom-24 right-0 z-20 pointer-events-none drop-shadow-md"
                    >
                      <Image
                        src="/images/drop-2.png"
                        alt="Pure Herbal Drop"
                        width={30}
                        height={38}
                      />
                    </motion.div>
                  </>
                )}

                {/* Real Bottle on Podium with FloatY & Soft Contact Shadow */}
                <motion.div
                  style={{
                    x: isDesktop ? bottleX : 0,
                    y: isDesktop ? bottleY : 0,
                  }}
                  className="relative w-full h-full flex flex-col items-center justify-center z-10"
                >
                  <motion.div
                    variants={floatY}
                    animate="animate"
                    className="relative w-64 sm:w-72 h-80 sm:h-96 z-10"
                  >
                    <Image
                      src="/images/bottle-neem.png"
                      alt="Elvia Herbals Pure Neem Oil 100ml"
                      fill
                      sizes="(max-width: 1024px) 80vw, 420px"
                      className="object-contain"
                      priority
                    />
                  </motion.div>

                  {/* Soft Contact Shadow under bottle */}
                  <div className="w-44 h-7 rounded-full bg-[#2B1D0E]/20 blur-md -mt-4 z-0" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Curved Wave Trust Strip (Deep Forest #16301F) */}
        <div className="relative w-full bg-[#16301F] text-[#FDF6EC] pt-8 pb-7 z-20 border-t border-[#C9973A]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
              {[
                { label: '100% Pure', desc: 'No chemicals or mineral oils' },
                { label: 'Handmade', desc: 'Crafted with care in Kerala' },
                { label: 'Small Batches', desc: 'Fresh botanical quality' },
                { label: 'Premium Quality', desc: 'Virgin coconut oil & neem' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 border-l border-[#C9973A]/25 pl-4 sm:pl-6"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E8EFE3]/10 flex items-center justify-center text-[#E0B35C] border border-[#C9973A]/30 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-sm sm:text-base text-[#FDF6EC] leading-tight">
                      {item.label}
                    </h2>
                    <p className="text-[11px] text-[#E8EFE3]/75 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Mouse Hint */}
            <div className="flex items-center justify-center gap-2 pt-6 text-[10px] uppercase tracking-widest text-[#E8EFE3]/60">
              <span className="w-4 h-6 rounded-full border border-[#C9973A]/50 flex items-start justify-center p-1">
                <span className="w-1 h-1.5 rounded-full bg-[#C9973A] animate-bounce" />
              </span>
              <span>Scroll to explore</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
