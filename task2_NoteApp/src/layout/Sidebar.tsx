
import { LogoIcon } from "../icons/LogoIcon";
import { ROUTES } from "../router/routes";
import { FiHome } from "react-icons/fi";
import { MdOutlineArchive } from "react-icons/md";
import { ListOfTages } from "../components/tags/ListOfTages";
import { NavItem } from "../components/ui/nav-item";


export const Sidebar = () => {
    return (
        <div className="flex flex-col h-full px-7 py-9 text-(--color-text)">
          <div className="flex items-center mb-6">
            <LogoIcon />
          </div>
    
          <nav className="flex flex-col gap-3">
            <NavItem icon={<FiHome />} label="All Notes"  to ={ROUTES.AllNOTE}/>
            <NavItem icon={<MdOutlineArchive />} label="Archived Notes" to={ROUTES.ARCHICED} />
          </nav>
    
          <div className="mt-5 border-t border-(--color-border) pt-1">
            <ListOfTages />
          </div>
        </div>
      );

}
