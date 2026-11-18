'use client';

import { useEffect, useState, useCallback, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type SplashVariant = 'a' | 'b' | 'c';

const subscribeClient = () => () => {};
const getClientSnapshot = () => true;
const getServerClientSnapshot = () => false;

export default function PageIntro() {
  const isClient = useSyncExternalStore(subscribeClient, getClientSnapshot, getServerClientSnapshot);

  const [variant] = useState<SplashVariant>(() => {
    if (typeof window === 'undefined') return 'a';
    const params = new URLSearchParams(window.location.search);
    const splashParam = params.get('splash');
    if (splashParam === 'a' || splashParam === 'b' || splashParam === 'c') {
      return splashParam;
    }
    const variants: SplashVariant[] = ['a', 'b', 'c'];
    return variants[Math.floor(Math.random() * variants.length)];
  });

  const [shouldShowSplash] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    const splashParam = params.get('splash');
    if (splashParam === 'off') return false;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return false;
    const hasSeenSplash = sessionStorage.getItem('elvia_splash_shown');
    if (hasSeenSplash && !splashParam) return false;
    return true;
  });

  const [isDismissed, setIsDismissed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleComplete = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      sessionStorage.setItem('elvia_splash_shown', 'true');
      if (typeof document !== 'undefined') {
        document.documentElement.dataset.splashActive = 'false';
      }
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('elvia:splash-end'));
      }
      setIsDismissed(true);
    }, 600);
  }, []);

  useEffect(() => {
    if (!shouldShowSplash || isDismissed) return;

    // Notify smooth scroll and other layers that splash is active
    document.documentElement.dataset.splashActive = 'true';
    window.dispatchEvent(new CustomEvent('elvia:splash-start'));

    const hasSeenSplash = sessionStorage.getItem('elvia_splash_shown');
    const isFast = Boolean(hasSeenSplash); // 0.8s fast version for return visits with query param
    const duration = isFast ? 800 : 2100;

    // Progress counter 0 -> 100%
    const stepInterval = duration / 25;
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(100, prev + 4);
      });
    }, stepInterval);

    // Auto-exit
    const exitTimer = setTimeout(() => {
      handleComplete();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
    };
  }, [shouldShowSplash, isDismissed, handleComplete]);

  if (!isClient || !shouldShowSplash || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="intro-splash"
        initial={{ opacity: 1, clipPath: 'circle(150% at 50% 50%)' }}
        animate={
          isExiting
            ? {
                clipPath: 'circle(0% at 50% 50%)',
                transition: { duration: 0.65, ease: [0.77, 0, 0.175, 1] },
              }
            : { opacity: 1, clipPath: 'circle(150% at 50% 50%)' }
        }
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] bg-[#16301F] flex flex-col items-center justify-center overflow-hidden px-6 text-[#FDF6EC]"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,151,58,0.22)_0%,transparent_70%)] pointer-events-none" />

        {/* Always-visible Skip Button */}
        <button
          type="button"
          onClick={handleComplete}
          className="absolute top-6 right-6 text-xs uppercase tracking-widest text-[#E8EFE3]/80 hover:text-white px-3.5 py-1.5 rounded-full border border-[#C9973A]/40 transition-colors z-30 backdrop-blur-sm cursor-pointer"
        >
          Skip ✕
        </button>

        {/* Bottom-right Corner 0-100 Counter */}
        <div className="absolute bottom-6 right-8 text-right font-mono text-xs text-[#E5C07B]/80 z-20">
          <span>{counter}%</span>
        </div>

        {/* Bottom Gold Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2F5D3A]/40">
          <motion.div
            className="h-full bg-gradient-to-r from-[#C9973A] via-[#E5C07B] to-[#25D366]"
            style={{ width: `${counter}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>

        {/* Main Animated Logo Container */}
        <motion.div
          animate={
            isExiting
              ? {
                  y: '-38vh',
                  scale: 0.42,
                  opacity: 0,
                  transition: { duration: 0.55, ease: [0.77, 0, 0.175, 1] },
                }
              : { y: 0, scale: 1, opacity: 1 }
          }
          className="relative z-10 flex flex-col items-center text-center"
        >
          {/* VARIANT A: Leaf Bloom (SVG Path Length Draw) */}
          {variant === 'a' && (
            <div className="relative w-28 h-28 flex items-center justify-center mb-5">
              <motion.svg
                className="w-20 h-24 text-[#C9973A]"
                viewBox="0 0 48 64"
                fill="none"
              >
                {/* Outer Leaf Stroke Draw */}
                <motion.path
                  d="M24 4C24 4 4 24 4 40C4 51.0457 12.9543 60 24 60C35.0457 60 44 51.0457 44 40C44 24 24 4 24 4Z"
                  stroke="#C9973A"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.75, ease: 'easeInOut' }}
                />
                {/* Center Vein Stem */}
                <motion.path
                  d="M24 12V52"
                  stroke="#4C8C4A"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.5, ease: 'easeOut' }}
                />
                {/* Side Veins */}
                <motion.path
                  d="M24 24C18 28 15 32 14 36M24 34C18 38 16 42 15 46M24 24C30 28 33 32 34 36M24 34C30 38 32 42 33 46"
                  stroke="#C9973A"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.65, duration: 0.4 }}
                />
              </motion.svg>
            </div>
          )}

          {/* VARIANT B: Oil Drop (Droplet Fall + Ripple Splash + Leaf Emerge) */}
          {variant === 'b' && (
            <div className="relative w-28 h-28 flex items-center justify-center mb-5">
              {/* Falling Drop */}
              <motion.svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-[#C9973A] fill-current absolute"
                initial={{ y: -65, scale: 0.6, opacity: 0 }}
                animate={{
                  y: [-65, 0, 0],
                  scale: [0.6, 1.25, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.6,
                  times: [0, 0.75, 1],
                  ease: 'easeIn',
                }}
              >
                <path d="M12 2C12 2 4 10 4 15C4 19.4 7.6 23 12 23C16.4 23 20 19.4 20 15C20 10 12 2 12 2Z" />
              </motion.svg>

              {/* Ripple 1 */}
              <motion.div
                className="absolute w-12 h-12 rounded-full border-2 border-[#C9973A]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.8, 2.8],
                  opacity: [0, 0.9, 0],
                }}
                transition={{
                  delay: 0.55,
                  duration: 0.6,
                  ease: 'easeOut',
                }}
              />

              {/* Emerging Leaf */}
              <motion.svg
                className="w-18 h-22 text-[#C9973A] absolute"
                viewBox="0 0 48 64"
                fill="none"
                initial={{ opacity: 0, y: 15, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5, ease: 'easeOut' }}
              >
                <path
                  d="M24 4C24 4 4 24 4 40C4 51.0457 12.9543 60 24 60C35.0457 60 44 51.0457 44 40C44 24 24 4 24 4Z"
                  stroke="#C9973A"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M24 12V52" stroke="#4C8C4A" strokeWidth="1.8" strokeLinecap="round" />
                <path
                  d="M24 24C18 28 15 32 14 36M24 34C18 38 16 42 15 46M24 24C30 28 33 32 34 36M24 34C30 38 32 42 33 46"
                  stroke="#C9973A"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </motion.svg>
            </div>
          )}

          {/* VARIANT C: Petal Assemble (4 Botanical Corners Converge) */}
          {variant === 'c' && (
            <div className="relative w-28 h-28 flex items-center justify-center mb-5">
              {/* 4 Diagonal Flying Petals */}
              <motion.div
                className="absolute w-6 h-6 rounded-tl-full bg-[#C9973A]/80 border border-[#E5C07B]"
                initial={{ x: -60, y: -60, opacity: 0, rotate: -45 }}
                animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute w-6 h-6 rounded-tr-full bg-[#C9973A]/80 border border-[#E5C07B]"
                initial={{ x: 60, y: -60, opacity: 0, rotate: 45 }}
                animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute w-6 h-6 rounded-bl-full bg-[#4C8C4A]/80 border border-[#E5C07B]"
                initial={{ x: -60, y: 60, opacity: 0, rotate: 45 }}
                animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute w-6 h-6 rounded-br-full bg-[#4C8C4A]/80 border border-[#E5C07B]"
                initial={{ x: 60, y: 60, opacity: 0, rotate: -45 }}
                animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />

              {/* Center Golden Flash */}
              <motion.div
                className="absolute w-12 h-12 rounded-full bg-[#E5C07B]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.8, 0], opacity: [0, 0.9, 0] }}
                transition={{ delay: 0.55, duration: 0.4 }}
              />

              {/* Formed Leaf */}
              <motion.svg
                className="w-20 h-24 text-[#C9973A] absolute"
                viewBox="0 0 48 64"
                fill="none"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65, duration: 0.4 }}
              >
                <path
                  d="M24 4C24 4 4 24 4 40C4 51.0457 12.9543 60 24 60C35.0457 60 44 51.0457 44 40C44 24 24 4 24 4Z"
                  stroke="#C9973A"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M24 12V52" stroke="#4C8C4A" strokeWidth="1.8" strokeLinecap="round" />
                <path
                  d="M24 24C18 28 15 32 14 36M24 34C18 38 16 42 15 46M24 24C30 28 33 32 34 36M24 34C30 38 32 42 33 46"
                  stroke="#C9973A"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </motion.svg>
            </div>
          )}

          {/* Brand Typography */}
          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: 28, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#FDF6EC]"
            >
              Elvia
            </motion.h1>
          </div>

          {/* Tracking Expansion on HERBALS */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.15em' }}
            animate={{ opacity: 1, letterSpacing: '0.38em' }}
            transition={{ delay: 0.55, duration: 0.55, ease: 'easeOut' }}
            className="text-xs uppercase text-[#C9973A] font-semibold"
          >
            HERBALS
          </motion.p>

          {/* Handwriting Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.45 }}
            className="font-handwriting text-xl text-[#E5C07B] mt-2.5"
          >
            Made by hand, with love
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
