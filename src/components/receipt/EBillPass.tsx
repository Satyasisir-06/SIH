import { useState, useRef } from "react";
import {
  CheckCircle2,
  Printer,
  QrCode,
  Share2,
  ShieldCheck,
  Sparkles,
  Users,
  User,
  LayoutGrid,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EVENT, COORDINATORS } from "@/lib/event";
import type { ReceiptData, ReceiptMember } from "@/lib/receipt-store";

export function EBillPass({ receipt }: { receipt: ReceiptData }) {
  const printRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<"team" | "member" | "grid">("team");
  const [selectedMemberIdx, setSelectedMemberIdx] = useState<number>(0);

  const isMatchmaking = receipt.type === "matchmaking";
  const ratePerMember = 500;
  const totalAmountNum = receipt.memberCount * ratePerMember;
  const totalAmountStr = `₹${totalAmountNum.toLocaleString("en-IN")}.00`;

  const currentMember: ReceiptMember = receipt.members[selectedMemberIdx] || {
    name: receipt.teamLeader,
    collegeRegId: "-",
    phone: receipt.leaderPhone,
    year: "-",
    department: "-",
    gender: "-",
  };

  function handlePrint() {
    window.print();
  }

  function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      void navigator.share({
        title: `SIH 2026 E-Receipt - ${receipt.teamName || receipt.teamLeader}`,
        text: `SIH 2026 Registration E-Bill & Event Pass for ${receipt.teamName || receipt.teamLeader} (ID: ${receipt.registrationId})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      void navigator.clipboard.writeText(window.location.href);
      toast.success("Receipt link copied to clipboard!");
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {/* Strict 1-Page Print Stylesheet */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 6mm 8mm;
          }
          html, body {
            height: auto !important;
            background: #ffffff !important;
            color: #000000 !important;
            font-size: 11px !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          header, footer, nav, .print\\:hidden {
            display: none !important;
          }
          #ebill-document {
            border: 1.5px solid #800020 !important;
            padding: 12px 16px !important;
            margin: 0 auto !important;
            box-shadow: none !important;
            background: #ffffff !important;
            color: #000000 !important;
            width: 100% !important;
            max-width: 100% !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          table {
            font-size: 9.5px !important;
          }
          th, td {
            padding: 2.5px 5px !important;
          }
        }
      `}</style>

      {/* Top Action Bar & Bill Mode Selector (Hidden on Print) */}
      <div className="space-y-3 rounded-xl border border-border bg-surface p-4 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-sm font-bold text-foreground">
                {receipt.teamName || receipt.teamLeader} ({receipt.registrationId})
              </h3>
              <p className="text-xs text-muted-foreground">
                Payment verified • {receipt.memberCount} {receipt.memberCount === 1 ? "Member" : "Members"} (Total: {totalAmountStr})
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="goldOutline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4" /> Share Link
            </Button>
            <Button variant="gold" size="sm" onClick={handlePrint} className="shadow-md">
              <Printer className="h-4 w-4" /> Print / Save PDF (1 Page)
            </Button>
          </div>
        </div>

        {/* View Mode Switcher */}
        {receipt.members.length > 1 ? (
          <div className="flex flex-wrap items-center gap-2 border-t border-border pt-3">
            <span className="text-xs font-semibold text-muted-foreground">Receipt Mode:</span>
            <button
              type="button"
              onClick={() => setViewMode("team")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                viewMode === "team"
                  ? "bg-gold text-primary shadow"
                  : "bg-surface text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Users className="h-3.5 w-3.5" /> Consolidated Team Bill ({totalAmountStr})
            </button>

            <button
              type="button"
              onClick={() => setViewMode("member")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                viewMode === "member"
                  ? "bg-gold text-primary shadow"
                  : "bg-surface text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <User className="h-3.5 w-3.5" /> Individual Member E-Bills (₹500 each)
            </button>

            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                viewMode === "grid"
                  ? "bg-gold text-primary shadow"
                  : "bg-surface text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" /> 6-in-1 Member Passes Sheet
            </button>
          </div>
        ) : null}

        {/* Individual Member Tab Selector */}
        {viewMode === "member" && receipt.members.length > 1 ? (
          <div className="flex flex-wrap items-center gap-1.5 border-t border-border pt-2">
            <span className="text-xs text-muted-foreground mr-1">Select Member:</span>
            {receipt.members.map((m, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedMemberIdx(idx)}
                className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
                  selectedMemberIdx === idx
                    ? "border border-gold bg-gold-soft/50 font-bold text-gold"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                #{idx + 1} {m.name.split(" ")[0]}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* ========================================================= */}
      {/* MODE 1: CONSOLIDATED TEAM BILL (Default)                   */}
      {/* ========================================================= */}
      {viewMode === "team" && (
        <div
          ref={printRef}
          id="ebill-document"
          className="relative overflow-hidden rounded-2xl border-2 border-gold/40 bg-card p-6 shadow-2xl print:border-black print:bg-white print:p-4 print:text-black print:shadow-none sm:p-8"
        >
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-burgundy via-gold to-burgundy" />

          {/* Header */}
          <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 sm:flex-row sm:items-start print:border-black/20 print:pb-2">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-widest text-gold print:text-black">
                <Sparkles className="h-3.5 w-3.5" /> {EVENT.collegeName} • Internal Hackathon Qualifier
              </div>
              <h1 className="font-display text-xl font-black tracking-tight text-foreground sm:text-2xl print:text-lg print:text-black">
                SMART INDIA HACKATHON 2026
              </h1>
              <p className="text-[0.7rem] font-medium text-muted-foreground print:text-gray-700">
                Government of India &amp; AICTE Initiative • Team E-Receipt &amp; Venue Pass
              </p>
            </div>

            <div className="flex flex-col items-start rounded-lg border border-border bg-surface px-3 py-2 sm:items-end sm:text-right print:border-black/20 print:bg-gray-50 print:py-1">
              <Badge variant="outline" className="border-gold/50 text-[0.65rem] text-gold print:border-black print:text-black">
                TEAM INVOICE
              </Badge>
              <p className="mt-1 font-mono text-[0.75rem] font-bold text-foreground print:text-black">
                INVOICE: {receipt.invoiceNumber}
              </p>
              <p className="text-[0.65rem] text-muted-foreground print:text-gray-600">
                Date: {receipt.submittedAt}
              </p>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="my-3 flex items-center justify-between rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-2 print:my-2 print:border-green-800 print:bg-green-50 print:py-1.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400 print:text-green-700" />
              <div>
                <p className="font-display text-xs font-bold text-emerald-400 print:text-green-800">
                  PAYMENT STATUS: PAID &amp; VERIFIED
                </p>
                <p className="text-[0.65rem] text-emerald-200/80 print:text-green-700">
                  Verified via College Poster QR Code ({receipt.memberCount} × ₹500.00)
                </p>
              </div>
            </div>
            <div className="font-mono text-sm font-black text-gold print:text-black">
              {totalAmountStr}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs lg:grid-cols-3 print:gap-1.5">
            <div className="rounded-lg border border-border bg-surface p-2.5 print:border-black/10 print:bg-transparent print:p-1.5">
              <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground print:text-gray-600">
                {isMatchmaking ? "Matchmaking Pool ID" : "Team Registration ID"}
              </p>
              <p className="font-mono text-xs font-bold text-gold print:text-black">
                {receipt.registrationId}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-surface p-2.5 print:border-black/10 print:bg-transparent print:p-1.5">
              <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground print:text-gray-600">
                {isMatchmaking ? "Contact Person / Lead" : "Team Name"}
              </p>
              <p className="font-display text-xs font-bold text-foreground print:text-black line-clamp-1">
                {receipt.teamName || receipt.teamLeader}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-surface p-2.5 print:border-black/10 print:bg-transparent print:p-1.5">
              <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground print:text-gray-600">
                Primary Contact (WhatsApp)
              </p>
              <p className="font-mono text-xs font-bold text-foreground print:text-black">
                +91 {receipt.leaderPhone}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-surface p-2.5 print:border-black/10 print:bg-transparent print:p-1.5">
              <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground print:text-gray-600">
                Registered Members
              </p>
              <p className="font-display text-xs font-bold text-foreground print:text-black">
                {receipt.memberCount} {receipt.memberCount === 1 ? "Participant" : "Participants"} (₹500 / each)
              </p>
            </div>

            <div className="col-span-2 rounded-lg border border-border bg-surface p-2.5 print:border-black/10 print:bg-transparent print:p-1.5">
              <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground print:text-gray-600">
                Event Dates &amp; Venue
              </p>
              <p className="text-xs font-semibold text-foreground print:text-black">
                {EVENT.datesShort} • {EVENT.venue}
              </p>
            </div>
          </div>

          {/* Problem Statement */}
          <div className="mt-2.5 rounded-lg border border-border bg-surface p-2.5 print:mt-1.5 print:border-black/10 print:bg-transparent print:p-1.5">
            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground print:text-gray-600">
              {isMatchmaking ? "Matchmaking Skills & Preferences" : "Selected Problem Statement"}
            </p>
            {!isMatchmaking ? (
              <div className="mt-0.5 flex flex-wrap items-baseline gap-2 text-xs">
                <span className="font-mono font-bold text-gold print:text-black">
                  {receipt.problemStatementId}
                </span>
                <span className="font-medium text-foreground print:text-black line-clamp-1">
                  {receipt.problemStatementTitle}
                </span>
                {receipt.problemStatementDomain ? (
                  <span className="text-[0.7rem] text-muted-foreground">• Domain: {receipt.problemStatementDomain}</span>
                ) : null}
              </div>
            ) : (
              <p className="mt-0.5 text-xs text-foreground print:text-black">
                <strong>Skills:</strong> {receipt.skills || "General Software"} •{" "}
                <strong>Looking For:</strong> {receipt.teamNeedNote || "Teammates"}
              </p>
            )}
          </div>

          {/* Member Roster Table */}
          <div className="mt-2.5 overflow-hidden rounded-lg border border-border print:mt-1.5 print:border-black/20">
            <div className="bg-surface px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground print:bg-gray-100 print:text-black">
              Registered Participant Roster ({receipt.members.length} Members)
            </div>
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-card text-[0.65rem] font-semibold text-muted-foreground print:border-black/20 print:text-black">
                <tr>
                  <th className="p-1.5 pl-3">#</th>
                  <th className="p-1.5">Name</th>
                  <th className="p-1.5">Reg ID</th>
                  <th className="p-1.5">Mobile</th>
                  <th className="p-1.5">Dept &amp; Year</th>
                  <th className="p-1.5 pr-3">Gender</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-[0.75rem] print:divide-black/10 print:text-[9.5px]">
                {receipt.members.map((m, idx) => (
                  <tr key={idx}>
                    <td className="p-1.5 pl-3 font-mono font-bold text-gold print:text-black">{idx + 1}</td>
                    <td className="p-1.5 font-medium text-foreground print:text-black">{m.name}</td>
                    <td className="p-1.5 font-mono">{m.collegeRegId}</td>
                    <td className="p-1.5 font-mono">{m.phone}</td>
                    <td className="p-1.5">{m.department} ({m.year})</td>
                    <td className="p-1.5 pr-3">{m.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Payment Breakdown Bar */}
          <div className="mt-2.5 flex items-center justify-between rounded-lg border border-border bg-surface px-3.5 py-2 text-xs print:mt-1.5 print:border-black/10 print:bg-transparent print:py-1">
            <span className="text-muted-foreground print:text-gray-700">
              Team Fee ({receipt.memberCount} Participants × ₹500.00 each)
            </span>
            <div className="text-right">
              <span className="text-xs text-muted-foreground print:text-gray-600">Total Paid: </span>
              <span className="font-mono text-sm font-bold text-emerald-400 print:text-black">
                {totalAmountStr}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-3 grid grid-cols-2 items-end border-t border-border pt-3 text-[0.65rem] print:mt-2 print:border-black/20 print:pt-2">
            <div className="space-y-0.5 text-muted-foreground print:text-gray-700">
              <p className="font-bold uppercase text-foreground print:text-black">Instructions:</p>
              <p>1. Present this E-Bill / digital ID at the venue registration desk.</p>
              <p>2. Carry your college ID card &amp; laptops with chargers.</p>
            </div>

            <div className="text-right">
              <div className="inline-flex items-center gap-1 font-bold text-gold print:text-black">
                <QrCode className="h-3.5 w-3.5" /> {receipt.registrationId}
              </div>
              <p className="mt-1 font-display text-xs font-bold text-foreground print:text-black">
                {COORDINATORS[0]?.name}
              </p>
              <p className="text-[0.6rem] text-muted-foreground print:text-gray-600">
                {COORDINATORS[0]?.role} (AI Dept) • +91 {COORDINATORS[0]?.phone}
              </p>
            </div>
          </div>

          <div className="mt-2 text-center text-[0.6rem] uppercase tracking-widest text-muted-foreground print:mt-1 print:text-gray-500">
            Official Digital E-Receipt • SIH 2026 Internal Hackathon Committee
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 2: INDIVIDUAL MEMBER PERSONAL E-BILL (₹500.00)       */}
      {/* ========================================================= */}
      {viewMode === "member" && (
        <div
          ref={printRef}
          id="ebill-document"
          className="relative overflow-hidden rounded-2xl border-2 border-gold/40 bg-card p-6 shadow-2xl print:border-black print:bg-white print:p-4 print:text-black print:shadow-none sm:p-8"
        >
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-600 via-gold to-burgundy" />

          {/* Header */}
          <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 sm:flex-row sm:items-start print:border-black/20 print:pb-2">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-widest text-gold print:text-black">
                <Sparkles className="h-3.5 w-3.5" /> {EVENT.collegeName} • Internal Hackathon Qualifier
              </div>
              <h1 className="font-display text-xl font-black tracking-tight text-foreground sm:text-2xl print:text-lg print:text-black">
                SMART INDIA HACKATHON 2026
              </h1>
              <p className="text-[0.7rem] font-medium text-muted-foreground print:text-gray-700">
                Official Student Participant Pass &amp; Personal E-Receipt
              </p>
            </div>

            <div className="flex flex-col items-start rounded-lg border border-border bg-surface px-3 py-2 sm:items-end sm:text-right print:border-black/20 print:bg-gray-50 print:py-1">
              <Badge variant="outline" className="border-blue-500/50 text-[0.65rem] text-blue-400 print:border-black print:text-black">
                STUDENT DELEGATE PASS
              </Badge>
              <p className="mt-1 font-mono text-[0.75rem] font-bold text-foreground print:text-black">
                PASS: {receipt.registrationId}-M{selectedMemberIdx + 1}
              </p>
              <p className="text-[0.65rem] text-muted-foreground print:text-gray-600">
                Date: {receipt.submittedAt}
              </p>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="my-3 flex items-center justify-between rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-2 print:my-2 print:border-green-800 print:bg-green-50 print:py-1.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400 print:text-green-700" />
              <div>
                <p className="font-display text-xs font-bold text-emerald-400 print:text-green-800">
                  INDIVIDUAL PAYMENT STATUS: PAID &amp; CONFIRMED
                </p>
                <p className="text-[0.65rem] text-emerald-200/80 print:text-green-700">
                  Entry Fee: ₹500.00 • Verified via College Poster QR Code
                </p>
              </div>
            </div>
            <div className="font-mono text-base font-black text-gold print:text-black">
              ₹500.00
            </div>
          </div>

          {/* Individual Member Highlight Box */}
          <div className="grid grid-cols-2 gap-2 text-xs lg:grid-cols-3 print:gap-1.5">
            <div className="col-span-2 rounded-lg border border-gold/40 bg-gold-soft/20 p-3 print:border-black/20 print:bg-transparent">
              <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground print:text-gray-600">
                Participant Name (Member #{selectedMemberIdx + 1})
              </p>
              <p className="font-display text-base font-black text-gold print:text-black">
                {currentMember.name}
              </p>
              <p className="mt-0.5 text-xs text-foreground print:text-black">
                College Reg ID: <span className="font-mono font-bold">{currentMember.collegeRegId}</span> • Phone: <span className="font-mono font-bold">{currentMember.phone}</span>
              </p>
            </div>

            <div className="rounded-lg border border-border bg-surface p-3 print:border-black/10 print:bg-transparent">
              <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground print:text-gray-600">
                Department &amp; Year
              </p>
              <p className="font-display text-sm font-bold text-foreground print:text-black">
                {currentMember.department} ({currentMember.year})
              </p>
              <p className="text-[0.7rem] text-muted-foreground print:text-gray-600">Gender: {currentMember.gender}</p>
            </div>

            <div className="rounded-lg border border-border bg-surface p-2.5 print:border-black/10 print:bg-transparent">
              <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground print:text-gray-600">
                Team Affiliation
              </p>
              <p className="font-display text-xs font-bold text-foreground print:text-black line-clamp-1">
                {receipt.teamName || receipt.teamLeader}
              </p>
              <p className="font-mono text-[0.65rem] text-gold print:text-black">ID: {receipt.registrationId}</p>
            </div>

            <div className="rounded-lg border border-border bg-surface p-2.5 print:border-black/10 print:bg-transparent">
              <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground print:text-gray-600">
                Team Leader / Contact
              </p>
              <p className="font-display text-xs font-bold text-foreground print:text-black line-clamp-1">
                {receipt.teamLeader}
              </p>
              <p className="font-mono text-[0.65rem] text-foreground print:text-black">+91 {receipt.leaderPhone}</p>
            </div>

            <div className="rounded-lg border border-border bg-surface p-2.5 print:border-black/10 print:bg-transparent">
              <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground print:text-gray-600">
                Reporting Venue
              </p>
              <p className="text-xs font-semibold text-foreground print:text-black">
                {EVENT.venue}
              </p>
            </div>
          </div>

          {/* Problem Statement Bar */}
          <div className="mt-2.5 rounded-lg border border-border bg-surface p-2.5 print:mt-1.5 print:border-black/10 print:bg-transparent print:p-1.5">
            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground print:text-gray-600">
              Allocated Problem Statement
            </p>
            <div className="mt-0.5 flex flex-wrap items-baseline gap-2 text-xs">
              <span className="font-mono font-bold text-gold print:text-black">
                {receipt.problemStatementId}
              </span>
              <span className="font-medium text-foreground print:text-black">
                {receipt.problemStatementTitle}
              </span>
            </div>
          </div>

          {/* Payment Statement */}
          <div className="mt-2.5 flex items-center justify-between rounded-lg border border-border bg-surface px-3.5 py-2 text-xs print:mt-1.5 print:border-black/10 print:bg-transparent print:py-1">
            <span className="text-muted-foreground print:text-gray-700">
              Individual Participant Registration Fee
            </span>
            <div className="text-right">
              <span className="font-mono text-sm font-bold text-emerald-400 print:text-black">
                ₹500.00 (Paid &amp; Verified)
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-3 grid grid-cols-2 items-end border-t border-border pt-3 text-[0.65rem] print:mt-2 print:border-black/20 print:pt-2">
            <div className="space-y-0.5 text-muted-foreground print:text-gray-700">
              <p className="font-bold uppercase text-foreground print:text-black">Student Entry Instructions:</p>
              <p>1. Present this student pass at the entry desk for badge collection.</p>
              <p>2. Keep your college ID card handy at all times during the event.</p>
            </div>

            <div className="text-right">
              <div className="inline-flex items-center gap-1 font-bold text-gold print:text-black">
                <QrCode className="h-3.5 w-3.5" /> Pass: {receipt.registrationId}-M{selectedMemberIdx + 1}
              </div>
              <p className="mt-1 font-display text-xs font-bold text-foreground print:text-black">
                {COORDINATORS[0]?.name}
              </p>
              <p className="text-[0.6rem] text-muted-foreground print:text-gray-600">
                Faculty SPOC • +91 {COORDINATORS[0]?.phone}
              </p>
            </div>
          </div>

          <div className="mt-2 text-center text-[0.6rem] uppercase tracking-widest text-muted-foreground print:mt-1 print:text-gray-500">
            Personal Delegate E-Receipt • SIH 2026 Internal Hackathon Committee
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 3: 6-IN-1 PRINTABLE MEMBER PASSES SHEET (1 A4 PAGE)  */}
      {/* ========================================================= */}
      {viewMode === "grid" && (
        <div
          ref={printRef}
          id="ebill-document"
          className="rounded-2xl border-2 border-gold/40 bg-card p-4 shadow-2xl print:border-black print:bg-white print:p-2 print:text-black print:shadow-none"
        >
          {/* Top Banner */}
          <div className="mb-3 flex items-center justify-between border-b border-border pb-2 print:border-black/20">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-gold print:text-black">
                {EVENT.collegeName} • SIH 2026
              </p>
              <h2 className="font-display text-base font-bold text-foreground print:text-black">
                {receipt.teamName || receipt.teamLeader} — 6-in-1 Member Delegate Passes
              </h2>
            </div>
            <Badge variant="outline" className="border-gold/50 text-[0.65rem] text-gold print:border-black print:text-black">
              ID: {receipt.registrationId}
            </Badge>
          </div>

          {/* 6 Passes Grid (2 columns x 3 rows) */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {receipt.members.map((m, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-lg border border-dashed border-border bg-surface p-2.5 print:border-black/30 print:bg-white"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="rounded bg-gold/20 px-1.5 py-0.5 text-[0.6rem] font-bold text-gold print:text-black">
                      PASS #{idx + 1}
                    </span>
                    <p className="mt-1 font-display text-xs font-bold text-foreground print:text-black line-clamp-1">
                      {m.name}
                    </p>
                  </div>
                  <span className="font-mono text-[0.65rem] font-bold text-emerald-400 print:text-black">
                    PAID ₹500
                  </span>
                </div>

                <div className="mt-1 space-y-0.5 text-[0.65rem] text-muted-foreground print:text-gray-700">
                  <p>Reg: <span className="font-mono font-bold text-foreground print:text-black">{m.collegeRegId}</span> • Ph: {m.phone}</p>
                  <p>{m.department} ({m.year}) • {m.gender}</p>
                  <p className="font-mono text-[0.6rem] text-gold print:text-black">Team: {receipt.teamName || receipt.teamLeader}</p>
                </div>

                <div className="mt-1.5 flex items-center justify-between border-t border-border pt-1 text-[0.6rem] print:border-black/10">
                  <span className="truncate text-muted-foreground print:text-gray-600">{EVENT.datesShort}</span>
                  <span className="font-mono font-bold">{receipt.registrationId}-M{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 text-center text-[0.6rem] uppercase tracking-widest text-muted-foreground print:text-gray-500">
            Cut along dotted lines for individual participant desk passes
          </div>
        </div>
      )}
    </div>
  );
}
