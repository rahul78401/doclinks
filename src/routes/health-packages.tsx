import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react";
import { HealthPackageCard } from "@/components/HealthPackageCard";
import { LabBookingDialog, type BookingTarget } from "@/components/LabBookingDialog";
import { HEALTH_PACKAGES } from "@/lib/lab-tests";

export const Route = createFileRoute("/health-packages")({
  component: HealthPackagesPage,
});

function HealthPackagesPage() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState<BookingTarget | null>(null);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const filtered = HEALTH_PACKAGES.filter((p) =>
    p.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background pb-10">
      <header className="sticky top-0 z-30 bg-background/85 backdrop-blur border-b border-border/50">
        <div className="px-5 h-14 flex items-center gap-3">
          <button
            onClick={() => navigate({ to: "/lab-tests" })}
            className="h-9 w-9 grid place-items-center rounded-full bg-surface border border-border/60"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-[15px] font-display font-bold text-foreground leading-tight">
              Health Packages
            </h1>
            <p className="text-[11px] text-muted-foreground">
              {filtered.length} curated checkups
            </p>
          </div>
          <button className="h-9 w-9 grid place-items-center rounded-full bg-surface border border-border/60">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </header>

      <section className="px-5 pt-4">
        <div className="flex items-center gap-2 rounded-2xl bg-surface border border-border/60 shadow-card px-3 h-12">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search health packages…"
            className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
          />
        </div>
      </section>

      <section className="mt-5 px-5 grid grid-cols-1 gap-4">
        {filtered.map((p) => (
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
      </section>

      <LabBookingDialog open={open} onOpenChange={setOpen} target={booking} />
    </div>
  );
}
