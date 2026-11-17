// Configuration Flags
export const SHOW_RATINGS = false;
export const SHOW_TESTIMONIALS = false;
export const SHOW_INSTAGRAM = false;
export const SHOW_FOUNDER = false;

// Brand Configuration (Strictly Allowed Facts Only)
export const BRAND = {
  name: 'Elvia Herbals',
  tagline: 'Pure Homemade Herbal Oils',
  subline: 'Made by Hand, With Love.',
  description: 'Pure homemade herbal oils made in small batches in Kerala with pure virgin coconut oil and fresh neem. For healthy hair, a clean scalp and clear skin.',
  email: 'elviaherbals@gmail.com',
  phone: '+91 9207067522',
  whatsapp: '919207067522',
  instagram: 'https://www.instagram.com/elviaherbals/',
  instagramHandle: '@elviaherbals',
  facebook: 'https://www.facebook.com/share/1FWwC8UMjg/',
  address: 'Kerala, India',
};

// Social Links
export const SOCIAL = {
  instagram: 'https://www.instagram.com/elviaherbals/',
  facebook: 'https://www.facebook.com/share/1FWwC8UMjg/',
  whatsapp: 'https://wa.me/919207067522',
};

// Legacy exports preservation
export const siteConfig = {
  name: BRAND.name,
  tagline: BRAND.tagline,
  url: 'https://elviaherbals.com',
  ogImage: '/opengraph-image.png',
  links: SOCIAL,
};

export const orderMessage = (productName = 'Pure Neem Oil 100ml') =>
  `Hi Elvia Herbals! 🌿\n\nI want to order ${productName}. Please share availability and payment details. Thank you!`;

// Shipping Configuration
export const SHIPPING = {
  kerala: 50, // Delivery charge within Kerala (Rs.)
  restOfIndiaConfirmed: false, // Set to true once Rest of India charge is confirmed
  restOfIndiaPlaceholder: 90, // Internal placeholder, not shown as confirmed
};

export type DeliveryZone = 'kerala' | 'india';

export const DELIVERY_ZONES: { id: DeliveryZone; label: string; short: string }[] = [
  { id: 'kerala', label: 'Kerala (+₹50 delivery)', short: 'Kerala' },
  { id: 'india', label: 'Rest of India (charge confirmed on WhatsApp)', short: 'Rest of India' },
];

export const DELIVERY_AREAS = 'Delivery across India';

// Product Catalog (Allowed Facts Only)
export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  size: string;
  price?: number; // Almond Oil has no price shown while out of stock
  inStock: boolean;
  deliveryChargeKerala: number;
  image: string;
  gallery: string[];
  badges: string[];
  shortDesc: string;
  description: string;
  ingredients: string[];
  howToUse: { title: string; instructions: string }[];
  benefits: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

export const PRODUCTS: CatalogProduct[] = [
  {
    id: 'neem-oil',
    slug: 'neem-oil',
    name: 'Pure Neem Oil',
    size: '100ml',
    price: 269,
    inStock: true,
    deliveryChargeKerala: 50,
    image: '/images/neem-oil.png',
    // Only real Neem Oil bottle photo
    gallery: ['/images/neem-oil.png'],
    badges: ['100% Pure', 'Handmade in Kerala', 'No Chemicals'],
    shortDesc: 'Made with pure virgin coconut oil and fresh neem, for healthy hair, a clean scalp and clear skin.',
    description: 'Elvia Herbals Pure Neem Oil is handmade in small batches in Kerala using pure virgin coconut oil and fresh neem. Formulated without chemicals or preservatives, it is traditionally used for healthy hair, a clean scalp and clear skin.',
    ingredients: [
      'Pure Virgin Coconut Oil',
      'Fresh Neem',
      'No Chemicals',
      'No Preservatives',
    ],
    howToUse: [
      {
        title: 'For Hair & Scalp',
        instructions: 'Massage gently into the scalp and hair roots. Leave on for 30–60 minutes before washing with a mild shampoo.',
      },
      {
        title: 'For Skin',
        instructions: 'Apply a few drops gently on clean skin. Do a patch test before first use. For external application only.',
      },
    ],
    benefits: [
      {
        title: 'Clean Scalp',
        desc: 'Fresh neem is traditionally used to keep the scalp clean, fresh, and free from buildup.',
      },
      {
        title: 'Hair Nourishment',
        desc: 'Pure virgin coconut oil deeply nourishes hair strands, keeping them soft and manageable.',
      },
      {
        title: 'Clear Skin',
        desc: 'Traditionally used for clear, calm, and healthy skin.',
      },
      {
        title: 'Pure & Handmade',
        desc: 'Made by hand in small batches with zero chemicals and zero preservatives.',
      },
    ],
    faqs: [
      {
        q: 'What is this oil made from?',
        a: 'Our Neem Oil is made with just pure virgin coconut oil and fresh neem. No chemicals or preservatives are added.',
      },
      {
        q: 'What is it used for?',
        a: 'It is traditionally used for healthy hair, a clean scalp and clear skin.',
      },
      {
        q: 'How does delivery work?',
        a: 'Delivery in Kerala is ₹50 (total ₹319). For the Rest of India, we confirm the delivery charge on WhatsApp before payment.',
      },
      {
        q: 'How do I place an order?',
        a: 'Orders are placed directly via WhatsApp. Click "Order on WhatsApp", and we will confirm your order and share UPI payment details.',
      },
    ],
  },
  {
    id: 'almond-oil',
    slug: 'almond-oil',
    name: 'Pure Almond Oil',
    size: '60ml',
    // NO price while out of stock
    inStock: false,
    deliveryChargeKerala: 0,
    image: '/images/product-main.jpg',
    gallery: ['/images/product-main.jpg'],
    badges: ['100% Pure', 'Handmade', 'Restocking Soon'],
    shortDesc: 'Pure Almond Oil, handmade in small batches. Currently out of stock.',
    description: 'Elvia Herbals Pure Almond Oil 60ml. Made by hand in small batches with no chemicals or preservatives. Currently out of stock — restocking soon.',
    ingredients: [
      '100% Pure Almond Oil',
      'No Chemicals',
      'No Preservatives',
    ],
    howToUse: [
      {
        title: 'Usage Instructions',
        instructions: 'Message us on WhatsApp to confirm usage details when this product restocks.',
      },
    ],
    benefits: [
      {
        title: 'Gentle Care',
        desc: 'Pure almond oil traditionally used for hair and skin care.',
      },
      {
        title: 'Zero Additives',
        desc: 'No artificial chemicals or preservatives.',
      },
    ],
    faqs: [
      {
        q: 'When will Pure Almond Oil be available?',
        a: 'Almond Oil is currently restocking. Click "Notify Me When Available" on WhatsApp to be updated as soon as orders open.',
      },
    ],
  },
];

