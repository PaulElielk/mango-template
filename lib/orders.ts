import { randomUUID } from "node:crypto";
import { brandConfig } from "@/app/data/brand";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { OrderItemInsert } from "@/lib/supabase/types";

const ORDER_ERROR_MESSAGE =
  "Impossible d'envoyer la demande pour le moment. Veuillez réessayer ou nous contacter directement par WhatsApp.";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SUPPORTED_PAYMENT_METHODS = new Set(brandConfig.payments);

export class SafeOrderError extends Error {
  constructor(message = ORDER_ERROR_MESSAGE) {
    super(message);
    this.name = "SafeOrderError";
  }
}

export type OrderCustomerInput = {
  fullName: string;
  phone: string;
  email?: string;
  city?: string;
  address?: string;
};

export type OrderCartItemInput = {
  productId?: string | number | null;
  productVariantId?: string | null;
  productName: string;
  size?: string | null;
  color?: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type CreateOrderInput = {
  customer: OrderCustomerInput;
  contactMethod?: string;
  deliveryMethod?: string;
  deliveryZone?: string;
  deliveryAddress?: string;
  paymentMethod?: string;
  notes?: string;
  website?: string;
  totalAmount: number;
  items: OrderCartItemInput[];
};

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function nullableString(value: unknown) {
  const cleaned = cleanString(value);
  return cleaned.length > 0 ? cleaned : null;
}

function isUuid(value: unknown): value is string {
  return typeof value === "string" && UUID_PATTERN.test(value);
}

export function generateOrderNumber() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replaceAll("-", "");
  const random4 = Math.floor(1000 + Math.random() * 9000);

  return `SBL-${date}-${random4}`;
}

function validateOrderInput(input: CreateOrderInput) {
  if (cleanString(input.website)) {
    throw new SafeOrderError();
  }

  const fullName = cleanString(input.customer?.fullName);
  const phone = cleanString(input.customer?.phone);
  const city = cleanString(input.customer?.city);
  const deliveryZone = cleanString(input.deliveryZone);
  const deliveryMethod = cleanString(input.deliveryMethod);
  const deliveryAddress = cleanString(input.deliveryAddress);
  const customerAddress = cleanString(input.customer?.address);
  const paymentMethod = cleanString(input.paymentMethod);
  const requiresAddress = deliveryMethod
    .toLowerCase()
    .includes("livraison");

  if (!fullName || !phone) {
    throw new SafeOrderError("Veuillez renseigner votre nom complet et votre téléphone.");
  }

  if (!city && !deliveryZone) {
    throw new SafeOrderError("Veuillez renseigner votre ville ou zone de livraison.");
  }

  if (requiresAddress && !deliveryAddress && !customerAddress) {
    throw new SafeOrderError("Veuillez renseigner une adresse de livraison.");
  }

  if (!Array.isArray(input.items) || input.items.length === 0) {
    throw new SafeOrderError("Votre panier est vide.");
  }

  if (paymentMethod && !SUPPORTED_PAYMENT_METHODS.has(paymentMethod)) {
    throw new SafeOrderError("Le mode de paiement sélectionné est invalide.");
  }

  const computedTotal = input.items.reduce((sum, item) => {
    if (
      !item.productName ||
      !Number.isFinite(item.quantity) ||
      !Number.isFinite(item.unitPrice) ||
      !Number.isFinite(item.totalPrice)
    ) {
      throw new SafeOrderError();
    }

    const quantity = Math.floor(item.quantity);
    const unitPrice = Math.floor(item.unitPrice);
    const totalPrice = Math.floor(item.totalPrice);

    if (quantity <= 0 || unitPrice < 0 || totalPrice !== unitPrice * quantity) {
      throw new SafeOrderError();
    }

    return sum + totalPrice;
  }, 0);

  if (
    computedTotal <= 0 ||
    !Number.isFinite(input.totalAmount) ||
    Math.floor(input.totalAmount) !== computedTotal
  ) {
    throw new SafeOrderError("Le total de la commande est invalide.");
  }

  return {
    fullName,
    phone,
    city,
    deliveryZone,
    deliveryAddress: deliveryAddress || customerAddress,
    computedTotal,
  };
}

async function validateVariantStock(
  supabase: ReturnType<typeof getSupabaseClient>,
  items: OrderCartItemInput[]
) {
  const variantItems = items.filter((item) => isUuid(item.productVariantId));

  if (variantItems.length === 0) return;

  for (const item of variantItems) {
    const quantity = Math.floor(item.quantity);
    const { data, error } = await supabase
      .from("product_variants")
      .select("stock_quantity")
      .eq("id", item.productVariantId as string)
      .maybeSingle();

    if (error) {
      console.error("[Supabase] check variant stock:", error.message);
      throw new SafeOrderError();
    }

    if (!data) {
      throw new SafeOrderError("Une variante sélectionnée n'est plus disponible.");
    }

    if (quantity > data.stock_quantity) {
      throw new SafeOrderError(
        "La quantité demandée n'est plus disponible pour une variante sélectionnée."
      );
    }
  }
}

function toOrderItemInsert(orderId: string, item: OrderCartItemInput): OrderItemInsert {
  const productId = isUuid(item.productId) ? item.productId : null;
  const productVariantId = isUuid(item.productVariantId)
    ? item.productVariantId
    : null;
  const quantity = Math.floor(item.quantity);
  const unitPrice = Math.floor(item.unitPrice);

  return {
    order_id: orderId,
    product_id: productId,
    product_variant_id: productVariantId,
    product_name: cleanString(item.productName),
    size: nullableString(item.size),
    color: nullableString(item.color),
    quantity,
    unit_price: unitPrice,
    total_price: unitPrice * quantity,
  };
}

export async function createOrderRequest(input: CreateOrderInput) {
  const validated = validateOrderInput(input);
  const supabase = getSupabaseClient();
  const customerId = randomUUID();
  const orderId = randomUUID();

  await validateVariantStock(supabase, input.items);

  const { error: customerError } = await supabase
    .from("customers")
    .insert({
      id: customerId,
      full_name: validated.fullName,
      phone: validated.phone,
      email: nullableString(input.customer.email),
      city: validated.city || validated.deliveryZone || null,
      address: nullableString(input.customer.address) ?? validated.deliveryAddress,
    });

  if (customerError) {
    console.error("[Supabase] create customer:", customerError?.message);
    throw new SafeOrderError();
  }

  const orderNumber = generateOrderNumber();
  const { error: orderError } = await supabase
    .from("orders")
    .insert({
      id: orderId,
      customer_id: customerId,
      order_number: orderNumber,
      status: "pending",
      payment_status: "unpaid",
      payment_method: nullableString(input.paymentMethod),
      contact_method: nullableString(input.contactMethod),
      delivery_method: nullableString(input.deliveryMethod),
      delivery_zone: validated.deliveryZone || validated.city || null,
      delivery_address: validated.deliveryAddress,
      notes: nullableString(input.notes),
      total_amount: validated.computedTotal,
      currency: "FCFA",
    });

  if (orderError) {
    console.error("[Supabase] create order:", orderError?.message);
    throw new SafeOrderError();
  }

  const orderItems = input.items.map((item) => toOrderItemInsert(orderId, item));
  const { error: orderItemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (orderItemsError) {
    console.error("[Supabase] create order items:", orderItemsError.message);
    throw new SafeOrderError();
  }

  return {
    orderNumber,
  };
}

export { ORDER_ERROR_MESSAGE };
