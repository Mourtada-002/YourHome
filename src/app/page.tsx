import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/FeaturedProperties";
import WhyYourHome from "@/components/WhyYourHome";
import HorizontalGallery from "@/components/HorizontalGallery";
import Agency from "@/components/Agency";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SiteReadyProvider } from "@/components/SiteReadyContext";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export default function Home() {
  return (
    <SiteReadyProvider>
      <SmoothScrollProvider>
        <Preloader />
        <Navbar />
        <main>
          <Hero />
          <FeaturedProperties />
          <WhyYourHome />
          <HorizontalGallery />
          <Agency />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </SmoothScrollProvider>
    </SiteReadyProvider>
  );
}
