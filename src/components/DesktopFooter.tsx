import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Logo } from "./Logo";

export function DesktopFooter() {
  return (
    <footer className="hidden lg:block border-t border-border/60 bg-surface/40 mt-16">
      <div className="max-w-7xl mx-auto px-8 py-14 grid grid-cols-12 gap-10">
        <div className="col-span-4">
          <Logo className="h-8" />
          <p className="mt-4 text-[13px] text-muted-foreground leading-relaxed max-w-sm">
            DocLinks helps you discover verified doctors, hospitals, clinics and
            diagnostic services — built for trust, designed for clarity.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {[Instagram, Facebook, Linkedin, Twitter].map((Icon, i) => (
              <button
                key={i}
                className="h-9 w-9 grid place-items-center rounded-full bg-surface border border-border/60 hover:bg-muted/60 transition text-foreground"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <FooterCol
          title="Discover"
          links={[
            { to: "/find-doctors", label: "Find Doctors" },
            { to: "/hospitals", label: "Hospitals" },
            { to: "/clinics", label: "Clinics" },
            { to: "/lab-tests", label: "Lab Tests" },
          ]}
        />
        <FooterCol
          title="Explore"
          links={[
            { to: "/explore", label: "Editorial" },
            { to: "/health-packages", label: "Health Packages" },
            { to: "/blood-tests", label: "Blood Tests" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { to: "/account", label: "Account" },
            { to: "/legal", label: "Legal Center" },
          ]}
        />
      </div>
      <div className="border-t border-border/60">
        <div className="max-w-7xl mx-auto px-8 h-14 flex items-center justify-between text-[12px] text-muted-foreground">
          <p>© {new Date().getFullYear()} DocLinks. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/legal" className="hover:text-foreground">Privacy</Link>
            <Link to="/legal" className="hover:text-foreground">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div className="col-span-2">
      <p className="text-[11px] uppercase tracking-wider font-semibold text-foreground">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="text-[13px] text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
