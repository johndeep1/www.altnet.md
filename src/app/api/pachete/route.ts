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

interface PackageOrder {
  name: string;
  email: string;
  phone: string;
  address: string;
  additionalInfo?: string;
  planTitle: string;
  planSpeed: string;
  planPrice: string;
}

const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `PKG-${timestamp}${random}`;
};

export async function POST(request: Request) {
  try {
    const data = await request.json() as PackageOrder;
    const orderNumber = generateOrderNumber();

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.address || !data.planTitle) {
      return NextResponse.json({ error: "Missing required order information" }, { status: 400 });
    }

    // 1. Customer Email Template
    const customerEmailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmare Comandă Pachet - ALTNET</title>
        </head>
        <body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f9f9f9; color: #333333;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #19A852 0%, #148A42 100%); padding: 30px 20px; text-align: center;">
              <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 500;">ALTNET - Confirmare comandă pachet</h2>
            </div>

            <!-- Content -->
            <div style="padding: 30px 25px;">
              <div style="background-color: #f2f9f5; border-left: 4px solid #19A852; padding: 12px 15px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; font-size: 16px;">Dragă <strong>${data.name}</strong>, vă mulțumim pentru comanda dumneavoastră!</p>
                <p style="margin-top: 8px; font-size: 15px;">Comanda dumneavoastră cu numărul <strong>${orderNumber}</strong> a fost înregistrată cu succes.</p>
              </div>

              <!-- Order Details -->
              <div style="margin-bottom: 25px;">
                <h3 style="color: #19A852; font-size: 18px; margin-top: 0; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #f0f0f0;">Informații comandă</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666666; width: 140px;"><strong>Pachet:</strong></td>
                    <td style="padding: 8px 0;"><strong>${data.planTitle}</strong></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666;"><strong>Viteză:</strong></td>
                    <td style="padding: 8px 0;">${data.planSpeed}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666;"><strong>Preț lunar:</strong></td>
                    <td style="padding: 8px 0;">${data.planPrice} lei</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666;"><strong>Email:</strong></td>
                    <td style="padding: 8px 0;">${data.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666;"><strong>Telefon:</strong></td>
                    <td style="padding: 8px 0;">${data.phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666;"><strong>Adresa:</strong></td>
                    <td style="padding: 8px 0;">${data.address}</td>
                  </tr>
                  ${data.additionalInfo ? `
                  <tr>
                    <td style="padding: 8px 0; color: #666666;"><strong>Informații adiționale:</strong></td>
                    <td style="padding: 8px 0;">${data.additionalInfo}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              <!-- Next Steps -->
              <div style="background-color: #f2f9f5; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <h3 style="color: #19A852; font-size: 16px; margin-top: 0; margin-bottom: 10px;">Următorii pași</h3>
                <p style="margin: 0 0 10px 0;">Vă vom contacta în curând pentru a confirma detaliile comenzii și pentru a programa instalarea serviciului.</p>
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
          <title>Notificare comandă nouă pachet - ALTNET</title>
        </head>
        <body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f9f9f9; color: #333333;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #19A852 0%, #148A42 100%); padding: 20px; text-align: center;">
              <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 500;">ALTNET - Comandă nouă pachet primită</h2>
            </div>

            <!-- Content -->
            <div style="padding: 30px 25px;">
              <div style="background-color: #f2f9f5; border-left: 4px solid #19A852; padding: 12px 15px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; font-size: 16px;">A fost plasată o nouă comandă de pachet cu numărul <strong>${orderNumber}</strong>.</p>
              </div>

              <!-- Customer Details -->
              <div style="margin-bottom: 25px;">
                <h3 style="color: #19A852; font-size: 18px; margin-top: 0; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #f0f0f0;">Informații client</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666666; width: 140px;"><strong>Nume:</strong></td>
                    <td style="padding: 8px 0;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666;"><strong>Email:</strong></td>
                    <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #19A852; text-decoration: none;">${data.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666;"><strong>Telefon:</strong></td>
                    <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #19A852; text-decoration: none;">${data.phone}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666;"><strong>Adresa:</strong></td>
                    <td style="padding: 8px 0;">${data.address}</td>
                  </tr>
                </table>
              </div>

              <!-- Package Details -->
              <div style="margin-bottom: 25px;">
                <h3 style="color: #19A852; font-size: 18px; margin-top: 0; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #f0f0f0;">Detalii pachet</h3>
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #666666; width: 140px;"><strong>Pachet:</strong></td>
                      <td style="padding: 8px 0;"><strong>${data.planTitle}</strong></td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666666;"><strong>Viteză:</strong></td>
                      <td style="padding: 8px 0;">${data.planSpeed}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666666;"><strong>Preț lunar:</strong></td>
                      <td style="padding: 8px 0;">${data.planPrice} lei</td>
                    </tr>
                  </table>
                </div>
              </div>

              ${data.additionalInfo ? `
              <!-- Additional Information -->
              <div style="margin-bottom: 25px;">
                <h3 style="color: #19A852; font-size: 18px; margin-top: 0; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #f0f0f0;">Informații adiționale</h3>
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; white-space: pre-line;">
                  ${data.additionalInfo}
                </div>
              </div>
              ` : ''}

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
        name: "ALTNET Internet",
        address: process.env.EMAIL_USER!
      },
      to: data.email,
      subject: `Confirmare comandă pachet ${data.planTitle} #${orderNumber} - ALTNET`,
      html: customerEmailContent,
    });

    // Send email to admin
    await transporter.sendMail({
      from: {
        name: "ALTNET Internet",
        address: process.env.EMAIL_USER!
      },
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER!,
      subject: `Comandă nouă pachet ${data.planTitle} #${orderNumber} - ALTNET`,
      html: adminEmailContent,
      replyTo: data.email
    });

    // TODO: Here you would typically save the order to a database

    return NextResponse.json({
      success: true,
      message: "Package order placed successfully and emails sent"
    });
  } catch (error) {
    console.error("Error processing package order:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your order" },
      { status: 500 }
    );
  }
}
