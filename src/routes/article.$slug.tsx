import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, Clock, Heart, Share2, Sparkles } from "lucide-react";
import { articles } from "@/lib/explore";

export const Route = createFileRoute("/article/$slug")({
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = useParams({ from: "/article/$slug" });
  const article = articles.find((a) => a.id === slug) ?? articles[0];
  const related = articles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="sticky top-0 z-40 glass border-b border-border/60">
        <div className="flex items-center justify-between px-5 py-3">
          <Link
            to="/explore"
            className="h-9 w-9 grid place-items-center rounded-full bg-surface shadow-card border border-border/60"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2">
            <button className="h-9 w-9 grid place-items-center rounded-full bg-surface shadow-card border border-border/60">
              <Bookmark className="h-4 w-4" />
            </button>
            <button className="h-9 w-9 grid place-items-center rounded-full bg-surface shadow-card border border-border/60">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <article className="animate-fade-in">
        <div className="relative h-[260px] mx-5 mt-3 rounded-[24px] overflow-hidden">
          <img src={article.cover} alt={article.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <span className="absolute top-3 left-3 rounded-full bg-surface/95 backdrop-blur px-2.5 py-1 text-[10.5px] font-semibold text-foreground">
            {article.category}
          </span>
        </div>

        <div className="px-5 pt-5">
          <h1 className="font-display font-bold text-[26px] leading-[1.15] text-foreground text-balance">
            {article.title}
          </h1>
          <p className="mt-2.5 text-[14px] text-muted-foreground leading-relaxed">{article.excerpt}</p>

          <div className="mt-4 flex items-center justify-between border-y border-border/60 py-3">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-full bg-gradient-brand grid place-items-center text-white text-[12px] font-bold">
                {article.author.name.split(" ")[1]?.[0] ?? "D"}
              </div>
              <div className="leading-tight">
                <p className="text-[13px] font-semibold text-foreground">{article.author.name}</p>
                <p className="text-[11px] text-muted-foreground">{article.author.role}</p>
              </div>
            </div>
            <div className="text-right leading-tight">
              <p className="text-[11px] text-muted-foreground flex items-center gap-1 justify-end">
                <Clock className="h-3 w-3" /> {article.readMins} min read
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{article.date}</p>
            </div>
          </div>

          <div className="mt-5 space-y-4 text-[15px] leading-[1.7] text-foreground/90">
            {article.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-primary/20 bg-primary-soft/50 p-4">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="h-4 w-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Key takeaway</span>
            </div>
            <p className="mt-2 text-[13.5px] font-medium text-foreground leading-relaxed">
              Speak with a verified specialist to personalise these recommendations to your medical history.
            </p>
            <Link
              to="/find-doctors"
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-[12.5px] font-semibold"
            >
              Find a specialist <Heart className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <section className="mt-8 px-5 space-y-3">
          <h2 className="font-display font-bold text-[18px] text-foreground">Related reads</h2>
          <div className="space-y-3">
            {related.map((a) => (
              <Link
                key={a.id}
                to="/article/$slug"
                params={{ slug: a.id }}
                className="flex gap-3 rounded-2xl border border-border/60 bg-surface p-2.5 shadow-card"
              >
                <img src={a.cover} alt={a.title} className="h-[80px] w-[80px] rounded-xl object-cover" loading="lazy" />
                <div className="flex-1 py-1">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">{a.category}</span>
                  <p className="mt-0.5 font-display font-semibold text-[13.5px] text-foreground line-clamp-2">{a.title}</p>
                  <p className="mt-1 text-[10.5px] text-muted-foreground">{a.readMins} min · {a.author.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
