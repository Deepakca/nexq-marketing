// FILE: ./middleware.ts
import { NextRequest, NextResponse } from "next/server";

const RESERVED_SUBDOMAINS = new Set(["www", "app", "api", "admin", "auth", "institute"]);
const EXAM_SUBDOMAINS = new Set(["ca", "cs", "cma", "upsc"]);

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  const currentHost = hostname.replace(`:${url.port}`, "");
  const isLocalhost = currentHost.includes("localhost");
  const baseDomain = isLocalhost ? "localhost" : "nexqai.in";

  let subdomain: string | null = null;
  if (currentHost.endsWith(`.${baseDomain}`)) {
    subdomain = currentHost.replace(`.${baseDomain}`, "").toLowerCase();
  }

  // 1. Skip system paths and static assets
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/images") ||
    url.pathname.includes(".") ||
    (subdomain && RESERVED_SUBDOMAINS.has(subdomain))
  ) {
    return NextResponse.next();
  }

  // 2. Exam Subdomain Consolidation (e.g., ca.nexqai.in -> nexqai.in/ca)
  if (subdomain && EXAM_SUBDOMAINS.has(subdomain)) {
    const protocol = isLocalhost ? "http://" : "https://";
    const targetPath = `/${subdomain}${url.pathname === "/" ? "" : url.pathname}`;
    return NextResponse.redirect(new URL(`${protocol}${baseDomain}${targetPath}`, req.url), 301);
  }

  // 3. Subdomain detected -> Rewrite to Institute Route
  if (subdomain && !RESERVED_SUBDOMAINS.has(subdomain)) {
    return NextResponse.rewrite(new URL(`/i/${subdomain}${url.pathname}`, req.url));
  }

  // 4. Direct /i/[slug] access -> Canonical Subdomain redirect
  if (url.pathname.startsWith("/i/")) {
    const parts = url.pathname.split("/").filter(Boolean);
    const instituteSlug = parts[1];

    if (instituteSlug && !RESERVED_SUBDOMAINS.has(instituteSlug) && !EXAM_SUBDOMAINS.has(instituteSlug)) {
      const protocol = isLocalhost ? "http://" : "https://";
      return NextResponse.redirect(new URL(`${protocol}${instituteSlug}.${baseDomain}/`, req.url), 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/|_next/static|_next/image|favicon.ico).*)"],
};