import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  BadgeCheck,
  Clock,
  HeartPulse,
  Home,
  Mic,
  Search,
  Stethoscope,
  X,
} from "lucide-react";
import { ClinicCard } from "@/components/ClinicCard";
import { clinics } from "@/lib/clinics";

export const Route = createFileRoute("/_tabs/clinics")({
  component: ClinicsPage,
});

const TOGGLES = [
  { id: "verified", label: "Verified", Icon: BadgeCheck },
  { id: "openNow", label: "Open Now", Icon: Clock },
  { id: "homeCollection", label: "Home Collection", Icon: Home },
  { id: "emergency", label: "Emergency", Icon: HeartPulse },
  { id: "consultationAvailable", label: "Consultation", Icon: Stethoscope },
] as const;

type ToggleId = (typeof TOGGLES)[number]["id"];

function ClinicsPage() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Set<ToggleId>>(new Set());

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return clinics.filter((c) => {
      for (const id of active) {
        if (!(c as unknown as Record<string, boolean>)[id]) return false;
      }
      if (!needle) return true;
      const hay = [c.name, c.area, c.city, ...c.specialties, ...c.services]
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [q, active]);

  const toggle = (id: ToggleId) =>
    setActive((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="pb-10">
      {/* Premium soft header band */}
      <section className="px-5 pt-2">
        <div className="relative rounded-3xl border border-border/50 bg-gradient-hero shadow-card overflow-hidden p-5">
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft border border-primary/15 px-2.5 py-1 text-[10.5px] font-bold text-primary">
            Neighbourhood care
          </span>
          <h1 className="mt-2.5 text-[24px] leading-[1.1] font-display font-extrabold text-foreground tracking-tight">
            Find a clinic <span className="text-primary">near you.</span>
          </h1>
          <p className="mt-1.5 text-[12.5px] text-muted-foreground leading-snug max-w-[280px]">
            Verified local clinics, pathology labs and specialists — easy to reach.
          </p>

          {/* Search */}
          <div className="mt-4 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search clinics, pathology labs, specialties…"
              className="w-full h-11 pl-10 pr-11 rounded-2xl bg-surface border border-border/60 text-[13px] placeholder:text-muted-foreground/80 shadow-card focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              aria-label="Voice search"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded-xl bg-primary-soft text-primary border border-primary/15"
            >
              <Mic className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Filter chips */}
      <section className="mt-4 px-5">
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 py-1">
          {TOGGLES.map(({ id, label, Icon }) => {
            const on = active.has(id);
            return (
              <button
                key={id}
                onClick={() => toggle(id)}
                className={`shrink-0 inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[11.5px] font-semibold border transition-all ${
                  on
                    ? "bg-primary text-primary-foreground border-primary shadow-glow"
                    : "bg-surface text-foreground border-border/60 shadow-card"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
                {on && <X className="h-3 w-3 opacity-80" />}
              </button>
            );
          })}
        </div>
      </section>

      {/* Listing */}
      <section className="mt-4 px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-display font-bold text-foreground">
            {filtered.length} clinic{filtered.length === 1 ? "" : "s"} nearby
          </h2>
          {active.size > 0 && (
            <button
              onClick={() => setActive(new Set())}
              className="text-[11.5px] font-semibold text-primary"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {filtered.map((c) => (
            <ClinicCard key={c.id} clinic={c} />
          ))}
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border/70 p-8 text-center text-[13px] text-muted-foreground">
              No clinics match your filters.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
