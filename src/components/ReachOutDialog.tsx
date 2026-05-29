import { useState } from "react";
import { Mail, MessageSquare, Phone, Send, User, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const REASONS = [
  "Book a consultation",
  "Consultation for a family member",
  "Second opinion",
  "Discuss treatment options",
  "Other",
];

export function ReachOutDialog({
  open,
  onOpenChange,
  recipient,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  recipient: string;
}) {
  const [reason, setReason] = useState(REASONS[0]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-0 max-w-md w-[calc(100vw-1.5rem)] rounded-3xl overflow-hidden border-border/60 bg-surface shadow-float [&>button]:hidden"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {/* Header */}
        <div className="relative bg-gradient-hero px-5 pt-5 pb-4">
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
          <div className="relative flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface/85 backdrop-blur px-2.5 py-1 text-[10.5px] font-semibold text-primary border border-primary/15">
                <Send className="h-3 w-3" /> Direct enquiry
              </span>
              <DialogTitle className="mt-2.5 text-[18px] leading-tight font-display font-bold text-foreground">
                Reach out to {recipient}
              </DialogTitle>
              <p className="text-[12px] text-muted-foreground mt-1">
                Share your details and our care desk will respond shortly.
              </p>
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
          className="px-5 pt-4 pb-5 max-h-[70vh] overflow-y-auto"
        >
          <Field label="Full Name" required>
            <span className="text-muted-foreground"><User className="h-4 w-4" /></span>
            <input
              required
              placeholder="Your full name"
              className="flex-1 bg-transparent text-[13.5px] placeholder:text-muted-foreground outline-none"
            />
          </Field>

          <div className="grid grid-cols-1 gap-3 mt-3">
            <Field label="Phone Number" required>
              <span className="text-muted-foreground"><Phone className="h-4 w-4" /></span>
              <input
                required
                type="tel"
                placeholder="+91 98765 43210"
                className="flex-1 bg-transparent text-[13.5px] placeholder:text-muted-foreground outline-none"
              />
            </Field>
            <Field label="Email Address">
              <span className="text-muted-foreground"><Mail className="h-4 w-4" /></span>
              <input
                type="email"
                placeholder="name@example.com"
                className="flex-1 bg-transparent text-[13.5px] placeholder:text-muted-foreground outline-none"
              />
            </Field>
          </div>

          <div className="mt-4">
            <label className="text-[11.5px] font-semibold text-foreground/80 mb-2 inline-block">
              Reason for Visit <span className="text-destructive">*</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {REASONS.map((r) => {
                const active = reason === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setReason(r)}
                    aria-pressed={active}
                    className={`text-[11.5px] font-semibold px-3 py-1.5 rounded-full border transition-all ${
                      active
                        ? "bg-foreground text-background border-foreground shadow-card"
                        : "bg-surface text-foreground border-border/60"
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-[11.5px] font-semibold text-foreground/80 mb-1.5 inline-block">
              Additional Message
            </label>
            <div className="flex items-start gap-2 rounded-2xl border border-border/60 bg-background px-3 py-2.5">
              <span className="text-muted-foreground mt-0.5"><MessageSquare className="h-4 w-4" /></span>
              <textarea
                rows={3}
                placeholder="Tell us briefly what you'd like to discuss…"
                className="flex-1 bg-transparent text-[13.5px] placeholder:text-muted-foreground outline-none resize-none"
              />
            </div>
          </div>

          <p className="mt-3 text-[10.5px] text-muted-foreground leading-relaxed">
            By submitting, you agree to be contacted by {recipient} via phone, WhatsApp or email.
          </p>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="h-11 px-4 inline-flex items-center justify-center rounded-2xl bg-surface border border-border/60 text-foreground text-[13px] font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-11 inline-flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-brand text-primary-foreground text-[13px] font-semibold shadow-glow"
            >
              <Send className="h-4 w-4" /> Send Enquiry
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-[11.5px] font-semibold text-foreground/80 mb-1.5 inline-block">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-background px-3 py-2.5">
        {children}
      </div>
    </div>
  );
}
