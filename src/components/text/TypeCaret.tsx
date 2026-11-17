'use client';

import { useState, useEffect } from 'react';

export default function TypeCaret({
  text,
  className = '',
  speed = 85,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{displayed}</span>
      {!done && (
        <span className="w-1.5 h-[0.9em] bg-[#C9973A] ml-1 animate-pulse inline-block" />
      )}
    </span>
  );
}
