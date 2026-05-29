import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ShieldCheck, Lock, Cookie, CreditCard, RefreshCcw, AlertTriangle,
  Mail, ArrowLeft, FileText, ScrollText, Calendar, Sparkles, ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Legal Center — DocLinks" },
      { name: "description", content: "Privacy Policy and Terms & Conditions for DocLinks. Your privacy, transparency and trust matter to us." },
    ],
  }),
  component: LegalPage,
});

type Section = {
  id: string;
  title: string;
  icon: any;
  body: { heading?: string; text: string }[];
};

const privacy: Section[] = [
  {
    id: "info-we-collect",
    title: "Information We Collect",
    icon: ShieldCheck,
    body: [
      { heading: "Personal details", text: "Name, email, phone, date of birth, gender and address you provide while creating an account or booking a service." },
      { heading: "Medical details (optional)", text: "Blood group, allergies, chronic conditions, current medications and emergency contact — only what you choose to add to your profile." },
      { heading: "Usage data", text: "Pages you visit, searches you make and providers you save. Used only to improve your experience." },
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: Lock,
    body: [
      { text: "Your data is encrypted in transit (TLS 1.2+) and at rest. Access is restricted, audited and limited to a small set of authorised engineers under strict policies." },
      { heading: "Your control", text: "You can edit, export or delete your data at any time from your profile. Deleted data is removed from active systems immediately and from backups within 30 days." },
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    icon: Cookie,
    body: [
      { text: "We use a small number of essential cookies to keep you signed in and remember your preferences. We do not use third-party advertising cookies and we do not sell your data — ever." },
    ],
  },
];

const terms: Section[] = [
  {
    id: "subscription-plans",
    title: "Subscription Plans",
    icon: CreditCard,
    body: [
      { text: "DocLinks offers free and premium plans for healthcare providers. Plan inclusions, pricing and billing cycles are shown on the pricing page before checkout." },
      { heading: "Auto-renewal", text: "Paid plans renew at the end of each billing cycle. You can cancel renewal anytime from your account — access continues until the end of the current period." },
    ],
  },
  {
    id: "refund-policy",
    title: "Refund Policy",
    icon: RefreshCcw,
    body: [
      { text: "We offer a 7-day refund window for first-time subscriptions if the service has not been actively used. After this period, payments are non-refundable except where required by applicable law." },
      { text: "For refund requests, write to billing@doclinks.in with your order details. Refunds are processed within 5–7 business days to the original payment method." },
    ],
  },
  {
    id: "limitation",
    title: "Limitation of Liability",
    icon: AlertTriangle,
    body: [
      { text: "DocLinks is a discovery and information platform. We are not a medical provider and we do not give medical advice. Any decisions about care must be made between you and a qualified clinician." },
      { text: "To the extent permitted by law, DocLinks is not liable for any indirect, incidental or consequential damages arising from use of the platform." },
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: Mail,
    body: [
      { text: "Questions about this page or your data? Our team responds within 24 hours on business days." },
    ],
  },
];

const ALL: Section[] = [...privacy, ...terms];

function LegalPage() {
  const [tab, setTab] = useState<"privacy" | "terms">("privacy");
  const sections = tab === "privacy" ? privacy : terms;
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const [active, setActive] = useState(ids[0]);
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => { setActive(ids[0]); }, [tab, ids]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    ids.forEach((id) => { const el = refs.current[id]; if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [ids]);

  const scrollTo = (id: string) => {
    const el = refs.current[id];
    if (el) window.scrollTo({ top: el.offsetTop - 90, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero border-b border-border/60">
        <div className="absolute -top-20 -right-16 h-72 w-72 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-primary-glow/20 blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-5 pt-6 pb-10">
          <Link to="/account" className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-primary">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to account
          </Link>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-surface/90 border border-border/60 px-3 py-1 text-[11px] uppercase tracking-wider text-primary font-semibold shadow-card">
            <Sparkles className="h-3 w-3" /> Legal Center
          </div>
          <h1 className="mt-4 text-[34px] leading-[1.05] font-bold text-foreground font-display tracking-tight text-balance">
            Your privacy, transparency<br />and trust matter to us.
          </h1>
          <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed max-w-xl">
            Plain-language policies that explain what we collect, how we protect it, and the rights you have over your data.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1 bg-surface/90 border border-border/60 px-2.5 py-1 rounded-full">
              <Calendar className="h-3 w-3" /> Last updated: 29 May 2026
            </span>
            <span className="inline-flex items-center gap-1 bg-surface/90 border border-border/60 px-2.5 py-1 rounded-full">
              <ShieldCheck className="h-3 w-3 text-primary" /> ISO 27001 aligned
            </span>
          </div>
        </div>
      </section>

      {/* Sticky tab switcher */}
      <div className="sticky top-0 z-30 bg-background/85 backdrop-blur border-b border-border/60">
        <div className="max-w-3xl mx-auto px-5 py-3">
          <div className="relative bg-muted/60 rounded-full p-1 flex max-w-sm">
            <span
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-surface shadow-card transition-all duration-300"
              style={{ left: tab === "privacy" ? 4 : "calc(50% + 0px)" }}
            />
            {(["privacy", "terms"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative z-10 flex-1 py-2 text-[13px] font-semibold rounded-full transition-colors inline-flex items-center justify-center gap-1.5 ${
                  tab === t ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {t === "privacy" ? <><ShieldCheck className="h-3.5 w-3.5" /> Privacy</> : <><ScrollText className="h-3.5 w-3.5" /> Terms</>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-5 pt-6 grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-8">
        <main className="space-y-5 min-w-0">
          {sections.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              ref={(el) => { refs.current[s.id] = el; }}
              className="scroll-mt-28 rounded-3xl bg-surface border border-border/60 shadow-card p-6"
            >
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 grid place-items-center rounded-2xl bg-primary-soft text-primary">
                  <s.icon className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Section {String(i + 1).padStart(2, "0")}</p>
                  <h2 className="text-[18px] font-bold text-foreground font-display leading-tight">{s.title}</h2>
                </div>
              </div>
              <div className="mt-5 space-y-4">
                {s.body.map((b, j) => (
                  <div key={j}>
                    {b.heading && (
                      <p className="text-[13px] font-semibold text-foreground mb-1">{b.heading}</p>
                    )}
                    <p className="text-[13.5px] leading-relaxed text-muted-foreground">{b.text}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}

          {/* Contact block */}
          <section className="rounded-3xl overflow-hidden border border-border/60 shadow-card bg-gradient-hero p-6">
            <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Need help?</p>
            <h3 className="mt-1 text-[22px] font-bold text-foreground font-display">We're here for you.</h3>
            <p className="mt-1 text-[13px] text-muted-foreground">Reach out anytime — we usually respond within 24 hours.</p>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <a href="mailto:privacy@doclinks.in" className="group flex items-center gap-3 rounded-2xl bg-surface border border-border/60 p-4 shadow-card transition hover:-translate-y-0.5">
                <span className="h-10 w-10 grid place-items-center rounded-xl bg-primary-soft text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Privacy</p>
                  <p className="text-[13px] font-semibold text-foreground truncate">privacy@doclinks.in</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5" />
              </a>
              <a href="mailto:support@doclinks.in" className="group flex items-center gap-3 rounded-2xl bg-surface border border-border/60 p-4 shadow-card transition hover:-translate-y-0.5">
                <span className="h-10 w-10 grid place-items-center rounded-xl bg-[#e2eeff] text-[#2a4f9c]">
                  <Mail className="h-5 w-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Support</p>
                  <p className="text-[13px] font-semibold text-foreground truncate">support@doclinks.in</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5" />
              </a>
            </div>
          </section>
        </main>

        {/* Floating side nav (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-3">On this page</p>
            <nav className="space-y-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl text-[12.5px] font-medium transition ${
                    active === s.id
                      ? "bg-primary-soft text-primary"
                      : "text-muted-foreground hover:bg-muted/60"
                  }`}
                >
                  <s.icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{s.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>
      </div>

      {/* Mobile quick-links bottom bar */}
      <div className="lg:hidden fixed bottom-4 left-0 right-0 z-40 px-4 pointer-events-none">
        <div className="pointer-events-auto max-w-md mx-auto bg-surface/95 backdrop-blur border border-border/60 shadow-float rounded-full px-2 py-2 flex gap-1 overflow-x-auto no-scrollbar">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-semibold transition ${
                active === s.id ? "bg-gradient-brand text-primary-foreground shadow-glow" : "text-muted-foreground"
              }`}
            >
              <s.icon className="h-3 w-3" />
              {s.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
