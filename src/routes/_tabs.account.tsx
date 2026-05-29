import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Heart, Bookmark, Eye, UserCircle2, Stethoscope, Compass,
  Search, Phone, MessageCircle, ShieldCheck, MapPin, ChevronRight,
  Activity, Users, CalendarCheck, Sparkles, BookOpen, ArrowUpRight,
  Mail, Calendar, Droplet, Home, AlertCircle, Pencil, Download,
  Share2, Bell, Lock, LogOut, Info, ChevronDown, Plus, Trash2,
  ScrollText, CheckCircle2, Building2, Clock3, X,
} from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { doctors } from "@/lib/doctors";
import { hospitals } from "@/lib/hospitals";
import { clinics } from "@/lib/clinics";
import { articles, magazines } from "@/lib/explore";

export const Route = createFileRoute("/_tabs/account")({
  head: () => ({
    meta: [
      { title: "Your Account — DocLinks" },
      { name: "description", content: "Your personal healthcare dashboard. Saved providers, recently viewed, and profile management." },
    ],
  }),
  component: AccountPage,
});

const user = {
  firstName: "Rahul",
  lastName: "Sharma",
  email: "rahul.sharma@gmail.com",
  phone: "+91 98765 43210",
  dob: "1995-08-14",
  gender: "Male",
  blood: "O+",
  address: "B-204, Skyline Residency, 12th Main",
  city: "Bengaluru",
  state: "Karnataka",
  pincode: "560038",
};

