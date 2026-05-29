import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  FileCheck2,
  Home,
  MapPin,
  Mic,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { LabTestCard } from "@/components/LabTestCard";
import { HealthPackageCard } from "@/components/HealthPackageCard";
import { LabBookingDialog, type BookingTarget } from "@/components/LabBookingDialog";
import { CITIES, HEALTH_PACKAGES, LAB_TESTS } from "@/lib/lab-tests";

export const Route = createFileRoute("/_tabs/lab-tests")({
  component: LabTestsPage,
});

const TRUST = [
  { icon: ShieldCheck, label: "NABL Certified Labs" },
  { icon: Home, label: "Home Collection" },
  { icon: FileCheck2, label: "Fast Reports" },
  { icon: Stethoscope, label: "Trusted by Patients" },
];

function LabTestsPage() {
  const [booking, setBooking] = useState<BookingTarget | null>(null);
  const [open, setOpen] = useState(false);

  const handleBookTest = (t: (typeof LAB_TESTS)[number]) => {
    setBooking({ kind: "test", id: t.id, name: t.name, price: t.price });
    setOpen(true);
  };
  const handleBookPkg = (p: (typeof HEALTH_PACKAGES)[number]) => {
    setBooking({ kind: "package", id: p.id, name: p.name, price: p.price, tests: p.testCount });
    setOpen(true);
  };

  return (
    <div className="pb-6">
      {/* HERO */}
      <section className="relative px-5 pt-2 pb-6">
        <div className="relative rounded-[28px] bg-gradient-hero p-5 overflow-hidden border border-border/40 shadow-card">
          <div className="absolute -top-16 -right-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-primary-glow/25 blur-3xl pointer-events-none" />

          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface/85 backdrop-blur px-2.5 py-1 text-[10.5px] font-bold text-primary border border-primary/15">
              <Sparkles className="h-3 w-3" /> Diagnostics
            </span>
            <h1 className="mt-3 text-[24px] leading-[1.15] font-display font-extrabold text-foreground tracking-tight">
              Trusted lab tests,
              <br />
              <span className="text-primary">transparent prices.</span>
            </h1>
            <p className="mt-2 text-[12.5px] text-muted-foreground max-w-[280px] leading-snug">
              Book NABL certified lab tests and health packages with home sample collection.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {TRUST.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-2xl bg-surface/80 backdrop-blur px-2.5 py-2 border border-border/40"
                >
                  <span className="h-7 w-7 rounded-xl bg-primary-soft grid place-items-center">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span className="text-[11px] font-semibold text-foreground leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="px-5 -mt-2">
        <div className="flex items-center gap-2 rounded-2xl bg-surface border border-border/60 shadow-card px-3 h-12">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search lab tests, health packages, conditions…"
            className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
          />
          <button
            aria-label="Voice search"
            className="h-8 w-8 grid place-items-center rounded-full bg-primary-soft text-primary"
          >
            <Mic className="h-3.5 w-3.5" />
          </button>
        </div>
        <button className="mt-2 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          Showing tests for <span className="text-foreground">Bengaluru</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </section>

      {/* POPULAR BLOOD TESTS */}
      <section className="mt-6 px-5">
        <SectionHeader
          title="Popular Blood Tests"
          subtitle="Most booked lab tests across DocLinks."
        />
        <div className="mt-3 grid grid-cols-1 gap-3">
          {LAB_TESTS.map((t) => (
            <LabTestCard key={t.id} test={t} onBook={handleBookTest} />
          ))}
        </div>
      </section>

      {/* POPULAR HEALTH PACKAGES */}
      <section className="mt-7 px-5">
        <SectionHeader
          title="Popular Health Packages"
          subtitle="Curated bundles with transparent pricing."
        />
        <div className="mt-3 grid grid-cols-1 gap-4">
          {HEALTH_PACKAGES.map((p) => (
            <HealthPackageCard key={p.id} pkg={p} onBook={handleBookPkg} />
          ))}
        </div>
      </section>

      {/* CITIES */}
      <section className="mt-8 px-5">
        <SectionHeader
          title="Online Bookings Available At"
          subtitle="Explore diagnostics in your city."
          hideMore
        />
        <div className="mt-3 grid grid-cols-2 gap-3">
          {CITIES.map((c) => (
            <Link
              key={c.slug}
              to="/city/$slug"
              params={{ slug: c.slug }}
              className="group relative rounded-2xl bg-surface border border-border/60 shadow-card p-3.5 overflow-hidden active:scale-[0.98] transition"
            >
              <div className="absolute -top-8 -right-8 h-20 w-20 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
              <div className="relative flex items-start justify-between">
                <div className="h-9 w-9 rounded-xl bg-primary-soft grid place-items-center border border-primary/15">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-active:text-primary" />
              </div>
              <p className="mt-3 text-[14px] font-display font-bold text-foreground leading-tight">
                {c.name}
              </p>
              <p className="text-[11px] text-muted-foreground">{c.state}</p>
              <p className="mt-2 text-[10.5px] font-semibold text-primary">{c.labs} labs · Explore</p>
            </Link>
          ))}
        </div>
      </section>

      <LabBookingDialog open={open} onOpenChange={setOpen} target={booking} />
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  hideMore,
}: {
  title: string;
  subtitle: string;
  hideMore?: boolean;
}) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div className="min-w-0">
        <h2 className="text-[17px] font-display font-bold text-foreground tracking-tight">
          {title}
        </h2>
        <p className="text-[12px] text-muted-foreground leading-snug">{subtitle}</p>
      </div>
      {!hideMore && (
        <button className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary shrink-0">
          View More <ChevronRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
