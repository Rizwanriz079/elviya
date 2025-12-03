"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Heart, Shield, Leaf, Check, Star, ChevronDown, ChevronUp, Package } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { PRODUCT, TESTIMONIALS } from "@/lib/constants";
import { createOrderMessage } from "@/lib/utils";

const defaultProductImages = [
  "/images/product-main.jpg",
  "/images/product-1.jpg",
  "/images/product-2.jpg",
];

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
  ingredients: string[];
  howToUse: string[];
  images?: string[];
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(PRODUCT.sizes[1]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.products && data.products.length > 0) {
        const allProducts: Product[] = data.products.map((p: Record<string, unknown>) => ({
          id: p.id as string,
          name: p.name as string,
          description: p.description as string,
          price: p.price as number,
          sizes: typeof p.sizes === "string" ? JSON.parse(p.sizes as string) : p.sizes,
          ingredients: typeof p.ingredients === "string" ? JSON.parse(p.ingredients as string) : p.ingredients,
          howToUse: typeof p.howToUse === "string" ? JSON.parse(p.howToUse as string) : p.howToUse,
          images: (p.images as string[]) || [],
        }));
        setProducts(allProducts);
        // Select first product by default
        const firstProduct = allProducts[0];
        setSelectedProduct(firstProduct);
        if (firstProduct.sizes && firstProduct.sizes.length > 1) {
          setSelectedSize(firstProduct.sizes[1]);
        } else if (firstProduct.sizes && firstProduct.sizes.length > 0) {
          setSelectedSize(firstProduct.sizes[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedImage(0);
    if (product.sizes && product.sizes.length > 1) {
      setSelectedSize(product.sizes[1]);
    } else if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  };

  const faqs = [
    { q: "How is the almond oil made?", a: "Our almond oil is cold-pressed using traditional wooden press (ghani) method. This preserves all the natural nutrients and ensures the oil remains pure and unrefined." },
    { q: "Is this oil suitable for all skin types?", a: "Yes! Pure almond oil is gentle and suitable for all skin types including sensitive skin. It is non-comedogenic and absorbs well without leaving a greasy residue." },
    { q: "How should I store the oil?", a: "Store in a cool, dry place away from direct sunlight. The oil has a shelf life of 12 months from the date of manufacturing." },
    { q: "Can I use this for cooking?", a: "While our almond oil is 100% pure and edible, it is primarily formulated for topical use on skin and hair. For cooking, we recommend using oils specifically meant for culinary purposes." },
  ];

  // Use product from database or fallback to static data
  const displayProduct = selectedProduct || {
    name: PRODUCT.name,
    description: PRODUCT.description,
    sizes: PRODUCT.sizes,
    ingredients: PRODUCT.ingredients,
    howToUse: PRODUCT.howToUse,
    images: [],
  };

  const productImages = displayProduct.images && displayProduct.images.length > 0
    ? displayProduct.images
    : defaultProductImages;

  return (
    <div className="min-h-screen bg-[#FFF5E6]">
      {/* Product Selector - shown when multiple products exist */}
      {products.length > 1 && (
        <section className="py-8 bg-white border-b border-[#F5E6D3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-5 h-5 text-[#D9A441]" />
              <h2 className="text-lg font-bold text-[#2D1F0E]">Our Products</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {products.map((product) => {
                const productImg = product.images && product.images.length > 0
                  ? product.images[0]
                  : defaultProductImages[0];
                const isSelected = selectedProduct?.id === product.id;
                return (
                  <button
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className={`flex-shrink-0 flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-[#D9A441] bg-[#D9A441]/10"
                        : "border-[#F5E6D3] hover:border-[#D9A441]/50 bg-white"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#F5E6D3] flex-shrink-0">
                      <Image
                        src={productImg}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="text-left">
                      <p className={`font-bold text-sm ${isSelected ? "text-[#D9A441]" : "text-[#2D1F0E]"}`}>
                        {product.name}
                      </p>
                      <p className="text-xs text-[#8B7355]">
                        From Rs.{product.sizes[0]?.price || product.price}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#D9A441] flex items-center justify-center ml-2">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="sticky top-24">
              {/* Main product image with circular gradient - larger and lighter */}
              <div className="relative flex items-center justify-center min-h-[450px]">
                {/* Animated circular gradient backgrounds - lighter colors */}
                <div className="absolute w-[380px] h-[380px] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-br from-[#F5E6D3] via-[#EDD9B5] to-[#E5C99A] shadow-xl animate-pulse-slow" />
                <div className="absolute w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] rounded-full bg-gradient-to-tr from-[#EDD9B5]/80 to-[#D9A441]/40 animate-spin-slow" />
                <div className="absolute w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] rounded-full bg-gradient-to-bl from-[#FFF5E6]/90 to-[#E5C99A]/60" />
                {/* Product image - larger and contained in circle */}
                <div className="relative z-10 w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-white/20 to-transparent animate-float">
                  <Image
                    src={productImages[selectedImage] || defaultProductImages[0]}
                    alt={displayProduct.name}
                    width={320}
                    height={320}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                {/* Floating badges */}
                <div className="absolute top-4 right-8 bg-white rounded-full px-4 py-2 shadow-lg z-20 animate-bounce-slow">
                  <span className="text-sm font-bold text-[#3D6A46]">100% Pure</span>
                </div>
                <div className="absolute bottom-16 -left-2 bg-white rounded-full px-4 py-2 shadow-lg z-20 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
                  <span className="text-sm font-bold text-[#D9A441]">Cold Pressed</span>
                </div>
              </div>
              {/* Thumbnail images */}
              {productImages.length > 1 && (
                <div className="flex gap-4 mt-4 justify-center">
                  {productImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 bg-[#F5E6D3] rounded-xl shadow-sm cursor-pointer transition-all flex items-center justify-center overflow-hidden ${
                        selectedImage === i ? "ring-2 ring-[#D9A441] ring-offset-2" : "hover:ring-2 hover:ring-[#D9A441]/50"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Product view ${i + 1}`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#3D6A46]/10 text-[#3D6A46] px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <Check className="w-4 h-4" /> In Stock
                </div>
                <h1 className="text-4xl font-bold text-[#2D1F0E] mb-2">{displayProduct.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-[#D9A441] text-[#D9A441]" />))}
                  </div>
                  <span className="text-[#8B7355]">(50+ Reviews)</span>
                </div>
                <p className="text-lg text-[#8B7355]">{displayProduct.description}</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-[#2D1F0E]">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {displayProduct.sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-xl border-2 transition-all ${
                        selectedSize.id === size.id
                          ? "border-[#D9A441] bg-[#D9A441]/10"
                          : "border-[#D9C4A8] hover:border-[#D9A441]"
                      }`}
                    >
                      <span className="block font-bold text-[#2D1F0E]">{size.label}</span>
                      <span className="text-sm text-[#8B7355]">
                        <span className="line-through mr-2">Rs.{size.originalPrice}</span>
                        <span className="text-[#D9A441] font-bold">Rs.{size.price}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-[#D9A441]">Rs.{selectedSize.price}</div>
                <div className="bg-[#3D6A46] text-white px-3 py-1 rounded-full text-sm font-medium">
                  Save Rs.{selectedSize.originalPrice - selectedSize.price}
                </div>
              </div>

              <WhatsAppButton
                message={createOrderMessage(displayProduct.name, selectedSize.label, selectedSize.price)}
                className="w-full py-4 text-lg"
              >
                Buy Now on WhatsApp
              </WhatsAppButton>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                  <Shield className="w-8 h-8 text-[#3D6A46]" />
                  <div>
                    <p className="font-bold text-[#2D1F0E]">100% Pure</p>
                    <p className="text-sm text-[#8B7355]">No chemicals</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                  <Leaf className="w-8 h-8 text-[#3D6A46]" />
                  <div>
                    <p className="font-bold text-[#2D1F0E]">Cold Pressed</p>
                    <p className="text-sm text-[#8B7355]">Traditional method</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#2D1F0E]">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {displayProduct.ingredients.map((ingredient, index) => (
                    <span key={index} className="px-4 py-2 bg-white rounded-full text-[#8B7355] text-sm">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#2D1F0E]">How to Use</h3>
                <ul className="space-y-3">
                  {displayProduct.howToUse.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#D9A441] text-white flex items-center justify-center text-sm flex-shrink-0">{index + 1}</span>
                      <span className="text-[#8B7355]">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#2D1F0E] text-center mb-12">Benefits</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Sparkles className="w-8 h-8" />, title: "Glowing Skin", desc: "Natural moisturizer for radiant skin" },
              { icon: <Heart className="w-8 h-8" />, title: "Hair Care", desc: "Strengthens and nourishes hair" },
              { icon: <Shield className="w-8 h-8" />, title: "Anti-Aging", desc: "Rich in Vitamin E antioxidants" },
              { icon: <Leaf className="w-8 h-8" />, title: "Natural", desc: "No chemicals or preservatives" },
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-gold flex items-center justify-center text-white">{benefit.icon}</div>
                <h3 className="font-bold text-[#2D1F0E] mb-2">{benefit.title}</h3>
                <p className="text-[#8B7355] text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F5E6D3]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#2D1F0E] text-center mb-12">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-bold text-[#2D1F0E]">{faq.q}</span>
                  {openFaq === index ? <ChevronUp className="w-5 h-5 text-[#D9A441]" /> : <ChevronDown className="w-5 h-5 text-[#8B7355]" />}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-[#8B7355]">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#2D1F0E] text-center mb-12">Customer Reviews</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="card p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-[#D9A441] text-[#D9A441]" />))}
                </div>
                <p className="text-[#8B7355] mb-4 italic">{t.text}</p>
                <div>
                  <p className="font-bold text-[#2D1F0E]">{t.name}</p>
                  <p className="text-sm text-[#8B7355]">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
