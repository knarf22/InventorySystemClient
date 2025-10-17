import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard /> },
    { label: "Inventory", icon: <Package /> },
    { label: "Users", icon: <Users /> },
    { label: "Settings", icon: <Settings /> },
  ];

  return (
    <div className="flex h-screen font-jakarta bg-background text-text">
      {/* Sidebar */}
      <div className="flex flex-col justify-between w-64 bg-sidebar shadow-xl">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-primary mb-8 tracking-tight">
            InventorySys
          </h1>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                active={activeTab === item.label}
                onClick={() => setActiveTab(item.label)}
              />
            ))}
          </nav>
        </div>

        <div className="border-t border-sidebarHover p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100?img=3"
              alt="User"
              className="w-9 h-9 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-secondary">Admin</p>
            </div>
          </div>
          <LogOut className="w-5 h-5 text-secondary cursor-pointer hover:text-primary transition" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8">
        {/* Page Title */}
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-primary">
            {activeTab}
          </h2>
        </div>

        {/* Page Content */}
        <div className="flex-1 text-gray-600 text-lg">
          {activeTab} page
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }: SidebarItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 
        ${
          active
            ? "bg-sidebarHover text-primary"
            : "text-muted hover:bg-sidebarHover hover:text-secondary"
        }`}
    >
      <div className="w-5 h-5">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default Sidebar;
