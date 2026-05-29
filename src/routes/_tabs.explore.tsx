import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Building2,
  Clock,
  Compass,
  Heart,
  Hospital,
  Newspaper,
  Search,
  Sparkles,
  Stethoscope,
  TestTube2,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/explore-hero.jpg";
import { articles, categories, magazines } from "@/lib/explore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export const Route = createFileRoute("/_tabs/explore")({
  head: () => ({
    meta: [
      { title: "Explore — DocLinks healthcare knowledge & stories" },
      {
        name: "description",
        content:
          "Articles, magazines and trusted healthcare information from India's leading doctors. Join the DocLinks healthcare network.",
      },
    ],
  }),
  component: ExplorePage,
});

const services = [
  { label: "Find Doctors", icon: Stethoscope, to: "/find-doctors", tint: "from-[#dff4f0] to-[#f0faf9]" },
  { label: "Hospitals", icon: Hospital, to: "/hospitals", tint: "from-[#e8f6ff] to-[#f0faf9]" },
  { label: "Clinics", icon: Building2, to: "/clinics", tint: "from-[#fff1e6] to-[#fff7f0]" },
  { label: "Lab Tests", icon: TestTube2, to: "/lab-tests", tint: "from-[#eaf5e6] to-[#f4faf0]" },
] as const;

const stats = [
  { value: "50K+", label: "Happy patients" },
  { value: "1,200+", label: "Verified doctors" },
  { value: "500+", label: "Hospitals & clinics" },
];

const beliefs = [
  { icon: BadgeCheck, title: "Trust & Verification", desc: "Every profile manually verified." },
  { icon: Heart, title: "Patient-Centric", desc: "Designed around real patient journeys." },
  { icon: Users, title: "Direct Contact", desc: "No middlemen between you and care." },
  { icon: Sparkles, title: "Lead & Inquiry", desc: "Transparent enquiries, instant replies." },
] as const;

