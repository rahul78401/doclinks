import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Bookmark,
  Calendar,
  Car,
  ChevronRight,
  Globe2,
  Heart,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Share2,
  ShieldCheck,
  Star,
  Train,
  Users,
} from "lucide-react";
import { getDoctor, doctors } from "@/lib/doctors";
import clinicImg from "@/assets/clinic-1.jpg";

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
            onClick={() => { router.invalidate(); reset(); }}
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

function DoctorDetail() {
  const { doctor } = Route.useLoaderData();
  const similar = doctors.filter((d) => d.id !== doctor.id);

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 glass border-b border-border/60">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            to="/find-doctors"
            className="h-10 w-10 grid place-items-center rounded-full bg-surface shadow-card border border-border/60"
            aria-label="Back"
          >
            <ArrowLeft className="h-[18px] w-[18px]" />
          </Link>
          <div className="flex items-center gap-2">
            <button className="h-10 w-10 grid place-items-center rounded-full bg-surface shadow-card border border-border/60">
              <Share2 className="h-[18px] w-[18px]" />
            </button>
            <button className="h-10 w-10 grid place-items-center rounded-full bg-surface shadow-card border border-border/60">
              <Bookmark className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-5 pt-3 pb-6 bg-gradient-hero">
        <div className="flex gap-4">
          <div className="relative">
            <img
              src={doctor.image}
              alt={doctor.name}
              width={112}
              height={112}
              className="h-28 w-28 rounded-3xl object-cover shadow-card ring-4 ring-surface"
            />
            <span className="absolute -bottom-2 -right-2 h-8 w-8 grid place-items-center rounded-full bg-surface shadow-card">
              <BadgeCheck className="h-6 w-6 text-primary" />
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-primary uppercase tracking-wide">
              {doctor.specialty}
            </p>
            <h1 className="font-display text-[22px] font-bold text-foreground leading-tight">
              {doctor.name}
            </h1>
            <p className="text-[12.5px] text-muted-foreground">{doctor.subSpecialty}</p>
            <p className="mt-1 text-[12px] text-foreground/80 flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {doctor.clinic} · {doctor.location}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {doctor.badges.map((b: string) => (
            <span
              key={b}
              className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-surface/80 backdrop-blur border border-border/60 text-foreground"
            >
              ⭐ {b}
            </span>
          ))}
          <span className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-foreground text-background">
            Top Rated in {doctor.city}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          <HeroStat icon={<Star className="h-3.5 w-3.5" />} value={`${doctor.rating}`} label="Rating" />
          <HeroStat icon={<Users className="h-3.5 w-3.5" />} value={doctor.followers} label="Followers" />
          <HeroStat value={`${doctor.experience}y`} label="Experience" />
          <HeroStat value={`₹${doctor.fee}`} label="Fee" />
        </div>

        <div className="mt-4 flex gap-2">
          <button className="flex-1 h-12 rounded-2xl bg-gradient-brand text-primary-foreground font-semibold text-[14px] shadow-glow inline-flex items-center justify-center gap-2">
            <Phone className="h-4 w-4" /> Call Now
          </button>
          <button className="h-12 px-4 rounded-2xl bg-success text-success-foreground font-semibold text-[14px] inline-flex items-center gap-2 shadow-card">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </button>
          <button className="h-12 w-12 grid place-items-center rounded-2xl bg-surface border border-border/60 shadow-card">
            <Heart className="h-[18px] w-[18px] text-foreground" />
          </button>
        </div>
      </section>

      {/* Trust */}
      <section className="px-5 mt-5">
        <Card>
          <CardHeader icon={<ShieldCheck className="h-4 w-4" />} title="Trust & Verification">
            <span className="text-[10.5px] font-bold text-success">98 / 100</span>
          </CardHeader>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-[98%] bg-gradient-brand rounded-full" />
          </div>
          <div className="mt-4 space-y-2.5">
            {[
              "Medical registration verified",
              "Clinic address verified",
              "Qualification verified",
              "Experience verified",
            ].map((v) => (
              <div key={v} className="flex items-center justify-between">
                <p className="text-[12.5px] text-foreground">{v}</p>
                <BadgeCheck className="h-4 w-4 text-primary" />
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            Last verified · 12 May 2026 by the DocLinks Trust team
          </p>
        </Card>
      </section>

      {/* About */}
      <section className="px-5 mt-4">
        <Card>
          <CardHeader title="About the doctor" />
          <p className="text-[13px] leading-relaxed text-foreground/85">
            {doctor.name} is a {doctor.specialty.toLowerCase()} with {doctor.experience}+ years of
            experience treating complex cases at {doctor.clinic}. Known for a patient-first
            approach, evidence-based care, and a calm bedside manner.
          </p>
          <button className="mt-2 text-[12px] font-semibold text-primary inline-flex items-center gap-1">
            Read more <ChevronRight className="h-3 w-3" />
          </button>
          <div className="mt-3 grid grid-cols-2 gap-3 text-[12px]">
            <Meta label="Languages" value={doctor.languages.join(", ")} icon={<Globe2 className="h-3.5 w-3.5" />} />
            <Meta label="Gender" value={doctor.gender} />
            <Meta label="Followers" value={doctor.followers} />
            <Meta label="Recommend" value={`${doctor.recommendation}%`} />
          </div>
        </Card>
      </section>

      {/* Treatments */}
      <section className="mt-4">
        <div className="px-5 mb-2 flex items-center justify-between">
          <h2 className="text-[15px] font-display font-bold text-foreground">Treatments & Specializations</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-5">
          {doctor.treatments.map((t: string) => (
            <span
              key={t}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-surface border border-border/60 px-3.5 py-2 text-[12px] font-semibold shadow-card"
            >
              <span className="h-2 w-2 rounded-full bg-primary" /> {t}
            </span>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="px-5 mt-5">
        <Card>
          <CardHeader title="Patient reviews">
            <div className="flex items-center gap-1 text-[12px] font-semibold">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" />
              {doctor.rating} · {doctor.reviews}
            </div>
          </CardHeader>
          <div className="space-y-2">
            {[
              { label: "Bedside manner", v: 96 },
              { label: "Wait time", v: 88 },
              { label: "Explanation", v: 94 },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-3">
                <p className="w-28 text-[11.5px] text-muted-foreground">{r.label}</p>
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-brand" style={{ width: `${r.v}%` }} />
                </div>
                <p className="w-8 text-right text-[11px] font-semibold">{r.v}%</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl bg-muted/50 p-3.5">
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-full bg-primary-soft grid place-items-center text-[11px] font-bold text-primary">
                MR
              </span>
              <div>
                <p className="text-[12.5px] font-semibold">Meera R.</p>
                <p className="text-[10.5px] text-muted-foreground">Verified patient · 2 weeks ago</p>
              </div>
              <span className="ml-auto flex items-center gap-1 text-[11px] font-semibold">
                <Star className="h-3 w-3 fill-warning text-warning" /> 5.0
              </span>
            </div>
            <p className="mt-2 text-[12.5px] text-foreground/85">
              Listened carefully, explained every option clearly. No rush, no upsell — exactly the experience I hoped for.
            </p>
          </div>
        </Card>
      </section>

      {/* Clinic */}
      <section className="px-5 mt-4">
        <Card padded={false}>
          <img src={clinicImg} alt={doctor.clinic} className="w-full h-36 object-cover" loading="lazy" />
          <div className="p-4">
            <p className="text-[10.5px] font-semibold text-primary uppercase tracking-wide">Clinic</p>
            <h3 className="text-[15px] font-display font-bold text-foreground">{doctor.clinic}</h3>
            <p className="text-[12px] text-muted-foreground">{doctor.location}, {doctor.city}</p>
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

      {/* Hours */}
      <section className="px-5 mt-4">
        <Card>
          <CardHeader icon={<Calendar className="h-4 w-4" />} title="Working hours">
            <span className="text-[10.5px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">
              Open now
            </span>
          </CardHeader>
          <div className="grid grid-cols-7 gap-1 mt-1">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => {
              const open = i !== 6;
              return (
                <div
                  key={i}
                  className={`rounded-xl py-2 text-center text-[11px] font-semibold ${
                    i === 1
                      ? "bg-gradient-brand text-primary-foreground"
                      : open
                        ? "bg-primary-soft text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {d}
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-[12px] text-foreground/85">
            Next available · <span className="font-semibold">{doctor.nextSlot}</span>
          </p>
        </Card>
      </section>

      {/* Similar */}
      <section className="mt-5">
        <div className="px-5 mb-3 flex items-center justify-between">
          <h2 className="text-[15px] font-display font-bold text-foreground">Similar doctors</h2>
          <Link to="/find-doctors" className="text-[12px] font-semibold text-primary">See all</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-2">
          {similar.map((d) => (
            <Link
              key={d.id}
              to="/doctor/$id"
              params={{ id: d.id }}
              className="shrink-0 w-[180px] bg-surface rounded-2xl border border-border/60 shadow-card p-3"
            >
              <img src={d.image} alt={d.name} className="h-24 w-full rounded-xl object-cover" loading="lazy" />
              <div className="mt-2 flex items-center gap-1">
                <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                <p className="text-[12.5px] font-display font-semibold truncate">{d.name}</p>
              </div>
              <p className="text-[11px] text-muted-foreground truncate">{d.specialty}</p>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-[11px] font-semibold">₹{d.fee}</span>
                <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-primary">
                  <Star className="h-3 w-3 fill-primary" /> {d.rating}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/60 px-4 py-3 pb-5">
        <div className="flex gap-2 max-w-md mx-auto">
          <button className="flex-1 h-12 rounded-2xl bg-gradient-brand text-primary-foreground font-semibold text-[14px] shadow-glow inline-flex items-center justify-center gap-2 animate-pulse-soft">
            <Phone className="h-4 w-4" /> Call Now
          </button>
          <button className="h-12 px-4 rounded-2xl bg-success text-success-foreground font-semibold text-[14px] inline-flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
          </button>
          <button className="h-12 px-4 rounded-2xl bg-surface border border-border text-foreground inline-flex items-center gap-2">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Card({ children, padded = true }: { children: React.ReactNode; padded?: boolean }) {
  return (
    <div className={`bg-surface rounded-3xl border border-border/60 shadow-card overflow-hidden ${padded ? "p-4" : ""}`}>
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
        <h3 className="text-[14px] font-display font-bold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function HeroStat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl glass-strong border border-border/60 px-2 py-2.5 text-center">
      <p className="text-[13px] font-display font-bold text-foreground flex items-center justify-center gap-1">
        {icon}
        {value}
      </p>
      <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
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
      <p className="text-[12.5px] font-semibold text-foreground mt-0.5">{value}</p>
    </div>
  );
}

function Chip({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted text-[11px] font-medium text-foreground">
      {icon}
      {children}
    </span>
  );
}
