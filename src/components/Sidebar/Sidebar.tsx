

import { NavLink } from "react-router-dom";
import { sidebarItems } from "./sidebarData";
import { FiLogOut } from "react-icons/fi";
import clsx from "clsx";

type SidebarProps = {
  isOpen: boolean;
  mobileOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, mobileOpen, onClose }: SidebarProps) => {
  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 flex h-screen min-h-screen flex-col justify-between bg-gradient-to-b from-blue-700 to-blue-900 text-white transition-all duration-300 overflow-hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:static md:translate-x-0",
          isOpen ? "md:w-[260px]" : "md:w-[80px]",
          "w-[260px]"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b border-blue-600 px-3">
          {isOpen ? (
            <h1 className="text-2xl font-bold tracking-wide">Horizon</h1>
          ) : (
            <h1 className="text-2xl font-bold">H</h1>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    "mb-2 flex items-center rounded-xl transition-all duration-300",
                    isOpen ? "px-4 py-3" : "px-2 py-3 justify-center",
                    isActive ? "bg-white text-blue-700 shadow-md" : "hover:bg-blue-600 text-white"
                  )
                }
              >
                <span className={isOpen ? "" : "flex w-full items-center justify-center"}>
                  <Icon size={isOpen ? 22 : 20} />
                </span>

                <span
                  className={clsx(
                    "ml-4 whitespace-nowrap transition-all duration-300",
                    isOpen ? "opacity-100" : "hidden"
                  )}
                >
                  {item.title}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom User Section */}
        <div className={clsx("w-full pb-6", isOpen ? "px-3" : "px-0 flex justify-center")}>
          <div className={clsx("flex items-center bg-blue-600", isOpen ? "rounded-xl p-3" : "rounded-full p-2")}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgl6XLGmKN4GX1drT9TmSldDW2TZCpG2p3tEIiJWY7QQ&s=10"
              alt="User"
              className="h-10 w-10 rounded-full"
            />

            <div
              className={clsx(
                "ml-3 transition-all duration-300 overflow-hidden jutify-between items-center flex gap-17",
                isOpen ? "opacity-100" : "hidden"
              )}
            >
              <p className="font-semibold">James</p>
               <button><FiLogOut/></button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;