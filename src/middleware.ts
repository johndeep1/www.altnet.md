import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";
import { JWT_SECRET, JWTPayload } from "@/lib/auth";

export function middleware(request: NextRequest) {
  // Get the token from the cookies
  const token = request.cookies.get("auth-token")?.value;
  console.log("Middleware - Token present:", !!token);

  // Function to verify token
  const verifyToken = async (): Promise<JWTPayload | null> => {
    if (!token) return null;
    try {
      console.log("Middleware - Attempting to verify token");
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jose.jwtVerify(token, secret);
      console.log(
        "Middleware - Token verified successfully, role:",
        payload.role
      );
      return payload as unknown as JWTPayload;
    } catch (error) {
      console.error("Middleware - Token verification failed:", error);
      return null;
    }
  };

  // If user is on login page and is authenticated
  if (request.nextUrl.pathname === "/login") {
    if (token) {
      return verifyToken().then((decoded) => {
        if (decoded?.role === "ADMIN") {
          console.log("Middleware - Redirecting from login to /inventar");
          return NextResponse.redirect(new URL("/inventar", request.url));
        }
        return NextResponse.next();
      });
    }
  }

  // Protected routes check (only /inventar routes)
  if (request.nextUrl.pathname.startsWith("/inventar")) {
    console.log(
      "Middleware - Checking protected route:",
      request.nextUrl.pathname
    );
    if (!token) {
      console.log("Middleware - No token found, redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return verifyToken().then((decoded) => {
      if (!decoded || decoded.role !== "ADMIN") {
        console.log(
          "Middleware - Invalid token or not admin, redirecting to login"
        );
        return NextResponse.redirect(new URL("/login", request.url));
      }
      return NextResponse.next();
    });
  }

  // Allow public access to /magazin routes
  if (request.nextUrl.pathname.startsWith("/magazin")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/inventar/:path*", "/magazin/:path*"],
};
