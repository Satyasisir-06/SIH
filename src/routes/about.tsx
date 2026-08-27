import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Lightbulb, Rocket, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { EVENT } from "@/lib/event";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Smart India Hackathon | SIH 2026 Internal Round" },
      {
        name: "description",
        content:
          "What Smart India Hackathon is, why the internal round matters, and how student teams progress to the national SIH grand finale.",
      },
      { property: "og:title", content: "About Smart India Hackathon | SIH 2026" },
      {
        property: "og:description",
        content:
          "Learn about SIH, the internal hackathon round and the road to the national grand finale.",
      },
    ],
  }),
  component: AboutPage,
});

const PILLARS = [
  {
    icon: Lightbulb,
    title: "Innovation",
    body: "Turn real government and industry problem statements into working prototypes.",
  },
  {
    icon: Users,
    title: "Teamwork",
    body: "Cross-branch teams of up to 6 students, with at least one female member.",
  },
  {
    icon: Rocket,
    title: "Problem Solving",
    body: "36 hours of building, mentoring and iteration inside the campus hackathon.",
  },
  {
    icon: Award,
    title: "National Stage",
    body: "Shortlisted internal teams are nominated for the national SIH grand finale.",
  },
];

function AboutPage() {
  return (
    <>
      <section className="hero-surface relative border-b border-border">
        <div className="section-y mx-auto max-w-7xl px-4 sm:px-6">
          <p className="eyebrow">About the initiative</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Smart India Hackathon is India's largest{" "}
            <span className="text-gold-gradient">open innovation model</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            SIH is a nationwide initiative that invites students to solve pressing problems posed
            by ministries, departments, PSUs and industries. Our internal hackathon is the campus
            qualifier that selects the teams representing the college.
          </p>
        </div>
      </section>

      <section className="section-y mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Objective"
          title="Why we run the internal hackathon"
          subtitle={EVENT.objective}
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <article className="surface-card h-full p-6">
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-gold-soft text-gold">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="section-y mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">The journey</h2>
            <ol className="mt-8 space-y-6">
              {[
                `Register your team and select a problem statement before ${EVENT.deadlineLabel}.`,
                `Compete in the internal hackathon from ${EVENT.datesLong} at the ${EVENT.venue}.`,
                "Present your prototype to the evaluation panel of faculty and industry mentors.",
                "Selected teams are nominated by the college for the national Smart India Hackathon.",
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/50 font-display text-sm font-bold text-gold">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="surface-card flex flex-col justify-center p-8">
            <p className="eyebrow">Ready?</p>
            <h3 className="mt-3 text-2xl font-bold">Build something that matters</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Browse the official problem statements, pick the one that excites your team, and lock
              your registration before the deadline.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild variant="gold" size="lg" className="w-full sm:w-auto">
                <Link to="/register">Register your team</Link>
              </Button>
              <Button asChild variant="goldOutline" size="lg" className="w-full sm:w-auto">
                <Link to="/problem-statements">Explore problems</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
