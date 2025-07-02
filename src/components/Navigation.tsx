
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, MapPin, QrCode, Gift, Users, Sparkles, User, Settings } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);
  
  const primaryNavItems = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/locate", icon: MapPin, label: "Find Bins" },
    { href: "/scan", icon: QrCode, label: "Scan" },
    { href: "/community", icon: Users, label: "Community" },
  ];

  const secondaryNavItems = [
    { href: "/rewards", icon: Gift, label: "Rewards" },
    { href: "/profile", icon: User, label: "Profile" },
    { href: "/ai-assistant", icon: Sparkles, label: "AI Help" },
  ];

  const currentItems = showMore ? [...primaryNavItems, ...secondaryNavItems] : primaryNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around py-2">
        {currentItems.map(({ href, icon: Icon, label }) => (
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
        
        {/* More/Less toggle button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowMore(!showMore)}
          className="flex flex-col items-center gap-1 h-auto py-2 px-3 text-gray-600 hover:text-green-600"
        >
          <Settings size={20} />
          <span className="text-xs">{showMore ? "Less" : "More"}</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
