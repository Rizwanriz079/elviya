// Brand Configuration
export const BRAND = {
  name: 'Elvia Herbals',
  tagline: 'Pure Homemade Almond Oil',
  description: 'Made by Hand, With Love',
  email: 'hello@elviaherbals.com',
  phone: '+919207067522',
  whatsapp: '919207067522',
  instagram: 'https://instagram.com/elviaherbals',
  address: 'India',
};

// Product Image
export const PRODUCT_IMAGE = '/images/almond-oil-bottle.jpg';

// Product Data
export const PRODUCT = {
  name: 'Pure Almond Oil',
  image: PRODUCT_IMAGE,
  price: 599,
  currency: 'INR',
  currencySymbol: '₹',
  sizes: [
    { id: '50ml', label: '50ml', price: 299, originalPrice: 399 },
    { id: '100ml', label: '100ml', price: 599, originalPrice: 799 },
    { id: '200ml', label: '200ml', price: 999, originalPrice: 1299 },
  ],
  description: 'Our pure almond oil is cold-pressed from premium quality almonds, preserving all the natural nutrients and benefits. Made with traditional methods passed down through generations, each bottle contains the essence of pure, unadulterated almond goodness.',
  ingredients: ['100% Pure Almonds', 'No Preservatives', 'No Chemicals', 'No Additives'],
  benefits: [
    {
      icon: 'sparkles',
      title: 'Glowing Skin',
      description: 'Natural moisturizer that gives your skin a healthy, radiant glow.',
    },
    {
      icon: 'heart',
      title: 'Hair Nourishment',
      description: 'Strengthens hair roots and promotes thick, lustrous hair growth.',
    },
    {
      icon: 'shield',
      title: '100% Pure',
      description: 'Cold-pressed and free from chemicals, preservatives, and additives.',
    },
    {
      icon: 'leaf',
      title: 'Traditional Process',
      description: 'Made using age-old techniques to preserve maximum nutrients.',
    },
  ],
  howToUse: [
    'For Skin: Apply a few drops on clean skin and massage gently. Best used before bedtime.',
    'For Hair: Warm the oil slightly and massage into scalp. Leave for 30 minutes or overnight before washing.',
    'For Face: Use as a natural makeup remover or add to your moisturizer for extra hydration.',
  ],
};

// Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'The best almond oil I have ever used! My skin feels so soft and my hair has never looked better. Truly homemade quality.',
  },
  {
    id: 2,
    name: 'Anita Patel',
    location: 'Delhi',
    rating: 5,
    text: 'I switched to Elvia Herbals almond oil 3 months ago and the difference is amazing. Pure, natural, and worth every penny!',
  },
  {
    id: 3,
    name: 'Meera Krishnan',
    location: 'Bangalore',
    rating: 5,
    text: 'Finally found a brand I can trust. The oil is pure and the results are visible within weeks. Highly recommend!',
  },
];

// Features for homepage
export const FEATURES = [
  {
    icon: 'droplet',
    title: '100% Pure',
    description: 'No chemicals, no preservatives. Just pure almond goodness.',
  },
  {
    icon: 'hand',
    title: 'Handmade',
    description: 'Crafted with care using traditional methods.',
  },
  {
    icon: 'thermometer',
    title: 'Cold Pressed',
    description: 'Low temperature extraction preserves all nutrients.',
  },
  {
    icon: 'award',
    title: 'Premium Quality',
    description: 'Made from the finest California almonds.',
  },
];
