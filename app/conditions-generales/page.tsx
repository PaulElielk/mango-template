import type { Metadata } from "next";
import { Suspense } from "react";
import PageShell from "@/app/components/PageShell";

const sections = [
  "Présentation des produits",
  "Processus de commande",
  "Prix et devise",
  "Paiement",
  "Livraison",
  "Retours et échanges",
  "Responsabilité",
  "Adaptation juridique finale",
];

export const metadata: Metadata = {
  title: "Conditions générales",
  description:
    "Base préparatoire de conditions générales pour la boutique Prototype, à adapter juridiquement avant mise en production.",
};

export default function TermsPage() {
  return (
    <Suspense fallback={<div className="h-screen" />}>
      <PageShell>
        <article className="px-4 md:px-8 pb-20 max-w-4xl mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-4">
            Informations légales
          </p>
          <h1
            className="text-3xl md:text-5xl font-light tracking-wide mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Conditions générales
          </h1>
          <p className="text-[13px] text-gray-600 leading-7 mb-10">
            Cette page propose une structure générique de conditions générales pour le prototype. Elle devra être complétée et validée avant tout lancement commercial.
          </p>
          <div className="divide-y divide-gray-100">
            {sections.map((title) => (
              <section key={title} className="py-5">
                <h2 className="text-[15px] font-medium tracking-wide mb-2">{title}</h2>
                <p className="text-[13px] text-gray-600 leading-7">
                  Cette section devra être adaptée avec les règles finales de la boutique, les prestataires retenus, les modalités opérationnelles et les informations légales exactes du client.
                </p>
              </section>
            ))}
          </div>
        </article>
      </PageShell>
    </Suspense>
  );
}