function AccountPage() {
  const [view, setView] = useState<"dashboard" | "profile">("dashboard");

  return (
    <div className="px-5 pt-2 pb-8 max-w-md mx-auto">
      {/* Top segmented view switch */}
      <div className="relative bg-surface border border-border/60 rounded-full p-1 shadow-card flex">
        <span
          className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-gradient-brand shadow-glow transition-all duration-300"
          style={{ left: view === "dashboard" ? 4 : "calc(50% + 0px)" }}
        />
        {(["dashboard", "profile"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`relative z-10 flex-1 py-2 text-sm font-semibold rounded-full capitalize transition-colors ${
              view === v ? "text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {v === "dashboard" ? "Dashboard" : "Profile"}
          </button>
        ))}
      </div>

      <div className="mt-5 animate-fade-in">
        {view === "dashboard" ? <Dashboard /> : <Profile />}
      </div>
    </div>
  );
}

/* ─────────────────────────  DASHBOARD  ───────────────────────── */

function Dashboard() {
  return (
    <div className="space-y-7">
      <HeroCard />
      <QuickStats />
      <SavedSection />
      <FollowingSection />
      <RecentlyViewed />
      <ArticlesAndMagazines />
      <SettingsCard />
    </div>
  );
}

function HeroCard() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-border/60 shadow-card p-6 bg-gradient-hero">
      {/* layered glow */}
      <div className="absolute -top-24 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-primary-glow/25 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
           style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "18px 18px" }} />

      {/* floating micro card top-right */}
      <div className="absolute top-5 right-5 flex items-center gap-2 rounded-2xl bg-surface/85 backdrop-blur border border-border/60 px-3 py-1.5 shadow-card">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-60" />
          <span className="relative rounded-full bg-success h-2 w-2" />
        </span>
        <span className="text-[11px] font-semibold text-foreground">All set</span>
      </div>

      <div className="relative">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-surface/80 border border-border/60 px-2.5 py-1 text-[10.5px] uppercase tracking-wider text-primary font-bold shadow-card">
          <Sparkles className="h-3 w-3" />
          Your Health Hub
        </div>
        <h1 className="mt-4 text-[30px] leading-[1.05] font-bold text-foreground font-display tracking-tight">
          Welcome back,<br />
          <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">{user.firstName}.</span>
        </h1>
        <p className="mt-3 text-[13.5px] text-muted-foreground leading-relaxed text-balance max-w-[320px]">
          A calmer way to find trusted doctors and stay on top of your care.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            to="/find-doctors"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand text-primary-foreground px-5 py-2.5 text-[13px] font-semibold shadow-glow"
          >
            <Search className="h-4 w-4" /> Find Doctors
          </Link>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 rounded-full bg-surface/90 backdrop-blur border border-border/70 text-foreground px-5 py-2.5 text-[13px] font-semibold shadow-card"
          >
            <Compass className="h-4 w-4" /> Explore
          </Link>
        </div>
      </div>
    </section>
  );
}

function QuickStats() {
  const stats = [
    { icon: Search, label: "Doctors Searched", value: 48, tint: "bg-primary-soft text-primary" },
    { icon: Eye, label: "Contacts Viewed", value: 23, tint: "bg-[#fde7e9] text-[#a83247]" },
    { icon: Bookmark, label: "Saved", value: 12, tint: "bg-[#ffeede] text-[#a85a1f]" },
    { icon: CalendarCheck, label: "Inquiries Sent", value: 6, tint: "bg-[#e2eeff] text-[#2a4f9c]" },
  ];
  return (
    <section>
      <SectionHeading title="At a glance" />
      <div className="mt-3 grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-surface border border-border/60 p-4 shadow-card transition-transform hover:-translate-y-0.5">
            <span className={`h-9 w-9 grid place-items-center rounded-xl ${s.tint}`}>
              <s.icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
            </span>
            <p className="mt-3 text-2xl font-bold text-foreground font-display">{s.value}</p>
            <p className="text-[12px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ title, action }: { title: string; action?: { label: string; to: string } }) {
  return (
    <div className="flex items-end justify-between">
      <h2 className="text-lg font-bold text-foreground font-display">{title}</h2>
      {action && (
        <Link to={action.to} className="text-xs font-semibold text-primary inline-flex items-center gap-0.5">
          {action.label} <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

function SavedSection() {
  const saved = [
    { kind: "Doctor", id: doctors[0].id, name: doctors[0].name, sub: doctors[0].specialty, loc: doctors[0].location, img: doctors[0].image, to: `/doctor/${doctors[0].id}`, verified: true },
    { kind: "Hospital", id: hospitals[0].id, name: hospitals[0].name, sub: hospitals[0].category, loc: hospitals[0].location, img: hospitals[0].cover, to: `/hospital/${hospitals[0].id}`, verified: true },
    { kind: "Clinic", id: clinics[0].id, name: clinics[0].name, sub: clinics[0].specialties[0], loc: clinics[0].area, img: clinics[0].image, to: `/clinic/${clinics[0].id}`, verified: clinics[0].verified },
  ];

  return (
    <section>
      <SectionHeading title="Saved & Liked" action={{ label: "View all", to: "/account" }} />
      <div className="mt-3 -mx-5 px-5 flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory">
        {saved.map((s) => (
          <Link
            key={s.kind + s.id}
            to={s.to as any}
            className="snap-start shrink-0 w-[260px] rounded-2xl bg-surface border border-border/60 shadow-card overflow-hidden"
          >
            <div className="relative h-32">
              <img src={s.img} alt={s.name} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <span className="absolute top-2 left-2 text-[10px] font-semibold uppercase tracking-wider bg-surface/95 text-foreground px-2 py-1 rounded-full">
                {s.kind}
              </span>
              <button className="absolute top-2 right-2 h-8 w-8 rounded-full bg-surface/95 grid place-items-center text-primary">
                <Heart className="h-4 w-4" fill="currentColor" />
              </button>
            </div>
            <div className="p-3.5">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold text-foreground text-[14px] truncate">{s.name}</p>
                {s.verified && <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />}
              </div>
              <p className="text-[12px] text-muted-foreground truncate">{s.sub}</p>
              <p className="mt-1 text-[11px] text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {s.loc}
              </p>
              <div className="mt-3 flex gap-1.5">
                <button className="flex-1 h-8 rounded-full bg-primary-soft text-primary text-[11px] font-semibold inline-flex items-center justify-center gap-1">
                  <Phone className="h-3 w-3" /> Call
                </button>
                <button className="flex-1 h-8 rounded-full bg-[#e8f7ee] text-[#1f7a3d] text-[11px] font-semibold inline-flex items-center justify-center gap-1">
                  <MessageCircle className="h-3 w-3" /> Chat
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FollowingSection() {
  const following = [
    { id: doctors[1].id, kind: "Doctor" as const, icon: Stethoscope, name: doctors[1].name, sub: doctors[1].specialty, img: doctors[1].image, followers: doctors[1].followers, to: `/doctor/${doctors[1].id}` as const, activity: "Available today", activityTint: "bg-success/15 text-success", dot: "bg-success" },
    { id: doctors[2].id, kind: "Doctor" as const, icon: Stethoscope, name: doctors[2].name, sub: doctors[2].specialty, img: doctors[2].image, followers: doctors[2].followers, to: `/doctor/${doctors[2].id}` as const, activity: "Added 4 new slots", activityTint: "bg-primary-soft text-primary", dot: "bg-primary" },
    { id: hospitals[0].id, kind: "Hospital" as const, icon: Building2, name: hospitals[0].name, sub: hospitals[0].category, img: hospitals[0].cover, followers: hospitals[0].stats.followers, to: `/hospital/${hospitals[0].id}` as const, activity: "New cardiology service", activityTint: "bg-[#fde7e9] text-[#a83247]", dot: "bg-[#a83247]" },
    { id: clinics[0].id, kind: "Clinic" as const, icon: Building2, name: clinics[0].name, sub: clinics[0].specialties[0], img: clinics[0].image, followers: 1240, to: `/clinic/${clinics[0].id}` as const, activity: "Updated 2h ago", activityTint: "bg-[#ffeede] text-[#a85a1f]", dot: "bg-[#a85a1f]" },
  ];

  return (
    <section>
      <SectionHeading title="Following" action={{ label: "Manage", to: "/account" }} />
      <div className="mt-3 space-y-2.5">
        {following.map((f) => (
          <div key={f.kind + f.id} className="group rounded-2xl bg-surface border border-border/60 p-3.5 shadow-card transition-all hover:-translate-y-0.5">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0">
                <div className="h-full w-full rounded-2xl overflow-hidden ring-2 ring-primary-soft">
                  <img src={f.img} alt={f.name} className="h-full w-full object-cover" />
                </div>
                <span className="absolute -bottom-1 -right-1 h-5 w-5 grid place-items-center rounded-full bg-surface border border-border/60 text-primary">
                  <f.icon className="h-2.5 w-2.5" strokeWidth={2.4} />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-semibold text-foreground text-[14px] truncate">{f.name}</p>
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                </div>
                <p className="text-[11.5px] text-muted-foreground truncate">{f.sub} · {f.followers.toLocaleString()} followers</p>
              </div>
              <button className="h-8 px-3 rounded-full bg-primary-soft text-primary text-[11.5px] font-semibold inline-flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Following
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-semibold ${f.activityTint}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${f.dot}`} />
                {f.activity}
              </span>
              <div className="flex gap-1.5">
                <button className="h-8 w-8 rounded-full bg-muted/60 text-foreground grid place-items-center">
                  <Phone className="h-3.5 w-3.5" />
                </button>
                <button className="h-8 w-8 rounded-full bg-[#e8f7ee] text-[#1f7a3d] grid place-items-center">
                  <MessageCircle className="h-3.5 w-3.5" />
                </button>
                <Link to={f.to as any} className="h-8 px-3 rounded-full bg-foreground text-background text-[11.5px] font-semibold inline-flex items-center gap-1">
                  View <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RecentlyViewed() {
  const items = [
    { kind: "Doctor", name: doctors[3].name, sub: doctors[3].specialty, img: doctors[3].image, time: "2 hours ago", to: `/doctor/${doctors[3].id}` as const },
    { kind: "Hospital", name: hospitals[1]?.name ?? hospitals[0].name, sub: "Multi-Speciality", img: (hospitals[1] ?? hospitals[0]).cover, time: "Yesterday", to: `/hospital/${(hospitals[1] ?? hospitals[0]).id}` as const },
    { kind: "Clinic", name: clinics[0].name, sub: clinics[0].specialties[0], img: clinics[0].image, time: "2 days ago", to: `/clinic/${clinics[0].id}` as const },
    { kind: "Lab Test", name: "Complete Blood Count", sub: "Health Panel", img: clinics[0].gallery[1], time: "3 days ago", to: "/lab-tests" as const },
  ];
  return (
    <section>
      <SectionHeading title="Recently viewed" />
      <div className="mt-3 -mx-5 px-5 flex gap-3 overflow-x-auto no-scrollbar snap-x">
        {items.map((it, i) => (
          <Link key={i} to={it.to as any} className="snap-start shrink-0 w-[170px] rounded-2xl bg-surface border border-border/60 shadow-card overflow-hidden">
            <div className="relative h-24">
              <img src={it.img} alt={it.name} className="h-full w-full object-cover" />
              <span className="absolute top-2 left-2 text-[10px] font-semibold bg-surface/95 text-foreground px-2 py-0.5 rounded-full">{it.kind}</span>
            </div>
            <div className="p-3">
              <p className="font-semibold text-foreground text-[13px] truncate leading-tight">{it.name}</p>
              <p className="text-[11px] text-muted-foreground truncate mt-0.5">{it.sub}</p>
              <p className="text-[10px] text-primary mt-1.5 font-medium">Viewed {it.time}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ArticlesAndMagazines() {
  const feat = articles.find((a) => a.featured) ?? articles[0];
  const others = articles.filter((a) => a.id !== feat.id).slice(0, 2);
  return (
    <section className="space-y-5">
      <SectionHeading title="For you" action={{ label: "Explore", to: "/explore" }} />

      <Link to="/article/$slug" params={{ slug: feat.id }} className="block rounded-[24px] overflow-hidden bg-surface border border-border/60 shadow-card">
        <div className="relative h-44">
          <img src={feat.cover} alt={feat.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
          <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider bg-surface/95 text-foreground px-2.5 py-1 rounded-full">{feat.category}</span>
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <p className="text-[15px] font-semibold leading-snug line-clamp-2 font-display">{feat.title}</p>
            <p className="text-[11px] opacity-85 mt-1">{feat.readMins} min read · {feat.author.name}</p>
          </div>
        </div>
      </Link>

      <div className="grid grid-cols-2 gap-3">
        {others.map((a) => (
          <Link key={a.id} to="/article/$slug" params={{ slug: a.id }} className="rounded-2xl bg-surface border border-border/60 shadow-card overflow-hidden">
            <div className="h-24"><img src={a.cover} className="h-full w-full object-cover" alt={a.title} /></div>
            <div className="p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">{a.category}</p>
              <p className="text-[12.5px] font-semibold leading-snug line-clamp-2 mt-0.5">{a.title}</p>
              <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1"><BookOpen className="h-3 w-3" /> {a.readMins} min</p>
            </div>
          </Link>
        ))}
      </div>

      <div>
        <SectionHeading title="Magazines" />
        <div className="mt-3 -mx-5 px-5 flex gap-3 overflow-x-auto no-scrollbar snap-x">
          {magazines.map((m) => (
            <Link key={m.id} to="/magazine/$id" params={{ id: m.id }} className={`snap-start shrink-0 w-[160px] rounded-2xl border border-border/60 shadow-card overflow-hidden bg-gradient-to-b ${m.tint}`}>
              <div className="aspect-[3/4] p-3">
                <div className="h-full w-full rounded-xl overflow-hidden shadow-float">
                  <img src={m.cover} alt={m.title} className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="px-3 pb-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{m.issue} · {m.topic}</p>
                <p className="text-[13px] font-semibold leading-tight mt-0.5 font-display">{m.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SettingsCard() {
  const items: { icon: any; label: string; to?: string; href?: string }[] = [
    { icon: Bell, label: "Notifications" },
    { icon: Lock, label: "Privacy & Security" },
    { icon: ScrollText, label: "Legal Center", to: "/legal" },
    { icon: Info, label: "Help & Support" },
  ];
  return (
    <div className="space-y-4">
      <section className="rounded-3xl bg-surface border border-border/60 shadow-card overflow-hidden">
        {items.map((it, i) => {
          const inner = (
            <>
              <span className="h-9 w-9 grid place-items-center rounded-xl bg-muted text-muted-foreground">
                <it.icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </span>
              <span className="flex-1 text-[14px] font-medium text-foreground">{it.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </>
          );
          const cls = `w-full flex items-center gap-3 px-4 py-3.5 text-left ${i < items.length - 1 ? "border-b border-border/50" : ""}`;
          return it.to ? (
            <Link key={it.label} to={it.to as any} className={cls}>{inner}</Link>
          ) : (
            <button key={it.label} className={cls}>{inner}</button>
          );
        })}
      </section>

      <button className="w-full flex items-center gap-3 rounded-3xl bg-surface border border-border/60 shadow-card px-4 py-3.5">
        <span className="h-9 w-9 grid place-items-center rounded-xl bg-destructive/10 text-destructive">
          <LogOut className="h-[18px] w-[18px]" strokeWidth={2.2} />
        </span>
        <span className="flex-1 text-left text-[14px] font-medium text-destructive">Sign out</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </button>

      <DeleteAccountCard />
    </div>
  );
}

function DeleteAccountCard() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [confirm, setConfirm] = useState("");

  const onOpenChange = (v: boolean) => {
    setOpen(v);
    if (!v) { setStep(1); setConfirm(""); }
  };

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-destructive/20 shadow-card p-5"
      style={{ background: "linear-gradient(180deg, color-mix(in oklab, var(--color-destructive) 6%, var(--color-surface)) 0%, var(--color-surface) 100%)" }}
    >
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-destructive/10 blur-3xl pointer-events-none" />
      <div className="relative">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 text-destructive px-2.5 py-1 text-[10.5px] uppercase tracking-wider font-bold">
          <AlertCircle className="h-3 w-3" /> Danger zone
        </div>
        <h3 className="mt-3 text-[16px] font-bold text-foreground font-display">Delete account</h3>
        <p className="mt-1.5 text-[12.5px] text-muted-foreground leading-relaxed">
          Deleting your account will permanently remove your saved doctors, clinics, hospitals, preferences and medical information. This action can't be undone.
        </p>

        <AlertDialog open={open} onOpenChange={onOpenChange}>
          <AlertDialogTrigger asChild>
            <button className="mt-4 w-full h-11 rounded-xl bg-surface border border-destructive/30 text-destructive text-[13px] font-semibold inline-flex items-center justify-center gap-2 transition hover:bg-destructive/5">
              <Trash2 className="h-4 w-4" /> Delete my account
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-3xl max-w-md p-0 overflow-hidden border-border/60">
            <div className="p-6">
              <div className="h-12 w-12 rounded-2xl bg-destructive/10 text-destructive grid place-items-center">
                <AlertCircle className="h-6 w-6" />
              </div>
              <AlertDialogHeader className="mt-4 space-y-2 text-left">
                <AlertDialogTitle className="text-[20px] font-display">
                  {step === 1 ? "Are you sure?" : "One last check"}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-[13px] leading-relaxed">
                  {step === 1
                    ? "Your profile, saved providers, follows, medical info and activity will be permanently deleted. We won't be able to recover them."
                    : "Type DELETE below to confirm. This action is final and cannot be undone."}
                </AlertDialogDescription>
              </AlertDialogHeader>

              {step === 2 && (
                <div className="mt-4">
                  <input
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Type DELETE to confirm"
                    className="w-full h-11 rounded-xl bg-surface border border-border/70 px-3 text-[13px] outline-none focus:border-destructive"
                  />
                </div>
              )}

              <AlertDialogFooter className="mt-6 flex-row gap-2">
                <AlertDialogCancel className="flex-1 h-11 rounded-xl mt-0">Cancel</AlertDialogCancel>
                {step === 1 ? (
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 h-11 rounded-xl bg-destructive text-destructive-foreground text-[13px] font-semibold"
                  >
                    Continue
                  </button>
                ) : (
                  <AlertDialogAction
                    disabled={confirm !== "DELETE"}
                    className="flex-1 h-11 rounded-xl bg-destructive text-destructive-foreground disabled:opacity-50"
                  >
                    Delete my account
                  </AlertDialogAction>
                )}
              </AlertDialogFooter>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
}

/* ─────────────────────────  PROFILE  ───────────────────────── */

function Profile() {
  const [tab, setTab] = useState<"personal" | "medical" | "emergency">("personal");
  return (
    <div className="space-y-6">
      <ProfileHero />

      <div className="relative bg-muted/60 rounded-full p-1 flex">
        <span
          className="absolute top-1 bottom-1 rounded-full bg-surface shadow-card transition-all duration-300"
          style={{
            left: tab === "personal" ? 4 : tab === "medical" ? "33.6%" : "67.2%",
            width: "calc(33.3% - 4px)",
          }}
        />
        {(["personal", "medical", "emergency"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative z-10 flex-1 py-2 text-[12px] font-semibold rounded-full capitalize transition-colors ${
              tab === t ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {t === "personal" ? "Personal" : t === "medical" ? "Medical" : "Emergency"}
          </button>
        ))}
      </div>

      <div className="animate-fade-in">
        {tab === "personal" && <PersonalInfo />}
        {tab === "medical" && <MedicalInfo />}
        {tab === "emergency" && <EmergencyContact />}
      </div>
    </div>
  );
}

function ProfileHero() {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-gradient-hero border border-border/60 shadow-card p-6">
      <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
      <div className="relative flex items-center gap-4">
        <div className="relative">
          <div className="h-20 w-20 rounded-3xl bg-gradient-brand grid place-items-center text-primary-foreground text-2xl font-bold shadow-glow font-display">
            {user.firstName[0]}{user.lastName[0]}
          </div>
          <button className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-surface shadow-card grid place-items-center border border-border/60">
            <Pencil className="h-3.5 w-3.5 text-primary" />
          </button>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-foreground font-display truncate">{user.firstName} {user.lastName}</h2>
          <p className="text-[12px] text-muted-foreground">Manage your profile</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-wider bg-primary-soft text-primary px-2 py-0.5 rounded-full">
              <UserCircle2 className="h-3 w-3" /> Patient
            </span>
            <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-wider bg-[#fde7e9] text-[#a83247] px-2 py-0.5 rounded-full">
              <Droplet className="h-3 w-3" /> {user.blood}
            </span>
          </div>
        </div>
      </div>

      <div className="relative mt-5 flex gap-2">
        <button className="flex-1 h-10 rounded-full bg-gradient-brand text-primary-foreground text-[12.5px] font-semibold inline-flex items-center justify-center gap-1.5 shadow-glow">
          <Pencil className="h-3.5 w-3.5" /> Edit Profile
        </button>
        <button className="h-10 px-3 rounded-full bg-surface border border-border/60 text-foreground text-[12.5px] font-semibold inline-flex items-center justify-center gap-1.5 shadow-card">
          <Share2 className="h-3.5 w-3.5" /> Share
        </button>
        <button className="h-10 px-3 rounded-full bg-surface border border-border/60 text-foreground text-[12.5px] font-semibold inline-flex items-center justify-center gap-1.5 shadow-card">
          <Download className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, icon: Icon, type = "text" }: { label: string; value: string; icon?: any; type?: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</Label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        )}
        <Input
          type={type}
          defaultValue={value}
          className={`h-11 rounded-xl bg-surface border-border/70 shadow-sm text-[13.5px] ${Icon ? "pl-9" : ""}`}
        />
      </div>
    </div>
  );
}

function PersonalInfo() {
  return (
    <section className="space-y-5">
      <CardGroup title="Basic details">
        <div className="grid grid-cols-2 gap-3">
          <Field label="First name" value={user.firstName} />
          <Field label="Last name" value={user.lastName} />
        </div>
        <Field label="Email" value={user.email} icon={Mail} type="email" />
        <Field label="Phone" value={user.phone} icon={Phone} type="tel" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Date of birth" value={user.dob} icon={Calendar} type="date" />
          <div className="space-y-1.5">
            <Label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Gender</Label>
            <button className="w-full h-11 rounded-xl bg-surface border border-border/70 text-left px-3 text-[13.5px] flex items-center justify-between">
              {user.gender} <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Blood group</Label>
          <div className="grid grid-cols-4 gap-2">
            {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((bg) => (
              <button
                key={bg}
                className={`h-10 rounded-xl text-[12.5px] font-semibold border transition-all ${
                  bg === user.blood
                    ? "bg-primary text-primary-foreground border-primary shadow-glow"
                    : "bg-surface border-border/70 text-foreground"
                }`}
              >
                {bg}
              </button>
            ))}
          </div>
        </div>
      </CardGroup>

      <CardGroup title="Address" subtitle="Select an address from suggestions to auto-fill city, state, pincode and coordinates.">
        <div className="relative">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your address..."
            className="h-12 rounded-xl bg-surface border-border/70 pl-9 text-[13.5px]"
          />
        </div>
        <Field label="Address" value={user.address} icon={Home} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="City" value={user.city} />
          <Field label="State" value={user.state} />
        </div>
        <Field label="Pincode" value={user.pincode} />
        <Button className="w-full h-11 rounded-xl bg-gradient-brand shadow-glow font-semibold mt-1">Save Changes</Button>
      </CardGroup>
    </section>
  );
}

function CardGroup({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-surface border border-border/60 shadow-card p-5 space-y-4">
      <div>
        <h3 className="text-[15px] font-bold text-foreground font-display">{title}</h3>
        {subtitle && <p className="text-[11.5px] text-muted-foreground mt-1 leading-relaxed">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function MedicalInfo() {
  const allergies = ["Penicillin", "Dust mites"];
  const conditions = ["Mild Asthma"];
  const meds = [{ name: "Cetirizine", dose: "10mg · Once daily" }];

  return (
    <section className="space-y-5">
      <NoticeCard
        icon={Info}
        title="Keep this updated"
        body="Keep your medical information up to date. This helps doctors provide better care during emergencies."
      />

      <CardGroup title="Known allergies">
        <ChipList items={allergies} tint="bg-[#fff1e6] text-[#a85a1f]" />
      </CardGroup>

      <CardGroup title="Chronic conditions">
        <ChipList items={conditions} tint="bg-primary-soft text-primary" />
      </CardGroup>

      <CardGroup title="Current medications">
        <div className="space-y-2">
          {meds.map((m) => (
            <div key={m.name} className="flex items-center gap-3 rounded-xl bg-muted/50 p-3 border border-border/40">
              <span className="h-9 w-9 grid place-items-center rounded-xl bg-surface text-primary border border-border/60">
                <Plus className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <p className="text-[13.5px] font-semibold text-foreground">{m.name}</p>
                <p className="text-[11.5px] text-muted-foreground">{m.dose}</p>
              </div>
            </div>
          ))}
          <button className="w-full h-11 rounded-xl border border-dashed border-primary/40 bg-primary-soft/40 text-primary text-[12.5px] font-semibold inline-flex items-center justify-center gap-1.5">
            <Plus className="h-4 w-4" /> Add medication
          </button>
        </div>
      </CardGroup>
    </section>
  );
}

function ChipList({ items, tint }: { items: string[]; tint: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <span key={it} className={`text-[12px] font-semibold px-3 py-1.5 rounded-full ${tint}`}>{it}</span>
      ))}
      <button className="text-[12px] font-semibold px-3 py-1.5 rounded-full border border-dashed border-border text-muted-foreground inline-flex items-center gap-1">
        <Plus className="h-3 w-3" /> Add
      </button>
    </div>
  );
}

function NoticeCard({ icon: Icon, title, body }: { icon: any; title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-primary-soft/60 border border-primary/15 p-4 flex gap-3">
      <span className="h-10 w-10 grid place-items-center rounded-xl bg-surface text-primary shadow-card shrink-0">
        <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
      </span>
      <div>
        <p className="text-[13px] font-semibold text-foreground">{title}</p>
        <p className="text-[12px] text-muted-foreground leading-relaxed mt-0.5">{body}</p>
      </div>
    </div>
  );
}

function EmergencyContact() {
  return (
    <section className="space-y-5">
      <NoticeCard
        icon={AlertCircle}
        title="Emergency contact"
        body="This person will be contacted during medical emergencies. Keep their details current."
      />
      <CardGroup title="Primary contact">
        <Field label="Contact name" value="Priya Sharma" />
        <Field label="Contact phone" value="+91 99887 66554" icon={Phone} type="tel" />
        <div className="space-y-1.5">
          <Label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Relationship</Label>
          <div className="grid grid-cols-3 gap-2">
            {["Spouse", "Parent", "Sibling", "Friend", "Child", "Other"].map((r, i) => (
              <button
                key={r}
                className={`h-10 rounded-xl text-[12px] font-semibold border transition-all ${
                  i === 0
                    ? "bg-primary text-primary-foreground border-primary shadow-glow"
                    : "bg-surface border-border/70 text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <Button className="w-full h-11 rounded-xl bg-gradient-brand shadow-glow font-semibold mt-1">Save contact</Button>
      </CardGroup>
    </section>
  );
}
