"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      id="back-to-top-btn"
      onClick={scrollToTop}
      aria-label="Retour en haut"
      className={`fixed bottom-6 right-4 z-50 w-11 h-11 bg-black text-white flex items-center justify-center
        shadow-lg hover:bg-gray-800 transition-all duration-300 rounded-full
        ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <ChevronUp size={18} strokeWidth={2} />
    </button>
  );
}
