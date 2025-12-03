import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create default admin
  const hashedPassword = await bcrypt.hash('elvya123', 12);

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@elvya.com' },
    update: {},
    create: {
      email: 'admin@elvya.com',
      password: hashedPassword,
      name: 'Admin',
    },
  });

  console.log('Admin created:', admin.email);

  // Create default product
  const product = await prisma.product.upsert({
    where: { id: 'default-almond-oil' },
    update: {},
    create: {
      id: 'default-almond-oil',
      name: 'Pure Almond Oil',
      description: 'Our pure almond oil is cold-pressed from premium quality almonds, preserving all the natural nutrients and benefits. Made with traditional methods passed down through generations, each bottle contains the essence of pure, unadulterated almond goodness.',
      price: 599,
      sizes: JSON.stringify([
        { id: '50ml', label: '50ml', price: 299, originalPrice: 399 },
        { id: '100ml', label: '100ml', price: 599, originalPrice: 799 },
        { id: '200ml', label: '200ml', price: 999, originalPrice: 1299 },
      ]),
      ingredients: JSON.stringify([
        '100% Pure Almonds',
        'No Preservatives',
        'No Chemicals',
        'No Additives',
      ]),
      howToUse: JSON.stringify([
        'For Skin: Apply a few drops on clean skin and massage gently. Best used before bedtime.',
        'For Hair: Warm the oil slightly and massage into scalp. Leave for 30 minutes or overnight before washing.',
        'For Face: Use as a natural makeup remover or add to your moisturizer for extra hydration.',
      ]),
      benefits: JSON.stringify([
        { icon: 'sparkles', title: 'Glowing Skin', description: 'Natural moisturizer that gives your skin a healthy, radiant glow.' },
        { icon: 'heart', title: 'Hair Nourishment', description: 'Strengthens hair roots and promotes thick, lustrous hair growth.' },
        { icon: 'shield', title: '100% Pure', description: 'Cold-pressed and free from chemicals, preservatives, and additives.' },
        { icon: 'leaf', title: 'Traditional Process', description: 'Made using age-old techniques to preserve maximum nutrients.' },
      ]),
      isActive: true,
    },
  });

  console.log('Product created:', product.name);

  // Create default site settings
  const settings = await prisma.siteSettings.upsert({
    where: { id: 'settings' },
    update: {},
    create: {
      id: 'settings',
      brandName: 'ELVYA',
      tagline: 'Pure Homemade Almond Oil',
      phone: '+919999999999',
      whatsapp: '919999999999',
      email: 'hello@elvya.com',
      instagram: 'https://instagram.com/elvya',
      address: 'Mumbai, Maharashtra, India',
    },
  });

  console.log('Settings created');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
