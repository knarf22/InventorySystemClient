import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ArrowDownCircle,
  ArrowUpCircle,
  Boxes,
  Tags,
  Truck,
  Users,
  BarChart3,
  Clock,
  AlertTriangle,
  LogOut,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import SidebarSubItem from "./SidebarSubitem";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const isChildActive = (children: string[]) => children.includes(activeTab);

  return (
    <div className="flex h-screen font-jakarta bg-background text-text">
      {/* Sidebar */}
      <div className="flex flex-col justify-between w-64 bg-sidebar shadow-2xl transition-all duration-300">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-primary mb-8 tracking-tight">
            InventorySys
          </h1>

          <nav className="space-y-2">
            {/* Dashboard */}
            <SidebarItem
              icon={<LayoutDashboard />}
              label="Dashboard"
              active={activeTab === "Dashboard"}
              onClick={() => {
                setActiveTab("Dashboard");
                setOpenMenu(null);
              }}
            />

            {/* Products / Inventory */}
            <SidebarItem
              icon={<Package />}
              label="Products / Inventory"
              hasChildren
              isOpen={openMenu === "Products"}
              active={
                openMenu === "Products" || isChildActive(["Products", "Categories"])
              }
              onClick={() => toggleMenu("Products")}
            >
              {openMenu === "Products" && (
                <div className="ml-6 mt-2 space-y-1 text-sm">
                  <SidebarSubItem
                    icon={<Boxes size={16} />}
                    label="Products"
                    active={activeTab === "Products"}
                    onClick={() => setActiveTab("Products")}
                  />
                  <SidebarSubItem
                    icon={<Tags size={16} />}
                    label="Categories"
                    active={activeTab === "Categories"}
                    onClick={() => setActiveTab("Categories")}
                  />
                </div>
              )}
            </SidebarItem>

            {/* Stock Transactions */}
            <SidebarItem
              icon={<ArrowDownCircle />}
              label="Stock Transactions"
              hasChildren
              isOpen={openMenu === "Stock"}
              active={openMenu === "Stock" || isChildActive(["Stock In", "Stock Out"])}
              onClick={() => toggleMenu("Stock")}
            >
              {openMenu === "Stock" && (
                <div className="ml-6 mt-2 space-y-1 text-sm">
                  <SidebarSubItem
                    icon={<ArrowDownCircle size={16} />}
                    label="Stock In"
                    active={activeTab === "Stock In"}
                    onClick={() => setActiveTab("Stock In")}
                  />
                  <SidebarSubItem
                    icon={<ArrowUpCircle size={16} />}
                    label="Stock Out"
                    active={activeTab === "Stock Out"}
                    onClick={() => setActiveTab("Stock Out")}
                  />
                </div>
              )}
            </SidebarItem>

            {/* Suppliers */}
            <SidebarItem
              icon={<Truck />}
              label="Suppliers"
              active={activeTab === "Suppliers"}
              onClick={() => {
                setActiveTab("Suppliers");
                setOpenMenu(null);
              }}
            />

            {/* Users / Roles */}
            <SidebarItem
              icon={<Users />}
              label="Users / Roles"
              active={activeTab === "Users / Roles"}
              onClick={() => {
                setActiveTab("Users / Roles");
                setOpenMenu(null);
              }}
            />

            {/* Reports / History */}
            <SidebarItem
              icon={<BarChart3 />}
              label="Reports / History"
              hasChildren
              isOpen={openMenu === "Reports"}
              active={
                openMenu === "Reports" ||
                isChildActive(["Logs", "Stock Reports", "Low Stock Alerts"])
              }
              onClick={() => toggleMenu("Reports")}
            >
              {openMenu === "Reports" && (
                <div className="ml-6 mt-2 space-y-1 text-sm">
                  <SidebarSubItem
                    icon={<Clock size={16} />}
                    label="Logs"
                    active={activeTab === "Logs"}
                    onClick={() => setActiveTab("Logs")}
                  />
                  <SidebarSubItem
                    icon={<BarChart3 size={16} />}
                    label="Stock Reports"
                    active={activeTab === "Stock Reports"}
                    onClick={() => setActiveTab("Stock Reports")}
                  />
                  <SidebarSubItem
                    icon={<AlertTriangle size={16} />}
                    label="Low Stock Alerts"
                    active={activeTab === "Low Stock Alerts"}
                    onClick={() => setActiveTab("Low Stock Alerts")}
                  />
                </div>
              )}
            </SidebarItem>
          </nav>
        </div>

        {/* User Section */}
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
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-primary">{activeTab}</h2>
        </div>
        <div className="flex-1 text-gray-600 text-lg">{activeTab} page</div>
      </div>
    </div>
  );
};

export default Sidebar;
