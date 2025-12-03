"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Droplets, Hand, Thermometer, Award, Sparkles, Heart, Shield, Leaf, Star, ArrowRight } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { TESTIMONIALS, PRODUCT } from "@/lib/constants";

interface ProductSize {
  id: string;
  label: string;
  price: number;
  originalPrice: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sizes: ProductSize[];
  images?: string[];
}

export default function Home() {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.products && data.products.length > 0) {
        const p = data.products[0];
        setProduct({
          id: p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          sizes: typeof p.sizes === "string" ? JSON.parse(p.sizes) : p.sizes,
          images: p.images || [],
        });
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // Use product from database or fallback to static data
  const displayProduct = product || {
    name: PRODUCT.name,
    description: PRODUCT.description,
    sizes: PRODUCT.sizes,
    images: [],
  };

  const productImage = displayProduct.images && displayProduct.images.length > 0
    ? displayProduct.images[0]
    : "/images/product-main.jpg";

  // Get the medium size (100ml) for display, fallback to first size
  const displaySize = displayProduct.sizes.find(s => s.label === "100ml") || displayProduct.sizes[1] || displayProduct.sizes[0];
  const features = [
    { icon: <Droplets className="w-8 h-8" />, title: "100% Pure", description: "No chemicals, no preservatives. Just pure almond goodness." },
    { icon: <Hand className="w-8 h-8" />, title: "Handmade", description: "Crafted with care using traditional methods." },
    { icon: <Thermometer className="w-8 h-8" />, title: "Cold Pressed", description: "Low temperature extraction preserves all nutrients." },
    { icon: <Award className="w-8 h-8" />, title: "Premium Quality", description: "Made from the finest California almonds." },
  ];

  const benefits = [
    { icon: <Sparkles className="w-10 h-10" />, title: "Glowing Skin", description: "Natural moisturizer that gives your skin a healthy, radiant glow." },
    { icon: <Heart className="w-10 h-10" />, title: "Hair Nourishment", description: "Strengthens hair roots and promotes thick, lustrous hair growth." },
    { icon: <Shield className="w-10 h-10" />, title: "100% Natural", description: "Free from chemicals, preservatives, and harmful additives." },
    { icon: <Leaf className="w-10 h-10" />, title: "Traditional Process", description: "Made using age-old techniques to preserve maximum nutrients." },
  ];

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 fade-in">
              <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                <span className="w-2 h-2 bg-[#3D6A46] rounded-full animate-pulse" />
                <span className="text-sm font-medium text-[#3D6A46]">100% Natural and Handmade</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D1F0E] leading-tight">
                {displayProduct.name || "Pure Homemade"} <span className="text-[#D9A441]">Almond Oil</span>
              </h1>
              <p className="text-xl text-[#8B7355] max-w-lg">
                Made by Hand, With Love. Experience the natural goodness of cold-pressed almond oil for radiant skin and lustrous hair.
              </p>
              <div className="flex flex-wrap gap-4">
                <WhatsAppButton message="Hi Elvia Herbals! I am interested in buying your pure almond oil.">Buy Now on WhatsApp</WhatsAppButton>
                <Link href="/product" className="inline-flex items-center gap-2 btn-secondary px-6 py-3 rounded-full font-medium">
                  View Product <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-[#8B7355]">
                  <div className="w-10 h-10 rounded-full bg-[#F5E6D3] flex items-center justify-center"><Shield className="w-5 h-5 text-[#3D6A46]" /></div>
                  <span className="text-sm font-medium">No Chemicals</span>
                </div>
                <div className="flex items-center gap-2 text-[#8B7355]">
                  <div className="w-10 h-10 rounded-full bg-[#F5E6D3] flex items-center justify-center"><Leaf className="w-5 h-5 text-[#3D6A46]" /></div>
                  <span className="text-sm font-medium">Cold Pressed</span>
                </div>
                <div className="flex items-center gap-2 text-[#8B7355]">
                  <div className="w-10 h-10 rounded-full bg-[#F5E6D3] flex items-center justify-center"><Heart className="w-5 h-5 text-[#D9A441]" /></div>
                  <span className="text-sm font-medium">Made with Love</span>
                </div>
              </div>
            </div>
            <div className="relative slide-in-right">
              <div className="relative w-full max-w-xl mx-auto flex items-center justify-center min-h-[500px]">
                {/* Animated circular gradient backgrounds - lighter colors */}
                <div className="absolute w-[420px] h-[420px] sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-br from-[#F5E6D3] via-[#EDD9B5] to-[#E5C99A] shadow-xl animate-pulse-slow" />
                <div className="absolute w-[380px] h-[380px] sm:w-[440px] sm:h-[440px] rounded-full bg-gradient-to-tr from-[#EDD9B5]/80 to-[#D9A441]/40 animate-spin-slow" />
                <div className="absolute w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] rounded-full bg-gradient-to-bl from-[#FFF5E6]/90 to-[#E5C99A]/60" />
                {/* Product image - larger and contained in circle */}
                <div className="relative z-10 w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-white/20 to-transparent animate-float">
                  <Image
                    src={productImage}
                    alt={displayProduct.name}
                    width={380}
                    height={380}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <div className="absolute top-8 right-4 bg-white rounded-full px-4 py-2 shadow-lg z-20 animate-bounce-slow">
                  <span className="text-sm font-bold text-[#3D6A46]">100% Pure</span>
                </div>
                <div className="absolute bottom-20 -left-2 bg-white rounded-full px-4 py-2 shadow-lg z-20 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
                  <span className="text-sm font-bold text-[#D9A441]">Cold Pressed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D1F0E] mb-4">Why Choose <span className="text-[#D9A441]">Elvia Herbals</span>?</h2>
            <p className="text-lg text-[#8B7355] max-w-2xl mx-auto">We take pride in crafting the purest almond oil using traditional methods</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-8 text-center group cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#FFF5E6] flex items-center justify-center text-[#D9A441] group-hover:bg-[#D9A441] group-hover:text-white transition-colors">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#2D1F0E] mb-2">{feature.title}</h3>
                <p className="text-[#8B7355]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F5E6D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2D1F0E] mb-6">Benefits of Pure <span className="text-[#D9A441]">Almond Oil</span></h2>
              <p className="text-lg text-[#8B7355] mb-8">Our cold-pressed almond oil retains all the natural vitamins and minerals, providing numerous benefits for your skin, hair, and overall wellness.</p>
              <div className="grid sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full gradient-gold flex items-center justify-center text-white">{benefit.icon}</div>
                    <div>
                      <h3 className="font-bold text-[#2D1F0E] mb-1">{benefit.title}</h3>
                      <p className="text-sm text-[#8B7355]">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative flex items-center justify-center min-h-[350px]">
                {/* Animated circular gradient backgrounds - lighter colors */}
                <div className="absolute w-[320px] h-[320px] rounded-full bg-gradient-to-br from-[#F5E6D3] via-[#EDD9B5] to-[#E5C99A] shadow-lg animate-pulse-slow" />
                <div className="absolute w-[280px] h-[280px] rounded-full bg-gradient-to-tr from-[#EDD9B5]/70 to-[#D9A441]/30" />
                {/* Product image in circle */}
                <div className="relative z-10 w-[260px] h-[260px] rounded-full overflow-hidden flex items-center justify-center animate-float">
                  <Image
                    src={productImage}
                    alt={`${displayProduct.name} ${displaySize?.label || ""}`}
                    width={260}
                    height={260}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="text-center mt-6">
                <h3 className="text-2xl font-bold text-[#2D1F0E] mb-2">{displaySize?.label || "100ml"} Bottle</h3>
                <p className="text-3xl font-bold text-[#D9A441] mb-4">Rs.{displaySize?.price || 599}</p>
                <WhatsAppButton message={`Hi Elvia Herbals! I want to order a ${displaySize?.label || "100ml"} bottle of ${displayProduct.name}.`} className="text-sm">Order Now</WhatsAppButton>
              </div>
              <div className="absolute top-0 right-0 bg-[#3D6A46] text-white px-4 py-2 rounded-full font-bold shadow-lg z-20 animate-bounce-slow">Best Seller</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D1F0E] mb-4">What Our Customers Say</h2>
            <p className="text-lg text-[#8B7355]">Real reviews from our happy customers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="card p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-[#D9A441] text-[#D9A441]" />))}
                </div>
                <p className="text-[#8B7355] mb-6 italic">{testimonial.text}</p>
                <div>
                  <p className="font-bold text-[#2D1F0E]">{testimonial.name}</p>
                  <p className="text-sm text-[#8B7355]">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Experience Pure Goodness?</h2>
          <p className="text-xl text-white/90 mb-8">Order now and get your bottle of pure, handmade almond oil delivered to your doorstep.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <WhatsAppButton message="Hi Elvia Herbals! I would like to place an order for your pure almond oil." className="bg-white text-[#D9A441] hover:bg-[#FFF5E6] hover:text-[#A6763B]">Order on WhatsApp</WhatsAppButton>
            <Link href="/product" className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-[#D9A441] transition-colors">
              View All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
