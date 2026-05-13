"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-end"
    >
      {/* Background image — uses plain img to bypass Next.js image cache */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero.png"
          alt="Nouvelle collection Prototype"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Gradient overlay — lighter at top, darker at bottom for CTA legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      {/* Content — centered bottom */}
      <div className="relative z-10 w-full flex flex-col items-center pb-16 md:pb-24 animate-fade-in-up">
        <p className="text-white/80 text-[11px] tracking-[0.4em] uppercase mb-4 animate-fade-in-up">
          Nouvelle Collection
        </p>
        <h1
          className="text-white text-3xl md:text-5xl lg:text-6xl font-light tracking-wide text-center mb-2 animate-fade-in-up"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Printemps — Été 2025
        </h1>
        <p className="text-white/70 text-[16px] tracking-widest mb-10 animate-fade-in-up-delay">
          Élégance intemporelle, style contemporain
        </p>
        <a
          id="hero-cta-btn"
          href="/shop"
          className="inline-block border border-white text-white text-[11px] tracking-[0.25em] uppercase px-10 py-4 hover:bg-white hover:text-black transition-all duration-300 animate-fade-in-up-delay"
        >
          Acheter Maintenant
        </a>
      </div>
    </section>
  );
}
