import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, useMap } from "react-leaflet";
import { festivals, roads } from "@/data/mock";
import { Layers, Flame, Calendar, MapPin as PinIcon } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

// Custom pin icon using brand colors
const fiestaIcon = L.divIcon({
  className: "",
  html: `<div style="position:relative;width:32px;height:32px;">
    <div style="position:absolute;inset:0;border-radius:9999px;background:hsl(46 100% 48% / 0.4);animation:pulse 2s infinite;"></div>
    <div style="position:relative;display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:9999px;background:linear-gradient(135deg,hsl(46 100% 48%),hsl(13 78% 57%));box-shadow:0 0 20px hsl(46 100% 48% / 0.6);border:2px solid white;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
    </div>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Real road coordinates (approx polylines of major Colombian roads)
const roadPolylines: { id: string; name: string; status: "open" | "partial" | "closed"; coords: [number, number][] }[] = [
  { id: "r1", name: "Bogotá–Villavicencio", status: "partial", coords: [[4.7110, -74.0721], [4.4389, -74.2067], [4.1420, -73.6266]] },
  { id: "r2", name: "Neiva–Pitalito", status: "open", coords: [[2.9273, -75.2819], [2.5362, -75.5230], [1.8573, -76.0476]] },
  { id: "r3", name: "Mompox–Magangué", status: "closed", coords: [[9.2414, -74.4260], [9.0895, -74.5710], [9.2419, -74.7532]] },
  { id: "r4", name: "Vélez–Barbosa", status: "open", coords: [[6.0095, -73.6729], [5.9311, -73.6164]] },
  { id: "r5", name: "Aguazul–Yopal", status: "partial", coords: [[5.1719, -72.5476], [5.3378, -72.3959]] },
  { id: "r6", name: "Bogotá–Neiva", status: "open", coords: [[4.7110, -74.0721], [4.1533, -74.8847], [2.9273, -75.2819]] },
  { id: "r7", name: "Medellín–Riosucio", status: "open", coords: [[6.2442, -75.5812], [5.6947, -75.6758], [5.4239, -75.7022]] },
];

const roadColor: Record<string, string> = {
  open: "hsl(150 60% 45%)",
  partial: "hsl(46 100% 48%)",
  closed: "hsl(0 75% 55%)",
};

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(festivals.map((f) => [f.lat, f.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map]);
  return null;
}

export default function MapCanvas() {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl border-2 border-border shadow-card">
      <MapContainer
        center={[4.5709, -74.2973]}
        zoom={6}
        scrollWheelZoom
        className="w-full h-full z-0"
        style={{ background: "hsl(var(--deep))" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; OpenStreetMap'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        <FitBounds />

        {/* Heatmap circles */}
        {festivals.map((f) => (
          <CircleMarker
            key={`heat-${f.id}`}
            center={[f.lat, f.lng]}
            radius={f.heat / 3}
            pathOptions={{ color: "hsl(13 78% 57%)", fillColor: "hsl(13 78% 57%)", fillOpacity: f.heat / 300, weight: 0 }}
          />
        ))}

        {/* Roads */}
        {roadPolylines.map((r) => (
          <Polyline
            key={r.id}
            positions={r.coords}
            pathOptions={{
              color: roadColor[r.status],
              weight: 4,
              opacity: 0.85,
              dashArray: r.status === "closed" ? "8 6" : r.status === "partial" ? "12 4" : undefined,
            }}
          >
            <Popup>
              <div className="text-xs font-semibold">{r.name}</div>
              <div className="text-[11px] capitalize" style={{ color: roadColor[r.status] }}>{r.status === "open" ? "Vía abierta" : r.status === "partial" ? "Parcial" : "Cerrada"}</div>
            </Popup>
          </Polyline>
        ))}

        {/* Festival pins */}
        {festivals.map((f) => (
          <Marker key={f.id} position={[f.lat, f.lng]} icon={fiestaIcon}>
            <Popup>
              <div className="min-w-[200px]">
                <div className="font-display text-lg tracking-wider text-foreground">{f.name}</div>
                <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1"><PinIcon className="h-3 w-3" /> {f.town}, {f.department}</div>
                <div className="text-[11px] text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(f.startDate).toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
                <div className="text-[11px] flex items-center gap-1 mt-1 text-coral font-semibold"><Flame className="h-3 w-3" /> Ambiente {f.heat}/100</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {f.tags.map((t) => (
                    <span key={t} className="text-[10px] bg-primary/15 text-primary px-1.5 py-0.5 rounded font-semibold">{t}</span>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 bg-card/95 backdrop-blur border-2 border-border rounded-lg p-3 text-xs space-y-1.5 shadow-glow z-[400]">
        <p className="font-display tracking-wider text-foreground flex items-center gap-1.5"><Layers className="h-3 w-3" /> Capa INVIAS</p>
        <div className="flex items-center gap-2"><span className="h-1 w-6 rounded" style={{ background: roadColor.open }} /> Vía abierta</div>
        <div className="flex items-center gap-2"><span className="h-1 w-6 rounded" style={{ background: roadColor.partial }} /> Parcial</div>
        <div className="flex items-center gap-2"><span className="h-1 w-6 rounded" style={{ background: roadColor.closed }} /> Cerrada</div>
        <div className="pt-1 border-t border-border flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-coral" /> Heatmap ambiente</div>
      </div>
    </div>
  );
}
