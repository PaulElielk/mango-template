import type { Metadata } from "next";
import { Suspense } from "react";
import PageShell from "@/app/components/PageShell";
import { brandConfig } from "@/app/data/brand";

const sections = [
  {
    title: "Présentation des produits",
    body:
      "Les produits présentés sur ce site constituent une base de boutique frontend. Le catalogue définitif, les tailles, couleurs et disponibilités seront confirmés par SB LUXURY CASUAL.",
  },
  {
    title: "Processus de commande",
    body:
      "Toute commande préparée depuis le site est une demande. Elle doit être confirmée manuellement avec l’équipe SB LUXURY CASUAL avant validation définitive.",
  },
  {
    title: "Prix et devise",
    body:
      "Les prix sont affichés en FCFA. Les montants définitifs seront confirmés avec le client avant la validation de la commande.",
  },
  {
    title: "Paiement",
    body:
      "Les paiements peuvent être confirmés selon les moyens retenus par la boutique, notamment Orange Money, Wave, paiement en espèces à la livraison selon la zone, ou virement bancaire. Aucun paiement en ligne réel n’est activé dans cette version.",
  },
  {
    title: "Livraison",
    body:
      "Les frais de livraison et les modalités pratiques sont confirmés lors de la validation de la commande, selon la destination et les conditions logistiques.",
  },
  {
    title: "Retours et échanges",
    body: `${brandConfig.policies.exchanges} ${brandConfig.policies.refunds}`,
  },
  {
    title: "Responsabilité",
    body:
      "Cette page reste une base préparatoire. Les informations finales devront être adaptées aux règles commerciales, outils réellement connectés et obligations applicables avant publication.",
  },
  {
    title: "Adaptation juridique finale",
    body:
      "Avant lancement, les conditions générales devront être complétées avec les informations exactes de l’activité et validées par le client ou un conseil compétent.",
  },
];

export const metadata: Metadata = {
  title: "Conditions générales",
  description:
    "Base préparatoire de conditions générales pour SB LUXURY CASUAL, à adapter juridiquement avant lancement.",
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
            Cette page propose une structure générique de conditions générales
            pour {brandConfig.brand.name}. Elle devra être complétée et validée
            avant tout lancement commercial.
          </p>
          <div className="divide-y divide-gray-100">
            {sections.map((section) => (
              <section key={section.title} className="py-5">
                <h2 className="text-[15px] font-medium tracking-wide mb-2">
                  {section.title}
                </h2>
                <p className="text-[13px] text-gray-600 leading-7">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </article>
      </PageShell>
    </Suspense>
  );
}
