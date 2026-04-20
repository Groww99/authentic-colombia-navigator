import { Map, Calendar, Bot, Spline, Plug, LayoutDashboard, Sparkles } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";

const main = [
  { title: "Inicio", url: "/", icon: LayoutDashboard },
  { title: "Mapa", url: "/mapa", icon: Map },
  { title: "Festividades", url: "/festividades", icon: Calendar },
  { title: "Asistente IA", url: "/asistente", icon: Bot },
];
const ops = [
  { title: "Vías INVIAS", url: "/vias", icon: Spline },
  { title: "Integraciones", url: "/integraciones", icon: Plug },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const isActive = (p: string) => pathname === p;

  const cls = (p: string) =>
    `flex items-center gap-3 rounded-md px-2 py-2 transition-colors ${
      isActive(p)
        ? "bg-primary/15 text-primary font-semibold"
        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary"
    }`;

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sun shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <p className="font-display text-2xl leading-none tracking-wider text-foreground">NomadAp</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Colombia auténtica</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-display tracking-widest">Explorar</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {main.map((i) => (
                <SidebarMenuItem key={i.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={i.url} end className={cls(i.url)}>
                      <i.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{i.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="font-display tracking-widest">Operación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ops.map((i) => (
                <SidebarMenuItem key={i.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={i.url} end className={cls(i.url)}>
                      <i.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{i.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        {!collapsed && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs">
            <p className="font-semibold text-foreground">Modo Offline</p>
            <p className="text-muted-foreground">Caché lista para zonas rurales</p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
