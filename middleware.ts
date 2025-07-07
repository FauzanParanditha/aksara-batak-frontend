import { verifyJWT } from "@/lib/auth";
import { jwtConfig } from "@/utils/var";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Periksa semua kemungkinan cookie token
  const possibleCookieNames = [
    jwtConfig.admin.accessTokenName,
    jwtConfig.user?.accessTokenName ?? "leader-token",
  ];

  let token: string | undefined;
  for (const name of possibleCookieNames) {
    const value = request.cookies.get(name)?.value;
    if (value) {
      token = value;
      break;
    }
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const payload = verifyJWT(token);
  if (!payload) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const path = request.nextUrl.pathname;

  // Role-based access control
  if (path.startsWith("/admin") && payload.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (path.startsWith("/user") && payload.role !== "leader") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
  runtime: "nodejs",
};
