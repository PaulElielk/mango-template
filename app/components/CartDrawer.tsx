"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ClipboardList,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { useShop, type CartItem } from "@/app/context/ShopContext";
import { brandConfig } from "@/app/data/brand";
import { formatFCFA } from "@/app/data/products";

const CONTACT_METHODS = ["WhatsApp", "Appel", "Email"];
const DELIVERY_OPTIONS = ["Retrait en boutique", "Livraison à domicile"];
const PAYMENT_INTENTS = brandConfig.payments;
const ORDER_SUBMIT_ERROR =
  "Impossible d'envoyer la demande pour le moment. Veuillez réessayer ou nous contacter directement par WhatsApp.";
const WHATSAPP_CONFIRMATION_DISPLAY = "+225 0101905020";
const WHATSAPP_CONFIRMATION_NUMBER = "2250101905020";

type OrderRequestForm = {
  fullName: string;
  phone: string;
  email: string;
  website: string;
  city: string;
  address: string;
  contactMethod: string;
  deliveryOption: string;
  paymentIntent: string;
  note: string;
};

type OrderRequestErrors = Partial<Record<keyof OrderRequestForm, string>>;

const initialOrderRequestForm: OrderRequestForm = {
  fullName: "",
  phone: "",
  email: "",
  website: "",
  city: "",
  address: "",
  contactMethod: CONTACT_METHODS[0],
  deliveryOption: DELIVERY_OPTIONS[0],
  paymentIntent: PAYMENT_INTENTS[0],
  note: "",
};

function validateOrderRequest(form: OrderRequestForm) {
  const errors: OrderRequestErrors = {};

  if (!form.fullName.trim()) errors.fullName = "Le nom complet est requis.";
  if (!form.phone.trim()) errors.phone = "Le téléphone est requis.";
  if (!form.city.trim()) errors.city = "La ville ou commune est requise.";
  if (!form.address.trim()) {
    errors.address = "L’adresse ou l’indication de livraison est requise.";
  }
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Veuillez saisir une adresse e-mail valide.";
  }

  return errors;
}

