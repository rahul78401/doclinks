import { useMemo, useState } from "react";
import {
  Check,
  Crosshair,
  History,
  Search,
  TrendingUp,
  X,
  Bone,
  Smile,
  HeartPulse,
  Brain,
  Stethoscope,
  Scissors,
  Sparkles,
  Activity,
  Microscope,
  ShieldPlus,
  MapPin,
  Building2,
  Landmark,
  TreePine,
  Globe2,
  Languages as LanguagesIcon,
  Star,
} from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

/* ───────── Shared sheet shell ───────── */

function Sheet({
  trigger,
  title,
  subtitle,
  children,
  footer,
}: {
  trigger: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="max-w-md mx-auto rounded-t-[28px] border-border/60 bg-surface">
        <div className="px-5 pt-2 pb-1">
          <h3 className="text-[17px] font-display font-bold text-foreground">{title}</h3>
          {subtitle && (
            <p className="text-[12px] text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        <div className="px-5 pb-4 max-h-[70vh] overflow-y-auto">{children}</div>
        {footer && (
          <div className="px-5 pt-2 pb-6 border-t border-border/60 bg-surface">
            {footer}
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}

/* ───────── Location ───────── */

type LocItem = { label: string; sub?: string; icon: React.ComponentType<{ className?: string }> };

const POPULAR_LOCATIONS: LocItem[] = [
  { label: "Indiranagar", sub: "Bengaluru", icon: Landmark },
  { label: "Koramangala", sub: "Bengaluru", icon: Building2 },
  { label: "Whitefield", sub: "Bengaluru", icon: TreePine },
  { label: "HSR Layout", sub: "Bengaluru", icon: Landmark },
  { label: "Jayanagar", sub: "Bengaluru", icon: TreePine },
  { label: "Bandra West", sub: "Mumbai", icon: Building2 },
  { label: "Andheri", sub: "Mumbai", icon: Building2 },
  { label: "Vasant Kunj", sub: "New Delhi", icon: Landmark },
  { label: "Navrangpura", sub: "Ahmedabad", icon: Landmark },
  { label: "Satellite", sub: "Ahmedabad", icon: TreePine },
  { label: "SG Highway", sub: "Ahmedabad", icon: Building2 },
  { label: "Gandhinagar", sub: "Gujarat", icon: Landmark },
];

const RECENT_LOCATIONS: LocItem[] = [
  { label: "Indiranagar, Bengaluru", icon: History },
  { label: "Navrangpura, Ahmedabad", icon: History },
];

export function LocationSheet({
  value,
  onChange,
  trigger,
}: {
  value: string;
  onChange: (v: string) => void;
  trigger: React.ReactNode;
}) {
  const [q, setQ] = useState("");
  const list = useMemo(
    () =>
      POPULAR_LOCATIONS.filter((l) =>
        (l.label + " " + (l.sub ?? "")).toLowerCase().includes(q.toLowerCase()),
      ),
    [q],
  );

  return (
    <Sheet
      trigger={trigger}
      title="Choose location"
      subtitle="Search area, neighbourhood or city"
    >
      <SearchInput value={q} onChange={setQ} placeholder="Search locality or city" />

      <button
        onClick={() => onChange("Near me")}
        className="mt-3 w-full flex items-center gap-3 rounded-2xl bg-primary-soft text-primary px-4 py-3 font-semibold text-[13px]"
      >
        <span className="h-9 w-9 grid place-items-center rounded-xl bg-surface text-primary shadow-card">
          <Crosshair className="h-4 w-4" />
        </span>
        <span className="flex-1 text-left">
          Use current location
          <span className="block text-[11px] font-medium text-primary/70">
            Allow GPS access
          </span>
        </span>
      </button>

      {!q && (
        <Section title="Recent" icon={<History className="h-3.5 w-3.5" />}>
          <div className="space-y-1">
            {RECENT_LOCATIONS.map((l) => (
              <LocRow key={l.label} item={l} selected={value === l.label} onClick={() => onChange(l.label)} />
            ))}
          </div>
        </Section>
      )}

      <Section title={q ? "Results" : "Popular nearby"} icon={<Star className="h-3.5 w-3.5" />}>
        <div className="space-y-1">
          {list.map((l) => (
            <LocRow
              key={l.label}
              item={l}
              selected={value.startsWith(l.label)}
              onClick={() => onChange(`${l.label}${l.sub ? `, ${l.sub}` : ""}`)}
            />
          ))}
        </div>
        {q && list.length === 0 && (
          <p className="text-[12.5px] text-muted-foreground py-6 text-center">
            No matches for &ldquo;{q}&rdquo;
          </p>
        )}
      </Section>
    </Sheet>
  );
}

function LocRow({
  item,
  selected,
  onClick,
}: {
  item: LocItem;
  selected: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-all ${
        selected ? "bg-primary-soft" : "hover:bg-muted/70"
      }`}
    >
      <span
        className={`h-9 w-9 grid place-items-center rounded-xl ${
          selected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="flex-1 min-w-0">
        <p className={`text-[13.5px] font-semibold truncate ${selected ? "text-primary" : "text-foreground"}`}>
          {item.label}
        </p>
        {item.sub && (
          <p className="text-[11px] text-muted-foreground truncate">{item.sub}</p>
        )}
      </div>
      {selected && <Check className="h-4 w-4 text-primary" />}
    </button>
  );
}

/* ───────── Gender ───────── */

export function GenderSegmented({
  value,
  onChange,
}: {
  value: "Any" | "Male" | "Female";
  onChange: (v: "Any" | "Male" | "Female") => void;
}) {
  const opts = ["Any", "Male", "Female"] as const;
  return (
    <div className="inline-flex p-1 rounded-full bg-muted border border-border/60">
      {opts.map((o) => {
        const active = value === o;
        return (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
              active
                ? "bg-foreground text-background shadow-card"
                : "text-muted-foreground"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

/* ───────── Language ───────── */

type LangItem = { label: string; native: string; popular?: boolean };

const LANGUAGES: LangItem[] = [
  { label: "English", native: "English", popular: true },
  { label: "Hindi", native: "हिन्दी", popular: true },
  { label: "Tamil", native: "தமிழ்", popular: true },
  { label: "Telugu", native: "తెలుగు", popular: true },
  { label: "Kannada", native: "ಕನ್ನಡ", popular: true },
  { label: "Malayalam", native: "മലയാളം", popular: true },
  { label: "Marathi", native: "मराठी", popular: true },
  { label: "Gujarati", native: "ગુજરાતી", popular: true },
  { label: "Bengali", native: "বাংলা" },
  { label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { label: "Urdu", native: "اردو" },
  { label: "Odia", native: "ଓଡ଼ିଆ" },
  { label: "Assamese", native: "অসমীয়া" },
];

export function LanguageSheet({
  selected,
  onChange,
  trigger,
}: {
  selected: string[];
  onChange: (v: string[]) => void;
  trigger: React.ReactNode;
}) {
  const [q, setQ] = useState("");
  const [local, setLocal] = useState<string[]>(selected);
  const filtered = LANGUAGES.filter((l) =>
    (l.label + " " + l.native).toLowerCase().includes(q.toLowerCase()),
  );
  const popular = filtered.filter((l) => l.popular);
  const rest = filtered.filter((l) => !l.popular);
  const toggle = (l: string) =>
    setLocal((s) => (s.includes(l) ? s.filter((x) => x !== l) : [...s, l]));

  return (
    <Sheet
      trigger={trigger}
      title="Languages spoken"
      subtitle="Pick one or more languages"
      footer={
        <div className="flex gap-2">
          <button
            onClick={() => setLocal([])}
            className="flex-1 h-11 rounded-2xl bg-muted text-foreground font-semibold text-[13px]"
          >
            Clear
          </button>
          <button
            onClick={() => onChange(local)}
            className="flex-[2] h-11 rounded-2xl bg-gradient-brand text-primary-foreground font-semibold text-[13px] shadow-glow"
          >
            Apply{local.length ? ` · ${local.length}` : ""}
          </button>
        </div>
      }
    >
      <SearchInput value={q} onChange={setQ} placeholder="Search language" />

      {!q && (
        <Section title="Popular in India" icon={<LanguagesIcon className="h-3.5 w-3.5" />}>
          <LangGrid items={popular} selected={local} onToggle={toggle} />
        </Section>
      )}

      {(q || rest.length > 0) && (
        <Section title={q ? "Results" : "All languages"} icon={<Globe2 className="h-3.5 w-3.5" />}>
          <LangGrid items={q ? filtered : rest} selected={local} onToggle={toggle} />
        </Section>
      )}
    </Sheet>
  );
}

function LangGrid({
  items,
  selected,
  onToggle,
}: {
  items: LangItem[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((l) => {
        const active = selected.includes(l.label);
        return (
          <button
            key={l.label}
            onClick={() => onToggle(l.label)}
            className={`flex items-center gap-2.5 rounded-2xl border px-3 py-2.5 text-left transition-all ${
              active
                ? "bg-foreground text-background border-foreground"
                : "bg-surface text-foreground border-border/60"
            }`}
          >
            <span
              className={`h-8 w-8 grid place-items-center rounded-lg text-[13px] font-display font-bold ${
                active ? "bg-background/15 text-background" : "bg-primary-soft text-primary"
              }`}
            >
              {l.native.slice(0, 2)}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] font-semibold truncate">{l.label}</p>
              <p className={`text-[10.5px] truncate ${active ? "text-background/70" : "text-muted-foreground"}`}>
                {l.native}
              </p>
            </div>
            {active && <Check className="h-3.5 w-3.5" />}
          </button>
        );
      })}
    </div>
  );
}

/* ───────── Treatments ───────── */

type Cat = { name: string; icon: React.ComponentType<{ className?: string }>; items: string[] };

const TREATMENT_CATEGORIES: Cat[] = [
  {
    name: "Orthopedic & Pain",
    icon: Bone,
    items: [
      "Ankle Pain",
      "Arthritis",
      "Frozen Shoulder",
      "Sciatica",
      "Sports Injury",
      "Back Pain",
      "Knee Pain",
      "Neck Pain",
    ],
  },
  {
    name: "Dental Care",
    icon: Smile,
    items: ["Cosmetic Dentistry", "Root Canals", "Dental X-Rays"],
  },
  { name: "Cardiology", icon: HeartPulse, items: ["Heart Care Centre", "Angioplasty", "ECG"] },
  { name: "Mental Health", icon: Brain, items: ["Psychiatry", "Mental Health"] },
  {
    name: "Oncology",
    icon: ShieldPlus,
    items: ["Cancer Care", "Chemotherapy", "Immunotherapy", "Hormone Therapy"],
  },
  { name: "Dermatology", icon: Sparkles, items: ["Dermatology & Cosmetology", "Acne Treatment", "Laser"] },
  {
    name: "Surgery",
    icon: Scissors,
    items: ["General Surgery", "Laparoscopic Surgery", "Tumor Removal", "Liver Transplant"],
  },
  {
    name: "Neurology",
    icon: Brain,
    items: ["Neurology", "Neurosurgery", "Parkinson's Disease", "Paralysis"],
  },
  {
    name: "Physiotherapy",
    icon: Activity,
    items: ["Physiotherapy Treatment", "Joint Replacement Rehab"],
  },
];

const TRENDING_TREATMENTS = ["Hair Transplant", "IVF", "Knee Replacement", "Heart Checkup"];
const RECENT_TREATMENTS = ["Acne Treatment", "Back Pain"];

export function TreatmentSheet({
  selected,
  onChange,
  trigger,
}: {
  selected: string[];
  onChange: (v: string[]) => void;
  trigger: React.ReactNode;
}) {
  const [q, setQ] = useState("");
  const [local, setLocal] = useState<string[]>(selected);
  const toggle = (t: string) =>
    setLocal((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  const filteredCats = useMemo(() => {
    if (!q) return TREATMENT_CATEGORIES;
    const needle = q.toLowerCase();
    return TREATMENT_CATEGORIES.map((c) => ({
      ...c,
      items: c.items.filter((i) => i.toLowerCase().includes(needle)),
    })).filter((c) => c.items.length);
  }, [q]);

  return (
    <Sheet
      trigger={trigger}
      title="Treatments"
      subtitle="Search by condition, procedure or specialty"
      footer={
        <div className="flex gap-2">
          <button
            onClick={() => setLocal([])}
            className="flex-1 h-11 rounded-2xl bg-muted text-foreground font-semibold text-[13px]"
          >
            Clear
          </button>
          <button
            onClick={() => onChange(local)}
            className="flex-[2] h-11 rounded-2xl bg-gradient-brand text-primary-foreground font-semibold text-[13px] shadow-glow"
          >
            Apply{local.length ? ` · ${local.length}` : ""}
          </button>
        </div>
      }
    >
      <SearchInput value={q} onChange={setQ} placeholder="Search treatments" />

      {!q && (
        <>
          <Section title="Recent" icon={<History className="h-3.5 w-3.5" />}>
            <ChipRow items={RECENT_TREATMENTS} selected={local} onToggle={toggle} />
          </Section>
          <Section title="Trending" icon={<TrendingUp className="h-3.5 w-3.5" />}>
            <ChipRow items={TRENDING_TREATMENTS} selected={local} onToggle={toggle} />
          </Section>
        </>
      )}

      <div className="mt-4 space-y-4">
        {filteredCats.map((cat) => (
          <div key={cat.name}>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-7 w-7 grid place-items-center rounded-lg bg-primary-soft text-primary">
                <cat.icon className="h-4 w-4" />
              </span>
              <p className="text-[12.5px] font-display font-semibold text-foreground">
                {cat.name}
              </p>
            </div>
            <ChipRow items={cat.items} selected={local} onToggle={toggle} />
          </div>
        ))}
      </div>
    </Sheet>
  );
}

/* ───────── Specialty (still used by quick-pick rail on listing) ───────── */

const SPECIALTIES = [
  { label: "Dermatologist", icon: Sparkles },
  { label: "Dentist", icon: Smile },
  { label: "Cardiologist", icon: HeartPulse },
  { label: "Gynecologist", icon: Stethoscope },
  { label: "Orthopedic", icon: Bone },
  { label: "Pediatrician", icon: Stethoscope },
  { label: "Hair Specialist", icon: Sparkles },
  { label: "Neurologist", icon: Brain },
  { label: "Oncologist", icon: ShieldPlus },
  { label: "Pathologist", icon: Microscope },
];

export const SPECIALTY_LIST = SPECIALTIES;

/* ───────── Building blocks ───────── */

function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="flex items-center gap-2 bg-muted/70 rounded-2xl border border-border/60 px-3.5 py-2.5">
      <Search className="h-4 w-4 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="h-6 w-6 grid place-items-center rounded-full bg-surface text-muted-foreground"
          aria-label="Clear"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
        {icon}
        {title}
      </p>
      {children}
    </div>
  );
}

function ChipRow({
  items,
  selected,
  onToggle,
}: {
  items: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => {
        const active = selected.includes(t);
        return (
          <button
            key={t}
            onClick={() => onToggle(t)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold border transition-all ${
              active
                ? "bg-foreground text-background border-foreground"
                : "bg-surface text-foreground border-border/60"
            }`}
          >
            {active && <Check className="h-3.5 w-3.5" />}
            {t}
          </button>
        );
      })}
    </div>
  );
}

/* Backwards-compat export — find-doctors no longer renders this chip but other
   places may import it. Re-export as a no-op wrapper around the trigger. */
export function SpecialtySheet({ trigger }: { trigger: React.ReactNode; selected?: string[]; onChange?: (v: string[]) => void }) {
  return <>{trigger}</>;
}

/* unused helper kept for compatibility */
export const _MapPin = MapPin;
