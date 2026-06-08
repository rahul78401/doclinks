import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { LabTestCard } from "@/components/LabTestCard";
import { LabBookingDialog, type BookingTarget } from "@/components/LabBookingDialog";
import { LAB_TESTS } from "@/lib/lab-tests";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/blood-tests")({
  component: BloodTestsPage,
});

function BloodTestsPage() {
  const navigate = useNavigate();
  const cart = useCart();
  const [booking, setBooking] = useState<BookingTarget | null>(null);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const filtered = LAB_TESTS.filter((t) =>
    t.name.toLowerCase().includes(q.toLowerCase()),
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
              Blood Tests
            </h1>
            <p className="text-[11px] text-muted-foreground">
              {filtered.length} certified tests
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
            placeholder="Search blood tests…"
            className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
          />
        </div>
      </section>

      <section className="mt-5 px-5 grid grid-cols-1 gap-3">
        {filtered.map((t) => (
          <LabTestCard
            key={t.id}
            test={t}
            onBook={(test) => {
              setBooking({ kind: "test", id: test.id, name: test.name, price: test.price });
              setOpen(true);
            }}
            onAdd={(test) => {
              cart.add({
                id: test.id,
                kind: "test",
                name: test.name,
                price: test.price,
                originalPrice: test.originalPrice,
                meta: `${test.parameters} ${test.parameters === 1 ? "Parameter" : "Parameters"}`,
              });
              toast.success(`${test.name} added to cart`, {
                action: { label: "View Cart", onClick: () => navigate({ to: "/cart" }) },
              });
            }}
          />
        ))}
      </section>

      <LabBookingDialog open={open} onOpenChange={setOpen} target={booking} />
    </div>
  );
}
