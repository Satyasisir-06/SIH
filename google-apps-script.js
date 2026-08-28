/**
 * Google Apps Script for SIH 2026 Registration
 * Supports Dual Tabs:
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
 * 8. Add the URL to .env on Vercel/Local as GOOGLE_SHEETS_WEBHOOK_URL
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

        var soloRange = soloSheet.getRange(1, 1, 1, soloHeaders.length);
        soloRange.setFontWeight("bold");
        soloRange.setBackground("#1E3A8A"); // Navy blue for matchmaking tab
        soloRange.setFontColor("#FFFFFF");
        soloRange.setHorizontalAlignment("center");
        soloSheet.setFrozenRows(1);
      }

      soloSheet.appendRow([
        data.registrationId,
        data.submittedAt,
        data.teamLeader,
        data.leaderPhone || "N/A",
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

      return ContentService.createTextOutput(
        JSON.stringify({ status: "success", type: "matchmaking", registrationId: data.registrationId })
      ).setMimeType(ContentService.MimeType.JSON);

    } else {
      // -------------------------------------------------------------
      // TAB 1: Complete 6-Member Hackathon Teams
      // -------------------------------------------------------------
      var teamSheet = ss.getSheetByName("Complete Teams");
      if (!teamSheet) {
        // Use active sheet if first sheet is default 'Sheet1'
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

        var teamRange = teamSheet.getRange(1, 1, 1, teamHeaders.length);
        teamRange.setFontWeight("bold");
        teamRange.setBackground("#800020"); // Burgundy for full teams
        teamRange.setFontColor("#FFFFFF");
        teamRange.setHorizontalAlignment("center");
        teamSheet.setFrozenRows(1);
      }

      teamSheet.appendRow([
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
        JSON.stringify({ status: "success", type: "full_team", registrationId: data.registrationId })
      ).setMimeType(ContentService.MimeType.JSON);
    }

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
