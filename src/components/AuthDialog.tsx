import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Mail, Lock, Eye, EyeOff, User, Phone, ShieldCheck, Sparkles, ArrowRight,
  Stethoscope, Building2, Hospital, MapPin, CheckCircle2, HeartPulse, ChevronLeft,
} from "lucide-react";
import { useAuth, getInitials, type AuthUser } from "@/lib/auth";

/* ─────────── Google icon ─────────── */
function GoogleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c3 0 5.7 1.1 7.7 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.3-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8c1.8-4.4 6-7.5 11.1-7.5 3 0 5.7 1.1 7.7 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 16.3 4.5 9.7 9 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 43.5c5.1 0 9.8-2 13.3-5.2l-6.1-5c-2 1.4-4.5 2.2-7.2 2.2-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.5 39 16.2 43.5 24 43.5z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6.1 5c4.3-4 6.9-9.9 6.9-16.7 0-1.2-.1-2.3-.4-3.5z"/>
    </svg>
  );
}

/* ─────────── Helpers ─────────── */
function passwordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ["Too weak", "Weak", "Okay", "Strong", "Excellent"];
  const colors = ["bg-destructive", "bg-warning", "bg-warning", "bg-primary", "bg-success"];
  return { score, label: labels[score], color: colors[score] };
}

function FieldShell({
  icon: Icon, children,
}: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded-lg bg-primary-soft text-primary">
        <Icon className="h-3.5 w-3.5" />
      </span>
      {children}
    </div>
  );
}

