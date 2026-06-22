import { formatFCFA, type Product } from "@/app/data/products";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { SupabaseProductRecord } from "@/lib/supabase/types";

const PRODUCT_SELECT = `
  *,
  categories (
    id,
    name,
    slug
  ),
  product_images (
    id,
    product_id,
    url,
    alt_text,
    position,
    created_at
  ),
  product_variants (
    id,
    product_id,
    size,
    color,
    stock_quantity,
    created_at
  )
`;

type SupabaseResult<T> = {
  data: T;
  error: Error | null;
};

function sortByPosition(
  images: NonNullable<SupabaseProductRecord["product_images"]>
) {
  return [...images].sort((a, b) => a.position - b.position);
}

function uniqueValues(values: Array<string | null>) {
  return Array.from(
    new Set(
      values
        .map((value) => value?.trim())
        .filter((value): value is string => Boolean(value))
    )
  );
}

export function mapSupabaseProductToProduct(
  product: SupabaseProductRecord
): Product {
  const images = sortByPosition(product.product_images ?? []);
  const variants = product.product_variants ?? [];
  const sizes = uniqueValues(variants.map((variant) => variant.size));
  const colors = uniqueValues(variants.map((variant) => variant.color));
  const stockQuantity = variants.reduce(
    (sum, variant) => sum + variant.stock_quantity,
    0
  );
  const stockStatus: Product["stockStatus"] =
    variants.length > 0 && stockQuantity === 0
      ? "Out of Stock"
      : variants.length > 0 && stockQuantity <= 5
        ? "Low Stock"
        : "In Stock";

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description ?? "",
    price: formatFCFA(product.price),
    priceValue: product.price,
    image: images[0]?.url ?? "/p1.png",
    secondaryImages: images.slice(1).map((image) => image.url),
    category: product.categories?.name ?? "Collection",
    categorySlug: product.categories?.slug ?? "",
    colors: colors.length > 0 ? colors : ["Unique"],
    sizes: sizes.length > 0 ? sizes : ["Unique"],
    stockStatus,
    isNew: product.is_new,
  };
}

function logSupabaseError(scope: string, error: Error | null) {
  if (error) {
    console.error(`[Supabase] ${scope}:`, error.message);
  }
}

async function fetchActiveProducts(): Promise<
  SupabaseResult<SupabaseProductRecord[]>
> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .returns<SupabaseProductRecord[]>();

    if (error) {
      logSupabaseError("get active products", error);
      return { data: [], error };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    const normalizedError =
      error instanceof Error ? error : new Error("Unknown Supabase error.");
    logSupabaseError("get active products", normalizedError);
    return { data: [], error: normalizedError };
  }
}

export async function getSupabaseProducts(): Promise<SupabaseResult<Product[]>> {
  const { data, error } = await fetchActiveProducts();

  return {
    data: data.map(mapSupabaseProductToProduct),
    error,
  };
}

export async function getSupabaseProductBySlug(
  slug: string
): Promise<SupabaseResult<Product | null>> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("status", "active")
      .eq("slug", slug)
      .maybeSingle()
      .returns<SupabaseProductRecord | null>();

    if (error) {
      logSupabaseError(`get product by slug "${slug}"`, error);
      return { data: null, error };
    }

    return {
      data: data ? mapSupabaseProductToProduct(data) : null,
      error: null,
    };
  } catch (error) {
    const normalizedError =
      error instanceof Error ? error : new Error("Unknown Supabase error.");
    logSupabaseError(`get product by slug "${slug}"`, normalizedError);
    return { data: null, error: normalizedError };
  }
}

export async function getFeaturedSupabaseProducts(): Promise<
  SupabaseResult<Product[]>
> {
  const { data, error } = await fetchActiveProducts();

  return {
    data: data
      .filter((product) => product.is_featured)
      .map(mapSupabaseProductToProduct),
    error,
  };
}

export async function getRelatedSupabaseProducts(
  categorySlug: string,
  currentProductId: string
): Promise<SupabaseResult<Product[]>> {
  const { data, error } = await fetchActiveProducts();
  const relatedProducts = data.filter(
    (product) =>
      product.id !== currentProductId &&
      product.categories?.slug === categorySlug
  );
  const fallbackProducts = data.filter(
    (product) =>
      product.id !== currentProductId &&
      product.categories?.slug !== categorySlug
  );

  return {
    data: [...relatedProducts, ...fallbackProducts]
      .slice(0, 4)
      .map(mapSupabaseProductToProduct),
    error,
  };
}
