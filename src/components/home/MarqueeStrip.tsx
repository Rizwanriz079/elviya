'use client';

export default function MarqueeStrip() {
  const row1 = [
    '100% Pure',
    'Virgin Coconut Oil',
    'Fresh Neem',
    'Small Batches',
    'Made in Kerala',
  ];

  const row2 = [
    'Handmade',
    'Chemical Free',
    'Scalp & Hair Care',
    'Gentle on Skin',
    'Delivery Across India',
  ];

  return (
    <div className="relative py-4 bg-[#2F5D3A] overflow-hidden border-y border-[#C9973A]/30 text-[#FDF6EC] shadow-inner space-y-2">
      {/* Row 1: Leftward Marquee */}
      <div className="flex w-max space-x-8 animate-[marqueeLeft_32s_linear_infinite] whitespace-nowrap">
        {[...row1, ...row1, ...row1, ...row1].map((text, idx) => (
          <div key={`r1-${idx}`} className="flex items-center space-x-8">
            <span className="font-serif text-xs sm:text-sm font-semibold tracking-wider text-[#FDF6EC]">
              {text}
            </span>
            <span className="text-[#C9973A] text-sm">✦</span>
          </div>
        ))}
      </div>

      {/* Row 2: Rightward Counter-Marquee */}
      <div className="flex w-max space-x-8 animate-[marqueeRight_36s_linear_infinite] whitespace-nowrap opacity-90">
        {[...row2, ...row2, ...row2, ...row2].map((text, idx) => (
          <div key={`r2-${idx}`} className="flex items-center space-x-8">
            <span className="text-xs sm:text-xs uppercase tracking-widest text-[#E8EFE3]/90 font-medium">
              {text}
            </span>
            <span className="text-[#E0B35C] text-xs">❋</span>
          </div>
        ))}
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
