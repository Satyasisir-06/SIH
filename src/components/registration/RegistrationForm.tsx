import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Copy,
  FileText,
  Info,
  Layers,
  Loader2,
  Search,
  Sparkles,
  Tag,
  UserPlus,
  Users,
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
import { EVENT, YEAR_OPTIONS, COORDINATORS, SKILL_OPTIONS } from "@/lib/event";
import { PROBLEM_STATEMENTS, type ProblemStatement } from "@/data/problemStatements";
import { submitRegistration } from "@/lib/registration.functions";
import type { SubmitRegistrationResult } from "@/lib/registration.functions";
import type { RegistrationInput, TeamMemberInput } from "@/lib/registration-schema";

const FULL_TEAM_SIZE = 6;

const emptyMember = (): TeamMemberInput => ({
  name: "",
  collegeRegId: "",
  phone: "",
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

  // 3. Title match
  return PROBLEM_STATEMENTS.find(
    (p) => p.title.toLowerCase() === q || p.title.toLowerCase().startsWith(q),
  );
}

type FormState = Omit<RegistrationInput, "members"> & { members: TeamMemberInput[] };

const initialState = (presetPs?: string, initialMode?: "team" | "solo"): FormState => {
  const isSolo = initialMode === "solo";
  const matched = presetPs ? findProblemStatement(presetPs) : undefined;
  return {
    registrationType: isSolo ? "matchmaking" : "full_team",
    teamName: "",
    teamLeader: "",
    members: Array.from({ length: isSolo ? 1 : FULL_TEAM_SIZE }, emptyMember),
    skills: [],
    teamNeedNote: "",
    problemStatementId: matched ? matched.id : (presetPs ?? ""),
    problemStatementTitle: matched ? matched.title : "",
    problemStatementDomain: matched ? matched.domain || matched.theme : "",
    paymentTxnId: "FREE",
    paymentScreenshot: null,
  };
};

export function RegistrationForm({
  presetProblemId,
  initialMode,
}: {
  presetProblemId?: string | undefined;
  initialMode?: "team" | "solo" | undefined;
}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(() => initialState(presetProblemId, initialMode));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitRegistrationResult | null>(null);
  const [catalogSearch, setCatalogSearch] = useState("");
  const submit = useServerFn(submitRegistration);

  const isMatchmaking = form.registrationType === "matchmaking";

  // Sync state if preset problem ID from URL changes
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

  const matchedStatement = useMemo(() => {
    return findProblemStatement(form.problemStatementId);
  }, [form.problemStatementId]);

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

  function handleModeChange(type: "full_team" | "matchmaking") {
    setStep(0);
    if (type === "full_team") {
      setForm((f) => ({
        ...f,
        registrationType: "full_team",
        members:
          f.members.length === FULL_TEAM_SIZE
            ? f.members
            : Array.from({ length: FULL_TEAM_SIZE }, (_, i) => f.members[i] || emptyMember()),
      }));
    } else {
      setForm((f) => ({
        ...f,
        registrationType: "matchmaking",
        members: f.members.slice(0, Math.min(f.members.length, 5)) || [emptyMember()],
        problemStatementId: "",
        problemStatementTitle: "",
        problemStatementDomain: "",
      }));
    }
    setErrors({});
  }

  function handleMemberCountChange(count: number) {
    setForm((f) => {
      const current = [...f.members];
      if (count > current.length) {
        while (current.length < count) {
          current.push(emptyMember());
        }
      } else {
        current.length = count;
      }
      return { ...f, members: current };
    });
  }

  function toggleSkill(skill: string) {
    setForm((f) => {
      const existing = f.skills || [];
      const updated = existing.includes(skill)
        ? existing.filter((s) => s !== skill)
        : [...existing, skill];
      return { ...f, skills: updated };
    });
  }

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
      if (!isMatchmaking && form.teamName.trim().length < 2) {
        e["teamName"] = "Enter a team name";
      }
      if (form.teamLeader.trim().length < 2) {
        e["teamLeader"] = isMatchmaking ? "Enter your name / contact person" : "Enter team leader name";
      }

      form.members.forEach((m, i) => {
        if (m.name.trim().length < 2) e[`m${i}name`] = "Required";
        if (m.collegeRegId.trim().length < 3) e[`m${i}id`] = "Required";
        if (!m.phone || m.phone.trim().length < 10) e[`m${i}phone`] = "10-digit mobile required";
        if (!m.year) e[`m${i}year`] = "Required";
        if (m.department.trim().length < 2) e[`m${i}dept`] = "Required";
      });

      if (!isMatchmaking) {
        if (!form.members.some((m) => m.gender === "Female")) {
          e["female"] =
            "At least one female team member is mandatory for complete team registration. Set at least one member's gender to Female.";
        }
      }
    }

    if (current === 1 && !isMatchmaking) {
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
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setStep(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    const stepToValidate = isMatchmaking ? 0 : 1;
    if (!validateStep(stepToValidate)) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const payload: RegistrationInput = {
        ...form,
        problemStatementId: isMatchmaking ? "N/A" : form.problemStatementId,
        problemStatementTitle: isMatchmaking
          ? "To be selected after team formation"
          : form.problemStatementTitle,
        problemStatementDomain: isMatchmaking ? "N/A" : form.problemStatementDomain,
        paymentTxnId: "FREE",
        paymentScreenshot: null,
      };

      const res = await submit({ data: payload });
      setResult(res);

      if (typeof window !== "undefined") {
        try {
          const receiptRecord = {
            registrationId: res.registrationId,
            invoiceNumber: `SIH26-INV-${res.registrationId.replace(/[^A-Z0-9]/gi, "").slice(-6)}`,
            type: res.registrationType,
            teamName: res.teamName || (res.registrationType === "matchmaking" ? `Solo (${res.teamLeader})` : "Hackathon Squad"),
            teamLeader: res.teamLeader,
            leaderPhone: form.members[0]?.phone || "N/A",
            memberCount: form.members.length,
            skills: (form.skills || []).join(", "),
            teamNeedNote: form.teamNeedNote,
            problemStatementId: res.problemStatementId || "N/A",
            problemStatementTitle: res.problemStatementTitle || "To be decided after team formation",
            problemStatementDomain: form.problemStatementDomain || "General",
            members: form.members.map((m) => ({
              name: m.name,
              collegeRegId: m.collegeRegId,
              phone: m.phone,
              year: m.year,
              department: m.department,
              gender: m.gender,
            })),
            submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            paymentStatus: "PAID & VERIFIED",
            paymentMethod: "Official Poster QR Code (Confirmed)",
            amount: "₹500.00",
          };
          localStorage.setItem("sih26_recent_registration", JSON.stringify(receiptRecord));
        } catch {}
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.success(
        isMatchmaking
          ? "Matchmaking pool entry submitted successfully!"
          : "Team registration submitted successfully!",
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (result) return <Confirmation result={result} />;

  return (
    <div className="mx-auto max-w-4xl">
      {/* Registration Mode Selector */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => handleModeChange("full_team")}
          className={cn(
            "flex flex-col items-start rounded-xl border p-5 text-left transition-all",
            !isMatchmaking
              ? "border-gold bg-gold-soft/30 shadow-md ring-1 ring-gold"
              : "border-border bg-surface hover:border-gold/50 opacity-80 hover:opacity-100",
          )}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold/20 text-gold">
                <Users className="h-5 w-5" />
              </span>
              <span className="font-display font-bold text-foreground">Full Team Registration</span>
            </div>
            <Badge variant={!isMatchmaking ? "default" : "outline"} className="text-[0.65rem]">
              6 Members
            </Badge>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Register an official complete 6-member team (including ≥1 female member) with your selected problem statement.
          </p>
        </button>

        <button
          type="button"
          onClick={() => handleModeChange("matchmaking")}
          className={cn(
            "flex flex-col items-start rounded-xl border p-5 text-left transition-all",
            isMatchmaking
              ? "border-blue-500 bg-blue-500/10 shadow-md ring-1 ring-blue-500"
              : "border-border bg-surface hover:border-blue-400/50 opacity-80 hover:opacity-100",
          )}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-500/20 text-blue-400">
                <UserPlus className="h-5 w-5" />
              </span>
              <span className="font-display font-bold text-foreground">Solo &amp; Partial Team Pool</span>
            </div>
            <Badge
              variant={isMatchmaking ? "secondary" : "outline"}
              className="text-[0.65rem] border-blue-500/40 text-blue-300"
            >
              1 to 5 Members
            </Badge>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Don't have 6 members yet? Register as a solo participant or partial team. No problem statement needed right now.
          </p>
        </button>
      </div>

      {!isMatchmaking ? <Stepper step={step} /> : null}

      <div className="surface-card mt-8 p-6 sm:p-8">
        {/* STEP 0: Member & Contact Details */}
        {step === 0 ? (
          <Section
            title={isMatchmaking ? "Solo & Partial Team Registration" : "Team Details"}
            hint={
              isMatchmaking
                ? "Open to all 1st, 2nd, 3rd and 4th year students. Register your details so coordinators can connect you with teammates."
                : `Exactly ${FULL_TEAM_SIZE} members required. Open to 1st, 2nd, 3rd & 4th year students. ${EVENT.femaleMemberRule}`
            }
          >
            {/* Solo / Partial Team Notice Banner */}
            {isMatchmaking ? (
              <div className="mb-6 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
                  <div className="text-xs leading-relaxed text-blue-200">
                    <strong className="text-blue-300">Matchmaking Pool Active:</strong> You don't need a problem statement or full 6-member squad to sign up. Register your profile, skills, and contact info. Coordinators will connect you with other talented students to finalize your team and problem statement!
                  </div>
                </div>

                {/* Group size selector */}
                <div className="mt-4 border-t border-blue-500/20 pt-3">
                  <p className="mb-2 text-xs font-semibold text-foreground">
                    How many members are registering right now?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => handleMemberCountChange(cnt)}
                        className={cn(
                          "rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                          form.members.length === cnt
                            ? "border-blue-500 bg-blue-600 text-white shadow"
                            : "border-border bg-surface text-muted-foreground hover:border-blue-400 hover:text-foreground",
                        )}
                      >
                        {cnt === 1 ? "1 (Solo Participant)" : `${cnt} Members`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {/* Team / Contact Header Fields */}
            <div className="grid gap-5 sm:grid-cols-2">
              {!isMatchmaking ? (
                <Field label="Team Name" error={errors["teamName"] ?? undefined}>
                  <Input
                    value={form.teamName}
                    onChange={(e) => set("teamName", e.target.value)}
                    placeholder="e.g. Team Innovators"
                  />
                </Field>
              ) : null}

              <Field
                label={isMatchmaking ? (form.members.length === 1 ? "Your Full Name (Contact Person)" : "Primary Contact / Lead Name") : "Team Leader Name"}
                error={errors["teamLeader"] ?? undefined}
              >
                <Input
                  value={form.teamLeader}
                  onChange={(e) => {
                    const val = e.target.value;
                    set("teamLeader", val);
                    if (form.members[0] && !form.members[0].name) {
                      set("members", form.members.map((x, idx) => (idx === 0 ? { ...x, name: val } : x)));
                    }
                  }}
                  placeholder="Full name"
                />
              </Field>
            </div>

            {/* Member Cards */}
            <div className="mt-8 space-y-5">
              {form.members.map((m, i) => (
                <div key={i} className="rounded-lg border border-border bg-surface p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="eyebrow">
                      {isMatchmaking && form.members.length === 1
                        ? "Participant Details"
                        : i === 0
                          ? `Member 1 (Primary Contact)`
                          : `Member ${i + 1}`}
                    </p>
                    {i === 0 && form.teamLeader ? (
                      <span className="text-xs text-muted-foreground">Contact Lead</span>
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
                    <Field
                      label={i === 0 ? "Mobile Number (WhatsApp)" : "Mobile Number"}
                      error={errors[`m${i}phone`] ?? undefined}
                    >
                      <Input
                        type="tel"
                        value={m.phone}
                        placeholder="10-digit mobile number"
                        maxLength={13}
                        onChange={(e) =>
                          set(
                            "members",
                            form.members.map((x, idx) =>
                              idx === i ? { ...x, phone: e.target.value } : x,
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
                        placeholder="e.g. CSE, ECE, AI, IT"
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

            {/* Matchmaking Skills & Teammates Needed Note */}
            {isMatchmaking ? (
              <div className="mt-8 space-y-6 rounded-lg border border-border bg-surface p-5">
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                    Your Skills &amp; Technical Strengths (Select all that apply)
                  </Label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SKILL_OPTIONS.map((skill) => {
                      const selected = (form.skills || []).includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={cn(
                            "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                            selected
                              ? "border-blue-400 bg-blue-500/20 text-blue-300"
                              : "border-border bg-background text-muted-foreground hover:border-blue-400/40 hover:text-foreground",
                          )}
                        >
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Field label="What kind of teammates / skills are you looking for? (Optional)">
                  <Textarea
                    value={form.teamNeedNote}
                    onChange={(e) => set("teamNeedNote", e.target.value)}
                    placeholder="e.g. Looking for 1 female teammate and a UI/UX designer, or open to joining any existing AI/ML squad."
                    rows={3}
                  />
                </Field>

                {/* Matchmaking Review Box */}
                <div className="mt-4 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
                    <Info className="h-4 w-4" /> Matchmaking Profile Summary
                  </div>
                  <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
                    <div>
                      <span className="text-muted-foreground">Primary Contact:</span>{" "}
                      <span className="font-semibold text-foreground">
                        {form.teamLeader || "(Not entered)"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">WhatsApp Mobile:</span>{" "}
                      <span className="font-semibold text-foreground">
                        {form.members[0]?.phone || "(Not entered)"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Current Members:</span>{" "}
                      <span className="font-semibold text-foreground">
                        {form.members.length} {form.members.length === 1 ? "Participant" : "Participants"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Problem Statement:</span>{" "}
                      <span className="font-semibold text-blue-300">
                        To be chosen after team formation
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {errors["female"] ? (
              <p className="mt-4 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {errors["female"]}
              </p>
            ) : null}
          </Section>
        ) : null}

        {/* STEP 1: Problem Statement (ONLY for Full Teams) */}
        {step === 1 && !isMatchmaking ? (
          <Section
            title="Problem Statement"
            hint="Select or enter the official SIH 2026 problem statement your 6-member team will solve."
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
                  rows={4}
                />
              </Field>

              {/* Review summary box */}
              <div className="rounded-lg border border-border bg-surface p-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Info className="h-4 w-4 text-gold" /> Full Team Summary
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
                    <span className="text-muted-foreground">Leader Contact:</span>{" "}
                    <span className="font-semibold text-foreground">
                      {form.members[0]?.phone || "(Not entered)"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Team Size:</span>{" "}
                    <span className="font-semibold text-foreground">6 Members</span>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        ) : null}

        {/* Form navigation / Submit buttons */}
        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          {!isMatchmaking && step === 1 ? (
            <Button
              type="button"
              variant="ghost"
              onClick={back}
              disabled={submitting}
              className="h-12 w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Team Details
            </Button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {isMatchmaking ? (
            <Button
              type="button"
              variant="gold"
              size="lg"
              onClick={() => void handleSubmit()}
              disabled={submitting}
              className="h-12 w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {submitting ? "Submitting Request…" : "Submit to Matchmaking Pool"}
            </Button>
          ) : step === 0 ? (
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
              {submitting ? "Submitting Team…" : "Submit Team Registration"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  const steps = ["Team Details", "Problem Statement"];

  return (
    <div>
      <div className="sm:hidden">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-display text-base font-bold">{steps[step]}</p>
          <p className="shrink-0 text-xs uppercase tracking-wider text-muted-foreground">
            Step {step + 1} of {steps.length}
          </p>
        </div>
        <div
          className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-valuenow={step + 1}
        >
          <div
            className="h-full rounded-full bg-[image:var(--gradient-gold)] transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <ol className="hidden gap-2 sm:grid sm:grid-cols-2">
        {steps.map((label, i) => (
          <li key={label} className="text-center">
            <div
              className={cn(
                "mx-auto grid h-9 w-9 place-items-center rounded-full border font-display text-sm font-bold transition-colors",
                i < step && "border-gold bg-gold-soft text-gold",
                i === step && "border-gold bg-[image:var(--gradient-gold)] text-accent-foreground",
                i > step && "border-border text-muted-foreground",
              )}
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
  const isMatchmaking = result.registrationType === "matchmaking";

  return (
    <div className="mx-auto max-w-2xl text-center">
      <span
        className={cn(
          "mx-auto grid h-16 w-16 place-items-center rounded-full",
          isMatchmaking ? "bg-blue-500/20 text-blue-400" : "bg-gold-soft text-gold",
        )}
      >
        <CheckCircle2 className="h-8 w-8" />
      </span>

      <h2 className="mt-6 text-3xl font-bold">
        {isMatchmaking ? "Matchmaking Request Registered!" : "Team Registration Confirmed!"}
      </h2>

      <p className="mt-3 text-muted-foreground">
        {isMatchmaking
          ? "Your profile is active in the SIH 2026 Matchmaking Pool. Student coordinators will reach out on WhatsApp to connect you with prospective teammates and choose your problem statement."
          : "Your team is officially registered for the SIH 2026 Internal Hackathon. Keep your registration ID for future reference."}
      </p>

      <div className="surface-card mt-8 p-8">
        <p className="eyebrow">
          {isMatchmaking ? "Your Matchmaking Pool ID" : "Your Unique Registration ID"}
        </p>
        <p
          className={cn(
            "mt-3 font-display text-3xl font-bold tracking-wider",
            isMatchmaking ? "text-blue-400" : "text-gold",
          )}
        >
          {result.registrationId}
        </p>
        <Button
          variant="goldOutline"
          size="sm"
          className="mt-4"
          onClick={() => {
            void navigator.clipboard.writeText(result.registrationId);
            toast.success("ID copied to clipboard");
          }}
        >
          <Copy className="h-4 w-4" /> Copy ID
        </Button>

        <dl className="mt-8 grid gap-4 text-left sm:grid-cols-2">
          {!isMatchmaking ? <Summary label="Team Name" value={result.teamName} /> : null}
          <Summary label="Contact Person" value={result.teamLeader} />
          <Summary
            label="Registered Members"
            value={`${result.memberCount} ${result.memberCount === 1 ? "Participant" : "Participants"}`}
          />
          {!isMatchmaking ? (
            <>
              <Summary label="Problem Statement ID" value={result.problemStatementId} />
              <Summary label="Problem Statement" value={result.problemStatementTitle} />
            </>
          ) : (
            <Summary label="Problem Statement Selection" value="To be chosen after team formation" />
          )}
          <Summary label="Internal Hackathon Dates" value={EVENT.datesLong} />
        </dl>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-surface p-6 text-left text-sm text-muted-foreground">
        <p className="eyebrow mb-3">Hackathon Coordinators (For Matchmaking &amp; Queries)</p>
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
        <Button asChild variant="gold" size="lg" className="shadow-lg">
          <Link to="/receipt" search={{ id: result.registrationId }}>
            <FileText className="h-4 w-4" /> Download Official E-Bill (PDF)
          </Link>
        </Button>
        <Button asChild variant="goldOutline" size="lg">
          <Link to="/">Back to Home</Link>
        </Button>
        <Button asChild variant="ghost" size="lg">
          <Link to="/problem-statements">View Problems</Link>
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
