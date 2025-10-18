import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  ChevronRight,
  ChevronDown,
  LogOut,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import SidebarSubItem from "./SidebarSubitem";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Active route detection
  const currentPath = location.pathname;

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => currentPath === path;

  const isChildActive = (children: string[]) =>
    children.some((childPath) => currentPath === childPath);

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
              active={isActive("/")}
              onClick={() => handleNavigation("/")}
            />

            {/* Products / Inventory */}
            <SidebarItem
              icon={<Package />}
              label="Products / Inventory"
              hasChildren
              isOpen={openMenu === "Products"}
              arrowIcon={
                openMenu === "Products" ? <ChevronDown /> : <ChevronRight />
              }
              active={isActive("/products") || isChildActive(["/products", "/categories"])}
              onClick={() => toggleMenu("Products")}
            >
              {openMenu === "Products" && (
                <div className="ml-6 mt-2 space-y-1 text-sm">
                  <SidebarSubItem
                    icon={<Boxes size={16} />}
                    label="Products"
                    active={isActive("/products")}
                    onClick={() => handleNavigation("/products")}
                  />
                  <SidebarSubItem
                    icon={<Tags size={16} />}
                    label="Categories"
                    active={isActive("/categories")}
                    onClick={() => handleNavigation("/categories")}
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
              arrowIcon={
                openMenu === "Stock" ? <ChevronDown /> : <ChevronRight />
              }
              active={isActive("/stock-in") || isActive("/stock-out")}
              onClick={() => toggleMenu("Stock")}
            >
              {openMenu === "Stock" && (
                <div className="ml-6 mt-2 space-y-1 text-sm">
                  <SidebarSubItem
                    icon={<ArrowDownCircle size={16} />}
                    label="Stock In"
                    active={isActive("/stock-in")}
                    onClick={() => handleNavigation("/stock-in")}
                  />
                  <SidebarSubItem
                    icon={<ArrowUpCircle size={16} />}
                    label="Stock Out"
                    active={isActive("/stock-out")}
                    onClick={() => handleNavigation("/stock-out")}
                  />
                </div>
              )}
            </SidebarItem>

            {/* Suppliers */}
            <SidebarItem
              icon={<Truck />}
              label="Suppliers"
              active={isActive("/suppliers")}
              onClick={() => handleNavigation("/suppliers")}
            />

            {/* Users / Roles */}
            <SidebarItem
              icon={<Users />}
              label="Users / Roles"
              active={isActive("/users")}
              onClick={() => handleNavigation("/users")}
            />

            {/* Reports / History */}
            <SidebarItem
              icon={<BarChart3 />}
              label="Reports / History"
              hasChildren
              isOpen={openMenu === "Reports"}
              arrowIcon={
                openMenu === "Reports" ? <ChevronDown /> : <ChevronRight />
              }
              active={
                isActive("/logs") ||
                isActive("/stock-reports") ||
                isActive("/low-stock-alerts")
              }
              onClick={() => toggleMenu("Reports")}
            >
              {openMenu === "Reports" && (
                <div className="ml-6 mt-2 space-y-1 text-sm">
                  <SidebarSubItem
                    icon={<Clock size={16} />}
                    label="Logs"
                    active={isActive("/logs")}
                    onClick={() => handleNavigation("/logs")}
                  />
                  <SidebarSubItem
                    icon={<BarChart3 size={16} />}
                    label="Stock Reports"
                    active={isActive("/stock-reports")}
                    onClick={() => handleNavigation("/stock-reports")}
                  />
                  <SidebarSubItem
                    icon={<AlertTriangle size={16} />}
                    label="Low Stock Alerts"
                    active={isActive("/low-stock-alerts")}
                    onClick={() => handleNavigation("/low-stock-alerts")}
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


    </div>
  );
};

export default Sidebar;
