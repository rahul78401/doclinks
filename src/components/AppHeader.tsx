import { Bell, ChevronDown, MapPin } from "lucide-react";
import { Logo } from "./Logo";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-border/60">
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <Logo className="h-7" />
        </div>
        <div className="flex items-center gap-2">
          <button className="relative h-10 w-10 grid place-items-center rounded-full bg-surface shadow-card border border-border/60">
            <Bell className="h-[18px] w-[18px] text-foreground" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-surface" />
          </button>
          <div className="h-10 w-10 rounded-full bg-gradient-brand grid place-items-center text-primary-foreground font-semibold text-sm shadow-card">
            AS
          </div>
        </div>
      </div>
      <button className="mx-5 mb-3 flex items-center gap-2 text-left">
        <span className="h-7 w-7 grid place-items-center rounded-full bg-primary-soft">
          <MapPin className="h-3.5 w-3.5 text-primary" />
        </span>
        <div className="leading-tight">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Current location</p>
          <p className="text-sm font-semibold text-foreground flex items-center gap-1">
            Indiranagar, Bengaluru <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </p>
        </div>
      </button>
    </header>
  );
}
