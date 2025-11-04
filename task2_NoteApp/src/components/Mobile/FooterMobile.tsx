import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiSettings, FiSearch } from "react-icons/fi";
import { MdOutlineArchive } from "react-icons/md";
import { HiOutlineTag } from "react-icons/hi";
import { ROUTES } from "../../router/routes";
import { SettingsModal } from "../modals/SettingsModal";

export const BottomNav = () => {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navItems = [
    { icon: FiHome, label: "Home", path: ROUTES.AllNOTE },
    { icon: FiSearch, label: "Search", path: ROUTES.SEARCH },
    { icon: MdOutlineArchive, label: "Archived", path: ROUTES.ARCHICED },
    { icon: HiOutlineTag, label: "Tags", path: "/tags" },
    { icon: FiSettings, label: "Settings", path: ROUTES.SETTINGS },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-(--color-surface) border-t border-(--color-border) z-50">
        <div className="flex justify-around items-center px-4 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
                            (item.path === ROUTES.AllNOTE && location.pathname.startsWith("/All-NOTE")) ||
                            (item.path === ROUTES.ARCHICED && location.pathname.startsWith("/Archived-Note")) ||
                            (item.path === ROUTES.SEARCH && location.pathname === "/search") ||
                            (item.path === "/tags" && location.pathname === "/tags");
            
            // Handle Settings specially - open modal instead of navigating
            if (item.path === ROUTES.SETTINGS) {
              return (
                <button
                  key={item.label}
                  onClick={() => setIsSettingsOpen(true)}
                  className="flex flex-col items-center py-2 px-4 rounded-lg transition-colors"
                >
                  <Icon className="w-6 h-6 text-(--color-text)" />
                  <span className="text-xs mt-1 text-(--color-text)">
                    {item.label}
                  </span>
                </button>
              );
            }
            
            return (
              <Link
                key={item.label}
                to={item.path}
                className="flex flex-col items-center py-2 px-4 rounded-lg transition-colors"
              >
                <Icon 
                  className={`w-6 h-6 ${
                    isActive ? "text-(--color-text)" : "text-(--color-text)"
                  }`} 
                />
                <span className={`text-xs mt-1 ${
                  isActive ? "text-(--color-text) font-semibold" : "text-(--color-text)"
                }`}>
                  {item.label}
                </span>
                {isActive && (
                    <div className="w-8 h-0.5 bg-(--color-primary) mt-1"></div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
};

