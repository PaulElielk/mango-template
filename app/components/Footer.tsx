export default function Footer() {
  const columns = [
    {
      title: "Aide",
      links: [
        "FAQ",
        "Suivi de commande",
        "Retours & échanges",
        "Livraison",
        "Contact",
      ],
    },
    {
      title: "Société",
      links: [
        "À propos de Prototype",
        "Carrières",
        "Presse",
        "Responsabilité",
        "Politique de confidentialité",
      ],
    },
    {
      title: "Suivez-nous",
      links: ["Instagram", "TikTok", "Pinterest", "YouTube", "Facebook"],
    },
  ];

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
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[12px] text-gray-500 hover:text-black transition-colors tracking-wide"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
            <div className="flex gap-0 flex-1 md:max-w-md">
              <input
                id="newsletter-input"
                type="email"
                placeholder="Votre adresse e-mail"
                className="flex-1 border border-gray-200 px-4 py-3 text-[12px] outline-none focus:border-black transition-colors placeholder:text-gray-400"
              />
              <button
                id="newsletter-btn"
                className="bg-black text-white text-[10px] tracking-[0.2em] uppercase px-6 py-3 hover:bg-gray-900 transition-colors whitespace-nowrap"
              >
                S'inscrire
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-6 border-t border-gray-100">
          <p className="text-[11px] text-gray-400">
            © 2025 Prototype. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[11px] text-gray-400 hover:text-black transition-colors">
              Mentions légales
            </a>
            <a href="#" className="text-[11px] text-gray-400 hover:text-black transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
