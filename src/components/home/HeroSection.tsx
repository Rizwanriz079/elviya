'use client';

import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Truck, ArrowRight, Sparkles, Leaf, Hand, Droplets, Award } from 'lucide-react';
import { PRODUCTS, getWhatsAppOrderUrl } from '@/lib/constants';
import Container from '@/components/ui/Container';
import ScriptDraw from '@/components/text/ScriptDraw';
import GoldShimmer from '@/components/text/GoldShimmer';
import SlotRoller from '@/components/text/SlotRoller';
import WordBlurIn from '@/components/text/WordBlurIn';
import { floatY, rotateSlow } from '@/lib/motion';
import { usePerfMode } from '@/lib/perf';

const subscribeResize = (callback: () => void) => {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
};
const getDesktopWidth = () => window.innerWidth >= 1024;
const getServerDesktopWidth = () => false;

interface Hotspot {
  id: string;
  title: string;
  detail: string;
  top: string;
  left: string;
  tooltipAlign: 'left' | 'right';
}

const INGREDIENT_HOTSPOTS: Hotspot[] = [
  {
    id: 'cap',
    title: 'Virgin Coconut Oil',
    detail: 'Cold-pressed carrier base',
    top: '14%',
    left: '50%',
    tooltipAlign: 'right',
  },
  {
    id: 'neem',
    title: 'Fresh Neem',
    detail: 'Direct botanical leaf infusion',
    top: '44%',
    left: '50%',
    tooltipAlign: 'left',
  },
  {
    id: 'handmade',
    title: 'Handmade with Love',
    detail: 'Crafted traditionally by hand',
    top: '68%',
    left: '50%',
    tooltipAlign: 'right',
  },
  {
    id: 'batches',
    title: 'Small Batches',
    detail: 'Prepared fresh in Kerala',
    top: '88%',
    left: '50%',
    tooltipAlign: 'left',
  },
];

