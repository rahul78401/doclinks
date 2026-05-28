import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Hospital, Building2, Stethoscope, TestTube2, Activity, ShieldCheck } from "lucide-react";
import { doctors } from "@/lib/doctors";
import { DoctorCard } from "@/components/DoctorCard";

export const Route = createFileRoute("/_tabs/")({
  head: () => ({
    meta: [
      { title: "DocLinks — Discover verified doctors, hospitals & labs" },
      { name: "description", content: "Find trusted, verified doctors, clinics, hospitals and lab tests near you across India." },
    ],
  }),
  component: Home,
});

const quick = [
  { label: "Hospitals", icon: Hospital, to: "/hospitals", tint: "from-[#e0f5f2] to-[#f0faf9]" },
  { label: "Clinics", icon: Building2, to: "/clinics", tint: "from-[#e8f6ff] to-[#f0faf9]" },
  { label: "Doctors", icon: Stethoscope, to: "/find-doctors", tint: "from-[#dff4f0] to-[#f0faf9]" },
  { label: "Lab Tests", icon: TestTube2, to: "/lab-tests", tint: "from-[#fff1e6] to-[#f0faf9]" },
] as const;

function Home() {
  return (
    <div className="px-5 pt-2 pb-8 space-y-6">
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-hero p-5 shadow-card">
        <p className="text-[11px] uppercase tracking-wider font-semibold text-primary">Good evening, Aanya</p>
        <h1 className="mt-1 text-[26px] leading-tight font-display font-bold text-foreground text-balance">
          Find trusted care, <br />close to home.
        </h1>
        <p className="mt-2 text-[13px] text-muted-foreground max-w-[18rem]">
          Verified doctors, clinics & hospitals — handpicked for transparency.
        </p>
        <Link
          to="/find-doctors"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2.5 text-sm font-semibold shadow-card"
        >
          Find Doctors <ArrowRight className="h-4 w-4" />
        </Link>
        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-primary/15 blur-2xl" />
        <div className="absolute -right-2 bottom-3 flex items-center gap-1.5 bg-surface/80 backdrop-blur px-2.5 py-1.5 rounded-full shadow-card border border-border/60">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10.5px] font-semibold text-foreground">DocLinks Verified</span>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-4 gap-2.5">
          {quick.map((q) => (
            <Link
              key={q.label}
              to={q.to}
              className={`group rounded-2xl bg-gradient-to-b ${q.tint} border border-border/60 p-3 flex flex-col items-center gap-2 shadow-card`}
            >
              <span className="h-10 w-10 grid place-items-center rounded-xl bg-surface shadow-card">
                <q.icon className="h-5 w-5 text-primary" />
              </span>
              <span className="text-[11px] font-semibold text-foreground">{q.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-surface border border-border/60 p-4 shadow-card">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 grid place-items-center rounded-xl bg-primary-soft">
            <BadgeCheck className="h-5 w-5 text-primary" />
          </span>
          <div className="flex-1">
            <p className="text-[13px] font-display font-semibold text-foreground">Every profile, verified.</p>
            <p className="text-[11.5px] text-muted-foreground">Registration, qualifications & clinic — manually reviewed.</p>
          </div>
          <Activity className="h-5 w-5 text-primary" />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[17px] font-display font-bold text-foreground">Top doctors near you</h2>
          <Link to="/find-doctors" className="text-[12px] font-semibold text-primary">View all</Link>
        </div>
        <div className="space-y-3">
          {doctors.slice(0, 3).map((d) => (
            <DoctorCard key={d.id} doctor={d} />
          ))}
        </div>
      </section>
    </div>
  );
}
