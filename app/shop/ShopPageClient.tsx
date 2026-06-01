"use client";

import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/Footer";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";
import FilterSheet from "@/app/components/FilterSheet";
import BackToTop from "@/app/components/BackToTop";
import ProductGrid from "@/app/components/ProductGrid";
import { useRouter, useSearchParams } from "next/navigation";

function CategoryPills() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "";

  const pills = ["Nouveautés", "Jeans", "Robes", "Manteaux", "Vestes", "Pantalons", "Pulls", "Tops"];

  function handlePillClick(cat: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "Nouveautés") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <div className="w-full overflow-x-auto hide-scrollbar border-b border-gray-100 bg-white sticky top-0 md:top-14 z-[40]">
      <div className="flex items-center gap-2 px-4 md:px-8 py-3 w-max">
        {pills.map((pill) => {
          const isActive = activeCategory === pill || (pill === "Nouveautés" && !activeCategory);
          return (
            <button
              key={pill}
              onClick={() => handlePillClick(pill)}
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
  );
}

export default function ShopPageClient() {
  return (
    <>
      <Header />
      <SearchOverlay />
      <CartDrawer />
      <Sidebar />

      <main className="pt-14">
        <CategoryPills />
        <ProductGrid />
        <FilterSheet />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
