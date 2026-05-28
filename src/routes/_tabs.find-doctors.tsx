import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  BadgeCheck,
  CalendarClock,
  ChevronDown,
  Mic,
  Search,
  Sparkles,
  Tag,
  Wallet,
  MapPin,
  Languages,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { doctors } from "@/lib/doctors";
import { DoctorCard } from "@/components/DoctorCard";
import {
  GenderSegmented,
  LanguageSheet,
  LocationSheet,
  SPECIALTY_LIST,
  SpecialtySheet,
  TreatmentSheet,
} from "@/components/FilterSheets";

export const Route = createFileRoute("/_tabs/find-doctors")({
  head: () => ({
    meta: [
      { title: "Find Doctors — DocLinks" },
      {
        name: "description",
        content:
          "Search verified doctors by specialty, treatment or location across India.",
      },
    ],
  }),
  component: FindDoctors,
});

function FindDoctors() {
  // Toggle (instant) filters
  const [availableToday, setAvailableToday] = useState(true);
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [freeConsult, setFreeConsult] = useState(false);

  // Sheet-driven filters
  const [location, setLocation] = useState("Indiranagar, Bengaluru");
  const [gender, setGender] = useState<"Any" | "Male" | "Female">("Any");
  const [languages, setLanguages] = useState<string[]>([]);
  const [treatments, setTreatments] = useState<string[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      if (availableToday && !d.availableToday) return false;
      if (verifiedOnly && !d.verified) return false;
      if (gender !== "Any" && d.gender !== gender) return false;
      if (languages.length && !languages.some((l) => d.languages.includes(l)))
        return false;
      if (specialties.length && !specialties.includes(d.specialty)) return false;
      if (
        treatments.length &&
        !treatments.some((t) => d.treatments.includes(t))
      )
        return false;
      return true;
    });
  }, [availableToday, verifiedOnly, gender, languages, treatments, specialties]);

  const activeCount =
    (availableToday ? 1 : 0) +
    (verifiedOnly ? 1 : 0) +
    (freeConsult ? 1 : 0) +
    (gender !== "Any" ? 1 : 0) +
    (languages.length ? 1 : 0) +
    (treatments.length ? 1 : 0) +
    (specialties.length ? 1 : 0);

  return (
    <div className="pb-8">
      <div className="px-5 pt-1 space-y-4">
        <div>
          <h1 className="text-[24px] font-display font-bold text-foreground">
            Find Doctors
          </h1>
          <p className="text-[12.5px] text-muted-foreground">
            {filtered.length} verified specialists in {location.split(",")[0]}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 bg-surface rounded-2xl border border-border/60 shadow-card pl-3.5 pr-2 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search doctors, specialties, treatments…"
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
      </div>

      {/* Quick toggles + sheet triggers */}
      <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar px-5 pb-2">
        <ToggleChip
          icon={<CalendarClock className="h-3.5 w-3.5" />}
          label="Available today"
          active={availableToday}
          onClick={() => setAvailableToday((v) => !v)}
        />
        <ToggleChip
          icon={<BadgeCheck className="h-3.5 w-3.5" />}
          label="Verified"
          active={verifiedOnly}
          onClick={() => setVerifiedOnly((v) => !v)}
        />
        <ToggleChip
          icon={<Wallet className="h-3.5 w-3.5" />}
          label="Free consultation"
          active={freeConsult}
          onClick={() => setFreeConsult((v) => !v)}
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
        <SpecialtySheet
          selected={specialties}
          onChange={setSpecialties}
          trigger={
            <SheetChip
              icon={<Stethoscope className="h-3.5 w-3.5" />}
              label={specialties.length ? `Specialty · ${specialties.length}` : "Specialty"}
              active={!!specialties.length}
            />
          }
        />
        <TreatmentSheet
          selected={treatments}
          onChange={setTreatments}
          trigger={
            <SheetChip
              icon={<Tag className="h-3.5 w-3.5" />}
              label={treatments.length ? `Treatment · ${treatments.length}` : "Treatment"}
              active={!!treatments.length}
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

      {/* Gender segmented */}
      <div className="mt-1 px-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[11.5px] font-semibold text-muted-foreground">
          <UserRound className="h-3.5 w-3.5" />
          Gender
        </div>
        <GenderSegmented value={gender} onChange={setGender} />
      </div>

      {/* Specialty quick-pick rail */}
      <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar px-5 pb-1">
        {SPECIALTY_LIST.slice(0, 7).map(({ label, icon: Icon }) => {
          const active = specialties.includes(label);
          return (
            <button
              key={label}
              onClick={() =>
                setSpecialties((s) =>
                  s.includes(label) ? s.filter((x) => x !== label) : [...s, label],
                )
              }
              className="shrink-0 flex flex-col items-center gap-1.5 w-16"
            >
              <span
                className={`h-14 w-14 grid place-items-center rounded-2xl border shadow-card transition-all ${
                  active
                    ? "bg-gradient-brand text-primary-foreground border-transparent shadow-glow"
                    : "bg-gradient-to-b from-primary-soft to-background text-primary border-border/60"
                }`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-[10.5px] font-medium text-foreground text-center leading-tight">
                {label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 px-5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <p className="text-[12px] font-semibold text-foreground">
            {filtered.length} doctors · {activeCount} filters
          </p>
        </div>
        <button className="inline-flex items-center gap-1 text-[12px] font-semibold text-foreground bg-surface border border-border/60 rounded-full px-3 py-1.5 shadow-card">
          Highest Rated <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      <div className="mt-3 px-5 space-y-3">
        {filtered.map((d) => (
          <DoctorCard key={d.id} doctor={d} />
        ))}
        {!filtered.length && (
          <div className="text-center py-10 text-[13px] text-muted-foreground">
            No doctors match these filters yet.
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
