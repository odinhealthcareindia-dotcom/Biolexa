import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";

export async function POST(req) {
    try {
        const { name, email, phone, message } = await req.json();

        const transporter = createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.CONTACT_EMAIL || "biolexaindia@gmail.com",
            subject: `New Contact Form Message from ${name}`,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #0056b3;">New Contact Message</h2>

          <h3>Sender Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>

          <h3>Message:</h3>
          <p style="background: #f5f5f5; padding: 12px; border-radius: 6px;">
            ${message}
          </p>

          <br />
          <p style="font-size: 12px; color: #777;">
            This message was sent from your website contact form.
          </p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Email sending error:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}