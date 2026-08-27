import type { RegistrationInput } from "./registration-schema";
import type { SubmitRegistrationResult } from "./registration.functions";
import { buildSheetPayload, appendToGoogleSheets } from "./google-sheets.server";

const FEE = 500;

function generateRegistrationId() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  for (const b of bytes) suffix += alphabet[b % alphabet.length];
  return `SIH26-${suffix}`;
}

export async function persistRegistration(
  data: RegistrationInput,
): Promise<SubmitRegistrationResult> {
  // Validate team requirements
  const femaleCount = data.members.filter((m) => m.gender === "Female").length;
  if (femaleCount < 1) {
    throw new Error("At least one female team member is mandatory.");
  }
  if (data.members.length !== 6) {
    throw new Error("A team must have exactly 6 members.");
  }

  const registrationId = generateRegistrationId();

  // Primary registration sync: Google Sheets
  const sheetPayload = buildSheetPayload(data, registrationId);
  try {
    await appendToGoogleSheets(sheetPayload);
  } catch (sheetErr) {
    console.error("[Registration] Google Sheets submission error:", sheetErr);
    // If webhook fails, throw user-friendly error
    throw new Error("Failed to record registration in Google Sheets. Please try again or contact coordinators.");
  }

  // Optional: Supabase backup (only if configured and available, won't break if absent)
  try {
    const supabaseUrl = process.env["SUPABASE_URL"];
    const supabaseKey = process.env["SUPABASE_SERVICE_ROLE_KEY"] || process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (supabaseUrl && supabaseKey) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      let screenshotPath: string | null = null;

      if (data.paymentScreenshot) {
        try {
          const match = /^data:([^;]+);base64,(.+)$/.exec(data.paymentScreenshot.dataUrl);
          if (match) {
            const contentType = match[1]!;
            const binary = atob(match[2]!);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
            const ext = data.paymentScreenshot.name.split(".").pop()?.toLowerCase() ?? "png";
            const path = `${registrationId}/payment-proof.${ext}`;
            await supabaseAdmin.storage
              .from("payment-proofs")
              .upload(path, bytes, { contentType, upsert: true });
            screenshotPath = path;
          }
        } catch (storageErr) {
          console.warn("[Registration] Supabase storage upload skipped:", storageErr);
        }
      }

      await supabaseAdmin.from("registrations").insert({
        registration_id: registrationId,
        team_name: data.teamName,
        team_leader: data.teamLeader,
        member_count: data.members.length,
        members: data.members,
        problem_statement_id: data.problemStatementId,
        problem_statement_title: data.problemStatementTitle,
        problem_statement_domain: data.problemStatementDomain || null,
        payment_amount: 0,
        payment_txn_id: data.paymentTxnId || "FREE",
        payment_screenshot_path: screenshotPath,
        payment_status: "confirmed",
      });
    }
  } catch (supabaseErr) {
    // Non-fatal: Google Sheets already received the registration
    console.warn("[Registration] Optional Supabase sync skipped:", supabaseErr);
  }

  return {
    registrationId,
    teamName: data.teamName,
    problemStatementId: data.problemStatementId,
    problemStatementTitle: data.problemStatementTitle,
    memberCount: data.members.length,
    paymentTxnId: data.paymentTxnId || "FREE",
  };
}

