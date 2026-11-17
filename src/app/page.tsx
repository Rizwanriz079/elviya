import HeroSection from '@/components/home/HeroSection';
import MarqueeStrip from '@/components/home/MarqueeStrip';
import FeaturedProductSection from '@/components/home/FeaturedProductSection';
import WhyChooseSection from '@/components/home/WhyChooseSection';
import ProcessStorySection from '@/components/home/ProcessStorySection';
import BenefitsSection from '@/components/home/BenefitsSection';
import ComingSoonSection from '@/components/home/ComingSoonSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import InstagramStrip from '@/components/home/InstagramStrip';
import FinalCtaSection from '@/components/home/FinalCtaSection';
import PageTransition from '@/components/PageTransition';

export default function HomePage() {
  return (
    <PageTransition>
      <div className="overflow-hidden">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Marquee Infinite Loop */}
        <MarqueeStrip />

        {/* 3. Featured Signature Product (Neem Oil) */}
        <FeaturedProductSection />

        {/* 4. Why Choose Elvia Herbals */}
        <WhyChooseSection />

        {/* 5. Ingredient Story: From Leaf to Bottle */}
        <ProcessStorySection />

        {/* 6. Traditional Benefits Tabs (Hair / Scalp / Skin) */}
        <BenefitsSection />

        {/* 7. Almond Oil Coming Soon */}
        <ComingSoonSection />

        {/* 8. Verified Community Testimonials */}
        <TestimonialsSection />

        {/* 9. Instagram Community Gallery */}
        <InstagramStrip />

        {/* 10. Final Gold Gradient CTA */}
        <FinalCtaSection />
      </div>
    </PageTransition>
  );
}
