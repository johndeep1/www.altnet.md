import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface OrderConfirmation {
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  items: OrderItem[];
  total: number;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ro-MD', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export async function POST(request: Request) {
  try {
    const data = await request.json() as OrderConfirmation;
    
    const itemsList = data.items
      .map(
        (item) => `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">${formatPrice(item.price)} MDL</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">${formatPrice(item.price * item.quantity)} MDL</td>
          </tr>
        `
      )
      .join("");

    const emailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmare Comandă - AltNet Store</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-top: 20px;">
            <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0;">
              <h1 style="color: #2563eb; margin: 0; font-size: 24px;">Confirmare Comandă</h1>
              <p style="color: #6b7280; margin-top: 8px;">Comanda #${data.orderNumber}</p>
            </div>

            <div style="padding: 20px 0;">
              <p style="margin: 0;">Dragă <strong>${data.customerName}</strong>,</p>
              <p style="margin-top: 16px;">Vă mulțumim pentru comanda dumneavoastră! Mai jos sunt detaliile comenzii:</p>
            </div>

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px;">Detalii Comandă</h2>
              <p style="margin: 4px 0; color: #4b5563;"><strong>Email:</strong> ${data.email}</p>
              <p style="margin: 4px 0; color: #4b5563;"><strong>Telefon:</strong> ${data.phone}</p>
            </div>

            <div style="margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 6px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #f8fafc;">
                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Produs</th>
                    <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e5e7eb;">Cantitate</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">Preț</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsList}
                </tbody>
              </table>
            </div>

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 18px; font-weight: bold; color: #1e293b;">Total Comandă:</span>
                <span style="font-size: 20px; font-weight: bold; color: #2563eb;">${formatPrice(data.total)} MDL</span>
              </div>
            </div>

            <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 2px solid #f0f0f0;">
              <p style="margin: 4px 0; color: #4b5563;">Vă vom contacta în curând pentru a confirma detaliile livrării.</p>
              <p style="margin: 16px 0; color: #6b7280;">Pentru orice întrebări, ne puteți contacta la:</p>
              <p style="margin: 4px 0; color: #4b5563;"><strong>Email:</strong> sales@altnet.md</p>
              <p style="margin: 4px 0; color: #4b5563;"><strong>Telefon:</strong> +373 268 85 555</p>
            </div>

            <div style="text-align: center; margin-top: 32px; color: #6b7280; font-size: 14px;">
              <p style="margin: 4px 0;">Cu stimă,</p>
              <p style="margin: 4px 0;">Echipa AltNet Store</p>
              <p style="margin-top: 16px;">© ${new Date().getFullYear()} AltNet Store. Toate drepturile rezervate.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email
    await transporter.sendMail({
      from: {
        name: "AltNet Store",
        address: process.env.GMAIL_USER!
      },
      to: data.email,
      subject: `Confirmare comandă #${data.orderNumber} - AltNet Store`,
      html: emailContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Error sending confirmation email",
      { status: 500 }
    );
  }
} 