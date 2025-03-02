import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const adminEmailTemplate = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>New Contact Form Submission</title>
    <style>
      body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; color: #374151; background-color: #F9FAFB; }
      .container { max-width: 600px; margin: 20px auto; padding: 32px; background: white; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
      .header { font-size: 28px; font-weight: bold; color: #111827; margin-bottom: 24px; text-align: center; }
      .field { margin-bottom: 24px; border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; }
      .label { font-weight: 600; color: #4B5563; display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
      .content { background-color: #F9FAFB; padding: 16px; border-radius: 8px; }
      .message { white-space: pre-wrap; }
      .emoji { font-size: 1.2em; }
      .highlight { background: linear-gradient(120deg, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0.1) 100%); padding: 0 4px; border-radius: 4px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">📨 New Message from Portfolio</div>
      <div class="field">
        <div class="label">👤 From:</div>
        <div class="content highlight">${data.name} (${data.email})</div>
      </div>
      <div class="field">
        <div class="label">📝 Subject:</div>
        <div class="content highlight">${data.subject}</div>
      </div>
      <div class="field">
        <div class="label">💌 Message:</div>
        <div class="content message">${data.message}</div>
      </div>
    </div>
  </body>
</html>`;

const userEmailTemplate = (data: { name: string }) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Thank you for your message</title>
    <style>
      body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; color: #374151; background-color: #F9FAFB; }
      .container { max-width: 600px; margin: 20px auto; padding: 32px; background: white; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
      .header { font-size: 28px; font-weight: bold; color: #111827; margin-bottom: 24px; text-align: center; }
      .content { margin-bottom: 32px; padding: 24px; background: #F9FAFB; border-radius: 12px; }
      .greeting { font-size: 20px; font-weight: 600; color: #111827; margin-bottom: 16px; }
      .message { margin-bottom: 24px; }
      .social { background: #F3F4F6; padding: 16px; border-radius: 8px; text-align: center; margin-bottom: 24px; }
      .signature { font-weight: 600; color: #4B5563; text-align: right; }
      .emoji { font-size: 1.2em; }
      .highlight { background: linear-gradient(120deg, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0.1) 100%); padding: 0 4px; border-radius: 4px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">🎉 Thank You for Reaching Out!</div>
      <div class="content">
        <div class="greeting">👋 Hi ${data.name}!</div>
        <div class="message">
          <p>Thank you for contacting me through my portfolio website. I've received your message and will get back to you as soon as possible!</p>
          <p>In the meantime, here's what you can expect:</p>
        </div>
        <div class="social">
          ⏱️ I typically respond within <span class="highlight">24-48 hours</span><br>
          💼 For urgent matters, you can reach me on <a href="https://www.linkedin.com/in/aloysius-chew-880609244/" style="color: inherit; text-decoration: none;"><span class="highlight">LinkedIn</span></a><br>
          📺 Feel free to check out my <a href="https://www.youtube.com/@chikennuggetcurrysauce" style="color: inherit; text-decoration: none;"><span class="highlight">YouTube channel</span></a> where I share my creative side
        </div>
      </div>
      <div class="signature">
        <p>Best regards,<br>✨ Aloysius Chew</p>
      </div>
    </div>
  </body>
</html>`;

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Send email to admin (you)
    const adminEmail = await resend.emails.send({
      from: "Portfolio Contact <no-reply@resend.dev>",
      to: ["aloysiuschewzhiyong@gmail.com"],
      subject: `📨 Portfolio Contact: ${subject}`,
      replyTo: email,
      html: adminEmailTemplate({ name, email, subject, message }),
    });

    // Send confirmation email to user
    const userEmail = await resend.emails.send({
      from: "Aloysius Chew <no-reply@resend.dev>",
      to: [email],
      subject: "🎉 Thank you for your message!",
      html: userEmailTemplate({ name }),
    });

    return NextResponse.json({ adminEmail, userEmail });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
