import type { SidebarSubItemProps } from "../../types/ISideBar";

const SidebarSubItem = ({ icon, label, active, onClick }: SidebarSubItemProps) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors duration-200
      ${
        active
          ? "bg-white text-purple-600 font-medium"
          : "text-muted hover:bg-sidebarHover hover:text-secondary"
      }`}
  >
    <div className={`${active ? "text-purple-600" : ""}`}>{icon}</div>
    <span className={active ? "text-purple-600" : ""}>{label}</span>
  </div>
);

export default SidebarSubItem;
