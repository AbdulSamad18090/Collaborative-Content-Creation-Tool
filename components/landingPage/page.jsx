"use client";

import { useState } from "react";
import { HeroSection } from "./_components/HeroSection/page";
import { FeaturesSection } from "./_components/FeaturesSection/page";
import { PricingSection } from "./_components/PricingSection/page";
import { CallToAction } from "./_components/CallToAction/page";
import { Header } from "./_components/Header/page";
import { Footer } from "./_components/Footer/page";

export function LandingPageComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Smooth scroll function
  const handleScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        handleScroll={handleScroll}
      />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
