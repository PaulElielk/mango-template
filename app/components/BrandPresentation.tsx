import { brandConfig } from "@/app/data/brand";

export default function BrandPresentation() {
  return (
    <section className="px-4 md:px-8 py-14 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-gray-400">
          Depuis {brandConfig.brand.foundedSince}
        </p>
        <h2
          className="mb-6 text-2xl font-light tracking-wide text-black md:text-4xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {brandConfig.brand.name}
        </h2>
        <p className="mx-auto max-w-3xl text-[14px] leading-8 text-gray-600 md:text-[15px]">
          {brandConfig.brand.fullDescription}
        </p>
      </div>
    </section>
  );
}
