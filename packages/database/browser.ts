import { createBrowserClient } from "@supabase/ssr";
import { Database } from "./database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export type ClientConnection = SupabaseClient<Database>;
export default function Client({
  url,
  anon_key,
}: {
  url: string;
  anon_key: string;
}) {
  let client = createBrowserClient<Database>(url, anon_key);

  return client;
}
