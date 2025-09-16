import { NavLink } from "react-router-dom";
import { Home, MessageCircle, Heart, Sparkles, User, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/chat", icon: MessageCircle, label: "Therapy" },
    { to: "/mood", icon: Heart, label: "Mood" },
    { to: "/resources", icon: Sparkles, label: "Resources" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-border md:relative md:bottom-auto md:border-0">
      <div className="container mx-auto px-4">
        <div className="flex justify-around md:justify-center md:gap-8 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 rounded-xl transition-all duration-300",
                    isActive
                      ? "text-primary bg-primary-soft shadow-soft"
                      : "text-muted-foreground hover:text-primary hover:bg-accent-soft"
                  )
                }
              >
                <Icon className="w-5 h-5 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
      
      {/* Crisis Support Button */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block">
        <NavLink
          to="/crisis"
          className="flex items-center gap-2 px-4 py-2 bg-destructive text-white rounded-full shadow-medium hover:shadow-glow transition-all duration-300 animate-breathe"
        >
          <Phone className="w-4 h-4" />
          <span className="text-sm font-semibold">Crisis Help</span>
        </NavLink>
      </div>
    </nav>
  );
}