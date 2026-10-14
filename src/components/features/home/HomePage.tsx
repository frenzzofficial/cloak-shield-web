import LandingLoader from "./LandingLoader";
import CTA from "./sections/CTA";
import Features from "./sections/Features";
import Hero from "./sections/Hero";
import Pricing from "./sections/Pricing";
import Security from "./sections/Security";
import TechStack from "./sections/TechStack";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-[#02040a]">
      <LandingLoader />
      <Hero />
      <Features />
      <TechStack />
      <Security />
      <Pricing />
      <CTA />
    </main>
  );
};

export default HomePage;
