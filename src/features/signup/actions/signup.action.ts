"use server";

interface SignUpAction {
  email: string;
  password: string;
}
import routes from "@/lib/routes";
import { createClient } from "@/lib/server";
import { encodedRedirect } from "@/lib/utils";

export default async function signUpAction(user: SignUpAction) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      emailRedirectTo: routes.api.auth.callback,
    },
  });

  if (error) {
    return encodedRedirect(routes.auth.signup, {
      message: error.message,
      type: "error",
    });
  }
  return encodedRedirect(routes.auth.verify);
}
