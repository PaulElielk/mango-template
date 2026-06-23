"use client";

import Link from "next/link";
import { brandConfig } from "@/app/data/brand";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-end mb-6 md:mb-2"
    >
      {/* Background image — uses plain img to bypass Next.js image cache */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={brandConfig.assets.hero.src}
          alt={`Nouvelle collection ${brandConfig.brand.name}`}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Gradient overlay — lighter at top, darker at bottom for CTA legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      {/* Content — centered bottom */}
      <div className="relative z-10 w-full flex flex-col items-center px-4 pb-16 text-center md:pb-24 animate-fade-in-up">
        <p className="text-white/80 text-[11px] tracking-[0.4em] uppercase mb-4 animate-fade-in-up">
          {brandConfig.brand.name}
        </p>
        <h1
          className="text-white text-3xl md:text-5xl lg:text-6xl font-light tracking-wide text-center mb-3 animate-fade-in-up"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {brandConfig.brand.slogan}
        </h1>
        <p className="max-w-2xl text-white/75 text-[14px] md:text-[16px] leading-7 tracking-wide mb-8 animate-fade-in-up-delay">
          {brandConfig.brand.shortDescription}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            id="hero-cta-btn"
            href="/shop"
            className="inline-block border border-white text-white text-[11px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-white hover:text-black transition-all duration-300 animate-fade-in-up-delay"
          >
            Découvrir la collection
          </Link>
        </div>
      </div>
    </section>
  );
}
