import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft, ArrowUpRight, BadgeCheck, Building2, CheckCircle2,
  ChevronRight, MapPin, MessageCircle, Phone, Search, Stethoscope,
  Sparkles, Users,
} from "lucide-react";
import { doctors } from "@/lib/doctors";
import { hospitals } from "@/lib/hospitals";
import { clinics } from "@/lib/clinics";

export const Route = createFileRoute("/following")({
  head: () => ({
    meta: [
      { title: "Following — DocLinks" },
      { name: "description", content: "Manage providers you follow on DocLinks." },
    ],
  }),
  component: FollowingPage,
});

type Kind = "Doctor" | "Clinic" | "Hospital";
type Item = {
  id: string; kind: Kind; name: string; sub: string; loc: string;
  img: string; verified: boolean; activity: string; activityTint: string;
  to: string; extra?: string;
};

const ACTIVITY = [
  { label: "Available Today", tint: "bg-success/15 text-success" },
  { label: "Added New Service", tint: "bg-primary-soft text-primary" },
  { label: "Profile Updated", tint: "bg-[#fff1e6] text-[#a85a1f]" },
  { label: "Now Accepting Patients", tint: "bg-[#e2eeff] text-[#2a4f9c]" },
  { label: "Recently Verified", tint: "bg-[#fde7e9] text-[#a83247]" },
];

function buildItems(): Item[] {
  const d: Item[] = doctors.slice(0, 4).map((x, i) => ({
    id: x.id, kind: "Doctor", name: x.name, sub: x.specialty,
    loc: x.city, img: x.image, verified: x.verified,
    activity: ACTIVITY[i % ACTIVITY.length].label,
    activityTint: ACTIVITY[i % ACTIVITY.length].tint,
    to: `/doctor/${x.id}`,
    extra: `${x.experience}+ yrs · ${x.followers} followers`,
  }));
  const c: Item[] = clinics.slice(0, 3).map((x, i) => ({
    id: x.id, kind: "Clinic", name: x.name, sub: x.specialties[0] ?? "Clinic",
    loc: x.area, img: x.image, verified: x.verified,
    activity: ACTIVITY[(i + 1) % ACTIVITY.length].label,
    activityTint: ACTIVITY[(i + 1) % ACTIVITY.length].tint,
    to: `/clinic/${x.id}`,
    extra: `${x.specialties.length} specialities`,
  }));
  const h: Item[] = hospitals.slice(0, 3).map((x, i) => ({
    id: x.id, kind: "Hospital", name: x.name, sub: x.category,
    loc: x.city, img: x.cover, verified: x.verified,
    activity: ACTIVITY[(i + 2) % ACTIVITY.length].label,
    activityTint: ACTIVITY[(i + 2) % ACTIVITY.length].tint,
    to: `/hospital/${x.id}`,
    extra: `${x.services.length} services`,
  }));
  return [...d, ...c, ...h];
}

function FollowingPage() {
  const all = useMemo(buildItems, []);
  const [tab, setTab] = useState<"all" | "Doctor" | "Clinic" | "Hospital">("all");
  const [q, setQ] = useState("");

  const counts = {
    total: all.length,
    Doctor: all.filter((i) => i.kind === "Doctor").length,
    Clinic: all.filter((i) => i.kind === "Clinic").length,
    Hospital: all.filter((i) => i.kind === "Hospital").length,
  };

  const filtered = all
    .filter((i) => (tab === "all" ? true : i.kind === tab))
    .filter((i) =>
      !q ? true : (i.name + " " + i.sub + " " + i.loc).toLowerCase().includes(q.toLowerCase()),
    );

  const tabs: { key: typeof tab; label: string; count: number }[] = [
    { key: "all", label: "All", count: counts.total },
    { key: "Doctor", label: "Doctors", count: counts.Doctor },
    { key: "Clinic", label: "Clinics", count: counts.Clinic },
    { key: "Hospital", label: "Hospitals", count: counts.Hospital },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 max-w-md mx-auto lg:max-w-5xl">
      {/* Header */}
      <section className="relative px-5 pt-[max(env(safe-area-inset-top),16px)]">
        <div className="flex items-center justify-between">
          <Link
            to="/account"
            aria-label="Back"
            className="h-10 w-10 grid place-items-center rounded-full bg-surface border border-border/60 shadow-card"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft text-primary px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" /> Your library
          </span>
        </div>

        <div className="relative mt-4 overflow-hidden rounded-3xl border border-border/60 shadow-card p-5 bg-gradient-hero">
          <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-primary/15 blur-3xl" />
          <h1 className="relative text-[26px] leading-tight font-display font-bold text-foreground">
            Following
          </h1>
          <p className="relative mt-1.5 text-[13px] text-muted-foreground leading-relaxed max-w-[320px]">
            Stay connected with healthcare providers you follow and receive updates from them.
          </p>

          <div className="relative mt-4 grid grid-cols-4 gap-2">
            <StatPill icon={<Users className="h-3.5 w-3.5" />} value={counts.total} label="Total" />
            <StatPill icon={<Stethoscope className="h-3.5 w-3.5" />} value={counts.Doctor} label="Doctors" />
            <StatPill icon={<Building2 className="h-3.5 w-3.5" />} value={counts.Clinic} label="Clinics" />
            <StatPill icon={<Building2 className="h-3.5 w-3.5" />} value={counts.Hospital} label="Hospitals" />
          </div>
        </div>
      </section>

      {/* Search */}
      <div className="sticky top-0 z-20 bg-background/85 backdrop-blur px-5 pt-4 pb-3 mt-4">
        <div className="flex items-center gap-2 rounded-2xl bg-surface border border-border/60 px-3 h-11 shadow-card">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search your following…"
            className="flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-muted-foreground"
          />
        </div>

        {/* Pill tabs */}
        <div className="mt-3 -mx-1 flex gap-2 overflow-x-auto no-scrollbar px-1">
          {tabs.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`shrink-0 h-9 inline-flex items-center gap-1.5 px-3.5 rounded-full text-[12.5px] font-semibold border transition-all ${
                  active
                    ? "bg-gradient-brand text-primary-foreground border-transparent shadow-glow"
                    : "bg-surface text-foreground border-border/60"
                }`}
              >
                {t.label}
                <span className={`text-[10.5px] font-bold px-1.5 py-0.5 rounded-full ${
                  active ? "bg-white/20" : "bg-muted text-muted-foreground"
                }`}>
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      <section className="px-5 mt-2 space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
        {filtered.length === 0 ? <Empty /> : filtered.map((f) => <FollowCard key={f.kind + f.id} f={f} />)}
      </section>
    </div>
  );
}

