// FILE: ./middleware.ts
import { NextRequest, NextResponse } from "next/server";

// Subdomains that belong to system/AWS, not coaching institutes
const RESERVED_SUBDOMAINS = new Set([
  "www", "app", "api", "admin", "auth", "ca", "cs", "cma", "upsc", "institute"
]);

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // Extract subdomain (e.g., "jkshah" from "jkshah.nexqai.in")
  const currentHost = hostname.replace(`:${url.port}`, "");
  const isLocalhost = currentHost.includes("localhost");
  const baseDomain = isLocalhost ? "localhost" : "nexqai.in";

  let subdomain: string | null = null;
  if (currentHost.endsWith(`.${baseDomain}`)) {
    subdomain = currentHost.replace(`.${baseDomain}`, "").toLowerCase();
  }

  // 1. Skip system paths, static assets, and reserved subdomains
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/images") ||
    url.pathname.includes(".") ||
    (subdomain && RESERVED_SUBDOMAINS.has(subdomain))
  ) {
    return NextResponse.next();
  }

  // 2. Subdomain detected -> Rewrite to Institute Route
  if (subdomain && !RESERVED_SUBDOMAINS.has(subdomain)) {
    // Keeps URL as jkshah.nexqai.in, but loads app/i/[slug]/page.tsx
    return NextResponse.rewrite(new URL(`/i/${subdomain}${url.pathname}`, req.url));
  }

  // 3. Prevent direct access to /i/[slug] -> Force Subdomain redirect for authenticity
  if (url.pathname.startsWith("/i/")) {
    const parts = url.pathname.split("/").filter(Boolean);
    const instituteSlug = parts[1];

    if (instituteSlug && !RESERVED_SUBDOMAINS.has(instituteSlug)) {
      const protocol = isLocalhost ? "http://" : "https://";
      return NextResponse.redirect(
        new URL(`${protocol}${instituteSlug}.${baseDomain}/`, req.url),
        301
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/|_next/static|_next/image|favicon.ico).*)"],
};