import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import LatestEvents from "@/components/sections/LatestEvents";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <LatestEvents />

    </div>
  );
}