function StatPill({
  icon, value, label,
}: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="rounded-2xl bg-surface/85 backdrop-blur border border-border/60 px-2 py-2 text-center shadow-card">
      <div className="flex items-center justify-center gap-1 text-primary">
        {icon}
        <p className="text-[13px] font-display font-bold text-foreground leading-none">{value}</p>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function FollowCard({ f }: { f: Item }) {
  const Icon = f.kind === "Doctor" ? Stethoscope : Building2;
  return (
    <div className="rounded-2xl bg-surface border border-border/60 shadow-card p-3.5">
      <div className="flex items-center gap-3">
        <div className="relative h-14 w-14 shrink-0">
          <div className="h-full w-full rounded-2xl overflow-hidden ring-2 ring-primary-soft">
            <img src={f.img} alt={f.name} className="h-full w-full object-cover" />
          </div>
          <span className="absolute -bottom-1 -right-1 h-5 w-5 grid place-items-center rounded-full bg-surface border border-border/60 text-primary">
            <Icon className="h-2.5 w-2.5" strokeWidth={2.4} />
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="font-semibold text-foreground text-[14px] truncate">{f.name}</p>
            {f.verified && <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />}
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">
              {f.kind}
            </span>
            <p className="text-[11.5px] text-muted-foreground truncate">{f.sub}</p>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {f.loc}{f.extra ? ` · ${f.extra}` : ""}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-semibold ${f.activityTint}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {f.activity}
        </span>
        <div className="flex gap-1.5">
          {f.kind === "Doctor" ? (
            <button aria-label="WhatsApp" className="h-8 w-8 rounded-full bg-[#e8f7ee] text-[#1f7a3d] grid place-items-center">
              <MessageCircle className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button aria-label="Call" className="h-8 w-8 rounded-full bg-primary-soft text-primary grid place-items-center">
              <Phone className="h-3.5 w-3.5" />
            </button>
          )}
          <button className="h-8 px-2.5 rounded-full bg-muted text-muted-foreground text-[11px] font-semibold">
            Unfollow
          </button>
          <Link
            to={f.to as any}
            className="h-8 px-3 rounded-full bg-foreground text-background text-[11.5px] font-semibold inline-flex items-center gap-1"
          >
            View <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Empty() {
  return (
    <div className="rounded-3xl bg-surface border border-border/60 shadow-card p-8 text-center">
      <div className="mx-auto h-16 w-16 rounded-2xl grid place-items-center bg-primary-soft text-primary">
        <BadgeCheck className="h-8 w-8" />
      </div>
      <p className="mt-4 text-[15px] font-bold font-display text-foreground">
        You're not following any healthcare providers yet.
      </p>
      <p className="mt-1 text-[12.5px] text-muted-foreground">
        Discover trusted doctors, clinics and hospitals.
      </p>
      <Link
        to="/find-doctors"
        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-brand text-primary-foreground px-5 py-2.5 text-[12.5px] font-semibold shadow-glow"
      >
        Explore Providers <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
