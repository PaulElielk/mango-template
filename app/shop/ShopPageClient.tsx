"use client";

import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/Footer";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";
import FilterSheet from "@/app/components/FilterSheet";
import BackToTop from "@/app/components/BackToTop";
import ProductGrid from "@/app/components/ProductGrid";
import type { Product } from "@/app/data/products";

type ShopPageClientProps = {
  products: Product[];
  catalogNotice?: string;
};

export default function ShopPageClient({
  products,
  catalogNotice,
}: ShopPageClientProps) {
  return (
    <>
      <Header />
      <SearchOverlay products={products} />
      <CartDrawer />
      <Sidebar />

      <main className="pt-24 md:pt-28">
        <h1 className="sr-only">Boutique</h1>
        <ProductGrid products={products} catalogNotice={catalogNotice} />
        <FilterSheet />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
