import { Link, useLocation } from "@tanstack/react-router";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { CartButton } from "./CartButton";

const links = [
  { to: "/", label: "Home" },
  { to: "/find-doctors", label: "Doctors" },
  { to: "/hospitals", label: "Hospitals" },
  { to: "/clinics", label: "Clinics" },
  { to: "/lab-tests", label: "Lab Tests" },
  { to: "/explore", label: "Explore" },
];

export function DesktopNav() {
  const { pathname } = useLocation();
  return (
    <header className="hidden lg:block sticky top-0 z-50 glass-strong border-b border-border/60">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Logo className="h-7" />
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((l) => {
            const active =
              l.to === "/"
                ? pathname === "/"
                : pathname === l.to || pathname.startsWith(l.to + "/");
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3.5 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                  active
                    ? "bg-primary-soft text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1 flex items-center justify-end gap-3">
          <div className="relative w-72 hidden xl:block">
            <Search className="h-4 w-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              placeholder="Search doctors, hospitals, tests…"
              className="h-10 w-full rounded-full bg-muted/60 border border-border/60 pl-10 pr-4 text-[13px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-surface transition"
            />
          </div>

          <button className="hidden xl:inline-flex items-center gap-2 h-10 px-3 rounded-full border border-border/60 bg-surface hover:bg-muted/60 transition text-left">
            <span className="h-6 w-6 grid place-items-center rounded-full bg-primary-soft">
              <MapPin className="h-3 w-3 text-primary" />
            </span>
            <span className="text-[12px] font-semibold text-foreground">Indiranagar</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>

          <CartButton variant="desktop" />

          <Link
            to="/account"
            aria-label="Open your account"
            className="h-10 w-10 rounded-full bg-gradient-brand grid place-items-center text-primary-foreground font-semibold text-sm shadow-card transition-transform hover:scale-[1.03]"
          >
            AS
          </Link>
        </div>
      </div>
    </header>
  );
}
