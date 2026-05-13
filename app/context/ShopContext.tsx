"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { Product } from "@/app/data/products";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  cartId: string; // unique key = `${productId}-${size}-${color}`
  product: Product;
  quantity: number;
  size: string;
  color: string;
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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // ── Cart actions ────────────────────────────────────────────────────────────

  const addToCart = useCallback((product: Product, size?: string, color?: string) => {
    const resolvedSize = size ?? product.sizes[0] ?? "Unique";
    const resolvedColor = color ?? product.colors[0] ?? "Unique";
    const cartId = `${product.id}-${resolvedSize}-${resolvedColor}`;

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
      cartItems.reduce((sum, i) => {
        // price is stored as "45 000 FCFA" — strip non-digit chars except space
        const numericStr = i.product.price.replace(/[^\d]/g, "");
        return sum + parseInt(numericStr || "0", 10) * i.quantity;
      }, 0),
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
