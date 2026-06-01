import type { Metadata } from "next";
import { Suspense } from "react";
import PageShell from "@/app/components/PageShell";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Version préparatoire de la politique de confidentialité Prototype à adapter avant lancement selon les outils réellement utilisés.",
};

export default function PrivacyPage() {
  return (
    <Suspense fallback={<div className="h-screen" />}>
      <PageShell>
        <article className="px-4 md:px-8 pb-20 max-w-4xl mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-4">
            Confidentialité
          </p>
          <h1
            className="text-3xl md:text-5xl font-light tracking-wide mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Politique de confidentialité
          </h1>
          <div className="space-y-6 text-[13px] text-gray-600 leading-7">
            <p>
              Cette page est une base de travail pour la future politique de confidentialité de la boutique. Elle ne constitue pas un document juridique final.
            </p>
            <p>
              La version définitive devra préciser les données réellement collectées, les finalités de traitement, les durées de conservation et les droits des utilisateurs.
            </p>
            <p>
              Elle devra aussi être adaptée au prestataire de formulaire de contact, au moyen de paiement, aux outils d’analyse, aux solutions de livraison et à l’identité légale de l’entreprise.
            </p>
            <p>
              Avant lancement, le client devra valider cette politique avec les informations exactes de son activité et, si nécessaire, avec un conseil compétent.
            </p>
          </div>
        </article>
      </PageShell>
    </Suspense>
  );
}
