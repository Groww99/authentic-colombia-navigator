import { integrations } from "@/data/mock";
import { Plug, Check, Plus, Clock } from "lucide-react";

const statusBadge: Record<string, { cls: string; text: string; icon: any }> = {
  connected: { cls: "bg-secondary/20 text-secondary-foreground border-secondary/40", text: "Conectado", icon: Check },
  available: { cls: "bg-primary/15 text-primary border-primary/40", text: "Disponible", icon: Plus },
  soon: { cls: "bg-muted text-muted-foreground border-border", text: "Pronto", icon: Clock },
};

const categories = ["Mapas", "IA", "Datos", "Scraping", "Backend"] as const;

export default function Integrations() {
  return (
    <div className="p-4 md:p-8 space-y-8 max-w-6xl mx-auto">
      <header className="space-y-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/15 border border-coral/30 px-3 py-1 text-xs font-semibold text-coral">
          <Plug className="h-3 w-3" /> Arquitectura abierta
        </span>
        <h1 className="font-display text-5xl tracking-wider text-foreground leading-none">Integraciones</h1>
        <p className="text-muted-foreground max-w-2xl">
          NomadAp está diseñada para orquestar tecnología de punta. Conecta más herramientas a medida que la app crece.
        </p>
      </header>

      {categories.map((cat) => (
        <section key={cat} className="space-y-3">
          <h2 className="font-display text-2xl tracking-wider text-foreground">{cat}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.filter((i) => i.category === cat).map((i) => {
              const st = statusBadge[i.status];
              const Icon = st.icon;
              return (
                <article key={i.id} className="rounded-xl border border-border bg-card p-5 shadow-card hover:border-primary/40 transition group">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="h-12 w-12 rounded-xl bg-muted/40 grid place-items-center text-2xl">{i.icon}</div>
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${st.cls}`}>
                      <Icon className="h-3 w-3" /> {st.text}
                    </span>
                  </div>
                  <h3 className="font-display text-xl tracking-wider text-foreground">{i.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{i.description}</p>
                  <button
                    disabled={i.status === "soon"}
                    className="mt-4 w-full rounded-lg bg-muted/40 hover:bg-primary hover:text-primary-foreground text-foreground text-sm font-semibold py-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {i.status === "connected" ? "Configurar" : i.status === "available" ? "Conectar" : "En camino"}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
