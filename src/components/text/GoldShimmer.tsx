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
      <span className="shimmer-sweep absolute inset-0 pointer-events-none" />
    </span>
  );
}
