
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  PieChart, 
  PlaySquare, 
  MessageCircle, 
  BarChart, 
  Lightbulb, 
  Settings,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

type NavItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
};

const NavItem = ({ to, icon: Icon, label, isCollapsed }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 group",
          isCollapsed ? "justify-center" : "",
          isActive 
            ? "bg-sidebar-primary/10 text-sidebar-primary"
            : "text-sidebar-foreground/60 hover:bg-sidebar-primary/10 hover:text-sidebar-foreground"
        )
      }
    >
      <Icon size={20} className={isActive ? "text-sidebar-primary" : ""} />
      {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
      {isCollapsed && (
        <span className="absolute left-full ml-2 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100 z-50">
          {label}
        </span>
      )}
    </NavLink>
  );
};

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div 
      className={cn(
        "bg-sidebar flex flex-col h-screen border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className={cn("flex items-center px-3 py-4", isCollapsed ? "justify-center" : "justify-between")}>
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-sidebar-primary flex items-center justify-center">
              <span className="font-bold text-white text-xs">AI</span>
            </div>
            <span className="text-sidebar-foreground font-semibold">CRM Highlevel</span>
          </div>
        )}
        {isCollapsed && (
          <div className="h-6 w-6 rounded-md bg-sidebar-primary flex items-center justify-center">
            <span className="font-bold text-white text-xs">AI</span>
          </div>
        )}
        <button
          onClick={toggleCollapse}
          className="text-sidebar-foreground/60 hover:text-sidebar-foreground rounded-md p-1 hover:bg-sidebar-accent"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-1 px-3 flex-1">
        <NavItem to="/app" icon={LayoutDashboard} label="Dashboard" isCollapsed={isCollapsed} />
        <NavItem to="/app/kontakte" icon={Users} label="Kontakte" isCollapsed={isCollapsed} />
        <NavItem to="/app/pipeline" icon={PieChart} label="Pipeline" isCollapsed={isCollapsed} />
        <NavItem to="/app/automatisierungen" icon={PlaySquare} label="Automatisierungen" isCollapsed={isCollapsed} />
        <NavItem to="/app/chatbot" icon={MessageCircle} label="Chatbot" isCollapsed={isCollapsed} />
        <NavItem to="/app/analysen" icon={BarChart} label="Analysen" isCollapsed={isCollapsed} />
        <NavItem to="/app/ai-lab" icon={Lightbulb} label="AI-Lab" isCollapsed={isCollapsed} />
      </div>

      <div className="mt-auto px-3 pb-6">
        <NavItem to="/app/einstellungen" icon={Settings} label="Einstellungen" isCollapsed={isCollapsed} />
      </div>
    </div>
  );
};

export default Sidebar;
