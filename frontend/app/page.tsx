import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <Footer />
    </div>
  );
}
