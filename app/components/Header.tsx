"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu } from "lucide-react";
import { brandConfig } from "@/app/data/brand";
import { useShop } from "@/app/context/ShopContext";

const navLinks = [
  { label: "Nouveautés", href: "/shop" },
  { label: "Chemises", href: "/shop?search=Chemises" },
  { label: "Surchemises", href: "/shop?search=Surchemises" },
  { label: "Pantalons", href: "/shop?category=Pantalons" },
  { label: "Accessoires", href: "/shop?search=Accessoires" },
];

export default function Header() {
  const { cartCount, openCart, openMenu, openSearch } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAccountNotice, setShowAccountNotice] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!showAccountNotice) return;

    const timeout = window.setTimeout(() => setShowAccountNotice(false), 3500);
    return () => window.clearTimeout(timeout);
  }, [showAccountNotice]);

  return (
    <header
      className={`absolute md:fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="bg-black text-white text-[10px] tracking-[0.2em] uppercase py-2 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <span className="promo-text inline-block">
            &nbsp;&nbsp;&nbsp;Mode premium masculine à Abidjan &nbsp;·&nbsp; Nouveautés chaque semaine &nbsp;·&nbsp; Livraison à confirmer avec la boutique &nbsp;·&nbsp; Service client disponible &nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 md:px-8 h-14">
        <div className="flex items-center gap-4 w-1/4 md:w-1/3">
          <button
            type="button"
            id="hamburger-btn"
            onClick={openMenu}
            className="md:hidden p-2 hover:opacity-60 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Ouvrir le menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>

          <nav className="hidden md:flex items-center gap-6" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-[11px] uppercase tracking-[0.12em] font-medium opacity-70 hover:opacity-100 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex justify-center w-1/2 md:w-1/3">
          <Link
            href="/"
            className="logo-text whitespace-nowrap text-[9px] font-semibold tracking-[0.1em] uppercase select-none sm:text-[11px] sm:tracking-[0.16em] md:text-sm lg:text-base lg:tracking-[0.22em]"
          >
            {brandConfig.brand.name}
          </Link>
        </div>

        <div className="flex items-center justify-end gap-1 md:gap-3 w-1/4 md:w-1/3">
          <button
            type="button"
            id="search-btn"
            onClick={openSearch}
            aria-label="Rechercher"
            className="p-2 hover:opacity-60 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <Search size={18} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            id="account-btn"
            onClick={() => setShowAccountNotice(true)}
            aria-label="Mon compte"
            className="p-2 hover:opacity-60 transition-opacity hidden md:flex min-w-[44px] min-h-[44px] items-center justify-center"
          >
            <User size={18} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            id="cart-btn"
            onClick={openCart}
            aria-label="Panier"
            className="p-2 hover:opacity-60 transition-opacity relative min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="absolute top-1 right-1 bg-black text-white text-[9px] font-semibold w-4 h-4 flex items-center justify-center rounded-full cart-badge-pulse"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      {showAccountNotice && (
        <div
          role="status"
          className="absolute right-8 top-[82px] hidden md:block bg-white border border-gray-100 shadow-lg px-4 py-3 text-[12px] tracking-wide text-gray-600"
        >
          Espace client bientôt disponible.
        </div>
      )}
    </header>
  );
}
