import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter with Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use specific host/port for custom SMTP
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your app password (not your regular Gmail password)
  },
});

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Numele, email-ul și mesajul sunt obligatorii' },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = {
      from: `"Contact ALTNET" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER, // Send to recipient or fall back to sender
      replyTo: body.email,
      subject: `Nou mesaj de contact: ${body.subject || 'Fără subiect'}`,
      text: `
Nume: ${body.name}
Email: ${body.email}
Telefon: ${body.phone || 'Nu este specificat'}
Subiect: ${body.subject || 'Nu este specificat'}

Mesaj:
${body.message}
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mesaj nou de contact</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f9f9f9; color: #333333;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #19A852 0%, #148A42 100%); padding: 30px 20px; text-align: center;">
      <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 500;">ALTNET - Mesaj Nou de Contact</h2>
    </div>

    <!-- Content -->
    <div style="padding: 30px 25px;">
      <div style="background-color: #f2f9f5; border-left: 4px solid #19A852; padding: 12px 15px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
        <p style="margin: 0; font-size: 16px;">Aveți un mesaj nou de la <strong>${body.name}</strong> prin formularul de contact al website-ului.</p>
      </div>

      <!-- Contact Details -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
        <tr>
          <td style="padding: 12px 15px; border-bottom: 1px solid #eeeeee; width: 140px;">
            <strong style="color: #555555;">Nume:</strong>
          </td>
          <td style="padding: 12px 15px; border-bottom: 1px solid #eeeeee;">
            ${body.name}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 15px; border-bottom: 1px solid #eeeeee; width: 140px;">
            <strong style="color: #555555;">Email:</strong>
          </td>
          <td style="padding: 12px 15px; border-bottom: 1px solid #eeeeee;">
            <a href="mailto:${body.email}" style="color: #19A852; text-decoration: none;">${body.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 15px; border-bottom: 1px solid #eeeeee; width: 140px;">
            <strong style="color: #555555;">Telefon:</strong>
          </td>
          <td style="padding: 12px 15px; border-bottom: 1px solid #eeeeee;">
            ${body.phone ? `<a href="tel:${body.phone}" style="color: #19A852; text-decoration: none;">${body.phone}</a>` : 'Nu este specificat'}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 15px; border-bottom: 1px solid #eeeeee; width: 140px;">
            <strong style="color: #555555;">Subiect:</strong>
          </td>
          <td style="padding: 12px 15px; border-bottom: 1px solid #eeeeee;">
            ${body.subject || 'Nu este specificat'}
          </td>
        </tr>
      </table>

      <!-- Message -->
      <div style="margin-top: 25px;">
        <h3 style="color: #19A852; font-size: 18px; margin-top: 0; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #f0f0f0;">Mesaj</h3>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; white-space: pre-line;">
          ${body.message}
        </div>
      </div>

      <!-- Reply button -->
      <div style="margin-top: 30px; text-align: center;">
        <a href="mailto:${body.email}" style="display: inline-block; background-color: #19A852; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 8px; font-weight: 500;">Răspunde acestui mesaj</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #eeeeee;">
      <p style="margin: 0; color: #777777; font-size: 14px;">© ${new Date().getFullYear()} ALTNET - Toate drepturile rezervate</p>
      <p style="margin: 8px 0 0; color: #999999; font-size: 13px;">
        Acest email a fost generat automat prin formularul de contact de pe <a href="https://altnet.md" style="color: #19A852; text-decoration: none;">www.altnet.md</a>
      </p>
    </div>
  </div>
</body>
</html>
      `,
    };

    // Send the email
    await transporter.sendMail(emailContent);

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'A apărut o eroare la trimiterea mesajului' },
      { status: 500 }
    );
  }
}
