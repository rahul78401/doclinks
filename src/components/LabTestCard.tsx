import { Beaker, Clock, Droplet, Flame, ShoppingBag, Sparkles } from "lucide-react";
import { discountPct, type LabTest } from "@/lib/lab-tests";

export function LabTestCard({
  test,
  onBook,
  onAdd,
}: {
  test: LabTest;
  onBook: (t: LabTest) => void;
  onAdd?: (t: LabTest) => void;
}) {
  const off = discountPct(test.price, test.originalPrice);
  return (
    <div className="relative rounded-3xl bg-surface border border-border/60 shadow-card overflow-hidden">
      <div className="absolute -top-12 -right-10 h-32 w-32 rounded-full bg-primary/8 blur-3xl pointer-events-none" />

      <div className="relative p-4">
        <div className="flex items-start gap-3">
          <div className="h-11 w-11 rounded-2xl bg-primary-soft grid place-items-center border border-primary/15 shrink-0">
            <Beaker className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              {test.popular && (
                <span className="inline-flex items-center gap-1 rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-semibold text-warning-foreground">
                  <Sparkles className="h-2.5 w-2.5" /> Popular
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                {test.parameters} {test.parameters === 1 ? "Parameter" : "Parameters"}
              </span>
            </div>
            <h3 className="mt-1.5 text-[14.5px] font-display font-bold text-foreground leading-snug line-clamp-2">
              {test.name}
            </h3>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Droplet className="h-3 w-3 text-primary" /> {test.sampleType}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3 text-primary" /> {test.reportIn}
          </span>
          {test.fastingHours ? (
            <span className="inline-flex items-center gap-1">
              <Flame className="h-3 w-3 text-warning" /> {test.fastingHours}h fast
            </span>
          ) : null}
        </div>

        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            {off > 0 && (
              <span className="inline-flex items-center rounded-full bg-success/15 px-2 py-0.5 text-[10.5px] font-bold text-success">
                {off}% OFF
              </span>
            )}
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-[18px] font-display font-extrabold text-foreground tracking-tight">
                ₹{test.price}
              </span>
              {off > 0 && (
                <span className="text-[12px] text-muted-foreground line-through">
                  ₹{test.originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onAdd?.(test)}
            className="h-10 inline-flex items-center justify-center gap-1.5 px-3 rounded-full bg-surface border border-border text-foreground text-[12.5px] font-semibold active:scale-[0.98] transition"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Add
          </button>
          <button
            type="button"
            onClick={() => onBook(test)}
            className="flex-1 h-10 inline-flex items-center justify-center rounded-full bg-gradient-brand text-primary-foreground text-[13px] font-semibold shadow-glow active:scale-[0.98] transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
