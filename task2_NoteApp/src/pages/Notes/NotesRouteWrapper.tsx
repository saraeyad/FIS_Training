import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useCallback } from "react";
import { useNotesFilter } from "../../hooks/useNotesFilter";

interface NotesRouteWrapperProps {
  showArchived?: boolean;
  baseRoute: string;
}

export const NotesRouteWrapper: React.FC<NotesRouteWrapperProps> = ({ 
  showArchived = false,
  baseRoute 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { filteredNotes } = useNotesFilter(showArchived);
  const wasMobileRef = useRef(window.innerWidth < 1280);
  
  // Function to perform auto-navigation
  const performAutoNavigate = useCallback(() => {
    // Skip auto-navigation if coming from note detail (via goBack)
    if (location.state?.fromNoteDetail) return;
    
    // Only auto-navigate on desktop (xl: 1280px+) - skip on mobile
    if (window.innerWidth < 1280) {
      wasMobileRef.current = true;
      return;
    }
    
    // Only auto-navigate if we're on the exact list route (not on a note detail)
    if (location.pathname !== baseRoute) return;
    
    // Navigate to first note if available
    if (filteredNotes.length > 0) {
      const id = filteredNotes[0].note.id;
      const qs = location.search;
      navigate(`${baseRoute}/note/${id}${qs}`, { replace: true });
    }
    
    wasMobileRef.current = false;
  }, [filteredNotes, location.search, location.pathname, location.state, navigate, baseRoute]);
  
  // Auto-navigate when route or filters change
  useEffect(() => {
    performAutoNavigate();
  }, [performAutoNavigate]);

  // Listen for window resize (mobile to desktop transition)
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1280;
      const wasMobile = wasMobileRef.current;
      
      // If transitioning from mobile to desktop, perform auto-navigate
      if (wasMobile && isDesktop) {
        performAutoNavigate();
      }
      // Update ref
      wasMobileRef.current = !isDesktop;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [performAutoNavigate]);

  return <Outlet />;
};

