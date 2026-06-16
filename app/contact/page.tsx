import type { Metadata } from "next";
import { Suspense } from "react";
import PageShell from "@/app/components/PageShell";
import { brandConfig } from "@/app/data/brand";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez SB LUXURY CASUAL à Abidjan pour une commande, une question produit, une livraison ou un conseil de taille.",
};

const contactItems = [
  { label: "WhatsApp", value: brandConfig.contact.whatsapp },
  { label: "Téléphone", value: brandConfig.contact.phone },
  { label: "Commandes", value: brandConfig.contact.orderReceiverName },
  { label: "Téléphone commandes", value: brandConfig.contact.orderPhone },
  { label: "Email", value: brandConfig.contact.email },
  { label: "Showroom", value: brandConfig.contact.showroom },
  { label: "Horaires", value: brandConfig.contact.openingHours },
];

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="h-screen" />}>
      <PageShell>
        <section className="px-4 md:px-8 pb-20 max-w-5xl mx-auto">
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
            Une question sur une pièce, une commande ou une livraison ? Notre
            équipe vous accompagne en boutique et sur les réseaux officiels de{" "}
            {brandConfig.brand.name}.
          </p>

          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <aside className="border border-gray-100 bg-white p-6">
              <h2 className="text-[13px] font-medium tracking-[0.18em] uppercase mb-5">
                Coordonnées
              </h2>
              <dl className="grid gap-4">
                {contactItems.map((item) => (
                  <div key={item.label}>
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-[13px] leading-6 text-gray-700">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={brandConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-200 px-4 py-3 text-[11px] uppercase tracking-[0.2em] hover:border-black transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={brandConfig.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-200 px-4 py-3 text-[11px] uppercase tracking-[0.2em] hover:border-black transition-colors"
                >
                  Facebook
                </a>
              </div>
            </aside>

            <div>
              <h2 className="sr-only">Formulaire de contact</h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </PageShell>
    </Suspense>
  );
}
