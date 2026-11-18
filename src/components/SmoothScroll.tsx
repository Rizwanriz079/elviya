'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Lenis should run ONLY on desktop with a fine pointer (mouse/trackpad).
    // Touch screens use native hardware momentum scrolling for 60-120fps.
    const isFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const params = new URLSearchParams(window.location.search);
    const smoothParam = params.get('smooth');
    const isExplicitlyDisabled =
      process.env.NEXT_PUBLIC_SMOOTH_SCROLL === 'false' || smoothParam === 'off';

    if (!isFinePointer || prefersReducedMotion || isExplicitlyDisabled) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.12, // Snappy response with premium smooth deceleration
      wheelMultiplier: 1.0, // Natural scroll distance per mouse wheel notch
      smoothWheel: true,
      syncTouch: false, // Touch devices use native momentum
    });

    lenisRef.current = lenis;

    // Check if splash screen is currently active
    if (document.documentElement.dataset.splashActive === 'true') {
      lenis.stop();
    }

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const handleSplashStart = () => {
      lenis.stop();
    };

    const handleSplashEnd = () => {
      lenis.start();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    window.addEventListener('elvia:splash-start', handleSplashStart);
    window.addEventListener('elvia:splash-end', handleSplashEnd);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('elvia:splash-start', handleSplashStart);
      window.removeEventListener('elvia:splash-end', handleSplashEnd);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <>
      {/* Top Gold Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C9973A] via-[#E0B35C] to-[#25D366] origin-left z-[9999] pointer-events-none shadow-[0_0_12px_rgba(201,151,58,0.6)]"
        style={{ scaleX }}
      />
      {children}
    </>
  );
}
