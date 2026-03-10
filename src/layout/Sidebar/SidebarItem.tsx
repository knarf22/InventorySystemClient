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
        className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-200
        ${active
            ? "bg-sidebar-active text-white"
            : "text-muted hover:bg-sidebar-hover hover:text-white"
          }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 ${active ? "text-white" : "text-muted"}`}>
            {icon}
          </div>

          <span className={`text-sm font-medium ${active ? "text-white" : ""}`}>
            {label}
          </span>
        </div>

        {hasChildren && (
          <ChevronRight
            size={16}
            className={`transition-transform duration-300
              ${isOpen ? "rotate-90 text-white" : "text-muted"}
            `}
          />
        )}
      </div>

      {children}
    </div>
  );
};

export default SidebarItem;
