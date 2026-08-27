import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Building2, Filter, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PROBLEM_STATEMENTS,
  DOMAINS,
  ORGANIZATIONS,
  TECHNOLOGIES,
  type ProblemStatement,
} from "@/data/problemStatements";

const ALL = "all";
const PAGE_SIZE = 12;

export function ProblemExplorer() {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState(ALL);
  const [category, setCategory] = useState(ALL);
  const [organization, setOrganization] = useState(ALL);
  const [technology, setTechnology] = useState(ALL);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [active, setActive] = useState<ProblemStatement | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROBLEM_STATEMENTS.filter((p) => {
      if (domain !== ALL && p.domain !== domain) return false;
      if (category !== ALL && p.category !== category) return false;
      if (organization !== ALL && p.organization !== organization) return false;
      if (technology !== ALL && !p.tags.includes(technology)) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.organization.toLowerCase().includes(q) ||
        p.theme.toLowerCase().includes(q)
      );
    });
  }, [query, domain, category, organization, technology]);

  const hasFilters =
    query !== "" ||
    domain !== ALL ||
    category !== ALL ||
    organization !== ALL ||
    technology !== ALL;

  const reset = () => {
    setQuery("");
    setDomain(ALL);
    setCategory(ALL);
    setOrganization(ALL);
    setTechnology(ALL);
    setVisible(PAGE_SIZE);
  };

  return (
    <div>
      <div className="surface-card p-5 sm:p-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            placeholder="Search by title, problem ID, organisation or theme…"
            aria-label="Search problem statements"
            className="h-12 bg-background pl-10"
          />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect
            label="Domain / Theme"
            value={domain}
            onChange={(v) => {
              setDomain(v);
              setVisible(PAGE_SIZE);
            }}
            options={DOMAINS as unknown as string[]}
          />
          <FilterSelect
            label="Category"
            value={category}
            onChange={(v) => {
              setCategory(v);
              setVisible(PAGE_SIZE);
            }}
            options={["Software", "Hardware"]}
          />
          <FilterSelect
            label="Organisation"
            value={organization}
            onChange={(v) => {
              setOrganization(v);
              setVisible(PAGE_SIZE);
            }}
            options={ORGANIZATIONS as unknown as string[]}
          />
          <FilterSelect
            label="Technology"
            value={technology}
            onChange={(v) => {
              setTechnology(v);
              setVisible(PAGE_SIZE);
            }}
            options={TECHNOLOGIES as unknown as string[]}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4 text-gold" />
            <span>
              <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
              {PROBLEM_STATEMENTS.length} problem statements
            </span>
          </p>
          {hasFilters ? (
            <Button variant="ghost" size="sm" onClick={reset}>
              <X className="h-4 w-4" /> Clear filters
            </Button>
          ) : null}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          No problem statements match your search. Try clearing the filters.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.slice(0, visible).map((p) => (
            <article key={p.id} className="surface-card flex flex-col p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="font-display text-sm font-bold text-gold">{p.id}</span>
                <Badge variant={p.category === "Hardware" ? "secondary" : "outline"}>
                  {p.category}
                </Badge>
              </div>
              <h3 className="mt-3 line-clamp-3 font-display text-base font-semibold leading-snug">
                {p.title}
              </h3>
              <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
                <Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span className="line-clamp-2">{p.organization}</span>
              </p>
              <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
                {p.theme}
              </p>
              <div className="mt-5 flex flex-wrap gap-2 pt-1">
                {p.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border px-2.5 py-1 text-[0.68rem] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-2 border-t border-border pt-4">
                <Button
                  variant="goldOutline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setActive(p)}
                >
                  View details
                </Button>
                <Button asChild variant="gold" size="sm" className="flex-1">
                  <Link to="/register" search={{ ps: p.id }}>
                    Select
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}

      {visible < filtered.length ? (
        <div className="mt-10 text-center">
          <Button variant="goldOutline" size="lg" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load more ({filtered.length - visible} remaining)
          </Button>
        </div>
      ) : null}

      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          {active ? (
            <>
              <DialogHeader>
                <span className="font-display text-sm font-bold text-gold">{active.id}</span>
                <DialogTitle className="text-left text-xl leading-snug">
                  {active.title}
                </DialogTitle>
                <DialogDescription className="text-left">{active.organization}</DialogDescription>
              </DialogHeader>
              <dl className="grid gap-4 sm:grid-cols-2">
                <Detail label="Category" value={active.category} />
                <Detail label="Theme / Domain" value={active.theme} />
              </dl>
              <div>
                <p className="eyebrow mb-2">Technology focus</p>
                <div className="flex flex-wrap gap-2">
                  {active.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <p className="rounded-lg border border-border bg-surface p-4 text-sm text-muted-foreground">
                The full description, expected solution and dataset details for this problem
                statement are published on the official Smart India Hackathon portal under problem
                ID {active.id}. Discuss the scope with your mentor before locking your selection.
              </p>
              <Button asChild variant="gold" size="lg">
                <Link to="/register" search={{ ps: active.id }}>
                  Register with this problem statement
                </Link>
              </Button>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <dt className="eyebrow mb-1">{label}</dt>
      <dd className="text-sm">{value}</dd>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-background" aria-label={label}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>{label}: All</SelectItem>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
