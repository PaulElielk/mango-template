"use client";

import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { mockProducts } from "@/app/data/products";
import ProductCard from "./ProductCard";
import { useShop } from "@/app/context/ShopContext";
import { useRouter } from "next/navigation";

export default function ProductGrid() {
  const searchParams = useSearchParams();
  const { openFilter } = useShop();
  const router = useRouter();

  const activeCategory = searchParams.get("category") ?? "";
  const activeSize = searchParams.get("size") ?? "";
  const activeColor = searchParams.get("color") ?? "";
  const searchQuery = searchParams.get("search") ?? "";

  // ── Filtering ────────────────────────────────────────────────────────────────
  const filtered = mockProducts.filter((p) => {
    if (activeCategory && activeCategory !== "Nouveautés") {
      if (p.category !== activeCategory) return false;
    }
    if (activeCategory === "Nouveautés" && !p.isNew) return false;
    if (activeSize && !p.sizes.includes(activeSize)) return false;
    if (activeColor && !p.colors.some((c) => c.toLowerCase().includes(activeColor.toLowerCase()))) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.category.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const hasFilters = activeCategory || activeSize || activeColor || searchQuery;

  function clearFilter(key: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    const query = params.toString();
    router.push(query ? `/shop?${query}` : "/shop");
  }

  return (
    <section id="produits" className="px-4 md:px-8 py-16 md:py-24">
      {/* Filter bar */}
      <div className="flex items-center justify-between mb-8 gap-4">
        {/* Active filter chips */}
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {activeCategory && (
            <button
              onClick={() => clearFilter("category")}
              className="flex items-center gap-1.5 border border-black text-[11px] tracking-wide px-3 py-1.5 hover:bg-black hover:text-white transition-all min-h-[36px]"
            >
              {activeCategory}
              <X size={10} strokeWidth={2} />
            </button>
          )}
          {activeSize && (
            <button
              onClick={() => clearFilter("size")}
              className="flex items-center gap-1.5 border border-black text-[11px] tracking-wide px-3 py-1.5 hover:bg-black hover:text-white transition-all min-h-[36px]"
            >
              Taille {activeSize}
              <X size={10} strokeWidth={2} />
            </button>
          )}
          {activeColor && (
            <button
              onClick={() => clearFilter("color")}
              className="flex items-center gap-1.5 border border-black text-[11px] tracking-wide px-3 py-1.5 hover:bg-black hover:text-white transition-all min-h-[36px]"
            >
              {activeColor}
              <X size={10} strokeWidth={2} />
            </button>
          )}
          {searchQuery && (
            <button
              onClick={() => clearFilter("search")}
              className="flex items-center gap-1.5 border border-black text-[11px] tracking-wide px-3 py-1.5 hover:bg-black hover:text-white transition-all min-h-[36px]"
            >
              « {searchQuery} »
              <X size={10} strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Right: result count + filter button */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[11px] text-gray-400 hidden sm:block">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          </span>
          <button
            id="filter-open-btn"
            onClick={openFilter}
            className="flex items-center gap-2 border border-gray-300 text-[11px] tracking-[0.15em] uppercase px-4 py-2.5 hover:border-black transition-colors min-h-[44px] min-w-[44px]"
          >
            <SlidersHorizontal size={14} strokeWidth={1.5} />
            <span className="hidden sm:inline">Filtrer</span>
          </button>
        </div>
      </div>

      {/* Grid — strict 2-column mobile, scale up on desktop */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-4 gap-y-8 md:gap-y-10">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
          <p className="text-[14px] text-gray-400 tracking-wide">
            Aucun article ne correspond à votre sélection.
          </p>
          {hasFilters && (
            <button
              onClick={() => router.push("/shop")}
              className="border border-black text-black text-[11px] tracking-[0.2em] uppercase px-8 py-3 hover:bg-black hover:text-white transition-all duration-300 min-h-[44px]"
            >
              Voir tout
            </button>
          )}
        </div>
      )}

      {/* View all button — only when not filtered */}
      {!hasFilters && filtered.length > 0 && (
        <div className="flex justify-center mt-16">
          <button
            id="voir-tout-btn"
            className="border border-black text-black text-[11px] tracking-[0.25em] uppercase px-12 py-4 hover:bg-black hover:text-white transition-all duration-300 min-h-[52px]"
          >
            Voir tout
          </button>
        </div>
      )}
    </section>
  );
}
