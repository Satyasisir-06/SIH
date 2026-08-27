import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EVENT } from "@/lib/event";

const LINKS = [
  { label: "Home", to: "/" as const, hash: undefined },
  { label: "About SIH", to: "/about" as const, hash: undefined },
  { label: "Event", to: "/" as const, hash: "event" },
  { label: "Problem Statements", to: "/problem-statements" as const, hash: undefined },
  { label: "How to Participate", to: "/" as const, hash: "participate" },
  { label: "Registration", to: "/register" as const, hash: undefined },
  { label: "Contact", to: "/contact" as const, hash: undefined },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the mobile panel on route change, on Escape, and lock background scroll.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="glass-panel sticky top-0 z-50 border-b">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-20"
      >
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2.5 rounded-md sm:gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-gold/40 bg-primary font-display text-sm font-bold text-gold">
            SIH
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-base font-bold tracking-tight sm:text-lg">
              {EVENT.shortName}
            </span>
            <span className="block truncate text-[0.6rem] tracking-[0.18em] text-muted-foreground sm:tracking-[0.22em]">
              {EVENT.subtitle}
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {LINKS.map((l) => {
            const active = !l.hash && pathname === l.to;
            return (
              <li key={l.label}>
                <Link
                  to={l.to}
                  {...(l.hash ? { hash: l.hash } : {})}
                  aria-current={active ? "page" : undefined}
                  className="relative flex h-11 items-center rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[active=true]:font-semibold data-[active=true]:text-gold"
                  data-active={active}
                >
                  {l.label}
                  {active ? (
                    <span className="absolute inset-x-3 bottom-1.5 h-px bg-gold" aria-hidden="true" />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <Button asChild variant="gold" size="sm" className="hidden h-10 px-4 sm:inline-flex">
            <Link to="/register">REGISTER NOW</Link>
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-md border border-border text-foreground transition-colors hover:bg-secondary xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="fixed inset-x-0 bottom-0 top-16 z-40 cursor-default bg-background/60 backdrop-blur-[2px] lg:top-20 xl:hidden"
          />
          <div
            id="mobile-nav"
            ref={panelRef}
            className="relative z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background lg:max-h-[calc(100dvh-5rem)] xl:hidden"
          >
            <ul className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
              {LINKS.map((l) => {
                const active = !l.hash && pathname === l.to;
                return (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      {...(l.hash ? { hash: l.hash } : {})}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className="flex min-h-12 items-center rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground aria-[current=page]:font-semibold aria-[current=page]:text-gold"
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
              <li className="px-1 pb-3 pt-3">
                <Button asChild variant="gold" className="h-12 w-full">
                  <Link to="/register" onClick={() => setOpen(false)}>
                    REGISTER NOW
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
        </>
      ) : null}
    </header>
  );
}
