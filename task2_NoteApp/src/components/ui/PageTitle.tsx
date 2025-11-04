import React from "react";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../../router/routes";

interface PageTitleProps {
  className?: string;
 as?: "h1" | "h2" | "span";
}
const ROUTE_TITLES: Record<string, string> = {
  [ROUTES.ARCHICED]: "Archived Notes",
  [ROUTES.AllNOTE]: "All Notes",
  [ROUTES.SEARCH]: "Search",
  [ROUTES.TAGS]: "Tags",
};

export const PageTitle: React.FC<PageTitleProps> = ({ 
  className = "text-2xl font-bold text-(--color-text)",
  as: Component = "h1"
}) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tags = params.getAll("tag");

  // Check for tagged notes first
  if (tags.length > 0) {
    return <Component className={className}>Notes Tagged: {tags.join(", ")}</Component>;
  }

  // Find matching route title
  const title = Object.entries(ROUTE_TITLES).find(([route]) => 
    location.pathname === route || location.pathname.startsWith(route)
  )?.[1] ?? "All Notes";

  return <Component className={className}>{title}</Component>;
};

