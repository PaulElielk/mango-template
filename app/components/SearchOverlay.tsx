"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { useShop } from "@/app/context/ShopContext";
import { mockProducts } from "@/app/data/products";

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useShop();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleClose = useCallback(() => {
    setQuery("");
    closeSearch();
  }, [closeSearch]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [isSearchOpen]);

  // Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isSearchOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isSearchOpen, handleClose]);

  // Body scroll lock
  useEffect(() => {
    if (isSearchOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isSearchOpen]);

  // Live results (up to 6)
  const results =
    query.trim().length > 1
      ? mockProducts
          .filter(
            (p) =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.category.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 6)
      : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
    handleClose();
  };

  const handleResultClick = (slug: string) => {
    router.push(`/shop/${slug}`);
    handleClose();
  };

  const popularSearches = ["Robes", "Vestes", "Nouveautés", "Manteaux", "Pulls"];

  return (
    <div
      id="search-overlay"
      className={`fixed inset-0 z-[100] bg-white transition-all duration-300 ${
        isSearchOpen
          ? "opacity-100 pointer-events-auto translate-y-0"
          : "opacity-0 pointer-events-none -translate-y-4"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-4 px-4 md:px-8 h-16 border-b border-gray-100">
        <Search size={18} strokeWidth={1.5} className="text-gray-400 shrink-0" />
        <form onSubmit={handleSubmit} className="flex-1">
          <label htmlFor="search-input" className="sr-only">
            Rechercher dans la boutique
          </label>
          <input
            ref={inputRef}
            id="search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une pièce, une catégorie…"
            className="w-full text-[15px] md:text-[17px] tracking-wide outline-none placeholder:text-gray-300 bg-transparent"
          />
        </form>
        <button
          type="button"
          id="search-close-btn"
          onClick={handleClose}
          aria-label="Fermer la recherche"
          className="p-2 hover:opacity-60 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 py-8 max-w-2xl mx-auto">
        {/* Live results */}
        {results.length > 0 ? (
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-4">
              Résultats ({results.length})
            </p>
            <ul className="space-y-1">
              {results.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => handleResultClick(p.slug)}
                    className="w-full flex items-center justify-between py-3 px-2 hover:bg-gray-50 transition-colors text-left group min-h-[52px]"
                  >
                    <div>
                      <p className="text-[13px] font-medium">{p.name}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{p.category} · {p.price}</p>
                    </div>
                    <ArrowRight
                      size={14}
                      strokeWidth={1.5}
                      className="text-gray-300 group-hover:text-black transition-colors shrink-0"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : query.trim().length > 1 ? (
          <div className="text-center py-16">
            <p className="text-[13px] text-gray-400">
              Aucun résultat pour «{" "}
              <span className="text-black">{query}</span> »
            </p>
          </div>
        ) : (
          /* Popular searches */
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-4">
              Recherches populaires
            </p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  type="button"
                  key={term}
                  onClick={() => {
                    router.push(`/shop?category=${encodeURIComponent(term)}`);
                    handleClose();
                  }}
                  className="border border-gray-200 text-[12px] tracking-wide px-4 py-2.5 hover:border-black hover:bg-black hover:text-white transition-all duration-200 min-h-[44px]"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
