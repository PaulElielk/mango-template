"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, SlidersHorizontal } from "lucide-react";
import { useShop } from "@/app/context/ShopContext";
import { categories, allSizes, allColors } from "@/app/data/products";

export default function FilterSheet() {
  const { isFilterOpen, closeFilter } = useShop();
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") ?? "";
  const activeSize = searchParams.get("size") ?? "";
  const activeColor = searchParams.get("color") ?? "";

  // Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFilter();
    };
    if (isFilterOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isFilterOpen, closeFilter]);

  // Body scroll lock
  useEffect(() => {
    if (isFilterOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isFilterOpen]);

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === value) {
      params.delete(key); // toggle off
    } else {
      params.set(key, value);
    }
    const query = params.toString();
    router.push(query ? `/shop?${query}` : "/shop");
  }

  function clearFilters() {
    router.push("/shop");
    closeFilter();
  }

  const hasFilters = activeCategory || activeSize || activeColor;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeFilter}
        className={`fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isFilterOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Bottom Sheet */}
      <div
        id="filter-sheet"
        className={`fixed bottom-0 left-0 right-0 z-[85] bg-white rounded-t-2xl shadow-2xl
          max-h-[85vh] flex flex-col
          transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
          ${isFilterOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2 shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} strokeWidth={1.5} />
            <span className="text-[12px] font-semibold tracking-[0.15em] uppercase">Filtres</span>
          </div>
          <div className="flex items-center gap-3">
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-[11px] tracking-wide text-gray-500 underline hover:text-black transition-colors"
              >
                Effacer tout
              </button>
            )}
            <button
              onClick={closeFilter}
              aria-label="Fermer les filtres"
              className="p-2 hover:opacity-60 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Scrollable filter groups */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-7">

          {/* Category */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-3">Catégorie</p>
            <div className="flex flex-wrap gap-2">
              {categories.filter(c => c !== "Accessoires" && c !== "Soldes").map((cat) => (
                <button
                  key={cat}
                  onClick={() => setParam("category", cat)}
                  className={`px-4 py-2.5 text-[12px] tracking-wide border transition-all min-h-[44px] ${
                    activeCategory === cat
                      ? "bg-black text-white border-black"
                      : "border-gray-200 hover:border-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-3">Taille</p>
            <div className="flex flex-wrap gap-2">
              {allSizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setParam("size", sz)}
                  className={`w-12 h-12 flex items-center justify-center text-[12px] font-medium border transition-all ${
                    activeSize === sz
                      ? "bg-black text-white border-black"
                      : "border-gray-200 hover:border-black"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-3">Couleur</p>
            <div className="flex flex-wrap gap-2">
              {allColors.map((col) => (
                <button
                  key={col}
                  onClick={() => setParam("color", col)}
                  className={`px-4 py-2.5 text-[12px] tracking-wide border transition-all min-h-[44px] ${
                    activeColor === col
                      ? "bg-black text-white border-black"
                      : "border-gray-200 hover:border-black"
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Apply button */}
        <div className="shrink-0 px-5 py-5 border-t border-gray-100">
          <button
            id="apply-filters-btn"
            onClick={closeFilter}
            className="w-full bg-black text-white text-[11px] tracking-[0.25em] uppercase py-4 hover:bg-gray-900 transition-colors min-h-[52px]"
          >
            Voir les résultats
          </button>
        </div>
      </div>
    </>
  );
}
