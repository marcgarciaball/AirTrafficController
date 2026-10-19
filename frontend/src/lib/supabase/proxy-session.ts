import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { resolveRedirect } from "@/lib/routing";
import type { Database } from "./database.types";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const pending: { name: string; value: string; options?: Parameters<typeof response.cookies.set>[2] }[] = [];

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
            pending.push({ name, value, options });
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isOnboarded = false;
  if (user) {
    const { data } = await supabase.from("profiles").select("onboarded_at").eq("id", user.id).maybeSingle();
    isOnboarded = Boolean(data?.onboarded_at);
  }

  const target = resolveRedirect({
    pathname: request.nextUrl.pathname,
    isAuthenticated: Boolean(user),
    isOnboarded,
  });
  if (!target) return response;

  const url = request.nextUrl.clone();
  url.pathname = target;
  url.search = "";
  const redirect = NextResponse.redirect(url);
  pending.forEach(({ name, value, options }) => redirect.cookies.set(name, value, options));
  return redirect;
}
