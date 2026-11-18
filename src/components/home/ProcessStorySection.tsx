'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Container from '@/components/ui/Container';
import OutlineToFill from '@/components/text/OutlineToFill';
import ScriptDraw from '@/components/text/ScriptDraw';
import { PRODUCTS, getWhatsAppOrderUrl } from '@/lib/constants';
import { clipRevealLeft, blurIn, rotateIn, scaleIn } from '@/lib/motion';

export default function ProcessStorySection() {
  const neem = PRODUCTS.find((p) => p.id === 'neem-oil')!;
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [scrollDistance, setScrollDistance] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [hasSwiped, setHasSwiped] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Magnetic button on 5th panel
  const btnRef = useRef<HTMLAnchorElement>(null);
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const smoothBtnX = useSpring(btnX, { stiffness: 350, damping: 25 });
  const smoothBtnY = useSpring(btnY, { stiffness: 350, damping: 25 });

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isDesktop || !btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    btnX.set((e.clientX - centerX) * 0.25);
    btnY.set((e.clientY - centerY) * 0.25);
  };

  const handleMagneticLeave = () => {
    btnX.set(0);
    btnY.set(0);
  };

  // Measure track width and compute exact scroll distance
  useEffect(() => {
    const checkMedia = () => {
      const desktop = window.innerWidth >= 1024 && window.matchMedia('(pointer: fine)').matches;
      setIsDesktop(desktop);
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setPrefersReducedMotion(reduced);
    };
    checkMedia();

    const measureTrack = () => {
      if (!trackRef.current) return;
      const viewportWidth = window.innerWidth;
      const trackWidth = trackRef.current.scrollWidth;
      const sidePadding = 64; // Side padding so the final panel rests cleanly inside view
      const distance = Math.max(0, trackWidth - viewportWidth + sidePadding);
      setScrollDistance(distance);
    };

    measureTrack();

    const resizeObserver = new ResizeObserver(() => {
      measureTrack();
    });

    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    const onResize = () => {
      checkMedia();
      measureTrack();
    };

    window.addEventListener('resize', onResize);

    if (document.fonts) {
      document.fonts.ready.then(measureTrack);
    }

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track transform tied to exact measured scrollDistance
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  // Background color shift from cream to sage across the 4 steps
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    ['#FDF6EC', '#F4F7F1', '#EBF2E8', '#E4EDE0']
  );

  // Background Parallax Leaves
  const leaf1X = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const leaf2X = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const leafWashX = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Bottom Progress UI
  const progressLineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Dynamic active step detection
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      if (v < 0.22) setActiveStep(0);
      else if (v < 0.48) setActiveStep(1);
      else if (v < 0.74) setActiveStep(2);
      else setActiveStep(3);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Exact client wording (no invented details)
  const steps = [
    {
      num: '01',
      title: 'Fresh Neem',
      desc: 'Fresh neem leaves selected for preparation.',
      svg: '/images/step-1.svg',
      entrance: clipRevealLeft,
    },
    {
      num: '02',
      title: 'Cleaned & Prepared',
      desc: 'Cleaned thoroughly and prepared by hand.',
      svg: '/images/step-2.svg',
      entrance: blurIn,
    },
    {
      num: '03',
      title: 'Virgin Coconut Oil Infusion',
      desc: 'Infused into pure virgin coconut oil using traditional handmade care.',
      svg: '/images/step-3.svg',
      entrance: rotateIn,
    },
    {
      num: '04',
      title: 'Bottled by Hand',
      desc: 'Poured and bottled by hand in small batches in Kerala.',
      svg: '/images/step-4.svg',
      entrance: scaleIn,
    },
  ];

  // Mobile Snap Carousel Active Index
  const [mobileStepIndex, setMobileStepIndex] = useState(0);

  return (
    <motion.section
      ref={containerRef}
      style={{
        position: 'relative',
        backgroundColor,
        height: isDesktop && !prefersReducedMotion ? `calc(100svh + ${scrollDistance}px)` : 'auto',
      }}
      className="relative border-b border-[#C9973A]/20 transition-colors duration-300"
    >
      {/* ========================================================
          DESKTOP PINNED HORIZONTAL SECTION (min-width: 1024px)
          ======================================================== */}
      {isDesktop && !prefersReducedMotion && (
        <div className="sticky top-0 h-[100svh] overflow-x-clip flex flex-col justify-between py-4 sm:py-6 z-10">
          {/* Subtle Ambient Parallax Leaves in Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <motion.div
              style={{ x: leafWashX }}
              className="absolute -top-24 left-1/4 w-[600px] h-[600px] rounded-full bg-[#4C8C4A]/5 blur-3xl"
            />
            <motion.div
              style={{ x: leaf1X }}
              className="absolute top-12 left-2/3 w-24 h-36 opacity-25 -rotate-12"
            >
              <Image src="/images/leaf-1.png" alt="Botanical Leaf" fill sizes="96px" className="object-contain" />
            </motion.div>
            <motion.div
              style={{ x: leaf2X }}
              className="absolute bottom-16 left-1/3 w-28 h-40 opacity-20 rotate-45"
            >
              <Image src="/images/leaf-2.png" alt="Botanical Leaf" fill sizes="112px" className="object-contain" />
            </motion.div>
          </div>

          {/* 1. Top Header Area (Inside Sticky Container, zero gap above) */}
          <Container className="w-full flex items-end justify-between relative z-10 pt-2 pb-3">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#2F5D3A] uppercase block">
                Traditional Craftsmanship
              </span>
              <h2 className="font-serif fluid-section-h2 font-bold text-[#2B1D0E] mt-1">
                From Leaf to Bottle
              </h2>
            </div>

            <div className="flex items-center gap-6">
              {/* Step Counter Indicator */}
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-[#C9973A]/30 backdrop-blur-md shadow-xs">
                <span className="text-xs uppercase tracking-wider text-[#C9973A] font-bold">Step</span>
                <span className="font-serif font-bold text-sm text-[#2F5D3A]">
                  0{activeStep + 1} / 04
                </span>
              </div>

              {/* Scroll Hint (Fades out when user scrolls) */}
              <motion.div
                style={{ opacity: scrollHintOpacity }}
                className="hidden xl:flex items-center gap-2 text-xs text-[#2B1D0E]/60 font-medium"
              >
                <span>Scroll to explore</span>
                <span className="animate-pulse">→</span>
              </motion.div>
            </div>
          </Container>

          {/* 2. Horizontal Moving Track */}
          <div className="relative w-full my-auto z-10 overflow-visible py-2">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex items-center gap-8 pl-8 pr-16 w-max will-change-transform"
            >
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <motion.div
                    key={step.num}
                    variants={step.entrance}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    animate={{
                      scale: isActive ? 1.0 : 0.94,
                      opacity: isActive ? 1.0 : 0.72,
                    }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className={`w-[28rem] 2xl:w-[32rem] h-[66svh] min-h-[26rem] max-h-[42rem] p-7 sm:p-8 rounded-3xl flex flex-col justify-between shrink-0 relative overflow-hidden transition-shadow duration-300 ${
                      isActive
                        ? 'bg-white/95 shadow-botanical-lg border-2 border-[#C9973A]/50'
                        : 'bg-white/75 shadow-botanical border border-[#C9973A]/25'
                    }`}
                  >
                    {/* Giant Outlined Step Number with OutlineToFill parallax */}
                    <div className="absolute top-4 right-6 pointer-events-none select-none">
                      <OutlineToFill
                        text={step.num}
                        className={`text-7xl sm:text-8xl transition-opacity duration-300 ${
                          isActive ? 'opacity-70 text-[#C9973A]' : 'opacity-25'
                        }`}
                      />
                    </div>

                    {/* Top: Large Illustration that draws/highlights when active */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className={`w-20 h-20 rounded-2xl flex items-center justify-center p-3 border transition-transform duration-500 ${
                            isActive
                              ? 'bg-[#E8EFE3] border-[#4C8C4A]/50 scale-110 shadow-sm'
                              : 'bg-[#FDF6EC] border-[#C9973A]/25 scale-100'
                          }`}
                        >
                          <Image
                            src={step.svg}
                            alt={step.title}
                            width={56}
                            height={56}
                            className={`object-contain transition-all duration-300 ${
                              isActive ? 'filter-none' : 'opacity-80'
                            }`}
                          />
                        </div>

                        {/* Active Glowing Status Node */}
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                              isActive ? 'bg-[#25D366] shadow-[0_0_8px_#25D366]' : 'bg-[#C9973A]/30'
                            }`}
                          />
                        </div>
                      </div>

                      <span className="text-xs font-bold uppercase tracking-wider text-[#C9973A] block mb-1">
                        Step {step.num}
                      </span>

                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D0E] mb-3">
                        {step.title}
                      </h3>

                      <p className="text-sm sm:text-base text-[#2B1D0E]/80 leading-relaxed font-light">
                        {step.desc}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-4 border-t border-[#C9973A]/20 flex items-center justify-between text-xs font-semibold text-[#2F5D3A] relative z-10">
                      <span>Small batch preparation</span>
                      <span>✦ Kerala</span>
                    </div>
                  </motion.div>
                );
              })}

              {/* 5th Final End Panel: "Made by hand, with love" + WhatsApp Button */}
              <div className="w-[26rem] 2xl:w-[30rem] h-[66svh] min-h-[26rem] max-h-[42rem] p-7 sm:p-8 rounded-3xl bg-[#2F5D3A] text-[#FDF6EC] shadow-botanical-lg flex flex-col justify-between shrink-0 relative overflow-hidden border border-[#C9973A]/40">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9973A]/15 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <span className="text-xs uppercase tracking-[0.25em] text-[#E5C07B] font-bold block">
                    Pure Homemade Herbal Oils
                  </span>

                  <div className="py-2">
                    <ScriptDraw text="Made by hand, with love." className="text-white" withUnderline={true} />
                  </div>

                  <p className="text-sm text-[#E8EFE3]/85 leading-relaxed font-light pt-2">
                    Handmade in Kerala with pure virgin coconut oil and fresh neem. Bottled in small batches with zero chemicals.
                  </p>
                </div>

                <div className="space-y-3 relative z-10">
                  <motion.a
                    ref={btnRef}
                    style={{
                      x: smoothBtnX,
                      y: smoothBtnY,
                    }}
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                    href={getWhatsAppOrderUrl(neem, 'kerala')}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="order"
                    className="btn-shine w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-4 px-6 rounded-full font-bold shadow-xl shadow-black/20 text-sm transition-transform active:scale-95"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>Get It Now – ₹{neem.price}</span>
                  </motion.a>
                  <span className="text-[11px] text-[#E8EFE3]/75 block text-center">
                    Delivery across India • Kerala flat ₹50
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 3. Bottom Progress Bar */}
          <Container className="w-full relative z-10 pt-2 pb-1">
            <div className="w-full h-[2px] bg-[#C9973A]/20 rounded-full overflow-hidden relative">
              <motion.div
                style={{ width: progressLineWidth }}
                className="h-full bg-gradient-to-r from-[#2F5D3A] via-[#C9973A] to-[#25D366] rounded-full"
              />
            </div>
          </Container>
        </div>
      )}

      {/* ========================================================
          MOBILE & TABLET SECTION (below 1024px or touch)
          Scroll-snap carousel with zero empty space
          ======================================================== */}
      {(!isDesktop || prefersReducedMotion) && (
        <div className="py-16 px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-semibold tracking-widest text-[#2F5D3A] uppercase">
              Traditional Craftsmanship
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#2B1D0E] mt-1 mb-2">
              From Leaf to Bottle
            </h2>
            <p className="text-xs sm:text-sm text-[#2B1D0E]/80 font-light">
              Swipe to explore our traditional Kerala method.
            </p>
          </div>

          {/* Swipe Snap Track */}
          <div
            onScroll={(e) => {
              if (!hasSwiped) setHasSwiped(true);
              const el = e.currentTarget;
              const cardWidth = el.scrollWidth / (steps.length + 1);
              const index = Math.round(el.scrollLeft / cardWidth);
              setMobileStepIndex(Math.min(steps.length, Math.max(0, index)));
            }}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 px-2"
          >
            {steps.map((step) => (
              <div
                key={step.num}
                className="w-[82vw] max-w-[340px] snap-center shrink-0 bg-white/95 p-6 rounded-3xl shadow-botanical border border-[#C9973A]/25 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Outlined Step Number */}
                <div className="absolute top-4 right-6 pointer-events-none select-none">
                  <span className="font-serif font-black text-6xl text-transparent [-webkit-text-stroke:1px_rgba(201,151,58,0.35)]">
                    {step.num}
                  </span>
                </div>

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#E8EFE3] flex items-center justify-center border border-[#4C8C4A]/25 p-2 mb-4">
                    <Image
                      src={step.svg}
                      alt={step.title}
                      width={38}
                      height={38}
                      className="object-contain"
                    />
                  </div>

                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C9973A] block mb-1">
                    Step {step.num}
                  </span>

                  <h3 className="font-serif text-xl font-bold text-[#2B1D0E] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#2B1D0E]/75 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#C9973A]/20 flex items-center justify-between text-xs text-[#2F5D3A] font-semibold">
                  <span>Handmade in Kerala</span>
                  <span>✦</span>
                </div>
              </div>
            ))}

            {/* 5th Mobile End Card */}
            <div className="w-[82vw] max-w-[340px] snap-center shrink-0 bg-[#2F5D3A] text-[#FDF6EC] p-6 rounded-3xl shadow-botanical border border-[#C9973A]/40 flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#E5C07B] font-bold block mb-2">
                  Pure Herbal Oils
                </span>
                <p className="font-handwriting text-2xl text-white">
                  Made by hand, with love.
                </p>
                <p className="text-xs text-[#E8EFE3]/85 leading-relaxed font-light mt-2">
                  Handmade in small batches in Kerala with pure virgin coconut oil and fresh neem.
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/20">
                <a
                  href={getWhatsAppOrderUrl(neem, 'kerala')}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="order"
                  className="btn-shine w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-4 rounded-full font-bold text-xs shadow-md"
                >
                  <span>Order on WhatsApp – ₹{neem.price}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Dot Indicators & Swipe Hint */}
          <div className="flex flex-col items-center gap-2 mt-4">
            <div className="flex items-center gap-2">
              {[...steps, { num: '05' }].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    mobileStepIndex === i ? 'w-6 bg-[#2F5D3A]' : 'w-2 bg-[#C9973A]/30'
                  }`}
                />
              ))}
            </div>
            {!hasSwiped && (
              <span className="text-[11px] text-[#2B1D0E]/60 animate-pulse mt-1">
                Swipe left to see all 4 steps →
              </span>
            )}
          </div>
        </div>
      )}
    </motion.section>
  );
}
