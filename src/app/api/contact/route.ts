import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, subject, message } = body;

        // Validation
        if (!name || !email || !phone || !subject || !message) {
            return NextResponse.json(
                { error: "Missing required fields.", missing: Object.keys(body).filter(k => !body[k]) },
                { status: 400 }
            );
        }

        // Check SMTP config
        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.warn("Email variables missing!");
            return NextResponse.json(
                { error: "Email service is not configured on the server.", details: "Missing SMTP credentials in .env file." },
                { status: 500 }
            );
        }

        // ── 1. Send email via Nodemailer ──────────────────────────────
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email 1: Clinic notification
        const clinicEmailPromise = transporter.sendMail({
            from: `"Wink Eye Care Website" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_TO || process.env.SMTP_USER,
            replyTo: email,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 12px;">
                    <h2 style="color: #022a35; margin-bottom: 4px;">New Message from Wink Eye Care Website</h2>
                    <p style="color: #888; font-size: 13px; margin-bottom: 24px;">Submitted via the contact form</p>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #022a35; width: 130px;">Name</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #022a35;">Email</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333;"><a href="mailto:${email}">${email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #022a35;">Phone</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333;"><a href="tel:${phone}">${phone}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #022a35;">Subject</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333;">${subject}</td>
                        </tr>
                    </table>
                    <div style="margin-top: 20px;">
                        <p style="font-weight: bold; color: #022a35; margin-bottom: 8px;">Message</p>
                        <div style="background: #f8fafb; border-left: 4px solid #0a7e9a; border-radius: 6px; padding: 16px; color: #333; line-height: 1.7; white-space: pre-wrap;">${message}</div>
                    </div>
                    <p style="margin-top: 24px; color: #aaa; font-size: 12px; text-align: center;">Wink Eye Care &amp; Optical · 1151 Old York Rd, Suite 103, Abington, PA 19001</p>
                </div>
            `,
        });

        // Email 2: Confirmation to the patient
        const confirmationEmailPromise = transporter.sendMail({
            from: `"Wink Eye Care & Optical" <${process.env.SMTP_USER}>`,
            to: email,
            subject: `We received your message — Wink Eye Care & Optical`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; border-radius: 16px; overflow: hidden; border: 1px solid #e0e0e0;">
                    <!-- Header -->
                    <div style="background: #022a35; padding: 32px 32px 24px; text-align: center;">
                        <p style="color: #ffffff; font-size: 28px; font-weight: 900; margin: 0; letter-spacing: -0.5px;">wink</p>
                        <p style="color: #7ec8d8; font-size: 13px; margin: 4px 0 0; font-style: italic;">eye care &amp; optical</p>
                    </div>
                    <!-- Body -->
                    <div style="padding: 32px;">
                        <h2 style="color: #022a35; font-size: 22px; margin-bottom: 8px;">Hi ${name}, we got your message! 👋</h2>
                        <p style="color: #555; line-height: 1.7; margin-bottom: 20px;">
                            Thank you for reaching out to Wink Eye Care &amp; Optical. A member of our team will review your inquiry and get back to you as soon as possible — usually within <strong>1 business day</strong>.
                        </p>
                        <!-- Summary box -->
                        <div style="background: #f8fafb; border-radius: 10px; padding: 20px; margin-bottom: 24px; border: 1px solid #e8f0f2;">
                            <p style="margin: 0 0 10px; font-weight: bold; color: #022a35; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em;">Your Submission</p>
                            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                <tr><td style="padding: 6px 0; color: #888; width: 90px;">Subject</td><td style="color: #333; font-weight: 600;">${subject}</td></tr>
                                <tr><td style="padding: 6px 0; color: #888;">Phone</td><td style="color: #333;">${phone}</td></tr>
                            </table>
                        </div>
                        <!-- CTA -->
                        <div style="text-align: center; margin-bottom: 28px;">
                            <a href="https://calendar.app.google/Ke2Rg6r8pgH8d5MCA"
                               style="display: inline-block; background: #022a35; color: #ffffff; font-weight: bold; font-size: 15px; padding: 14px 32px; border-radius: 50px; text-decoration: none;">
                                Schedule Appointment Online →
                            </a>
                        </div>
                        <p style="color: #888; font-size: 13px; line-height: 1.6;">
                            Prefer to call? Reach us at <a href="tel:215-935-6320" style="color: #0a7e9a;">215-935-6320</a><br>
                            or email <a href="mailto:winkeyecare20@gmail.com" style="color: #0a7e9a;">winkeyecare20@gmail.com</a>
                        </p>
                    </div>
                    <!-- Footer -->
                    <div style="background: #f0f5f6; padding: 16px 32px; text-align: center;">
                        <p style="color: #aaa; font-size: 11px; margin: 0;">1151 Old York Rd, Suite 103 · Abington, PA 19001</p>
                    </div>
                </div>
            `,
        });

        // ── 2. Log to Google Sheets (fire in parallel) ─────────────────
        const sheetsPromise = process.env.GOOGLE_SHEET_WEBHOOK
            ? fetch(process.env.GOOGLE_SHEET_WEBHOOK, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, subject, message }),
            }).catch(err => console.error("Sheets webhook error:", err)) // non-blocking
            : Promise.resolve();

        // Wait for both to finish
        await Promise.all([clinicEmailPromise, confirmationEmailPromise, sheetsPromise]);

        return NextResponse.json(
            { success: true, message: "Thank you for contacting Wink Eye Care. We will follow up with you shortly." },
            { status: 200 }
        );

    } catch (error) {
        console.error("Contact route error:", error);
        return NextResponse.json(
            { error: "Failed to send email.", details: (error as Error).message },
            { status: 500 }
        );
    }
}
