import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Initialize nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
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
    const data = await request.json() as Order;

    // Validate required fields
    if (!data.orderNumber || !data.customerName || !data.email || data.items.length === 0) {
      return NextResponse.json({ error: "Missing required order information" }, { status: 400 });
    }

    // Format items for email template
    const itemsList = data.items
      .map(
        (item) => `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
              ${item.name}
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">
              ${item.quantity}
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
              ${formatPrice(item.price)} MDL
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
              ${formatPrice(item.price * item.quantity)} MDL
            </td>
          </tr>
        `
      )
      .join("");

    // 1. Customer Email Template
    const customerEmailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmare Comandă - ALTNET</title>
        </head>
        <body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f9f9f9; color: #333333;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #19A852 0%, #148A42 100%); padding: 30px 20px; text-align: center;">

              <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 500;">ALTNET - Confirmare comandă</h2>
            </div>

            <!-- Content -->
            <div style="padding: 30px 25px;">
              <div style="background-color: #f2f9f5; border-left: 4px solid #19A852; padding: 12px 15px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; font-size: 16px;">Dragă <strong>${data.customerName}</strong>, vă mulțumim pentru comanda dumneavoastră!</p>
                <p style="margin-top: 8px; font-size: 15px;">Comanda dumneavoastră cu numărul <strong>${data.orderNumber}</strong> a fost înregistrată cu succes.</p>
              </div>

              <!-- Order Details -->
              <div style="margin-bottom: 25px;">
                <h3 style="color: #19A852; font-size: 18px; margin-top: 0; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #f0f0f0;">Informații comandă</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666666; width: 140px;"><strong>Email:</strong></td>
                    <td style="padding: 8px 0;">${data.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666;"><strong>Telefon:</strong></td>
                    <td style="padding: 8px 0;">${data.phone}</td>
                  </tr>
                </table>
              </div>

              <!-- Products Table -->
              <div style="margin-bottom: 25px;">
                <h3 style="color: #19A852; font-size: 18px; margin-top: 0; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #f0f0f0;">Produse comandate</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f8f8f8;">
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

              <!-- Total -->
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 30px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 18px; font-weight: bold;">Total comandă:</span>
                  <span style="font-size: 20px; font-weight: bold; color: #19A852;">${formatPrice(data.total)} MDL</span>
                </div>
              </div>

              <!-- Next Steps -->
              <div style="background-color: #f2f9f5; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <h3 style="color: #19A852; font-size: 16px; margin-top: 0; margin-bottom: 10px;">Următorii pași</h3>
                <p style="margin: 0 0 10px 0;">Vă vom contacta în curând pentru a confirma detaliile livrării și pentru a aranja plata.</p>
                <p style="margin: 0;">Pentru orice întrebări, ne puteți contacta la:</p>
                <ul style="margin-top: 5px;">
                  <li>Telefon: <a href="tel:+37326885555" style="color: #19A852; text-decoration: none;">+373 268 85 555</a></li>
                  <li>Viber: <a href="viber://chat?number=%2B373789661770" style="color: #19A852; text-decoration: none;">+373 789 66 177</a></li>
                  <li>Email: <a href="mailto:sales@altnet.md" style="color: #19A852; text-decoration: none;">sales@altnet.md</a></li>
                </ul>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; color: #777777; font-size: 14px;">© ${new Date().getFullYear()} ALTNET - Toate drepturile rezervate</p>
              <p style="margin: 8px 0 0; color: #999999; font-size: 13px;">
                Acest email a fost generat automat. Vă rugăm să nu răspundeți la acest email.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // 2. Admin Email Template
    const adminEmailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Notificare comandă nouă - ALTNET</title>
        </head>
        <body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f9f9f9; color: #333333;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #19A852 0%, #148A42 100%); padding: 20px; text-align: center;">
              <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 500;">ALTNET - Comandă nouă primită</h2>
            </div>

            <!-- Content -->
            <div style="padding: 30px 25px;">
              <div style="background-color: #f2f9f5; border-left: 4px solid #19A852; padding: 12px 15px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; font-size: 16px;">A fost plasată o nouă comandă cu numărul <strong>${data.orderNumber}</strong>.</p>
              </div>

              <!-- Customer Details -->
              <div style="margin-bottom: 25px;">
                <h3 style="color: #19A852; font-size: 18px; margin-top: 0; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #f0f0f0;">Informații client</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666666; width: 140px;"><strong>Nume:</strong></td>
                    <td style="padding: 8px 0;">${data.customerName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666;"><strong>Email:</strong></td>
                    <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #19A852; text-decoration: none;">${data.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666;"><strong>Telefon:</strong></td>
                    <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #19A852; text-decoration: none;">${data.phone}</a></td>
                  </tr>
                </table>
              </div>

              <!-- Products Table -->
              <div style="margin-bottom: 25px;">
                <h3 style="color: #19A852; font-size: 18px; margin-top: 0; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #f0f0f0;">Produse comandate</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f8f8f8;">
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

              <!-- Total -->
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 30px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 18px; font-weight: bold;">Total comandă:</span>
                  <span style="font-size: 20px; font-weight: bold; color: #19A852;">${formatPrice(data.total)} MDL</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${data.email}" style="display: inline-block; background-color: #19A852; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 8px; font-weight: 500; margin-right: 10px;">Contactează clientul</a>
                <a href="tel:${data.phone}" style="display: inline-block; background-color: #f2f9f5; color: #19A852; text-decoration: none; padding: 12px 25px; border-radius: 8px; font-weight: 500; border: 1px solid #19A852;">Sună clientul</a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; color: #777777; font-size: 14px;">© ${new Date().getFullYear()} ALTNET - Sistem intern de comenzi</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to customer
    await transporter.sendMail({
      from: {
        name: "ALTNET Shop",
        address: process.env.EMAIL_USER!
      },
      to: data.email,
      subject: `Confirmare comandă #${data.orderNumber} - ALTNET`,
      html: customerEmailContent,
    });

    // Send email to admin
    await transporter.sendMail({
      from: {
        name: "ALTNET Shop",
        address: process.env.EMAIL_USER!
      },
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER!,
      subject: `Comandă nouă #${data.orderNumber} - ALTNET Shop`,
      html: adminEmailContent,
      replyTo: data.email
    });

    // TODO: Here you would typically save the order to a database

    return NextResponse.json({
      success: true,
      message: "Order placed successfully and emails sent"
    });
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json(
      {
        error: "Failed to process order",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      {
        status: 500
      }
    );
  }
}
