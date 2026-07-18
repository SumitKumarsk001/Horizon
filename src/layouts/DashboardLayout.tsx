

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const DashboardLayout = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [sidebarExpanded, setSidebarExpanded] = useState(isDesktop);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const updateState = () => {
      const desktop = window.innerWidth >= 1024;
      const tablet = window.innerWidth >= 768;

      setIsDesktop(desktop);
      setSidebarExpanded(desktop);
      if (!tablet || desktop) {
        setMobileOpen(false);
      }
    };

    updateState();
    window.addEventListener("resize", updateState);
    return () => window.removeEventListener("resize", updateState);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setMobileOpen((prev) => !prev);
    } else {
      setSidebarExpanded((prev) => !prev);
    }
  };

  const contentMargin = sidebarExpanded ? "lg:ml-[260px]" : "lg:ml-[80px]";

  return (
    <div className="min-h-screen flex overflow-hidden bg-gray-100 dark:bg-slate-900">
      <Sidebar
        isOpen={sidebarExpanded}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className={`flex-1 min-w-0 flex flex-col transition-all duration-300 ${contentMargin}`}>
        <Navbar onMenuClick={toggleSidebar} />

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
