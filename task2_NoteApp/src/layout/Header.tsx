import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { SettingsModal } from "../components/modals/SettingsModal";
import { SearchButton } from "../components/buttons/SearchButton";
import { PageTitle } from "../components/ui/PageTitle";

export const Header = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    return (
        <>
          <div className="flex items-center justify-between relative">
            {/* Page title */}
            <PageTitle className="text-2xl font-bold pl-6 text-(--color-text)" as="h1" />
      
            {/* Right section (search + settings) */}
            <div className="flex items-center gap-3 relative">
              <SearchButton />
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-md hover:bg-(--color-accent) transition-colors"
              >
                <FiSettings className="w-5 h-5 text-(--color-text)" />
              </button>
            </div>
          </div>

          <SettingsModal 
            isOpen={isSettingsOpen} 
            onClose={() => setIsSettingsOpen(false)} 
          />
        </>
      );

}