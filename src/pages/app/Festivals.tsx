import { useState } from "react";
import { festivals } from "@/data/mock";
import FestivalCard from "@/components/app/FestivalCard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const filters = ["Todas", "Cat. 4", "Cat. 5", "Cat. 6", "FONTUR", "Firecrawl"];

export default function Festivals() {
  const [active, setActive] = useState("Todas");
  const [q, setQ] = useState("");
  const list = festivals.filter((f) => {
    const matchQ = !q || f.name.toLowerCase().includes(q.toLowerCase()) || f.town.toLowerCase().includes(q.toLowerCase());
    if (!matchQ) return false;
    if (active === "Todas") return true;
    if (active.startsWith("Cat.")) return f.category === Number(active.split(" ")[1]);
    return f.source === active;
  });

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto">
      <header className="space-y-2">
        <h1 className="font-display text-5xl tracking-wider text-foreground leading-none">Festividades</h1>
        <p className="text-muted-foreground">Cultura viva extraída de fuentes oficiales y scraping con IA.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar festividad o pueblo…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9 bg-card border-border" />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition ${
                active === f
                  ? "bg-sun text-primary-foreground border-transparent shadow-glow"
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((f) => <FestivalCard key={f.id} f={f} />)}
      </div>
      {list.length === 0 && (
        <p className="text-center text-muted-foreground py-12">Sin resultados.</p>
      )}
    </div>
  );
}
