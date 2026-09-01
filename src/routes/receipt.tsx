import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import {
  FileText,
  Search,
  Sparkles,
  Users,
  ShieldCheck,
  Phone,
  ArrowRight,
  ListFilter,
  Layers,
  Printer,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { EBillPass } from "@/components/receipt/EBillPass";
import { findReceipt, getAllExistingReceipts, type ReceiptData } from "@/lib/receipt-store";
import { EVENT } from "@/lib/event";

const searchSchema = z.object({
  id: z.string().optional(),
  phone: z.string().optional(),
});

export const Route = createFileRoute("/receipt")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "E-Bill & Event Pass Portal | SIH 2026 Internal Hackathon" },
      {
        name: "description",
        content:
          "Browse, search, and download official SIH 2026 registration e-bills, individual member receipts, and venue passes in bulk.",
      },
      { property: "og:title", content: "SIH 2026 E-Bill & Event Pass Portal" },
    ],
  }),
  component: ReceiptPage,
});

function ReceiptPage() {
  const { id: queryId, phone: queryPhone } = Route.useSearch();
  const [activeTab, setActiveTab] = useState<"lookup" | "directory" | "bulk">("lookup");
  const [searchQuery, setSearchQuery] = useState(queryId || queryPhone || "");
  const [directoryFilter, setDirectoryFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "full_team" | "matchmaking">("all");
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptData | undefined>(undefined);

  const allReceipts = useMemo(() => getAllExistingReceipts(), []);

  // Filter directory
  const filteredReceipts = useMemo(() => {
    return allReceipts.filter((r) => {
      const matchesCategory =
        categoryFilter === "all" || r.type === categoryFilter;

      if (!matchesCategory) return false;
      if (!directoryFilter.trim()) return true;

      const q = directoryFilter.toLowerCase();
      const matchId = r.registrationId.toLowerCase().includes(q);
      const matchName = r.teamLeader.toLowerCase().includes(q) || (r.teamName && r.teamName.toLowerCase().includes(q));
      const matchPhone = r.leaderPhone.includes(q);
      const matchProblem = r.problemStatementTitle.toLowerCase().includes(q) || r.problemStatementId.toLowerCase().includes(q);
      const matchMembers = r.members.some(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.collegeRegId.toLowerCase().includes(q) ||
          m.department.toLowerCase().includes(q),
      );

      return matchId || matchName || matchPhone || matchProblem || matchMembers;
    });
  }, [allReceipts, directoryFilter, categoryFilter]);

  // Overall metrics
  const totalParticipants = useMemo(
    () => allReceipts.reduce((acc, r) => acc + r.memberCount, 0),
    [allReceipts],
  );
  const totalAmount = useMemo(
    () => totalParticipants * 500,
    [totalParticipants],
  );

  // Sync if query param in URL changes
  useEffect(() => {
    const q = queryId || queryPhone || "";
    if (q) {
      setSearchQuery(q);
      const match = findReceipt(q);
      if (match) {
        setSelectedReceipt(match);
        setActiveTab("lookup");
      }
    } else {
      setSelectedReceipt(allReceipts[0]);
    }
  }, [queryId, queryPhone, allReceipts]);

  function handleSearch(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    const match = findReceipt(searchQuery);
    setSelectedReceipt(match);
    setActiveTab("lookup");
  }

  function handleSelectFromDirectory(receipt: ReceiptData) {
    setSelectedReceipt(receipt);
    setActiveTab("lookup");
    window.scrollTo({ top: 400, behavior: "smooth" });
  }

  function handleBulkPrint() {
    window.print();
  }

  return (
    <div className="min-h-[80vh]">
      {/* Hero / Header Section */}
      <section className="hero-surface border-b border-border print:hidden">
        <div className="section-y mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow inline-flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-gold" /> SIH 2026 E-Receipt &amp; Pass Portal
            </p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
              Registration <span className="text-gold-gradient">E-Bills &amp; Passes</span>
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Search by your <strong>Registration ID / Mobile Number</strong> or browse the <strong>Complete Registrations Directory</strong> to print individual or batch passes with 1 click.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Button asChild variant="gold" size="lg">
              <Link to="/register">
                New Registration <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="section-y mx-auto max-w-7xl px-4 sm:px-6">
        {/* Navigation Tabs (Hidden on Print) */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4 print:hidden">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("lookup")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                activeTab === "lookup"
                  ? "bg-gold text-primary shadow"
                  : "bg-surface text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Search className="h-4 w-4" /> Search E-Bill
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("directory")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                activeTab === "directory"
                  ? "bg-gold text-primary shadow"
                  : "bg-surface text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Layers className="h-4 w-4" /> All Registrations Directory ({allReceipts.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("bulk")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                activeTab === "bulk"
                  ? "bg-gold text-primary shadow"
                  : "bg-surface text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Printer className="h-4 w-4" /> Batch Print All ({allReceipts.length} Bills)
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{totalParticipants}</span> Total Participants •{" "}
            <span className="font-mono font-bold text-gold">₹{totalAmount.toLocaleString("en-IN")}.00</span> Total Verified
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: INDIVIDUAL SEARCH & VIEW                                          */}
        {/* ========================================================================= */}
        {activeTab === "lookup" && (
          <div className="space-y-8">
            {/* Search Box (Hidden on Print) */}
            <div className="mx-auto max-w-2xl print:hidden">
              <form onSubmit={handleSearch} className="surface-card p-4 sm:p-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Find Registration E-Bill
                </label>
                <div className="mt-2.5 flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Enter Mobile (e.g. 9618856782) or ID (e.g. SIH26-YA2FFD)..."
                      className="h-12 pl-10 text-sm"
                    />
                  </div>
                  <Button type="submit" variant="gold" className="h-12 px-6">
                    Search E-Bill
                  </Button>
                </div>

                {/* Quick Sample Suggestions */}
                <div className="mt-4 border-t border-border pt-3">
                  <p className="text-[0.7rem] font-medium text-muted-foreground">
                    Quick One-Click Lookups:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {[
                      { label: "Mind Mitra (Team of 6)", id: "SIH26-YA2FFD" },
                      { label: "TechX (Team of 6)", id: "SIH26-2NZ7RD" },
                      { label: "Team Nexora (Team of 6)", id: "SIH26-FWDDBZ" },
                      { label: "Sri Keerthi (Solo)", id: "9618856782" },
                      { label: "Punith (Solo)", id: "9705895461" },
                      { label: "Nithu Kumari (Solo)", id: "9142926414" },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setSearchQuery(s.id);
                          const m = findReceipt(s.id);
                          if (m) setSelectedReceipt(m);
                        }}
                        className="rounded-full border border-border bg-surface px-2.5 py-1 text-[0.65rem] text-muted-foreground transition-colors hover:border-gold/50 hover:text-foreground"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            {/* Display Selected E-Bill */}
            {selectedReceipt ? (
              <EBillPass receipt={selectedReceipt} />
            ) : (
              <div className="mx-auto max-w-md rounded-xl border border-border bg-surface p-8 text-center print:hidden">
                <p className="eyebrow mb-2">No Record Found</p>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Could not find a receipt for "{searchQuery}"
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Please double check the mobile number or registration ID, or check the All Registrations Directory tab.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <Button
                    variant="goldOutline"
                    size="sm"
                    onClick={() => setActiveTab("directory")}
                  >
                    Browse Directory ({allReceipts.length})
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: COORDINATOR DIRECTORY (ALL 30 REGISTERED)                         */}
        {/* ========================================================================= */}
        {activeTab === "directory" && (
          <div className="space-y-6 print:hidden">
            {/* Filter & Search Toolbar */}
            <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={directoryFilter}
                  onChange={(e) => setDirectoryFilter(e.target.value)}
                  placeholder="Search by participant name, team, phone, ID, or department..."
                  className="h-10 pl-10 text-xs"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant={categoryFilter === "all" ? "gold" : "outline"}
                  size="sm"
                  onClick={() => setCategoryFilter("all")}
                  className="text-xs"
                >
                  All ({allReceipts.length})
                </Button>
                <Button
                  variant={categoryFilter === "full_team" ? "gold" : "outline"}
                  size="sm"
                  onClick={() => setCategoryFilter("full_team")}
                  className="text-xs"
                >
                  Complete Teams ({allReceipts.filter((r) => r.type === "full_team").length})
                </Button>
                <Button
                  variant={categoryFilter === "matchmaking" ? "gold" : "outline"}
                  size="sm"
                  onClick={() => setCategoryFilter("matchmaking")}
                  className="text-xs"
                >
                  Solo / Matchmaking ({allReceipts.filter((r) => r.type === "matchmaking").length})
                </Button>
              </div>
            </div>

            {/* Registrations Directory Table */}
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-border bg-surface font-semibold text-muted-foreground">
                    <tr>
                      <th className="p-3">#</th>
                      <th className="p-3">Registration ID</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Team / Lead Name</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Members</th>
                      <th className="p-3">Total Paid</th>
                      <th className="p-3">Problem Statement / Skills</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredReceipts.map((r, idx) => (
                      <tr
                        key={r.registrationId}
                        className="transition-colors hover:bg-surface/60 cursor-pointer"
                        onClick={() => handleSelectFromDirectory(r)}
                      >
                        <td className="p-3 font-mono font-bold text-muted-foreground">
                          {idx + 1}
                        </td>
                        <td className="p-3 font-mono font-bold text-gold">
                          {r.registrationId}
                        </td>
                        <td className="p-3">
                          <Badge
                            variant={r.type === "full_team" ? "default" : "secondary"}
                            className="text-[0.65rem]"
                          >
                            {r.type === "full_team" ? "Full Team" : "Solo Pool"}
                          </Badge>
                        </td>
                        <td className="p-3 font-display font-medium text-foreground">
                          {r.teamName || r.teamLeader}
                        </td>
                        <td className="p-3 font-mono">+91 {r.leaderPhone}</td>
                        <td className="p-3 font-semibold">{r.memberCount}</td>
                        <td className="p-3 font-mono font-bold text-emerald-400">
                          ₹{(r.memberCount * 500).toLocaleString("en-IN")}.00
                        </td>
                        <td className="p-3 max-w-xs truncate text-muted-foreground">
                          {r.type === "full_team" ? (
                            <span>
                              <strong className="text-foreground">{r.problemStatementId}:</strong>{" "}
                              {r.problemStatementTitle}
                            </span>
                          ) : (
                            <span>{r.skills || "General / Software"}</span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <Button
                            variant="goldOutline"
                            size="sm"
                            className="h-8 text-[0.7rem]"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectFromDirectory(r);
                            }}
                          >
                            View E-Bill <ChevronRight className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredReceipts.length === 0 ? (
                <div className="p-8 text-center text-xs text-muted-foreground">
                  No registrations found matching "{directoryFilter}".
                </div>
              ) : null}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: BATCH PRINT ALL BILLS (FOR COORDINATORS)                           */}
        {/* ========================================================================= */}
        {activeTab === "bulk" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4 print:hidden">
              <div>
                <h3 className="font-display text-sm font-bold text-foreground">
                  Batch Print All {allReceipts.length} Official Registration Bills
                </h3>
                <p className="text-xs text-muted-foreground">
                  Generates all team and individual participant bills in continuous print sequence.
                </p>
              </div>

              <Button variant="gold" size="lg" onClick={handleBulkPrint} className="shadow-lg">
                <Printer className="h-4 w-4" /> Print All {allReceipts.length} E-Bills Now
              </Button>
            </div>

            {/* Continuous List of Bills for Batch Printing */}
            <div className="space-y-12">
              {allReceipts.map((r, idx) => (
                <div key={r.registrationId} className="page-break-after">
                  <div className="mb-2 text-xs font-bold text-muted-foreground print:hidden">
                    Bill #{idx + 1} of {allReceipts.length}: {r.teamName || r.teamLeader} ({r.registrationId})
                  </div>
                  <EBillPass receipt={r} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
