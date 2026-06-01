import type { Metadata } from "next";
import { Suspense } from "react";
import PageShell from "@/app/components/PageShell";

const faqs = [
  {
    question: "Comment passer une commande ?",
    answer:
      "Ajoutez les articles souhaités au panier, choisissez les variantes disponibles, puis préparez une demande de commande. L’envoi réel sera connecté lors de la mise en production.",
  },
  {
    question: "Les paiements sont-ils déjà activés ?",
    answer:
      "Non. La boutique prépare uniquement une demande de commande. Le paiement réel sera confirmé après contact avec la boutique lors de la version de production.",
  },
  {
    question: "Quels moyens de paiement seront disponibles ?",
    answer:
      "La maquette prévoit carte bancaire et solutions de mobile money. La liste finale dépendra des prestataires activés avant lancement.",
  },
  {
    question: "Comment suivre ma commande ?",
    answer:
      "Le suivi de commande sera défini avec le futur système de gestion des commandes et de livraison.",
  },
  {
    question: "Puis-je modifier ou annuler une commande ?",
    answer:
      "Les règles de modification et d’annulation devront être précisées dans les conditions finales de vente avant la mise en ligne.",
  },
  {
    question: "Comment contacter le service client ?",
    answer:
      "La page Contact permet de préparer une demande. Le service d’envoi réel sera ajouté lors de la mise en production.",
  },
  {
    question: "Les articles affichés sont-ils disponibles ?",
    answer:
      "Les articles visibles appartiennent au catalogue de démonstration. Les statuts de stock devront être reliés à l’inventaire réel avant lancement.",
  },
  {
    question: "Comment fonctionnent les tailles ?",
    answer:
      "Les tailles affichées sont indicatives pour la maquette. Un guide des tailles final pourra être ajouté selon les produits réellement vendus.",
  },
];

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Questions fréquentes sur la boutique Prototype, les demandes de commande, les paiements à confirmer, la livraison et le service client.",
};

export default function FaqPage() {
  return (
    <Suspense fallback={<div className="h-screen" />}>
      <PageShell>
        <section className="px-4 md:px-8 pb-20 max-w-4xl mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-4">
            Aide
          </p>
          <h1
            className="text-3xl md:text-5xl font-light tracking-wide mb-10"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Questions fréquentes
          </h1>
          <div className="divide-y divide-gray-100">
            {faqs.map((item) => (
              <section key={item.question} className="py-6">
                <h2 className="text-[15px] font-medium tracking-wide mb-3">
                  {item.question}
                </h2>
                <p className="text-[13px] text-gray-600 leading-7">{item.answer}</p>
              </section>
            ))}
          </div>
        </section>
      </PageShell>
    </Suspense>
  );
}
