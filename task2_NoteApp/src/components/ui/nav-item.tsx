
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import type  { NavItemProps } from "../../types";

export const NavItem = ({ icon, label, to }: NavItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current route matches this NavItem (including nested routes)
  const isActive = location.pathname === to || location.pathname.startsWith(to + '/');

  return (
    <div
      onClick={() => navigate(to)}
      className={`flex items-center justify-between cursor-pointer px-4 py-2 rounded-md transition-colors duration-200
        ${isActive
          ? "  text-(--color-secondary)  bg-(--color-accent)"
          : "text-(--color-text) hover:bg-(--color-accent) hover:text-(--color-text)"}
      `}
    >
      <div className="flex items-center">
        <span className={`text-xl mr-3 ${isActive ? "text-(--brand-text)" : ""}`}>{icon}</span>
        <span className={`text-sm font-medium ${isActive ? "text-(--brand-text)" : ""}`}>{label}</span>
      </div>
      {/* Right arrow */}
      <span className={`${isActive ? "text-(--brand-text)" : "text-(--color-text)"}`}>
      <MdOutlineKeyboardArrowRight className="w-6 h-6" />
      </span>
    </div>
  );
};