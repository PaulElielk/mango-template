import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import Hero from "@/app/components/Hero";
import BrandPresentation from "@/app/components/BrandPresentation";
import CategoryBanner from "@/app/components/CategoryBanner";
import Footer from "@/app/components/Footer";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";
import BackToTop from "@/app/components/BackToTop";
import { brandConfig } from "@/app/data/brand";

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "Découvrez SB LUXURY CASUAL, marque de mode premium masculine à Abidjan pour les hommes qui cultivent la distinction.",
  openGraph: {
    title: `Accueil | ${brandConfig.brand.name}`,
    description:
      "Mode premium masculine, nouveautés et pièces raffinées dans une expérience boutique élégante.",
    images: [
      {
        url: brandConfig.assets.hero.src,
        alt: brandConfig.brand.name,
      },
    ],
  },
};

// Components using useSearchParams must be wrapped in Suspense to avoid
// Next.js de-opting the entire page from static rendering.
function PageBody() {
  return (
    <>
      {/* Navigation */}
      <Header />

      {/* Global overlays */}
      <SearchOverlay />
      <CartDrawer />
      <Sidebar />

      {/* Page content */}
      <main>
        <Hero />
        <BrandPresentation />
        <CategoryBanner />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center text-gray-300 text-[11px] tracking-[0.3em] uppercase">
          Chargement...
        </div>
      }
    >
      <PageBody />
    </Suspense>
  );
}