function buildWhatsAppConfirmationUrl({
  form,
  items,
  orderNumber,
  total,
}: {
  form: OrderRequestForm;
  items: CartItem[];
  orderNumber: string;
  total: number;
}) {
  const deliveryLines = [
    `Livraison : ${form.city.trim()}`,
    form.address.trim() ? `Adresse : ${form.address.trim()}` : "",
    form.paymentIntent.trim()
      ? `Mode de paiement souhaité : ${form.paymentIntent.trim()}`
      : "",
  ].filter(Boolean);

  const itemLines = items.map((item) => {
    const itemTotal = formatFCFA(item.product.priceValue * item.quantity);

    return `- ${item.product.name} | Qté ${item.quantity} | Taille ${item.size} | Couleur ${item.color} | ${itemTotal}`;
  });

  const message = [
    "Bonjour SB LUXURY CASUAL, je viens de passer une demande de commande sur le site.",
    `Numéro de commande : ${orderNumber}`,
    `Nom : ${form.fullName.trim()}`,
    `Téléphone : ${form.phone.trim()}`,
    ...deliveryLines,
    "Articles :",
    ...itemLines,
    `Total : ${formatFCFA(total)}`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_CONFIRMATION_NUMBER}?text=${encodeURIComponent(message)}`;
}

function OrderRequestModal({
  items,
  total,
  onClose,
  onFinish,
  onOrderSaved,
}: {
  items: CartItem[];
  total: number;
  onClose: () => void;
  onFinish: () => void;
  onOrderSaved: () => void;
}) {
  const [form, setForm] = useState<OrderRequestForm>(initialOrderRequestForm);
  const [errors, setErrors] = useState<OrderRequestErrors>({});
  const [orderReference, setOrderReference] = useState<string | null>(null);
  const [whatsappConfirmationUrl, setWhatsappConfirmationUrl] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isConfirmed = orderReference !== null;

  const handleChange =
    (field: keyof OrderRequestForm) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
      setSubmitError("");
    };

  const handleChoice = (field: keyof OrderRequestForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setSubmitError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateOrderRequest(form);
    setErrors(nextErrors);
    setSubmitError("");

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            fullName: form.fullName,
            phone: form.phone,
            email: form.email,
            city: form.city,
            address: form.address,
          },
          contactMethod: form.contactMethod,
          deliveryMethod: form.deliveryOption,
          deliveryZone: form.city,
          deliveryAddress: form.address,
          paymentMethod: form.paymentIntent,
          notes: form.note,
          website: form.website,
          totalAmount: total,
          items: items.map((item) => {
            const selectedVariant = item.product.variants?.find(
              (variant) =>
                (variant.size ?? "Unique") === item.size &&
                (variant.color ?? "Unique") === item.color
            );

            return {
              productId: item.product.id,
              productVariantId: selectedVariant?.id ?? null,
              productName: item.product.name,
              size: item.size,
              color: item.color,
              quantity: item.quantity,
              unitPrice: item.product.priceValue,
              totalPrice: item.product.priceValue * item.quantity,
            };
          }),
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        orderNumber?: string;
        message?: string;
      };

      if (!response.ok || !result.success || !result.orderNumber) {
        setSubmitError(result.message ?? ORDER_SUBMIT_ERROR);
        return;
      }

      setWhatsappConfirmationUrl(
        buildWhatsAppConfirmationUrl({
          form,
          items,
          orderNumber: result.orderNumber,
          total,
        })
      );
      setOrderReference(result.orderNumber);
      onOrderSaved();
    } catch {
      setSubmitError(ORDER_SUBMIT_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isConfirmed) onClose();
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isConfirmed, onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={isConfirmed ? undefined : onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-request-title"
        className="relative bg-white w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[90vh] rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col"
      >
        {isConfirmed ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mb-6 animate-[scale-in_0.4s_ease]">
              <CheckCircle className="text-white" size={32} />
            </div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-3">
              Demande préparée
            </p>
            <h3 id="order-request-title" className="text-lg font-medium tracking-wide mb-2">
              {orderReference}
            </h3>
            <p className="text-[13px] text-gray-500 leading-6 max-w-md">
              Votre demande de commande a bien été envoyée. L’équipe SB LUXURY CASUAL vous contactera pour confirmer les détails de livraison et de paiement.
            </p>
            <p className="mt-4 text-[12px] text-gray-500 leading-6 max-w-md">
              Commandes : {brandConfig.contact.orderReceiverName} · Contact :{" "}
              {brandConfig.contact.orderPhone}
            </p>
            {whatsappConfirmationUrl && (
              <div className="mt-6 flex flex-col items-center gap-3">
                <a
                  href={whatsappConfirmationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-black text-[11px] tracking-[0.18em] uppercase px-6 py-4 hover:brightness-95 transition min-h-[52px]"
                >
                  <MessageCircle size={15} strokeWidth={1.7} />
                  Confirmer sur WhatsApp
                </a>
                <p className="text-[11px] text-gray-400 leading-5">
                  Message préparé vers {WHATSAPP_CONFIRMATION_DISPLAY}.
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={onFinish}
              className="mt-8 bg-black text-white text-[11px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-gray-900 transition-colors min-h-[52px]"
            >
              Terminer
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-5 sm:px-6 py-5 border-b border-gray-100 shrink-0">
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-1">
                  {brandConfig.brand.name}
                </p>
                <h3
                  id="order-request-title"
                  className="text-[13px] font-semibold tracking-[0.1em] uppercase"
                >
                  Demande de commande
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer la demande de commande"
                className="p-1 hover:opacity-60 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate className="min-h-0 overflow-y-auto">
              <div className="px-5 sm:px-6 py-5 border-b border-gray-100">
                <p className="text-[12px] leading-6 text-gray-500">
                  Votre demande de commande sera préparée puis confirmée par l’équipe SB LUXURY CASUAL.
                  Les frais de livraison et les modalités de paiement sont confirmés après validation de la commande.
                </p>
                <p className="mt-3 text-[12px] leading-6 text-gray-500">
                  Commandes : {brandConfig.contact.orderReceiverName} · Contact commandes :{" "}
                  {brandConfig.contact.orderPhone}
                </p>
              </div>

              <div className="px-5 sm:px-6 py-5 border-b border-gray-100">
                <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-4">
                  Récapitulatif
                </p>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.cartId} className="flex justify-between gap-4 text-[12px]">
                      <div className="min-w-0">
                        <p className="font-medium tracking-wide truncate">{item.product.name}</p>
                        <p className="text-gray-500 mt-1">
                          Taille {item.size} · Couleur {item.color} · Qté {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium shrink-0">
                        {formatFCFA(item.product.priceValue * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between text-[13px] mt-5 pt-4 border-t border-gray-100">
                  <span className="text-gray-500">Sous-total</span>
                  <span className="font-semibold">{formatFCFA(total)}</span>
                </div>
              </div>

              <div className="px-5 sm:px-6 py-5 grid gap-4">
                <div className="hidden" aria-hidden="true">
                  <label>
                    Site web
                    <input
                      name="website"
                      value={form.website}
                      onChange={handleChange("website")}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="grid gap-2 text-[11px] tracking-[0.18em] uppercase">
                    Nom complet
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange("fullName")}
                      autoComplete="name"
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? "order-full-name-error" : undefined}
                      className="border border-gray-200 px-4 py-3 text-[13px] tracking-wide normal-case outline-none focus:border-black"
                    />
                    {errors.fullName && (
                      <span id="order-full-name-error" className="text-[11px] normal-case tracking-normal text-red-600">
                        {errors.fullName}
                      </span>
                    )}
                  </label>

                  <label className="grid gap-2 text-[11px] tracking-[0.18em] uppercase">
                    Téléphone
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange("phone")}
                      autoComplete="tel"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "order-phone-error" : undefined}
                      className="border border-gray-200 px-4 py-3 text-[13px] tracking-wide normal-case outline-none focus:border-black"
                    />
                    {errors.phone && (
                      <span id="order-phone-error" className="text-[11px] normal-case tracking-normal text-red-600">
                        {errors.phone}
                      </span>
                    )}
                  </label>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="grid gap-2 text-[11px] tracking-[0.18em] uppercase">
                    Email
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange("email")}
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "order-email-error" : undefined}
                      className="border border-gray-200 px-4 py-3 text-[13px] tracking-wide normal-case outline-none focus:border-black"
                    />
                    {errors.email && (
                      <span id="order-email-error" className="text-[11px] normal-case tracking-normal text-red-600">
                        {errors.email}
                      </span>
                    )}
                  </label>

                  <label className="grid gap-2 text-[11px] tracking-[0.18em] uppercase">
                    Ville / commune
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange("city")}
                      autoComplete="address-level2"
                      aria-invalid={Boolean(errors.city)}
                      aria-describedby={errors.city ? "order-city-error" : undefined}
                      className="border border-gray-200 px-4 py-3 text-[13px] tracking-wide normal-case outline-none focus:border-black"
                    />
                    {errors.city && (
                      <span id="order-city-error" className="text-[11px] normal-case tracking-normal text-red-600">
                        {errors.city}
                      </span>
                    )}
                  </label>
                </div>

                <label className="grid gap-2 text-[11px] tracking-[0.18em] uppercase">
                  Adresse ou indication de livraison
                  <textarea
                    name="address"
                    rows={3}
                    value={form.address}
                    onChange={handleChange("address")}
                    autoComplete="street-address"
                    aria-invalid={Boolean(errors.address)}
                    aria-describedby={errors.address ? "order-address-error" : undefined}
                    className="border border-gray-200 px-4 py-3 text-[13px] tracking-wide normal-case outline-none focus:border-black resize-none"
                  />
                  {errors.address && (
                    <span id="order-address-error" className="text-[11px] normal-case tracking-normal text-red-600">
                      {errors.address}
                    </span>
                  )}
                </label>

                <fieldset className="grid gap-2">
                  <legend className="text-[11px] tracking-[0.18em] uppercase">
                    Mode de contact préféré
                  </legend>
                  <div className="grid grid-cols-3 gap-2">
                    {CONTACT_METHODS.map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => handleChoice("contactMethod", method)}
                        aria-pressed={form.contactMethod === method}
                        className={`border px-3 py-3 text-[11px] tracking-wide transition-colors min-h-[44px] ${
                          form.contactMethod === method
                            ? "border-black bg-black text-white"
                            : "border-gray-200 hover:border-black"
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="grid gap-2">
                  <legend className="text-[11px] tracking-[0.18em] uppercase">
                    Livraison
                  </legend>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {DELIVERY_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleChoice("deliveryOption", option)}
                        aria-pressed={form.deliveryOption === option}
                        className={`border px-3 py-3 text-[11px] tracking-wide transition-colors min-h-[44px] ${
                          form.deliveryOption === option
                            ? "border-black bg-black text-white"
                            : "border-gray-200 hover:border-black"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="grid gap-2">
                  <legend className="text-[11px] tracking-[0.18em] uppercase">
                    Mode de paiement souhaité
                  </legend>
                  <div className="grid gap-2">
                    {PAYMENT_INTENTS.map((intent) => (
                      <button
                        key={intent}
                        type="button"
                        onClick={() => handleChoice("paymentIntent", intent)}
                        aria-pressed={form.paymentIntent === intent}
                        className={`border px-3 py-3 text-[11px] tracking-wide text-left transition-colors min-h-[44px] ${
                          form.paymentIntent === intent
                            ? "border-black bg-black text-white"
                            : "border-gray-200 hover:border-black"
                        }`}
                      >
                        {intent}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <label className="grid gap-2 text-[11px] tracking-[0.18em] uppercase">
                  Note complémentaire
                  <textarea
                    name="note"
                    rows={3}
                    value={form.note}
                    onChange={handleChange("note")}
                    className="border border-gray-200 px-4 py-3 text-[13px] tracking-wide normal-case outline-none focus:border-black resize-none"
                  />
                </label>
              </div>

              <div className="px-5 sm:px-6 pb-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white text-[11px] tracking-[0.25em] uppercase py-4 hover:bg-gray-900 transition-colors min-h-[52px]"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
                </button>
                {submitError && (
                  <p className="mt-3 text-[12px] text-red-600 leading-5" role="status">
                    {submitError}
                  </p>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    cartTotal,
    cartCount,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useShop();
  const [showOrderRequest, setShowOrderRequest] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hasItems = cartItems.length > 0;

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !showOrderRequest) closeCart();
    };

    if (isCartOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isCartOpen, showOrderRequest, closeCart]);

  useEffect(() => {
    if (isCartOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const handleCloseCart = () => {
    setShowOrderRequest(false);
    closeCart();
  };

  const handleOrderFinish = () => {
    setShowOrderRequest(false);
    clearCart();
    closeCart();
  };

  return (
    <>
      <div
        id="cart-backdrop"
        onClick={handleCloseCart}
        className={`fixed inset-0 z-[180] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        ref={drawerRef}
        id="cart-drawer"
        className={`fixed top-0 right-0 h-full z-[190] bg-white flex flex-col shadow-2xl
          w-full sm:w-[420px] max-w-full
          transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
          ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
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
            type="button"
            id="cart-close-btn"
            onClick={handleCloseCart}
            aria-label="Fermer le panier"
            className="p-2 hover:opacity-60 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {!hasItems ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <ShoppingBag size={48} strokeWidth={1} className="text-gray-200" />
              <p className="text-[13px] text-gray-500 tracking-wide">
                Votre panier est vide.
              </p>
              <Link
                href="/shop"
                onClick={handleCloseCart}
                className="border border-black text-black text-[10px] tracking-[0.2em] uppercase px-8 py-3 hover:bg-black hover:text-white transition-all duration-300 min-h-[44px]"
              >
                Découvrir la collection
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <li key={item.cartId} className="flex gap-4 px-5 py-5">
                  <div className="relative w-20 h-28 bg-gray-50 shrink-0 overflow-hidden">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover object-top"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <p className="text-[10px] text-gray-400 tracking-wide mb-0.5">
                        {item.product.category}
                      </p>
                      <p className="text-[13px] font-medium leading-snug truncate">
                        {item.product.name}
                      </p>
                      <div className="mt-2 space-y-0.5 text-[11px] text-gray-500 tracking-wide">
                        <p>
                          <span className="text-gray-400">Taille</span> {item.size}
                        </p>
                        <p>
                          <span className="text-gray-400">Couleur</span> {item.color}
                        </p>
                        {item.product.stockStatus === "Low Stock" && (
                          <p className="text-black">Stock limité</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-end justify-between mt-3 gap-3">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.18em] text-gray-400 mb-1">
                          Quantité
                        </p>
                        <div className="flex items-center border border-gray-200">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartId, -1)}
                            aria-label={`Diminuer la quantité de ${item.product.name}`}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Minus size={12} strokeWidth={1.5} />
                          </button>
                          <span className="w-8 text-center text-[12px]">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartId, 1)}
                            aria-label={`Augmenter la quantité de ${item.product.name}`}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Plus size={12} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 mb-0.5">
                          Unité {item.product.price}
                        </p>
                        <p className="text-[13px] font-medium">
                          {formatFCFA(item.product.priceValue * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.cartId)}
                    aria-label={`Supprimer ${item.product.name} du panier`}
                    className="self-start p-2 hover:opacity-60 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    <Trash2 size={14} strokeWidth={1.5} className="text-gray-400" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="shrink-0 border-t border-gray-100 px-5 py-5 space-y-4">
          <div className="flex justify-between text-[13px]">
            <span className="text-gray-500">Sous-total</span>
            <span className="font-semibold">{formatFCFA(cartTotal)}</span>
          </div>
          <p className="text-[10px] text-gray-400 tracking-wide">
            Livraison à confirmer avec la boutique
          </p>
          <button
            type="button"
            id="checkout-btn"
            onClick={() => setShowOrderRequest(true)}
            disabled={!hasItems}
            className="w-full bg-black text-white text-[11px] tracking-[0.25em] uppercase py-4 hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 min-h-[52px] disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            <ClipboardList size={14} strokeWidth={1.5} />
            Demande de commande
          </button>
        </div>
      </div>

      {showOrderRequest && (hasItems || cartCount === 0) && (
        <OrderRequestModal
          items={cartItems}
          total={cartTotal}
          onClose={() => setShowOrderRequest(false)}
          onFinish={handleOrderFinish}
          onOrderSaved={clearCart}
        />
      )}
    </>
  );
}
