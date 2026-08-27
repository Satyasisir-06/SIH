import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ArrowRight, CheckCircle2, Copy, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { EVENT, YEAR_OPTIONS, COORDINATORS } from "@/lib/event";
import { submitRegistration } from "@/lib/registration.functions";
import type { SubmitRegistrationResult } from "@/lib/registration.functions";
import type { RegistrationInput, TeamMemberInput } from "@/lib/registration-schema";

const QR_IMAGE = "/phonepe-qr.png";

const STEPS = ["Team Details", "Problem Statement", "Payment"] as const;

const TEAM_SIZE = 6;

const emptyMember = (): TeamMemberInput => ({
  name: "",
  collegeRegId: "",
  year: "",
  department: "",
  gender: "Male",
});

type FormState = Omit<RegistrationInput, "members"> & { members: TeamMemberInput[] };

const initialState = (presetPs?: string): FormState => ({
  teamName: "",
  teamLeader: "",
  members: Array.from({ length: TEAM_SIZE }, emptyMember),
  problemStatementId: presetPs ?? "",
  problemStatementTitle: "",
  problemStatementDomain: "",
  paymentTxnId: "",
  paymentScreenshot: null,
});

export function RegistrationForm({ presetProblemId }: { presetProblemId?: string | undefined }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(() => initialState(presetProblemId));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitRegistrationResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const submit = useServerFn(submitRegistration);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const total = EVENT.fee * form.members.length;

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
        e["problemStatementId"] = "Enter the problem statement number";
      }
      if (!form.problemStatementTitle.trim()) {
        e["problemStatementTitle"] = "Enter the problem statement";
      }
    }
    if (current === 2) {
      if (form.paymentTxnId.trim().length < 4) e["paymentTxnId"] = "Enter the transaction ID";
      if (!form.paymentScreenshot) e["paymentScreenshot"] = "Upload the payment screenshot";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validateStep(step)) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleFile(file: File | undefined) {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Screenshot must be smaller than 5 MB.");
      return;
    }
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("read failed"));
      reader.readAsDataURL(file);
    });
    set("paymentScreenshot", { name: file.name, type: file.type, dataUrl });
  }

  async function handleSubmit() {
    if (!validateStep(2)) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await submit({ data: form as RegistrationInput });
      setResult(res);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
            title="Team details"
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
                    <p className="eyebrow">Member {i + 1}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name" error={errors[`m${i}name`] ?? undefined}>
                      <Input
                        value={m.name}
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
                    <Field label="College ID" error={errors[`m${i}id`] ?? undefined}>
                      <Input
                        value={m.collegeRegId}
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
            title="Problem statement"
            hint="Enter the official SIH problem statement number your team will solve."
          >
            <div className="space-y-5">
              <Field
                label="Problem statement number"
                error={errors["problemStatementId"] ?? undefined}
              >
                <Input
                  value={form.problemStatementId}
                  onChange={(e) => set("problemStatementId", e.target.value)}
                  placeholder="e.g. SIH25001"
                />
              </Field>

              <Field label="Problem statement" error={errors["problemStatementTitle"] ?? undefined}>
                <Textarea
                  value={form.problemStatementTitle}
                  onChange={(e) => set("problemStatementTitle", e.target.value)}
                  placeholder="Type or paste the full problem statement here…"
                  rows={8}
                />
              </Field>
            </div>
          </Section>
        ) : null}

        {step === 2 ? (
          <Section
            title="Payment"
            hint={`${EVENT.feeLabel}. Scan the PhonePe QR, pay, then enter the transaction ID and upload the screenshot.`}
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-lg border border-border bg-surface p-6 text-center">
                <p className="eyebrow">Scan &amp; pay</p>
                <div className="mx-auto mt-4 w-fit rounded-xl border border-gold/40 bg-background p-3">
                  <img
                    src={QR_IMAGE}
                    alt="PhonePe payment QR code for SIH 2026 registration fee"
                    className="h-48 w-48 object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="mt-4 font-display text-2xl font-bold text-gold">₹{total}</p>
                <p className="text-xs text-muted-foreground">
                  ₹{EVENT.fee} × {form.members.length}{" "}
                  {form.members.length === 1 ? "participant" : "participants"}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">UPI ID: {EVENT.upiId}</p>
              </div>

              <div className="space-y-5">
                <Field
                  label="Payment transaction ID / UTR"
                  error={errors["paymentTxnId"] ?? undefined}
                >
                  <Input
                    value={form.paymentTxnId}
                    onChange={(e) => set("paymentTxnId", e.target.value)}
                    placeholder="e.g. T2408XXXXXXXXXX"
                  />
                </Field>

                <Field label="Payment screenshot" error={errors["paymentScreenshot"] ?? undefined}>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="sr-only"
                    onChange={(e) => void handleFile(e.target.files?.[0])}
                  />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex w-full flex-col items-center gap-2 rounded-lg border border-dashed border-border bg-surface px-4 py-8 text-sm text-muted-foreground transition-colors hover:border-gold/60 hover:text-foreground"
                  >
                    <Upload className="h-5 w-5 text-gold" />
                    <span className="w-full break-all text-center">
                      {form.paymentScreenshot
                        ? form.paymentScreenshot.name
                        : "Click to upload (PNG/JPG, max 5 MB)"}
                    </span>
                  </button>
                  {form.paymentScreenshot ? (
                    <div className="mt-3 space-y-3">
                      <img
                        src={form.paymentScreenshot.dataUrl}
                        alt="Uploaded payment screenshot preview"
                        className="max-h-48 w-full rounded-lg border border-border object-contain"
                      />
                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="goldOutline"
                          size="sm"
                          onClick={() => fileRef.current?.click()}
                        >
                          Replace
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            set("paymentScreenshot", null);
                            if (fileRef.current) fileRef.current.value = "";
                          }}
                        >
                          <Trash2 className="h-4 w-4" /> Remove
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </Field>

                <label className="flex items-start gap-3 text-xs text-muted-foreground">
                  <Checkbox
                    checked={confirmChecked(form)}
                    onCheckedChange={() => undefined}
                    disabled
                    className="mt-0.5"
                  />
                  <span>
                    Your payment will be verified manually by the coordinators. Registration is
                    confirmed only after verification.
                  </span>
                </label>
              </div>
            </div>
          </Section>
        ) : null}

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={back}
            disabled={step === 0 || submitting}
            className="h-12 w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button
              type="button"
              variant="gold"
              size="lg"
              onClick={next}
              className="h-12 w-full sm:w-auto"
            >
              Continue <ArrowRight className="h-4 w-4" />
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
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {submitting ? "Submitting…" : "Submit registration"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function confirmChecked(form: FormState) {
  return Boolean(form.paymentTxnId && form.paymentScreenshot);
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
                i === step ? "text-gold" : "text-muted-foreground",
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
      <h2 className="mt-6 text-3xl font-bold">Registration submitted</h2>
      <p className="mt-3 text-muted-foreground">
        The coordinators will verify your payment and contact your team.
      </p>

      <div className="surface-card mt-8 p-8">
        <p className="eyebrow">Your registration ID</p>
        <p className="mt-3 font-display text-3xl font-bold tracking-wider text-gold">
          {result.registrationId}
        </p>
        <Button
          variant="goldOutline"
          size="sm"
          className="mt-4"
          onClick={() => {
            void navigator.clipboard.writeText(result.registrationId);
            toast.success("Registration ID copied");
          }}
        >
          <Copy className="h-4 w-4" /> Copy ID
        </Button>

        <dl className="mt-8 grid gap-4 text-left sm:grid-cols-2">
          <Summary label="Team" value={result.teamName} />
          <Summary label="Members" value={String(result.memberCount)} />
          <Summary label="Problem statement" value={result.problemStatementId} />
          <Summary label="Transaction ID" value={result.paymentTxnId} />
          <Summary label="Event dates" value={EVENT.datesLong} />
          <Summary label="Venue" value={EVENT.venue} />
        </dl>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-surface p-6 text-left text-sm text-muted-foreground">
        <p className="eyebrow mb-3">Need help?</p>
        {COORDINATORS.map((c) => (
          <p key={c.name}>
            {c.name} — {c.phone}
          </p>
        ))}
      </div>

      <Button asChild variant="gold" size="lg" className="mt-8">
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <dt className="eyebrow mb-1">{label}</dt>
      <dd className="text-sm">{value}</dd>
    </div>
  );
}
