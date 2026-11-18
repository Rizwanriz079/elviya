'use client';

import { useSyncExternalStore } from 'react';

export interface PerfMetrics {
  isLite: boolean;
  isReducedMotion: boolean;
  isFinePointer: boolean;
  hardwareConcurrency: number;
  deviceMemory?: number;
  saveData: boolean;
}

let globalPerfMetrics: PerfMetrics = {
  isLite: false,
  isReducedMotion: false,
  isFinePointer: true,
  hardwareConcurrency: 8,
  deviceMemory: 8,
  saveData: false,
};

const listeners = new Set<() => void>();
let initialized = false;

function notify() {
  listeners.forEach((cb) => cb());
}

export function getPerfMetrics(): PerfMetrics {
  return globalPerfMetrics;
}

export function initPerfMonitoring() {
  if (typeof window === 'undefined' || initialized) return;
  initialized = true;

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointerQuery = window.matchMedia('(pointer: fine) and (hover: hover)');

  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
  const saveData = (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData === true;

  // Check URL debug overrides e.g. ?perf=lite or ?perf=normal
  const params = new URLSearchParams(window.location.search);
  const perfParam = params.get('perf');

  const isHardwareLow =
    perfParam === 'lite' ||
    (perfParam !== 'normal' &&
      (hardwareConcurrency <= 4 ||
        (typeof deviceMemory === 'number' && deviceMemory <= 4) ||
        saveData));

  const isReducedMotion = reducedMotionQuery.matches;
  const isFinePointer = finePointerQuery.matches;

  const isLite = isHardwareLow || isReducedMotion || !isFinePointer;

  globalPerfMetrics = {
    isLite,
    isReducedMotion,
    isFinePointer,
    hardwareConcurrency,
    deviceMemory,
    saveData,
  };

  if (isLite) {
    document.documentElement.classList.add('lite-mode');
  } else {
    document.documentElement.classList.remove('lite-mode');
  }

  // Monitor frame rate for 1.5 seconds
  let frameCount = 0;
  const startTime = performance.now();
  let fpsCheckActive = true;

  const checkFps = (now: number) => {
    if (!fpsCheckActive) return;
    frameCount++;
    const elapsed = now - startTime;

    if (elapsed >= 1500) {
      const avgFps = (frameCount * 1000) / elapsed;
      if (avgFps < 45 && !globalPerfMetrics.isLite && perfParam !== 'normal') {
        globalPerfMetrics = { ...globalPerfMetrics, isLite: true };
        document.documentElement.classList.add('lite-mode');
        notify();
      }
      fpsCheckActive = false;
      return;
    }

    requestAnimationFrame(checkFps);
  };

  requestAnimationFrame(checkFps);

  const updateReducedMotion = (e: MediaQueryListEvent) => {
    const isRed = e.matches;
    globalPerfMetrics = {
      ...globalPerfMetrics,
      isReducedMotion: isRed,
      isLite: isRed ? true : globalPerfMetrics.isLite,
    };
    if (isRed) {
      document.documentElement.classList.add('lite-mode');
    }
    notify();
  };

  const updatePointer = (e: MediaQueryListEvent) => {
    globalPerfMetrics = {
      ...globalPerfMetrics,
      isFinePointer: e.matches,
      isLite: !e.matches ? true : globalPerfMetrics.isLite,
    };
    notify();
  };

  reducedMotionQuery.addEventListener('change', updateReducedMotion);
  finePointerQuery.addEventListener('change', updatePointer);
}

function subscribe(callback: () => void) {
  initPerfMonitoring();
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): PerfMetrics {
  return globalPerfMetrics;
}

function getServerSnapshot(): PerfMetrics {
  return globalPerfMetrics;
}

export function usePerfMode(): PerfMetrics {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
