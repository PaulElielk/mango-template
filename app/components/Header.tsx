"use client";

import { useState, useEffect } from "react";
import { Search, User, ShoppingBag, Menu } from "lucide-react";
import { categories } from "@/app/data/products";
import { useShop } from "@/app/context/ShopContext";
import { useRouter, useSearchParams } from "next/navigation";

export default function Header() {
  const { cartCount, openCart, openMenu, openSearch } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "Nouveautés";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (cartCount > 0) {
      setCartPulse(true);
      const t = setTimeout(() => setCartPulse(false), 400);
      return () => clearTimeout(t);
    }
  }, [cartCount]);

  function handleCategoryClick(cat: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "Nouveautés") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <header
      className={`absolute md:fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.08)]"
          : "bg-transparent"
      }`}
    >
      {/* Promo banner */}
      <div className="bg-black text-white text-[10px] tracking-[0.2em] uppercase py-2 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <span className="promo-text inline-block">
            &nbsp;&nbsp;&nbsp;Livraison gratuite dès 50 000 FCFA &nbsp;·&nbsp; Nouveautés chaque semaine &nbsp;·&nbsp; Retours gratuits sous 30 jours &nbsp;·&nbsp; Service client disponible 7j/7 &nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>

      {/* Main nav row */}
      <div className="flex items-center justify-between px-4 md:px-8 h-14">
        {/* Left: Hamburger (mobile) / Desktop nav */}
        <div className="flex items-center gap-4 w-1/3">
          <button
            id="hamburger-btn"
            onClick={openMenu}
            className="md:hidden p-2 hover:opacity-60 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Ouvrir le menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`nav-link text-[11px] uppercase tracking-[0.12em] font-medium transition-opacity ${
                  activeCategory === cat || (cat === "Nouveautés" && !searchParams.get("category"))
                    ? "opacity-100"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center w-1/3">
          <a
            href="/"
            className="logo-text text-xl font-semibold tracking-[0.3em] uppercase select-none"
          >
            Prototype
          </a>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center justify-end gap-1 md:gap-3 w-1/3">
          <button
            id="search-btn"
            onClick={openSearch}
            aria-label="Rechercher"
            className="p-2 hover:opacity-60 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <Search size={18} strokeWidth={1.5} />
          </button>
          <button
            id="account-btn"
            aria-label="Mon compte"
            className="p-2 hover:opacity-60 transition-opacity hidden md:flex min-w-[44px] min-h-[44px] items-center justify-center"
          >
            <User size={18} strokeWidth={1.5} />
          </button>
          <button
            id="cart-btn"
            onClick={openCart}
            aria-label="Panier"
            className="p-2 hover:opacity-60 transition-opacity relative min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span
                className={`absolute top-1 right-1 bg-black text-white text-[9px] font-semibold w-4 h-4 flex items-center justify-center rounded-full ${
                  cartPulse ? "cart-badge-pulse" : ""
                }`}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
