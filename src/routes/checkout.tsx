import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  Copy,
  Home,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

const GENDERS = ["Male", "Female", "Other"] as const;
const SLOTS = ["07:00 AM", "08:30 AM", "10:00 AM", "12:00 PM", "04:00 PM", "06:30 PM"];

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totals, clear } = useCart();

  const [gender, setGender] = useState<(typeof GENDERS)[number]>("Male");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(SLOTS[1]);
  const [whatsapp, setWhatsapp] = useState(true);
  const [terms, setTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const bookingId = useMemo(
    () => `DOC-2026-${Math.floor(10000 + Math.random() * 89999)}`,
    [],
  );

  // Redirect to empty cart view if no items and not submitted
  if (items.length === 0 && !submitted) {
    return (
      <div className="min-h-screen bg-background grid place-items-center px-6">
        <div className="text-center max-w-sm">
          <h1 className="text-xl font-display font-bold text-foreground">
            Nothing to check out
          </h1>
          <p className="mt-2 text-[13px] text-muted-foreground">
            Your cart is empty. Add lab tests or health packages first.
          </p>
          <Link
            to="/cart"
            className="mt-5 inline-flex items-center justify-center h-11 px-5 rounded-2xl bg-gradient-brand text-primary-foreground text-[13px] font-semibold shadow-glow"
          >
            Go to Cart
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <SuccessScreen
        bookingId={bookingId}
        onBack={() => {
          clear();
          navigate({ to: "/cart" });
        }}
      />
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!terms) return;
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/85 backdrop-blur border-b border-border/50 lg:hidden">
        <div className="px-5 h-14 flex items-center gap-3">
          <button
            onClick={() => navigate({ to: "/cart" })}
            className="h-9 w-9 grid place-items-center rounded-full bg-surface border border-border/60"
            aria-label="Back to cart"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-[15px] font-display font-bold text-foreground leading-tight">
              Checkout
            </h1>
            <p className="text-[11px] text-muted-foreground">
              {totals.items} {totals.items === 1 ? "item" : "items"} · ₹{totals.total}
            </p>
          </div>
        </div>
      </header>

      {/* Hero summary */}
      <section className="px-5 pt-5">
        <div className="relative rounded-[28px] overflow-hidden border border-border/40 shadow-float bg-gradient-hero p-5">
          <div className="absolute -top-16 -right-12 h-52 w-52 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-primary-glow/25 blur-3xl pointer-events-none" />

          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-[10.5px] font-bold text-primary border border-primary/15">
              <ShieldCheck className="h-3 w-3" /> Secure Checkout
            </span>
            <h2 className="mt-3 text-[22px] leading-tight font-display font-extrabold text-foreground tracking-tight">
              Almost there.
            </h2>
            <p className="text-[12.5px] text-muted-foreground">
              Confirm a few details and we'll schedule your collection.
            </p>

            <div className="mt-4 rounded-2xl bg-surface/85 backdrop-blur border border-border/40 shadow-card divide-y divide-border/50">
              {items.slice(0, 4).map((i) => (
                <div
                  key={`${i.kind}-${i.id}`}
                  className="flex items-center gap-3 px-3.5 py-2.5"
                >
                  <span className="h-7 w-7 rounded-lg bg-primary-soft grid place-items-center border border-primary/15">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] font-semibold text-foreground truncate">
                      {i.name}
                    </p>
                    <p className="text-[10.5px] text-muted-foreground">{i.meta}</p>
                  </div>
                  <span className="text-[12px] font-bold text-foreground">₹{i.price}</span>
                </div>
              ))}
              {items.length > 4 && (
                <div className="px-3.5 py-2 text-[11px] text-muted-foreground">
                  + {items.length - 4} more
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-[11px] text-muted-foreground">
                {totals.items} {totals.items === 1 ? "item" : "items"}
                {totals.saved > 0 && (
                  <span className="ml-2 text-success font-semibold">
                    You save ₹{totals.saved}
                  </span>
                )}
              </p>
              <p className="text-[18px] font-display font-extrabold text-foreground tracking-tight">
                ₹{totals.total}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-6 px-5 space-y-5">
        <Section
          step="01"
          title="Patient Information"
          subtitle="Who is the appointment for?"
        >
          <Field label="Full Name" required>
            <User className="h-4 w-4 text-muted-foreground" />
            <input
              required
              placeholder="Your full name"
              className="flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-muted-foreground"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <Field label="Date of Birth" required>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <input
                required
                type="date"
                className="flex-1 bg-transparent text-[13px] outline-none"
              />
            </Field>
            <div>
              <Label>Gender *</Label>
              <div className="flex items-center gap-1 rounded-2xl border border-border/60 bg-background p-1">
                {GENDERS.map((g) => {
                  const active = gender === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`flex-1 h-9 rounded-xl text-[11.5px] font-semibold transition ${
                        active
                          ? "bg-foreground text-background shadow-card"
                          : "text-muted-foreground"
                      }`}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Section>

        <Section step="02" title="Address Details" subtitle="Where should we visit?">
          <Field label="Address" required>
            <Home className="h-4 w-4 text-muted-foreground" />
            <input
              required
              placeholder="House / Flat, Street"
              className="flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-muted-foreground"
            />
          </Field>
          <div className="grid grid-cols-3 gap-3 mt-3">
            <Field label="State" required>
              <input
                required
                placeholder="Karnataka"
                className="flex-1 bg-transparent text-[12.5px] outline-none placeholder:text-muted-foreground"
              />
            </Field>
            <Field label="City" required>
              <input
                required
                placeholder="Bengaluru"
                className="flex-1 bg-transparent text-[12.5px] outline-none placeholder:text-muted-foreground"
              />
            </Field>
            <Field label="Pincode" required>
              <input
                required
                placeholder="560001"
                inputMode="numeric"
                maxLength={6}
                className="flex-1 bg-transparent text-[12.5px] outline-none placeholder:text-muted-foreground"
              />
            </Field>
          </div>
        </Section>

        <Section
          step="03"
          title="Appointment Preferences"
          subtitle="Choose your preferred sample collection or visit schedule."
        >
          <Field label="Preferred Date" required>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <input
              required
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="flex-1 bg-transparent text-[13px] outline-none"
            />
          </Field>
          <div className="mt-3">
            <Label>Time slot *</Label>
            <div className="grid grid-cols-3 gap-2">
              {SLOTS.map((s) => {
                const active = slot === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSlot(s)}
                    className={`h-11 rounded-xl text-[12px] font-semibold border transition ${
                      active
                        ? "bg-foreground text-background border-foreground shadow-card"
                        : "bg-surface text-foreground border-border/60"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        </Section>

        <Section step="04" title="Contact Information" subtitle="So we can confirm your booking.">
          <Field label="Phone Number" required>
            <Phone className="h-4 w-4 text-muted-foreground" />
            <input
              required
              type="tel"
              placeholder="+91 98765 43210"
              className="flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-muted-foreground"
            />
            <span className="inline-flex items-center gap-1 rounded-full bg-success/12 text-success px-2 py-0.5 text-[10px] font-bold border border-success/25">
              <ShieldCheck className="h-3 w-3" /> Verify via WhatsApp
            </span>
          </Field>
          <button
            type="button"
            onClick={() => setWhatsapp((v) => !v)}
            aria-pressed={whatsapp}
            className="mt-3 w-full flex items-start gap-2.5 rounded-2xl border border-success/30 bg-success/8 px-3 py-2.5 text-left"
          >
            <span
              className={`h-5 w-5 mt-0.5 rounded-md grid place-items-center border transition ${
                whatsapp ? "bg-success border-success" : "bg-surface border-border"
              }`}
            >
              {whatsapp && <Check className="h-3.5 w-3.5 text-success-foreground" />}
            </span>
            <span className="flex-1">
              <span className="block text-[12px] font-semibold text-foreground">
                This number is on WhatsApp
              </span>
              <span className="block text-[11px] text-muted-foreground leading-snug">
                I agree to receive booking updates via WhatsApp.
              </span>
            </span>
          </button>
        </Section>

        <Section step="05" title="Additional Information" subtitle="Optional details to help us serve you better.">
          <Field label="Email Address (Optional)">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              placeholder="name@example.com"
              className="flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-muted-foreground"
            />
          </Field>
          <div className="mt-3">
            <Label>Remarks (Optional)</Label>
            <div className="flex items-start gap-2 rounded-2xl border border-border/60 bg-background px-3 py-2.5">
              <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
              <textarea
                rows={4}
                placeholder="Any specific instructions for the phlebotomist…"
                className="flex-1 bg-transparent text-[13px] outline-none resize-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </Section>

        <Section step="06" title="Legal Consent" subtitle="Last step before we confirm.">
          <button
            type="button"
            onClick={() => setTerms((v) => !v)}
            aria-pressed={terms}
            className="flex items-start gap-2.5 text-left"
          >
            <span
              className={`h-5 w-5 mt-0.5 rounded-md grid place-items-center border transition ${
                terms ? "bg-primary border-primary" : "bg-surface border-border"
              }`}
            >
              {terms && <Check className="h-3.5 w-3.5 text-primary-foreground" />}
            </span>
            <span className="text-[12px] text-muted-foreground leading-relaxed">
              I agree to the{" "}
              <Link to="/legal" className="text-foreground font-semibold underline">
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link to="/legal" className="text-foreground font-semibold underline">
                Privacy Policy
              </Link>
              .
            </span>
          </button>
        </Section>

        {/* Sticky footer */}
        <div className="fixed bottom-0 inset-x-0 z-40 px-4 pb-4 pt-3 bg-gradient-to-t from-background via-background/95 to-transparent">
          <div className="lg:max-w-2xl lg:mx-auto rounded-2xl bg-surface border border-border/60 shadow-float p-3 flex items-center gap-3">
            <div className="min-w-0 flex-1 pl-2">
              <p className="text-[10.5px] uppercase tracking-wider font-bold text-muted-foreground">
                Total
              </p>
              <p className="text-[18px] font-display font-extrabold text-foreground leading-tight">
                ₹{totals.total}
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate({ to: "/cart" })}
              className="h-11 px-3 inline-flex items-center justify-center rounded-2xl bg-surface border border-border/60 text-foreground text-[12.5px] font-semibold"
            >
              Back to Cart
            </button>
            <button
              type="submit"
              disabled={!terms}
              className="flex-1 h-11 inline-flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-brand text-primary-foreground text-[13.5px] font-semibold shadow-glow disabled:opacity-50"
            >
              <ShieldCheck className="h-4 w-4" /> Complete Checkout
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function SuccessScreen({
  bookingId,
  onBack,
}: {
  bookingId: string;
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex items-start lg:items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        <div className="relative rounded-[32px] overflow-hidden border border-border/40 shadow-float bg-surface">
          <div className="relative bg-gradient-hero p-6 text-center">
            <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-primary-glow/30 blur-3xl pointer-events-none" />

            <div className="relative mx-auto h-20 w-20 rounded-full bg-success/15 grid place-items-center animate-pulse-soft">
              <div className="h-14 w-14 rounded-full bg-success grid place-items-center shadow-card">
                <CheckCircle2 className="h-8 w-8 text-success-foreground" />
              </div>
            </div>
            <h1 className="relative mt-5 text-[22px] font-display font-extrabold text-foreground tracking-tight">
              Checkout Complete
            </h1>
            <p className="relative mt-2 text-[12.5px] text-muted-foreground leading-snug">
              Cart checkout complete! We will contact you on WhatsApp shortly to confirm
              your booking and schedule the sample collection or visit.
            </p>
          </div>

          <div className="p-5">
            <div className="rounded-2xl border border-dashed border-primary/40 bg-primary-soft/40 p-4 text-center">
              <p className="text-[10.5px] uppercase tracking-wider font-bold text-muted-foreground">
                Booking Reference
              </p>
              <div className="mt-1 flex items-center justify-center gap-2">
                <p className="text-[18px] font-display font-extrabold text-foreground tracking-tight">
                  {bookingId}
                </p>
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(bookingId);
                      toast.success("Booking ID copied");
                    } catch {
                      toast.error("Could not copy");
                    }
                  }}
                  aria-label="Copy booking ID"
                  className="h-8 w-8 grid place-items-center rounded-full bg-surface border border-border/60"
                >
                  <Copy className="h-4 w-4 text-foreground" />
                </button>
              </div>
            </div>

            <ul className="mt-5 space-y-2.5">
              {[
                "We'll WhatsApp you shortly to confirm",
                "Your phlebotomist will arrive at the scheduled time",
                "Digital reports delivered in 24–48 hours",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2.5 text-[12.5px] text-foreground/85"
                >
                  <span className="h-5 w-5 mt-0.5 rounded-full bg-success/15 grid place-items-center shrink-0">
                    <Check className="h-3 w-3 text-success" />
                  </span>
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-2">
              <button
                onClick={onBack}
                className="flex-1 h-12 inline-flex items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground text-[13.5px] font-semibold shadow-glow"
              >
                Back to Cart
              </button>
              <Link
                to="/blood-tests"
                className="h-12 px-4 inline-flex items-center justify-center rounded-2xl bg-surface border border-border/60 text-foreground text-[13px] font-semibold"
              >
                Browse More Tests
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-success" />
          NABL certified labs · Secure & private
        </div>
      </div>
    </div>
  );
}

function Section({
  step,
  title,
  subtitle,
  children,
}: {
  step: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl bg-surface border border-border/60 shadow-card p-5">
      <div className="flex items-start gap-3 mb-4">
        <span className="h-9 px-2.5 inline-flex items-center justify-center rounded-xl bg-primary-soft text-primary text-[11px] font-bold border border-primary/15">
          {step}
        </span>
        <div>
          <h3 className="text-[15px] font-display font-bold text-foreground leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[11.5px] text-muted-foreground mt-0.5 leading-snug">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[11px] font-semibold text-foreground/80 mb-1.5 inline-block">
      {children}
    </label>
  );
}

function Field({
  label,
  required,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-background px-3 py-3">
        {children}
      </div>
    </div>
  );
}

// Suppress unused import warning for MapPin (kept for future extension)
void MapPin;
