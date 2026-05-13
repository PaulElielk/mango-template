export default function CategoryBanner() {
  const items = [
    {
      label: "Vestes & Manteaux",
      sub: "Coupes impeccables",
      bg: "bg-gray-100",
      href: "/shop?search=Vestes",
    },
    {
      label: "Robes",
      sub: "Fluidité et élégance",
      bg: "bg-stone-100",
      href: "/shop?category=Robes",
    },
    {
      label: "Accessoires",
      sub: "Les détails qui font tout",
      bg: "bg-zinc-900",
      dark: true,
      href: "/shop?category=Accessoires",
    },
  ];

  return (
    <section id="categories" className="px-4 md:px-8 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`relative flex flex-col justify-end p-8 h-64 md:h-80 ${item.bg} group overflow-hidden hover:opacity-90 transition-opacity`}
          >
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
          </a>
        ))}
      </div>
    </section>
  );
}
