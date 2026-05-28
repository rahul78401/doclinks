import type { LucideIcon } from "lucide-react";

export function TabPlaceholder({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="px-5 pt-2 pb-12">
      <h1 className="text-[24px] font-display font-bold text-foreground">{title}</h1>
      <p className="text-[12.5px] text-muted-foreground">Coming up next on DocLinks</p>

      <div className="mt-6 rounded-3xl bg-gradient-hero p-6 shadow-card border border-border/60 text-center">
        <span className="inline-grid place-items-center h-16 w-16 rounded-2xl bg-surface shadow-card mx-auto">
          <Icon className="h-7 w-7 text-primary" />
        </span>
        <h2 className="mt-4 text-[18px] font-display font-bold text-foreground">{title} hub</h2>
        <p className="mt-2 text-[13px] text-muted-foreground max-w-xs mx-auto">{description}</p>
        <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2.5 text-sm font-semibold shadow-card">
          Notify me
        </button>
      </div>
    </div>
  );
}
