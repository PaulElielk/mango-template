import type { Metadata } from "next";
import { Suspense } from "react";
import PageShell from "@/app/components/PageShell";
import { brandConfig } from "@/app/data/brand";

const sections = [
  {
    title: "Zones desservies",
    items: brandConfig.delivery.zones,
  },
  {
    title: "Délais de livraison",
    items: brandConfig.delivery.delays,
    body: brandConfig.delivery.note,
  },
  {
    title: "Frais de livraison",
    body: brandConfig.delivery.fees,
  },
  {
    title: "Modes de paiement",
    items: brandConfig.payments,
    body:
      "Les modalités de paiement sont confirmées avec le client avant la validation définitive de la commande.",
  },
  {
    title: "Suivi de commande",
    body:
      "Une fois la commande confirmée, notre équipe contacte le client afin de confirmer les détails de livraison et d’assurer le suivi jusqu’à la réception.",
  },
  {
    title: "Réception de la commande",
    body:
      "Le client est invité à vérifier l’état du colis à la réception. Toute anomalie doit être signalée immédiatement au livreur ou au service client de SB LUXURY CASUAL.",
  },
  {
    title: "Échec de livraison",
    body:
      "En cas d’informations de livraison incomplètes ou d’absence du destinataire, une nouvelle tentative de livraison pourra être programmée à la charge du client.",
  },
  {
    title: "Échanges",
    body: brandConfig.policies.exchanges,
  },
  {
    title: "Remboursements",
    body: brandConfig.policies.refunds,
  },
  {
    title: "Article endommagé",
    body: brandConfig.policies.damagedItem,
  },
];

export const metadata: Metadata = {
  title: "Livraison & retours",
  description:
    "Informations SB LUXURY CASUAL sur les zones de livraison, délais, frais, paiements, échanges et remboursements.",
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
            className="text-3xl md:text-5xl font-light tracking-wide mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Livraison & retours
          </h1>
          <p className="mb-10 max-w-2xl text-[13px] leading-7 text-gray-600">
            Les informations ci-dessous permettent de préparer une commande avec
            SB LUXURY CASUAL. Les frais, délais et modalités pratiques sont
            confirmés avec le client avant validation.
          </p>
          <div className="grid gap-6">
            {sections.map((section) => (
              <section key={section.title} className="border-t border-gray-100 pt-6">
                <h2 className="text-[15px] font-medium tracking-wide mb-3">
                  {section.title}
                </h2>
                {section.body && (
                  <p className="text-[13px] text-gray-600 leading-7">{section.body}</p>
                )}
                {section.items && (
                  <ul className="grid gap-2 text-[13px] text-gray-600 leading-7">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-3 h-px w-4 shrink-0 bg-gray-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </section>
      </PageShell>
    </Suspense>
  );
}
