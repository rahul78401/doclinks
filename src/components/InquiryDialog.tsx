import { useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  Stethoscope,
  User,
  UserPlus,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const REASONS = [
  { key: "consultation", label: "Book a Consultation", icon: CalendarCheck },
  { key: "second", label: "Second Opinion", icon: UserPlus },
  { key: "treatment", label: "Discuss Treatment Options", icon: Stethoscope },
  { key: "other", label: "Other Inquiry", icon: Sparkles },
] as const;

export function InquiryDialog({
  open,
  onOpenChange,
  recipient,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  recipient: string;
}) {
  const [reason, setReason] = useState<(typeof REASONS)[number]["key"]>(
    "consultation",
  );
  const [submitted, setSubmitted] = useState(false);

  const handleClose = (v: boolean) => {
    onOpenChange(v);
    if (!v) setTimeout(() => setSubmitted(false), 250);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="p-0 max-w-md w-[calc(100vw-1.5rem)] rounded-3xl overflow-hidden border-border/60 bg-surface shadow-float [&>button]:hidden"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {submitted ? (
          <SuccessView recipient={recipient} onDone={() => handleClose(false)} />
        ) : (
          <>
            {/* Header */}
            <div className="relative bg-gradient-hero px-5 pt-5 pb-4">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
              <div className="relative flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-surface/85 backdrop-blur px-2.5 py-1 text-[10.5px] font-semibold text-primary border border-primary/15">
                    <Send className="h-3 w-3" /> Direct enquiry
                  </span>
                  <DialogTitle className="mt-2.5 text-[18px] leading-tight font-display font-bold text-foreground">
                    Connect With Doctor
                  </DialogTitle>
                  <p className="text-[12px] text-muted-foreground mt-1">
                    Share your requirement and the doctor or clinic team will contact you shortly.
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={() => handleClose(false)}
                  className="h-9 w-9 grid place-items-center rounded-full bg-surface/90 backdrop-blur shadow-card text-foreground shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="px-5 pt-4 pb-5 max-h-[70vh] overflow-y-auto"
            >
              <Field label="Full Name" required>
                <span className="text-muted-foreground"><User className="h-4 w-4" /></span>
                <input
                  required
                  maxLength={100}
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
                    maxLength={20}
                    placeholder="+91 98765 43210"
                    className="flex-1 bg-transparent text-[13.5px] placeholder:text-muted-foreground outline-none"
                  />
                </Field>
                <Field label="Email Address">
                  <span className="text-muted-foreground"><Mail className="h-4 w-4" /></span>
                  <input
                    type="email"
                    maxLength={255}
                    placeholder="name@example.com"
                    className="flex-1 bg-transparent text-[13.5px] placeholder:text-muted-foreground outline-none"
                  />
                </Field>
              </div>

              <div className="mt-4">
                <label className="text-[11.5px] font-semibold text-foreground/80 mb-2 inline-block">
                  Reason for Visit <span className="text-destructive">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {REASONS.map(({ key, label, icon: Icon }) => {
                    const active = reason === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setReason(key)}
                        aria-pressed={active}
                        className={`flex items-center gap-2 text-left px-3 py-2.5 rounded-2xl border transition-all ${
                          active
                            ? "bg-primary-soft border-primary/40 shadow-card"
                            : "bg-surface border-border/60 hover:border-primary/30"
                        }`}
                      >
                        <span
                          className={`h-8 w-8 grid place-items-center rounded-xl shrink-0 ${
                            active ? "bg-gradient-brand text-primary-foreground" : "bg-muted text-foreground/70"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-[11.5px] font-semibold leading-tight">
                          {label}
                        </span>
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
                    maxLength={1000}
                    placeholder="Share any details that may help the doctor understand your requirement..."
                    className="flex-1 bg-transparent text-[13.5px] placeholder:text-muted-foreground outline-none resize-none"
                  />
                </div>
              </div>

              <p className="mt-3 text-[10.5px] text-muted-foreground leading-relaxed">
                By submitting, you agree to be contacted by {recipient} via phone, WhatsApp or email.
              </p>

              <button
                type="submit"
                className="mt-4 w-full h-12 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-brand text-primary-foreground text-[14px] font-semibold shadow-glow"
              >
                <Send className="h-4 w-4" /> Submit Inquiry
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function SuccessView({
  recipient,
  onDone,
}: {
  recipient: string;
  onDone: () => void;
}) {
  return (
    <div className="relative px-6 pt-8 pb-6 text-center bg-gradient-to-b from-primary-soft/60 to-surface">
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="relative">
        <div className="mx-auto h-20 w-20 grid place-items-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow animate-pulse-soft">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <DialogTitle className="mt-5 text-[20px] font-display font-bold text-foreground">
          Inquiry Sent Successfully
        </DialogTitle>
        <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
          Your inquiry has been submitted. {recipient} or the clinic team will
          review your request and contact you using the details provided.
        </p>

        <div className="mt-5 rounded-2xl bg-surface border border-border/60 shadow-card p-3.5 text-left">
          <p className="text-[10.5px] font-bold uppercase tracking-wider text-primary">
            What happens next
          </p>
          <ul className="mt-2 space-y-1.5 text-[12px] text-foreground/80">
            <li className="flex gap-2"><span className="text-primary">•</span> Care desk reviews your request within a few hours</li>
            <li className="flex gap-2"><span className="text-primary">•</span> You'll receive a call or WhatsApp message</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Preferred slots will be confirmed with you</li>
          </ul>
        </div>

        <button
          onClick={onDone}
          className="mt-5 w-full h-11 inline-flex items-center justify-center rounded-2xl bg-foreground text-background text-[13px] font-semibold"
        >
          Done
        </button>
      </div>
    </div>
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
