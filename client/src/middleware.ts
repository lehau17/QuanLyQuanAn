import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/manage"];
const unAuthPaths = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isAuth = Boolean(request.cookies.get("accessToken")?.value);
  if (
    protectedPaths.some((path) => pathname.startsWith(path) && !refreshToken)
  ) {
    const url = new URL("/logout", request.url);
    url.searchParams.set(
      "refreshToken",
      request.cookies.get("refreshToken")?.value || ""
    );
    return NextResponse.redirect(url);
  }
  if (unAuthPaths.some((path) => pathname.startsWith(path) && refreshToken)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (protectedPaths.some((path) => pathname.startsWith(path) && !refreshToken))
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/manage/:path*"],
};
