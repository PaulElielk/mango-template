import type { Metadata } from "next";
import { Suspense } from "react";
import PageShell from "@/app/components/PageShell";

const sections = [
  {
    title: "Livraison",
    body: "Les options de livraison définitives seront précisées avant la mise en production selon les zones desservies, les partenaires retenus et les contraintes opérationnelles.",
  },
  {
    title: "Délais indicatifs",
    body: "Les délais affichés dans la future boutique devront être confirmés avec le prestataire logistique. Cette page sert de base éditoriale adaptable.",
  },
  {
    title: "Retours et échanges",
    body: "Une procédure claire de retour et d’échange devra être validée avant le lancement, avec les conditions, délais et justificatifs nécessaires.",
  },
  {
    title: "Articles non éligibles",
    body: "Certains articles peuvent être exclus des retours pour des raisons d’hygiène, de personnalisation ou d’état du produit. La liste finale devra être confirmée.",
  },
  {
    title: "Réserves importantes",
    body: "Les informations de cette page sont génériques. Elles devront être adaptées aux règles commerciales et obligations applicables au client avant publication.",
  },
];

export const metadata: Metadata = {
  title: "Livraison et retours",
  description:
    "Informations générales et adaptables sur la livraison, les délais, les retours et les échanges pour la boutique Prototype.",
};

export default function ShippingReturnsPage() {
  return (
    <Suspense fallback={<div className="h-screen" />}>
      <PageShell>
        <section className="px-4 md:px-8 pb-20 max-w-4xl mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-4">
            Service
          </p>
          <h1
            className="text-3xl md:text-5xl font-light tracking-wide mb-10"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Livraison et retours
          </h1>
          <div className="grid gap-6">
            {sections.map((section) => (
              <section key={section.title} className="border-t border-gray-100 pt-6">
                <h2 className="text-[15px] font-medium tracking-wide mb-3">
                  {section.title}
                </h2>
                <p className="text-[13px] text-gray-600 leading-7">{section.body}</p>
              </section>
            ))}
          </div>
        </section>
      </PageShell>
    </Suspense>
  );
}
