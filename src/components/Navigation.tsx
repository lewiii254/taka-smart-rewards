
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, MapPin, QrCode, Gift, User } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/locate", icon: MapPin, label: "Find Bins" },
    { href: "/scan", icon: QrCode, label: "Scan" },
    { href: "/rewards", icon: Gift, label: "Rewards" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around py-2">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link key={href} to={href}>
            <Button
              variant={location.pathname === href ? "default" : "ghost"}
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                location.pathname === href 
                  ? "bg-green-600 text-white" 
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              <Icon size={20} />
              <span className="text-xs">{label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
