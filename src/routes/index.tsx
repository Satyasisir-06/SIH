import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, MapPin, Search, Sparkles, Trophy, Users, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/site/Countdown";
import { TechBackdrop } from "@/components/site/TechBackdrop";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { EVENT, FAQS } from "@/lib/event";
import { PROBLEM_STATEMENTS } from "@/data/problemStatements";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `SIH 2026 Internal Hackathon | ${EVENT.collegeName} Registration Portal` },
      {
        name: "description",
        content: `Register for the ${EVENT.collegeName} Smart India Hackathon 2026 internal round — ${EVENT.datesLong} at ${EVENT.venue}. Teams of up to ${EVENT.teamSize}. Registration closes ${EVENT.deadlineLabel}.`,
      },
      { property: "og:title", content: "Innovate. Collaborate. Solve. | SIH 2026 Internal Hackathon" },
      {
        property: "og:description",
        content: `Explore official problem statements and register your team before ${EVENT.deadlineLabel}.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-surface relative overflow-hidden border-b border-border">
        <TechBackdrop />
        <div className="section-y relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="max-w-3xl">
              <p className="eyebrow inline-flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-gold" />
                {EVENT.shortName} Internal Hackathon
              </p>
              <h1 className="mt-5 text-[clamp(2.25rem,9vw,4.5rem)] font-bold leading-[1.08] tracking-tight">
                {EVENT.tagline.split(". ").map((word, i) => (
                  <span key={word} className="block">
                    {i === 1 ? <span className="text-gold-gradient">{word}</span> : word}
                  </span>
                ))}
              </h1>
              <p className="mt-6 max-w-2xl text-[clamp(1rem,2.4vw,1.25rem)] leading-relaxed text-muted-foreground">
                {EVENT.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Button asChild variant="gold" size="lg" className="h-12 w-full px-8 sm:w-auto">
                  <Link to="/register">REGISTER NOW</Link>
                </Button>
                <Button
                  asChild
                  variant="goldOutline"
                  size="lg"
                  className="h-12 w-full px-8 sm:w-auto"
                >
                  <Link to="/problem-statements">EXPLORE PROBLEMS</Link>
                </Button>
              </div>

            </div>
          </Reveal>

          <Reveal delay={200} className="mt-12 sm:mt-16">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              <div className="surface-card flex items-center gap-4 p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gold-soft text-gold">
                  <Calendar className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <p className="eyebrow">Dates</p>
                  <p className="font-display font-bold">{EVENT.datesShort}</p>
                </div>
              </div>
              <div className="surface-card flex items-center gap-4 p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gold-soft text-gold">
                  <MapPin className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <p className="eyebrow">Venue</p>
                  <p className="font-display font-bold">{EVENT.venue.split(",")[0]}</p>
                </div>
              </div>
              <div className="surface-card flex items-center gap-4 p-5 sm:col-span-2 lg:col-span-1">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-gold/20 bg-gold-soft text-gold">
                  <Trophy className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <p className="eyebrow text-gold">Deadline</p>
                  <p className="font-display font-bold text-gold">{EVENT.deadlineLabel}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="border-b border-border bg-burgundy-deep py-10 sm:py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row md:gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold sm:text-2xl">Registration Closes In</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Don't miss the {EVENT.deadlineLabel} deadline
            </p>
          </div>
          <Countdown />
        </div>
      </section>


      {/* Quick Info / Rules Section */}
      <section id="event" className="section-y mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading 
          eyebrow="Guidelines" 
          title="Everything you need to know" 
          subtitle="Before you start, make sure your team meets all the criteria for the internal round."
        />
        
        <div className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          <Reveal delay={100}>
            <div className="surface-card h-full p-6 sm:p-8">
              <Users className="h-8 w-8 text-gold mb-6" />
              <h3 className="text-xl font-bold mb-4">Team Formation</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                  <span>Maximum {EVENT.teamSize} members per team.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                  <span>{EVENT.femaleMemberRule}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                  <span>{EVENT.eligibility}</span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="surface-card h-full p-6 sm:p-8">
              <Search className="h-8 w-8 text-gold mb-6" />
              <h3 className="text-xl font-bold mb-4">Problem Selection</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                  <span>Choose from {PROBLEM_STATEMENTS.length} official SIH problem statements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                  <span>Select between Software and Hardware categories.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                  <span>Develop technology-based solutions for real-world problems.</span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="surface-card h-full p-6 sm:p-8">
              <Trophy className="h-8 w-8 text-gold mb-6" />
              <h3 className="text-xl font-bold mb-4">Registration & Entry</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                  <span className="font-semibold text-emerald-400">Free Registration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                  <span>No registration fee for eligible students.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                  <span>Instant team registration ID on submission.</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How to Participate */}
      <section id="participate" className="section-y bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0">
              <p className="eyebrow">Participation</p>
              <h2 className="mt-3 text-[clamp(1.75rem,5vw,2.25rem)] font-bold">
                How to join the race?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Follow these steps to successfully register your team for the internal hackathon.
              </p>

              <ol className="mt-10 space-y-7">
                {[
                  { title: "Browse Problems", desc: "Visit the problem statements page and find a challenge that fits your team's skills." },
                  { title: "Form Your Team", desc: "Assemble a team of up to 6 members. Ensure you have at least one female member." },
                  { title: "Register Team", desc: "Fill the registration form with your team members and selected problem statement." },
                  { title: "Confirmation", desc: "Receive your unique SIH26 registration ID. Your team is now in the running!" }
                ].map((step, i) => (
                  <li key={i} className="flex gap-4 sm:gap-6">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/20 bg-gold-soft font-display font-bold text-gold">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-base font-bold">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {step.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="surface-card min-w-0 p-1">
              <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-burgundy-deep p-6 text-center sm:p-10 lg:aspect-square">
                <div className="mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-gold-soft text-gold sm:h-20 sm:w-20">
                  <Rocket className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <h3 className="text-[clamp(1.5rem,4.5vw,1.875rem)] font-bold leading-tight">
                  Ready to take the challenge?
                </h3>
                <p className="mx-auto mt-4 max-w-xs text-sm text-muted-foreground sm:text-base">
                  The countdown has started. Secure your team's spot in the {EVENT.shortName}{" "}
                  internal round today.
                </p>
                <Button
                  asChild
                  variant="gold"
                  size="lg"
                  className="mt-8 h-13 w-full max-w-xs text-sm sm:h-14 sm:text-lg"
                >
                  <Link to="/register">
                    REGISTER YOUR TEAM <ArrowRight className="ml-1 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-y mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow="Support" title="Frequently asked questions" align="center" />

        <div className="mt-10 sm:mt-12">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                <AccordionTrigger className="min-h-14 text-left font-semibold transition-colors hover:text-gold">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="surface-card mt-12 border-dashed border-gold/30 p-6 text-center sm:p-8">
          <p className="mb-4 text-sm text-muted-foreground">Still have questions?</p>
          <Button asChild variant="goldOutline" className="h-11 w-full sm:w-auto">
            <Link to="/contact">CONTACT COORDINATORS</Link>
          </Button>
        </div>
      </section>

    </>
  );
}
