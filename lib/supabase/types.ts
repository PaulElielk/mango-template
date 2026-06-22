export type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
};

export type ProductRow = {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  currency: string;
  is_featured: boolean;
  is_new: boolean;
  status: "draft" | "active" | "archived";
  created_at: string;
  updated_at: string;
};

export type ProductImageRow = {
  id: string;
  product_id: string;
  url: string;
  alt_text: string | null;
  position: number;
  created_at: string;
};

export type ProductVariantRow = {
  id: string;
  product_id: string;
  size: string | null;
  color: string | null;
  stock_quantity: number;
  created_at: string;
};

export type CustomerRow = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  city: string | null;
  address: string | null;
  created_at: string;
};

export type CustomerInsert = {
  id?: string;
  full_name: string;
  phone: string;
  email?: string | null;
  city?: string | null;
  address?: string | null;
  created_at?: string;
};

export type OrderRow = {
  id: string;
  customer_id: string | null;
  order_number: string;
  status: "pending" | "confirmed" | "preparing" | "delivered" | "cancelled";
  payment_status: "unpaid" | "pending" | "paid" | "failed" | "refunded";
  payment_method: string | null;
  contact_method: string | null;
  delivery_method: string | null;
  delivery_zone: string | null;
  delivery_address: string | null;
  notes: string | null;
  total_amount: number;
  currency: string;
  created_at: string;
};

export type OrderInsert = {
  id?: string;
  customer_id?: string | null;
  order_number: string;
  status?: "pending" | "confirmed" | "preparing" | "delivered" | "cancelled";
  payment_status?: "unpaid" | "pending" | "paid" | "failed" | "refunded";
  payment_method?: string | null;
  contact_method?: string | null;
  delivery_method?: string | null;
  delivery_zone?: string | null;
  delivery_address?: string | null;
  notes?: string | null;
  total_amount?: number;
  currency?: string;
  created_at?: string;
};

export type OrderItemRow = {
  id: string;
  order_id: string;
  product_id: string | null;
  product_variant_id: string | null;
  product_name: string;
  size: string | null;
  color: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
};

export type OrderItemInsert = {
  id?: string;
  order_id: string;
  product_id?: string | null;
  product_variant_id?: string | null;
  product_name: string;
  size?: string | null;
  color?: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at?: string;
};

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: CategoryRow;
        Insert: Partial<Omit<CategoryRow, "id" | "created_at">> & {
          id?: string;
          name: string;
          slug: string;
          created_at?: string;
        };
        Update: Partial<CategoryRow>;
        Relationships: [];
      };
      products: {
        Row: ProductRow;
        Insert: Partial<Omit<ProductRow, "id" | "created_at" | "updated_at">> & {
          id?: string;
          name: string;
          slug: string;
          price: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<ProductRow>;
        Relationships: [];
      };
      product_images: {
        Row: ProductImageRow;
        Insert: Partial<Omit<ProductImageRow, "id" | "created_at">> & {
          id?: string;
          product_id: string;
          url: string;
          created_at?: string;
        };
        Update: Partial<ProductImageRow>;
        Relationships: [];
      };
      product_variants: {
        Row: ProductVariantRow;
        Insert: Partial<Omit<ProductVariantRow, "id" | "created_at">> & {
          id?: string;
          product_id: string;
          created_at?: string;
        };
        Update: Partial<ProductVariantRow>;
        Relationships: [];
      };
      customers: {
        Row: CustomerRow;
        Insert: CustomerInsert;
        Update: Partial<CustomerRow>;
        Relationships: [];
      };
      orders: {
        Row: OrderRow;
        Insert: OrderInsert;
        Update: Partial<OrderRow>;
        Relationships: [];
      };
      order_items: {
        Row: OrderItemRow;
        Insert: OrderItemInsert;
        Update: Partial<OrderItemRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type SupabaseProductRecord = ProductRow & {
  categories: Pick<CategoryRow, "id" | "name" | "slug"> | null;
  product_images: ProductImageRow[] | null;
  product_variants: ProductVariantRow[] | null;
};
