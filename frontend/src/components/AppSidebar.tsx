import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
  Film, 
  BookOpen, 
  GraduationCap, 
  Settings,
  ChevronRight,
  Sparkles,
  ArrowLeft
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Movies", url: "/movies", icon: Film },
  { title: "Books", url: "/books", icon: BookOpen },
  { title: "Learning Path", url: "/learning", icon: GraduationCap },
];

const settingsItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isMainGroupExpanded = mainItems.some((item) => isActive(item.url));
  const isCollapsed = state === "collapsed";

  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-green-soft/60 text-green-electric font-medium shadow-soft border border-green-electric/20" 
      : "hover:bg-cream-dark/40 transition-smooth";

  const showBackButton = currentPath !== "/";

  return (
    <Sidebar
      className={`border-r border-border/30 bg-cream-base/95 backdrop-blur-xl ${isCollapsed ? "w-14" : "w-64"} transition-all duration-300`}
      collapsible="icon"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/30 bg-cream-light/50">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-electric rounded-lg flex items-center justify-center shadow-soft">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Preferee</h2>
              <p className="text-xs text-muted-foreground">AI Recommendations</p>
            </div>
          </div>
        )}
        <SidebarTrigger className="hover:bg-cream-dark/40 transition-smooth rounded-lg" />
      </div>

      <SidebarContent className="p-4 bg-cream-base/50">
        {/* Back to Home Button */}
        {showBackButton && (
          <div className="mb-6">
            <button
              onClick={() => navigate("/")}
              className={`
                flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 w-full
                hover:bg-cream-dark/40 text-muted-foreground hover:text-foreground
                ${isCollapsed ? "justify-center" : ""}
              `}
            >
              <ArrowLeft className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="flex-1 text-left">Back to Home</span>}
            </button>
          </div>
        )}

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium text-xs">
            {!isCollapsed && "DISCOVER"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `
                        flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
                        ${getNavClasses({ isActive })}
                        ${isCollapsed ? "justify-center px-2" : ""}
                      `}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          <ChevronRight className="w-4 h-4 opacity-50" />
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings Section */}
        <div className="mt-8">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {settingsItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={({ isActive }) => `
                          flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
                          ${getNavClasses({ isActive })}
                          ${isCollapsed ? "justify-center px-2" : ""}
                        `}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {!isCollapsed && <span className="flex-1">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}