import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  Bookmark,
  Calendar,
  Camera,
  Car,
  ChevronRight,
  Clock,
  Facebook,
  Globe,
  Globe2,
  Heart,
  Instagram,
  Linkedin,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Train,
  TrendingUp,
  Users,
  Wallet,
  Youtube,
} from "lucide-react";
import { doctors, formatFee, formatFeeLong, getDoctor, type DaySchedule } from "@/lib/doctors";
import { InquiryDialog } from "@/components/InquiryDialog";
import clinicImg from "@/assets/clinic-1.jpg";
import hospital1 from "@/assets/hospital-1.jpg";
import hospital2 from "@/assets/hospital-2.jpg";
import hospital3 from "@/assets/hospital-3.jpg";
import hospital4 from "@/assets/hospital-4.jpg";
import labHero from "@/assets/lab-hero.jpg";

export const Route = createFileRoute("/doctor/$id")({
  loader: ({ params }) => {
    const doctor = getDoctor(params.id);
    if (!doctor) throw notFound();
    return { doctor };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.doctor.name} — ${loaderData.doctor.specialty} | DocLinks` },
          {
            name: "description",
            content: `${loaderData.doctor.name}, ${loaderData.doctor.subSpecialty}. ${loaderData.doctor.experience}+ years experience at ${loaderData.doctor.clinic}, ${loaderData.doctor.city}. Verified by DocLinks.`,
          },
        ]
      : [],
  }),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen grid place-items-center p-6 text-center">
        <div>
          <h1 className="font-display text-lg font-semibold">Couldn't load doctor</h1>
          <p className="text-sm text-muted-foreground mt-1">{error.message}</p>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="mt-4 rounded-full bg-foreground text-background px-4 py-2 text-sm font-semibold"
          >
            Try again
          </button>
        </div>
      </div>
    );
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center p-6 text-center">
      <div>
        <h1 className="font-display text-lg font-semibold">Doctor not found</h1>
        <Link to="/find-doctors" className="mt-3 inline-block text-primary font-semibold text-sm">
          Back to doctors
        </Link>
      </div>
    </div>
  ),
  component: DoctorDetail,
});

const SOCIAL_DEFS = [
  { key: "instagram", label: "Instagram", icon: Instagram },
  { key: "facebook", label: "Facebook", icon: Facebook },
  { key: "youtube", label: "YouTube", icon: Youtube },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
  { key: "website", label: "Website", icon: Globe },
] as const;

const GALLERY: { src: string; label: string; tall?: boolean }[] = [];

function DoctorDetail() {
  const { doctor } = Route.useLoaderData();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const similar = doctors.filter((d) => d.id !== doctor.id);
  const hasFee = typeof doctor.fee === "number";

  const gallery = [
    { src: clinicImg, label: "Clinic", tall: true },
    { src: hospital1, label: "Reception" },
    { src: hospital2, label: "Consultation Room" },
    { src: hospital3, label: "Doctor at Work", tall: true },
    { src: labHero, label: "Equipment" },
    { src: hospital4, label: "Waiting Area" },
  ];


  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Hero — extends behind safe area, header floats on top */}
      <section className="relative bg-gradient-hero pt-[max(env(safe-area-inset-top),0px)]">
        {/* Floating header — no white strip */}
        <header className="relative z-40 flex items-center justify-between px-4 pt-3 pb-2">
          <Link
            to="/find-doctors"
            className="h-10 w-10 grid place-items-center rounded-full bg-surface/85 backdrop-blur shadow-card border border-border/40"
            aria-label="Back"
          >
            <ArrowLeft className="h-[18px] w-[18px]" />
          </Link>
          <div className="flex items-center gap-2">
            <button
              aria-label="Share"
              className="h-10 w-10 grid place-items-center rounded-full bg-surface/85 backdrop-blur shadow-card border border-border/40"
            >
              <Share2 className="h-[18px] w-[18px]" />
            </button>
            <button
              aria-label="Save"
              className="h-10 w-10 grid place-items-center rounded-full bg-surface/85 backdrop-blur shadow-card border border-border/40"
            >
              <Bookmark className="h-[18px] w-[18px]" />
            </button>
          </div>
        </header>

        <div className="px-5 pt-2 pb-6">
          {/* Top label row */}
          <div className="flex items-center gap-2">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-primary">
              {doctor.specialty}
            </span>
            <span className="h-1 w-1 rounded-full bg-primary/40" />
            <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-foreground bg-surface/80 backdrop-blur border border-border/50 px-2 py-0.5 rounded-full">
              <BadgeCheck className="h-3 w-3 text-primary" /> Verified Doctor
            </span>
          </div>

          {/* Identity */}
          <div className="mt-3 flex gap-4">
            <div className="relative shrink-0">
              <div className="p-[3px] rounded-[22px] bg-gradient-to-br from-surface via-primary-soft to-background shadow-card">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  width={128}
                  height={128}
                  className="h-32 w-32 rounded-[18px] object-cover ring-1 ring-border/60"
                />
              </div>
              {doctor.verified && (
                <span className="absolute -bottom-1.5 -right-1.5 h-8 w-8 grid place-items-center rounded-full bg-surface shadow-card ring-2 ring-background">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0 pt-1">
              <h1 className="font-display text-[24px] leading-tight font-bold text-foreground text-balance">
                {doctor.name}
              </h1>
              <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                {doctor.subSpecialty}
              </p>
              <p className="mt-2 text-[12.5px] text-foreground/85 font-medium flex items-start gap-1.5">
                <MapPin className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
                <span className="truncate">
                  {doctor.clinic} · {doctor.location}
                </span>
              </p>
              <p className="mt-1 text-[11.5px] text-muted-foreground flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                {doctor.availableToday ? (
                  <>
                    <span className="text-success font-semibold">Available today</span>
                    <span>· {doctor.nextSlot}</span>
                  </>
                ) : (
                  <>Next: {doctor.nextSlot}</>
                )}
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {doctor.badges.map((b: string) => (
              <TrustBadge key={b}>{b}</TrustBadge>
            ))}
            <TrustBadge primary>Top Rated in {doctor.city}</TrustBadge>
          </div>

          {/* Floating stats */}
          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <StatCard
              icon={<Star className="h-4 w-4" />}
              value={`${doctor.rating}`}
              hint={`${doctor.reviews} reviews`}
              label="Rating"
            />
            <StatCard
              icon={<Award className="h-4 w-4" />}
              value={`${doctor.experience}+`}
              hint="years practising"
              label="Experience"
            />
            <StatCard
              icon={<Users className="h-4 w-4" />}
              value={doctor.followers}
              hint={`${doctor.recommendation}% recommend`}
              label="Followers"
            />
            <StatCard
              icon={<Wallet className="h-4 w-4" />}
              value={hasFee ? formatFee(doctor.fee) : "On call"}
              hint={hasFee ? "Consultation" : formatFeeLong(doctor.fee)}
              label="Fee"
            />
          </div>

          {/* CTA row */}
          <div className="mt-5 flex gap-2">
            <button className="flex-1 h-13 py-3.5 rounded-2xl bg-gradient-brand text-primary-foreground font-semibold text-[14px] shadow-glow inline-flex items-center justify-center gap-2">
              <Phone className="h-4 w-4" /> Call Now
            </button>
            <button className="h-13 py-3.5 px-4 rounded-2xl bg-success text-success-foreground font-semibold text-[13px] inline-flex items-center gap-1.5 shadow-card">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </button>
            <button
              aria-label="Save"
              className="h-13 py-3.5 w-13 px-3 grid place-items-center rounded-2xl bg-surface border border-border/60 shadow-card"
            >
              <Heart className="h-[18px] w-[18px] text-foreground" />
            </button>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="px-5 mt-5">
        <Card>
          <CardHeader title="About the doctor" />
          <p className="text-[13px] leading-relaxed text-foreground/85">
            {doctor.name} is a {doctor.specialty.toLowerCase()} with{" "}
            {doctor.experience}+ years of experience treating complex cases at{" "}
            {doctor.clinic}. Known for a patient-first approach, evidence-based
            care, and a calm bedside manner.
          </p>
          <button className="mt-2 text-[12px] font-semibold text-primary inline-flex items-center gap-1">
            Read more <ChevronRight className="h-3 w-3" />
          </button>
          <div className="mt-3 grid grid-cols-2 gap-3 text-[12px]">
            <Meta
              label="Languages"
              value={doctor.languages.join(", ")}
              icon={<Globe2 className="h-3.5 w-3.5" />}
            />
            <Meta label="Gender" value={doctor.gender} />
            <Meta
              label="Recommend"
              value={`${doctor.recommendation}%`}
              icon={<TrendingUp className="h-3.5 w-3.5" />}
            />
            <Meta
              label="Consultation"
              value={formatFeeLong(doctor.fee)}
              icon={<Wallet className="h-3.5 w-3.5" />}
            />
          </div>
        </Card>
      </section>

      {/* Treatments */}
      <section className="mt-4">
        <div className="px-5 mb-2 flex items-center justify-between">
          <h2 className="text-[15px] font-display font-bold text-foreground">
            Treatments & Specializations
          </h2>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-5">
          {doctor.treatments.map((t: string) => (
            <span
              key={t}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-surface border border-border/60 px-3.5 py-2 text-[12px] font-semibold shadow-card"
            >
              <Sparkles className="h-3 w-3 text-primary" /> {t}
            </span>
          ))}
        </div>
      </section>

      {/* Clinic */}
      <section className="px-5 mt-4">
        <Card padded={false}>
          <img
            src={clinicImg}
            alt={doctor.clinic}
            className="w-full h-36 object-cover"
            loading="lazy"
          />
          <div className="p-4">
            <p className="text-[10.5px] font-semibold text-primary uppercase tracking-wide">
              Clinic
            </p>
            <h3 className="text-[15px] font-display font-bold text-foreground">
              {doctor.clinic}
            </h3>
            <p className="text-[12px] text-muted-foreground">
              {doctor.location}, {doctor.city}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Chip icon={<Car className="h-3 w-3" />}>Parking</Chip>
              <Chip icon={<Train className="h-3 w-3" />}>Metro nearby</Chip>
              <Chip>Wheelchair access</Chip>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 h-10 rounded-xl bg-foreground text-background text-[12.5px] font-semibold inline-flex items-center justify-center gap-1.5">
                <Navigation className="h-3.5 w-3.5" /> Get Directions
              </button>
              <button className="flex-1 h-10 rounded-xl bg-surface border border-border text-[12.5px] font-semibold inline-flex items-center justify-center gap-1.5">
                <Phone className="h-3.5 w-3.5" /> Call Clinic
              </button>
            </div>
          </div>
        </Card>
      </section>

      {/* Working hours — redesigned */}
      <section className="px-5 mt-4">
        <WorkingHours hours={doctor.hours} nextSlot={doctor.nextSlot} />
      </section>

      {/* Connect with me */}
      <section className="px-5 mt-4">
        <ConnectWithMe socials={doctor.socials ?? {}} />
      </section>

      {/* Similar */}
      <section className="mt-5">
        <div className="px-5 mb-3 flex items-center justify-between">
          <h2 className="text-[15px] font-display font-bold text-foreground">
            Similar doctors
          </h2>
          <Link
            to="/find-doctors"
            className="text-[12px] font-semibold text-primary"
          >
            See all
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-2">
          {similar.map((d) => (
            <Link
              key={d.id}
              to="/doctor/$id"
              params={{ id: d.id }}
              className="shrink-0 w-[180px] bg-surface rounded-2xl border border-border/60 shadow-card p-3"
            >
              <img
                src={d.image}
                alt={d.name}
                className="h-24 w-full rounded-xl object-cover"
                loading="lazy"
              />
              <div className="mt-2 flex items-center gap-1">
                <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                <p className="text-[12.5px] font-display font-semibold truncate">
                  {d.name}
                </p>
              </div>
              <p className="text-[11px] text-muted-foreground truncate">
                {d.specialty}
              </p>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-[11px] font-semibold">
                  {formatFee(d.fee)}
                </span>
                <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-primary">
                  <Star className="h-3 w-3 fill-primary" /> {d.rating}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sticky bottom CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/60 px-4 py-3 pb-[max(env(safe-area-inset-bottom),1rem)]">
        <div className="flex gap-2 max-w-md mx-auto">
          <button className="flex-1 h-12 rounded-2xl bg-gradient-brand text-primary-foreground font-semibold text-[14px] shadow-glow inline-flex items-center justify-center gap-2 animate-pulse-soft">
            <PhoneCall className="h-4 w-4" /> Call Now
          </button>
          <button
            aria-label="WhatsApp"
            className="h-12 px-4 rounded-2xl bg-success text-success-foreground inline-flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
          </button>
          <button
            aria-label="Share"
            className="h-12 px-4 rounded-2xl bg-surface border border-border text-foreground inline-flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────── Working hours ───────── */

function WorkingHours({
  hours,
  nextSlot,
}: {
  hours: DaySchedule[];
  nextSlot: string;
}) {
  // Use a fixed reference day so SSR/CSR match.
  const todayIdx = 1; // Tuesday — matches "Open now" demo state
  const today = hours[todayIdx];
  const isOpen = !!today?.open;

  return (
    <Card>
      <CardHeader icon={<Calendar className="h-4 w-4" />} title="Working hours">
        {isOpen ? (
          <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-success bg-success/12 px-2 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-soft" />
            Open now
          </span>
        ) : (
          <span className="text-[10.5px] font-bold text-muted-foreground bg-muted px-2 py-1 rounded-full">
            Closed
          </span>
        )}
      </CardHeader>

      {/* Today highlight */}
      <div className="rounded-2xl bg-gradient-to-br from-primary-soft to-background border border-border/60 p-3.5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10.5px] uppercase tracking-wider font-semibold text-primary">
              Today · {today?.day}
            </p>
            <p className="mt-0.5 text-[15px] font-display font-bold text-foreground">
              {today?.open && today?.close
                ? `${today.open} – ${today.close}`
                : "Closed today"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10.5px] uppercase tracking-wider text-muted-foreground font-semibold">
              Next slot
            </p>
            <p className="text-[12.5px] font-display font-bold text-foreground">
              {nextSlot}
            </p>
          </div>
        </div>
      </div>

      {/* Weekly timeline */}
      <ul className="mt-3 divide-y divide-border/60">
        {hours.map((d, i) => {
          const open = !!d.open;
          const isToday = i === todayIdx;
          return (
            <li
              key={d.day}
              className="flex items-center justify-between py-2.5"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`h-2 w-2 rounded-full ${
                    open ? "bg-success" : "bg-muted-foreground/30"
                  }`}
                />
                <span
                  className={`text-[12.5px] font-semibold ${
                    isToday ? "text-foreground" : "text-foreground/80"
                  }`}
                >
                  {d.day}
                </span>
                {isToday && (
                  <span className="text-[10px] font-bold text-primary bg-primary-soft px-1.5 py-0.5 rounded-full">
                    Today
                  </span>
                )}
              </div>
              <span
                className={`text-[12px] font-medium ${
                  open ? "text-foreground/80" : "text-muted-foreground"
                }`}
              >
                {open ? `${d.open} – ${d.close}` : "Closed"}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

/* ───────── Connect with me ───────── */

function ConnectWithMe({
  socials,
}: {
  socials: NonNullable<ReturnType<typeof getDoctor>>["socials"];
}) {
  const available = SOCIAL_DEFS.filter((s) => socials?.[s.key]);
  if (!available.length) return null;

  return (
    <Card>
      <CardHeader icon={<Sparkles className="h-4 w-4" />} title="Connect with me">
        <span className="text-[10.5px] text-muted-foreground">
          Verified handles
        </span>
      </CardHeader>
      <div className="grid grid-cols-5 gap-2">
        {available.map(({ key, label, icon: Icon }) => (
          <a
            key={key}
            href={socials?.[key]}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col items-center gap-1.5"
            aria-label={label}
          >
            <span className="h-12 w-12 grid place-items-center rounded-2xl bg-muted/70 border border-border/60 text-foreground/80 transition-all group-hover:bg-foreground group-hover:text-background group-hover:shadow-card">
              <Icon className="h-[18px] w-[18px]" />
            </span>
            <span className="text-[10px] font-medium text-muted-foreground">
              {label}
            </span>
          </a>
        ))}
      </div>
    </Card>
  );
}

/* ───────── Hero subcomponents ───────── */

function TrustBadge({
  children,
  primary = false,
}: {
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10.5px] font-semibold px-2.5 py-1 rounded-full backdrop-blur border ${
        primary
          ? "bg-foreground text-background border-foreground"
          : "bg-surface/85 text-foreground border-border/60"
      }`}
    >
      <ShieldCheck className="h-3 w-3" />
      {children}
    </span>
  );
}

