import { festivals, roads } from "@/data/mock";
import { MapPin, Layers, Plus, Minus, Compass } from "lucide-react";

// Bounding box approx Colombia
const minLng = -79, maxLng = -67, minLat = -4.2, maxLat = 13;
const project = (lat: number, lng: number) => ({
  x: ((lng - minLng) / (maxLng - minLng)) * 100,
  y: ((maxLat - lat) / (maxLat - minLat)) * 100,
});

const roadStatusColor: Record<string, string> = {
  open: "hsl(var(--secondary))",
  partial: "hsl(var(--gold))",
  closed: "hsl(var(--destructive))",
};

// Synthetic road polylines connecting festival points pairwise
const roadLines = [
  { id: "rl1", a: "1", b: "4", status: "open" },
  { id: "rl2", a: "2", b: "6", status: "partial" },
  { id: "rl3", a: "3", b: "5", status: "closed" },
  { id: "rl4", a: "4", b: "1", status: "open" },
];

export default function MapCanvas() {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl border border-border bg-deep">
      {/* Topographic gradient base */}
      <div className="absolute inset-0 bg-jungle opacity-40" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Decorative ridges (SVG) */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(46 100% 48% / 0.25)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="55" rx="40" ry="35" fill="url(#glow)" />

        {/* Roads */}
        {roadLines.map((r) => {
          const a = festivals.find((f) => f.id === r.a)!;
          const b = festivals.find((f) => f.id === r.b)!;
          const pa = project(a.lat, a.lng);
          const pb = project(b.lat, b.lng);
          const cx = (pa.x + pb.x) / 2 + (Math.random() - 0.5) * 6;
          const cy = (pa.y + pb.y) / 2 - 4;
          return (
            <path
              key={r.id}
              d={`M ${pa.x} ${pa.y} Q ${cx} ${cy} ${pb.x} ${pb.y}`}
              stroke={roadStatusColor[r.status]}
              strokeWidth="0.4"
              strokeDasharray={r.status === "closed" ? "1 1" : r.status === "partial" ? "2 1" : "0"}
              fill="none"
              opacity="0.85"
            />
          );
        })}

        {/* Heat circles */}
        {festivals.map((f) => {
          const p = project(f.lat, f.lng);
          return (
            <circle
              key={`heat-${f.id}`}
              cx={p.x}
              cy={p.y}
              r={f.heat / 18}
              fill="hsl(13 78% 57%)"
              opacity={f.heat / 250}
            />
          );
        })}
      </svg>

      {/* Festival pins */}
      {festivals.map((f) => {
        const p = project(f.lat, f.lng);
        return (
          <div
            key={f.id}
            className="absolute -translate-x-1/2 -translate-y-full group cursor-pointer"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary animate-pulse-dot" />
              <div className="relative bg-sun text-primary-foreground rounded-full p-1.5 shadow-glow">
                <MapPin className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
              <div className="bg-card border border-border rounded-md px-2 py-1 text-[10px] font-semibold text-foreground shadow-card">
                {f.name}
              </div>
            </div>
          </div>
        );
      })}

      {/* Map controls */}
      <div className="absolute top-3 right-3 flex flex-col gap-1.5">
        <button className="bg-card/90 backdrop-blur border border-border rounded-md p-2 hover:bg-card transition" aria-label="Acercar">
          <Plus className="h-4 w-4 text-foreground" />
        </button>
        <button className="bg-card/90 backdrop-blur border border-border rounded-md p-2 hover:bg-card transition" aria-label="Alejar">
          <Minus className="h-4 w-4 text-foreground" />
        </button>
        <button className="bg-card/90 backdrop-blur border border-border rounded-md p-2 hover:bg-card transition" aria-label="Brújula">
          <Compass className="h-4 w-4 text-foreground" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur border border-border rounded-lg p-3 text-xs space-y-1.5 shadow-card">
        <p className="font-display tracking-wider text-foreground flex items-center gap-1.5"><Layers className="h-3 w-3" /> Capa INVIAS</p>
        <div className="flex items-center gap-2"><span className="h-1 w-6 rounded" style={{ background: "hsl(var(--secondary))" }} /> Vía abierta</div>
        <div className="flex items-center gap-2"><span className="h-1 w-6 rounded" style={{ background: "hsl(var(--gold))" }} /> Parcial</div>
        <div className="flex items-center gap-2"><span className="h-1 w-6 rounded" style={{ background: "hsl(var(--destructive))" }} /> Cerrada</div>
      </div>

      <div className="absolute bottom-3 right-3 text-[10px] text-muted-foreground">
        Mapa demo · listo para Mapbox SDK
      </div>
    </div>
  );
}
