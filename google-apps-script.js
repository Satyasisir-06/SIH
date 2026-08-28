/**
 * Google Apps Script for SIH 2026 Registration
 * Supports Dual Tabs with Auto-Fit & Clean Spreadsheet Styling:
 * 1. "Complete Teams" -> Official 6-member confirmed teams
 * 2. "Team Matchmaking & Solo" -> Solo participants and partial teams (1-5 members) looking for teammates
 *
 * HOW TO USE:
 * 1. Open your Google Sheet (https://sheets.new)
 * 2. Go to: Extensions > Apps Script
 * 3. Replace all existing code with this file
 * 4. Click 'Deploy' > 'New deployment' (or Manage Deployments > Edit > New Version)
 * 5. Select type: 'Web app'
 * 6. Set 'Execute as': 'Me', 'Who has access': 'Anyone'
 * 7. Click 'Deploy' and copy the Web App URL (ending in /exec)
 *
 * TIP: You can also select the "formatAllSheets" function in Apps Script editor and click "Run"
 * to instantly auto-fit and beautify all existing rows and columns!
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);

    var isMatchmaking = (data.type === "matchmaking");

    if (isMatchmaking) {
      // -------------------------------------------------------------
      // TAB 2: Solo & Partial Teams Matchmaking Pool
      // -------------------------------------------------------------
      var soloSheet = ss.getSheetByName("Team Matchmaking & Solo");
      if (!soloSheet) {
        soloSheet = ss.insertSheet("Team Matchmaking & Solo");
      }

      if (soloSheet.getLastRow() === 0) {
        var soloHeaders = [
          "Matchmaking ID",
          "Submitted At",
          "Contact / Lead Name",
          "Mobile Number (WhatsApp)",
          "Current Member Count",
          "Skills & Expertise",
          "Looking For / Notes",
          "Female Members",
          "Preferred Problem ID",
          "Problem Title",
          "Domain",
          "Member 1",
          "Member 2",
          "Member 3",
          "Member 4",
          "Member 5",
          "Full Details"
        ];
        soloSheet.appendRow(soloHeaders);
        styleHeaderRow(soloSheet, soloHeaders.length, "#1E3A8A"); // Navy Blue
      }

      soloSheet.appendRow([
        data.registrationId,
        data.submittedAt,
        data.teamLeader,
        "'" + (data.leaderPhone || "N/A"), // Leading single quote prevents scientific notation / formatting truncation
        data.memberCount,
        data.skills || "General",
        data.teamNeedNote || "Looking for teammates",
        data.femaleCount,
        data.problemStatementId,
        data.problemStatementTitle,
        data.problemStatementDomain,
        data.member1,
        data.member2,
        data.member3,
        data.member4,
        data.member5,
        data.members
      ]);

      // Apply auto-fit and clean layout styling
      formatSheet(soloSheet);

      return ContentService.createTextOutput(
        JSON.stringify({ status: "success", type: "matchmaking", registrationId: data.registrationId })
      ).setMimeType(ContentService.MimeType.JSON);

    } else {
      // -------------------------------------------------------------
      // TAB 1: Complete 6-Member Hackathon Teams
      // -------------------------------------------------------------
      var teamSheet = ss.getSheetByName("Complete Teams");
      if (!teamSheet) {
        var firstSheet = ss.getSheets()[0];
        if (firstSheet && firstSheet.getName() === "Sheet1" && firstSheet.getLastRow() === 0) {
          firstSheet.setName("Complete Teams");
          teamSheet = firstSheet;
        } else {
          teamSheet = ss.getSheetByName("Complete Teams") || ss.insertSheet("Complete Teams");
        }
      }

      if (teamSheet.getLastRow() === 0) {
        var teamHeaders = [
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
        teamSheet.appendRow(teamHeaders);
        styleHeaderRow(teamSheet, teamHeaders.length, "#800020"); // Burgundy
      }

      teamSheet.appendRow([
        data.registrationId,
        data.submittedAt,
        data.teamName,
        data.teamLeader,
        "'" + (data.leaderPhone || "N/A"), // Preserve full phone formatting
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

      // Apply auto-fit and clean layout styling
      formatSheet(teamSheet);

      return ContentService.createTextOutput(
        JSON.stringify({ status: "success", type: "full_team", registrationId: data.registrationId })
      ).setMimeType(ContentService.MimeType.JSON);
    }

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Styles the header row with background, white bold text, and proper height.
 */
function styleHeaderRow(sheet, numColumns, bgColor) {
  var headerRange = sheet.getRange(1, 1, 1, numColumns);
  headerRange.setFontWeight("bold");
  headerRange.setFontFamily("Segoe UI");
  headerRange.setFontSize(10);
  headerRange.setBackground(bgColor);
  headerRange.setFontColor("#FFFFFF");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  headerRange.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  sheet.setRowHeight(1, 38);
  sheet.setFrozenRows(1);
}

/**
 * Automatically adjusts column widths, enables clean text wrapping,
 * centers IDs & numbers, and adds comfortable breathing room.
 */
function formatSheet(sheet) {
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  if (lastRow < 1 || lastCol < 1) return;

  // 1. Auto-resize all columns based on content
  sheet.autoResizeColumns(1, lastCol);

  // 2. Add extra padding so columns never feel cramped
  for (var c = 1; c <= lastCol; c++) {
    var currentWidth = sheet.getColumnWidth(c);
    var paddedWidth = Math.max(currentWidth + 24, 120); // Minimum 120px per column
    
    // For wide description/details columns, set spacious minimums
    if (c >= lastCol - 1) {
      paddedWidth = Math.max(paddedWidth, 320); // Problem title or Full Details
    }
    sheet.setColumnWidth(c, paddedWidth);
  }

  // 3. Format data rows (Row 2 to lastRow)
  if (lastRow >= 2) {
    var dataRange = sheet.getRange(2, 1, lastRow - 1, lastCol);
    dataRange.setFontFamily("Segoe UI");
    dataRange.setFontSize(10);
    dataRange.setVerticalAlignment("middle");
    dataRange.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);

    // Center-align IDs, Dates, Counts, and Phone Numbers
    sheet.getRange(2, 1, lastRow - 1, 2).setHorizontalAlignment("center"); // ID & Date
    sheet.getRange(2, 4, lastRow - 1, 1).setHorizontalAlignment("center"); // Phone Number
    sheet.getRange(2, 5, lastRow - 1, 1).setHorizontalAlignment("center"); // Member Count
  }
}

/**
 * Run this function manually in Google Apps Script editor
 * to instantly auto-fit and beautify all existing sheets!
 */
function formatAllSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    var sh = sheets[i];
    if (sh.getLastRow() > 0) {
      var headerBg = sh.getName().includes("Matchmaking") ? "#1E3A8A" : "#800020";
      styleHeaderRow(sh, sh.getLastColumn(), headerBg);
      formatSheet(sh);
    }
  }
}
