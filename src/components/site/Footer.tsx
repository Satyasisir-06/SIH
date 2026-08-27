import { Link } from "@tanstack/react-router";
import { EVENT } from "@/lib/event";

export function Footer() {
  return (
    <footer className="border-t border-border bg-burgundy-deep">
      <div className="section-y mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <h3 className="font-display text-xl font-bold">SMART INDIA HACKATHON 2026</h3>
            <p className="eyebrow mt-1">{EVENT.subtitle}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Innovation • Creativity • Teamwork • Problem Solving
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              {EVENT.datesLong}
              <br />
              {EVENT.venue}
            </p>
          </div>

          <nav className="grid gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-gold">
              Home
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-gold">
              About
            </Link>
            <Link to="/problem-statements" className="text-muted-foreground hover:text-gold">
              Problem Statements
            </Link>
            <Link to="/register" className="text-muted-foreground hover:text-gold">
              Registration
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-gold">
              Contact
            </Link>
          </nav>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          © 2026 {EVENT.collegeName} — SIH Internal Hackathon
        </div>
      </div>
    </footer>
  );
}
