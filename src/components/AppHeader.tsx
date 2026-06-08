import { ChevronDown, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { CartButton } from "./CartButton";

export function AppHeader() {
  return (
    <header className="lg:hidden sticky top-0 z-40 glass border-b border-border/60">
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <Logo className="h-7" />
        </div>
        <div className="flex items-center gap-2">
          <CartButton />
          <Link
            to="/account"
            aria-label="Open your account"
            className="h-10 w-10 rounded-full bg-gradient-brand grid place-items-center text-primary-foreground font-semibold text-sm shadow-card transition-transform active:scale-95"
          >
            AS
          </Link>
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
