import type { Metadata } from 'next';
import AboutView from './AboutView';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Elvia Herbals in Kerala. We make pure homemade herbal oils by hand in small batches using virgin coconut oil and fresh neem. Pure and natural.',
  alternates: { canonical: 'https://elviaherbals.com/about' },
  openGraph: {
    title: 'About Us | Elvia Herbals',
    description:
      'Learn about Elvia Herbals in Kerala. We make pure homemade herbal oils by hand in small batches using virgin coconut oil and fresh neem.',
    url: 'https://elviaherbals.com/about',
    siteName: 'Elvia Herbals',
    locale: 'en_IN',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'About Elvia Herbals' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Elvia Herbals',
    description:
      'Learn about Elvia Herbals in Kerala. We make pure homemade herbal oils by hand in small batches using virgin coconut oil and fresh neem.',
    images: ['/twitter-image.png'],
  },
};

export default function AboutPage() {
  return <AboutView />;
}
