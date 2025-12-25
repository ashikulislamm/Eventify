import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import LatestEvents from "@/components/sections/LatestEvents";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <LatestEvents />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
}
