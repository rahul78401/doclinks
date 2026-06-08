import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft, ArrowUpRight, Bookmark, Building2, ChevronRight,
  Heart, MapPin, MessageCircle, Phone, Search, Share2, ShieldCheck,
  Sparkles, Stethoscope, Trash2,
} from "lucide-react";
import { doctors } from "@/lib/doctors";
import { hospitals } from "@/lib/hospitals";
import { clinics } from "@/lib/clinics";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved & Liked — DocLinks" },
      { name: "description", content: "Your saved doctors, clinics and hospitals on DocLinks." },
    ],
  }),
  component: SavedPage,
});

type Kind = "Doctor" | "Clinic" | "Hospital";
type Item = {
  id: string; kind: Kind; name: string; sub: string; loc: string;
  img: string; verified: boolean; savedLabel: string; to: string;
};

const SAVED_LABELS = ["Saved 2 days ago", "Saved this week", "Saved last month", "Saved yesterday", "Saved today"];

function build(): Item[] {
  const d: Item[] = doctors.slice(0, 3).map((x, i) => ({
    id: x.id, kind: "Doctor", name: x.name, sub: x.specialty,
    loc: x.city, img: x.image, verified: x.verified,
    savedLabel: SAVED_LABELS[i % SAVED_LABELS.length],
    to: `/doctor/${x.id}`,
  }));
  const c: Item[] = clinics.slice(0, 2).map((x, i) => ({
    id: x.id, kind: "Clinic", name: x.name, sub: x.specialties[0] ?? "Clinic",
    loc: x.area, img: x.image, verified: x.verified,
    savedLabel: SAVED_LABELS[(i + 2) % SAVED_LABELS.length],
    to: `/clinic/${x.id}`,
  }));
  const h: Item[] = hospitals.slice(0, 3).map((x, i) => ({
    id: x.id, kind: "Hospital", name: x.name, sub: x.category,
    loc: x.city, img: x.cover, verified: x.verified,
    savedLabel: SAVED_LABELS[(i + 1) % SAVED_LABELS.length],
    to: `/hospital/${x.id}`,
  }));
  return [...d, ...c, ...h];
}

