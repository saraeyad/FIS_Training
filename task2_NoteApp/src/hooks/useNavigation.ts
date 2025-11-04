import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../router/routes";

/**
 * Custom hook for navigation utilities
 */
export const useNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateTo = (path: string, params?: URLSearchParams) => {
    const url = params ? `${path}?${params.toString()}` : path;
    navigate(url, { replace: true });
  };

  const goBack = () => {
    const { pathname, search } = location;
    
    // If in /TaggedNote without /note/, go to /tags
    if (pathname === "/TaggedNote") {
      navigate(ROUTES.TAGS, { state: { fromNoteDetail: true }, replace: true });
      return;
    }
    
    // Extract base route: /All-NOTE/note/123 → /All-NOTE
    if (pathname.includes('/note/')) {
      const baseRoute = pathname.split('/note/')[0];
      const queryString = baseRoute === "/TaggedNote" && search ? search : '';
      navigate(`${baseRoute}${queryString}`, { 
        state: { fromNoteDetail: true }, 
        replace: true 
      });
    }
  };

  return {
    location,
    navigate,
    navigateTo,
    goBack,
  };
};