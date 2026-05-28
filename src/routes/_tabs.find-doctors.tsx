import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Mic, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { doctors } from "@/lib/doctors";
import { DoctorCard } from "@/components/DoctorCard";

export const Route = createFileRoute("/_tabs/find-doctors")({
  head: () => ({
    meta: [
      { title: "Find Doctors — DocLinks" },
      { name: "description", content: "Search verified doctors by specialty, treatment or location across India." },
    ],
  }),
  component: FindDoctors,
});

const filters = [
  "Available Today",
  "Verified",
  "Location",
  "Specialty",
  "Treatment",
  "Gender",
  "Languages",
  "Free Consultation",
];

const categories = [
  { label: "Dermatologist", emoji: "🧴" },
  { label: "Dentist", emoji: "🦷" },
  { label: "Cardiologist", emoji: "❤️" },
  { label: "Gynecologist", emoji: "🌸" },
  { label: "Orthopedic", emoji: "🦴" },
  { label: "Pediatrician", emoji: "🧸" },
  { label: "Hair Specialist", emoji: "💇" },
];

function FindDoctors() {
  const [active, setActive] = useState<string[]>(["Available Today", "Verified"]);
  const toggle = (f: string) =>
    setActive((a) => (a.includes(f) ? a.filter((x) => x !== f) : [...a, f]));

  return (
    <div className="pb-8">
      <div className="px-5 pt-1 space-y-4">
        <div>
          <h1 className="text-[24px] font-display font-bold text-foreground">Find Doctors</h1>
          <p className="text-[12.5px] text-muted-foreground">
            {doctors.length}+ verified specialists nearby
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 bg-surface rounded-2xl border border-border/60 shadow-card pl-3.5 pr-2 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search doctors, specialties, treatments…"
              className="flex-1 bg-transparent text-[13px] placeholder:text-muted-foreground outline-none"
            />
            <button className="h-8 w-8 grid place-items-center rounded-xl bg-primary-soft text-primary">
              <Mic className="h-4 w-4" />
            </button>
          </div>
          <button className="relative h-12 w-12 grid place-items-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
            <SlidersHorizontal className="h-[18px] w-[18px]" />
            <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 grid place-items-center text-[10px] font-bold rounded-full bg-foreground text-background">
              {active.length}
            </span>
          </button>
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar px-5 pb-2">
        {filters.map((f) => {
          const isOn = active.includes(f);
          return (
            <button
              key={f}
              onClick={() => toggle(f)}
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-medium border transition-all ${
                isOn
                  ? "bg-foreground text-background border-foreground shadow-card"
                  : "bg-surface text-foreground border-border/60"
              }`}
            >
              {f}
              {!isOn && <ChevronDown className="h-3 w-3 text-muted-foreground" />}
            </button>
          );
        })}
      </div>

      <div className="mt-2 flex gap-3 overflow-x-auto no-scrollbar px-5 pb-1">
        {categories.map((c) => (
          <button key={c.label} className="shrink-0 flex flex-col items-center gap-1.5 w-16">
            <span className="h-14 w-14 grid place-items-center rounded-2xl bg-gradient-to-b from-primary-soft to-background border border-border/60 shadow-card text-2xl">
              {c.emoji}
            </span>
            <span className="text-[10.5px] font-medium text-foreground text-center leading-tight">
              {c.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-5 px-5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <p className="text-[12px] font-semibold text-foreground">
            {doctors.length} doctors · {active.length} filters
          </p>
        </div>
        <button className="inline-flex items-center gap-1 text-[12px] font-semibold text-foreground bg-surface border border-border/60 rounded-full px-3 py-1.5 shadow-card">
          Highest Rated <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      <div className="mt-3 px-5 space-y-3">
        {doctors.map((d) => (
          <DoctorCard key={d.id} doctor={d} />
        ))}
      </div>
    </div>
  );
}
