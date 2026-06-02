import Link from "next/link";

export default function CategoryBanner() {
  const items = [
    {
      label: "Vestes & Manteaux",
      sub: "Coupes impeccables",
      bg: "bg-gray-100",
      image: "/cat_vestes.png",
      href: "/shop?search=Vestes",
      dark: true,
    },
    {
      label: "Robes",
      sub: "Fluidité et élégance",
      bg: "bg-stone-100",
      image: "/cat_robes.png",
      href: "/shop?category=Robes",
      dark: true,
    },
    {
      label: "Accessoires",
      sub: "Les détails qui font tout",
      bg: "bg-zinc-900",
      image: "/cat_accessoires.png",
      dark: true,
      href: "/shop?category=Accessoires",
    },
  ];

  return (
    <section id="categories" className="px-4 md:px-8 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`relative flex flex-col justify-end p-8 h-64 md:h-80 ${item.bg} group overflow-hidden`}
          >
            {item.image && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </>
            )}
            <div className="relative z-10">
            <p
              className={`text-[10px] tracking-[0.25em] uppercase mb-2 ${
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
              className={`mt-3 text-[10px] tracking-[0.2em] uppercase border-b pb-px w-fit transition-colors ${
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
