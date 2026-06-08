import { Check, HeartPulse, ShoppingBag, Sparkles } from "lucide-react";
import { discountPct, type HealthPackage } from "@/lib/lab-tests";
import { useCart } from "@/lib/cart";

const TONE: Record<HealthPackage["tone"], string> = {
  teal: "from-[oklch(0.92_0.06_187)] to-[oklch(0.98_0.02_187)]",
  violet: "from-[oklch(0.90_0.07_295)] to-[oklch(0.98_0.02_295)]",
  amber: "from-[oklch(0.92_0.09_75)] to-[oklch(0.99_0.02_75)]",
  rose: "from-[oklch(0.92_0.06_15)] to-[oklch(0.99_0.02_15)]",
};

export function HealthPackageCard({
  pkg,
  onBook,
  onAdd,
}: {
  pkg: HealthPackage;
  onBook: (p: HealthPackage) => void;
  onAdd?: (p: HealthPackage) => void;
}) {
  const { has } = useCart();
  const inCart = has("package", pkg.id);
  const off = discountPct(pkg.price, pkg.originalPrice);
  return (
    <div className="relative rounded-3xl bg-surface border border-border/60 shadow-float overflow-hidden">
      <div className={`relative h-24 bg-gradient-to-br ${TONE[pkg.tone]}`}>
        <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.6),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.55),transparent_45%)]" />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {pkg.popular && (
            <span className="inline-flex items-center gap-1 rounded-full bg-surface/90 backdrop-blur px-2 py-0.5 text-[10px] font-bold text-foreground border border-border/40">
              <Sparkles className="h-2.5 w-2.5 text-warning" /> Popular
            </span>
          )}
          <span className="inline-flex items-center gap-1 rounded-full bg-foreground/85 px-2 py-0.5 text-[10px] font-semibold text-background">
            {pkg.testCount} Tests
          </span>
        </div>
        <div className="absolute right-3 top-3 h-12 w-12 rounded-2xl bg-surface/80 backdrop-blur grid place-items-center border border-border/40 shadow-card">
          <HeartPulse className="h-5 w-5 text-primary" />
        </div>
        {off > 0 && (
          <span className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-success px-2.5 py-1 text-[11px] font-bold text-success-foreground shadow-card">
            {off}% OFF
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-[15.5px] font-display font-bold text-foreground leading-snug">
          {pkg.name}
        </h3>
        <p className="mt-1 text-[12px] text-muted-foreground leading-snug">{pkg.description}</p>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {pkg.highlights.map((h) => (
            <span
              key={h}
              className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10.5px] font-semibold text-muted-foreground"
            >
              <Check className="h-2.5 w-2.5 text-primary" /> {h}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-end justify-between gap-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[20px] font-display font-extrabold text-foreground tracking-tight">
              ₹{pkg.price}
            </span>
            {off > 0 && (
              <span className="text-[12.5px] text-muted-foreground line-through">
                ₹{pkg.originalPrice}
              </span>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onAdd?.(pkg)}
            disabled={inCart}
            className={`h-10 inline-flex items-center justify-center gap-1.5 px-3 rounded-full text-[12.5px] font-semibold active:scale-[0.98] transition border ${
              inCart
                ? "bg-success/10 text-success border-success/30"
                : "bg-surface text-foreground border-border"
            }`}
          >
            {inCart ? <Check className="h-3.5 w-3.5" /> : <ShoppingBag className="h-3.5 w-3.5" />}
            {inCart ? "Added" : "Add"}
          </button>
          <button
            type="button"
            onClick={() => onBook(pkg)}
            className="flex-1 h-10 inline-flex items-center justify-center rounded-full bg-gradient-brand text-primary-foreground text-[13px] font-semibold shadow-glow active:scale-[0.98] transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
