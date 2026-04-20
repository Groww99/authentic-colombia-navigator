import { roads } from "@/data/mock";
import { Spline, RefreshCcw } from "lucide-react";

const badge: Record<string, string> = {
  open: "bg-secondary/20 text-secondary-foreground border-secondary/40",
  partial: "bg-gold/20 text-gold border-gold/40",
  closed: "bg-destructive/20 text-destructive border-destructive/40",
};
const label: Record<string, string> = { open: "Abierta", partial: "Parcial", closed: "Cerrada" };

export default function Roads() {
  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto">
      <header className="flex items-end justify-between">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/20 border border-secondary/30 px-3 py-1 text-xs font-semibold text-secondary-foreground">
            <Spline className="h-3 w-3" /> datos.gov.co · INVIAS
          </span>
          <h1 className="font-display text-5xl tracking-wider text-foreground leading-none">Estado de Vías</h1>
          <p className="text-muted-foreground">GeoJSON sincronizado para que ningún viajero quede varado.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:border-primary/50 transition">
          <RefreshCcw className="h-4 w-4" /> Sincronizar
        </button>
      </header>

      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-left p-3">Vía</th>
              <th className="text-left p-3 hidden md:table-cell">Tramo</th>
              <th className="text-left p-3">Estado</th>
              <th className="text-left p-3 hidden sm:table-cell">Actualizado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {roads.map((r) => (
              <tr key={r.id} className="hover:bg-muted/20 transition">
                <td className="p-3 font-medium text-foreground">{r.name}</td>
                <td className="p-3 text-muted-foreground hidden md:table-cell">{r.from} → {r.to}</td>
                <td className="p-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${badge[r.status]}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      r.status === "open" ? "bg-secondary" : r.status === "partial" ? "bg-gold" : "bg-destructive"
                    }`} />
                    {label[r.status]}
                  </span>
                </td>
                <td className="p-3 text-muted-foreground text-xs hidden sm:table-cell">{r.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
