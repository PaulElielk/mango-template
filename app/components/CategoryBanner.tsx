import Link from "next/link";

export default function CategoryBanner() {
  const items = [
    {
      label: "Chemises",
      sub: "Lignes nettes",
      bg: "bg-gray-100",
      image: "/products/chemise-akeikoi-a-bloc-couleur-1.jpeg",
      imageAlt: "Chemise SB LUXURY CASUAL",
      href: "/shop?search=Chemises",
      dark: true,
    },
    {
      label: "Surchemises",
      sub: "Élégance décontractée",
      bg: "bg-stone-100",
      image: "/products/surchemise-adingra-vert-kaki-3.png",
      imageAlt: "Surchemise SB LUXURY CASUAL",
      href: "/shop?search=Surchemises",
      dark: true,
    },
    {
      label: "Pantalons",
      sub: "Coupes affirmées",
      bg: "bg-zinc-900",
      image: "/products/surchemise-adingra-noire-1.jpeg",
      imageAlt: "Tenue SB LUXURY CASUAL avec pantalon",
      dark: true,
      href: "/shop?search=Pantalons",
    },
  ];

  return (
    <section id="categories" className="px-4 md:px-8 pb-12">
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-gray-400">
            Sélection
          </p>
          <h2
            className="text-2xl font-light tracking-wide md:text-3xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Nouveautés et essentiels
          </h2>
        </div>
        <Link
          href="/shop"
          className="w-fit text-[10px] uppercase tracking-[0.22em] text-gray-500 border-b border-gray-300 pb-1 hover:text-black hover:border-black transition-colors"
        >
          Voir la boutique
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`relative flex h-64 flex-col justify-end overflow-hidden p-8 md:h-80 ${item.bg} group`}
          >
            {item.image && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </>
            )}
            <div className="relative z-10">
              <p
                className={`mb-2 text-[10px] uppercase tracking-[0.25em] ${
                  item.dark ? "text-white/60" : "text-black/50"
                }`}
              >
                {item.sub}
              </p>
              <h3
                className={`text-xl font-light tracking-wide ${
                  item.dark ? "text-white" : "text-black"
                }`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {item.label}
              </h3>
              <span
                className={`mt-3 block w-fit border-b pb-px text-[10px] uppercase tracking-[0.2em] transition-colors ${
                  item.dark
                    ? "text-white border-white/50 group-hover:border-white"
                    : "text-black border-black/40 group-hover:border-black"
                }`}
              >
                Découvrir
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
