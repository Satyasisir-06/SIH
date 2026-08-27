import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Copy,
  Info,
  Layers,
  Loader2,
  Search,
  Sparkles,
  Tag,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { EVENT, YEAR_OPTIONS, COORDINATORS } from "@/lib/event";
import { PROBLEM_STATEMENTS, type ProblemStatement } from "@/data/problemStatements";
import { submitRegistration } from "@/lib/registration.functions";
import type { SubmitRegistrationResult } from "@/lib/registration.functions";
import type { RegistrationInput, TeamMemberInput } from "@/lib/registration-schema";

const STEPS = ["Team Details", "Problem Statement"] as const;

const TEAM_SIZE = 6;

const emptyMember = (): TeamMemberInput => ({
  name: "",
  collegeRegId: "",
  year: "",
  department: "",
  gender: "Male",
});

export function findProblemStatement(idOrQuery: string): ProblemStatement | undefined {
  if (!idOrQuery) return undefined;
  const q = idOrQuery.trim().toLowerCase();
  const cleanQ = q.replace(/[\s-_]/g, "");

  // 1. Direct match by ID
  const directMatch = PROBLEM_STATEMENTS.find((p) => {
    const pIdClean = p.id.toLowerCase().replace(/[\s-_]/g, "");
    return pIdClean === cleanQ || p.id.toLowerCase() === q;
  });
  if (directMatch) return directMatch;

  // 2. Numeric suffix match (e.g. "26001" or "001")
  if (cleanQ.length >= 3) {
    const suffixMatch = PROBLEM_STATEMENTS.find((p) => {
      const pIdClean = p.id.toLowerCase().replace(/[\s-_]/g, "");
      return pIdClean.endsWith(cleanQ);
    });
    if (suffixMatch) return suffixMatch;
  }

  // 3. Title match if exact or startsWith
  return PROBLEM_STATEMENTS.find(
    (p) => p.title.toLowerCase() === q || p.title.toLowerCase().startsWith(q),
  );
}

type FormState = Omit<RegistrationInput, "members"> & { members: TeamMemberInput[] };

const initialState = (presetPs?: string): FormState => {
  const matched = presetPs ? findProblemStatement(presetPs) : undefined;
  return {
    teamName: "",
    teamLeader: "",
    members: Array.from({ length: TEAM_SIZE }, emptyMember),
    problemStatementId: matched ? matched.id : (presetPs ?? ""),
    problemStatementTitle: matched ? matched.title : "",
    problemStatementDomain: matched ? matched.domain || matched.theme : "",
    paymentTxnId: "FREE",
    paymentScreenshot: null,
  };
};

