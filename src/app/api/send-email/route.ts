
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, loanType, mobileNumber, email, dob } = body;

    console.log("SMTP Debug Info:", {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER ? "***" : "MISSING",
      pass: process.env.SMTP_PASS ? "***" : "MISSING",
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      name: 'bombaydc.com',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const subject = `Lead for ${loanType} from ${fullName}`;
    const recipients = "milind.bibodi@bombaydc.com, parakh.choudhary@bombaydc.com, nobby@bomabydc.com, sunil@bomabydc.com";

    // Colors mapping
    const colors = {
      background: "#fbf8f2",
      foreground: "#333333",
      white: "#ffffff",
      mainTitleColor: "#333333",
      titleColor: "#333333",
      mainTitleCopyColor: "#707070",
      titleCopyColor: "#707070",
      sectionBreak: "#fbf8f2",
      borderColor: "#d9d9d9",
      orange: "#004D47",
    };

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            background-color: ${colors.sectionBreak};
            color: ${colors.foreground};
            font-family: Arial, sans-serif;
            padding: 20px;
            margin: 0;
          }
          .container {
            background-color: ${colors.white};
            padding: 30px;
            border-radius: 8px;
            border: 1px solid ${colors.borderColor};
            max-width: 600px;
            margin: 0 auto;
          }
          h1 {
            color: ${colors.mainTitleColor};
            border-bottom: 2px solid ${colors.orange};
            padding-bottom: 10px;
            margin-top: 0;
          }
          p {
            color: ${colors.mainTitleCopyColor};
            font-size: 16px;
            line-height: 1.5;
          }
          .detail-row {
            margin-bottom: 12px;
            border-bottom: 1px solid ${colors.borderColor};
            padding-bottom: 8px;
          }
          .label {
            font-weight: bold;
            color: ${colors.titleColor};
            display: inline-block;
            width: 140px;
          }
          .value {
            color: ${colors.mainTitleColor};
          }
          .footer {
            margin-top: 20px;
            font-size: 14px;
            color: ${colors.titleCopyColor};
            text-align: center;
          }

        </style>
      </head>
      <body>
        <div class="container">
          <div style="text-align: left; padding-bottom: 16px; margin-bottom: 20px; border-bottom: 2px solid ${colors.orange};">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 80" width="200" height="47">
              <g transform="translate(6, 8)">
                <rect x="2" y="2" width="56" height="56" rx="14" fill="none" stroke="#005A45" stroke-width="2.5"/>
                <path d="M 18 45 L 18 19 C 18 19 28 19 35 19 C 41 19 45 22 45 27 C 45 31 41 33 36 34 C 42 35 46 38 46 43 C 46 48 41 51 34 51 L 18 51 Z" fill="none" stroke="#005A45" stroke-width="2" stroke-linejoin="round"/>
                <path d="M 14 43 C 22 43 28 34 34 34 C 40 34 44 22 48 17" fill="none" stroke="#2A9D8F" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="48" cy="17" r="2.5" fill="#2A9D8F"/>
                <text x="72" y="38" font-family="Arial, sans-serif" font-weight="700" font-size="24" letter-spacing="0.8px" fill="#005A45">BDC CAPITAL</text>
                <text x="73" y="52" font-family="Arial, sans-serif" font-weight="600" font-size="9" letter-spacing="2.5px" fill="#707070">NBFC • FINANCIAL SERVICES</text>
              </g>
            </svg>
          </div>

          <h1>New Lead Generated</h1>
          <p>A new loan application process has been started.</p>
          
          <div class="detail-row">
            <span class="label">Full Name:</span>
            <span class="value">${fullName || "N/A"}</span>
          </div>
          <div class="detail-row">
            <span class="label">Loan Type:</span>
            <span class="value">${loanType || "N/A"}</span>
          </div>
          <div class="detail-row">
            <span class="label">Mobile Number:</span>
            <span class="value">${mobileNumber || "N/A"}</span>
          </div>
          ${email ? `
          <div class="detail-row">
            <span class="label">Email:</span>
            <span class="value">${email}</span>
          </div>` : ''}
           ${dob ? `
          <div class="detail-row">
            <span class="label">Date of Birth:</span>
            <span class="value">${dob}</span>
          </div>` : ''}
          
          <div class="footer">
            <p>This is an automated message from the BDC Capital Lead System.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send mail
    await transporter.sendMail({
      from: `"BDC Capital" <${process.env.SMTP_USER}>`,
      replyTo: email || undefined,
      to: recipients,
      subject: subject,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}