export default function HeroSection() {
  const neemProduct = PRODUCTS.find((p) => p.id === 'neem-oil')!;
  const { isLite, isFinePointer, isReducedMotion } = usePerfMode();
  const hasDesktopWidth = useSyncExternalStore(subscribeResize, getDesktopWidth, getServerDesktopWidth);
  const isDesktop = !isLite && isFinePointer && !isReducedMotion && hasDesktopWidth;

  // Active Hotspot state
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Pour-a-drop interactive state
  const [isPouring, setIsPouring] = useState(false);
  const [showSparkleBadge, setShowSparkleBadge] = useState(false);

  // Mouse Parallax & 3D Tilt layers on desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for multi-plane depth
  const bottleX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const bottleY = useSpring(mouseY, { damping: 30, stiffness: 100 });
  const leafX = useSpring(mouseX, { damping: 25, stiffness: 160 });
  const leafY = useSpring(mouseY, { damping: 25, stiffness: 160 });

  // 3D Card Tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 240, damping: 22 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 240, damping: 22 });

  // Magnetic button physics
  const btnRef = useRef<HTMLAnchorElement>(null);
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const smoothBtnX = useSpring(btnX, { stiffness: 350, damping: 25 });
  const smoothBtnY = useSpring(btnY, { stiffness: 350, damping: 25 });

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 35;
      const y = (e.clientY - innerHeight / 2) / 35;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, isDesktop]);

  const handleBottleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Max 6 degrees 3D tilt
    const rotX = -(y / (rect.height / 2)) * 6;
    const rotY = (x / (rect.width / 2)) * 6;
    tiltX.set(rotX);
    tiltY.set(rotY);
  };

  const handleBottleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    setActiveHotspot(null);
  };

  const handlePourDrop = () => {
    if (isPouring) return;
    setIsPouring(true);
    setShowSparkleBadge(true);

    setTimeout(() => {
      setIsPouring(false);
    }, 1200);

    setTimeout(() => {
      setShowSparkleBadge(false);
    }, 2400);
  };

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
      {/* Background Hero Scene with WebP (2x sharp asset) */}
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

      <section id="hero-section" className="relative hero-svh flex flex-col justify-between page-top-padding z-10">
        <Container className="w-full my-auto py-2 sm:py-3 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column: Headline, Script, SlotRoller & CTAs */}
            <div className="order-1 lg:col-span-7 flex flex-col items-start text-left space-y-2.5 sm:space-y-4 lg:space-y-5">
              {/* ScriptDraw Line - Single Line, Never Wraps */}
              <ScriptDraw text="Made by hand, with love." withUnderline={true} />

              {/* Kinetic Fluid 3-Line Headline */}
              <h1 className="font-serif fluid-hero-h1 font-bold tracking-tight text-[#2B1D0E]">
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

              {/* SlotRoller Mechanical Vertical Word Carousel */}
              <div className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-medium text-[#2F5D3A] font-serif pt-0.5">
                <span>Traditionally used for</span>
                <SlotRoller words={['Hair Care', 'Scalp Care', 'Skin Care']} />
              </div>

              {/* Body Text with WordBlurIn */}
              <div className="max-w-xl fluid-body text-[#2B1D0E]/85">
                <WordBlurIn
                  text="Made with pure virgin coconut oil and fresh neem. Prepared by hand in Kerala for healthy hair, a clean scalp and clear skin."
                  delay={0.3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-1 sm:pt-2">
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
                  className="btn-shine relative group overflow-hidden inline-flex items-center justify-center gap-3 bg-[#16301F] hover:bg-[#2F5D3A] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold shadow-xl shadow-[#16301F]/25 transition-colors active:scale-95 text-sm sm:text-base text-center"
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
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full border-2 border-[#2F5D3A] text-[#2F5D3A] hover:bg-[#2F5D3A] hover:text-[#FDF6EC] font-semibold transition-all duration-300 text-sm sm:text-base text-center"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Delivery across India with truck between thin lines */}
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#2B1D0E]/75 pt-1 w-full max-w-md">
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

            {/* Right Column: Positioned Arch Container with aspect-ratio 3/4 */}
            <div className="order-2 lg:col-span-5 relative flex items-center justify-center py-1 sm:py-2">
              <div
                onMouseMove={handleBottleMouseMove}
                onMouseLeave={handleBottleMouseLeave}
                className="relative mx-auto rounded-t-[14rem] sm:rounded-t-[18rem] lg:rounded-t-[22rem] bg-[#E8EFE3]/55 border-2 border-[#C9973A]/40 shadow-botanical backdrop-blur-[2px] overflow-hidden h-[min(44svh,21rem)] lg:h-[min(62vh,29rem)] w-auto aspect-[3/4] flex items-end justify-center perspective-1000"
              >
                {/* Rotating Stamp Badge */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 pointer-events-none">
                  <motion.div
                    variants={rotateSlow}
                    animate="animate"
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center bg-[#FDF6EC]/90 rounded-full shadow-botanical backdrop-blur-sm border border-[#C9973A]/40"
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
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9973A]" />
                    </div>
                  </motion.div>
                </div>

                {/* Floating Oil Drops on Desktop (Smaller than bottle, non-overlapping) */}
                {isDesktop && (
                  <>
                    <motion.div
                      style={{ x: leafX, y: leafY }}
                      className="absolute top-12 left-3 z-10 pointer-events-none drop-shadow-md"
                    >
                      <Image
                        src="/images/drop-1.png"
                        alt="Golden Oil Drop"
                        width={24}
                        height={32}
                        className="w-6 h-8 object-contain"
                      />
                    </motion.div>
                    <motion.div
                      style={{ x: leafX, y: leafY }}
                      className="absolute bottom-28 right-3 z-10 pointer-events-none drop-shadow-md"
                    >
                      <Image
                        src="/images/drop-2.png"
                        alt="Pure Herbal Drop"
                        width={20}
                        height={26}
                        className="w-5 h-6 object-contain"
                      />
                    </motion.div>
                  </>
                )}

                {/* Inner Soft Gradient inside arch */}
                <div className="absolute inset-2 rounded-t-[13rem] sm:rounded-t-[17rem] lg:rounded-t-[21rem] bg-gradient-to-b from-[#FDF6EC]/85 via-[#FDF6EC]/40 to-[#E8EFE3]/20 pointer-events-none z-0" />

                {/* Subtle warm sunbeam glow behind bottle */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-[#FFEBB8]/50 blur-3xl pointer-events-none z-0" />

                {/* Natural Wooden Slice Podium (Ellipse, ~86% of arch width) */}
                <div className="absolute bottom-1.5 inset-x-[7%] h-[13%] flex items-center justify-center z-10 pointer-events-none">
                  {/* Soft floor shadow */}
                  <div className="absolute bottom-0 w-full h-1/2 bg-[#2B1D0E]/25 rounded-[50%] blur-md" />
                  {/* Wooden slice base */}
                  <div className="relative w-full h-full rounded-[50%] bg-gradient-to-r from-[#CABAA0] via-[#E2D4BE] to-[#A8967C] border border-[#C9973A]/50 shadow-md">
                    {/* Top natural ring */}
                    <div className="absolute inset-1 rounded-[50%] bg-[#EADCC7] border border-[#C9973A]/30" />
                  </div>
                </div>

                {/* Soft Elliptical Contact Shadow under bottle */}
                <div className="absolute bottom-[12.5%] left-1/2 -translate-x-1/2 w-[32%] h-2.5 rounded-[50%] bg-[#2B1D0E]/35 blur-[3px] z-10 pointer-events-none" />

                {/* Real Bottle Layer: Absolutely positioned container, height 76%, centered */}
                <div
                  onClick={handlePourDrop}
                  style={{
                    bottom: '13%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    height: '76%',
                    aspectRatio: '265 / 1226',
                  }}
                  className="absolute z-20 cursor-pointer group"
                >
                  <motion.div
                    style={{
                      x: isDesktop ? bottleX : 0,
                      y: isDesktop ? bottleY : 0,
                      rotateX: isDesktop ? smoothTiltX : 0,
                      rotateY: isDesktop ? smoothTiltY : 0,
                      transformStyle: 'preserve-3d',
                    }}
                    className="relative w-full h-full"
                  >
                    <motion.div
                      variants={floatY}
                      animate="animate"
                      className="relative w-full h-full"
                    >
                      <Image
                        src="/images/bottle-neem.webp"
                        alt="Elvia Herbals Pure Neem Oil 100ml"
                        fill
                        priority
                        sizes="(max-width: 768px) 60vw, (max-width: 1200px) 35vw, 420px"
                        className="object-contain select-none pointer-events-none drop-shadow-[0_8px_16px_rgba(43,29,14,0.18)]"
                      />

                      {/* Interactive Ingredient Hotspots (Desktop fine pointer only) */}
                      {isDesktop &&
                        INGREDIENT_HOTSPOTS.map((spot) => {
                          const isActive = activeHotspot === spot.id;
                          return (
                            <div
                              key={spot.id}
                              style={{ top: spot.top, left: spot.left }}
                              className="absolute z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                              onMouseEnter={(e) => {
                                e.stopPropagation();
                                setActiveHotspot(spot.id);
                              }}
                              onMouseLeave={(e) => {
                                e.stopPropagation();
                                setActiveHotspot(null);
                              }}
                            >
                              {/* Glowing Pulsing Hotspot Dot */}
                              <div className="relative w-6 h-6 flex items-center justify-center cursor-pointer">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9973A] opacity-60" />
                                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#C9973A] border-2 border-white shadow-sm" />
                              </div>

                              {/* Tooltip Card with SVG Connector */}
                              <AnimatePresence>
                                {isActive && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 4 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 4 }}
                                    transition={{ duration: 0.2 }}
                                    className={`absolute top-1/2 -translate-y-1/2 pointer-events-none z-40 whitespace-nowrap p-3 rounded-2xl bg-[#FDF6EC]/96 backdrop-blur-md border border-[#C9973A]/40 shadow-botanical ${
                                      spot.tooltipAlign === 'right'
                                        ? 'left-8 text-left'
                                        : 'right-8 text-right'
                                    }`}
                                  >
                                    <div className="flex items-center gap-1.5 text-xs font-bold font-serif text-[#2F5D3A]">
                                      <Sparkles className="w-3 h-3 text-[#C9973A]" />
                                      <span>{spot.title}</span>
                                    </div>
                                    <div className="text-[10px] text-[#2B1D0E]/75 font-light mt-0.5">
                                      {spot.detail}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}

                      {/* "Pour a Drop" Animation */}
                      <AnimatePresence>
                        {isPouring && (
                          <>
                            {/* Falling Golden Drop */}
                            <motion.div
                              initial={{ top: '12%', opacity: 1, scale: 0.8 }}
                              animate={{ top: '96%', opacity: [1, 1, 0], scale: [0.8, 1.2, 0.4] }}
                              transition={{ duration: 0.65, ease: 'easeIn' }}
                              className="absolute left-1/2 -translate-x-1/2 w-3.5 h-4.5 rounded-full bg-gradient-to-b from-[#C9973A] to-[#E5C07B] shadow-md z-40 pointer-events-none"
                            />

                            {/* Concentric Gold Ripples on Podium */}
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: [0, 2.2, 3.2], opacity: [0, 0.85, 0] }}
                              transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
                              className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-10 rounded-[50%] border-2 border-[#C9973A] z-20 pointer-events-none"
                            />
                          </>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                </div>

                {/* "100% Pure Neem Infusion" Sparkle Toast */}
                <AnimatePresence>
                  {showSparkleBadge && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      className="absolute bottom-16 z-40 px-4 py-2 rounded-full bg-[#16301F]/90 text-[#FDF6EC] border border-[#C9973A]/50 backdrop-blur-md shadow-botanical-lg flex items-center gap-2 text-xs font-semibold pointer-events-none"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#E5C07B] animate-spin" />
                      <span>100% Pure Botanical Neem Oil</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Container>

        {/* Bottom Curved Wave Trust Strip (Deep Forest #16301F) */}
        <div
          id="hero-trust-strip"
          className="relative w-full bg-[#16301F] text-[#FDF6EC] pt-3.5 sm:pt-4 pb-4 sm:pb-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] z-20 border-t border-[#C9973A]/30 compact-on-short-screens"
        >
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 items-center">
              {[
                { icon: Leaf, label: '100% Pure', desc: 'Zero chemicals, zero preservatives' },
                { icon: Hand, label: 'Handmade', desc: 'Made by hand in Kerala' },
                { icon: Droplets, label: 'Small Batches', desc: 'Fresh botanical small batches' },
                { icon: Award, label: 'Premium Quality', desc: 'Virgin coconut oil & fresh neem' },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 sm:gap-3.5 border-l border-[#C9973A]/25 pl-2.5 sm:pl-4"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#E8EFE3]/10 flex items-center justify-center text-[#E0B35C] border border-[#C9973A]/30 shrink-0">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h2 className="font-serif font-bold text-xs sm:text-sm lg:text-base text-[#FDF6EC] leading-tight line-clamp-none">
                        {item.label}
                      </h2>
                      <p className="text-[11px] sm:text-xs text-[#E8EFE3]/80 mt-0.5 line-clamp-none leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll Mouse Hint (Hidden on short screens to save space) */}
            <div className="hide-on-short-screens flex items-center justify-center gap-2 pt-2.5 text-[10px] uppercase tracking-widest text-[#E8EFE3]/60">
              <span className="w-3.5 h-5 rounded-full border border-[#C9973A]/50 flex items-start justify-center p-0.5">
                <span className="w-1 h-1 rounded-full bg-[#C9973A] animate-bounce" />
              </span>
              <span>Scroll to explore</span>
            </div>
          </Container>
        </div>
      </section>
    </div>
  );
}
