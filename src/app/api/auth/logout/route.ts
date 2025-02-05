import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Create the response
    const response = NextResponse.json({ success: true });

    // Delete the auth token cookie
    response.cookies.delete("auth-token");

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
