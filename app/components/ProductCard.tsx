"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/app/data/products";
import { useShop } from "@/app/context/ShopContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, cartItems } = useShop();

  const isOutOfStock = product.stockStatus === "Out of Stock";
  const isInCart = cartItems.some((item) => item.product.id === product.id);
  const productHref = `/shop/${product.slug}`;

  return (
    <article
      id={`product-card-${product.id}`}
      className="product-card group flex flex-col cursor-pointer"
    >
      {/* Image container */}
      <div className="relative overflow-hidden bg-gray-50 aspect-[3/4]">
        <Link
          href={productHref}
          aria-label={`Voir ${product.name}`}
          className="absolute inset-0"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="product-card-img object-cover object-top"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-black text-white text-[9px] tracking-[0.15em] uppercase px-2 py-1">
                Nouveau
              </span>
            )}
            {product.stockStatus === "Low Stock" && (
              <span className="bg-white/90 text-black text-[9px] tracking-[0.1em] uppercase px-2 py-1 border border-gray-200">
                Stock limité
              </span>
            )}
            {isOutOfStock && (
              <span className="bg-gray-400 text-white text-[9px] tracking-[0.1em] uppercase px-2 py-1">
                Rupture de stock
              </span>
            )}
          </div>
          {isInCart && (
            <span className="absolute top-2 right-2 bg-white/95 text-black text-[9px] tracking-[0.12em] uppercase px-2 py-1 border border-gray-200">
              Déjà au panier
            </span>
          )}
        </Link>

        {/* Quick add overlay — visible on touch screens, slides up on larger hover devices */}
        {!isOutOfStock && (
          <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
            <button
              type="button"
              id={`ajouter-btn-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              aria-label={`Ajouter rapidement ${product.name} au panier`}
              className="ajouter-btn w-full bg-white/95 border-t border-gray-200 text-black text-[10px] tracking-[0.2em] uppercase py-4 font-medium flex items-center justify-center gap-2 min-h-[52px]"
            >
              <ShoppingBag size={13} strokeWidth={1.5} />
              Ajouter au panier
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="pt-3 pb-1 flex flex-col gap-0.5">
        <p className="text-[11px] text-gray-400 tracking-wide">{product.category}</p>
        <Link href={productHref} className="hover:opacity-70 transition-opacity">
          <h3 className="text-[12px] md:text-[13px] font-medium tracking-wide leading-snug line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-[12px] md:text-[13px] text-gray-700 mt-1">{product.price}</p>
        {isInCart && (
          <p className="text-[10px] tracking-[0.18em] uppercase text-black mt-1">
            Déjà dans le panier
          </p>
        )}

        {/* Color dots */}
        {product.colors.length > 1 && (
          <div className="flex items-center gap-1 mt-1.5">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c}
                title={c}
                className="text-[9px] text-gray-400 tracking-wide"
              >
                {c}
                {product.colors.indexOf(c) < Math.min(product.colors.length, 4) - 1 ? " ·" : ""}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
