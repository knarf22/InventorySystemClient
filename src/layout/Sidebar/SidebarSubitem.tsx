import type { SidebarSubItemProps } from "../../types/ISideBar";

const SidebarSubItem = ({ icon, label, active, onClick }: SidebarSubItemProps) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors duration-200
      ${active
        ? "bg-sidebar-active text-white"
        : "text-muted hover:bg-sidebar-hover hover:text-white"
      }`}
  >
    <div className={active ? "text-white" : ""}>{icon}</div>
    <span className={active ? "text-white font-medium" : ""}>{label}</span>
  </div>
);

export default SidebarSubItem;
