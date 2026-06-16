import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  getProductBySlug,
  getRelatedProducts,
  mockProducts,
} from "@/app/data/products";
import { brandConfig } from "@/app/data/brand";
import ProductDetailClient from "./ProductDetailClient";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return mockProducts.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produit introuvable",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${brandConfig.brand.name}`,
      description: product.description,
      images: [
        {
          url: product.image,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${brandConfig.brand.name}`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 4);

  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center text-gray-300 text-[11px] tracking-[0.3em] uppercase">
          Chargement...
        </div>
      }
    >
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </Suspense>
  );
}
