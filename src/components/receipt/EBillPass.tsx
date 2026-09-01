import { useRef } from "react";
import {
  CheckCircle2,
  Download,
  Printer,
  QrCode,
  Share2,
  ShieldCheck,
  Building2,
  Calendar,
  MapPin,
  Sparkles,
  Phone,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EVENT, COORDINATORS } from "@/lib/event";
import type { ReceiptData } from "@/lib/receipt-store";

export function EBillPass({ receipt }: { receipt: ReceiptData }) {
  const printRef = useRef<HTMLDivElement>(null);
  const isMatchmaking = receipt.type === "matchmaking";

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
              Registration verified • Ready for download / print
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="goldOutline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4" /> Share Link
          </Button>
          <Button variant="gold" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4" /> Print / Save as PDF
          </Button>
        </div>
      </div>

      {/* Official E-Receipt Document (Printable) */}
      <div
        ref={printRef}
        id="ebill-document"
        className="relative overflow-hidden rounded-2xl border-2 border-gold/40 bg-card p-6 shadow-2xl print:border-black print:bg-white print:p-8 print:text-black print:shadow-none sm:p-10"
      >
        {/* Decorative Top Accent Bar */}
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-burgundy via-gold to-burgundy" />

        {/* 1. Header with Institution & SIH Branding */}
        <div className="flex flex-col justify-between gap-6 border-b border-border pb-6 sm:flex-row sm:items-start print:border-black/20">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold print:text-black">
              <Sparkles className="h-4 w-4" /> {EVENT.collegeName} • Internal Hackathon Qualifier
            </div>
            <h1 className="font-display text-2xl font-black tracking-tight text-foreground sm:text-3xl print:text-black">
              SMART INDIA HACKATHON 2026
            </h1>
            <p className="text-xs font-semibold text-muted-foreground print:text-gray-700">
              Government of India &amp; AICTE Initiative • Internal Round Pass &amp; E-Bill
            </p>
          </div>

          <div className="flex flex-col items-start rounded-xl border border-border bg-surface p-4 sm:items-end sm:text-right print:border-black/20 print:bg-gray-50">
            <Badge variant="outline" className="border-gold/50 text-gold print:border-black print:text-black">
              OFFICIAL RECEIPT
            </Badge>
            <p className="mt-2 font-mono text-xs font-bold text-foreground print:text-black">
              INVOICE: {receipt.invoiceNumber}
            </p>
            <p className="text-[0.7rem] text-muted-foreground print:text-gray-600">
              Issued: {receipt.submittedAt}
            </p>
          </div>
        </div>

        {/* 2. Verification Badge & Registration Status */}
        <div className="my-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 print:border-green-800 print:bg-green-50">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-400 print:text-green-700" />
            <div>
              <p className="font-display text-sm font-bold text-emerald-400 print:text-green-800">
                PAYMENT &amp; REGISTRATION STATUS: VERIFIED
              </p>
              <p className="text-xs text-emerald-200/80 print:text-green-700">
                Payment verified via College Poster QR Code • Official Entry Confirmed
              </p>
            </div>
          </div>
          <div className="font-mono text-sm font-black text-gold print:text-black">
            {receipt.amount}
          </div>
        </div>

        {/* 3. Team / Participant Key Info Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-surface p-4 print:border-black/10 print:bg-transparent">
            <p className="eyebrow mb-1 print:text-gray-600">
              {isMatchmaking ? "Matchmaking Pool ID" : "Team Registration ID"}
            </p>
            <p className="font-mono text-base font-bold text-gold print:text-black">
              {receipt.registrationId}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4 print:border-black/10 print:bg-transparent">
            <p className="eyebrow mb-1 print:text-gray-600">Registration Type</p>
            <p className="font-display text-sm font-bold text-foreground print:text-black">
              {isMatchmaking ? "Solo / Partial Matchmaking Pool" : "Full Team (6 Members)"}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4 print:border-black/10 print:bg-transparent">
            <p className="eyebrow mb-1 print:text-gray-600">
              {isMatchmaking ? "Contact Person / Lead" : "Team Name"}
            </p>
            <p className="font-display text-sm font-bold text-foreground print:text-black">
              {receipt.teamName || receipt.teamLeader}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4 print:border-black/10 print:bg-transparent">
            <p className="eyebrow mb-1 print:text-gray-600">Primary Contact (WhatsApp)</p>
            <p className="font-mono text-sm font-bold text-foreground print:text-black">
              +91 {receipt.leaderPhone}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4 print:border-black/10 print:bg-transparent">
            <p className="eyebrow mb-1 print:text-gray-600">Total Registered Members</p>
            <p className="font-display text-sm font-bold text-foreground print:text-black">
              {receipt.memberCount} {receipt.memberCount === 1 ? "Member" : "Members"}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4 print:border-black/10 print:bg-transparent">
            <p className="eyebrow mb-1 print:text-gray-600">Event Dates &amp; Venue</p>
            <p className="text-xs font-semibold text-foreground print:text-black">
              {EVENT.datesShort} • {EVENT.venue.split(",")[0]}
            </p>
          </div>
        </div>

        {/* 4. Problem Statement / Skills Section */}
        <div className="mt-6 rounded-xl border border-border bg-surface p-5 print:border-black/10 print:bg-transparent">
          <p className="eyebrow mb-2 print:text-gray-600">
            {isMatchmaking ? "Skills & Matchmaking Details" : "Selected SIH Problem Statement"}
          </p>
          {!isMatchmaking ? (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-gold print:text-black">
                  {receipt.problemStatementId}
                </span>
                <span className="text-xs text-muted-foreground">• Domain: {receipt.problemStatementDomain}</span>
              </div>
              <p className="font-display text-sm font-bold text-foreground print:text-black">
                {receipt.problemStatementTitle}
              </p>
            </div>
          ) : (
            <div className="space-y-1.5 text-xs text-muted-foreground print:text-gray-800">
              <p>
                <strong className="text-foreground print:text-black">Skills / Specialization:</strong>{" "}
                {receipt.skills || "General / Software Development"}
              </p>
              <p>
                <strong className="text-foreground print:text-black">Teammate Preference:</strong>{" "}
                {receipt.teamNeedNote || "Looking for teammates & coordinator matchmaking"}
              </p>
              <p className="italic text-blue-300 print:text-gray-700">
                * Problem statement will be locked with coordinators once your full 6-member squad is formed.
              </p>
            </div>
          )}
        </div>

        {/* 5. Team Members Roster Table */}
        <div className="mt-6 overflow-hidden rounded-xl border border-border print:border-black/20">
          <div className="bg-surface px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-muted-foreground print:bg-gray-100 print:text-black">
            Registered Participant Roster ({receipt.members.length} Registered)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-card font-semibold text-muted-foreground print:border-black/20 print:text-black">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Participant Name</th>
                  <th className="p-3">College Reg ID</th>
                  <th className="p-3">Contact Number</th>
                  <th className="p-3">Department &amp; Year</th>
                  <th className="p-3">Gender</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border print:divide-black/10">
                {receipt.members.map((m, idx) => (
                  <tr key={idx} className="hover:bg-surface/50">
                    <td className="p-3 font-mono font-bold text-gold print:text-black">{idx + 1}</td>
                    <td className="p-3 font-medium text-foreground print:text-black">{m.name}</td>
                    <td className="p-3 font-mono">{m.collegeRegId}</td>
                    <td className="p-3 font-mono">{m.phone}</td>
                    <td className="p-3">{m.department} ({m.year})</td>
                    <td className="p-3">{m.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Payment Breakdown Table */}
        <div className="mt-6 rounded-xl border border-border bg-surface p-4 print:border-black/10 print:bg-transparent">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground print:text-gray-700">
              Registration Fee ({receipt.memberCount} Members Entry)
            </span>
            <span className="font-mono font-semibold text-foreground print:text-black">₹500.00</span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-sm font-bold print:border-black/20">
            <span className="text-foreground print:text-black">Total Paid Amount</span>
            <span className="font-mono text-base text-emerald-400 print:text-black">
              {receipt.amount} (Paid)
            </span>
          </div>
        </div>

        {/* 7. Footer: Instructions, Venue & Coordinator Signatures */}
        <div className="mt-8 grid gap-6 border-t border-border pt-6 sm:grid-cols-2 print:border-black/20">
          <div className="space-y-1.5 text-[0.7rem] text-muted-foreground print:text-gray-700">
            <p className="font-bold uppercase tracking-wider text-foreground print:text-black">
              Venue Check-In Instructions:
            </p>
            <ul className="list-inside list-disc space-y-0.5">
              <li>Carry your College Student ID card to the venue.</li>
              <li>Present this E-Receipt or digital Registration ID at the registration desk.</li>
              <li>Laptops, chargers, and extension boards are recommended per team.</li>
              <li>Venue: {EVENT.venue} ({EVENT.datesLong}).</li>
            </ul>
          </div>

          <div className="flex flex-col items-start justify-between rounded-xl border border-border bg-surface p-4 sm:items-end sm:text-right print:border-black/20 print:bg-transparent">
            <div className="flex items-center gap-2 text-xs font-bold text-gold print:text-black">
              <QrCode className="h-4 w-4" /> Pass ID: {receipt.registrationId}
            </div>
            <div className="mt-4 border-t border-border pt-2 text-right print:border-black/20">
              <p className="font-display text-xs font-bold text-foreground print:text-black">
                {COORDINATORS[0]?.name}
              </p>
              <p className="text-[0.65rem] text-muted-foreground print:text-gray-600">
                {COORDINATORS[0]?.role} • {COORDINATORS[0]?.detail}
              </p>
              <p className="text-[0.65rem] font-mono text-gold print:text-black">
                Phone: +91 {COORDINATORS[0]?.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Watermark Seal */}
        <div className="mt-6 text-center text-[0.65rem] uppercase tracking-widest text-muted-foreground print:text-gray-500">
          Official Digital E-Receipt • SIH 2026 Internal Hackathon Committee
        </div>
      </div>
    </div>
  );
}