/* ─────────── Main Dialog ─────────── */
export function AuthDialog() {
  const { open, closeAuth, mode, setMode, signIn } = useAuth();
  return (
    <Drawer open={open} onOpenChange={(o) => (o ? null : closeAuth())}>
      <DrawerContent className="max-h-[94vh] bg-background border-border/60">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Authentication</DrawerTitle>
          <DrawerDescription>Sign in or create an account</DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto px-5 pb-8 pt-2">
          {mode === "login" && <LoginView onSwitch={setMode} signIn={signIn} />}
          {mode === "signup" && <SignupView onSwitch={setMode} signIn={signIn} />}
          {mode === "provider" && <ProviderView onSwitch={setMode} onDone={closeAuth} />}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

/* ═══════════════════ LOGIN ═══════════════════ */
function LoginView({
  onSwitch, signIn,
}: { onSwitch: (m: "signup" | "provider") => void; signIn: (u: AuthUser) => void }) {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    signIn({
      id: crypto.randomUUID(), name, email,
      initials: getInitials(name), kind: "patient",
    });
    navigate({ to: "/account" });
  };

  const google = () => {
    signIn({
      id: crypto.randomUUID(), name: "Aarav Singh", email: "aarav.singh@gmail.com",
      initials: "AS", kind: "patient",
    });
    navigate({ to: "/account" });
  };

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-5 mb-5 border border-border/50">
        <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-primary/15 blur-2xl" />
        <div className="flex items-center gap-3 mb-3">
          <span className="h-11 w-11 rounded-2xl bg-gradient-brand grid place-items-center shadow-glow">
            <HeartPulse className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="px-2.5 py-1 rounded-full bg-surface/70 backdrop-blur text-[10px] font-semibold text-primary border border-primary/20 inline-flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" /> Verified Healthcare
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
          Welcome to DocLinks
        </h2>
        <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">
          Sign in to save providers, manage inquiries, track bookings, and access your healthcare dashboard.
        </p>
      </div>

      {/* Google */}
      <button
        onClick={google}
        className="w-full h-12 rounded-2xl bg-surface border border-border hover:border-primary/40 hover:bg-primary-soft/40 transition flex items-center justify-center gap-3 font-semibold text-foreground shadow-card"
      >
        <GoogleIcon /> Continue with Google
      </button>

      <Divider />

      <form onSubmit={submit} className="space-y-3.5">
        <div>
          <Label htmlFor="li-email" className="text-[12px] font-semibold text-foreground/80 ml-1">Email Address</Label>
          <FieldShell icon={Mail}>
            <Input
              id="li-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" autoComplete="email"
              className="h-12 pl-14 rounded-2xl bg-surface border-border/70 text-[14px]"
              required
            />
          </FieldShell>
        </div>

        <div>
          <Label htmlFor="li-pw" className="text-[12px] font-semibold text-foreground/80 ml-1">Password</Label>
          <FieldShell icon={Lock}>
            <Input
              id="li-pw" type={showPw ? "text" : "password"} value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password" autoComplete="current-password"
              className="h-12 pl-14 pr-12 rounded-2xl bg-surface border-border/70 text-[14px]"
              required
            />
            <button
              type="button" onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 grid place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition"
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </FieldShell>
        </div>

        <div className="flex justify-end">
          <button type="button" className="text-[12px] font-semibold text-primary hover:underline">
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          className="w-full h-12 rounded-2xl bg-gradient-brand text-primary-foreground font-semibold text-[14px] shadow-glow hover:opacity-95"
        >
          Sign In <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      {/* Cards */}
      <div className="mt-5 grid gap-3">
        <button
          onClick={() => onSwitch("signup")}
          className="group flex items-center gap-3 p-4 rounded-2xl bg-surface border border-border/60 hover:border-primary/50 hover:shadow-float transition text-left"
        >
          <span className="h-11 w-11 rounded-2xl bg-primary-soft text-primary grid place-items-center shrink-0">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="flex-1">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Don't have an account?</p>
            <p className="text-[14px] font-bold text-foreground">Create Account</p>
          </span>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition" />
        </button>
        <button
          onClick={() => onSwitch("provider")}
          className="group flex items-center gap-3 p-4 rounded-2xl bg-gradient-brand text-primary-foreground shadow-card hover:shadow-glow transition text-left"
        >
          <span className="h-11 w-11 rounded-2xl bg-white/20 backdrop-blur grid place-items-center shrink-0">
            <Stethoscope className="h-5 w-5" />
          </span>
          <span className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider opacity-80">Are you a healthcare provider?</p>
            <p className="text-[14px] font-bold">Join With Us</p>
          </span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════ SIGNUP ═══════════════════ */
function SignupView({
  onSwitch, signIn,
}: { onSwitch: (m: "login" | "provider") => void; signIn: (u: AuthUser) => void }) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [show, setShow] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const strength = useMemo(() => passwordStrength(pw), [pw]);
  const canSubmit = name && email && phone && pw.length >= 8 && pw === pw2 && agreed;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStep("success");
  };

  const finish = () => {
    signIn({
      id: crypto.randomUUID(), name, email, phone,
      initials: getInitials(name), kind: "patient",
    });
    navigate({ to: "/account" });
  };

  if (step === "success") {
    return <SuccessScreen
      title="Account Created Successfully"
      message="Welcome to DocLinks. Your healthcare dashboard is ready."
      ctaLabel="Continue"
      onCta={finish}
    />;
  }

  return (
    <div className="animate-fade-in">
      <button
        onClick={() => onSwitch("login")}
        className="inline-flex items-center gap-1 text-[12px] font-semibold text-muted-foreground hover:text-foreground mb-3"
      >
        <ChevronLeft className="h-4 w-4" /> Back to sign in
      </button>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-5 mb-5 border border-border/50">
        <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-primary/15 blur-2xl" />
        <span className="px-2.5 py-1 rounded-full bg-surface/70 backdrop-blur text-[10px] font-semibold text-primary border border-primary/20 inline-flex items-center gap-1 mb-3">
          <Sparkles className="h-3 w-3" /> Patient signup
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
          Create Your Account
        </h2>
        <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">
          Save doctors, hospitals, clinics, lab tests, and manage your healthcare journey in one place.
        </p>
      </div>

      <button
        onClick={finish}
        className="w-full h-12 rounded-2xl bg-surface border border-border hover:border-primary/40 transition flex items-center justify-center gap-3 font-semibold text-foreground shadow-card"
      >
        <GoogleIcon /> Continue with Google
      </button>
      <Divider />

      <form onSubmit={submit} className="space-y-4">
        {/* Personal info card */}
        <SectionCard
          title="Personal Information" sub="Your contact details" icon={User}
        >
          <FieldShell icon={User}>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name"
              className="h-12 pl-14 rounded-2xl bg-surface border-border/70" required />
          </FieldShell>
          <FieldShell icon={Mail}>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address"
              className="h-12 pl-14 rounded-2xl bg-surface border-border/70" required />
          </FieldShell>
          <FieldShell icon={Phone}>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="Phone number"
              className="h-12 pl-14 rounded-2xl bg-surface border-border/70" required />
          </FieldShell>
        </SectionCard>

        {/* Security card */}
        <SectionCard
          title="Account Security" sub="Create a secure password" icon={ShieldCheck}
        >
          <div className="relative">
            <FieldShell icon={Lock}>
              <Input value={pw} onChange={(e) => setPw(e.target.value)} type={show ? "text" : "password"}
                placeholder="Password" className="h-12 pl-14 pr-12 rounded-2xl bg-surface border-border/70" required />
            </FieldShell>
            <button type="button" onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 grid place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <FieldShell icon={Lock}>
            <Input value={pw2} onChange={(e) => setPw2(e.target.value)} type={show ? "text" : "password"}
              placeholder="Confirm password" className="h-12 pl-14 rounded-2xl bg-surface border-border/70" required />
          </FieldShell>

          {pw && (
            <div>
              <div className="flex gap-1 mb-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i < strength.score ? strength.color : "bg-muted"
                  }`} />
                ))}
              </div>
              <p className="text-[11px] font-medium text-muted-foreground">
                Strength: <span className="text-foreground font-semibold">{strength.label}</span>
                {pw2 && pw !== pw2 && <span className="text-destructive ml-2">Passwords don't match</span>}
              </p>
            </div>
          )}
        </SectionCard>

        <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-primary-soft/40 border border-primary/15 cursor-pointer">
          <Checkbox checked={agreed} onCheckedChange={(c) => setAgreed(!!c)} className="mt-0.5" />
          <span className="text-[12px] text-foreground/80 leading-relaxed">
            I agree to the <a className="text-primary font-semibold underline">Terms of Service</a> and{" "}
            <a className="text-primary font-semibold underline">Privacy Policy</a>
          </span>
        </label>

        <Button type="submit" disabled={!canSubmit}
          className="w-full h-12 rounded-2xl bg-gradient-brand text-primary-foreground font-semibold shadow-glow hover:opacity-95">
          Create Account <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <p className="mt-5 text-center text-[13px] text-muted-foreground">
        Already have an account?{" "}
        <button onClick={() => onSwitch("login")} className="text-primary font-semibold hover:underline">
          Sign In
        </button>
      </p>
    </div>
  );
}

/* ═══════════════════ PROVIDER REGISTRATION ═══════════════════ */
type ProviderKind = "doctor" | "clinic" | "hospital";

function ProviderView({
  onSwitch, onDone,
}: { onSwitch: (m: "login") => void; onDone: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [kind, setKind] = useState<ProviderKind | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  if (step === 3) {
    return <SuccessScreen
      title="Application Submitted"
      message="Thank you for joining DocLinks. Our team will review your information and contact you shortly regarding your provider profile setup."
      ctaLabel="Continue Exploring"
      onCta={() => { onDone(); navigate({ to: "/find-doctors" }); }}
    />;
  }

  return (
    <div className="animate-fade-in">
      <button
        onClick={() => (step === 1 ? onSwitch("login") : setStep((step - 1) as 1 | 2))}
        className="inline-flex items-center gap-1 text-[12px] font-semibold text-muted-foreground hover:text-foreground mb-3"
      >
        <ChevronLeft className="h-4 w-4" /> Back
      </button>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-5 mb-5 text-primary-foreground">
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
        <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur text-[10px] font-bold inline-flex items-center gap-1 mb-3">
          <Stethoscope className="h-3 w-3" /> Provider Registration · Step {step} of 2
        </span>
        <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          {step === 1 ? "Who are you?" : "Tell us about your practice"}
        </h2>
        <p className="text-[13px] opacity-90 mt-1.5 leading-relaxed">
          {step === 1
            ? "Select your role to begin a tailored registration experience."
            : "We'll use this information to set up your verified provider profile."}
        </p>
        <div className="mt-4 flex gap-1.5">
          {[1, 2].map((s) => (
            <span key={s} className={`h-1 flex-1 rounded-full ${step >= s ? "bg-white" : "bg-white/30"}`} />
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-3">
          {[
            { id: "doctor", label: "Doctor", desc: "Individual medical practitioner", icon: Stethoscope },
            { id: "clinic", label: "Clinic", desc: "Multi-specialty or specialty clinic", icon: Building2 },
            { id: "hospital", label: "Hospital", desc: "Full-service hospital or facility", icon: Hospital },
          ].map(({ id, label, desc, icon: Icon }) => {
            const selected = kind === id;
            return (
              <button
                key={id} onClick={() => setKind(id as ProviderKind)}
                className={`w-full p-4 rounded-2xl border-2 transition flex items-center gap-3 text-left ${
                  selected
                    ? "border-primary bg-primary-soft/60 shadow-glow"
                    : "border-border bg-surface hover:border-primary/40"
                }`}
              >
                <span className={`h-12 w-12 rounded-2xl grid place-items-center shrink-0 transition ${
                  selected ? "bg-gradient-brand text-primary-foreground" : "bg-primary-soft text-primary"
                }`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <p className="text-[15px] font-bold text-foreground">{label}</p>
                  <p className="text-[12px] text-muted-foreground">{desc}</p>
                </span>
                {selected && <CheckCircle2 className="h-5 w-5 text-primary" />}
              </button>
            );
          })}
          <Button disabled={!kind} onClick={() => setStep(2)}
            className="w-full h-12 rounded-2xl bg-gradient-brand text-primary-foreground font-semibold shadow-glow mt-2">
            Continue <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={(e) => { e.preventDefault(); if (agreed && name && email && phone && location) setStep(3); }}
          className="space-y-4">
          <SectionCard title="Provider Information" sub="Verified details for your profile" icon={Stethoscope}>
            <FieldShell icon={User}>
              <Input value={name} onChange={(e) => setName(e.target.value)}
                placeholder={kind === "doctor" ? "Doctor name" : "Practice name"}
                className="h-12 pl-14 rounded-2xl bg-surface border-border/70" required />
            </FieldShell>
            <FieldShell icon={Mail}>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address"
                className="h-12 pl-14 rounded-2xl bg-surface border-border/70" required />
            </FieldShell>
            <FieldShell icon={Phone}>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="Mobile number"
                className="h-12 pl-14 rounded-2xl bg-surface border-border/70" required />
            </FieldShell>
            <FieldShell icon={MapPin}>
              <Input value={location} onChange={(e) => setLocation(e.target.value)}
                placeholder="City or location"
                className="h-12 pl-14 rounded-2xl bg-surface border-border/70" required />
            </FieldShell>
            {!location && (
              <div className="flex flex-wrap gap-1.5">
                {["Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Chennai"].map((c) => (
                  <button key={c} type="button" onClick={() => setLocation(c)}
                    className="px-3 py-1.5 rounded-full bg-primary-soft/60 text-primary text-[11px] font-semibold hover:bg-primary-soft transition">
                    {c}
                  </button>
                ))}
              </div>
            )}
          </SectionCard>

          <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-primary-soft/40 border border-primary/15 cursor-pointer">
            <Checkbox checked={agreed} onCheckedChange={(c) => setAgreed(!!c)} className="mt-0.5" />
            <span className="text-[12px] text-foreground/80 leading-relaxed">
              I agree to the <a className="text-primary font-semibold underline">Terms</a> and{" "}
              <a className="text-primary font-semibold underline">Privacy Policy</a>
            </span>
          </label>

          <Button type="submit" disabled={!agreed || !name || !email || !phone || !location}
            className="w-full h-12 rounded-2xl bg-gradient-brand text-primary-foreground font-semibold shadow-glow">
            Submit Registration <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      )}
    </div>
  );
}

/* ═══════════════════ Shared bits ═══════════════════ */
function Divider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <span className="flex-1 h-px bg-border" />
      <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground">OR</span>
      <span className="flex-1 h-px bg-border" />
    </div>
  );
}

function SectionCard({
  title, sub, icon: Icon, children,
}: {
  title: string; sub: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-surface border border-border/60 p-4 shadow-card space-y-3">
      <div className="flex items-center gap-2.5">
        <span className="h-9 w-9 rounded-xl bg-primary-soft text-primary grid place-items-center">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[13px] font-bold text-foreground leading-tight">{title}</p>
          <p className="text-[11px] text-muted-foreground">{sub}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function SuccessScreen({
  title, message, ctaLabel, onCta,
}: { title: string; message: string; ctaLabel: string; onCta: () => void }) {
  return (
    <div className="animate-fade-in py-4">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-6 text-center border border-border/50">
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/15 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-primary-glow/20 blur-2xl" />
        <div className="relative">
          <div className="mx-auto h-20 w-20 rounded-full bg-gradient-brand grid place-items-center shadow-glow animate-pulse-soft mb-4">
            <CheckCircle2 className="h-10 w-10 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            {title}
          </h2>
          <p className="text-[13px] text-muted-foreground mt-2 leading-relaxed max-w-sm mx-auto">
            {message}
          </p>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              { icon: ShieldCheck, label: "Verified" },
              { icon: HeartPulse, label: "Trusted" },
              { icon: Sparkles, label: "Premium" },
            ].map(({ icon: I, label }) => (
              <div key={label} className="rounded-2xl bg-surface/80 backdrop-blur border border-border/50 p-3">
                <I className="h-4 w-4 text-primary mx-auto mb-1" />
                <p className="text-[10px] font-semibold text-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button onClick={onCta}
        className="mt-5 w-full h-12 rounded-2xl bg-gradient-brand text-primary-foreground font-semibold shadow-glow">
        {ctaLabel} <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
