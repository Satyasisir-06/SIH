import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { COORDINATORS, EVENT } from "@/lib/event";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Coordinators | SIH 2026 Internal Hackathon" },
      {
        name: "description",
        content:
          "Reach the SIH 2026 internal hackathon faculty SPOC and student coordinators for registration, team or problem statement queries.",
      },
      { property: "og:title", content: "Contact the SIH 2026 organising team" },
      {
        property: "og:description",
        content: "Faculty SPOC and student coordinator contact details for SIH 2026 internal round.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="section-y mx-auto max-w-7xl px-4 sm:px-6">
      <SectionHeading
        eyebrow="Contact"
        title="Talk to the organising team"
        subtitle="For any query about registration, teams, guidelines or problem statements, reach out to the coordinators below."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {COORDINATORS.map((c) => (
          <article key={c.name} className="surface-card p-6">
            <p className="eyebrow">{c.role}</p>
            <h3 className="mt-3 font-display text-xl font-semibold">{c.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.detail}</p>
            <a
              href={`tel:${c.phone}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
            >
              <Phone className="h-4 w-4" /> {c.phone}
            </a>
          </article>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="surface-card p-6">
          <span className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-gold-soft text-gold">
            <MapPin className="h-5 w-5" />
          </span>
          <h3 className="font-display text-lg font-semibold">Venue</h3>
          <p className="mt-2 text-sm text-muted-foreground">{EVENT.venue}</p>
        </div>
        <div className="surface-card p-6">
          <span className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-gold-soft text-gold">
            <CalendarDays className="h-5 w-5" />
          </span>
          <h3 className="font-display text-lg font-semibold">Event dates</h3>
          <p className="mt-2 text-sm text-muted-foreground">{EVENT.datesLong}</p>
          <p className="mt-1 text-sm font-semibold text-gold">
            Registration closes {EVENT.deadlineLabel}
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Button asChild variant="gold" size="lg" className="w-full sm:w-auto">
          <Link to="/register">Register now</Link>
        </Button>
      </div>
    </section>
  );
}
