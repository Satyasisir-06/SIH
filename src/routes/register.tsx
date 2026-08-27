import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { Countdown } from "@/components/site/Countdown";
import { EVENT } from "@/lib/event";

const searchSchema = z.object({
  ps: z.string().optional(),
});

export const Route = createFileRoute("/register")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Team Registration | SIH 2026 Internal Hackathon" },
      {
        name: "description",
        content:
          "Register your team for the SIH 2026 internal hackathon: team details and problem statement selection.",
      },
      { property: "og:title", content: "Register your team | SIH 2026 Internal Hackathon" },
      {
        property: "og:description",
        content: `Two-step registration for the SIH 2026 internal hackathon. Deadline ${EVENT.deadlineLabel}.`,
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { ps } = Route.useSearch();

  return (
    <>
      <section className="hero-surface border-b border-border">
        <div className="section-y mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Registration</p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
              Register your <span className="text-gold-gradient">team</span>
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              {EVENT.feeLabel} • Teams of {EVENT.teamSize} members • {EVENT.femaleMemberRule}
            </p>
          </div>
          <div className="shrink-0">
            <p className="eyebrow mb-2">Closes {EVENT.deadlineLabel}</p>
            <Countdown compact />
          </div>
        </div>
      </section>

      <section className="section-y mx-auto max-w-7xl px-4 sm:px-6">
        <RegistrationForm presetProblemId={ps ?? undefined} />
      </section>
    </>
  );
}
