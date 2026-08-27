/**
 * Google Apps Script for SIH 2026 Registration
 *
 * HOW TO USE:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. Go to: Extensions > Apps Script
 * 3. Delete any default code and paste this entire file
 * 4. Click 'Deploy' > 'New deployment' (or Manage deployments > Edit > New version if updating)
 * 5. Select type: 'Web app'
 * 6. Set 'Execute as': 'Me'
 * 7. Set 'Who has access': 'Anyone'
 * 8. Click 'Deploy', authorize permissions, and copy the Web App URL (ending in /exec)
 * 9. Paste the URL into your .env file on Vercel/local as:
 *    GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/.../exec"
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Initialize header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Registration ID",
        "Submitted At",
        "Team Name",
        "Team Leader",
        "Leader Mobile",
        "Members Count",
        "Female Members",
        "Problem ID",
        "Problem Title",
        "Domain",
        "Member 1 (Leader)",
        "Member 2",
        "Member 3",
        "Member 4",
        "Member 5",
        "Member 6",
        "Full Team Details"
      ];
      sheet.appendRow(headers);
      
      // Styling header row: Burgundy background with gold/white text
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#800020");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    // Append new registration record
    sheet.appendRow([
      data.registrationId,
      data.submittedAt,
      data.teamName,
      data.teamLeader,
      data.leaderPhone || "N/A",
      data.memberCount,
      data.femaleCount,
      data.problemStatementId,
      data.problemStatementTitle,
      data.problemStatementDomain,
      data.member1,
      data.member2,
      data.member3,
      data.member4,
      data.member5,
      data.member6,
      data.members
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", registrationId: data.registrationId })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
