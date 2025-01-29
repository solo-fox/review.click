import { createServerClient, CookieOptions } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

type CookieToSet = {
  name: string;
  value: string;
  options: CookieOptions;
}[];
export type ClientConnection = SupabaseClient<Database>;

export default function Client({
  url,
  anon_key,
  getAll,
  setAll,
}: {
  url: string;
  anon_key: string;
  getAll: () => any;
  setAll: (cookiesToSet: CookieToSet) => void;
}) {
  let client = createServerClient<Database>(url, anon_key, {
    cookies: {
      getAll,
      setAll,
    },
  });
  return client;
}
