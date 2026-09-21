import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { loanType, formData } = body;

    if (!loanType || !formData) {
      return NextResponse.json(
        { success: false, error: "Missing loanType or formData" },
        { status: 400 }
      );
    }

    const applicantName = formData.fullName || formData.name || "Applicant";
    const subject = `Full Application Submitted: ${loanType} - ${applicantName}`;
    const recipients = "milind.bibodi@bombaydc.com, milind.bibodi@bombaydc.com, parakh.choudhary@bombaydc.com, nobby@bomabydc.com, sunil@bomabydc.com";

    // Colors mapping for email
    const colors = {
      white: "#ffffff",
      mainTitleColor: "#333333",
      titleColor: "#333333",
      mainTitleCopyColor: "#707070",
      sectionBreak: "#fbf8f2",
      borderColor: "#d9d9d9",
      emerald: "#005A45",
    };

    // Build form data table rows
    const formRows = Object.entries(formData)
      .map(
        ([key, value]) => `
          <div style="margin-bottom: 12px; border-bottom: 1px solid ${colors.borderColor}; padding-bottom: 8px;">
            <span style="font-weight: bold; color: ${colors.titleColor}; display: inline-block; width: 180px; text-transform: capitalize;">
              ${key.replace(/([A-Z])/g, " $1").trim()}:
            </span>
            <span style="color: ${colors.mainTitleColor}; font-weight: 500;">
              ${typeof value === "object" ? JSON.stringify(value) : String(value || "N/A")}
            </span>
          </div>
        `
      )
      .join("");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            background-color: ${colors.sectionBreak};
            color: ${colors.mainTitleColor};
            font-family: Arial, sans-serif;
            padding: 20px;
            margin: 0;
          }
          .container {
            background-color: ${colors.white};
            padding: 30px;
            border-radius: 8px;
            border: 1px solid ${colors.borderColor};
            max-width: 650px;
            margin: 0 auto;
          }
          h1 {
            color: ${colors.mainTitleColor};
            border-bottom: 3px solid ${colors.emerald};
            padding-bottom: 10px;
            margin-top: 0;
          }
          .footer {
            margin-top: 25px;
            font-size: 13px;
            color: ${colors.mainTitleCopyColor};
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div style="text-align: left; padding-bottom: 16px; margin-bottom: 20px; border-bottom: 3px solid ${colors.emerald};">
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

          <h1>Loan Application Received</h1>
          <p style="color: ${colors.mainTitleCopyColor};">
            A new full application for <strong>${loanType}</strong> has been submitted.
          </p>

          ${formRows}

          <div class="footer">
            <p>Sent via BDC Capital Loan Application Portal</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 1. Send email via Gmail SMTP
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: Number(process.env.SMTP_PORT) || 587,
          secure: false,
          name: "bombaydc.com",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        await transporter.sendMail({
          from: `"BDC Capital" <${process.env.SMTP_USER}>`,
          to: recipients,
          subject: subject,
          html: htmlContent,
        });
        console.log("Submit application email sent via SMTP successfully");
      } catch (emailErr) {
        console.error("Error sending application email via SMTP:", emailErr);
      }
    }

    // 2. Post to Google Apps Script if URL exists
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (scriptUrl) {
      try {
        const payload = JSON.stringify({
          loanType,
          formData,
          submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        });

        await fetch(scriptUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: payload,
          redirect: "follow",
        });
      } catch (gasErr) {
        console.error("Error submitting to Google Apps Script:", gasErr);
      }
    }

    return NextResponse.json({ success: true, message: "Application submitted successfully" });
  } catch (error) {
    console.error("Submit application error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
