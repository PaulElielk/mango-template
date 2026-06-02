import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import Hero from "@/app/components/Hero";
import CategoryBanner from "@/app/components/CategoryBanner";
import Footer from "@/app/components/Footer";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";
import BackToTop from "@/app/components/BackToTop";

export const metadata: Metadata = {
  title: "Prototype | Mode féminine",
  description:
    "Découvrez Prototype, une boutique de mode féminine contemporaine pensée pour présenter une collection élégante, claire et mobile-friendly.",
  openGraph: {
    title: "Accueil | Prototype",
    description:
      "Mode féminine contemporaine, nouveautés et pièces essentielles dans une expérience boutique élégante.",
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
          Chargement…
        </div>
      }
    >
      <PageBody />
    </Suspense>
  );
}
