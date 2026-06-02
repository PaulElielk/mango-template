"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const columns = [
  {
    title: "Aide",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Livraison & retours", href: "/livraison-retours" },
      { label: "Boutique", href: "/shop" },
    ],
  },
  {
    title: "Société",
    links: [
      { label: "Accueil", href: "/" },
      { label: "Politique de confidentialité", href: "/politique-confidentialite" },
      { label: "Conditions générales", href: "/conditions-generales" },
    ],
  },
];

const socialLinks = ["Instagram", "TikTok", "Pinterest", "YouTube", "Facebook"];

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterError, setNewsletterError] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = newsletterEmail.trim();

    setNewsletterSubmitted(false);

    if (!email) {
      setNewsletterError("Veuillez saisir une adresse e-mail.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterError("Veuillez saisir une adresse e-mail valide.");
      return;
    }

    setNewsletterError("");
    setNewsletterSubmitted(true);
  }

  return (
    <footer id="footer" className="bg-white border-t border-gray-100 pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <p className="logo-text text-lg font-semibold tracking-[0.3em] uppercase mb-4">Prototype</p>
            <p className="text-[12px] text-gray-500 leading-relaxed max-w-[200px]">
              Mode féminine élégante, conçue pour la femme moderne et cosmopolite.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[12px] text-gray-500 hover:text-black transition-colors tracking-wide"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4">Suivez-nous</p>
            <ul className="space-y-2.5">
              {socialLinks.map((link) => (
                <li key={link}>
                  <span className="text-[12px] text-gray-400 tracking-wide" aria-disabled="true">
                    {link} · Bientôt disponible
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-100 pt-10 mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-[13px] font-medium tracking-wide mb-1">Restez informée</p>
              <p className="text-[12px] text-gray-500">
                Inscrivez-vous pour recevoir nos dernières nouveautés et offres exclusives.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} noValidate className="flex-1 md:max-w-md">
              <div className="flex gap-0">
                <label htmlFor="newsletter-input" className="sr-only">
                  Adresse e-mail newsletter
                </label>
                <input
                  id="newsletter-input"
                  type="email"
                  value={newsletterEmail}
                  onChange={(event) => {
                    setNewsletterEmail(event.target.value);
                    setNewsletterError("");
                    setNewsletterSubmitted(false);
                  }}
                  placeholder="Votre adresse e-mail"
                  aria-invalid={Boolean(newsletterError)}
                  aria-describedby={
                    newsletterError || newsletterSubmitted ? "newsletter-feedback" : undefined
                  }
                  className="flex-1 border border-gray-200 px-4 py-3 text-[12px] outline-none focus:border-black transition-colors placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  id="newsletter-btn"
                  className="bg-black text-white text-[10px] tracking-[0.2em] uppercase px-6 py-3 hover:bg-gray-900 transition-colors whitespace-nowrap"
                >
                  S&apos;inscrire
                </button>
              </div>
              {(newsletterError || newsletterSubmitted) && (
                <p
                  id="newsletter-feedback"
                  className={`mt-3 text-[12px] leading-5 ${
                    newsletterError ? "text-red-600" : "text-gray-600"
                  }`}
                  role={newsletterError ? "alert" : "status"}
                >
                  {newsletterError ||
                    "Votre inscription a été préparée. La connexion au service newsletter sera ajoutée lors de la mise en production."}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-6 border-t border-gray-100">
          <p className="text-[11px] text-gray-400">
            © 2026 Prototype. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link href="/conditions-generales" className="text-[11px] text-gray-400 hover:text-black transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="text-[11px] text-gray-400 hover:text-black transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
