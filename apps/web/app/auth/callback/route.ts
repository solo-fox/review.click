import routes from "@/lib/routes";
import { createClient } from "@/lib/server";
import { encodedRedirect } from "@/lib/utils";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return encodedRedirect(`${routes.auth.signin}`, {
        message: error.message,
        type: "error",
      });
    }

    return encodedRedirect(`${routes.protected.dashboard}`);
  } else {
    return encodedRedirect(`${routes.auth.signin}`, {
      message: "No+authentiaction+code+was+found",
      type: "error",
    });
  }
}
