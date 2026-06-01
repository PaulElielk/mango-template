"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { mockProducts, Product } from "@/app/data/products";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  cartId: string; // unique key = `${productId}-${size}-${color}`
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

type StoredCartItem = {
  cartId?: unknown;
  productId?: unknown;
  product?: { id?: unknown };
  quantity?: unknown;
  size?: unknown;
  color?: unknown;
};

const CART_STORAGE_KEY = "mango-store-cart";

function buildCartId(productId: number, size: string, color: string) {
  return `${productId}-${size}-${color}`;
}

function sanitizeStoredCart(rawValue: string | null): CartItem[] {
  if (!rawValue) return [];

  try {
    const parsed: unknown = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) return [];

    return parsed.reduce<CartItem[]>((items, rawItem) => {
      const item = rawItem as StoredCartItem;
      const productId =
        typeof item.productId === "number"
          ? item.productId
          : typeof item.product?.id === "number"
            ? item.product.id
            : null;
      const product = mockProducts.find((candidate) => candidate.id === productId);
      const size = typeof item.size === "string" ? item.size : "";
      const color = typeof item.color === "string" ? item.color : "";
      const quantity =
        typeof item.quantity === "number" && Number.isFinite(item.quantity)
          ? Math.floor(item.quantity)
          : 0;

      if (!product || quantity <= 0) return items;
      if (!product.sizes.includes(size) || !product.colors.includes(color)) return items;

      items.push({
        cartId: buildCartId(product.id, size, color),
        product,
        quantity,
        size,
        color,
      });

      return items;
    }, []);
  } catch {
    return [];
  }
}

function serializeCartItems(cartItems: CartItem[]) {
  return JSON.stringify(
    cartItems.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    }))
  );
}

interface ShopContextValue {
  // Cart state
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, size?: string, color?: string) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;

  // UI state
  isCartOpen: boolean;
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  isFilterOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openFilter: () => void;
  closeFilter: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ShopContext = createContext<ShopContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [hasHydratedCart, setHasHydratedCart] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const restoredCartItems = sanitizeStoredCart(
      window.localStorage.getItem(CART_STORAGE_KEY)
    );

    // Hydration from browser storage must happen after mount to keep server HTML stable.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartItems(restoredCartItems);
    setHasHydratedCart(true);
  }, []);

  useEffect(() => {
    if (!hasHydratedCart) return;

    try {
      if (cartItems.length === 0) {
        window.localStorage.removeItem(CART_STORAGE_KEY);
      } else {
        window.localStorage.setItem(CART_STORAGE_KEY, serializeCartItems(cartItems));
      }
    } catch {
      // Storage can be unavailable in private mode; cart still works in memory.
    }
  }, [cartItems, hasHydratedCart]);

  // ── Cart actions ────────────────────────────────────────────────────────────

  const addToCart = useCallback((product: Product, size?: string, color?: string) => {
    const resolvedSize = size ?? product.sizes[0] ?? "Unique";
    const resolvedColor = color ?? product.colors[0] ?? "Unique";
    const cartId = buildCartId(product.id, resolvedSize, resolvedColor);

    setCartItems((prev) => {
      const existing = prev.find((i) => i.cartId === cartId);
      if (existing) {
        return prev.map((i) =>
          i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        { cartId, product, quantity: 1, size: resolvedSize, color: resolvedColor },
      ];
    });

    // Auto-open cart on add
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((cartId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));
  }, []);

  const updateQuantity = useCallback((cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.cartId === cartId ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  // ── Derived ─────────────────────────────────────────────────────────────────

  const cartCount = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.quantity, 0),
    [cartItems]
  );

  const cartTotal = useMemo(
    () =>
      cartItems.reduce((sum, i) => sum + i.product.priceValue * i.quantity, 0),
    [cartItems]
  );

  // ── UI toggles ──────────────────────────────────────────────────────────────

  const openCart = useCallback(() => { setIsCartOpen(true); setIsMenuOpen(false); }, []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const openMenu = useCallback(() => { setIsMenuOpen(true); setIsCartOpen(false); }, []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const openSearch = useCallback(() => { setIsSearchOpen(true); }, []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);
  const openFilter = useCallback(() => setIsFilterOpen(true), []);
  const closeFilter = useCallback(() => setIsFilterOpen(false), []);

  const value: ShopContextValue = {
    cartItems, cartCount, cartTotal,
    addToCart, removeFromCart, updateQuantity, clearCart,
    isCartOpen, isMenuOpen, isSearchOpen, isFilterOpen,
    openCart, closeCart, openMenu, closeMenu,
    openSearch, closeSearch, openFilter, closeFilter,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useShop(): ShopContextValue {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside <ShopProvider>");
  return ctx;
}