function SavedPage() {
  const all = useMemo(build, []);
  const [tab, setTab] = useState<"all" | Kind>("all");
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

  const recent = all.slice(0, 5);

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
            <Sparkles className="h-3 w-3" /> Wishlist
          </span>
        </div>

        <div className="relative mt-4 overflow-hidden rounded-3xl border border-border/60 shadow-card p-5 bg-gradient-hero">
          <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-primary/15 blur-3xl" />
          <h1 className="relative text-[26px] leading-tight font-display font-bold text-foreground">
            Saved & Liked
          </h1>
          <p className="relative mt-1.5 text-[13px] text-muted-foreground leading-relaxed max-w-[320px]">
            Quickly access doctors, hospitals, clinics and healthcare providers you've saved.
          </p>

          <div className="relative mt-4 grid grid-cols-4 gap-2">
            <Stat label="Total" v={counts.total} icon={<Bookmark className="h-3.5 w-3.5" />} />
            <Stat label="Doctors" v={counts.Doctor} icon={<Stethoscope className="h-3.5 w-3.5" />} />
            <Stat label="Clinics" v={counts.Clinic} icon={<Building2 className="h-3.5 w-3.5" />} />
            <Stat label="Hospitals" v={counts.Hospital} icon={<Building2 className="h-3.5 w-3.5" />} />
          </div>
        </div>
      </section>

      {/* Recently Saved strip */}
      {recent.length > 0 && (
        <section className="mt-6 px-5">
          <h2 className="text-[15px] font-display font-bold text-foreground">Recently saved</h2>
          <div className="mt-3 -mx-5 px-5 flex gap-3 overflow-x-auto no-scrollbar snap-x">
            {recent.map((s) => (
              <Link
                key={s.kind + s.id}
                to={s.to as any}
                className="snap-start shrink-0 w-[160px] rounded-2xl bg-surface border border-border/60 shadow-card overflow-hidden"
              >
                <div className="relative h-24">
                  <img src={s.img} alt={s.name} className="h-full w-full object-cover" />
                  <span className="absolute top-2 left-2 text-[10px] font-semibold bg-surface/95 text-foreground px-2 py-0.5 rounded-full">
                    {s.kind}
                  </span>
                  <span className="absolute top-2 right-2 h-7 w-7 rounded-full bg-surface/95 grid place-items-center text-primary">
                    <Heart className="h-3.5 w-3.5" fill="currentColor" />
                  </span>
                </div>
                <div className="p-2.5">
                  <p className="text-[12.5px] font-semibold leading-tight truncate">{s.name}</p>
                  <p className="text-[10.5px] text-muted-foreground mt-0.5 truncate">{s.savedLabel}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Sticky search + tabs */}
      <div className="sticky top-0 z-20 bg-background/85 backdrop-blur px-5 pt-4 pb-3 mt-4">
        <div className="flex items-center gap-2 rounded-2xl bg-surface border border-border/60 px-3 h-11 shadow-card">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search saved providers…"
            className="flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-muted-foreground"
          />
        </div>
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

      {/* Grid */}
      <section className="px-5 mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.length === 0 ? (
          <div className="col-span-full rounded-3xl bg-surface border border-border/60 shadow-card p-8 text-center">
            <div className="mx-auto h-16 w-16 rounded-2xl grid place-items-center bg-primary-soft text-primary">
              <Heart className="h-8 w-8" />
            </div>
            <p className="mt-4 text-[15px] font-bold font-display text-foreground">
              No saved providers yet
            </p>
            <p className="mt-1 text-[12.5px] text-muted-foreground">
              Tap the heart on any provider to add them here.
            </p>
            <Link
              to="/find-doctors"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-brand text-primary-foreground px-5 py-2.5 text-[12.5px] font-semibold shadow-glow"
            >
              Explore <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          filtered.map((s) => <SavedCard key={s.kind + s.id} s={s} />)
        )}
      </section>
    </div>
  );
}

function Stat({ label, v, icon }: { label: string; v: number; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-surface/85 backdrop-blur border border-border/60 px-2 py-2 text-center shadow-card">
      <div className="flex items-center justify-center gap-1 text-primary">
        {icon}
        <p className="text-[13px] font-display font-bold text-foreground leading-none">{v}</p>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function SavedCard({ s }: { s: Item }) {
  return (
    <div className="rounded-2xl bg-surface border border-border/60 shadow-card overflow-hidden">
      <div className="relative h-36">
        <img src={s.img} alt={s.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold uppercase tracking-wider bg-surface/95 text-foreground px-2 py-1 rounded-full">
          {s.kind}
        </span>
        <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 text-[10.5px] font-semibold bg-surface/95 text-primary px-2 py-1 rounded-full">
          <Heart className="h-3 w-3" fill="currentColor" /> Saved
        </span>
        <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
          <div className="flex items-center gap-1.5">
            <p className="font-semibold text-[14px] truncate">{s.name}</p>
            {s.verified && <ShieldCheck className="h-3.5 w-3.5 shrink-0" />}
          </div>
          <p className="text-[11px] opacity-90 truncate">{s.sub}</p>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{s.loc}</span>
          <span>{s.savedLabel}</span>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-1.5">
          <Link to={s.to as any} className="col-span-2 h-9 rounded-full bg-foreground text-background text-[11.5px] font-semibold inline-flex items-center justify-center gap-1">
            View <ArrowUpRight className="h-3 w-3" />
          </Link>
          <button aria-label={s.kind === "Doctor" ? "WhatsApp" : "Call"} className={`h-9 rounded-full text-[11.5px] font-semibold inline-flex items-center justify-center ${
            s.kind === "Doctor" ? "bg-[#e8f7ee] text-[#1f7a3d]" : "bg-primary-soft text-primary"
          }`}>
            {s.kind === "Doctor" ? <MessageCircle className="h-3.5 w-3.5" /> : <Phone className="h-3.5 w-3.5" />}
          </button>
          <button aria-label="Share" className="h-9 rounded-full bg-muted text-foreground grid place-items-center">
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>
        <button className="mt-2 w-full h-8 rounded-full text-[11px] font-semibold text-muted-foreground inline-flex items-center justify-center gap-1 hover:text-destructive">
          <Trash2 className="h-3 w-3" /> Remove from saved
        </button>
      </div>
    </div>
  );
}
