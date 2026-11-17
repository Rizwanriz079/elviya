'use client';

export default function MarqueeStrip() {
  const items = [
    '100% Pure',
    'Handmade',
    'Small Batches',
    'No Preservatives',
    'Virgin Coconut Oil',
    'Made with Love',
    'Delivery Across India',
  ];

  return (
    <div className="relative overflow-hidden shadow-inner group">
      {/* Row 1: Gold text on forest green (#2F5D3A) moving left */}
      <div className="py-3 bg-[#2F5D3A] border-y border-[#C9973A]/40 overflow-hidden">
        <div className="flex w-max space-x-8 animate-[marqueeLeft_30s_linear_infinite] group-hover:[animation-play-state:paused] whitespace-nowrap">
          {[...items, ...items, ...items, ...items].map((text, idx) => (
            <div key={`r1-${idx}`} className="flex items-center space-x-8">
              <span className="font-serif text-xs sm:text-sm font-semibold tracking-wider text-[#E5C07B]">
                {text}
              </span>
              <span className="text-[#C9973A] text-xs">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Outlined text on cream moving right */}
      <div className="py-2.5 bg-[#FDF6EC] border-b border-[#C9973A]/25 overflow-hidden">
        <div className="flex w-max space-x-8 animate-[marqueeRight_34s_linear_infinite] group-hover:[animation-play-state:paused] whitespace-nowrap">
          {[...items, ...items, ...items, ...items].map((text, idx) => (
            <div key={`r2-${idx}`} className="flex items-center space-x-8">
              <span className="font-serif text-xs sm:text-xs uppercase tracking-widest font-bold text-transparent [-webkit-text-stroke:1px_#2F5D3A]">
                {text}
              </span>
              <span className="text-[#C9973A] text-xs">❋</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  );
}
