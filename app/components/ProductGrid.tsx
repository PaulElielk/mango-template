"use client";

import Link from "next/link";
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
  const categoryPills = ["Nouveautés", "Jeans", "Robes", "Manteaux", "Vestes", "Pantalons", "Pulls", "Tops"];

  function handleCategoryPillClick(category: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "Nouveautés") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const query = params.toString();
    router.push(query ? `/shop?${query}` : "/shop");
  }

  function clearFilter(key: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    const query = params.toString();
    router.push(query ? `/shop?${query}` : "/shop");
  }

  return (
    <section id="produits" className="px-4 md:px-8 pt-6 pb-16 md:py-24">
      <div className="-mx-4 md:-mx-8 mb-8 md:mb-16 overflow-x-auto hide-scrollbar border-y border-gray-100 bg-white">
        <div className="flex items-center gap-2 px-4 md:px-8 py-3 w-max">
          {categoryPills.map((pill) => {
            const isActive =
              activeCategory === pill || (pill === "Nouveautés" && !activeCategory);

            return (
              <button
                type="button"
                key={pill}
                onClick={() => handleCategoryPillClick(pill)}
                className={`px-5 py-2 text-[11px] tracking-wide rounded-full border transition-all whitespace-nowrap min-h-[44px] ${
                  isActive
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-200 hover:border-black"
                }`}
              >
                {pill}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center justify-between mb-8 gap-4">
        {/* Active filter chips */}
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {activeCategory && (
            <button
              type="button"
              onClick={() => clearFilter("category")}
              className="flex items-center gap-1.5 border border-black text-[11px] tracking-wide px-3 py-1.5 hover:bg-black hover:text-white transition-all min-h-[36px]"
            >
              {activeCategory}
              <X size={10} strokeWidth={2} />
            </button>
          )}
          {activeSize && (
            <button
              type="button"
              onClick={() => clearFilter("size")}
              className="flex items-center gap-1.5 border border-black text-[11px] tracking-wide px-3 py-1.5 hover:bg-black hover:text-white transition-all min-h-[36px]"
            >
              Taille {activeSize}
              <X size={10} strokeWidth={2} />
            </button>
          )}
          {activeColor && (
            <button
              type="button"
              onClick={() => clearFilter("color")}
              className="flex items-center gap-1.5 border border-black text-[11px] tracking-wide px-3 py-1.5 hover:bg-black hover:text-white transition-all min-h-[36px]"
            >
              {activeColor}
              <X size={10} strokeWidth={2} />
            </button>
          )}
          {searchQuery && (
            <button
              type="button"
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
            type="button"
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
              type="button"
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
          <Link
            id="voir-tout-btn"
            href="/shop"
            className="inline-flex items-center justify-center border border-black text-black text-[11px] tracking-[0.25em] uppercase px-12 py-4 hover:bg-black hover:text-white transition-all duration-300 min-h-[52px]"
          >
            Voir tout
          </Link>
        </div>
      )}
    </section>
  );
}
