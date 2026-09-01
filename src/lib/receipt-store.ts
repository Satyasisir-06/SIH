import { EXISTING_REGISTRATIONS, type ExistingRegistrationRecord } from "@/data/existingRegistrations";

export type ReceiptMember = {
  name: string;
  collegeRegId: string;
  phone: string;
  year: string;
  department: string;
  gender: string;
};

export type ReceiptData = {
  registrationId: string;
  invoiceNumber: string;
  type: "full_team" | "matchmaking";
  teamName: string;
  teamLeader: string;
  leaderPhone: string;
  memberCount: number;
  skills?: string;
  teamNeedNote?: string;
  problemStatementId: string;
  problemStatementTitle: string;
  problemStatementDomain?: string;
  members: ReceiptMember[];
  submittedAt: string;
  paymentStatus: "PAID & VERIFIED";
  paymentMethod: string;
  amount: string;
};

// Parse members string into structured member list
function parseMembersText(text?: string): ReceiptMember[] {
  if (!text) return [];
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const list: ReceiptMember[] = [];

  for (const line of lines) {
    // Format: "1. Name (Reg: 23B91A0501, Phone: 9876543210, Yr: 2nd Year, Dept: CSE, Male)"
    // Or: "Name | Reg: 23B91A0501 | Phone: 9876543210 | Yr: 2nd Year | Dept: CSE | Male"
    const nameMatch = line.replace(/^\d+\.\s*/, "").split(/[\(\|]/)[0]?.trim() || "Participant";
    const regMatch = /Reg:\s*([^,\)\|]+)/i.exec(line)?.[1]?.trim() || "-";
    const phoneMatch = /Phone:\s*([^,\)\|]+)/i.exec(line)?.[1]?.trim() || "-";
    const yrMatch = /Yr:\s*([^,\)\|]+)/i.exec(line)?.[1]?.trim() || "-";
    const deptMatch = /Dept:\s*([^,\)\|]+)/i.exec(line)?.[1]?.trim() || "-";
    const genderMatch = /(Male|Female|Other)/i.exec(line)?.[1]?.trim() || "-";

    list.push({
      name: nameMatch,
      collegeRegId: regMatch,
      phone: phoneMatch,
      year: yrMatch,
      department: deptMatch,
      gender: genderMatch,
    });
  }

  return list;
}

function recordToReceipt(record: ExistingRegistrationRecord): ReceiptData {
  const members = parseMembersText(record.membersText);
  const suffix = record.registrationId.replace(/[^A-Z0-9]/gi, "").slice(-6);

  return {
    registrationId: record.registrationId,
    invoiceNumber: `SIH26-INV-${suffix}`,
    type: record.type,
    teamName: record.teamName || (record.type === "matchmaking" ? `Solo (${record.teamLeader})` : "Hackathon Squad"),
    teamLeader: record.teamLeader,
    leaderPhone: record.leaderPhone,
    memberCount: record.memberCount,
    skills: record.skills,
    teamNeedNote: record.teamNeedNote,
    problemStatementId: record.problemStatementId || "N/A",
    problemStatementTitle: record.problemStatementTitle || (record.type === "matchmaking" ? "To be finalized upon team formation" : "SIH Challenge"),
    problemStatementDomain: record.problemStatementDomain || "General",
    members: members.length > 0 ? members : [
      {
        name: record.teamLeader,
        collegeRegId: "-",
        phone: record.leaderPhone,
        year: "-",
        department: "-",
        gender: "-",
      }
    ],
    submittedAt: "28 Aug 2026, 04:30 PM",
    paymentStatus: "PAID & VERIFIED",
    paymentMethod: "Official Poster QR Code (Confirmed)",
    amount: `₹${(record.memberCount * 500).toLocaleString("en-IN")}.00`,
  };
}

export function findReceipt(query: string): ReceiptData | undefined {
  if (!query) return undefined;
  const q = query.trim().toLowerCase();
  const cleanQ = q.replace(/[\s\-_]/g, "");

  // 1. Check local session storage if user just registered
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("sih26_recent_registration");
      if (stored) {
        const parsed = JSON.parse(stored) as ReceiptData;
        const pIdClean = parsed.registrationId.toLowerCase().replace(/[\s\-_]/g, "");
        const pPhoneClean = parsed.leaderPhone.replace(/[\s\-_]/g, "");
        if (pIdClean === cleanQ || pPhoneClean.includes(cleanQ) || parsed.teamLeader.toLowerCase().includes(q)) {
          return parsed;
        }
      }
    } catch {}
  }

  // 2. Search existing registrations dataset
  const match = EXISTING_REGISTRATIONS.find((r) => {
    const regIdClean = r.registrationId.toLowerCase().replace(/[\s\-_]/g, "");
    const phoneClean = r.leaderPhone.replace(/[\s\-_]/g, "");
    const nameMatch = r.teamLeader.toLowerCase().includes(q) || (r.teamName && r.teamName.toLowerCase().includes(q));
    const memberPhoneMatch = r.membersText && r.membersText.includes(cleanQ);

    return (
      regIdClean === cleanQ ||
      regIdClean.endsWith(cleanQ) ||
      (cleanQ.length >= 7 && phoneClean.includes(cleanQ)) ||
      (cleanQ.length >= 7 && memberPhoneMatch) ||
      nameMatch
    );
  });

  return match ? recordToReceipt(match) : undefined;
}

export function getAllExistingReceipts(): ReceiptData[] {
  return EXISTING_REGISTRATIONS.map(recordToReceipt);
}
