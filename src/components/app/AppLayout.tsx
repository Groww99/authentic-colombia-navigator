import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Search, Bell, Wifi } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AppLayout() {
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-40 h-14 flex items-center gap-3 border-b border-border bg-background/80 backdrop-blur px-3 md:px-5">
            <SidebarTrigger className="text-foreground" />
            <div className="relative flex-1 max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar pueblos, festividades, vías…" className="pl-9 bg-muted/40 border-border" />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-secondary/20 px-3 py-1 text-xs font-medium text-secondary-foreground">
                <Wifi className="h-3 w-3" /> Online
              </span>
              <button className="p-2 rounded-md hover:bg-muted transition" aria-label="Notificaciones">
                <Bell className="h-4 w-4 text-muted-foreground" />
              </button>
              <div className="h-8 w-8 rounded-full bg-sun grid place-items-center font-display text-primary-foreground">JR</div>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
