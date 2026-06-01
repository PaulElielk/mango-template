"use client";

import type { ReactNode } from "react";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/Footer";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";
import BackToTop from "@/app/components/BackToTop";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <SearchOverlay />
      <CartDrawer />
      <Sidebar />

      <main className="pt-24 md:pt-28">{children}</main>

      <Footer />
      <BackToTop />
    </>
  );
}
