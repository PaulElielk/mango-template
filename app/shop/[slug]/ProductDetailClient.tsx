"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/Footer";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";
import BackToTop from "@/app/components/BackToTop";
import ProductCard from "@/app/components/ProductCard";
import { useShop } from "@/app/context/ShopContext";
import { Product } from "@/app/data/products";

type ProductDetailClientProps = {
  product: Product;
  relatedProducts: Product[];
};

const stockLabels: Record<Product["stockStatus"], string> = {
  "In Stock": "En stock",
  "Low Stock": "Stock limité",
  "Out of Stock": "Rupture de stock",
};

function normalizeOption(value: string | null | undefined) {
  return value?.trim() || "Unique";
}

function uniqueOptions(values: string[]) {
  return Array.from(new Set(values));
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const { addToCart, cartItems } = useShop();
  const hasVariants = Boolean(product.variants?.length);
  const initialAvailableVariants =
    product.variants?.filter((variant) => variant.stockQuantity > 0) ?? [];
  const initialSizes = hasVariants
    ? uniqueOptions(
        (initialAvailableVariants.length > 0
          ? initialAvailableVariants
          : product.variants ?? []
        ).map((variant) => normalizeOption(variant.size))
      )
    : product.sizes;
  const initialColors = hasVariants
    ? uniqueOptions(
        (initialAvailableVariants.length > 0
          ? initialAvailableVariants
          : product.variants ?? []
        ).map((variant) => normalizeOption(variant.color))
      )
    : product.colors;
  const gallery = useMemo(
    () => [product.image, ...product.secondaryImages],
    [product.image, product.secondaryImages]
  );
  const [selectedImage, setSelectedImage] = useState(gallery[0]);
  const [selectedSize, setSelectedSize] = useState(
    initialSizes.length === 1 ? initialSizes[0] : ""
  );
  const [selectedColor, setSelectedColor] = useState(
    initialColors.length === 1 ? initialColors[0] : ""
  );
  const [selectionMessage, setSelectionMessage] = useState("");

  const isOutOfStock = product.stockStatus === "Out of Stock";
  const visibleColors = useMemo(() => {
    if (!hasVariants) return product.colors;

    return uniqueOptions(
      (product.variants ?? []).map((variant) => normalizeOption(variant.color))
    );
  }, [hasVariants, product.colors, product.variants]);
  const visibleSizes = useMemo(() => {
    if (!hasVariants) return product.sizes;

    const variantsForColor = selectedColor
      ? (product.variants ?? []).filter(
          (variant) => normalizeOption(variant.color) === selectedColor
        )
      : product.variants ?? [];

    return uniqueOptions(
      variantsForColor.map((variant) => normalizeOption(variant.size))
    );
  }, [hasVariants, product.sizes, product.variants, selectedColor]);
  const selectedVariant = useMemo(() => {
    if (!hasVariants || !selectedSize || !selectedColor) return null;

    return (
      product.variants?.find(
        (variant) =>
          normalizeOption(variant.size) === selectedSize &&
          normalizeOption(variant.color) === selectedColor &&
          variant.stockQuantity > 0
      ) ?? null
    );
  }, [hasVariants, product.variants, selectedColor, selectedSize]);
  const productCartQuantity = cartItems
    .filter((item) => item.product.id === product.id)
    .reduce((sum, item) => sum + item.quantity, 0);
  const selectedVariantInCart = cartItems.some(
    (item) =>
      item.product.id === product.id &&
      item.size === selectedSize &&
      item.color === selectedColor
  );

  function handleAddToCart() {
    if (!selectedSize || !selectedColor) {
      setSelectionMessage(
        "Veuillez sélectionner une taille et une couleur."
      );
      return;
    }

    if (hasVariants && !selectedVariant) {
      setSelectionMessage("Cette combinaison n'est pas disponible.");
      return;
    }

    setSelectionMessage("");
    addToCart(product, selectedSize, selectedColor);
  }

  function colorHasStock(color: string) {
    if (!hasVariants) return true;

    return Boolean(
      product.variants?.some(
        (variant) =>
          normalizeOption(variant.color) === color && variant.stockQuantity > 0
      )
    );
  }

  function sizeHasStock(size: string) {
    if (!hasVariants) return true;

    return Boolean(
      product.variants?.some(
        (variant) =>
          normalizeOption(variant.size) === size &&
          (!selectedColor || normalizeOption(variant.color) === selectedColor) &&
          variant.stockQuantity > 0
      )
    );
  }

  return (
    <>
      <Header />
      <SearchOverlay />
      <CartDrawer />
      <Sidebar />

      <main className="pt-24 md:pt-28">
        <nav
          aria-label="Fil d'Ariane"
          className="px-4 md:px-8 pb-6 text-[11px] tracking-wide text-gray-400"
        >
          <Link href="/" className="hover:text-black transition-colors">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-black transition-colors">
            Boutique
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black">{product.name}</span>
        </nav>

        <section className="px-4 md:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] gap-10 lg:gap-16">
            <div className="space-y-3">
              <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>

              {gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {gallery.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(image)}
                      aria-label={`Afficher l'image ${index + 1} de ${product.name}`}
                      className={`relative aspect-[3/4] overflow-hidden bg-gray-50 border transition-colors ${
                        selectedImage === image ? "border-black" : "border-transparent"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover object-top"
                        sizes="25vw"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <section className="lg:sticky lg:top-28 h-fit">
              <p className="text-[11px] text-gray-400 tracking-[0.2em] uppercase mb-3">
                {product.category}
              </p>
              <h1
                className="text-3xl md:text-4xl font-light tracking-wide mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {product.name}
              </h1>
              <p className="text-[15px] tracking-wide mb-5">{product.price}</p>
              <p
                className={`text-[11px] tracking-[0.18em] uppercase mb-8 ${
                  isOutOfStock ? "text-gray-400" : "text-black"
                }`}
              >
                {stockLabels[product.stockStatus]}
              </p>
              {productCartQuantity > 0 && (
                <p className="text-[11px] tracking-[0.16em] uppercase border border-gray-200 px-4 py-3 mb-8">
                  Déjà dans le panier ({productCartQuantity})
                </p>
              )}

              <p className="text-[14px] text-gray-600 leading-7 mb-10">
                {product.description}
              </p>

              <div className="space-y-8">
                <p className="text-[12px] text-gray-500 leading-5">
                  Choisissez une couleur et une taille avant ajout au panier.
                </p>

                <fieldset>
                  <legend className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-3">
                    Couleur
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {visibleColors.map((color) => {
                      const isDisabled = isOutOfStock || !colorHasStock(color);

                      return (
                        <button
                          key={color}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => {
                            setSelectedColor(color);
                            if (selectedSize) {
                              const nextSizeIsAvailable = product.variants?.some(
                                (variant) =>
                                  normalizeOption(variant.color) === color &&
                                  normalizeOption(variant.size) === selectedSize &&
                                  variant.stockQuantity > 0
                              );

                              if (hasVariants && !nextSizeIsAvailable) {
                                setSelectedSize("");
                              }
                            }
                            setSelectionMessage("");
                          }}
                          aria-pressed={selectedColor === color}
                          aria-disabled={isDisabled}
                          className={`px-4 py-2.5 text-[12px] tracking-wide border transition-all min-h-[44px] disabled:cursor-not-allowed ${
                            selectedColor === color
                              ? "bg-black text-white border-black"
                              : isDisabled
                                ? "border-gray-100 text-gray-300 line-through"
                                : "border-gray-200 hover:border-black"
                          }`}
                        >
                          {color}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-3">
                    Taille
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {visibleSizes.map((size) => {
                      const isDisabled = isOutOfStock || !sizeHasStock(size);

                      return (
                        <button
                          key={size}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => {
                            setSelectedSize(size);
                            setSelectionMessage("");
                          }}
                          aria-pressed={selectedSize === size}
                          aria-disabled={isDisabled}
                          className={`w-12 h-12 flex items-center justify-center text-[12px] font-medium border transition-all disabled:cursor-not-allowed ${
                            selectedSize === size
                              ? "bg-black text-white border-black"
                              : isDisabled
                                ? "border-gray-100 text-gray-300 line-through"
                                : "border-gray-200 hover:border-black"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {selectionMessage && (
                  <p className="text-[12px] text-gray-500 leading-5" role="status">
                    {selectionMessage}
                  </p>
                )}
                {!selectionMessage && selectedVariantInCart && (
                  <p className="text-[12px] text-gray-500 leading-5" role="status">
                    Cette variante est déjà dans votre panier.
                  </p>
                )}
                {!selectionMessage &&
                  !selectedVariantInCart &&
                  productCartQuantity > 0 && (
                    <p className="text-[12px] text-gray-500 leading-5" role="status">
                      Cet article est déjà dans votre panier dans une autre variante.
                    </p>
                  )}

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="w-full bg-black text-white text-[11px] tracking-[0.25em] uppercase py-4 hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 min-h-[52px] disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  <ShoppingBag size={14} strokeWidth={1.5} />
                  {isOutOfStock
                    ? "Rupture de stock"
                    : selectedVariantInCart
                      ? "Ajouter encore"
                      : "Ajouter au panier"}
                </button>
              </div>
            </section>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="px-4 md:px-8 pb-20">
            <div className="flex items-end justify-between mb-8">
              <h2
                className="text-2xl md:text-3xl font-light tracking-wide"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Vous aimerez aussi
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-4 gap-y-8 md:gap-y-10">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
