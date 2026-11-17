'use client';

export default function GoldShimmer({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <span className="relative z-10 text-[#C9973A]">{children}</span>
      <span className="shimmer-bar absolute inset-0 pointer-events-none" />
      <style jsx>{`
        .shimmer-bar {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 235, 184, 0.7) 50%,
            transparent 100%
          );
          transform: translateX(-150%);
          animation: goldSweep 6s ease-in-out infinite;
        }
        @keyframes goldSweep {
          0%,
          70% {
            transform: translateX(-150%);
          }
          100% {
            transform: translateX(150%);
          }
        }
      `}</style>
    </span>
  );
}
