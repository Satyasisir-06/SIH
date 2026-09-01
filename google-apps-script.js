/**
 * Google Apps Script for SIH 2026 Registration
 * Single Consolidated Sheet (NO NEW TABS / PAGES CREATED)
 *
 * HOW IT WORKS:
 * - Always appends registrations to your PRIMARY active sheet (the first tab).
 * - Never creates unwanted new tabs/pages.
 * - Handles both Full Teams and Solo/Partial Matchmaking registrations in one clean table.
 * - Automatically auto-fits and expands columns with generous padding so data is never cramped.
 *
 * HOW TO USE:
 * 1. Open your Google Sheet
 * 2. Go to: Extensions > Apps Script
 * 3. Replace all existing code with this file
 * 4. Click 'Deploy' > 'Manage deployments' > 'Edit (Pencil icon)' > Version: 'New version' > 'Deploy'
 *
 * RECOVERY TOOL:
 * If your data was previously split across multiple tabs, select "consolidateAllTabsIntoOne"
 * in the Apps Script toolbar dropdown and click "▷ Run" to merge all rows into your main sheet!
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    // ALWAYS use the primary first sheet — NEVER create extra tabs!
    var sheet = ss.getSheets()[0];
    var data = JSON.parse(e.postData.contents);

    var isMatchmaking = (data.type === "matchmaking");
    var regTypeLabel = isMatchmaking ? "Solo / Matchmaking Pool" : "Full Team (6 Members)";

    // Setup headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Registration ID",
        "Registration Type",
        "Submitted At",
        "Team / Contact Name",
        "Leader / Contact Mobile",
        "Members Count",
        "Female Members",
        "Skills & Expertise",
        "Teammates Needed / Notes",
        "Problem ID",
        "Problem Title",
        "Domain",
        "Member 1 (Primary Contact)",
        "Member 2",
        "Member 3",
        "Member 4",
        "Member 5",
        "Member 6",
        "Full Team Roster"
      ];
      sheet.appendRow(headers);
      styleHeaderRow(sheet, headers.length);
    }

    // Append new registration record
    sheet.appendRow([
      data.registrationId,
      regTypeLabel,
      data.submittedAt,
      data.teamName || data.teamLeader || "N/A",
      "'" + (data.leaderPhone || "N/A"), // Leading quote ensures complete 10-digit mobile number format
      data.memberCount,
      data.femaleCount,
      data.skills || (isMatchmaking ? "General" : "Full Squad"),
      data.teamNeedNote || (isMatchmaking ? "Looking for teammates" : "Full 6-member squad confirmed"),
      data.problemStatementId || "N/A",
      data.problemStatementTitle || (isMatchmaking ? "To be decided after team formation" : "N/A"),
      data.problemStatementDomain || "N/A",
      data.member1 || "-",
      data.member2 || "-",
      data.member3 || "-",
      data.member4 || "-",
      data.member5 || "-",
      data.member6 || "-",
      data.members || "-"
    ]);

    // Apply auto-fit and spacious formatting
    formatSheet(sheet);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", registrationId: data.registrationId })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Styles the header row with clean Burgundy background, white bold text, and proper height.
 */
function styleHeaderRow(sheet, numColumns) {
  var headerRange = sheet.getRange(1, 1, 1, numColumns);
  headerRange.setFontWeight("bold");
  headerRange.setFontFamily("Segoe UI");
  headerRange.setFontSize(10);
  headerRange.setBackground("#800020"); // Official Hackathon Burgundy
  headerRange.setFontColor("#FFFFFF");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  headerRange.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  sheet.setRowHeight(1, 40);
  sheet.setFrozenRows(1);
}

/**
 * Automatically adjusts column widths with generous padding,
 * enables clean text wrapping, and centers IDs & numbers.
 */
function formatSheet(sheet) {
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  if (lastRow < 1 || lastCol < 1) return;

  // 1. Auto-resize all columns based on content
  sheet.autoResizeColumns(1, lastCol);

  // 2. Add extra padding so columns are spacious and never cramped
  for (var c = 1; c <= lastCol; c++) {
    var currentWidth = sheet.getColumnWidth(c);
    var paddedWidth = Math.max(currentWidth + 28, 130); // Generous minimum 130px per column
    
    // For wide text columns (Skills, Notes, Problem Title, Full Roster), give extra room
    if (c === 8 || c === 9 || c === 11 || c === lastCol) {
      paddedWidth = Math.max(paddedWidth, 280);
    }
    sheet.setColumnWidth(c, paddedWidth);
  }

  // 3. Format data rows
  if (lastRow >= 2) {
    var dataRange = sheet.getRange(2, 1, lastRow - 1, lastCol);
    dataRange.setFontFamily("Segoe UI");
    dataRange.setFontSize(10);
    dataRange.setVerticalAlignment("middle");
    dataRange.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);

    // Center-align ID, Type, Date, Phone Number, and Counts
    sheet.getRange(2, 1, lastRow - 1, 3).setHorizontalAlignment("center"); // ID, Type, Date
    sheet.getRange(2, 5, lastRow - 1, 3).setHorizontalAlignment("center"); // Phone, Counts
    sheet.getRange(2, 10, lastRow - 1, 1).setHorizontalAlignment("center"); // Problem ID
  }
}

/**
 * ONE-CLICK CONSOLIDATION TOOL:
 * Merges data from all other tabs back into your primary first sheet!
 * Run this function once if you have data spread across multiple tabs.
 */
function consolidateAllTabsIntoOne() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var mainSheet = sheets[0];

  if (mainSheet.getLastRow() === 0) {
    var headers = [
      "Registration ID",
      "Registration Type",
      "Submitted At",
      "Team / Contact Name",
      "Leader / Contact Mobile",
      "Members Count",
      "Female Members",
      "Skills & Expertise",
      "Teammates Needed / Notes",
      "Problem ID",
      "Problem Title",
      "Domain",
      "Member 1 (Primary Contact)",
      "Member 2",
      "Member 3",
      "Member 4",
      "Member 5",
      "Member 6",
      "Full Team Roster"
    ];
    mainSheet.appendRow(headers);
    styleHeaderRow(mainSheet, headers.length);
  }

  // Loop through secondary sheets and append non-header rows to main sheet
  for (var i = 1; i < sheets.length; i++) {
    var otherSheet = sheets[i];
    var lastRow = otherSheet.getLastRow();
    var lastCol = otherSheet.getLastColumn();
    if (lastRow > 1) {
      var otherData = otherSheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
      for (var r = 0; r < otherData.length; r++) {
        var row = otherData[r];
        if (row[0]) { // If row has a registration ID
          mainSheet.appendRow(row);
        }
      }
    }
  }

  formatSheet(mainSheet);
}
