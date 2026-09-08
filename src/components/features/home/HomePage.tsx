import CTA from "./sections/CTA";
import Hero from "./sections/Hero";
import Security from "./sections/Security";
import Services from "./sections/Services";
import TechStack from "./sections/TechStack";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-[#02040a]">
      <Hero />
      <Services />
      <TechStack />
      <Security />
      <CTA />
    </main>
  );
};

export default HomePage;
