import { Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin, MessageCircle, Phone, Plus, Users } from "lucide-react";
import type { Clinic } from "@/lib/clinics";

export function ClinicCard({ clinic }: { clinic: Clinic }) {
  return (
    <Link
      to="/clinic/$id"
      params={{ id: clinic.id }}
      className="group block bg-surface rounded-2xl border border-border/60 shadow-card hover:shadow-float transition-all duration-300 overflow-hidden animate-slide-up active:scale-[0.995]"
    >
      <div className="flex gap-3 p-3">
        {/* LEFT — image */}
        <div className="relative w-[104px] h-[104px] shrink-0">
          <div className="absolute inset-0 rounded-xl bg-primary-soft" />
          <img
            src={clinic.image}
            alt={clinic.name}
            loading="lazy"
            width={256}
            height={256}
            className="relative h-full w-full rounded-xl object-cover border border-border/40"
          />
          {clinic.verified && (
            <span className="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-surface grid place-items-center shadow-card border border-border/40">
              <BadgeCheck className="h-3.5 w-3.5 text-primary" />
            </span>
          )}
          <span
            className={`absolute bottom-1.5 left-1.5 inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9.5px] font-semibold backdrop-blur ${
              clinic.openNow ? "bg-success/95 text-success-foreground" : "bg-foreground/80 text-background"
            }`}
          >
            <span className="h-1 w-1 rounded-full bg-current" />
            {clinic.openNow ? "Open" : "Closed"}
          </span>
        </div>

        {/* RIGHT — content */}
        <div className="flex-1 min-w-0 flex flex-col">
          <h3 className="font-display font-bold text-[14.5px] text-foreground leading-tight truncate uppercase tracking-tight">
            {clinic.name}
          </h3>
          <p className="mt-0.5 text-[11.5px] text-muted-foreground leading-snug line-clamp-1">
            {clinic.specialties.join(", ")}
          </p>

          <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Users className="h-3 w-3" /> {clinic.followers} Followers
            </span>
            <span className="text-border">•</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3 text-primary" /> {clinic.distanceKm} km
            </span>
          </div>

          <p className="mt-1 text-[11px] text-muted-foreground leading-snug line-clamp-1">
            {clinic.address}
          </p>

          {/* Specialty chips */}
          <div className="mt-1.5 flex flex-wrap gap-1">
            {clinic.specialties.slice(0, 3).map((s) => (
              <span
                key={s}
                className="text-[9.5px] font-medium px-1.5 py-0.5 rounded-md bg-muted/70 text-foreground/80 border border-border/40"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="px-3 pb-3 flex items-center gap-1.5">
        <button
          onClick={(e) => e.preventDefault()}
          className="flex-1 h-9 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-brand text-primary-foreground text-[12px] font-semibold shadow-glow"
        >
          <Phone className="h-3.5 w-3.5" /> Call Now
        </button>
        <button
          onClick={(e) => e.preventDefault()}
          aria-label="WhatsApp"
          className="h-9 w-9 grid place-items-center rounded-xl bg-success text-success-foreground shadow-card"
        >
          <MessageCircle className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => e.preventDefault()}
          aria-label="Follow"
          className="h-9 w-9 grid place-items-center rounded-xl bg-muted text-foreground border border-border/60"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </Link>
  );
}
