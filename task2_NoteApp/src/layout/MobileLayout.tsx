import { Outlet, useLocation } from "react-router-dom"
import { LogoIcon } from "../icons/LogoIcon"
import { BackButton } from "../components/buttons/BackButtonInMobile"
import { NotesMobileActions } from "../components/Mobile/NotesMobileActions"
import { NoteList } from "../pages/Notes/NoteList"
import { ROUTES } from "../router/routes"
import { useNavigate } from "react-router-dom"
import { BottomNav } from "../components/Mobile/FooterMobile"
import { PageTitle } from "../components/ui/PageTitle"

export const MobileLayout =()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const isArchivedRoute = location.pathname.startsWith(ROUTES.ARCHICED);
    return (
           <div className="flex flex-col h-full xl:hidden">
           {/* Top Logo Bar */}
                <header className=" py-5 mb-3 bg-(--color-surface-2)">
                    <div className="pl-5">
                    <LogoIcon /> 
                    </div>
                </header>
           <div className=" pl-5">
             <PageTitle className="text-2xl text-(--color-text) font-bold pl-5" as="span" />
          
           {/* Sub Header - Go Back and Actions */}
           <div className=" border-b border-(--color-border)  ">
             <div className="flex items-center justify-between">
              <BackButton showText={true} className="px-3 py-2 text-(--color-text) hover:text-(--color-text) transition-colors" />
               <NotesMobileActions />
             </div>
           </div>
   
          {/* Mobile Content */}
          <div className="flex-1 bg-(--color-bg) overflow-y-auto pb-30 pl-5">
            {location.pathname.includes("/note/") || 
             ["/search", "/tags", "/settings"].includes(location.pathname) ? (
              <Outlet />
            ) : (
              <NoteList showArchived={isArchivedRoute} />
            )}
          </div>
   
           {/* Floating Action Button */}
           <div className="fixed bottom-25 right-4 z-100 xl:hidden">
             <button
               onClick={() => navigate(ROUTES.NEW_NOTE)}
               className="w-14 h-14 bg-(--color-primary) hover:bg-(--color-primary) rounded-full shadow-lg flex items-center justify-center text-white text-3xl transition-all"
             >
               +
             </button>
           </div>
           </div>
   
           {/* Bottom Navigation */}
           <BottomNav />
         </div>
    )
}