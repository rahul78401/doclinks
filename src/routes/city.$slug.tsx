import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  FileCheck2,
  Filter,
  Flame,
  Home,
  MapPin,
  Mic,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { LabTestCard } from "@/components/LabTestCard";
import { HealthPackageCard } from "@/components/HealthPackageCard";
import { LabBookingDialog, type BookingTarget } from "@/components/LabBookingDialog";
import {
  CITIES,
  HEALTH_PACKAGES,
  LAB_TESTS,
  getCityBySlug,
} from "@/lib/lab-tests";

export const Route = createFileRoute("/city/$slug")({
  component: CityPage,
});

const FILTERS = [
  { id: "home", label: "Home Collection", icon: Home },
  { id: "open", label: "Open Now", icon: Clock },
  { id: "popular", label: "Popular", icon: Flame },
  { id: "fast", label: "Fast Reports", icon: FileCheck2 },
  { id: "price", label: "Price Range", icon: Filter },
];

const TOP_LABS = [
  { name: "Apollo Diagnostics", rating: 4.8, reviews: 1284, nabl: true, eta: "30 min" },
  { name: "Thyrocare Plus", rating: 4.7, reviews: 982, nabl: true, eta: "45 min" },
  { name: "Metropolis Labs", rating: 4.9, reviews: 2210, nabl: true, eta: "20 min" },
];

function CityPage() {
  const { slug } = useParams({ from: "/city/$slug" });
  const city = getCityBySlug(slug) ?? CITIES[0];

  const [active, setActive] = useState<string>("popular");
  const [booking, setBooking] = useState<BookingTarget | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-10">
      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 glass border-b border-border/60">
        <div className="px-5 pt-4 pb-3 flex items-center gap-3">
          <Link
            to="/lab-tests"
            className="h-10 w-10 grid place-items-center rounded-full bg-surface border border-border/60 shadow-card"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="text-[10.5px] uppercase tracking-wider text-muted-foreground font-semibold">
              Diagnostics in
            </p>
            <p className="text-[15px] font-display font-bold text-foreground leading-tight">
              {city.name} <span className="text-muted-foreground font-medium">· {city.state}</span>
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="px-5 pb-3">
          <div className="flex items-center gap-2 rounded-2xl bg-surface border border-border/60 shadow-card px-3 h-11">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder={`Search tests in ${city.name}…`}
              className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
            />
            <button
              aria-label="Voice"
              className="h-8 w-8 grid place-items-center rounded-full bg-primary-soft text-primary"
            >
              <Mic className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Filters */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
            {FILTERS.map(({ id, label, icon: Icon }) => {
              const on = active === id;
              return (
                <button
                  key={id}
                  onClick={() => setActive(on ? "" : id)}
                  className={`shrink-0 inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[11.5px] font-semibold border transition ${
                    on
                      ? "bg-foreground text-background border-foreground shadow-card"
                      : "bg-surface text-foreground border-border/60"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="animate-fade-in">
        {/* City highlight */}
        <section className="px-5 pt-4">
          <div className="relative rounded-3xl bg-gradient-hero p-4 border border-border/40 overflow-hidden">
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
            <div className="relative flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-surface grid place-items-center border border-border/40 shadow-card">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[15px] font-display font-bold text-foreground leading-tight">
                  {city.labs}+ verified labs
                </p>
                <p className="text-[11.5px] text-muted-foreground">
                  Home sample collection across {city.name}
                </p>
              </div>
              <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-1 text-[10.5px] font-bold text-success">
                <ShieldCheck className="h-3 w-3" /> NABL
              </span>
            </div>
          </div>
        </section>

        {/* Top labs */}
        <section className="mt-6 px-5">
          <SectionHeader title="Top labs in the city" subtitle={`Highest rated near ${city.name}`} />
          <div className="mt-3 space-y-2.5">
            {TOP_LABS.map((l) => (
              <div
                key={l.name}
                className="flex items-center gap-3 rounded-2xl bg-surface border border-border/60 shadow-card p-3"
              >
                <div className="h-11 w-11 rounded-2xl bg-primary-soft grid place-items-center border border-primary/15">
                  <FileCheck2 className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-display font-bold text-foreground leading-tight">
                    {l.name}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                    <span className="inline-flex items-center gap-0.5 text-foreground font-semibold">
                      <Star className="h-3 w-3 fill-warning text-warning" /> {l.rating}
                    </span>
                    <span>· {l.reviews} reviews</span>
                    <span>· {l.eta}</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </section>

        {/* Packages */}
        <section className="mt-7 px-5">
          <SectionHeader
            title="Health packages"
            subtitle={`Bundled offers in ${city.name}`}
          />
          <div className="mt-3 grid grid-cols-1 gap-4">
            {HEALTH_PACKAGES.slice(0, 3).map((p) => (
              <HealthPackageCard
                key={p.id}
                pkg={p}
                onBook={(pkg) => {
                  setBooking({
                    kind: "package",
                    id: pkg.id,
                    name: pkg.name,
                    price: pkg.price,
                    tests: pkg.testCount,
                  });
                  setOpen(true);
                }}
              />
            ))}
          </div>
        </section>

        {/* Tests */}
        <section className="mt-7 px-5">
          <SectionHeader
            title="Lab tests"
            subtitle="Compare prices and book with home collection."
          />
          <div className="mt-3 grid grid-cols-1 gap-3">
            {LAB_TESTS.map((t) => (
              <LabTestCard
                key={t.id}
                test={t}
                onBook={(tt) => {
                  setBooking({ kind: "test", id: tt.id, name: tt.name, price: tt.price });
                  setOpen(true);
                }}
              />
            ))}
          </div>
        </section>

        <p className="mt-8 px-5 text-center text-[11px] text-muted-foreground inline-flex items-center justify-center gap-1.5 w-full">
          <Sparkles className="h-3 w-3 text-primary" /> Curated for {city.name}
        </p>
      </main>

      <LabBookingDialog open={open} onOpenChange={setOpen} target={booking} />
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div className="min-w-0">
        <h2 className="text-[17px] font-display font-bold text-foreground tracking-tight">
          {title}
        </h2>
        <p className="text-[12px] text-muted-foreground leading-snug">{subtitle}</p>
      </div>
    </div>
  );
}
