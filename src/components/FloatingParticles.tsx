'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { usePerfMode } from '@/lib/perf';

const subscribeClient = () => () => {};
const getClientSnapshot = () => true;
const getServerClientSnapshot = () => false;

interface Particle {
  id: number;
  type: 'leaf' | 'petal' | 'dust';
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
}

const INITIAL_PARTICLES: Particle[] = [
  { id: 1, type: 'leaf', x: 8, y: 18, size: 28, duration: 18, delay: 0, rotate: 25 },
  { id: 2, type: 'petal', x: 88, y: 28, size: 22, duration: 22, delay: 2, rotate: -40 },
  { id: 3, type: 'dust', x: 30, y: 45, size: 7, duration: 14, delay: 1, rotate: 0 },
  { id: 4, type: 'leaf', x: 92, y: 65, size: 26, duration: 20, delay: 4, rotate: 60 },
  { id: 5, type: 'dust', x: 75, y: 80, size: 8, duration: 16, delay: 3, rotate: 0 },
  { id: 6, type: 'petal', x: 14, y: 75, size: 20, duration: 24, delay: 5, rotate: -15 },
  { id: 7, type: 'dust', x: 50, y: 15, size: 6, duration: 15, delay: 2, rotate: 0 },
  { id: 8, type: 'leaf', x: 45, y: 90, size: 24, duration: 19, delay: 6, rotate: 110 },
];

export default function FloatingParticles() {
  const isMounted = useSyncExternalStore(subscribeClient, getClientSnapshot, getServerClientSnapshot);
  const { isLite, isFinePointer, isReducedMotion } = usePerfMode();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  if (!isMounted || isLite || !isFinePointer || isReducedMotion || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {INITIAL_PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-12, 12, -12],
            rotate: [p.rotate - 15, p.rotate + 15, p.rotate - 15],
            opacity: [0.35, 0.7, 0.35],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {p.type === 'leaf' && (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 40 40"
              fill="none"
              className="text-[#4C8C4A]/40 drop-shadow-[0_4px_10px_rgba(76,140,74,0.15)]"
            >
              <path
                d="M20 2C12 2 4 10 4 20C4 28 10 34 18 36L20 38L22 36C30 34 36 28 36 20C36 10 28 2 20 2Z"
                fill="currentColor"
              />
              <path
                d="M20 6V34M20 14L28 10M20 22L12 18M20 28L28 24"
                stroke="#2F5D3A"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
          )}

          {p.type === 'petal' && (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 30 30"
              fill="none"
              className="text-[#C9973A]/45 drop-shadow-[0_2px_8px_rgba(201,151,58,0.2)]"
            >
              <path
                d="M15 3C22 10 24 19 19 24C14 29 6 24 4 18C2 12 8 3 15 3Z"
                fill="currentColor"
              />
            </svg>
          )}

          {p.type === 'dust' && (
            <div
              style={{ width: p.size, height: p.size }}
              className="rounded-full bg-gradient-to-tr from-[#C9973A]/60 to-[#E0B35C]/80 blur-[1px] shadow-[0_0_8px_rgba(201,151,58,0.5)]"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
