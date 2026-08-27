import type { RegistrationInput } from "./registration-schema";

export type SheetRegistrationPayload = {
  registrationId: string;
  submittedAt: string;
  teamName: string;
  teamLeader: string;
  memberCount: number;
  members: string;
  femaleCount: number;
  problemStatementId: string;
  problemStatementTitle: string;
  problemStatementDomain: string;
  paymentAmount: number;
  paymentTxnId: string;
  paymentScreenshotName?: string | undefined;
  paymentScreenshotDataUrl?: string | undefined;
  // Individual member breakdown for easy spreadsheet column sorting
  member1: string;
  member2: string;
  member3: string;
  member4: string;
  member5: string;
  member6: string;
};

export function buildSheetPayload(
  data: RegistrationInput,
  registrationId: string,
): SheetRegistrationPayload {
  const members = data.members || [];

  const formatMember = (m?: (typeof members)[number]) =>
    m ? `${m.name} | Reg: ${m.collegeRegId} | Yr: ${m.year} | Dept: ${m.department} | ${m.gender}` : "-";

  return {
    registrationId,
    submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    teamName: data.teamName,
    teamLeader: data.teamLeader,
    memberCount: members.length,
    members: members
      .map(
        (m, i) =>
          `${i + 1}. ${m.name} (${m.collegeRegId}, ${m.year}, ${m.department}, ${m.gender})`,
      )
      .join("\n"),
    femaleCount: members.filter((m) => m.gender === "Female").length,
    problemStatementId: data.problemStatementId,
    problemStatementTitle: data.problemStatementTitle,
    problemStatementDomain: data.problemStatementDomain || "N/A",
    paymentAmount: 0,
    paymentTxnId: data.paymentTxnId || "FREE",
    paymentScreenshotName: data.paymentScreenshot?.name ?? "N/A",
    paymentScreenshotDataUrl: data.paymentScreenshot?.dataUrl ?? "",
    member1: formatMember(members[0]),
    member2: formatMember(members[1]),
    member3: formatMember(members[2]),
    member4: formatMember(members[3]),
    member5: formatMember(members[4]),
    member6: formatMember(members[5]),
  };
}

/**
 * Appends a registration row to Google Sheets through an Apps Script webhook.
 * Set GOOGLE_SHEETS_WEBHOOK_URL in your environment (.env) to enable.
 */
export async function appendToGoogleSheets(payload: SheetRegistrationPayload): Promise<void> {
  const url = process.env["GOOGLE_SHEETS_WEBHOOK_URL"];
  if (!url) {
    console.warn("[Google Sheets] GOOGLE_SHEETS_WEBHOOK_URL is not configured in .env");
    return;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    redirect: "follow",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Google Sheets webhook failed (${res.status}): ${text}`);
  }
}

