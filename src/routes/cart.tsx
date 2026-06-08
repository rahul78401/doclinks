import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Beaker,
  HeartPulse,
  ShoppingCart,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { useCart, type CartItem } from "@/lib/cart";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const navigate = useNavigate();
  const { items, remove, clear, totals } = useCart();
  const [confirmClear, setConfirmClear] = useState(false);

  const tests = items.filter((i) => i.kind === "test");
  const packages = items.filter((i) => i.kind === "package");

  return (
    <div className="min-h-screen bg-background pb-40 lg:pb-10">
      {/* Header */}
      <header className="lg:hidden sticky top-0 z-30 bg-background/85 backdrop-blur border-b border-border/50">
        <div className="px-5 h-14 flex items-center gap-3">
          <button
            onClick={() => navigate({ to: "/lab-tests" })}
            className="h-9 w-9 grid place-items-center rounded-full bg-surface border border-border/60"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-[15px] font-display font-bold text-foreground leading-tight">
              My Cart
            </h1>
            <p className="text-[11px] text-muted-foreground">
              {totals.items} {totals.items === 1 ? "item" : "items"}
            </p>
          </div>
        </div>
      </header>

      <div className="px-5 pt-5">
        <div className="hidden lg:block mb-5">
          <h1 className="text-3xl font-display font-extrabold text-foreground tracking-tight">
            My Cart
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review your selected lab tests and health packages before checkout.
          </p>
        </div>
        <p className="lg:hidden text-[12.5px] text-muted-foreground -mt-1 mb-4">
          Review your selected lab tests and health packages before checkout.
        </p>

        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Summary */}
            <section className="relative rounded-3xl overflow-hidden border border-border/50 shadow-float bg-gradient-hero p-5">
              <div className="absolute -top-16 -right-12 h-48 w-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
              <div className="relative grid grid-cols-3 gap-3">
                <SummaryStat label="Total Items" value={`${totals.items}`} />
                <SummaryStat
                  label="You Save"
                  value={`₹${totals.saved}`}
                  tone="success"
                />
                <SummaryStat
                  label="Total Amount"
                  value={`₹${totals.total}`}
                  emphasized
                />
              </div>
            </section>

            {tests.length > 0 && (
              <CartGroup
                icon={<Beaker className="h-4 w-4 text-primary" />}
                title="Lab Tests"
                items={tests}
                onRemove={(i) => remove(i.kind, i.id)}
              />
            )}

            {packages.length > 0 && (
              <CartGroup
                icon={<HeartPulse className="h-4 w-4 text-primary" />}
                title="Health Packages"
                items={packages}
                onRemove={(i) => remove(i.kind, i.id)}
              />
            )}

            {/* Trust */}
            <div className="mt-6 rounded-2xl border border-border/60 bg-surface p-4 flex items-start gap-3 shadow-card">
              <span className="h-9 w-9 rounded-xl bg-primary-soft grid place-items-center border border-primary/15 shrink-0">
                <Sparkles className="h-4 w-4 text-primary" />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-foreground">
                  Free home sample collection
                </p>
                <p className="text-[11.5px] text-muted-foreground leading-snug">
                  NABL certified labs · Digital reports in 24–48 hours · No hidden fees.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Sticky bottom bar */}
      {items.length > 0 && (
        <div className="fixed lg:sticky bottom-0 inset-x-0 z-40 px-4 pb-4 pt-3 bg-gradient-to-t from-background via-background/95 to-transparent lg:from-transparent lg:via-transparent">
          <div className="lg:max-w-2xl lg:mx-auto rounded-2xl bg-surface border border-border/60 shadow-float p-3 flex items-center gap-3">
            <div className="min-w-0 flex-1 pl-2">
              <p className="text-[10.5px] uppercase tracking-wider font-bold text-muted-foreground">
                Total
              </p>
              <p className="text-[18px] font-display font-extrabold text-foreground leading-tight">
                ₹{totals.total}
                {totals.saved > 0 && (
                  <span className="ml-2 text-[10.5px] font-semibold text-success">
                    Saved ₹{totals.saved}
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={() => setConfirmClear(true)}
              className="h-11 px-3 inline-flex items-center justify-center gap-1.5 rounded-2xl bg-surface border border-border/60 text-foreground text-[12.5px] font-semibold"
            >
              <Trash2 className="h-4 w-4" /> Clear
            </button>
            <button
              onClick={() => navigate({ to: "/checkout" })}
              className="flex-1 h-11 inline-flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-brand text-primary-foreground text-[13.5px] font-semibold shadow-glow"
            >
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Clear confirmation */}
      <Dialog open={confirmClear} onOpenChange={setConfirmClear}>
        <DialogContent className="max-w-sm w-[calc(100vw-1rem)] p-0 rounded-3xl border-border/60 overflow-hidden [&>button]:hidden">
          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="h-11 w-11 rounded-2xl bg-destructive/10 grid place-items-center">
                <Trash2 className="h-5 w-5 text-destructive" />
              </div>
              <button
                onClick={() => setConfirmClear(false)}
                aria-label="Close"
                className="h-9 w-9 grid place-items-center rounded-full bg-surface border border-border/60"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <DialogTitle className="mt-3 text-[17px] font-display font-bold text-foreground">
              Clear Cart?
            </DialogTitle>
            <DialogDescription className="mt-1 text-[12.5px] text-muted-foreground">
              Remove all selected lab tests and health packages from your cart?
            </DialogDescription>
            <div className="mt-5 flex items-center gap-2">
              <button
                onClick={() => setConfirmClear(false)}
                className="flex-1 h-11 rounded-2xl bg-surface border border-border/60 text-foreground text-[13px] font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clear();
                  setConfirmClear(false);
                }}
                className="flex-1 h-11 rounded-2xl bg-destructive text-destructive-foreground text-[13px] font-semibold"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SummaryStat({
  label,
  value,
  tone,
  emphasized,
}: {
  label: string;
  value: string;
  tone?: "success";
  emphasized?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-surface/85 backdrop-blur border border-border/40 p-3 text-center shadow-card">
      <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
        {label}
      </p>
      <p
        className={`mt-1 font-display font-extrabold tracking-tight ${
          emphasized ? "text-[18px] text-foreground" : "text-[15.5px]"
        } ${tone === "success" ? "text-success" : emphasized ? "" : "text-foreground"}`}
      >
        {value}
      </p>
    </div>
  );
}

function CartGroup({
  icon,
  title,
  items,
  onRemove,
}: {
  icon: React.ReactNode;
  title: string;
  items: CartItem[];
  onRemove: (item: CartItem) => void;
}) {
  return (
    <section className="mt-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="h-7 w-7 rounded-lg bg-primary-soft grid place-items-center border border-primary/15">
          {icon}
        </span>
        <h2 className="text-[14px] font-display font-bold text-foreground">{title}</h2>
        <span className="text-[11px] font-semibold text-muted-foreground">
          ({items.length})
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {items.map((item) => (
          <CartItemRow key={`${item.kind}-${item.id}`} item={item} onRemove={onRemove} />
        ))}
      </div>
    </section>
  );
}

function CartItemRow({
  item,
  onRemove,
}: {
  item: CartItem;
  onRemove: (item: CartItem) => void;
}) {
  const off =
    item.originalPrice > item.price
      ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
      : 0;
  return (
    <div className="relative rounded-2xl bg-surface border border-border/60 shadow-card p-4">
      <div className="flex items-start gap-3">
        <div className="h-11 w-11 rounded-2xl bg-primary-soft grid place-items-center border border-primary/15 shrink-0">
          {item.kind === "test" ? (
            <Beaker className="h-5 w-5 text-primary" />
          ) : (
            <HeartPulse className="h-5 w-5 text-primary" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
              {item.meta}
            </span>
            {off > 0 && (
              <span className="inline-flex items-center rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">
                {off}% OFF
              </span>
            )}
          </div>
          <h3 className="mt-1 text-[14px] font-display font-bold text-foreground leading-snug">
            {item.name}
          </h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-[17px] font-display font-extrabold text-foreground tracking-tight">
              ₹{item.price}
            </span>
            {off > 0 && (
              <span className="text-[12px] text-muted-foreground line-through">
                ₹{item.originalPrice}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => onRemove(item)}
          aria-label="Remove from cart"
          className="h-9 w-9 grid place-items-center rounded-full bg-surface border border-border/60 text-muted-foreground hover:text-destructive hover:border-destructive/40 transition shrink-0"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onRemove(item)}
          className="h-9 px-3 inline-flex items-center justify-center rounded-full bg-surface border border-border/60 text-foreground text-[11.5px] font-semibold"
        >
          Remove
        </button>
        <button
          type="button"
          className="h-9 px-3 inline-flex items-center justify-center rounded-full bg-muted text-foreground text-[11.5px] font-semibold"
        >
          Save for Later
        </button>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <section className="mt-4 rounded-3xl border border-border/60 bg-surface shadow-card p-8 text-center">
      <div className="relative mx-auto h-24 w-24">
        <div className="absolute inset-0 rounded-full bg-primary-soft" />
        <div className="absolute -top-2 -right-2 h-10 w-10 rounded-2xl bg-surface border border-border/60 shadow-card grid place-items-center">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <div className="relative h-full w-full grid place-items-center">
          <ShoppingCart className="h-10 w-10 text-primary" />
        </div>
      </div>
      <h2 className="mt-5 text-[18px] font-display font-bold text-foreground">
        Your cart is empty
      </h2>
      <p className="mt-1 text-[12.5px] text-muted-foreground max-w-xs mx-auto leading-snug">
        Add lab tests or health packages to get started with your health checkup.
      </p>
      <div className="mt-5 flex items-center justify-center gap-2">
        <Link
          to="/blood-tests"
          className="h-11 px-4 inline-flex items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground text-[13px] font-semibold shadow-glow"
        >
          Browse Lab Tests
        </Link>
        <Link
          to="/health-packages"
          className="h-11 px-4 inline-flex items-center justify-center rounded-2xl bg-surface border border-border/60 text-foreground text-[13px] font-semibold"
        >
          Health Packages
        </Link>
      </div>
    </section>
  );
}
