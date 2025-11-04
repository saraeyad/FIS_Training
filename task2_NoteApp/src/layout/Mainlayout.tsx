import { Outlet, useNavigate ,useLocation} from "react-router";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { NoteList } from "../pages/Notes/NoteList";
import { NotesActions } from "../components/ui/NotesActions";
import { ROUTES } from "../router/routes";
import { useEffect } from "react";
import { MobileLayout } from "./MobileLayout";

export const Mainlayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isArchivedRoute = location.pathname.startsWith(ROUTES.ARCHICED);

  // Handle window resize to redirect mobile-only pages to All Notes on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        if (location.pathname === "/search" || location.pathname === "/tags" || location.pathname === "/settings") {
          navigate(ROUTES.AllNOTE);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location.pathname, navigate]);
// bg-gray-50 dark:bg-[#0e121b]
  return (
    <div className="h-screen bg-(--color-bg) flex flex-col text-(--color-text) transition-colors">
      {/* Desktop Layout */}
      <div className="hidden xl:grid xl:grid-cols-[250px_5fr] h-full">
        {/** surface */}
        <aside className="border-r border-(--color-border) h-full bg-(--color-surface)">
          <Sidebar />
        </aside>

        <div className="flex flex-col h-min-0">
          {/* Navbar */}
          <header className="border-b border-(--color-border) bg-(--color-surface) p-7">
            <Header />
          </header>

          {/* Main Sections (Note List + Note Details) */}
          <div className="grid grid-cols-[2.1fr_0.5fr] min-h-0">
            <div className="grid grid-cols-[280px_2fr] min-h-0">
              <div className="border-r border-(--color-border) px-3 min-h-0 bg-(--color-surface)">
                <NoteList showArchived={isArchivedRoute} />
              </div>
              <div className="p-5 min-h-0 bg-(--color-surface)">
                  <Outlet />    
              </div>
            </div>
            <div className="border-l border-(--color-border) p-4 min-h-0 bg-(--color-surface)">
              <NotesActions />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Layout */}
      <div className="xl:hidden">
        <MobileLayout />
      </div>
    </div>
  );
};
