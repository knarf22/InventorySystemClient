import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen font-jakarta bg-background text-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        <Outlet /> {/* ✅ This is where each page (like ProductsPage) will render */}
      </div>
    </div>
  );
};

export default Layout;
