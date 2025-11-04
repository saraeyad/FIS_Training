import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { HiOutlineXMark } from "react-icons/hi2";
import { BsMoonStars, BsSun } from "react-icons/bs";
 

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">(theme);

  // Update selected theme when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedTheme(theme);
    }
  }, [isOpen, theme]);

  const handleDone = () => {
    // Theme is already applied on selection; Done just closes
    onClose();
  };

  if (!isOpen) return null;

  const themeOptions = [
    { value: "light" as const, label: "Light", icon: <BsSun className="w-5 h-5" /> },
    { value: "dark" as const, label: "Dark", icon: <BsMoonStars className="w-5 h-5" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-(--color-bg)/50">
      <div className="bg-(--color-surface) rounded-lg shadow-2xl w-full max-w-md mx-4 border border-(--color-border)">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-(--color-border)">
          <h2 className="text-xl font-semibold text-(--color-text)">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-(--color-accent) text-(--color-text) transition-colors"
          >
            <HiOutlineXMark className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-(--color-text)">
                Appearance
              </h3>
              <div className="px-3 py-1 bg-(--color-accent) text-(--color-text) rounded-full text-xs font-semibold">
                {selectedTheme === "dark" ? "Dark" : "Light"}
              </div>
            </div>
            
            <div className="space-y-2">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSelectedTheme(option.value);
                    setTheme(option.value);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    selectedTheme === option.value
                      ? "bg-(--color-accent) text-(--color-text) border-2 border-(--color-primary)"
                      : "bg-(--color-surface) text-(--color-text) border-2 border-transparent hover:bg-(--color-accent)"
                  }`}
                >
                  <div className={selectedTheme === option.value ? "text-(--color-text)" : "text-(--color-text)"}>
                    {option.icon}
                  </div>
                  <span className="flex-1 text-left font-medium">{option.label}</span>
                  {selectedTheme === option.value && (
                    <div className="w-2 h-2 rounded-full bg-(--color-primary) text-(--color-primary-foreground)" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Done Button */}
          <div className="flex justify-end gap-3 mt-6 border-t border-(--color-border) pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-(--color-text) font-medium bg-(--color-accent) hover:border-(--color-primary) transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDone}
              className="px-6 py-2 rounded-lg text-(--color-primary-foreground) font-medium bg-(--color-primary) hover:bg-(--color-primary) transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

