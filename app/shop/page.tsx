import type { Metadata } from "next";
import { Suspense } from "react";
import ShopPageClient from "./ShopPageClient";
import { brandConfig } from "@/app/data/brand";
import { mockProducts } from "@/app/data/products";
import { getSupabaseProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Parcourez la boutique SB LUXURY CASUAL: mode premium masculine, pièces raffinées, nouveautés et essentiels de style.",
  openGraph: {
    title: `Boutique | ${brandConfig.brand.name}`,
    description:
      "Collection SB LUXURY CASUAL avec filtres par catégorie, taille, couleur et recherche.",
    images: [
      {
        url: brandConfig.assets.hero.src,
        alt: brandConfig.brand.name,
      },
    ],
  },
};

export default async function Shop() {
  const { data: supabaseProducts, error } = await getSupabaseProducts();
  const products = supabaseProducts.length > 0 ? supabaseProducts : mockProducts;
  const catalogNotice =
    error || supabaseProducts.length === 0
      ? "Le catalogue local est affiché pour le moment."
      : undefined;

  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center text-gray-300 text-[11px] tracking-[0.3em] uppercase">
          Chargement...
        </div>
      }
    >
      <ShopPageClient products={products} catalogNotice={catalogNotice} />
    </Suspense>
  );
}
