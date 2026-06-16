import type { Metadata } from "next";
import { Suspense } from "react";
import PageShell from "@/app/components/PageShell";
import { brandConfig } from "@/app/data/brand";

const faqs = [
  {
    question: "Comment passer une commande ?",
    answer:
      "Vous pouvez commander directement via WhatsApp, Facebook, Instagram ou en visitant notre boutique.",
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer:
      "Nous acceptons Orange Money, Wave et le paiement à la livraison selon la zone.",
  },
  {
    question: "Livrez-vous partout en Côte d’Ivoire ?",
    answer:
      "Oui, nous livrons à Abidjan ainsi que dans les principales villes de Côte d’Ivoire.",
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer:
      "À Abidjan, la livraison prend généralement 24 à 48 heures ouvrables. À l’intérieur du pays, les délais sont généralement de 2 à 5 jours ouvrables. Pour l’international, les délais varient selon la destination et le transporteur.",
  },
  {
    question: "Quels sont les frais de livraison ?",
    answer:
      "Les frais de livraison varient selon la localité et sont communiqués avant la validation de la commande.",
  },
  {
    question: "Puis-je échanger un article ?",
    answer:
      "Oui, sous réserve que l’article soit retourné dans son état d’origine, non porté et non endommagé.",
  },
  {
    question: "Puis-je me faire rembourser ?",
    answer:
      "Les remboursements sont étudiés au cas par cas. Les articles personnalisés ou portés ne sont ni repris ni remboursés.",
  },
  {
    question: "Comment choisir ma taille ?",
    answer:
      "Notre équipe est disponible pour vous conseiller. Vous pouvez également consulter le guide des tailles avant de commander.",
  },
  {
    question: "Les couleurs des articles sont-elles identiques aux photos ?",
    answer:
      "Nous nous efforçons de présenter les produits le plus fidèlement possible. De légères variations peuvent exister selon l’éclairage ou l’écran utilisé.",
  },
  {
    question: "Comment suivre ma commande ?",
    answer:
      "Après confirmation de votre commande, notre équipe vous informe de l’état de préparation et de l’expédition de votre colis.",
  },
  {
    question: "Proposez-vous des créations personnalisées ?",
    answer:
      "Oui. Certaines chemises, surchemises et pièces exclusives peuvent être personnalisées selon les options disponibles.",
  },
  {
    question: "Où se trouve votre boutique ?",
    answer: "SB LUXURY CASUAL est située à Cocody Riviera Faya, à Abidjan.",
  },
  {
    question: "Comment contacter le service client ?",
    answer:
      "Vous pouvez nous contacter via WhatsApp au 0759207059, Facebook, Instagram ou directement en boutique.",
  },
  {
    question: "Vos articles sont-ils disponibles en plusieurs tailles ?",
    answer:
      "Oui, nos collections sont généralement proposées du M au XL selon les modèles.",
  },
  {
    question: "Que faire si je reçois un article endommagé ?",
    answer:
      "Contactez notre service client dans les 24 heures suivant la réception avec des photos du produit concerné afin que nous puissions vous assister rapidement.",
  },
];

export const metadata: Metadata = {
  title: "FAQ",
  description: `Questions fréquentes sur ${brandConfig.brand.name}, les commandes, les paiements, la livraison, les échanges et le service client.`,
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
