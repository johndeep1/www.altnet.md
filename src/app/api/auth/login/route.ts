import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as crypto from "crypto";
import * as jose from "jose";
import { JWT_SECRET } from "@/lib/auth";

// Create a single instance of PrismaClient to be reused
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

// Function to hash password
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(request: Request) {
  try {
    // Log the start of the request
    console.log("Starting login request");

    const body = await request.json();
    const { username, password } = body;

    console.log("Login attempt for username:", username);

    try {
      // Test database connection
      await prisma.$connect();
      console.log("Database connection successful");

      // Find user in database
      const user = await prisma.user.findUnique({
        where: { username },
      });

      console.log("Database query completed");
      console.log("User found:", user ? "yes" : "no");

      if (!user) {
        return NextResponse.json(
          { error: "Invalid username or password" },
          { status: 401 }
        );
      }

      // Verify password
      const hashedPassword = hashPassword(password);
      const passwordMatch = hashedPassword === user.password;
      console.log("Password verification completed");
      console.log("Password match:", passwordMatch);

      if (!passwordMatch) {
        return NextResponse.json(
          { error: "Invalid username or password" },
          { status: 401 }
        );
      }

      // Create a JWT token
      const secret = new TextEncoder().encode(JWT_SECRET);
      const token = await new jose.SignJWT({
        userId: user.id,
        username: user.username,
        role: user.role,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("24h")
        .sign(secret);

      console.log("JWT token created successfully");

      // Create response headers with the cookie
      const headers = new Headers();
      headers.append(
        "Set-Cookie",
        `auth-token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${
          60 * 60 * 24
        }`
      );

      // Create the response with headers
      const response = NextResponse.json(
        { success: true },
        {
          headers: headers,
          status: 200,
        }
      );

      console.log("Response prepared successfully");
      return response;
    } catch (dbError) {
      console.error("Database operation failed:", dbError);
      throw dbError; // Re-throw to be caught by outer try-catch
    }
  } catch (error) {
    console.error("Login error details:", error);
    // Return more detailed error information in development
    const errorMessage =
      process.env.NODE_ENV === "development"
        ? String(error)
        : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    try {
      await prisma.$disconnect();
      console.log("Database disconnected successfully");
    } catch (error) {
      console.error("Error disconnecting from database:", error);
    }
  }
}
