import { Navbar } from '@/components/navigation';
import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from '@/components/sections/about';
import { ServicesSection } from '@/components/sections/services';
import { ReviewsSection } from '@/components/sections/reviews';
import { ContactSection } from '@/components/sections/contact';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex min-h-screen flex-col">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
