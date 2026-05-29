import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Bookmark,
  ChevronRight,
  Clock,
  Facebook,
  Globe,
  HeartPulse,
  Home,
  Instagram,
  Linkedin,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Pill,
  Plus,
  Scissors,
  Share2,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Users,
} from "lucide-react";
import { clinics, getClinic } from "@/lib/clinics";
import { ReachOutDialog } from "@/components/ReachOutDialog";

export const Route = createFileRoute("/clinic/$id")({
  loader: ({ params }) => {
    const c = getClinic(params.id);
    if (!c) throw notFound();
    return { clinic: c };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.clinic.name} — DocLinks` },
          {
            name: "description",
            content: `Verified clinic profile, services and doctors at ${loaderData.clinic.name}.`,
          },
        ]
      : [],
  }),
  component: ClinicDetail,
  notFoundComponent: () => (
    <div className="p-10 text-center text-sm text-muted-foreground">Clinic not found.</div>
  ),
});

const SERVICE_ICONS = [Stethoscope, Pill, Syringe, Scissors, HeartPulse, ShieldCheck];

function ClinicDetail() {
  const { clinic } = Route.useLoaderData();
  const [reachOpen, setReachOpen] = useState(false);
  const [followed, setFollowed] = useState(false);

  const similar = clinics.filter((c) => c.id !== clinic.id);

  return (
    <div className="pb-28">
      {/* HERO */}
      <section className="relative">
        <div className="relative h-[280px] w-full overflow-hidden">
          <img
            src={clinic.image}
            alt={clinic.name}
            className="h-full w-full object-cover"
            width={1024}
            height={768}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-background" />
          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-3">
            <Link
              to="/clinics"
              className="h-10 w-10 grid place-items-center rounded-full bg-surface/95 backdrop-blur shadow-card"
            >
              <ArrowLeft className="h-4 w-4 text-foreground" />
            </Link>
            <div className="flex items-center gap-2">
              <button className="h-10 w-10 grid place-items-center rounded-full bg-surface/95 backdrop-blur shadow-card">
                <Share2 className="h-4 w-4 text-foreground" />
              </button>
              <button className="h-10 w-10 grid place-items-center rounded-full bg-surface/95 backdrop-blur shadow-card">
                <Bookmark className="h-4 w-4 text-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Floating profile card */}
        <div className="px-5 -mt-16 relative">
          <div className="rounded-3xl bg-surface border border-border/50 shadow-float p-4">
            <div className="flex items-start gap-3">
              <div className="relative h-16 w-16 shrink-0">
                <img
                  src={clinic.image}
                  alt=""
                  className="h-full w-full rounded-2xl object-cover border border-border/40"
                />
                {clinic.verified && (
                  <span className="absolute -bottom-1.5 -right-1.5 h-6 w-6 grid place-items-center rounded-full bg-surface border border-border/40 shadow-card">
                    <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="font-display font-extrabold text-[18px] text-foreground tracking-tight leading-tight uppercase">
                  {clinic.name}
                </h1>
                <p className="text-[12px] text-muted-foreground mt-0.5 line-clamp-1">
                  {clinic.specialties.join(" · ")}
                </p>
                <div className="mt-1.5 flex items-center gap-1.5 text-[11.5px]">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${
                      clinic.openNow ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {clinic.openNow ? "Open now" : "Closed"}
                  </span>
                  <span className="text-muted-foreground inline-flex items-center gap-1">
                    <Users className="h-3 w-3" /> {clinic.followers} Followers
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-start gap-1.5 text-[12px] text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary mt-[2px] shrink-0" />
              <span className="leading-snug">{clinic.address}</span>
            </div>

            {/* CTAs */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              <a
                href="tel:+919999999999"
                className="col-span-2 h-11 inline-flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-brand text-primary-foreground text-[13px] font-bold shadow-glow"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
              <button
                onClick={() => setReachOpen(true)}
                className="h-11 grid place-items-center rounded-2xl bg-success text-success-foreground shadow-card"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </button>
              <button
                onClick={() => setFollowed((v) => !v)}
                className={`h-11 grid place-items-center rounded-2xl border ${
                  followed
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-surface text-foreground border-border/60"
                }`}
                aria-label="Follow"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST CHIPS */}
      <section className="mt-5 px-5">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          <TrustChip Icon={BadgeCheck} label="Verified" />
          {clinic.homeCollection && <TrustChip Icon={Home} label="Home Collection" />}
          {clinic.emergency && <TrustChip Icon={HeartPulse} label="Emergency" />}
          {clinic.consultationAvailable && (
            <TrustChip Icon={Stethoscope} label="Consultation" />
          )}
          <TrustChip Icon={ShieldCheck} label="Trusted" />
        </div>
      </section>

      {/* SERVICES */}
      <Section title="Services" subtitle="Care offered at this clinic">
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
          {clinic.services.map((s, i) => {
            const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
            return (
              <div
                key={s}
                className="shrink-0 w-[140px] rounded-2xl bg-surface border border-border/50 shadow-card p-3"
              >
                <span className="h-9 w-9 grid place-items-center rounded-xl bg-primary-soft border border-primary/15">
                  <Icon className="h-4 w-4 text-primary" />
                </span>
                <p className="mt-2.5 text-[12.5px] font-semibold text-foreground leading-tight">
                  {s}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ABOUT */}
      <Section title="About">
        <AboutBlock text={clinic.about} />
      </Section>

      {/* DOCTORS */}
      <Section title="Doctors at this clinic" subtitle={`${clinic.doctors.length} verified specialists`}>
        <div className="flex flex-col gap-2.5">
          {clinic.doctors.map((d) => (
            <Link
              key={d.id}
              to="/doctor/$id"
              params={{ id: d.id }}
              className="flex items-center gap-3 p-3 rounded-2xl bg-surface border border-border/50 shadow-card active:scale-[0.99] transition"
            >
              <div className="relative h-14 w-14 shrink-0">
                <img
                  src={d.image}
                  alt={d.name}
                  className="h-full w-full rounded-2xl object-cover border border-border/40"
                />
                {d.verified && (
                  <span className="absolute -bottom-1 -right-1 h-5 w-5 grid place-items-center rounded-full bg-surface border border-border/40 shadow-card">
                    <BadgeCheck className="h-3 w-3 text-primary" />
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-[14px] text-foreground truncate">
                  {d.name}
                </p>
                <p className="text-[11.5px] text-muted-foreground">{d.specialty}</p>
                <p className="text-[10.5px] text-muted-foreground mt-0.5">
                  {d.experience} yrs experience
                </p>
              </div>
              <span className="h-9 w-9 grid place-items-center rounded-full bg-primary-soft text-primary border border-primary/15">
                <Phone className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* GALLERY */}
      <Section title="Gallery" subtitle="Inside the clinic">
        <div className="grid grid-cols-3 gap-2">
          {clinic.gallery.slice(0, 6).map((g, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl border border-border/40 ${
                i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
              }`}
            >
              <img
                src={g}
                alt={`Clinic ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* HOURS */}
      <Section title="Working hours">
        <div className="rounded-2xl bg-surface border border-border/50 shadow-card overflow-hidden">
          {clinic.hours.map((h, i) => (
            <div
              key={h.day}
              className={`flex items-center justify-between px-4 py-2.5 text-[12.5px] ${
                i !== clinic.hours.length - 1 ? "border-b border-border/40" : ""
              }`}
            >
              <div className="inline-flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span className="font-semibold text-foreground">{h.day}</span>
              </div>
              <span className={h.closed ? "text-muted-foreground" : "text-foreground"}>
                {h.hours}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* SIMILAR */}
      <Section title="Similar clinics near you" subtitle="Hand-picked for you">
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
          {similar.map((c) => (
            <Link
              key={c.id}
              to="/clinic/$id"
              params={{ id: c.id }}
              className="shrink-0 w-[220px] rounded-2xl bg-surface border border-border/50 shadow-card overflow-hidden"
            >
              <div className="relative h-24 w-full">
                <img src={c.image} alt="" className="h-full w-full object-cover" />
                {c.verified && (
                  <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-surface/95 px-1.5 py-0.5 text-[9.5px] font-semibold text-primary shadow-card">
                    <BadgeCheck className="h-3 w-3" /> Verified
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="font-display font-bold text-[13px] text-foreground truncate">
                  {c.name}
                </p>
                <p className="text-[11px] text-muted-foreground line-clamp-1">
                  {c.specialties.slice(0, 2).join(" · ")}
                </p>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="text-[10.5px] text-muted-foreground inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-primary" /> {c.area}
                  </span>
                  <span className="h-7 w-7 grid place-items-center rounded-full bg-primary-soft text-primary border border-primary/15">
                    <Phone className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* CONNECT */}
      {clinic.socials && (
        <Section title="Connect with us">
          <div className="flex gap-2.5">
            {clinic.socials.instagram && <SocialIcon Icon={Instagram} />}
            {clinic.socials.facebook && <SocialIcon Icon={Facebook} />}
            {clinic.socials.linkedin && <SocialIcon Icon={Linkedin} />}
            {clinic.socials.website && <SocialIcon Icon={Globe} />}
          </div>
        </Section>
      )}

      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-20 inset-x-0 z-40 px-5">
        <div className="rounded-2xl bg-surface/90 backdrop-blur-xl border border-border/60 shadow-float p-2 flex items-center gap-2">
          <a
            href="tel:+919999999999"
            className="flex-1 h-11 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-brand text-primary-foreground text-[13px] font-bold shadow-glow"
          >
            <Phone className="h-4 w-4" /> Call
          </a>
          <button
            onClick={() => setReachOpen(true)}
            className="flex-1 h-11 inline-flex items-center justify-center gap-1.5 rounded-xl bg-success text-success-foreground text-[13px] font-bold shadow-card"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </button>
          <button className="h-11 w-11 grid place-items-center rounded-xl bg-muted text-foreground border border-border/60">
            <Navigation className="h-4 w-4" />
          </button>
        </div>
      </div>

      <ReachOutDialog
        open={reachOpen}
        onOpenChange={setReachOpen}
        recipientName={clinic.name}
      />
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 px-5">
      <div className="flex items-end justify-between mb-3 gap-3">
        <div className="min-w-0">
          <h2 className="text-[15.5px] font-display font-bold text-foreground tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[11.5px] text-muted-foreground leading-snug">{subtitle}</p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

function TrustChip({
  Icon,
  label,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="shrink-0 inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-surface border border-border/50 shadow-card text-[11.5px] font-semibold text-foreground">
      <Icon className="h-3.5 w-3.5 text-primary" />
      {label}
    </div>
  );
}

function AboutBlock({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const isLong = text.length > 180;
  return (
    <div className="rounded-2xl bg-surface border border-border/50 shadow-card p-4">
      <p
        className={`text-[13px] leading-relaxed text-muted-foreground ${
          open || !isLong ? "" : "line-clamp-3"
        }`}
      >
        {text}
      </p>
      {isLong && (
        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-primary"
        >
          {open ? "Show less" : "Read more"}
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function SocialIcon({ Icon }: { Icon: React.ComponentType<{ className?: string }> }) {
  return (
    <button className="h-10 w-10 grid place-items-center rounded-2xl bg-surface border border-border/60 shadow-card text-foreground hover:bg-muted transition">
      <Icon className="h-4 w-4" />
    </button>
  );
}
