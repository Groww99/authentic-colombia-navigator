import MapCanvas from "@/components/app/MapCanvas";
import { festivals } from "@/data/mock";
import { Flame, Calendar, MapPin } from "lucide-react";

export default function MapPage() {
  return (
    <div className="p-4 md:p-6 h-[calc(100vh-3.5rem)] flex flex-col gap-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-4xl tracking-wider text-foreground leading-none">Mapa cultural</h1>
          <p className="text-sm text-muted-foreground mt-1">Festividades + capa INVIAS + heatmap de ambiente</p>
        </div>
        <div className="hidden md:flex gap-2">
          {["Festividades", "Vías", "Heatmap", "Artesanos"].map((l, i) => (
            <button key={l} className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition ${
              i < 3 ? "bg-primary/15 border-primary/40 text-primary" : "border-border text-muted-foreground hover:bg-muted"
            }`}>{l}</button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-4 flex-1 min-h-0">
        <MapCanvas />
        <aside className="rounded-xl border border-border bg-card p-4 overflow-auto shadow-card">
          <h2 className="font-display text-2xl tracking-wider text-foreground mb-3">En el mapa</h2>
          <div className="space-y-2">
            {festivals.map((f) => (
              <button key={f.id} className="w-full text-left rounded-lg border border-border bg-background/40 p-3 hover:border-primary/50 transition group">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition">{f.name}</p>
                  <span className="flex items-center gap-1 text-xs text-coral"><Flame className="h-3 w-3" /> {f.heat}</span>
                </div>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> {f.town}, {f.department}</p>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(f.startDate).toLocaleDateString('es-CO', { day: '2-digit', month: 'long' })}</p>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