export function RegistrationForm({ presetProblemId }: { presetProblemId?: string | undefined }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(() => initialState(presetProblemId));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitRegistrationResult | null>(null);
  const [catalogSearch, setCatalogSearch] = useState("");
  const submit = useServerFn(submitRegistration);

  // Sync state if preset problem ID from URL changes or loads
  useEffect(() => {
    if (presetProblemId) {
      const matched = findProblemStatement(presetProblemId);
      setForm((f) => ({
        ...f,
        problemStatementId: matched ? matched.id : presetProblemId,
        problemStatementTitle: matched ? matched.title : f.problemStatementTitle,
        problemStatementDomain: matched
          ? matched.domain || matched.theme
          : f.problemStatementDomain,
      }));
    }
  }, [presetProblemId]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  // Find currently matched problem statement
  const matchedStatement = useMemo(() => {
    return findProblemStatement(form.problemStatementId);
  }, [form.problemStatementId]);

  // Filter list for problem statement search helper
  const searchResults = useMemo(() => {
    const q = catalogSearch.trim().toLowerCase();
    if (!q) return PROBLEM_STATEMENTS.slice(0, 8);
    return PROBLEM_STATEMENTS.filter(
      (p) =>
        p.id.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.organization.toLowerCase().includes(q) ||
        p.theme.toLowerCase().includes(q),
    ).slice(0, 10);
  }, [catalogSearch]);

  function handleSelectProblem(problem: ProblemStatement) {
    setForm((f) => ({
      ...f,
      problemStatementId: problem.id,
      problemStatementTitle: problem.title,
      problemStatementDomain: problem.domain || problem.theme,
    }));
    setErrors((e) => {
      const copy = { ...e };
      delete copy["problemStatementId"];
      delete copy["problemStatementTitle"];
      return copy;
    });
    setCatalogSearch("");
    toast.success(`Selected ${problem.id}: ${problem.title.slice(0, 45)}…`);
  }

  function handleProblemIdInput(inputId: string) {
    const matched = findProblemStatement(inputId);
    if (matched) {
      setForm((f) => ({
        ...f,
        problemStatementId: inputId,
        problemStatementTitle: matched.title,
        problemStatementDomain: matched.domain || matched.theme,
      }));
      setErrors((e) => {
        const copy = { ...e };
        delete copy["problemStatementId"];
        delete copy["problemStatementTitle"];
        return copy;
      });
    } else {
      set("problemStatementId", inputId);
    }
  }

  function validateStep(current: number) {
    const e: Record<string, string> = {};
    if (current === 0) {
      if (form.teamName.trim().length < 2) e["teamName"] = "Enter a team name";
      if (form.teamLeader.trim().length < 2) e["teamLeader"] = "Enter the team leader name";
      form.members.forEach((m, i) => {
        if (m.name.trim().length < 2) e[`m${i}name`] = "Required";
        if (m.collegeRegId.trim().length < 3) e[`m${i}id`] = "Required";
        if (!m.year) e[`m${i}year`] = "Required";
        if (m.department.trim().length < 2) e[`m${i}dept`] = "Required";
      });
      if (!form.members.some((m) => m.gender === "Female")) {
        e["female"] =
          "At least one female team member is mandatory. Set at least one member's gender to Female.";
      }
    }
    if (current === 1) {
      if (!form.problemStatementId.trim()) {
        e["problemStatementId"] = "Enter the problem statement number (e.g. SIH26001)";
      }
      if (!form.problemStatementTitle.trim()) {
        e["problemStatementTitle"] = "Enter the problem statement title";
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validateStep(step)) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    if (!validateStep(1)) {
      toast.error("Please fill in the problem statement details.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await submit({
        data: {
          ...form,
          paymentTxnId: "FREE",
          paymentScreenshot: null,
        } as RegistrationInput,
      });
      setResult(res);
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.success("Team registration submitted successfully!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (result) return <Confirmation result={result} />;

  return (
    <div className="mx-auto max-w-4xl">
      <Stepper step={step} />

      <div className="surface-card mt-8 p-6 sm:p-8">
        {step === 0 ? (
          <Section
            title="Team Details"
            hint={`Exactly ${TEAM_SIZE} members required. ${EVENT.femaleMemberRule}`}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Team name" error={errors["teamName"] ?? undefined}>
                <Input
                  value={form.teamName}
                  onChange={(e) => set("teamName", e.target.value)}
                  placeholder="e.g. Team Innovators"
                />
              </Field>
              <Field label="Team leader" error={errors["teamLeader"] ?? undefined}>
                <Input
                  value={form.teamLeader}
                  onChange={(e) => set("teamLeader", e.target.value)}
                  placeholder="Leader's full name"
                />
              </Field>
            </div>

            <div className="mt-8 space-y-5">
              {form.members.map((m, i) => (
                <div key={i} className="rounded-lg border border-border bg-surface p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="eyebrow">
                      {i === 0 ? `Member 1 (Team Leader)` : `Member ${i + 1}`}
                    </p>
                    {i === 0 && form.teamLeader ? (
                      <span className="text-xs text-muted-foreground">Leader</span>
                    ) : null}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Field label="Full Name" error={errors[`m${i}name`] ?? undefined}>
                      <Input
                        value={m.name}
                        placeholder="Student name"
                        onChange={(e) =>
                          set(
                            "members",
                            form.members.map((x, idx) =>
                              idx === i ? { ...x, name: e.target.value } : x,
                            ),
                          )
                        }
                      />
                    </Field>
                    <Field label="College Reg ID" error={errors[`m${i}id`] ?? undefined}>
                      <Input
                        value={m.collegeRegId}
                        placeholder="e.g. 23B91A0501"
                        onChange={(e) =>
                          set(
                            "members",
                            form.members.map((x, idx) =>
                              idx === i ? { ...x, collegeRegId: e.target.value } : x,
                            ),
                          )
                        }
                      />
                    </Field>
                    <Field label="Year" error={errors[`m${i}year`] ?? undefined}>
                      <Select
                        value={m.year}
                        onValueChange={(v) =>
                          set(
                            "members",
                            form.members.map((x, idx) => (idx === i ? { ...x, year: v } : x)),
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {YEAR_OPTIONS.map((y) => (
                            <SelectItem key={y} value={y}>
                              {y}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Department" error={errors[`m${i}dept`] ?? undefined}>
                      <Input
                        value={m.department}
                        placeholder="e.g. CSE, ECE, AI"
                        onChange={(e) =>
                          set(
                            "members",
                            form.members.map((x, idx) =>
                              idx === i ? { ...x, department: e.target.value } : x,
                            ),
                          )
                        }
                      />
                    </Field>
                    <Field label="Gender">
                      <Select
                        value={m.gender}
                        onValueChange={(v) =>
                          set(
                            "members",
                            form.members.map((x, idx) =>
                              idx === i ? { ...x, gender: v as TeamMemberInput["gender"] } : x,
                            ),
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                </div>
              ))}
            </div>

            {errors["female"] ? (
              <p className="mt-4 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {errors["female"]}
              </p>
            ) : null}
          </Section>
        ) : null}

        {step === 1 ? (
          <Section
            title="Problem Statement"
            hint="Select or enter the official SIH 2026 problem statement your team will solve."
          >
            <div className="space-y-6">
              {/* Quick Search / Catalog Picker */}
              <div className="rounded-lg border border-gold/30 bg-gold-soft/30 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
                  <Search className="h-4 w-4" /> Quick Search SIH Problem Catalog (
                  {PROBLEM_STATEMENTS.length} available)
                </div>
                <div className="mt-2.5">
                  <Input
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    placeholder="Search by ID (e.g. SIH26001), keyword (e.g. AI, Drone, Waste), or Ministry…"
                    className="bg-background"
                  />
                </div>

                {catalogSearch.trim() ? (
                  <div className="mt-3 max-h-56 overflow-y-auto space-y-2 rounded-md border border-border bg-background p-2">
                    {searchResults.length === 0 ? (
                      <p className="p-3 text-center text-xs text-muted-foreground">
                        No matching problem statement found. You can type custom details below.
                      </p>
                    ) : (
                      searchResults.map((ps) => (
                        <button
                          key={ps.id}
                          type="button"
                          onClick={() => handleSelectProblem(ps)}
                          className="flex w-full flex-col items-start rounded p-2.5 text-left text-xs transition-colors hover:bg-surface hover:text-foreground"
                        >
                          <div className="flex w-full items-center justify-between">
                            <span className="font-display font-bold text-gold">{ps.id}</span>
                            <Badge
                              variant="outline"
                              className="text-[0.65rem] border-border"
                            >
                              {ps.category}
                            </Badge>
                          </div>
                          <p className="mt-1 line-clamp-1 font-medium text-foreground">
                            {ps.title}
                          </p>
                          <p className="text-[0.65rem] text-muted-foreground">{ps.organization}</p>
                        </button>
                      ))
                    )}
                  </div>
                ) : null}
              </div>

              {/* Problem Statement Number Input */}
              <Field
                label="Problem statement number / ID"
                error={errors["problemStatementId"] ?? undefined}
              >
                <div className="relative">
                  <Input
                    value={form.problemStatementId}
                    onChange={(e) => handleProblemIdInput(e.target.value)}
                    placeholder="e.g. SIH26001"
                    className="h-11 font-mono uppercase"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Typing a valid ID (e.g. <span className="text-gold font-mono">SIH26001</span>) will
                  automatically look up and fill in the full problem statement and domain.
                </p>
              </Field>

              {/* Matched Problem Statement Live Card */}
              {matchedStatement ? (
                <div className="rounded-xl border border-gold/40 bg-gold-soft/20 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-base font-bold text-gold">
                        {matchedStatement.id}
                      </span>
                      <Badge variant={matchedStatement.category === "Hardware" ? "secondary" : "default"}>
                        {matchedStatement.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                      <CheckCircle2 className="h-4 w-4" />
                      Auto-filled from SIH Catalog
                    </div>
                  </div>

                  <p className="mt-3 font-display text-sm font-semibold text-foreground">
                    {matchedStatement.title}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5 text-gold" />
                      {matchedStatement.organization}
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers className="h-3.5 w-3.5 text-gold" />
                      {matchedStatement.theme}
                    </span>
                  </div>

                  {matchedStatement.tags.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {matchedStatement.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[0.65rem] text-muted-foreground"
                        >
                          <Tag className="h-2.5 w-2.5 text-gold" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}

              {/* Problem Statement Full Title Textarea */}
              <Field
                label="Problem statement description / title"
                error={errors["problemStatementTitle"] ?? undefined}
              >
                <Textarea
                  value={form.problemStatementTitle}
                  onChange={(e) => set("problemStatementTitle", e.target.value)}
                  placeholder="Full title or description of the problem statement…"
                  rows={5}
                />
              </Field>

              {/* Review summary box */}
              <div className="rounded-lg border border-border bg-surface p-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Info className="h-4 w-4 text-gold" /> Registration Summary
                </div>
                <div className="mt-3 grid gap-3 text-xs sm:grid-cols-2">
                  <div>
                    <span className="text-muted-foreground">Team Name:</span>{" "}
                    <span className="font-semibold text-foreground">
                      {form.teamName || "(Not entered)"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Team Leader:</span>{" "}
                    <span className="font-semibold text-foreground">
                      {form.teamLeader || "(Not entered)"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Team Size:</span>{" "}
                    <span className="font-semibold text-foreground">6 Members</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Entry Fee:</span>{" "}
                    <span className="font-semibold text-emerald-400">
                      Free (Internal Hackathon)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        ) : null}

        {/* Form navigation buttons */}
        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={back}
            disabled={step === 0 || submitting}
            className="h-12 w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Team Details
          </Button>

          {step === 0 ? (
            <Button
              type="button"
              variant="gold"
              size="lg"
              onClick={next}
              className="h-12 w-full sm:w-auto"
            >
              Continue to Problem Statement <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="gold"
              size="lg"
              onClick={() => void handleSubmit()}
              disabled={submitting}
              className="h-12 w-full sm:w-auto"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {submitting ? "Submitting Registration…" : "Submit Registration"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div>
      {/* Compact indicator for small screens */}
      <div className="sm:hidden">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-display text-base font-bold">{STEPS[step]}</p>
          <p className="shrink-0 text-xs uppercase tracking-wider text-muted-foreground">
            Step {step + 1} of {STEPS.length}
          </p>
        </div>
        <div
          className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-valuenow={step + 1}
          aria-label={`Registration step ${step + 1} of ${STEPS.length}`}
        >
          <div
            className="h-full rounded-full bg-[image:var(--gradient-gold)] transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <ol
        className="hidden gap-2 sm:grid"
        style={{ gridTemplateColumns: `repeat(${STEPS.length}, minmax(0, 1fr))` }}
      >
        {STEPS.map((label, i) => (
          <li key={label} className="text-center">
            <div
              className={cn(
                "mx-auto grid h-9 w-9 place-items-center rounded-full border font-display text-sm font-bold transition-colors",
                i < step && "border-gold bg-gold-soft text-gold",
                i === step && "border-gold bg-[image:var(--gradient-gold)] text-accent-foreground",
                i > step && "border-border text-muted-foreground",
              )}
              aria-current={i === step ? "step" : undefined}
            >
              {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </div>
            <p
              className={cn(
                "mt-2 text-[0.7rem] uppercase tracking-wider",
                i === step ? "text-gold font-semibold" : "text-muted-foreground",
              )}
            >
              {label}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-xl font-bold">{title}</h2>
      {hint ? <p className="mt-1 text-sm text-muted-foreground">{hint}</p> : null}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function Confirmation({ result }: { result: SubmitRegistrationResult }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold-soft text-gold">
        <CheckCircle2 className="h-8 w-8" />
      </span>
      <h2 className="mt-6 text-3xl font-bold">Registration Confirmed!</h2>
      <p className="mt-3 text-muted-foreground">
        Your team has been successfully registered for the SIH 2026 Internal Hackathon.
      </p>

      <div className="surface-card mt-8 p-8">
        <p className="eyebrow">Your Unique Registration ID</p>
        <p className="mt-3 font-display text-3xl font-bold tracking-wider text-gold">
          {result.registrationId}
        </p>
        <Button
          variant="goldOutline"
          size="sm"
          className="mt-4"
          onClick={() => {
            void navigator.clipboard.writeText(result.registrationId);
            toast.success("Registration ID copied to clipboard");
          }}
        >
          <Copy className="h-4 w-4" /> Copy ID
        </Button>

        <dl className="mt-8 grid gap-4 text-left sm:grid-cols-2">
          <Summary label="Team Name" value={result.teamName} />
          <Summary label="Members" value={`${result.memberCount} Participants`} />
          <Summary label="Problem Statement ID" value={result.problemStatementId} />
          <Summary label="Problem Statement" value={result.problemStatementTitle} />
          <Summary label="Event Dates" value={EVENT.datesLong} />
          <Summary label="Venue" value={EVENT.venue} />
        </dl>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-surface p-6 text-left text-sm text-muted-foreground">
        <p className="eyebrow mb-3">Hackathon Coordinators</p>
        {COORDINATORS.map((c) => (
          <p key={c.name} className="py-0.5">
            <span className="font-semibold text-foreground">{c.name}</span> ({c.role}, {c.detail}) —{" "}
            <a href={`tel:${c.phone}`} className="text-gold hover:underline">
              {c.phone}
            </a>
          </p>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild variant="gold" size="lg">
          <Link to="/">Back to Home</Link>
        </Button>
        <Button asChild variant="goldOutline" size="lg">
          <Link to="/problem-statements">View All Problem Statements</Link>
        </Button>
      </div>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <dt className="eyebrow mb-1">{label}</dt>
      <dd className="text-sm font-medium text-foreground line-clamp-3">{value}</dd>
    </div>
  );
}
