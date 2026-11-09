import Image from "next/image";
import { Leaf, Sparkles } from "lucide-react";

interface ProductShowcaseProps {
  image: string;
  alt: string;
  badgeTop: string;
  badgeBottom: string;
  priority?: boolean;
}

function NeemLeaf({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 80" className={className} style={style} aria-hidden="true">
      <path d="M20 2 C34 18 36 50 20 78 C4 50 6 18 20 2 Z" fill="currentColor" />
      <path d="M20 8 V74" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

/**
 * Animated hero visual for a product: morphing herbal glow, orbiting rings,
 * drifting neem leaves and an arch-framed product photo with a light sheen.
 */
export default function ProductShowcase({ image, alt, badgeTop, badgeBottom, priority }: ProductShowcaseProps) {
  return (
    <div className="relative mx-auto w-[330px] h-[420px] sm:w-[460px] sm:h-[540px] flex items-center justify-center">
      {/* Morphing glow */}
      <div className="absolute inset-[6%] showcase-blob bg-gradient-to-br from-[#3D6A46]/35 via-[#8DBF6A]/30 to-[#D9A441]/35 blur-2xl" />
      <div className="absolute inset-[14%] showcase-blob showcase-blob-alt bg-gradient-to-tr from-[#D9A441]/30 via-[#F5E6D3]/60 to-[#8DBF6A]/30 blur-xl" />

      {/* Rings */}
      <div className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full border-2 border-dashed border-[#3D6A46]/25 showcase-spin" />
      <div className="absolute w-[260px] h-[260px] sm:w-[370px] sm:h-[370px] rounded-full border border-[#D9A441]/40 showcase-spin-reverse">
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#8DBF6A] shadow-[0_0_12px_#8DBF6A]" />
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#D9A441] shadow-[0_0_10px_#D9A441]" />
      </div>

      {/* Drifting leaves */}
      <NeemLeaf className="absolute top-[4%] left-[10%] w-6 sm:w-8 text-[#3D6A46]/70 showcase-leaf" />
      <NeemLeaf className="absolute top-[18%] right-[4%] w-5 sm:w-6 text-[#6FA34F]/70 showcase-leaf" style={{ animationDelay: "-3s", animationDuration: "9s" }} />
      <NeemLeaf className="absolute bottom-[10%] right-[14%] w-7 sm:w-9 text-[#3D6A46]/60 showcase-leaf" style={{ animationDelay: "-5s", animationDuration: "11s" }} />
      <NeemLeaf className="absolute bottom-[22%] left-[2%] w-4 sm:w-5 text-[#8DBF6A]/80 showcase-leaf" style={{ animationDelay: "-1.5s", animationDuration: "8s" }} />

      {/* Sparkles */}
      <span className="absolute top-[12%] right-[24%] w-1.5 h-1.5 rounded-full bg-[#D9A441] showcase-twinkle" />
      <span className="absolute bottom-[18%] left-[22%] w-2 h-2 rounded-full bg-[#8DBF6A] showcase-twinkle" style={{ animationDelay: "-1s" }} />
      <span className="absolute top-[45%] right-[2%] w-1.5 h-1.5 rounded-full bg-[#3D6A46] showcase-twinkle" style={{ animationDelay: "-2s" }} />

      {/* Product frame */}
      <div className="relative z-10 showcase-float">
        {/* Frame matches the photo's aspect ratio so the whole image shows */}
        <div className="relative w-[230px] sm:w-[310px] aspect-[1171/1343] rounded-[2rem] p-2 bg-white/70 backdrop-blur shadow-[0_30px_60px_-20px_rgba(61,106,70,0.45)]">
          <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden">
            <Image
              src={image}
              alt={alt}
              fill
              sizes="(min-width: 640px) 310px, 230px"
              className="object-contain"
              priority={priority}
            />
            <div className="absolute inset-0 showcase-sheen pointer-events-none" />
          </div>
        </div>
        {/* Ground shadow */}
        <div className="mx-auto mt-3 w-2/3 h-4 rounded-[50%] bg-[#3D6A46]/20 blur-md showcase-shadow" />
      </div>

      {/* Badges */}
      <div className="absolute top-[12%] right-0 sm:right-2 z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur rounded-full pl-2 pr-4 py-2 shadow-lg animate-bounce-slow">
        <span className="w-6 h-6 rounded-full bg-[#3D6A46] flex items-center justify-center"><Leaf className="w-3.5 h-3.5 text-white" /></span>
        <span className="text-sm font-bold text-[#3D6A46]">{badgeTop}</span>
      </div>
      <div className="absolute bottom-[20%] left-0 sm:-left-2 z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur rounded-full pl-2 pr-4 py-2 shadow-lg animate-bounce-slow" style={{ animationDelay: "0.8s" }}>
        <span className="w-6 h-6 rounded-full bg-[#D9A441] flex items-center justify-center"><Sparkles className="w-3.5 h-3.5 text-white" /></span>
        <span className="text-sm font-bold text-[#A6763B]">{badgeBottom}</span>
      </div>
    </div>
  );
}
