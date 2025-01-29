import Client from "@workspace/database/server";
import { type NextRequest, NextResponse } from "next/server";
import routes from "./routes";

export const updateSession = async (request: NextRequest) => {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = Client({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anon_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    getAll() {
      return request.cookies.getAll();
    },
    setAll(cookiesToSet) {
      cookiesToSet.forEach(({ name, value }) =>
        request.cookies.set(name, value),
      );
      response = NextResponse.next({
        request,
      });
      cookiesToSet.forEach(({ name, value, options }) =>
        response.cookies.set(name, value, options),
      );
    },
  });

  // This will refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const user = await supabase.auth.getUser();
  const isAuthenticated = !user.error;
  const isSigninOrSignup = 
    request.nextUrl.pathname === routes.auth.signin || 
    request.nextUrl.pathname === routes.auth.signup;
  const isDashboard = request.nextUrl.pathname.startsWith(routes.protected.dashboard);

  // If the user is unauthenticated and trying to access protected routes
  if (isDashboard && !isAuthenticated) {
    return NextResponse.redirect(new URL(routes.auth.signin, request.url));
  }

  // If the user is authenticated and trying to access signin or signup pages
  if (isSigninOrSignup && isAuthenticated) {
    return NextResponse.redirect(new URL(routes.protected.dashboard, request.url));
  }

  // No redirect needed in other cases

  return response;
};
