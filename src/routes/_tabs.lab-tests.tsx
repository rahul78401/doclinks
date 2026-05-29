
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Droplet,
  HeartPulse,
  Home,
  MapPin,
  MessageCircle,
  Mic,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { CITIES, HEALTH_PACKAGES, LAB_TESTS } from "@/lib/lab-tests";
import heroImg from "@/assets/lab-hero.jpg";
import catBlood from "@/assets/cat-blood.jpg";
import catPackage from "@/assets/cat-package.jpg";

export const Route = createFileRoute("/_tabs/lab-tests")({
  component: LabTestsPage,
});

function LabTestsPage() {
  const navigate = useNavigate();

  return (
    <div className="pb-8">
      {/* HERO */}
      <section className="px-5 pt-2">
        <div className="relative rounded-[32px] overflow-hidden border border-border/40 shadow-float bg-gradient-hero">
          <div className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-primary/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-primary-glow/30 blur-3xl pointer-events-none" />

          {/* Image panel */}
          <div className="relative h-56 w-full overflow-hidden">
            <img
              src={heroImg}
              alt="Premium home sample collection by certified phlebotomist"
              width={1024}
              height={1024}
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface/95" />

            {/* Floating glass micro card */}
            <div className="absolute top-4 left-4 flex items-center gap-2 rounded-2xl bg-surface/85 backdrop-blur-md px-3 py-2 border border-border/40 shadow-card">
              <span className="h-7 w-7 rounded-xl bg-primary-soft grid place-items-center">
                <Home className="h-3.5 w-3.5 text-primary" />
              </span>
              <div className="leading-tight">
                <p className="text-[10.5px] font-bold text-foreground">Home Collection</p>
                <p className="text-[9.5px] text-muted-foreground">Free in your city</p>
              </div>
            </div>

            <div className="absolute bottom-6 right-4 flex items-center gap-2 rounded-2xl bg-surface/85 backdrop-blur-md px-3 py-2 border border-border/40 shadow-card">
              <span className="h-7 w-7 rounded-xl bg-[oklch(0.94_0.06_150)] grid place-items-center">
                <MessageCircle className="h-3.5 w-3.5 text-[oklch(0.48_0.16_150)]" />
              </span>
              <div className="leading-tight">
                <p className="text-[10.5px] font-bold text-foreground">Reports on WhatsApp</p>
                <p className="text-[9.5px] text-muted-foreground">Within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Copy + CTAs */}
          <div className="relative px-5 pb-5 -mt-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface/90 backdrop-blur px-2.5 py-1 text-[10.5px] font-bold text-primary border border-primary/15 shadow-card">
              <ShieldCheck className="h-3 w-3" /> NABL Certified · Trusted
            </span>
            <h1 className="mt-3 text-[26px] leading-[1.1] font-display font-extrabold text-foreground tracking-tight">
              Book trusted lab
              <br />
              tests <span className="text-primary">from home.</span>
            </h1>
            <p className="mt-2 text-[12.5px] text-muted-foreground leading-snug max-w-[300px]">
              Transparent prices, certified labs and home sample collection — diagnostics made simple.
            </p>

            <div className="mt-4 flex flex-col gap-2.5">
              <button
                onClick={() => navigate({ to: "/blood-tests" })}
                className="group relative h-12 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand text-primary-foreground text-[13.5px] font-semibold shadow-glow active:scale-[0.985] transition"
              >
                <Droplet className="h-4 w-4" /> Explore Blood Tests
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => navigate({ to: "/health-packages" })}
                className="h-12 inline-flex items-center justify-center gap-2 rounded-full bg-surface border border-border text-foreground text-[13.5px] font-semibold active:scale-[0.985] transition"
              >
                <HeartPulse className="h-4 w-4 text-primary" /> Explore Health Packages
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="px-5 mt-5">
        <div className="flex items-center gap-2 rounded-2xl bg-surface border border-border/60 shadow-card px-3 h-12">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search tests, packages, conditions…"
            className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
          />
          <button
            aria-label="Voice search"
            className="h-8 w-8 grid place-items-center rounded-full bg-primary-soft text-primary"
          >
            <Mic className="h-3.5 w-3.5" />
          </button>
        </div>
        <button className="mt-2 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          Showing tests for <span className="text-foreground">Bengaluru</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </section>

      {/* CATEGORY CARDS */}
      <section className="mt-6 px-5">
        <SectionHeader
          title="Browse by category"
          subtitle="Two simple journeys to start your health check."
          hideMore
        />

        <div className="mt-3 grid grid-cols-1 gap-4">
          <CategoryCard
            to="/blood-tests"
            tone="teal"
            image={catBlood}
            eyebrow="Diagnostic Tests"
            title="Blood Tests"
            description="250+ certified diagnostic tests with transparent pricing."
            metaA={`${LAB_TESTS.length}+ tests`}
            metaB="From ₹100"
            cta="Explore Tests"
          />
          <CategoryCard
            to="/health-packages"
            tone="violet"
            image={catPackage}
            eyebrow="Preventive Care"
            title="Health Packages"
            description="Curated full body & preventive checkups for the whole family."
            metaA={`${HEALTH_PACKAGES.length} packages`}
            metaB="Save up to 60%"
            cta="Explore Packages"
          />
        </div>
      </section>

      {/* CITIES */}
      <section className="mt-8 px-5">
        <SectionHeader
          title="Online Bookings Available At"
          subtitle="Explore diagnostics in your city."
          hideMore
        />
        <div className="mt-3 grid grid-cols-2 gap-3">
          {CITIES.map((c) => (
            <Link
              key={c.slug}
              to="/city/$slug"
              params={{ slug: c.slug }}
              className="group relative rounded-2xl bg-surface border border-border/60 shadow-card p-3.5 overflow-hidden active:scale-[0.98] transition"
            >
              <div className="absolute -top-8 -right-8 h-20 w-20 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
              <div className="relative flex items-start justify-between">
                <div className="h-9 w-9 rounded-xl bg-primary-soft grid place-items-center border border-primary/15">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-active:text-primary" />
              </div>
              <p className="mt-3 text-[14px] font-display font-bold text-foreground leading-tight">
                {c.name}
              </p>
              <p className="text-[11px] text-muted-foreground">{c.state}</p>
              <p className="mt-2 text-[10.5px] font-semibold text-primary">
                {c.labs} labs · Explore
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function CategoryCard({
  to,
  tone,
  image,
  eyebrow,
  title,
  description,
  metaA,
  metaB,
  cta,
}: {
  to: string;
  tone: "teal" | "violet";
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  metaA: string;
  metaB: string;
  cta: string;
}) {
  const gradient =
    tone === "teal"
      ? "from-[oklch(0.94_0.06_187)] via-[oklch(0.97_0.03_187)] to-surface"
      : "from-[oklch(0.93_0.07_295)] via-[oklch(0.97_0.03_295)] to-surface";
  const accent = tone === "teal" ? "text-primary" : "text-[oklch(0.5_0.18_295)]";

  return (
    <Link
      to={to}
      className={`group relative rounded-3xl overflow-hidden border border-border/50 shadow-float bg-gradient-to-br ${gradient} active:scale-[0.99] transition`}
    >
      <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/40 blur-3xl pointer-events-none" />
      <div className="relative flex items-stretch gap-3 p-4">
        <div className="flex-1 min-w-0">
          <span className={`text-[10.5px] font-bold uppercase tracking-wider ${accent}`}>
            {eyebrow}
          </span>
          <h3 className="mt-1 text-[20px] font-display font-extrabold text-foreground tracking-tight leading-tight">
            {title}
          </h3>
          <p className="mt-1 text-[12px] text-muted-foreground leading-snug max-w-[180px]">
            {description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center rounded-full bg-surface/80 backdrop-blur px-2 py-0.5 text-[10.5px] font-semibold text-foreground border border-border/40">
              {metaA}
            </span>
            <span className="inline-flex items-center rounded-full bg-surface/80 backdrop-blur px-2 py-0.5 text-[10.5px] font-semibold text-foreground border border-border/40">
              {metaB}
            </span>
          </div>

          <div className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-foreground">
            {cta}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        <div className="relative w-28 shrink-0">
          <div className="absolute inset-0 rounded-2xl bg-surface/60 backdrop-blur-sm border border-white/40 shadow-card overflow-hidden">
            <img
              src={image}
              alt={title}
              width={768}
              height={768}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="absolute -top-1 -right-1 h-7 w-7 rounded-full bg-surface grid place-items-center border border-border/40 shadow-card">
            <Sparkles className={`h-3.5 w-3.5 ${accent}`} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function SectionHeader({
  title,
  subtitle,
  hideMore,
}: {
  title: string;
  subtitle: string;
  hideMore?: boolean;
}) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div className="min-w-0">
        <h2 className="text-[17px] font-display font-bold text-foreground tracking-tight">
          {title}
        </h2>
        <p className="text-[12px] text-muted-foreground leading-snug">{subtitle}</p>
      </div>
      {!hideMore && (
        <button className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary shrink-0">
          View More <ChevronRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
