import { Heart, Leaf, Award, Target, Eye } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import Certificates from "@/components/Certificates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Elvia Herbals | Kerala's Pure Homemade Almond Oil Brand",
  description: "Learn about Elvia Herbals' journey in creating pure, handmade almond oil in Kerala using traditional methods. Discover our values of purity, care, and tradition. Free shipping across Kerala.",
  keywords: [
    "about Elvia Herbals",
    "Kerala almond oil brand",
    "traditional oil making Kerala",
    "pure almond oil brand",
    "cold pressed oil Kerala",
    "homemade almond oil",
    "Kerala natural products"
  ],
  openGraph: {
    title: "About Elvia Herbals - Kerala's Pure Homemade Almond Oil",
    description: "Learn about our journey in creating pure, handmade almond oil in Kerala using traditional methods.",
    type: "website",
    url: "https://www.elviaherbals.com/about",
    images: [
      {
        url: "/images/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Elvia Herbals Logo - Kerala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Elvia Herbals",
    description: "Our story of creating pure, handmade almond oil in Kerala",
    images: ["/images/logo.jpg"],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFF5E6]">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#2D1F0E] mb-6">
                Our Story
              </h1>
              <p className="text-lg text-[#8B7355] mb-6">
                ELVYA was born from a simple belief: that the best skincare comes from nature, made with love and traditional wisdom passed down through generations.
              </p>
              <p className="text-lg text-[#8B7355] mb-6">
                Our journey began in a small kitchen, where we started making pure almond oil for our family using a traditional wooden press (ghani). The results were so remarkable that friends and family started asking for more.
              </p>
              <p className="text-lg text-[#8B7355]">
                Today, we continue to make every bottle of ELVYA almond oil with the same care and dedication, ensuring that you receive nothing but the purest, most nourishing oil for your skin and hair.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white rounded-3xl shadow-xl p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full gradient-gold flex items-center justify-center">
                    <Heart className="w-20 h-20 text-white" />
                  </div>
                  <p className="text-xl font-bold text-[#2D1F0E]">Made with Love</p>
                  <p className="text-[#8B7355]">Since 2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D1F0E] mb-4">Our Values</h2>
            <p className="text-lg text-[#8B7355]">What makes ELVYA special</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Leaf className="w-10 h-10" />, title: "Purity", desc: "100% pure, cold-pressed almond oil with no chemicals, preservatives, or additives." },
              { icon: <Heart className="w-10 h-10" />, title: "Care", desc: "Every bottle is made with love and attention to detail, ensuring the highest quality." },
              { icon: <Award className="w-10 h-10" />, title: "Tradition", desc: "We use time-tested traditional methods that have been passed down through generations." },
            ].map((value, index) => (
              <div key={index} className="card p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-gold flex items-center justify-center text-white">{value.icon}</div>
                <h3 className="text-xl font-bold text-[#2D1F0E] mb-4">{value.title}</h3>
                <p className="text-[#8B7355]">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F5E6D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D1F0E] mb-4">Our Process</h2>
            <p className="text-lg text-[#8B7355]">How we make our pure almond oil</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Selection", desc: "We handpick the finest California almonds" },
              { step: "2", title: "Preparation", desc: "Almonds are cleaned and prepared carefully" },
              { step: "3", title: "Cold Pressing", desc: "Traditional wooden press extracts pure oil" },
              { step: "4", title: "Packaging", desc: "Bottled fresh and delivered to you" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-gold flex items-center justify-center text-white text-2xl font-bold">{item.step}</div>
                <h3 className="font-bold text-[#2D1F0E] mb-2">{item.title}</h3>
                <p className="text-[#8B7355] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card p-8">
              <div className="w-16 h-16 mb-6 rounded-full bg-[#D9A441]/10 flex items-center justify-center">
                <Target className="w-8 h-8 text-[#D9A441]" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D1F0E] mb-4">Our Mission</h3>
              <p className="text-[#8B7355]">
                To provide families with pure, natural, and chemical-free almond oil that nourishes skin and hair while supporting traditional methods of oil extraction.
              </p>
            </div>
            <div className="card p-8">
              <div className="w-16 h-16 mb-6 rounded-full bg-[#3D6A46]/10 flex items-center justify-center">
                <Eye className="w-8 h-8 text-[#3D6A46]" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D1F0E] mb-4">Our Vision</h3>
              <p className="text-[#8B7355]">
                To become the most trusted name in natural, homemade beauty products, helping people embrace pure and sustainable skincare solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section - Hidden */}
      {/* <Certificates /> */}

      <section className="py-20 gradient-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Join the Elvia Herbals Family</h2>
          <p className="text-xl text-white/90 mb-8">Experience the difference of pure, handmade almond oil</p>
          <WhatsAppButton
            message="Hi Elvia Herbals! I would love to learn more about your products."
            className="bg-white text-[#D9A441] hover:bg-[#FFF5E6]"
          >
            Get in Touch
          </WhatsAppButton>
        </div>
      </section>
    </div>
  );
}
