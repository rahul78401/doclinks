import { Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  Bookmark,
  HeartPulse,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import type { Hospital } from "@/lib/hospitals";

export function HospitalCard({ hospital }: { hospital: Hospital }) {
  return (
    <Link
      to="/hospital/$id"
      params={{ id: hospital.id }}
      className="block bg-surface rounded-3xl border border-border/60 shadow-card hover:shadow-float transition-shadow overflow-hidden animate-slide-up"
    >
      {/* Image header */}
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={hospital.cover}
          alt={hospital.name}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {hospital.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-surface/95 backdrop-blur px-2 py-0.5 text-[10px] font-semibold text-primary shadow-card">
              <BadgeCheck className="h-3 w-3" /> Verified
            </span>
          )}
          {hospital.accreditations.slice(0, 1).map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-1 rounded-full bg-foreground/85 backdrop-blur px-2 py-0.5 text-[10px] font-semibold text-background"
            >
              <ShieldCheck className="h-3 w-3" /> {a}
            </span>
          ))}
        </div>

        {/* Top-right save */}
        <button
          onClick={(e) => e.preventDefault()}
          aria-label="Save"
          className="absolute top-3 right-3 h-8 w-8 grid place-items-center rounded-full bg-surface/90 backdrop-blur text-foreground shadow-card"
        >
          <Bookmark className="h-4 w-4" />
        </button>

        {/* Bottom-left status */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold backdrop-blur ${
              hospital.openNow
                ? "bg-success/95 text-success-foreground"
                : "bg-foreground/80 text-background"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-soft" />
            {hospital.openNow ? "Open now" : "Closed"}
          </span>
          {hospital.emergency && (
            <span className="inline-flex items-center gap-1 rounded-full bg-surface/95 backdrop-blur px-2 py-0.5 text-[10px] font-semibold text-foreground">
              <HeartPulse className="h-3 w-3 text-destructive" /> 24×7 ER
            </span>
          )}
        </div>

        {/* Bottom-right rating */}
        <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-surface/95 backdrop-blur px-2 py-0.5 text-[11px] font-semibold text-foreground shadow-card">
          <Star className="h-3 w-3 fill-warning text-warning" />
          {hospital.stats.rating}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-[15.5px] text-foreground truncate">
              {hospital.name}
            </h3>
            <p className="text-[12px] text-muted-foreground mt-0.5 truncate">
              {hospital.type} · Since {hospital.established}
            </p>
          </div>
        </div>

        <div className="mt-1.5 flex items-center gap-1 text-[12px] text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span className="truncate">
            {hospital.location} · {hospital.city}
          </span>
        </div>

        {/* Services preview */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {hospital.services.slice(0, 4).map((s) => (
            <span
              key={s}
              className="text-[10.5px] font-medium px-2 py-0.5 rounded-full bg-primary-soft/70 text-primary"
            >
              {s}
            </span>
          ))}
          {hospital.services.length > 4 && (
            <span className="text-[10.5px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              +{hospital.services.length - 4} more
            </span>
          )}
        </div>

        {/* Stats row */}
        <div className="mt-3 grid grid-cols-3 gap-2 rounded-2xl bg-muted/60 p-2.5">
          <Stat icon={<Stethoscope className="h-3.5 w-3.5" />} value={`${hospital.stats.doctors}+`} label="Doctors" />
          <Stat icon={<ShieldCheck className="h-3.5 w-3.5" />} value={`${hospital.stats.experience}y`} label="Trusted" />
          <Stat icon={<Users className="h-3.5 w-3.5" />} value={hospital.stats.followers} label="Followers" />
        </div>

        {/* CTAs */}
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={(e) => e.preventDefault()}
            className="flex-1 h-10 inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-brand text-primary-foreground text-[12.5px] font-semibold shadow-glow"
          >
            <Phone className="h-3.5 w-3.5" /> Call Now
          </button>
          <button
            onClick={(e) => e.preventDefault()}
            aria-label="WhatsApp"
            className="h-10 w-10 grid place-items-center rounded-full bg-success text-success-foreground shadow-card"
          >
            <MessageCircle className="h-4 w-4" />
          </button>
          <span className="h-10 px-3.5 inline-flex items-center justify-center gap-1.5 rounded-full bg-surface border border-border/60 text-foreground text-[12px] font-semibold">
            View Profile
          </span>
        </div>
      </div>
    </Link>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-1 text-foreground">
        <span className="text-primary">{icon}</span>
        <p className="text-[12.5px] font-display font-bold leading-none">{value}</p>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
