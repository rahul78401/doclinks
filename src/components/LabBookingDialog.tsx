import { useState } from "react";
import {
  Beaker,
  CalendarDays,
  Check,
  HeartPulse,
  Home,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export type BookingTarget =
  | { kind: "test"; id: string; name: string; price: number }
  | { kind: "package"; id: string; name: string; price: number; tests: number };

const GENDERS = ["Male", "Female", "Other"] as const;
const SLOTS = ["07:00 AM", "08:30 AM", "10:00 AM", "12:00 PM", "04:00 PM", "06:30 PM"];

export function LabBookingDialog({
  open,
  onOpenChange,
  target,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  target: BookingTarget | null;
}) {
  const [gender, setGender] = useState<(typeof GENDERS)[number]>("Male");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(SLOTS[1]);
  const [whatsapp, setWhatsapp] = useState(true);
  const [terms, setTerms] = useState(false);

  if (!target) return null;

  const isPackage = target.kind === "package";
  const heading = isPackage ? "Book Health Package" : `Book ${target.name}`;
  const subTypeLabel = isPackage ? "Health Package" : "Lab Test";
  const Icon = isPackage ? HeartPulse : Beaker;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-0 max-w-md w-[calc(100vw-1rem)] rounded-3xl overflow-hidden border-border/60 bg-surface shadow-float [&>button]:hidden"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {/* Header */}
        <div className="relative bg-gradient-hero px-5 pt-5 pb-4">
          <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
          <div className="relative flex items-start justify-between gap-3">
            <div className="min-w-0 flex items-start gap-3">
              <div className="h-11 w-11 rounded-2xl bg-surface grid place-items-center border border-border/40 shadow-card shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10.5px] uppercase tracking-wider font-bold text-primary">
                    {subTypeLabel}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                  <span className="text-[10.5px] font-semibold text-muted-foreground">
                    From ₹{target.price}
                  </span>
                </div>
                <DialogTitle className="mt-0.5 text-[17px] leading-tight font-display font-bold text-foreground">
                  {heading}
                </DialogTitle>
                <p className="text-[11.5px] text-muted-foreground mt-1 leading-snug">
                  We will confirm your booking on WhatsApp or phone.
                </p>
              </div>
            </div>
            <button
              aria-label="Close"
              onClick={() => onOpenChange(false)}
              className="h-9 w-9 grid place-items-center rounded-full bg-surface/90 backdrop-blur shadow-card text-foreground shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onOpenChange(false);
          }}
          className="px-5 pt-4 pb-28 max-h-[68vh] overflow-y-auto"
        >
          {/* Patient */}
          <SectionTitle>Patient details</SectionTitle>
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
                      className={`flex-1 h-8 rounded-xl text-[11.5px] font-semibold transition ${
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

          {/* Address */}
          <SectionTitle className="mt-5">Sample collection address</SectionTitle>
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

          {/* Schedule */}
          <SectionTitle className="mt-5">Preferred date & time</SectionTitle>
          <Field label="Date" required>
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
                    className={`h-10 rounded-xl text-[12px] font-semibold border transition ${
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

          {/* Contact */}
          <SectionTitle className="mt-5">Contact details</SectionTitle>
          <Field label="Phone Number" required>
            <Phone className="h-4 w-4 text-muted-foreground" />
            <input
              required
              type="tel"
              placeholder="+91 98765 43210"
              className="flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-muted-foreground"
            />
          </Field>
          <button
            type="button"
            onClick={() => setWhatsapp((v) => !v)}
            aria-pressed={whatsapp}
            className="mt-2 w-full flex items-start gap-2.5 rounded-2xl border border-success/30 bg-success/8 px-3 py-2.5 text-left"
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
                Send updates on WhatsApp
              </span>
              <span className="block text-[11px] text-muted-foreground leading-snug">
                This number will receive booking updates on WhatsApp.
              </span>
            </span>
            <ShieldCheck className="h-4 w-4 text-success mt-0.5" />
          </button>

          <Field label="Email (Optional)" className="mt-3">
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
                rows={2}
                placeholder="Any specific instructions for the phlebotomist…"
                className="flex-1 bg-transparent text-[13px] outline-none resize-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Terms */}
          <button
            type="button"
            onClick={() => setTerms((v) => !v)}
            aria-pressed={terms}
            className="mt-4 flex items-start gap-2.5 text-left"
          >
            <span
              className={`h-5 w-5 mt-0.5 rounded-md grid place-items-center border transition ${
                terms ? "bg-primary border-primary" : "bg-surface border-border"
              }`}
            >
              {terms && <Check className="h-3.5 w-3.5 text-primary-foreground" />}
            </span>
            <span className="text-[11px] text-muted-foreground leading-relaxed">
              I agree to DocLinks <span className="text-foreground font-semibold">Terms</span> and
              consent to be contacted about my lab booking and reports.
            </span>
          </button>
        </form>

        {/* Sticky CTA */}
        <div className="absolute bottom-0 inset-x-0 px-5 py-3 bg-surface/95 backdrop-blur border-t border-border/60 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-12 px-4 inline-flex items-center justify-center rounded-2xl bg-surface border border-border/60 text-foreground text-[13px] font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => onOpenChange(false)}
            disabled={!terms}
            className="flex-1 h-12 inline-flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-brand text-primary-foreground text-[13.5px] font-semibold shadow-glow disabled:opacity-50"
          >
            <MapPin className="h-4 w-4" /> Submit Booking
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[11px] font-semibold text-foreground/80 mb-1.5 inline-block">
      {children}
    </label>
  );
}

function SectionTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h4
      className={`text-[11px] uppercase tracking-wider font-bold text-muted-foreground mb-2 ${className}`}
    >
      {children}
    </h4>
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
      <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-background px-3 py-2.5">
        {children}
      </div>
    </div>
  );
}
