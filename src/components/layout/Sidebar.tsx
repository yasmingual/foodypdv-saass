
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard,
  ShoppingCart,
  FolderTree,
  ClipboardList,
  DollarSign,
  Package,
  Tag
} from "lucide-react";

type NavItem = {
  icon: React.ElementType;
  label: string;
  path: string;
};

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: ShoppingCart, label: "PDV", path: "/pdv" },
  { icon: ClipboardList, label: "KDS", path: "/kds" },
  { icon: Package, label: "Estoque", path: "/stock" },
  { icon: DollarSign, label: "Caixa", path: "/cashier" },
  { icon: FolderTree, label: "Produtos", path: "/products" },
  { icon: Tag, label: "Categorias", path: "/categories" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "bg-sidebar h-screen transition-all duration-300 flex flex-col border-r border-sidebar-border",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4">
        <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
          {!collapsed && (
            <span className="text-xl font-bold text-sidebar-foreground">FoodPOS</span>
          )}
          {collapsed && (
            <span className="text-xl font-bold text-sidebar-foreground">FP</span>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          )}
        </Button>
      </div>

      <nav className="mt-6 flex-1">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "sidebar-item",
                  location.pathname === item.path && "active"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="text-sidebar-foreground font-medium">U</span>
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">Usuário</p>
              <p className="text-xs text-sidebar-foreground/70">Gerente</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
