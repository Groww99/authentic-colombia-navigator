export type Festival = {
  id: string;
  name: string;
  town: string;
  department: string;
  category: 4 | 5 | 6;
  startDate: string;
  endDate: string;
  lat: number;
  lng: number;
  heat: number; // 0-100
  tags: string[];
  cover: string;
  source: "FONTUR" | "MinCultura" | "Alcaldía" | "Firecrawl";
  status: "verified" | "pending" | "scraped";
};

export const festivals: Festival[] = [
  { id: "1", name: "Festival del Bambuco", town: "Neiva", department: "Huila", category: 4, startDate: "2025-06-21", endDate: "2025-06-30", lat: 2.93, lng: -75.28, heat: 92, tags: ["Música", "Danza"], cover: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800", source: "FONTUR", status: "verified" },
  { id: "2", name: "Carnaval de Riosucio", town: "Riosucio", department: "Caldas", category: 5, startDate: "2026-01-04", endDate: "2026-01-09", lat: 5.42, lng: -75.70, heat: 78, tags: ["Diablos", "Tradición"], cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800", source: "MinCultura", status: "verified" },
  { id: "3", name: "Fiestas del Mar", town: "Mompox", department: "Bolívar", category: 6, startDate: "2025-08-15", endDate: "2025-08-18", lat: 9.24, lng: -74.42, heat: 64, tags: ["Río", "Filigrana"], cover: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800", source: "Alcaldía", status: "pending" },
  { id: "4", name: "Festival de la Guabina", town: "Vélez", department: "Santander", category: 5, startDate: "2025-08-08", endDate: "2025-08-12", lat: 6.01, lng: -73.67, heat: 55, tags: ["Música", "Campesino"], cover: "https://images.unsplash.com/photo-1547473078-cbffce75e1ec?w=800", source: "Firecrawl", status: "scraped" },
  { id: "5", name: "Encuentro de Tamboras", town: "San Martín de Loba", department: "Bolívar", category: 6, startDate: "2025-11-22", endDate: "2025-11-25", lat: 8.93, lng: -74.03, heat: 48, tags: ["Tambor", "Ancestral"], cover: "https://images.unsplash.com/photo-1520637836862-4d197d17c33a?w=800", source: "Firecrawl", status: "scraped" },
  { id: "6", name: "Fiesta del Retorno", town: "Aguazul", department: "Casanare", category: 4, startDate: "2025-12-08", endDate: "2025-12-14", lat: 5.17, lng: -72.55, heat: 71, tags: ["Joropo", "Llano"], cover: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=800", source: "FONTUR", status: "verified" },
];

export type Road = {
  id: string;
  name: string;
  status: "open" | "partial" | "closed";
  from: string;
  to: string;
  updatedAt: string;
};

export const roads: Road[] = [
  { id: "r1", name: "Vía Bogotá–Villavicencio", status: "partial", from: "Bogotá", to: "Villavicencio", updatedAt: "Hace 12 min" },
  { id: "r2", name: "Vía Neiva–Pitalito", status: "open", from: "Neiva", to: "Pitalito", updatedAt: "Hace 3 min" },
  { id: "r3", name: "Vía Mompox–Magangué", status: "closed", from: "Mompox", to: "Magangué", updatedAt: "Hace 1 h" },
  { id: "r4", name: "Vía Vélez–Barbosa", status: "open", from: "Vélez", to: "Barbosa", updatedAt: "Hace 22 min" },
  { id: "r5", name: "Vía Aguazul–Yopal", status: "partial", from: "Aguazul", to: "Yopal", updatedAt: "Hace 45 min" },
];

export type Integration = {
  id: string;
  name: string;
  description: string;
  category: "Mapas" | "IA" | "Datos" | "Scraping" | "Backend";
  status: "connected" | "available" | "soon";
  icon: string;
};

export const integrations: Integration[] = [
  { id: "mapbox", name: "Mapbox", description: "SDK de mapas interactivos con estilos personalizados", category: "Mapas", status: "available", icon: "🗺️" },
  { id: "gemini", name: "Google AI Studio (Gemini)", description: "IA multimodal para asistente cultural y reconocimiento", category: "IA", status: "available", icon: "✨" },
  { id: "datosgov", name: "datos.gov.co (INVIAS)", description: "Estado de vías nacionales en GeoJSON", category: "Datos", status: "available", icon: "🛣️" },
  { id: "airtable", name: "Airtable", description: "Base de datos visual para sincronizar coordenadas y eventos", category: "Backend", status: "available", icon: "📊" },
  { id: "firecrawl", name: "Firecrawl", description: "Scraping inteligente de alcaldías y noticias culturales", category: "Scraping", status: "available", icon: "🔥" },
  { id: "browseai", name: "Browse AI", description: "Robots para extraer fechas y lugares automáticamente", category: "Scraping", status: "available", icon: "🤖" },
  { id: "vercel", name: "Vercel", description: "Despliegue automático desde GitHub", category: "Backend", status: "connected", icon: "▲" },
  { id: "fontur", name: "FONTUR API", description: "Reportes culturales oficiales de turismo", category: "Datos", status: "soon", icon: "🇨🇴" },
];

export const stats = {
  festivals: 248,
  towns: 67,
  roadsMonitored: 142,
  scrapedThisWeek: 31,
};