function ExplorePage() {
  return (
    <div className="pb-12 space-y-12">
      <Hero />
      <JoinUs />
      <Categories />
      <FeaturedArticles />
      <Magazines />
      <About />
      <Beliefs />
      <Offers />
      <ProviderCTA />
      <FinalCTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="px-5 pt-2">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-hero shadow-card">
        <div className="relative h-[360px]">
          <img
            src={heroImg}
            alt="Reading healthcare magazine"
            className="absolute inset-0 h-full w-full object-cover object-right"
            width={1280}
            height={896}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent" />

          <div className="relative z-10 h-full flex flex-col justify-between p-5">
            <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-surface/90 backdrop-blur px-3 py-1.5 border border-border/60 shadow-card">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-[11px] font-semibold text-foreground">DocLinks Explore</span>
            </div>

            <div className="max-w-[78%]">
              <h1 className="font-display font-bold text-[28px] leading-[1.1] text-foreground text-balance">
                Healthcare insights, trusted information & verified care.
              </h1>
              <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed max-w-[260px]">
                Stories, magazines and guidance from India's most respected doctors — designed for patient empowerment.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="#articles"
                  className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-[12.5px] font-semibold shadow-card"
                >
                  Explore Articles <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="#magazines"
                  className="inline-flex items-center gap-1.5 rounded-full bg-surface/95 backdrop-blur border border-border px-4 py-2 text-[12.5px] font-semibold text-foreground"
                >
                  Read Magazines
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-border/60 border-t border-border/60 bg-surface/70 backdrop-blur">
          {stats.map((s) => (
            <div key={s.label} className="p-3 text-center">
              <p className="font-display font-bold text-[16px] text-foreground">{s.value}</p>
              <p className="text-[10.5px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinUs() {
  const [agree, setAgree] = useState(false);
  return (
    <section className="px-5">
      <div className="relative overflow-hidden rounded-[28px] border border-border/60 bg-gradient-to-br from-primary-soft via-surface to-surface p-5 shadow-card">
        <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 border border-border/60 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
            <span className="text-[10.5px] font-semibold tracking-wider uppercase text-primary">Join with us</span>
          </div>
          <h2 className="mt-3 font-display font-bold text-[22px] leading-tight text-foreground text-balance">
            Join India's growing healthcare network.
          </h2>
          <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">
            Get a verified profile, reach more patients and grow your digital presence on the platform built for trust.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!agree) return toast.error("Please accept the terms to continue");
              toast.success("Request received — our team will reach out within 24 hours.");
            }}
            className="mt-5 space-y-3"
          >
            <FloatField label="Clinic / Hospital / Doctor name" />
            <FloatField label="Email address" type="email" />
            <FloatField label="Mobile number" type="tel" />
            <FloatField label="Location (city)" />

            <label className="flex items-start gap-2.5 pt-1">
              <Checkbox checked={agree} onCheckedChange={(v) => setAgree(!!v)} className="mt-0.5" />
              <span className="text-[12px] text-muted-foreground leading-relaxed">
                I agree to the <span className="text-foreground font-medium">Terms</span> and{" "}
                <span className="text-foreground font-medium">Privacy Policy</span>.
              </span>
            </label>

            <div className="flex gap-2 pt-1">
              <Button type="submit" className="flex-1 h-11 rounded-full bg-foreground text-background hover:bg-foreground/90">
                Join Now
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-11 rounded-full"
                onClick={() => toast.success("Callback requested")}
              >
                Request Callback
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function FloatField({ label, type = "text" }: { label: string; type?: string }) {
  const [v, setV] = useState("");
  const active = v.length > 0;
  return (
    <div className="relative">
      <Input
        type={type}
        value={v}
        onChange={(e) => setV(e.target.value)}
        className="h-12 rounded-2xl border-border/70 bg-surface/80 backdrop-blur px-4 pt-5 pb-1 text-[13.5px] focus-visible:ring-primary"
      />
      <span
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          active ? "top-1.5 text-[10px] text-primary font-semibold" : "top-3.5 text-[13px] text-muted-foreground"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function Categories() {
  return (
    <section className="space-y-3">
      <div className="px-5 flex items-end justify-between">
        <div>
          <p className="text-[10.5px] uppercase tracking-wider font-semibold text-primary">Browse by topic</p>
          <h2 className="font-display font-bold text-[20px] text-foreground">Health categories</h2>
        </div>
      </div>
      <div className="px-5 grid grid-cols-3 gap-2.5">
        {categories.map((c) => (
          <button
            key={c.label}
            className="rounded-2xl border border-border/60 bg-surface p-3 text-left shadow-card transition-transform hover:-translate-y-0.5"
          >
            <span className={`inline-grid place-items-center h-9 w-9 rounded-xl text-base ${c.tint}`}>{c.icon}</span>
            <p className="mt-2 text-[12px] font-semibold text-foreground leading-tight">{c.label}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function FeaturedArticles() {
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a.id !== featured.id);
  return (
    <section id="articles" className="space-y-4">
      <div className="px-5 flex items-end justify-between">
        <div>
          <p className="text-[10.5px] uppercase tracking-wider font-semibold text-primary">Editorial</p>
          <h2 className="font-display font-bold text-[20px] text-foreground">Featured articles</h2>
        </div>
        <button className="text-[12px] font-semibold text-primary flex items-center gap-1">
          View all <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="px-5">
        <Link
          to="/article/$slug"
          params={{ slug: featured.id }}
          className="block rounded-[24px] overflow-hidden border border-border/60 bg-surface shadow-card group"
        >
          <div className="relative h-[200px]">
            <img src={featured.cover} alt={featured.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            {featured.trending && (
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-surface/95 backdrop-blur px-2.5 py-1 text-[10.5px] font-semibold text-foreground">
                <TrendingUp className="h-3 w-3 text-primary" /> Trending
              </span>
            )}
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] uppercase tracking-wider font-semibold opacity-90">{featured.category}</span>
              <h3 className="mt-1 font-display font-bold text-[18px] leading-tight text-balance">{featured.title}</h3>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-gradient-brand grid place-items-center text-white text-[11px] font-bold">
                {featured.author.name.split(" ")[1]?.[0] ?? "D"}
              </div>
              <div className="leading-tight">
                <p className="text-[12px] font-semibold text-foreground">{featured.author.name}</p>
                <p className="text-[10.5px] text-muted-foreground">{featured.author.role}</p>
              </div>
            </div>
            <div className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> {featured.readMins} min
            </div>
          </div>
        </Link>
      </div>

      <div className="px-5 space-y-3">
        {rest.map((a) => (
          <Link
            key={a.id}
            to="/article/$slug"
            params={{ slug: a.id }}
            className="flex gap-3 rounded-2xl border border-border/60 bg-surface p-2.5 shadow-card transition-transform hover:-translate-y-0.5"
          >
            <img src={a.cover} alt={a.title} className="h-[92px] w-[92px] rounded-xl object-cover" loading="lazy" />
            <div className="flex-1 min-w-0 py-1">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">{a.category}</span>
              <h3 className="mt-0.5 font-display font-semibold text-[14px] leading-snug text-foreground line-clamp-2">{a.title}</h3>
              <div className="mt-1.5 flex items-center gap-2 text-[10.5px] text-muted-foreground">
                <span>{a.author.name}</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{a.readMins} min</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Magazines() {
  return (
    <section id="magazines" className="space-y-4">
      <div className="px-5 flex items-end justify-between">
        <div>
          <p className="text-[10.5px] uppercase tracking-wider font-semibold text-primary">Premium reads</p>
          <h2 className="font-display font-bold text-[20px] text-foreground">Healthcare magazines</h2>
        </div>
        <button className="text-[12px] font-semibold text-primary flex items-center gap-1">
          Library <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-1">
        {magazines.map((m) => (
          <Link
            key={m.id}
            to="/magazine/$id"
            params={{ id: m.id }}
            className={`shrink-0 w-[180px] rounded-[22px] overflow-hidden border border-border/60 bg-gradient-to-b ${m.tint} shadow-card group`}
          >
            <div className="relative p-3">
              {m.badge && (
                <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1 rounded-full bg-foreground text-background px-2 py-0.5 text-[9.5px] font-semibold">
                  {m.badge}
                </span>
              )}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-float">
                <img
                  src={m.cover}
                  alt={m.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 px-1">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{m.topic} · {m.issue}</p>
                <p className="mt-0.5 font-display font-bold text-[14.5px] text-foreground leading-tight">{m.title}</p>
                <p className="mt-1 text-[10.5px] text-muted-foreground">{m.date} · {m.pages} pages</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="px-5">
      <div className="rounded-[28px] overflow-hidden border border-border/60 bg-surface shadow-card">
        <div className="bg-gradient-hero p-5">
          <p className="text-[10.5px] uppercase tracking-wider font-semibold text-primary">About DocLinks</p>
          <h2 className="mt-1 font-display font-bold text-[22px] leading-tight text-foreground text-balance">
            Building India's most trusted healthcare ecosystem.
          </h2>
          <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
            DocLinks connects patients with verified doctors, hospitals, clinics and diagnostics — designed for transparency, direct contact and trust-first discovery.
          </p>
        </div>

        <div className="p-5">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">How it works</p>
          <div className="mt-3 space-y-3">
            {[
              { n: "01", t: "Search", d: "Find verified providers by city, specialty or treatment." },
              { n: "02", t: "Explore profiles", d: "Real credentials, reviews and fees — fully transparent." },
              { n: "03", t: "Connect directly", d: "Call, WhatsApp or request a callback in one tap." },
            ].map((s) => (
              <div key={s.n} className="flex gap-3 items-start">
                <span className="shrink-0 h-9 w-9 rounded-xl bg-primary-soft text-primary grid place-items-center text-[12px] font-bold">
                  {s.n}
                </span>
                <div>
                  <p className="font-display font-semibold text-[14px] text-foreground">{s.t}</p>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Beliefs() {
  return (
    <section className="px-5 space-y-3">
      <div>
        <p className="text-[10.5px] uppercase tracking-wider font-semibold text-primary">What we believe</p>
        <h2 className="font-display font-bold text-[20px] text-foreground">A trust-first philosophy</h2>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {beliefs.map((b) => (
          <div key={b.title} className="rounded-2xl border border-border/60 bg-surface p-3.5 shadow-card">
            <span className="inline-grid place-items-center h-9 w-9 rounded-xl bg-primary-soft text-primary">
              <b.icon className="h-4 w-4" />
            </span>
            <p className="mt-2.5 font-display font-semibold text-[13.5px] text-foreground">{b.title}</p>
            <p className="mt-0.5 text-[11.5px] text-muted-foreground leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Offers() {
  return (
    <section className="px-5 space-y-3">
      <div>
        <p className="text-[10.5px] uppercase tracking-wider font-semibold text-primary">What we offer</p>
        <h2 className="font-display font-bold text-[20px] text-foreground">Everything healthcare, in one app</h2>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {services.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className={`rounded-2xl border border-border/60 bg-gradient-to-br ${s.tint} p-4 shadow-card group`}
          >
            <span className="inline-grid place-items-center h-10 w-10 rounded-xl bg-surface shadow-sm">
              <s.icon className="h-4.5 w-4.5 text-primary" />
            </span>
            <p className="mt-3 font-display font-semibold text-[14px] text-foreground">{s.label}</p>
            <p className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-semibold text-primary">
              Explore <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProviderCTA() {
  return (
    <section className="px-5">
      <div className="relative overflow-hidden rounded-[28px] bg-foreground text-background p-5 shadow-float">
        <div className="absolute -top-20 -right-10 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-primary-glow/30 blur-3xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-background/10 backdrop-blur px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" /> For providers
          </span>
          <h2 className="mt-3 font-display font-bold text-[22px] leading-tight text-balance">
            Are you a healthcare provider?
          </h2>
          <p className="mt-2 text-[13px] text-background/70 leading-relaxed">
            Verified profile, mini-website, lead management and patient analytics — all in one subscription.
          </p>
          <ul className="mt-4 space-y-2">
            {["Verified provider profile", "Mini-website + analytics", "Inquiry & lead management"].map((p) => (
              <li key={p} className="flex items-center gap-2 text-[12.5px] text-background/85">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-glow" /> {p}
              </li>
            ))}
          </ul>
          <button
            onClick={() => toast.success("We'll reach out within 24 hours.")}
            className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-background text-foreground px-5 py-2.5 text-[13px] font-semibold"
          >
            List Your Practice <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-5">
      <div className="rounded-[28px] border border-border/60 bg-gradient-hero p-6 text-center shadow-card">
        <span className="inline-grid place-items-center h-12 w-12 rounded-2xl bg-surface shadow-card mx-auto">
          <Compass className="h-5 w-5 text-primary" />
        </span>
        <h2 className="mt-3 font-display font-bold text-[22px] leading-tight text-foreground text-balance">
          Ready to find your healthcare provider?
        </h2>
        <p className="mt-2 text-[13px] text-muted-foreground">
          Discover trusted doctors, clinics and diagnostics near you.
        </p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link
            to="/find-doctors"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-5 py-2.5 text-[13px] font-semibold"
          >
            Find Doctors <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button className="inline-flex items-center gap-1.5 rounded-full bg-surface border border-border px-5 py-2.5 text-[13px] font-semibold text-foreground">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
