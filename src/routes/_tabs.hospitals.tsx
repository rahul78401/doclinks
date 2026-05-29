import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  BadgeCheck,
  ChevronDown,
  HeartPulse,
  Languages,
  MapPin,
  Mic,
  Search,
  ShieldCheck,
  Tag,
  Clock3,
} from "lucide-react";
import { hospitals } from "@/lib/hospitals";
import { HospitalCard } from "@/components/HospitalCard";
import {
  LanguageSheet,
  LocationSheet,
  TreatmentSheet,
} from "@/components/FilterSheets";

export const Route = createFileRoute("/_tabs/hospitals")({
  head: () => ({
    meta: [
      { title: "Hospitals — DocLinks" },
      {
        name: "description",
        content:
          "Discover verified multi-specialty hospitals near you with transparent contact details.",
      },
    ],
  }),
  component: HospitalsListing,
});

function HospitalsListing() {
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [openNow, setOpenNow] = useState(false);

  const [location, setLocation] = useState("Navrangpura, Ahmedabad");
  const [services, setServices] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return hospitals.filter((h) => {
      if (verifiedOnly && !h.verified) return false;
      if (emergencyOnly && !h.emergency) return false;
      if (openNow && !h.openNow) return false;
      if (services.length && !services.some((s) => h.services.includes(s)))
        return false;
      return true;
    });
  }, [verifiedOnly, emergencyOnly, openNow, services]);

  const activeCount =
    (verifiedOnly ? 1 : 0) +
    (emergencyOnly ? 1 : 0) +
    (openNow ? 1 : 0) +
    (services.length ? 1 : 0) +
    (languages.length ? 1 : 0);

  return (
    <div className="pb-8">
      {/* Hero */}
      <section className="relative mx-5 mt-1 overflow-hidden rounded-3xl bg-gradient-hero p-5 shadow-card">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-primary-glow/20 blur-3xl pointer-events-none" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface/80 backdrop-blur px-2.5 py-1 text-[10.5px] font-semibold text-primary border border-primary/15">
            <ShieldCheck className="h-3 w-3" /> NABH & NABL verified
          </span>
          <h1 className="mt-3 text-[24px] leading-[1.15] font-display font-bold text-foreground text-balance">
            Hospitals you can<br />trust, near you.
          </h1>
          <p className="mt-1.5 text-[12.5px] text-muted-foreground">
            {filtered.length} verified hospitals in {location.split(",")[0]}
          </p>

          <div className="mt-4 flex items-center gap-2 bg-surface rounded-2xl border border-border/60 shadow-card pl-3.5 pr-2 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search hospitals by name or specialization…"
              className="flex-1 bg-transparent text-[13px] placeholder:text-muted-foreground outline-none"
            />
            <button
              aria-label="Voice search"
              className="h-8 w-8 grid place-items-center rounded-xl bg-primary-soft text-primary"
            >
              <Mic className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Filter chips */}
      <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar px-5 pb-2">
        <ToggleChip
          icon={<BadgeCheck className="h-3.5 w-3.5" />}
          label="Verified"
          active={verifiedOnly}
          onClick={() => setVerifiedOnly((v) => !v)}
        />
        <ToggleChip
          icon={<HeartPulse className="h-3.5 w-3.5" />}
          label="Emergency 24×7"
          active={emergencyOnly}
          onClick={() => setEmergencyOnly((v) => !v)}
        />
        <ToggleChip
          icon={<Clock3 className="h-3.5 w-3.5" />}
          label="Open now"
          active={openNow}
          onClick={() => setOpenNow((v) => !v)}
        />

        <LocationSheet
          value={location}
          onChange={setLocation}
          trigger={
            <SheetChip
              icon={<MapPin className="h-3.5 w-3.5" />}
              label={location.split(",")[0]}
            />
          }
        />
        <TreatmentSheet
          selected={services}
          onChange={setServices}
          trigger={
            <SheetChip
              icon={<Tag className="h-3.5 w-3.5" />}
              label={services.length ? `Services · ${services.length}` : "Services"}
              active={!!services.length}
            />
          }
        />
        <LanguageSheet
          selected={languages}
          onChange={setLanguages}
          trigger={
            <SheetChip
              icon={<Languages className="h-3.5 w-3.5" />}
              label={languages.length ? `Languages · ${languages.length}` : "Languages"}
              active={!!languages.length}
            />
          }
        />
      </div>

      <div className="mt-5 px-5 space-y-4">

        {filtered.map((h) => (
          <HospitalCard key={h.id} hospital={h} />
        ))}
        {!filtered.length && (
          <div className="text-center py-10 text-[13px] text-muted-foreground">
            No hospitals match these filters yet.
          </div>
        )}
      </div>
    </div>
  );
}

function ToggleChip({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold border transition-all ${
        active
          ? "bg-foreground text-background border-foreground shadow-card"
          : "bg-surface text-foreground border-border/60"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function SheetChip({
  label,
  icon,
  active = false,
}: {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-medium border transition-all ${
        active
          ? "bg-primary-soft text-primary border-primary/30"
          : "bg-surface text-foreground border-border/60"
      }`}
    >
      {icon}
      {label}
      <ChevronDown className="h-3 w-3 opacity-60" />
    </button>
  );
}
