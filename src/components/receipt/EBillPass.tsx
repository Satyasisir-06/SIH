import { useRef } from "react";
import {
  CheckCircle2,
  Printer,
  QrCode,
  Share2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EVENT, COORDINATORS } from "@/lib/event";
import type { ReceiptData } from "@/lib/receipt-store";

export function EBillPass({ receipt }: { receipt: ReceiptData }) {
  const printRef = useRef<HTMLDivElement>(null);
  const isMatchmaking = receipt.type === "matchmaking";
  const ratePerMember = 500;
  const totalAmountNum = receipt.memberCount * ratePerMember;
  const totalAmountStr = `₹${totalAmountNum.toLocaleString("en-IN")}.00`;

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
    <div className="mx-auto max-w-4xl space-y-6">
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

      {/* Top Action Bar (Hidden on Print) */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4 print:hidden">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-sm font-bold text-foreground">
              Official E-Bill &amp; Participant Pass
            </h3>
            <p className="text-xs text-muted-foreground">
              Single-page verified pass • Ready for download / print
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="goldOutline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4" /> Share Link
          </Button>
          <Button variant="gold" size="sm" onClick={handlePrint} className="shadow-md">
            <Printer className="h-4 w-4" /> Print / Save as PDF (1 Page)
          </Button>
        </div>
      </div>

      {/* Official Single-Page E-Receipt Document (Printable) */}
      <div
        ref={printRef}
        id="ebill-document"
        className="relative overflow-hidden rounded-2xl border-2 border-gold/40 bg-card p-6 shadow-2xl print:border-black print:bg-white print:p-4 print:text-black print:shadow-none sm:p-8"
      >
        {/* Decorative Top Accent Bar */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-burgundy via-gold to-burgundy" />

        {/* 1. Header with Institution & SIH Branding */}
        <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 sm:flex-row sm:items-start print:border-black/20 print:pb-2">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-widest text-gold print:text-black">
              <Sparkles className="h-3.5 w-3.5" /> {EVENT.collegeName} • Internal Hackathon Qualifier
            </div>
            <h1 className="font-display text-xl font-black tracking-tight text-foreground sm:text-2xl print:text-lg print:text-black">
              SMART INDIA HACKATHON 2026
            </h1>
            <p className="text-[0.7rem] font-medium text-muted-foreground print:text-gray-700">
              Government of India &amp; AICTE Initiative • Internal Round E-Receipt &amp; Venue Pass
            </p>
          </div>

          <div className="flex flex-col items-start rounded-lg border border-border bg-surface px-3 py-2 sm:items-end sm:text-right print:border-black/20 print:bg-gray-50 print:py-1">
            <Badge variant="outline" className="border-gold/50 text-[0.65rem] text-gold print:border-black print:text-black">
              OFFICIAL RECEIPT
            </Badge>
            <p className="mt-1 font-mono text-[0.75rem] font-bold text-foreground print:text-black">
              INVOICE: {receipt.invoiceNumber}
            </p>
            <p className="text-[0.65rem] text-muted-foreground print:text-gray-600">
              Date: {receipt.submittedAt}
            </p>
          </div>
        </div>

        {/* 2. Verification Badge & Amount Banner */}
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

        {/* 3. Team / Participant Key Info Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs lg:grid-cols-3 print:gap-1.5">
          <div className="rounded-lg border border-border bg-surface p-2.5 print:border-black/10 print:bg-transparent print:p-1.5">
            <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground print:text-gray-600">
              {isMatchmaking ? "Matchmaking Pool ID" : "Registration ID"}
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

        {/* 4. Problem Statement / Skills Compact Bar */}
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
              <strong>Looking For:</strong> {receipt.teamNeedNote || "Teammates"} (Problem statement to be finalized upon team formation)
            </p>
          )}
        </div>

        {/* 5. Team Members Roster Compact Table */}
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

        {/* 6. Payment Breakdown Bar */}
        <div className="mt-2.5 flex items-center justify-between rounded-lg border border-border bg-surface px-3.5 py-2 text-xs print:mt-1.5 print:border-black/10 print:bg-transparent print:py-1">
          <span className="text-muted-foreground print:text-gray-700">
            Entry Fee ({receipt.memberCount} {receipt.memberCount === 1 ? "Participant" : "Participants"} × ₹500.00)
          </span>
          <div className="text-right">
            <span className="text-xs text-muted-foreground print:text-gray-600">Total Paid: </span>
            <span className="font-mono text-sm font-bold text-emerald-400 print:text-black">
              {totalAmountStr}
            </span>
          </div>
        </div>

        {/* 7. Footer: Instructions & Coordinator Signatures */}
        <div className="mt-3 grid grid-cols-2 items-end border-t border-border pt-3 text-[0.65rem] print:mt-2 print:border-black/20 print:pt-2">
          <div className="space-y-0.5 text-muted-foreground print:text-gray-700">
            <p className="font-bold uppercase text-foreground print:text-black">Instructions:</p>
            <p>1. Present this E-Bill / digital ID at the venue desk during check-in.</p>
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

        {/* Watermark Seal */}
        <div className="mt-2 text-center text-[0.6rem] uppercase tracking-widest text-muted-foreground print:mt-1 print:text-gray-500">
          Official Digital E-Receipt • SIH 2026 Internal Hackathon Committee
        </div>
      </div>
    </div>
  );
}