function StatCard({
  icon,
  value,
  label,
  hint,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl bg-surface/90 backdrop-blur border border-border/60 shadow-card p-3">
      <div className="flex items-center justify-between">
        <span className="h-7 w-7 grid place-items-center rounded-lg bg-primary-soft text-primary">
          {icon}
        </span>
        <p className="text-[9.5px] uppercase tracking-wider text-muted-foreground font-semibold">
          {label}
        </p>
      </div>
      <p className="mt-2 text-[18px] font-display font-bold text-foreground leading-none">
        {value}
      </p>
      {hint && (
        <p className="mt-1 text-[10.5px] text-muted-foreground truncate">
          {hint}
        </p>
      )}
    </div>
  );
}

/* ───────── Shared ───────── */

function Card({
  children,
  padded = true,
}: {
  children: React.ReactNode;
  padded?: boolean;
}) {
  return (
    <div
      className={`bg-surface rounded-3xl border border-border/60 shadow-card overflow-hidden ${
        padded ? "p-4" : ""
      }`}
    >
      {children}
    </div>
  );
}

function CardHeader({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        {icon && (
          <span className="h-7 w-7 grid place-items-center rounded-lg bg-primary-soft text-primary">
            {icon}
          </span>
        )}
        <h3 className="text-[14px] font-display font-bold text-foreground">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function Meta({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-muted/60 p-2.5">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium flex items-center gap-1">
        {icon}
        {label}
      </p>
      <p className="text-[12.5px] font-semibold text-foreground mt-0.5">
        {value}
      </p>
    </div>
  );
}

function Chip({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted text-[11px] font-medium text-foreground">
      {icon}
      {children}
    </span>
  );
}
