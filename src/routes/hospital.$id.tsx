import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Bone,
  Bookmark,
  Brain,
  Building2,
  ChevronRight,
  Facebook,
  Globe,
  HeartPulse,
  Instagram,
  Linkedin,
  MapPin,
  MessageCircle,
  Microscope,
  Navigation,
  Phone,
  Scissors,
  Send,
  Share2,
  Shield,
  ShieldCheck,
  ShieldPlus,
  Sparkles,
  Star,
  Stethoscope,
  Users,
  Youtube,
  Clock3,
} from "lucide-react";
import { getHospital } from "@/lib/hospitals";
import { ReachOutDialog } from "@/components/ReachOutDialog";

export const Route = createFileRoute("/hospital/$id")({
  loader: ({ params }) => {
    const h = getHospital(params.id);
    if (!h) throw notFound();
    return { hospital: h };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.hospital.name} — DocLinks` },
          {
            name: "description",
            content: `Verified hospital profile, services, doctors and contact for ${loaderData.hospital.name}.`,
          },
        ]
      : [],
  }),
  component: HospitalDetail,
  notFoundComponent: () => (
    <div className="p-10 text-center text-sm text-muted-foreground">
      Hospital not found.
    </div>
  ),
});

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Cardiology: HeartPulse,
  "Cardiac Surgery": HeartPulse,
  Orthopedic: Bone,
  Neurology: Brain,
  Neurosurgery: Brain,
  Oncology: ShieldPlus,
  "Cancer Care": ShieldPlus,
  Dermatology: Sparkles,
  Pediatrics: Stethoscope,
  Gynecology: Stethoscope,
  IVF: Stethoscope,
  Pathology: Microscope,
  Radiology: Microscope,
  ENT: Stethoscope,
  "Bariatric Surgery": Scissors,
  "Organ Transplant": Scissors,
  "Cataract Surgery": Sparkles,
  LASIK: Sparkles,
  "Retina Treatment": Sparkles,
  "Cornea Care": Sparkles,
};

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function HospitalDetail() {
  const { hospital } = Route.useLoaderData() as { hospital: import("@/lib/hospitals").Hospital };
  const [reachOpen, setReachOpen] = useState(false);


  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-72 w-full overflow-hidden">
          <img
            src={hospital.cover}
            alt={hospital.name}
            width={1024}
            height={768}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/35 via-foreground/10 to-background" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-[max(env(safe-area-inset-top),12px)]">
            <Link
              to="/hospitals"
              className="h-10 w-10 grid place-items-center rounded-full bg-surface/90 backdrop-blur shadow-card text-foreground"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2">
              <button className="h-10 w-10 grid place-items-center rounded-full bg-surface/90 backdrop-blur shadow-card text-foreground" aria-label="Save">
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Floating hero card */}
        <div className="-mt-20 px-5 relative z-10">
          <div className="bg-surface rounded-3xl border border-border/60 shadow-float p-5">
            <div className="flex items-start gap-2 flex-wrap">
              {hospital.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft text-primary px-2.5 py-1 text-[10.5px] font-semibold">
                  <BadgeCheck className="h-3 w-3" /> Verified by DocLinks
                </span>
              )}
              {hospital.accreditations.map((a) => (
                <span
                  key={a}
                  className="inline-flex items-center gap-1 rounded-full bg-foreground text-background px-2.5 py-1 text-[10.5px] font-semibold"
                >
                  <ShieldCheck className="h-3 w-3" /> {a}
                </span>
              ))}
            </div>

            <div className="mt-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="text-[22px] leading-tight font-display font-bold text-foreground">
                  {hospital.name}
                </h1>
                <p className="text-[12.5px] text-muted-foreground mt-0.5">
                  {hospital.type} · {hospital.category}
                </p>
              </div>
              <button
                aria-label="Share"
                className="h-10 w-10 grid place-items-center rounded-full bg-surface border border-border/60 shadow-card text-foreground shrink-0"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>


            <div className="mt-2 flex items-start gap-1.5 text-[12.5px] text-foreground">
              <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span>{hospital.address}</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  hospital.openNow
                    ? "bg-success/10 text-success"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-soft" />
                {hospital.openNow ? "Open now" : "Closed"}
              </span>
              {hospital.emergency && (
                <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 text-destructive px-2.5 py-1 text-[11px] font-semibold">
                  <HeartPulse className="h-3 w-3" /> 24×7 Emergency
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-full bg-muted text-foreground px-2.5 py-1 text-[11px] font-semibold">
                <Star className="h-3 w-3 fill-warning text-warning" />
                {hospital.stats.rating} · {hospital.stats.followers} followers
              </span>
            </div>

            {/* Stat strip */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              <HeroStat icon={<Stethoscope className="h-3.5 w-3.5" />} value={`${hospital.stats.doctors}+`} label="Doctors" />
              <HeroStat icon={<Shield className="h-3.5 w-3.5" />} value={`${hospital.stats.experience}y`} label="Trusted" />
              <HeroStat icon={<Users className="h-3.5 w-3.5" />} value={hospital.stats.followers} label="Followers" />
              <HeroStat icon={<Star className="h-3.5 w-3.5" />} value={`${hospital.stats.rating}`} label="Rating" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <Section title="Services" subtitle={`${hospital.services.length} specialties offered`}>
        <div className="grid grid-cols-3 gap-2.5">
          {hospital.services.slice(0, 9).map((s) => {
            const Icon = SERVICE_ICONS[s] ?? Stethoscope;
            return (
              <div
                key={s}
                className="rounded-2xl border border-border/60 bg-gradient-to-b from-primary-soft/60 to-surface p-3 flex flex-col items-center text-center shadow-card"
              >
                <span className="h-9 w-9 grid place-items-center rounded-xl bg-surface text-primary border border-border/60 shadow-card">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="mt-2 text-[11px] font-semibold text-foreground leading-tight">
                  {s}
                </p>
              </div>
            );
          })}
        </div>
        {hospital.services.length > 9 && (
          <button className="mt-3 w-full inline-flex items-center justify-center gap-1 rounded-2xl bg-surface border border-border/60 py-2.5 text-[12.5px] font-semibold text-foreground">
            View all {hospital.services.length} services <ChevronRight className="h-3.5 w-3.5" />
          </button>
        )}
      </Section>

      {/* About */}
      <Section title="About the hospital">
        <p className="text-[13px] leading-[1.65] text-foreground/85">
          {hospital.about}
        </p>
        <button className="mt-2 text-[12.5px] font-semibold text-primary inline-flex items-center gap-1">
          Read more <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </Section>

      {/* Doctors */}
      <Section
        title="Our doctors"
        subtitle={`${hospital.doctors.length} verified specialists`}
        action="View all"
      >
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5">
          {hospital.doctors.map((d) => (
            <Link
              key={d.id}
              to="/doctor/$id"
              params={{ id: d.id }}
              className="shrink-0 w-[156px] bg-surface border border-border/60 rounded-2xl p-3 shadow-card hover:shadow-float transition-shadow"
            >
              <div className="relative">
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  width={300}
                  height={300}
                  className="h-[120px] w-full object-cover rounded-xl"
                />
                <span className="absolute -bottom-1.5 -right-1.5 h-6 w-6 grid place-items-center rounded-full bg-surface shadow-card">
                  <BadgeCheck className="h-4 w-4 text-primary" />
                </span>
              </div>
              <p className="mt-2.5 text-[12.5px] font-display font-semibold text-foreground truncate">
                {d.name}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                {d.specialty}
              </p>
              <p className="mt-1 text-[10.5px] text-primary font-semibold">
                {d.experience}+ yrs exp.
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Working hours */}
      <Section title="Working hours" subtitle={hospital.openNow ? "Open now · 24×7 Emergency" : "Currently closed"}>
        <div className="rounded-2xl bg-surface border border-border/60 shadow-card divide-y divide-border/50">
          {WEEK.map((day, i) => {
            const isToday = new Date().getDay() === (i + 1) % 7;
            return (
              <div
                key={day}
                className={`flex items-center justify-between px-4 py-3 ${
                  isToday ? "bg-primary-soft/50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  <p className={`text-[12.5px] ${isToday ? "font-bold text-primary" : "font-semibold text-foreground"}`}>
                    {day}
                    {isToday && <span className="ml-1.5 text-[10px] uppercase tracking-wider">Today</span>}
                  </p>
                </div>
                <p className="text-[12px] font-medium text-muted-foreground inline-flex items-center gap-1.5">
                  <Clock3 className="h-3 w-3" /> 24 hours
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Gallery */}
      <Section title="Gallery" subtitle="Interiors, OTs and waiting areas">
        <div className="grid grid-cols-3 gap-2">
          {hospital.gallery.map((g, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-2xl border border-border/60 shadow-card ${
                i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
              }`}
            >
              <img
                src={g}
                alt={`${hospital.name} gallery ${i + 1}`}
                loading="lazy"
                width={1024}
                height={768}
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Connect */}
      <Section title="Connect with us">
        <div className="flex flex-wrap gap-2">
          {hospital.socials?.instagram && (
            <SocialChip icon={<Instagram className="h-3.5 w-3.5" />} label="Instagram" />
          )}
          {hospital.socials?.facebook && (
            <SocialChip icon={<Facebook className="h-3.5 w-3.5" />} label="Facebook" />
          )}
          {hospital.socials?.linkedin && (
            <SocialChip icon={<Linkedin className="h-3.5 w-3.5" />} label="LinkedIn" />
          )}
          {hospital.socials?.youtube && (
            <SocialChip icon={<Youtube className="h-3.5 w-3.5" />} label="YouTube" />
          )}
          {hospital.socials?.website && (
            <SocialChip icon={<Globe className="h-3.5 w-3.5" />} label="Website" />
          )}
        </div>
      </Section>

      {/* Location card */}
      <Section title="Location & directions">
        <div className="rounded-2xl bg-surface border border-border/60 shadow-card overflow-hidden">
          <div className="relative h-32 bg-gradient-hero">
            <div className="absolute inset-0 grid place-items-center">
              <span className="h-10 w-10 grid place-items-center rounded-full bg-surface shadow-float text-primary">
                <Building2 className="h-5 w-5" />
              </span>
            </div>
          </div>
          <div className="p-4">
            <p className="text-[13px] font-semibold text-foreground">{hospital.name}</p>
            <p className="text-[12px] text-muted-foreground mt-0.5">{hospital.address}</p>
            <button className="mt-3 w-full inline-flex items-center justify-center gap-1.5 h-10 rounded-2xl bg-foreground text-background text-[12.5px] font-semibold">
              <Navigation className="h-3.5 w-3.5" /> Get directions
            </button>
          </div>
        </div>
      </Section>

      {/* Sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30">
        <div className="max-w-md mx-auto px-4 pb-[max(env(safe-area-inset-bottom),14px)] pt-3">
          <div className="glass-strong rounded-2xl border border-border/60 shadow-float p-2 flex items-center gap-2">
            <button
              aria-label="Call Now"
              className="h-11 w-11 grid place-items-center rounded-xl bg-primary-soft text-primary border border-primary/20"
            >
              <Phone className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setReachOpen(true)}
              className="flex-1 h-11 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-brand text-primary-foreground text-[13px] font-semibold shadow-glow"
            >
              <Send className="h-4 w-4" /> Direct Enquiry
            </button>
            <button
              aria-label="WhatsApp"
              className="h-11 w-11 grid place-items-center rounded-xl bg-success text-success-foreground"
            >
              <MessageCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <ReachOutDialog
        open={reachOpen}
        onOpenChange={setReachOpen}
        recipient={hospital.name}
      />
    </div>
  );
}


function Section({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 px-5">
      <div className="flex items-end justify-between mb-3">
        <div>
          <h2 className="text-[16px] font-display font-bold text-foreground">{title}</h2>
          {subtitle && (
            <p className="text-[11.5px] text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        {action && (
          <button className="text-[12px] font-semibold text-primary inline-flex items-center gap-0.5">
            {action} <ChevronRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

function HeroStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl bg-muted/60 px-2 py-2.5 text-center">
      <div className="flex items-center justify-center gap-1 text-primary">
        {icon}
        <p className="text-[12.5px] font-display font-bold text-foreground leading-none">
          {value}
        </p>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function SocialChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="inline-flex items-center gap-1.5 rounded-full bg-surface border border-border/60 px-3 py-1.5 text-[12px] font-semibold text-foreground shadow-card">
      <span className="text-foreground">{icon}</span>
      {label}
    </button>
  );
}
