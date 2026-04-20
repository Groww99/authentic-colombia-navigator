import { Festival } from "@/data/mock";
import { Calendar, MapPin, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const sourceColor: Record<string, string> = {
  FONTUR: "bg-secondary/20 text-secondary-foreground border-secondary/40",
  MinCultura: "bg-primary/20 text-primary border-primary/40",
  Alcaldía: "bg-accent/20 text-accent-foreground border-accent/40",
  Firecrawl: "bg-coral/20 text-coral border-coral/40",
};

export default function FestivalCard({ f }: { f: Festival }) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary/50 transition-all hover:-translate-y-0.5 shadow-card">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={f.cover} alt={f.name} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge className={`${sourceColor[f.source]} border text-[10px]`}>{f.source}</Badge>
          <Badge className="bg-deep/80 backdrop-blur border-border text-foreground text-[10px]">Cat. {f.category}</Badge>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-deep/80 backdrop-blur px-2 py-1 text-xs font-semibold text-coral">
          <Flame className="h-3 w-3" /> {f.heat}
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-display text-2xl tracking-wider text-foreground leading-none">{f.name}</h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {f.town}, {f.department}</span>
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(f.startDate).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}</span>
        </div>
        <div className="flex flex-wrap gap-1 pt-1">
          {f.tags.map((t) => (
            <span key={t} className="text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded px-1.5 py-0.5">{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
