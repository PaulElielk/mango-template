import type { Metadata } from "next";
import { Suspense } from "react";
import ShopPageClient from "./ShopPageClient";
import { brandConfig } from "@/app/data/brand";

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

export default function Shop() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center text-gray-300 text-[11px] tracking-[0.3em] uppercase">
          Chargement...
        </div>
      }
    >
      <ShopPageClient />
    </Suspense>
  );
}
