/**
 * Google Apps Script — Loan Application to Google Sheets
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet (or open an existing one)
 * 2. Go to Extensions → Apps Script
 * 3. Delete any existing code and paste this entire file
 * 4. Click Deploy → New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Click Deploy, authorize when prompted
 * 6. Copy the Web app URL
 * 7. Paste the URL into your project's .env.local as GOOGLE_SCRIPT_URL
 */

// Sheet tab names mapped from loan pathname → display name
const SHEET_NAMES = {
  "personal-loan": "Personal Loan",
  "business-loan": "Business Loan",
  "housing-loan": "Housing Loan",
  "vehicle-loan": "Vehicle Loan",
  "loan-against-property": "Loan Against Property",
  "cash-credit-facility": "Cash Credit Facility",
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const loanType = data.loanType || "Unknown";
    const sheetName = SHEET_NAMES[loanType] || loanType;

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(sheetName);

    // Create the sheet tab if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    // Build the row data (exclude loanType since it's the sheet tab name)
    const formData = data.formData || {};
    const submittedAt = data.submittedAt || new Date().toISOString();

    // Get existing headers (if any)
    let headers = [];
    if (sheet.getLastRow() > 0) {
      headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    }

    // Determine all keys we need columns for
    const allKeys = Object.keys(formData);

    // Add "Submitted At" as the first column if not present
    if (headers.length === 0) {
      headers = ["Submitted At", ...allKeys];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

      // Bold the header row
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    } else {
      // Check for new keys not yet in headers and add them
      let headersChanged = false;
      allKeys.forEach(function (key) {
        if (headers.indexOf(key) === -1) {
          headers.push(key);
          headersChanged = true;
        }
      });

      if (headersChanged) {
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      }
    }

    // Build the row based on header order
    const row = headers.map(function (header) {
      if (header === "Submitted At") return submittedAt;
      return formData[header] !== undefined ? formData[header] : "";
    });

    // Append the row
    sheet.appendRow(row);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Allow GET requests for testing
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "ok",
      message:"BDC Capital Loan Application API is running",
    })
  ).setMimeType(ContentService.MimeType.JSON);
}
