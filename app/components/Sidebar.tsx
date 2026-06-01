"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, ChevronRight } from "lucide-react";
import { categories } from "@/app/data/products";
import { useShop } from "@/app/context/ShopContext";
import { useRouter, useSearchParams } from "next/navigation";

const collectionLinks = ["Été 2025", "Édition Limitée", "Capsule Urbaine", "Weekend Chic"];

export default function Sidebar() {
  const { isMenuOpen, closeMenu } = useShop();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    if (isMenuOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isMenuOpen, closeMenu]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  function handleCategoryClick(cat: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "Nouveautés") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    // Scroll to product section
    router.push(`/shop?${params.toString()}`);
    closeMenu();
  }

  return (
    <>
      {/* Backdrop */}
      <div
        id="sidebar-backdrop"
        onClick={closeMenu}
        className={`fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm transition-opacity duration-400 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel */}
      <div
        ref={sidebarRef}
        id="sidebar-panel"
        className={`fixed top-0 left-0 h-full w-[85vw] max-w-sm z-[95] bg-white flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <span className="logo-text text-base font-semibold tracking-[0.3em] uppercase">Prototype</span>
          <button
            id="sidebar-close-btn"
            onClick={closeMenu}
            className="p-2 hover:opacity-60 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Fermer le menu"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Content */}
        <nav className="flex-1 overflow-y-auto py-4">
          {/* Categories */}
          <div className="mb-6">
            <p className="px-6 mb-3 text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium">
              Femme
            </p>
            <ul>
              {categories.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleCategoryClick(link)}
                    className="w-full flex items-center justify-between px-6 py-3.5 text-[13px] tracking-wide hover:bg-gray-50 transition-colors text-left min-h-[52px]"
                  >
                    <span>{link}</span>
                    <ChevronRight size={14} strokeWidth={1.5} className="text-gray-400" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div className="mb-6">
            <p className="px-6 mb-3 text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium">
              Collections
            </p>
            <ul>
              {collectionLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      router.push(`/shop?search=${encodeURIComponent(link)}`);
                      closeMenu();
                    }}
                    className="w-full flex items-center justify-between px-6 py-3.5 text-[13px] tracking-wide hover:bg-gray-50 transition-colors text-left min-h-[52px]"
                  >
                    <span>{link}</span>
                    <ChevronRight size={14} strokeWidth={1.5} className="text-gray-400" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-100 space-y-3">
          <span className="block text-[12px] tracking-wide text-gray-400 py-1" aria-disabled="true">
            Mon Compte · Bientôt disponible
          </span>
          <Link href="/contact" onClick={closeMenu} className="block text-[12px] tracking-wide text-gray-500 hover:text-black transition-colors py-1">
            Service Client
          </Link>
          <Link href="/faq" onClick={closeMenu} className="block text-[12px] tracking-wide text-gray-500 hover:text-black transition-colors py-1">
            Aide & FAQ
          </Link>
        </div>
      </div>
    </>
  );
}
