"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag, Trash2, CreditCard, CheckCircle } from "lucide-react";
import { useShop } from "@/app/context/ShopContext";
import { formatFCFA } from "@/app/data/products";

// ─── Payment Modal ─────────────────────────────────────────────────────────────

const PAYMENT_METHODS = [
  { id: "card", label: "Carte Bancaire", icon: "💳" },
  { id: "orange", label: "Orange Money", icon: "🟠" },
  { id: "moov", label: "Moov Money", icon: "🔵" },
  { id: "wave", label: "Wave", icon: "🌊" },
];

function PaymentModal({
  total,
  onClose,
  onConfirm,
}: {
  total: number;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [selected, setSelected] = useState("card");
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      onConfirm();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-sm rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl z-10">
        {confirmed ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mb-6 animate-[scale-in_0.4s_ease]">
              <CheckCircle className="text-white" size={32} />
            </div>
            <h3 className="text-lg font-medium tracking-wide mb-2">Commande confirmée!</h3>
            <p className="text-[13px] text-gray-500">
              Vous recevrez une confirmation par SMS.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h3 className="text-[13px] font-semibold tracking-[0.1em] uppercase">
                Choisir un mode de paiement
              </h3>
              <button onClick={onClose} className="p-1 hover:opacity-60 transition-opacity">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-3">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelected(m.id)}
                  className={`w-full flex items-center gap-4 p-4 border rounded-lg text-left transition-all ${
                    selected === m.id
                      ? "border-black bg-black/[0.03]"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <span className="text-2xl">{m.icon}</span>
                  <span className="text-[13px] font-medium tracking-wide">{m.label}</span>
                  {selected === m.id && (
                    <div className="ml-auto w-4 h-4 rounded-full bg-black flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="px-6 pb-6">
              <div className="flex justify-between text-[13px] mb-5">
                <span className="text-gray-500">Total à payer</span>
                <span className="font-semibold">{formatFCFA(total)}</span>
              </div>
              <button
                onClick={handleConfirm}
                className="w-full bg-black text-white text-[11px] tracking-[0.25em] uppercase py-4 hover:bg-gray-900 transition-colors"
              >
                Confirmer le paiement
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Cart Drawer ───────────────────────────────────────────────────────────────

export default function CartDrawer() {
  const { isCartOpen, closeCart, cartItems, cartTotal, cartCount, removeFromCart, updateQuantity, clearCart } =
    useShop();
  const [showPayment, setShowPayment] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isCartOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isCartOpen, closeCart]);

  // Body scroll lock
  useEffect(() => {
    if (isCartOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen]);

  const handlePaymentConfirm = () => {
    setShowPayment(false);
    clearCart();
    closeCart();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        id="cart-backdrop"
        onClick={closeCart}
        className={`fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        id="cart-drawer"
        className={`fixed top-0 right-0 h-full z-[95] bg-white flex flex-col shadow-2xl
          w-full sm:w-[420px] max-w-full
          transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
          ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span className="text-[12px] tracking-[0.2em] uppercase font-semibold">
              Panier
            </span>
            {cartCount > 0 && (
              <span className="bg-black text-white text-[10px] font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <button
            id="cart-close-btn"
            onClick={closeCart}
            aria-label="Fermer le panier"
            className="p-2 hover:opacity-60 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <ShoppingBag size={48} strokeWidth={1} className="text-gray-200" />
              <p className="text-[13px] text-gray-500 tracking-wide">
                Votre panier est vide.
              </p>
              <button
                onClick={closeCart}
                className="border border-black text-black text-[10px] tracking-[0.2em] uppercase px-8 py-3 hover:bg-black hover:text-white transition-all duration-300 min-h-[44px]"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <li key={item.cartId} className="flex gap-4 px-5 py-5">
                  {/* Image */}
                  <div className="relative w-20 h-28 bg-gray-50 shrink-0 overflow-hidden">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover object-top"
                      sizes="80px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <p className="text-[10px] text-gray-400 tracking-wide mb-0.5">
                        {item.product.category}
                      </p>
                      <p className="text-[13px] font-medium leading-snug truncate">
                        {item.product.name}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-1 tracking-wide">
                        {item.size} · {item.color}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      {/* Qty adjuster */}
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.cartId, -1)}
                          aria-label="Diminuer"
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Minus size={12} strokeWidth={1.5} />
                        </button>
                        <span className="w-8 text-center text-[12px]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartId, 1)}
                          aria-label="Augmenter"
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={12} strokeWidth={1.5} />
                        </button>
                      </div>
                      <p className="text-[13px] font-medium">{item.product.price}</p>
                    </div>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removeFromCart(item.cartId)}
                    aria-label="Supprimer"
                    className="self-start p-2 hover:opacity-60 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    <Trash2 size={14} strokeWidth={1.5} className="text-gray-400" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="shrink-0 border-t border-gray-100 px-5 py-5 space-y-4">
            <div className="flex justify-between text-[13px]">
              <span className="text-gray-500">Sous-total</span>
              <span className="font-semibold">{formatFCFA(cartTotal)}</span>
            </div>
            <p className="text-[10px] text-gray-400 tracking-wide">
              Livraison gratuite à partir de 50 000 FCFA
            </p>
            <button
              id="checkout-btn"
              onClick={() => setShowPayment(true)}
              className="w-full bg-black text-white text-[11px] tracking-[0.25em] uppercase py-4 hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 min-h-[52px]"
            >
              <CreditCard size={14} strokeWidth={1.5} />
              Paiement
            </button>
          </div>
        )}
      </div>

      {/* Payment modal */}
      {showPayment && (
        <PaymentModal
          total={cartTotal}
          onClose={() => setShowPayment(false)}
          onConfirm={handlePaymentConfirm}
        />
      )}
    </>
  );
}
