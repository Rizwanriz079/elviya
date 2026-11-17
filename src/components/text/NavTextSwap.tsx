'use client';

export default function NavTextSwap({
  label,
  className = '',
}: {
  label: string;
  className?: string;
}) {
  return (
    <span className={`relative inline-block overflow-hidden h-[1.3em] leading-[1.3em] group ${className}`}>
      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
        {label}
      </span>
      <span className="absolute inset-0 block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-full group-hover:translate-y-0 text-[#2F5D3A] font-semibold">
        {label}
      </span>
    </span>
  );
}
