import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

let supabaseClient: SupabaseClient<Database> | null = null;

export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable.");
  }

  if (!supabasePublishableKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY environment variable."
    );
  }

  if (!supabaseClient) {
    supabaseClient = createClient<Database>(
      supabaseUrl,
      supabasePublishableKey
    );
  }

  return supabaseClient;
}
