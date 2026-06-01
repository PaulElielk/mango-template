import Link from "next/link";
import { Suspense } from "react";
import PageShell from "@/app/components/PageShell";

export default function NotFound() {
  return (
    <Suspense fallback={<div className="h-screen" />}>
      <PageShell>
        <section className="px-4 md:px-8 pb-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-4">
            404
          </p>
          <h1
            className="text-3xl md:text-5xl font-light tracking-wide mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Page introuvable
          </h1>
          <p className="text-[14px] text-gray-600 leading-7 max-w-xl mb-8">
            La page que vous recherchez n’existe pas ou a été déplacée.
          </p>
          <Link
            href="/shop"
            className="border border-black text-black text-[11px] tracking-[0.25em] uppercase px-10 py-4 hover:bg-black hover:text-white transition-all duration-300 min-h-[52px]"
          >
            Retour à la boutique
          </Link>
        </section>
      </PageShell>
    </Suspense>
  );
}
