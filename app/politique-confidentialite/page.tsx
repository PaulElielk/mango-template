import type { Metadata } from "next";
import { Suspense } from "react";
import PageShell from "@/app/components/PageShell";
import { brandConfig } from "@/app/data/brand";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Version préparatoire de la politique de confidentialité SB LUXURY CASUAL à adapter avant lancement selon les outils réellement utilisés.",
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
              Cette page est une base de travail pour la future politique de
              confidentialité de {brandConfig.brand.name}. Elle ne constitue pas
              un document juridique final.
            </p>
            <p>
              Dans cette version frontend-only, le formulaire de contact, la
              newsletter et la demande de commande ne transmettent aucune donnée
              à un service réel.
            </p>
            <p>
              La version définitive devra préciser les données réellement
              collectées, les finalités de traitement, les durées de
              conservation, les outils connectés et les droits des utilisateurs.
            </p>
            <p>
              Avant lancement, le client devra valider cette politique avec les
              informations exactes de son activité et, si nécessaire, avec un
              conseil compétent.
            </p>
          </div>
        </article>
      </PageShell>
    </Suspense>
  );
}
