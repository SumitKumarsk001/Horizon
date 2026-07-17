

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const DashboardLayout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const updateState = () => {
      const desktop = window.innerWidth >= 1024;
      const tablet = window.innerWidth >= 768;

      setSidebarExpanded(desktop);
      if (!tablet) {
        setMobileOpen(false);
      }
    };

    updateState();
    window.addEventListener("resize", updateState);
    return () => window.removeEventListener("resize", updateState);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setMobileOpen((prev) => !prev);
    } else {
      setSidebarExpanded((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-slate-100">
      <Sidebar
        isOpen={sidebarExpanded}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex-1 min-w-0">
        <Navbar onMenuClick={toggleSidebar} />

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
