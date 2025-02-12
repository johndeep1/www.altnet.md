import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Log the contact form data (for now)
    console.log("Contact form submission:", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });

    // For now, we'll just return a success response
    return NextResponse.json(
      {
        message: "Mesajul a fost trimis cu succes! Vă vom contacta în curând.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      {
        message:
          "Ne pare rău, a apărut o eroare. Vă rugăm să încercați din nou.",
      },
      { status: 500 }
    );
  }
}
