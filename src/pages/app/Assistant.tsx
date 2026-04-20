import { useState } from "react";
import { Sparkles, Camera, Send, Bot, User, Image as ImageIcon } from "lucide-react";

type Msg = { role: "user" | "ai"; text: string };

const seed: Msg[] = [
  { role: "ai", text: "¡Hola viajero! Soy el asistente logístico-cultural de NomadAp. Apunta tu cámara a una artesanía o pregúntame por una festividad." },
];

const suggestions = [
  "¿Qué fiesta hay este fin de semana cerca de Neiva?",
  "Reconoce esta artesanía",
  "¿La vía Bogotá–Villavicencio está abierta?",
  "Plan de 3 días en el Huila",
];

export default function Assistant() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");

  const send = (t: string) => {
    const text = t.trim();
    if (!text) return;
    setMessages((m) => [
      ...m,
      { role: "user", text },
      { role: "ai", text: "🔮 (Demo) Conecta Lovable AI / Gemini para respuestas en vivo. Detecté intención cultural y verificaría vías INVIAS antes de responder." },
    ]);
    setInput("");
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto h-[calc(100vh-3.5rem)] flex flex-col">
      <header className="space-y-2 mb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 border border-primary/30 px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3 w-3" /> IA Multimodal · Gemini ready
        </span>
        <h1 className="font-display text-5xl tracking-wider text-foreground leading-none">Asistente Logístico-Cultural</h1>
        <p className="text-muted-foreground">Reconoce artesanías, sugiere planes y verifica rutas en tiempo real.</p>
      </header>

      <div className="flex-1 overflow-auto rounded-xl border border-border bg-card p-4 space-y-4 shadow-card">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`h-8 w-8 rounded-full grid place-items-center shrink-0 ${
              m.role === "ai" ? "bg-sun text-primary-foreground" : "bg-muted text-foreground"
            }`}>
              {m.role === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
            </div>
            <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
              m.role === "ai" ? "bg-muted/40 text-foreground" : "bg-primary text-primary-foreground"
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {suggestions.map((s) => (
          <button key={s} onClick={() => send(s)} className="text-xs border border-border bg-card hover:border-primary/50 hover:text-primary text-muted-foreground rounded-full px-3 py-1.5 transition">
            {s}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-card p-2 shadow-card focus-within:border-primary/50 transition"
      >
        <button type="button" className="p-2 rounded-md hover:bg-muted transition" aria-label="Cámara">
          <Camera className="h-4 w-4 text-muted-foreground" />
        </button>
        <button type="button" className="p-2 rounded-md hover:bg-muted transition" aria-label="Imagen">
          <ImageIcon className="h-4 w-4 text-muted-foreground" />
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pregunta algo o sube una foto…"
          className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
        />
        <button type="submit" className="bg-sun text-primary-foreground rounded-lg p-2.5 hover:opacity-90 transition shadow-glow">
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
