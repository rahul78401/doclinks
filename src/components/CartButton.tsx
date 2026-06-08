import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";

export function CartButton({ variant = "mobile" }: { variant?: "mobile" | "desktop" }) {
  const { count } = useCart();
  return (
    <Link
      to="/cart"
      aria-label={`Open cart (${count} items)`}
      className="relative h-10 w-10 grid place-items-center rounded-full bg-surface shadow-card border border-border/60 hover:bg-muted/60 transition"
    >
      <ShoppingCart className="h-[18px] w-[18px] text-foreground" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-brand text-primary-foreground text-[10px] font-bold grid place-items-center shadow-glow ring-2 ring-surface">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
