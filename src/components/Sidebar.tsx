
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  PieChart,
  MessagesSquare,
  BarChart3,
  Zap,
  Settings,
  ChevronRight,
  Menu,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
  const isMobile = useIsMobile();
  
  const navItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      title: "Kontakte",
      icon: <Users className="h-5 w-5" />,
      path: "/contacts",
    },
    {
      title: "Pipeline",
      icon: <PieChart className="h-5 w-5" />,
      path: "/pipeline",
    },
    {
      title: "Automatisierungen",
      icon: <ChevronRight className="h-5 w-5" />,
      path: "/automations",
    },
    {
      title: "Chatbot",
      icon: <MessagesSquare className="h-5 w-5" />,
      path: "/chatbot", 
    },
    {
      title: "Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      path: "/analytics",
    },
    {
      title: "AI Lab",
      icon: <Zap className="h-5 w-5" />,
      path: "/ai-lab",
    },
    {
      title: "Einstellungen",
      icon: <Settings className="h-5 w-5" />,
      path: "/settings",
    },
  ];

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="fixed top-3 left-3 z-50"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col w-64 bg-card border-r border-border transition-transform",
          isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"
        )}
      >
        <div className="flex items-center h-16 px-4 border-b border-border">
          <h1 className="text-xl font-bold">CRM-System</h1>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1.5">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )
                  }
                >
                  {item.icon}
                  <span>{item.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-medium">AM</span>
            </div>
            <div>
              <p className="text-sm font-medium">Alex Mustermann</p>
              <p className="text-xs text-muted-foreground">Vertriebsleiter</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
