import type { Metadata } from "next";
import { Suspense } from "react";
import PageShell from "@/app/components/PageShell";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Prototype pour une question sur la boutique, les produits, la livraison ou la préparation du projet avant mise en production.",
};

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="h-screen" />}>
      <PageShell>
        <section className="px-4 md:px-8 pb-20 max-w-4xl mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-4">
            Service client
          </p>
          <h1
            className="text-3xl md:text-5xl font-light tracking-wide mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Contact
          </h1>
          <p className="text-[14px] text-gray-600 leading-7 mb-10 max-w-2xl">
            Utilisez ce formulaire pour préparer une demande. L’envoi réel sera connecté au service choisi avant le lancement officiel.
          </p>
          <ContactForm />
        </section>
      </PageShell>
    </Suspense>
  );
}
