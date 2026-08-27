const NODES = [
  [12, 22],
  [28, 64],
  [45, 18],
  [62, 52],
  [78, 30],
  [88, 70],
  [35, 88],
  [70, 86],
] as const;

const LINKS: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [1, 6],
  [3, 7],
  [5, 7],
  [1, 3],
];

/** Subtle circuit / connected-node backdrop. Decorative only. */
export function TechBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="grid-overlay absolute inset-0" />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-70"
      >
        <g stroke="currentColor" className="text-gold" strokeWidth="0.08" opacity="0.35">
          {LINKS.map(([a, b], i) => (
            <line
              key={i}
              x1={NODES[a]![0]}
              y1={NODES[a]![1]}
              x2={NODES[b]![0]}
              y2={NODES[b]![1]}
            />
          ))}
        </g>
        <g className="text-gold" fill="currentColor">
          {NODES.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="0.45"
              style={{
                animation: `pulse-node ${4 + (i % 4)}s ease-in-out ${i * 0.4}s infinite`,
              }}
            />
          ))}
        </g>
      </svg>
      <div className="animate-float absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/35 blur-3xl" />
      <div className="animate-float absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
    </div>
  );
}
