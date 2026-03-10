// ============================================================
// Wink Eye Care — Contact Form → Google Sheet Logger
// Paste this entire script into script.google.com
// Then: Deploy > New deployment > Web App
//   - Execute as: Me
//   - Who has access: Anyone
// Copy the Web App URL and add it to your .env.local as:
//   GOOGLE_SHEET_WEBHOOK=<paste url here>
// ============================================================

const SHEET_NAME = "Inquiries";

const STATUSES = [
  "🆕 New Inquiry",
  "📞 Followed Up",
  "📅 Appointment Booked",
  "✅ Appointment Completed",
  "⏳ No Response",
  "❌ Closed"
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Create sheet if it doesn't exist
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      setupSheet(sheet);
    }

    // Append row
    const row = [
      new Date(),           // A - Timestamp
      data.name || "",      // B - Name
      data.email || "",     // C - Email
      data.phone || "",     // D - Phone
      data.subject || "",   // E - Subject
      data.message || "",   // F - Message
      STATUSES[0],          // G - Status (always starts as "New Inquiry")
      ""                    // H - Notes (blank, for manual use)
    ];

    sheet.appendRow(row);

    // Apply dropdown validation to the new status cell
    const lastRow = sheet.getLastRow();
    applyStatusDropdown(sheet, lastRow);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: lastRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function setupSheet(sheet) {
  // Header row
  const headers = [
    "Timestamp", "Name", "Email", "Phone",
    "Subject", "Message", "Status", "Notes"
  ];
  sheet.appendRow(headers);

  // Style the header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#022a35");
  headerRange.setFontColor("#ffffff");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);

  // Column widths (A-H)
  sheet.setColumnWidth(1, 160); // Timestamp
  sheet.setColumnWidth(2, 150); // Name
  sheet.setColumnWidth(3, 210); // Email
  sheet.setColumnWidth(4, 130); // Phone
  sheet.setColumnWidth(5, 180); // Subject
  sheet.setColumnWidth(6, 320); // Message
  sheet.setColumnWidth(7, 200); // Status
  sheet.setColumnWidth(8, 250); // Notes

  // Freeze header row
  sheet.setFrozenRows(1);
}

function applyStatusDropdown(sheet, row) {
  const cell = sheet.getRange(row, 7); // Column G = Status
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(STATUSES, true)
    .setAllowInvalid(false)
    .build();
  cell.setDataValidation(rule);

  // Color the "New Inquiry" cell green
  cell.setBackground("#d9f5e5");
  cell.setFontColor("#0a5c36");
}

// Run once manually to format the whole Status column if needed
function applyDropdownsToAll() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) return;
  const lastRow = sheet.getLastRow();
  for (let i = 2; i <= lastRow; i++) {
    applyStatusDropdown(sheet, i);
  }
}
