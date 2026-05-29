import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Download, Share2, Sparkles, Star } from "lucide-react";
import { magazines, articles } from "@/lib/explore";

export const Route = createFileRoute("/magazine/$id")({
  component: MagazinePage,
});

function MagazinePage() {
  const { id } = useParams({ from: "/magazine/$id" });
  const mag = magazines.find((m) => m.id === id) ?? magazines[0];
  const highlights = articles.slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="sticky top-0 z-40 glass border-b border-border/60">
        <div className="flex items-center justify-between px-5 py-3">
          <Link to="/explore" className="h-9 w-9 grid place-items-center rounded-full bg-surface shadow-card border border-border/60">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <button className="h-9 w-9 grid place-items-center rounded-full bg-surface shadow-card border border-border/60">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </header>

      <section className={`px-5 pt-4 pb-8 bg-gradient-to-b ${mag.tint}`}>
        <p className="text-[10.5px] uppercase tracking-wider font-semibold text-primary">{mag.topic} · {mag.issue}</p>
        <h1 className="mt-1 font-display font-bold text-[26px] leading-tight text-foreground">{mag.title}</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">{mag.date} · {mag.pages} pages</p>

        <div className="mt-5 mx-auto w-[68%] aspect-[3/4] rounded-2xl overflow-hidden shadow-float">
          <img src={mag.cover} alt={mag.title} className="h-full w-full object-cover" />
        </div>

        <div className="mt-5 flex gap-2">
          <button className="flex-1 h-11 rounded-full bg-foreground text-background text-[13px] font-semibold inline-flex items-center justify-center gap-1.5">
            <BookOpen className="h-4 w-4" /> Read Issue
          </button>
          <button className="h-11 px-4 rounded-full bg-surface border border-border text-[13px] font-semibold inline-flex items-center gap-1.5">
            <Download className="h-4 w-4" /> PDF
          </button>
        </div>
      </section>

      <section className="px-5 pt-6 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h2 className="font-display font-bold text-[18px] text-foreground">Inside this issue</h2>
        </div>
        <div className="space-y-3">
          {highlights.map((a, i) => (
            <Link
              key={a.id}
              to="/article/$slug"
              params={{ slug: a.id }}
              className="flex gap-3 rounded-2xl border border-border/60 bg-surface p-2.5 shadow-card"
            >
              <span className="shrink-0 h-[80px] w-[80px] rounded-xl bg-primary-soft text-primary grid place-items-center font-display font-bold text-[20px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 py-1">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">{a.category}</span>
                <p className="mt-0.5 font-display font-semibold text-[13.5px] text-foreground line-clamp-2">{a.title}</p>
                <p className="mt-1 text-[10.5px] text-muted-foreground">{a.readMins} min · {a.author.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 pt-8 space-y-3">
        <h2 className="font-display font-bold text-[18px] text-foreground">Featured contributors</h2>
        <div className="grid grid-cols-3 gap-2.5">
          {articles.slice(0, 3).map((a) => (
            <div key={a.id} className="rounded-2xl border border-border/60 bg-surface p-3 text-center shadow-card">
              <div className="mx-auto h-12 w-12 rounded-full bg-gradient-brand grid place-items-center text-white font-bold">
                {a.author.name.split(" ")[1]?.[0]}
              </div>
              <p className="mt-2 font-display font-semibold text-[12px] text-foreground leading-tight">{a.author.name}</p>
              <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{a.author.role.split("·")[0]}</p>
              <div className="mt-1.5 flex items-center justify-center gap-0.5 text-[10px] text-warning">
                <Star className="h-3 w-3 fill-current" /> 4.9
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
