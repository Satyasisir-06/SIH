import type { RegistrationInput } from "./registration-schema";
import type { SubmitRegistrationResult } from "./registration.functions";
import { buildSheetPayload, appendToGoogleSheets } from "./google-sheets.server";

function generateRegistrationId(type: "full_team" | "matchmaking" = "full_team") {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  for (const b of bytes) suffix += alphabet[b % alphabet.length];
  return type === "matchmaking" ? `SIH26-POOL-${suffix}` : `SIH26-${suffix}`;
}

export async function persistRegistration(
  data: RegistrationInput,
): Promise<SubmitRegistrationResult> {
  const isMatchmaking = data.registrationType === "matchmaking";

  if (!isMatchmaking) {
    // Validate full team requirements
    const femaleCount = data.members.filter((m) => m.gender === "Female").length;
    if (femaleCount < 1) {
      throw new Error("At least one female team member is mandatory for full team registration.");
    }
    if (data.members.length !== 6) {
      throw new Error("A full team must have exactly 6 members.");
    }
    if (!data.problemStatementId?.trim()) {
      throw new Error("Problem statement ID is required for full team registration.");
    }
    if (!data.problemStatementTitle?.trim()) {
      throw new Error("Problem statement title is required for full team registration.");
    }
  } else {
    if (data.members.length < 1 || data.members.length > 5) {
      throw new Error("Matchmaking pool registration requires between 1 and 5 members.");
    }
  }

  const registrationId = generateRegistrationId(data.registrationType);
  const effectiveProblemId = isMatchmaking ? "N/A" : (data.problemStatementId || "N/A");
  const effectiveProblemTitle = isMatchmaking
    ? "To be selected after team formation"
    : (data.problemStatementTitle || "N/A");
  const effectiveDomain = isMatchmaking ? "N/A" : (data.problemStatementDomain || "N/A");

  const sanitizedData: RegistrationInput = {
    ...data,
    problemStatementId: effectiveProblemId,
    problemStatementTitle: effectiveProblemTitle,
    problemStatementDomain: effectiveDomain,
  };

  // Primary registration sync: Google Sheets
  const sheetPayload = buildSheetPayload(sanitizedData, registrationId);
  try {
    await appendToGoogleSheets(sheetPayload);
  } catch (sheetErr) {
    console.error("[Registration] Google Sheets submission error:", sheetErr);
    throw new Error("Failed to record registration in Google Sheets. Please try again or contact coordinators.");
  }

  // Optional: Supabase backup (only if configured and available, won't break if absent)
  try {
    const supabaseUrl = process.env["SUPABASE_URL"];
    const supabaseKey = process.env["SUPABASE_SERVICE_ROLE_KEY"] || process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (supabaseUrl && supabaseKey) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

      await supabaseAdmin.from("registrations").insert({
        registration_id: registrationId,
        team_name: data.teamName || (isMatchmaking ? `Pool (${data.teamLeader})` : ""),
        team_leader: data.teamLeader,
        member_count: data.members.length,
        members: data.members,
        problem_statement_id: effectiveProblemId,
        problem_statement_title: effectiveProblemTitle,
        problem_statement_domain: effectiveDomain,
        payment_amount: 0,
        payment_txn_id: data.paymentTxnId || "FREE",
        payment_screenshot_path: null,
        payment_status: "confirmed",
      });
    }
  } catch (supabaseErr) {
    console.warn("[Registration] Optional Supabase sync skipped:", supabaseErr);
  }

  return {
    registrationId,
    registrationType: data.registrationType || "full_team",
    teamName: data.teamName || (isMatchmaking ? `Matchmaking Pool (${data.teamLeader})` : ""),
    teamLeader: data.teamLeader,
    problemStatementId: effectiveProblemId,
    problemStatementTitle: effectiveProblemTitle,
    memberCount: data.members.length,
    paymentTxnId: data.paymentTxnId || "FREE",
  };
}
