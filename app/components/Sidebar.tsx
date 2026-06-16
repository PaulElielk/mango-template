"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, ChevronRight } from "lucide-react";
import { brandConfig } from "@/app/data/brand";
import { useShop } from "@/app/context/ShopContext";

const shopLinks = [
  { label: "Nouveautés", href: "/shop" },
  { label: "Chemises", href: "/shop?search=Chemises" },
  { label: "Surchemises", href: "/shop?search=Surchemises" },
  { label: "Pantalons", href: "/shop?category=Pantalons" },
  { label: "Accessoires", href: "/shop?search=Accessoires" },
];

const serviceLinks = [
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Livraison & retours", href: "/livraison-retours" },
];

export default function Sidebar() {
  const { isMenuOpen, closeMenu } = useShop();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    if (isMenuOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isMenuOpen, closeMenu]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <div
        id="sidebar-backdrop"
        onClick={closeMenu}
        className={`fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm transition-opacity duration-400 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        ref={sidebarRef}
        id="sidebar-panel"
        className={`fixed top-0 left-0 h-full w-[85vw] max-w-sm z-[95] bg-white flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <span className="logo-text text-[12px] font-semibold tracking-[0.16em] uppercase sm:text-sm">
            {brandConfig.brand.name}
          </span>
          <button
            type="button"
            id="sidebar-close-btn"
            onClick={closeMenu}
            className="p-2 hover:opacity-60 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Fermer le menu"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4" aria-label="Menu mobile">
          <div className="mb-6">
            <p className="px-6 mb-3 text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium">
              Boutique
            </p>
            <ul>
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="w-full flex items-center justify-between px-6 py-3.5 text-[13px] tracking-wide hover:bg-gray-50 transition-colors text-left min-h-[52px]"
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={14} strokeWidth={1.5} className="text-gray-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <p className="px-6 mb-3 text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium">
              Services
            </p>
            <ul>
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="w-full flex items-center justify-between px-6 py-3.5 text-[13px] tracking-wide hover:bg-gray-50 transition-colors text-left min-h-[52px]"
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={14} strokeWidth={1.5} className="text-gray-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="px-6 py-5 border-t border-gray-100 space-y-3">
          <span className="block text-[12px] tracking-wide text-gray-400 py-1" aria-disabled="true">
            Mon Compte · Bientôt disponible
          </span>
          <p className="text-[12px] leading-5 text-gray-500">
            WhatsApp : {brandConfig.contact.whatsapp}
          </p>
        </div>
      </div>
    </>
  );
}
