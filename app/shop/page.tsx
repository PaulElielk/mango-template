import type { Metadata } from "next";
import { Suspense } from "react";
import ShopPageClient from "./ShopPageClient";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Parcourez la boutique Prototype: vêtements féminins, robes, vestes, manteaux, accessoires, nouveautés et pièces essentielles.",
  openGraph: {
    title: "Boutique | Prototype",
    description:
      "Collection de mode féminine Prototype avec filtres par catégorie, taille, couleur et recherche.",
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
