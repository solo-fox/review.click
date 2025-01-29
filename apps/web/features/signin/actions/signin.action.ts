"use server";

interface SignInAction {
  email: string;
  password: string;
}
import routes from "@/lib/routes";
import { createClient } from "@/lib/server";
import { encodedRedirect } from "@/lib/utils";

export default async function signInAction(user: SignInAction) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });

  if (error) throw error;

  return encodedRedirect(routes.protected.dashboard);
}
