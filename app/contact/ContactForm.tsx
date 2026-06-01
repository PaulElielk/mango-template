"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4" aria-label="Formulaire de contact">
      <div className="grid md:grid-cols-2 gap-4">
        <label className="grid gap-2 text-[11px] tracking-[0.18em] uppercase">
          Nom
          <input
            required
            name="name"
            autoComplete="name"
            className="border border-gray-200 px-4 py-3 text-[13px] tracking-wide normal-case outline-none focus:border-black"
          />
        </label>
        <label className="grid gap-2 text-[11px] tracking-[0.18em] uppercase">
          Email
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="border border-gray-200 px-4 py-3 text-[13px] tracking-wide normal-case outline-none focus:border-black"
          />
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <label className="grid gap-2 text-[11px] tracking-[0.18em] uppercase">
          Téléphone
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className="border border-gray-200 px-4 py-3 text-[13px] tracking-wide normal-case outline-none focus:border-black"
          />
        </label>
        <label className="grid gap-2 text-[11px] tracking-[0.18em] uppercase">
          Sujet
          <input
            required
            name="subject"
            className="border border-gray-200 px-4 py-3 text-[13px] tracking-wide normal-case outline-none focus:border-black"
          />
        </label>
      </div>

      <label className="grid gap-2 text-[11px] tracking-[0.18em] uppercase">
        Message
        <textarea
          required
          name="message"
          rows={6}
          className="border border-gray-200 px-4 py-3 text-[13px] tracking-wide normal-case outline-none focus:border-black resize-none"
        />
      </label>

      {submitted && (
        <p className="text-[13px] text-gray-600 leading-6" role="status">
          Votre message a bien été préparé. La connexion au service d’envoi sera ajoutée lors de la mise en production.
        </p>
      )}

      <button
        type="submit"
        className="w-full md:w-fit bg-black text-white text-[11px] tracking-[0.25em] uppercase px-10 py-4 hover:bg-gray-900 transition-colors min-h-[52px]"
      >
        Préparer le message
      </button>
    </form>
  );
}
