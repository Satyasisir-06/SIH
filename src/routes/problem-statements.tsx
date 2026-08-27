import { createFileRoute } from "@tanstack/react-router";
import { ProblemExplorer } from "@/components/problems/ProblemExplorer";
import { PROBLEM_STATEMENTS } from "@/data/problemStatements";

export const Route = createFileRoute("/problem-statements")({
  head: () => ({
    meta: [
      { title: `Problem Statements (${PROBLEM_STATEMENTS.length}) | SIH 2026 Internal Hackathon` },
      {
        name: "description",
        content:
          "Search and filter the official Smart India Hackathon problem statements by domain, category, organisation and technology, then register your team.",
      },
      { property: "og:title", content: "SIH 2026 Problem Statement Explorer" },
      {
        property: "og:description",
        content:
          "Filter official SIH problem statements by domain, category and organisation for the internal hackathon.",
      },
    ],
  }),
  component: ProblemStatementsPage,
});

function ProblemStatementsPage() {
  return (
    <>
      <section className="hero-surface relative border-b border-border">
        <div className="section-y mx-auto max-w-7xl px-4 sm:px-6">
          <p className="eyebrow">Problem statement explorer</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            {PROBLEM_STATEMENTS.length} official{" "}
            <span className="text-gold-gradient">problem statements</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground">
            Released by ministries, departments, PSUs and industry partners. Search, filter and pick
            the challenge your team wants to solve — your selection carries straight into the
            registration form.
          </p>
        </div>
      </section>

      <section className="section-y mx-auto max-w-7xl px-4 sm:px-6">
        <ProblemExplorer />
      </section>
    </>
  );
}
