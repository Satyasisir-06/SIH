import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { Countdown } from "@/components/site/Countdown";
import { EVENT } from "@/lib/event";

const searchSchema = z.object({
  ps: z.string().optional(),
  mode: z.enum(["team", "solo"]).optional(),
});

export const Route = createFileRoute("/register")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Registration & Team Matchmaking | SIH 2026 Internal Hackathon" },
      {
        name: "description",
        content:
          "Register your full team (6 members) or join the solo participant & matchmaking pool for the SIH 2026 internal hackathon.",
      },
      { property: "og:title", content: "Registration & Team Matchmaking | SIH 2026" },
      {
        property: "og:description",
        content: `Register full teams or find teammates for the SIH 2026 internal hackathon. Deadline ${EVENT.deadlineLabel}.`,
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { ps, mode } = Route.useSearch();

  return (
    <>
      <section className="hero-surface border-b border-border">
        <div className="section-y mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">SIH 2026 Registration</p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
              Register <span className="text-gold-gradient">online</span>
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Register a complete 6-member team or enter the matchmaking pool to find teammates.
            </p>
          </div>
          <div className="shrink-0">
            <p className="eyebrow mb-2">Closes {EVENT.deadlineLabel}</p>
            <Countdown compact />
          </div>
        </div>
      </section>

      <section className="section-y mx-auto max-w-7xl px-4 sm:px-6">
        <RegistrationForm presetProblemId={ps ?? undefined} initialMode={mode ?? undefined} />
      </section>
    </>
  );
}
