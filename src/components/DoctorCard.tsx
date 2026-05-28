import { Link } from "@tanstack/react-router";
import { BadgeCheck, Heart, MessageCircle, Phone, Share2, Star } from "lucide-react";
import { formatFee, type Doctor } from "@/lib/doctors";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const hasFee = typeof doctor.fee === "number";

  return (
    <Link
      to="/doctor/$id"
      params={{ id: doctor.id }}
      className="block bg-surface rounded-3xl border border-border/60 shadow-card hover:shadow-float transition-shadow p-4 animate-slide-up"
    >
      <div className="flex gap-4">
        <div className="relative shrink-0">
          <div className="p-[3px] rounded-2xl bg-gradient-to-br from-primary-soft via-background to-border/60">
            <img
              src={doctor.image}
              alt={doctor.name}
              loading="lazy"
              width={104}
              height={104}
              className="h-[104px] w-[104px] rounded-[14px] object-cover ring-1 ring-border/60"
            />
          </div>
          {doctor.verified && (
            <span className="absolute -bottom-1.5 -right-1.5 h-7 w-7 bg-surface rounded-full grid place-items-center shadow-card ring-2 ring-surface">
              <BadgeCheck className="h-[18px] w-[18px] text-primary" />
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-display font-semibold text-[15px] text-foreground truncate">
                {doctor.name}
              </h3>
              <p className="text-[12.5px] text-muted-foreground truncate">
                {doctor.specialty} · {doctor.subSpecialty}
              </p>
            </div>
            <div className="flex items-center gap-1 bg-primary-soft text-primary px-2 py-1 rounded-full shrink-0">
              <Star className="h-3 w-3 fill-primary" />
              <span className="text-[11px] font-semibold">{doctor.rating}</span>
            </div>
          </div>

          <p className="mt-1 text-[12px] text-muted-foreground truncate">
            {doctor.clinic} · {doctor.location}
          </p>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {doctor.badges.slice(0, 2).map((b) => (
              <span
                key={b}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent text-accent-foreground"
              >
                {b}
              </span>
            ))}
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {doctor.experience}+ yrs
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 rounded-2xl bg-muted/60 p-2.5">
        <Stat label="Recommend" value={`${doctor.recommendation}%`} />
        <Stat label="Followers" value={doctor.followers} />
        <Stat label="Reviews" value={`${doctor.reviews}`} />
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10.5px] text-muted-foreground uppercase tracking-wider font-medium">
            {hasFee ? "Consultation fee" : "Consultation"}
          </p>
          <p className="text-[15px] font-display font-bold text-foreground truncate">
            {formatFee(doctor.fee)}
            <span className="ml-2 text-[10.5px] font-medium text-muted-foreground">
              {doctor.availableToday ? `Avl. ${doctor.nextSlot}` : doctor.nextSlot}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <IconBtn label="Save"><Heart className="h-4 w-4" /></IconBtn>
          <IconBtn label="Share"><Share2 className="h-4 w-4" /></IconBtn>
          <button
            onClick={(e) => e.preventDefault()}
            className="h-9 w-9 grid place-items-center rounded-full bg-success text-success-foreground shadow-card"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => e.preventDefault()}
            className="h-9 px-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-brand text-primary-foreground text-[12px] font-semibold shadow-glow"
            aria-label="Call"
          >
            <Phone className="h-3.5 w-3.5" /> Call
          </button>
        </div>
      </div>
    </Link>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-[13px] font-display font-bold text-foreground leading-none">{value}</p>
      <p className="text-[10px] text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function IconBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      onClick={(e) => e.preventDefault()}
      aria-label={label}
      className="h-9 w-9 grid place-items-center rounded-full bg-surface border border-border text-muted-foreground"
    >
      {children}
    </button>
  );
}
