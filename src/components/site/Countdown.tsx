import { useEffect, useState } from "react";
import { EVENT } from "@/lib/event";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
    over: ms === 0,
  };
}

export function Countdown({ compact = false }: { compact?: boolean }) {
  const target = new Date(EVENT.deadlineISO).getTime();
  const [t, setT] = useState(() => diff(target));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!mounted) return null;

  if (t.over) {
    return (
      <span className="text-sm font-semibold text-muted-foreground">
        Registration window closed
      </span>
    );
  }

  const units = [
    { v: t.days, l: "Days" },
    { v: t.hours, l: "Hrs" },
    { v: t.minutes, l: "Min" },
    { v: t.seconds, l: "Sec" },
  ];

  return (
    <div className="flex items-center gap-2">
      {units.map((u) => (
        <div
          key={u.l}
          className={
            compact
              ? "min-w-11 rounded-md border border-border bg-surface px-2 py-1 text-center"
              : "min-w-16 rounded-lg border border-border bg-surface px-3 py-2 text-center"
          }
        >
          <div
            className={
              compact
                ? "font-display text-sm font-bold text-gold tabular-nums"
                : "font-display text-2xl font-bold text-gold tabular-nums"
            }
          >
            {String(u.v).padStart(2, "0")}
          </div>
          <div className="text-[0.6rem] uppercase tracking-widest text-muted-foreground">
            {u.l}
          </div>
        </div>
      ))}
    </div>
  );
}
