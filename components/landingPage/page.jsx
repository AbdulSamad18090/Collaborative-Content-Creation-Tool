"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "./_components/HeroSection/page";
import { FeaturesSection } from "./_components/FeaturesSection/page";
import { PricingSection } from "./_components/PricingSection/page";
import { CallToAction } from "./_components/CallToAction/page";
import { Header } from "./_components/Header/page";
import { Footer } from "./_components/Footer/page";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";

export function LandingPageComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Smooth scroll function
  const handleScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show or hide the "Back to Top" button based on scroll position
  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScrollButtonVisibility);
    return () => {
      window.removeEventListener("scroll", handleScrollButtonVisibility);
    };
  }, []);

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
      {showScrollButton && (
        <Button
          onClick={scrollToTop}
          className={`flex gap-2 fixed bottom-10 right-10 z-10 text-white p-2 shadow-lg transition-opacity ease-in-out transform animate-bounce ${
            showScrollButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
          }}
        >
          Back to Top <span>{<ArrowUp />}</span>
        </Button>
      )}
    </div>
  );
}
