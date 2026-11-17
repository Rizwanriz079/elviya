'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Truck, Sparkles, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import { BRAND, PRODUCTS, getWhatsAppOrderUrl } from '@/lib/constants';

export default function HeroSection() {
  const neemProduct = PRODUCTS.find((p) => p.id === 'neem-oil')!;
  const [isDesktop, setIsDesktop] = useState(false);

  // Mouse parallax on desktop only
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 120 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 120 });

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && window.matchMedia('(pointer: fine)').matches);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 35;
      const y = (e.clientY - innerHeight / 2) / 35;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const words = ['Pure', 'Homemade', 'Herbal', 'Oils'];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Organic Ambient Blurs */}
      <div className="absolute top-1/4 left-5 w-72 h-72 rounded-full bg-[#C9973A]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#4C8C4A]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Story, Title & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Handmade in Kerala Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#E8EFE3] border border-[#4C8C4A]/30 text-[#2F5D3A] text-xs sm:text-sm font-semibold tracking-wide shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#4C8C4A] animate-ping" />
              <span>Handmade in Kerala</span>
              <span className="text-[#C9973A] font-bold">•</span>
              <span className="text-[#2B1D0E]/80">Small Micro-Batches</span>
            </motion.div>

            {/* Word-by-Word Revealed Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#2B1D0E] leading-[1.08]">
              {words.map((word, idx) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 * idx }}
                  className="inline-block mr-3.5 relative"
                >
                  {word === 'Herbal' ? (
                    <span className="text-[#C9973A] relative inline-block">
                      {word}
                      {/* Growing Leaf SVG Accent from the letter H */}
                      <motion.svg
                        className="absolute -top-6 -right-5 w-8 h-8 text-[#4C8C4A] pointer-events-none"
                        viewBox="0 0 40 40"
                        fill="none"
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.7, delay: 0.7, type: 'spring' }}
                      >
                        <path
                          d="M20 2C12 2 4 10 4 20C4 28 10 34 18 36L20 38L22 36C30 34 36 28 36 20C36 10 28 2 20 2Z"
                          fill="currentColor"
                        />
                        <path
                          d="M20 6V34"
                          stroke="#FDF6EC"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </motion.svg>
                    </span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </h1>

            {/* Handwritten Caveat Sub-line */}
            <motion.p
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-script text-2xl sm:text-3xl text-[#2F5D3A] tracking-wide"
            >
              Made by hand, with love. Experience the natural goodness in every drop.
            </motion.p>

            {/* Descriptive Body */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="text-base sm:text-lg text-[#2B1D0E]/80 max-w-xl leading-relaxed"
            >
              Infused with fresh garden-picked neem and pure cold-pressed virgin coconut oil. A time-tested Kerala remedy formulated for healthy hair roots, balanced scalp and clear glowing skin.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2"
            >
              {/* Primary WhatsApp Order CTA */}
              <a
                href={getWhatsAppOrderUrl(neemProduct, 'kerala')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-[#25D366]/30 transition-all hover:scale-105 active:scale-95 text-base text-center"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Get It Now – ₹{neemProduct.price}</span>
              </a>

              {/* Secondary Explore CTA */}
              <Link
                href="/product"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border-2 border-[#2F5D3A] text-[#2F5D3A] hover:bg-[#2F5D3A] hover:text-[#FDF6EC] font-semibold transition-all duration-300 text-base"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Delivery Across India Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-2 text-xs sm:text-sm text-[#2B1D0E]/70 pt-2"
            >
              <Truck className="w-4 h-4 text-[#C9973A]" />
              <span className="font-medium text-[#2F5D3A]">Delivery across India</span>
              <span className="text-[#C9973A]">•</span>
              <span>Kerala flat ₹50 • Safe transit packaging</span>
            </motion.div>
          </div>

          {/* Right Column: Floating Bottle & Botanical Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-6">
            {/* Desktop Parallax Wrapper */}
            <motion.div
              style={{
                x: isDesktop ? smoothMouseX : 0,
                y: isDesktop ? smoothMouseY : 0,
              }}
              className="relative w-full max-w-[420px] aspect-square flex items-center justify-center"
            >
              {/* Organic Blob Background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E8EFE3] via-[#FDF6EC] to-[#E0B35C]/25 blob-organic shadow-botanical-lg border border-[#C9973A]/20" />

              {/* Rotating Dashed Botanical Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 sm:inset-4 border-2 border-dashed border-[#C9973A]/40 rounded-full pointer-events-none"
              />

              {/* Orbiting Leaves (Desktop) */}
              {isDesktop && (
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 text-[#4C8C4A]/70">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-4.97-4.48-9-10-9z" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 text-[#C9973A]/70">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66C7.57 17.5 9.5 12 17 10V8z" />
                    </svg>
                  </div>
                </motion.div>
              )}

              {/* Floating Real Bottle Image */}
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
                  alt="Elvia Herbals Pure Homemade Neem Oil 100ml"
                  fill
                  sizes="(max-width: 768px) 280px, 340px"
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Floating Glass Badge 1: 100% Pure */}
              <motion.div
                animate={{ y: [-4, 5, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                className="absolute -top-2 left-2 z-20 glass-panel px-3.5 py-1.5 rounded-full shadow-botanical text-xs font-semibold text-[#2F5D3A] flex items-center gap-1.5 border border-[#C9973A]/30"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C9973A]" />
                <span>100% Pure & Natural</span>
              </motion.div>

              {/* Floating Glass Badge 2: No Chemicals */}
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute top-1/2 -right-4 z-20 glass-panel px-3.5 py-1.5 rounded-full shadow-botanical text-xs font-semibold text-[#2F5D3A] flex items-center gap-1.5 border border-[#4C8C4A]/30"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#4C8C4A]" />
                <span>Zero Chemicals</span>
              </motion.div>

              {/* Floating Glass Badge 3: Hair & Scalp Care */}
              <motion.div
                animate={{ y: [-6, 4, -6] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
                className="absolute -bottom-2 left-6 z-20 glass-panel px-3.5 py-1.5 rounded-full shadow-botanical text-xs font-semibold text-[#2B1D0E] flex items-center gap-1.5 border border-[#C9973A]/30"
              >
                <HeartHandshake className="w-3.5 h-3.5 text-[#C9973A]" />
                <span>Hair & Scalp Purity</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