// Helper to get product by id or slug
export function getProduct(idOrSlug: string): CatalogProduct | undefined {
  return PRODUCTS.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}

// Generate pre-filled WhatsApp link using strictly allowed facts
export function getWhatsAppOrderUrl(
  product: CatalogProduct,
  zone: DeliveryZone = 'kerala'
): string {
  if (!product.inStock) {
    const msg = `Hi Elvia Herbals! 🌿\n\nPlease notify me when *${product.name} (${product.size})* is back in stock. Thank you!`;
    return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`;
  }

  if (zone === 'kerala') {
    const total = (product.price || 269) + product.deliveryChargeKerala;
    const msg = `Hi Elvia Herbals! 🌿\n\nI want to order:\n• Product: ${product.name} (${product.size})\n• Price: Rs.${product.price}\n• Deliver to: Kerala (+Rs.${product.deliveryChargeKerala} delivery)\n• Total Amount: Rs.${total}\n\nPlease confirm availability and payment details. Thank you!`;
    return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`;
  }

  // Rest of India
  const msg = `Hi Elvia Herbals! 🌿\n\nI want to order:\n• Product: ${product.name} (${product.size})\n• Price: Rs.${product.price}\n• Delivery area: Rest of India (please confirm charge)\n• Total Amount: Rs.${product.price} + delivery\n\nPlease confirm delivery charge for my location and payment details. Thank you!`;
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`;
}

// Contact form WhatsApp link
export function getWhatsAppContactUrl(name: string, phone: string, inquiry: string): string {
  const msg = `Hi Elvia Herbals! 🌿\n\n• Name: ${name}\n• Phone: ${phone}\n• Message: ${inquiry}\n\nThank you!`;
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`;
}

// Trust points for UI (Strictly Allowed Facts)
export const TRUST_POINTS = [
  {
    icon: 'leaf',
    title: '100% Pure',
    desc: 'Pure virgin coconut oil and fresh neem. No chemicals.',
  },
  {
    icon: 'heart',
    title: 'Handmade in Kerala',
    desc: 'Made by hand with care in Kerala.',
  },
  {
    icon: 'sparkles',
    title: 'Small Batches',
    desc: 'Prepared in small batches for fresh quality.',
  },
  {
    icon: 'shield',
    title: 'No Preservatives',
    desc: 'Zero preservatives, artificial dyes or chemical additives.',
  },
];

// Process Story Steps (Strictly Allowed Facts)
export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Fresh Neem',
    subtitle: 'Selected with care',
    description: 'Fresh neem leaves selected for preparation.',
    highlight: 'Pure Neem',
  },
  {
    step: '02',
    title: 'Cleaned & Prepared',
    subtitle: 'Washed thoroughly',
    description: 'Cleaned thoroughly and prepared by hand.',
    highlight: 'Carefully Prepared',
  },
  {
    step: '03',
    title: 'Virgin Coconut Oil Infusion',
    subtitle: 'Gentle preparation',
    description: 'Infused into pure virgin coconut oil using traditional handmade care.',
    highlight: 'Pure Virgin Coconut Oil',
  },
  {
    step: '04',
    title: 'Bottled by Hand',
    subtitle: 'Small batches',
    description: 'Poured and bottled by hand in small batches in Kerala.',
    highlight: 'Made in Kerala',
  },
];

// FAQs for Contact & Product
export const FAQS = [
  {
    question: 'How do I place an order?',
    answer: 'Click any "Order on WhatsApp" button. We will confirm your delivery address and share UPI payment details directly on WhatsApp.',
  },
  {
    question: 'What are the delivery charges?',
    answer: 'Delivery within Kerala is ₹50 (total ₹319 for Neem Oil 100ml). For the Rest of India, we confirm the exact delivery charge on WhatsApp before payment.',
  },
  {
    question: 'What ingredients are in the Neem Oil?',
    answer: 'Only two ingredients: pure virgin coconut oil and fresh neem. Zero chemicals and zero preservatives.',
  },
  {
    question: 'How should the oil be stored?',
    answer: 'Store in a cool, dry place. In cooler temperatures, virgin coconut oil may naturally solidify; place the bottle in warm water to gently liquefy.',
  },
];
