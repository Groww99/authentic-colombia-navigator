import { stats, festivals, roads, integrations } from "@/data/mock";
import { Calendar, MapPin, Spline, Sparkles, ArrowUpRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import FestivalCard from "@/components/app/FestivalCard";

const cards = [
  { label: "Festividades activas", value: stats.festivals, icon: Calendar, accent: "text-primary", bg: "bg-primary/10" },
  { label: "Pueblos cubiertos", value: stats.towns, icon: MapPin, accent: "text-coral", bg: "bg-coral/10" },
  { label: "Vías monitoreadas", value: stats.roadsMonitored, icon: Spline, accent: "text-jungle", bg: "bg-secondary/15" },
  { label: "Scrapeadas esta semana", value: stats.scrapedThisWeek, icon: Sparkles, accent: "text-gold", bg: "bg-gold/10" },
];

export default function Dashboard() {
  return (
    <div className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-hero p-6 md:p-10 shadow-card">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-sun opacity-30 blur-3xl animate-float" />
        <div className="relative max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 border border-primary/30 px-3 py-1 text-xs font-semibold text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            v0.1 · Demo en vivo
          </span>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider text-foreground leading-none text-balance">
            Descubre la Colombia <span className="text-primary">auténtica</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl">
            NomadAp orquesta IA, mapas inteligentes y datos abiertos para visibilizar las festividades de los pueblos categoría 4 a 6.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/mapa" className="inline-flex items-center gap-2 rounded-lg bg-sun px-5 py-3 font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition">
              Abrir mapa <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/asistente" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 backdrop-blur px-5 py-3 font-semibold text-foreground hover:bg-card transition">
              <Sparkles className="h-4 w-4 text-primary" /> Hablar con la IA
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className={`inline-flex p-2 rounded-lg ${c.bg} ${c.accent} mb-3`}>
              <c.icon className="h-4 w-4" />
            </div>
            <p className="font-display text-4xl tracking-wider text-foreground leading-none">{c.value}</p>
            <p className="text-xs text-muted-foreground mt-1.5">{c.label}</p>
            <p className="text-[10px] text-secondary-foreground mt-2 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +12% mes</p>
          </div>
        ))}
      </section>

      {/* Festivities + roads */}
      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl tracking-wider text-foreground">Próximas fiestas</h2>
              <p className="text-sm text-muted-foreground">Curadas con FONTUR, MinCultura y scraping IA</p>
            </div>
            <Link to="/festividades" className="text-xs text-primary hover:underline">Ver todas →</Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {festivals.slice(0, 4).map((f) => <FestivalCard key={f.id} f={f} />)}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="font-display text-3xl tracking-wider text-foreground">Vías ahora</h2>
            <p className="text-sm text-muted-foreground">Datos INVIAS en tiempo real</p>
          </div>
          <div className="rounded-xl border border-border bg-card divide-y divide-border shadow-card">
            {roads.map((r) => (
              <div key={r.id} className="p-3 flex items-center gap-3">
                <span className={`h-2 w-2 rounded-full shrink-0 ${
                  r.status === "open" ? "bg-secondary" : r.status === "partial" ? "bg-gold" : "bg-destructive"
                }`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">{r.name}</p>
                  <p className="text-[11px] text-muted-foreground">{r.updatedAt}</p>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">{r.status}</span>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-display text-2xl tracking-wider text-foreground mt-6 mb-2">Integraciones</h2>
            <div className="grid grid-cols-4 gap-2">
              {integrations.slice(0, 8).map((i) => (
                <div key={i.id} title={i.name} className="aspect-square rounded-lg border border-border bg-card grid place-items-center text-2xl hover:border-primary/50 transition">
                  {i.icon}
                </div>
              ))}
            </div>
            <Link to="/integraciones" className="text-xs text-primary hover:underline mt-2 inline-block">Conectar más →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
