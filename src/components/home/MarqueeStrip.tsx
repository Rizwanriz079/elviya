'use client';

export default function MarqueeStrip() {
  const items = [
    '100% Pure',
    'Handmade in Kerala',
    'Small Micro-Batches',
    'No Preservatives',
    'Virgin Coconut Oil',
    'Made with Love',
    'Delivery Across India',
  ];

  return (
    <div className="relative py-4 bg-[#2F5D3A] overflow-hidden border-y border-[#C9973A]/30 text-[#FDF6EC] shadow-inner">
      <div className="flex w-max space-x-8 animate-[marquee_28s_linear_infinite] whitespace-nowrap">
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center space-x-8">
            <span className="font-serif text-sm sm:text-base font-semibold tracking-wider text-[#FDF6EC]">
              {text}
            </span>
            <span className="text-[#C9973A] text-lg">✦</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
      `}</style>
    </div>
  );
}
