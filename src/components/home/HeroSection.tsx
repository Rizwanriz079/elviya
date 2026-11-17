'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Truck, ArrowRight, ChevronDown } from 'lucide-react';
import { PRODUCTS, getWhatsAppOrderUrl } from '@/lib/constants';
import { maskRevealUp, fadeUp } from '@/lib/motion';

export default function HeroSection() {
  const neemProduct = PRODUCTS.find((p) => p.id === 'neem-oil')!;
  const [isDesktop, setIsDesktop] = useState(false);

  // Mouse parallax for desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 120 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 120 });

  // Magnetic button ref & motion values
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
      const x = (e.clientX - innerWidth / 2) / 32;
      const y = (e.clientY - innerHeight / 2) / 32;
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
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const pullX = (e.clientX - centerX) * 0.28;
    const pullY = (e.clientY - centerY) * 0.28;
    btnX.set(pullX);
    btnY.set(pullY);
  };

  const handleMagneticLeave = () => {
    btnX.set(0);
    btnY.set(0);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between page-top-padding pb-10 overflow-hidden">
      {/* Background Ambient Blurs */}
      <div className="absolute top-1/4 left-5 w-80 h-80 rounded-full bg-[#C9973A]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#4C8C4A]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Title & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Pill Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#E8EFE3] border border-[#4C8C4A]/30 text-[#2F5D3A] text-xs sm:text-sm font-semibold tracking-wide shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#4C8C4A] animate-ping" />
              <span>Handmade in Kerala</span>
              <span className="text-[#C9973A] font-bold">•</span>
              <span className="text-[#2B1D0E]/80">Small Batches</span>
            </motion.div>

            {/* Kinetic 3-line Headline with maskRevealUp */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#2B1D0E] leading-[1.08]">
              <span className="block overflow-hidden py-0.5">
                <motion.span
                  variants={maskRevealUp}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="inline-block"
                >
                  Pure
                </motion.span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <motion.span
                  variants={maskRevealUp}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                  className="inline-block"
                >
                  Homemade
                </motion.span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <motion.span
                  variants={maskRevealUp}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                  className="inline-block text-[#C9973A] relative"
                >
                  Herbal Oils
                  {/* Botanical Leaf Growing from 'Herbal' */}
                  <motion.span
                    initial={{ scale: 0, rotate: -30, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block ml-3 align-middle"
                  >
                    <svg className="w-8 h-8 text-[#4C8C4A] inline-block" viewBox="0 0 40 40" fill="none">
                      <path d="M20 2C12 2 4 10 4 20C4 28 10 34 18 36L20 38L22 36C30 34 36 28 36 20C36 10 28 2 20 2Z" fill="currentColor" />
                      <path d="M20 6V34" stroke="#FDF6EC" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </motion.span>
                </motion.span>
              </span>
            </h1>

            {/* Caveat subline - single line, never wrapping */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="font-handwriting text-2xl sm:text-3xl text-[#2F5D3A] tracking-wide whitespace-nowrap"
            >
              Made by hand, with love.
            </motion.p>

            {/* Allowed facts body text */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className="text-base sm:text-lg text-[#2B1D0E]/80 max-w-xl leading-relaxed"
            >
              Made with pure virgin coconut oil and fresh neem. For healthy hair, a clean scalp and clear skin. No chemicals, no preservatives.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={6}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2"
            >
              {/* Magnetic WhatsApp Order Button */}
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
                className="btn-shine relative group overflow-hidden inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-[#25D366]/30 transition-transform active:scale-95 text-base text-center"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Order on WhatsApp – ₹{neemProduct.price}</span>
              </motion.a>

              <Link
                href="/product"
                data-cursor="view"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border-2 border-[#2F5D3A] text-[#2F5D3A] hover:bg-[#2F5D3A] hover:text-[#FDF6EC] font-semibold transition-all duration-300 text-base"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Delivery across India */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#2B1D0E]/70 pt-2">
              <Truck className="w-4 h-4 text-[#C9973A]" />
              <span className="font-medium text-[#2F5D3A]">Delivery across India</span>
              <span className="text-[#C9973A]">•</span>
              <span>Kerala flat ₹50</span>
            </div>
          </div>

          {/* Right Column: Bottle in Arch Frame with Circular Text Badge */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-6">
            <motion.div
              style={{
                x: isDesktop ? smoothMouseX : 0,
                y: isDesktop ? smoothMouseY : 0,
              }}
              className="relative w-full max-w-[400px] aspect-[4/5] flex items-center justify-center"
            >
              {/* Arch-shaped window frame */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E8EFE3] via-[#FDF6EC] to-[#E0B35C]/20 arch-frame shadow-botanical-lg border border-[#C9973A]/30 overflow-hidden">
                {/* Rotating Circular Text Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                    className="w-24 h-24 flex items-center justify-center"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path
                        id="circlePath"
                        d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                        fill="none"
                      />
                      <text className="text-[9.5px] uppercase tracking-[0.16em] fill-[#2F5D3A] font-bold">
                        <textPath href="#circlePath" startOffset="0%">
                          HANDMADE IN KERALA • SMALL BATCHES •
                        </textPath>
                      </text>
                    </svg>
                  </motion.div>
                </div>
              </div>

              {/* Floating Real Bottle Photo */}
              <motion.div
                animate={{
                  y: [-8, 8, -8],
                  rotate: [-1, 1, -1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative w-64 sm:w-72 h-80 sm:h-96 z-10 drop-shadow-[0_20px_30px_rgba(47,93,58,0.22)]"
              >
                <Image
                  src={neemProduct.image}
                  alt="Pure Neem Oil 100ml"
                  fill
                  sizes="340px"
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* 3 Floating Glass Chips */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-8 -left-3 z-20 glass-panel px-3 py-1 rounded-full shadow-botanical text-xs font-bold text-[#2F5D3A] border border-[#C9973A]/30"
              >
                100% Pure
              </motion.div>

              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-1/2 -right-4 z-20 glass-panel px-3 py-1 rounded-full shadow-botanical text-xs font-bold text-[#2F5D3A] border border-[#4C8C4A]/30"
              >
                No Chemicals
              </motion.div>

              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-6 left-4 z-20 glass-panel px-3 py-1 rounded-full shadow-botanical text-xs font-bold text-[#2B1D0E] border border-[#C9973A]/30"
              >
                Hair & Scalp Care
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Down Hint Line */}
      <div className="relative z-10 flex flex-col items-center justify-center mt-6 pt-2 pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest text-[#2B1D0E]/60 mb-1">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[#C9973A]"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </div>
    </section>
  );
}
