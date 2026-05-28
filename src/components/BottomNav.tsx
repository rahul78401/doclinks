import { Link, useLocation } from "@tanstack/react-router";
import { Building2, Stethoscope, Hospital, TestTube2, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Tab = { to: string; label: string; icon: LucideIcon; featured?: boolean };

const tabs: Tab[] = [
  { to: "/hospitals", label: "Hospitals", icon: Hospital },
  { to: "/clinics", label: "Clinics", icon: Building2 },
  { to: "/find-doctors", label: "Find Doctors", icon: Stethoscope, featured: true },
  { to: "/lab-tests", label: "Lab Tests", icon: TestTube2 },
  { to: "/account", label: "Account", icon: User },
];

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-md">
      <div className="glass-strong border border-border/60 rounded-[28px] shadow-nav px-2 py-2">
        <ul className="grid grid-cols-5 items-end">
          {tabs.map(({ to, label, icon: Icon, featured }) => {
            const active = pathname === to || (to === "/find-doctors" && pathname === "/");
            if (featured) {
              return (
                <li key={to} className="flex justify-center -mt-7">
                  <Link
                    to={to}
                    className="group flex flex-col items-center gap-1"
                    aria-label={label}
                  >
                    <span
                      className={`h-14 w-14 rounded-2xl bg-gradient-brand grid place-items-center shadow-glow ring-4 ring-background transition-transform ${
                        active ? "scale-105" : "group-active:scale-95"
                      }`}
                    >
                      <Icon className="h-6 w-6 text-primary-foreground" strokeWidth={2.4} />
                    </span>
                    <span className="text-[10px] font-semibold text-foreground">{label}</span>
                  </Link>
                </li>
              );
            }
            return (
              <li key={to} className="flex justify-center">
                <Link
                  to={to}
                  className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-2xl transition-colors"
                  aria-label={label}
                >
                  <span
                    className={`h-9 w-9 grid place-items-center rounded-xl transition-all ${
                      active ? "bg-primary-soft text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.4 : 2} />
                  </span>
                  <span
                    className={`text-[10px] font-medium ${
                      active ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
