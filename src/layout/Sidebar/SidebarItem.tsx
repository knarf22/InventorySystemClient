import { ChevronRight } from "lucide-react";
import type { SidebarItemProps } from "../../types/ISideBar";

const SidebarItem = ({
  icon,
  label,
  active,
  onClick,
  children,
  isOpen,
  hasChildren,
  
}: SidebarItemProps) => {
  return (
    <div>
      <div
        onClick={onClick}
        className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-300
          ${
            active
              ? "bg-gradient-to-r from-purple-700 to-purple-600  shadow-md"
              : "text-muted hover:bg-gradient-to-r hover:from-sidebarHover hover:to-purple-800 hover:text-secondary"
          }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-5 h-5">{icon}</div>
          <span className="text-sm font-medium">{label}</span>
        </div>

        {hasChildren && (
          <ChevronRight
            size={16}
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-90 text-secondary" : "text-muted"
            }`}
          />
        )}
      </div>
      {children}
    </div>
  );
};

export default SidebarItem;
