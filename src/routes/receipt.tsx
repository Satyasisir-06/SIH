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
      { title: "Download E-Bill & Event Pass | SIH 2026 Internal Hackathon" },
      {
        name: "description",
        content:
          "Search and download your official SIH 2026 registration e-bill, receipt, and venue entry pass.",
      },
      { property: "og:title", content: "SIH 2026 Official E-Bill & Pass" },
      {
        property: "og:description",
        content: "Search and download your official team e-bill and participant pass for SIH 2026.",
      },
    ],
  }),
  component: ReceiptPage,
});

function ReceiptPage() {
  const { id: queryId, phone: queryPhone } = Route.useSearch();
  const [searchQuery, setSearchQuery] = useState(queryId || queryPhone || "");
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptData | undefined>(undefined);

  const allReceipts = useMemo(() => getAllExistingReceipts(), []);

  // Sync if query param in URL changes
  useEffect(() => {
    const q = queryId || queryPhone || "";
    if (q) {
      setSearchQuery(q);
      const match = findReceipt(q);
      if (match) setSelectedReceipt(match);
    } else {
      // Default to first team for instant preview if no query
      setSelectedReceipt(allReceipts[0]);
    }
  }, [queryId, queryPhone, allReceipts]);

  function handleSearch(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    const match = findReceipt(searchQuery);
    setSelectedReceipt(match);
  }

  return (
    <div className="min-h-[80vh]">
      {/* Hero / Header Section */}
      <section className="hero-surface border-b border-border print:hidden">
        <div className="section-y mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow inline-flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-gold" /> SIH 2026 E-Receipt Portal
            </p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
              Download your <span className="text-gold-gradient">E-Bill &amp; Pass</span>
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Search by your <strong>Registration ID</strong> (e.g. <code>SIH26-YA2FFD</code> or <code>SIH26-POOL-5BZKGV</code>) or your <strong>Mobile Number</strong> to view and print your official registration receipt.
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

      {/* Main Search & Display Container */}
      <div className="section-y mx-auto max-w-7xl px-4 sm:px-6">
        {/* Search Bar Box (Hidden on Print) */}
        <div className="mx-auto mb-10 max-w-2xl print:hidden">
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
                Quick Sample Lookups:
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {[
                  { label: "Mind Mitra (Team)", id: "SIH26-YA2FFD" },
                  { label: "TechX (Team)", id: "SIH26-2NZ7RD" },
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

        {/* Display Selected E-Bill or Not Found Notice */}
        {selectedReceipt ? (
          <EBillPass receipt={selectedReceipt} />
        ) : (
          <div className="mx-auto max-w-md rounded-xl border border-border bg-surface p-8 text-center print:hidden">
            <p className="eyebrow mb-2">No Record Found</p>
            <h3 className="font-display text-lg font-bold text-foreground">
              Could not find a receipt for "{searchQuery}"
            </h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Please double check the 10-digit mobile number or registration ID. If you just registered, your record is confirmed and can also be verified by coordinators at the venue.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button
                variant="goldOutline"
                size="sm"
                onClick={() => setSelectedReceipt(allReceipts[0])}
              >
                View Sample E-Bill
              </Button>
              <Button asChild variant="gold" size="sm">
                <Link to="/register">Register Now</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
