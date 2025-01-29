"use server";

import routes from "@/lib/routes";
import { createClient } from "@/lib/server";
import { encodedRedirect } from "@/lib/utils";

export async function signInWithGitHub() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: routes.api.auth.callback,
    },
  });

  if (error) throw error;

  if (data?.url) encodedRedirect(data?.url);
  else throw new Error("Try again later.");
}
