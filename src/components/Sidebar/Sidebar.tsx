

import { NavLink,useNavigate } from "react-router-dom";
import { sidebarItems } from "./sidebarData";
import { FiLogOut } from "react-icons/fi";
import clsx from "clsx";
import { useEffect, useState } from "react";

type SidebarProps = {
  isOpen: boolean;
  mobileOpen: boolean;
  onClose: () => void;
};
type User = {
  firstName: string;
  lastName: string;
  profileImage: string;
};

const Sidebar = ({ isOpen, mobileOpen, onClose }: SidebarProps) => {
  const showLabels = (isOpen && !mobileOpen) || mobileOpen;
  const sidebarVisible = isOpen || mobileOpen;
  const widthClasses = mobileOpen
    ? "w-[260px] lg:w-[260px]"
    : isOpen
    ? "lg:w-[260px] w-[80px]"
    : "lg:w-[80px] w-[80px]";

  const parseStoredUser = (): User | null => {
    if (typeof window === "undefined") return null;
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser) as User;
    } catch {
      return null;
    }
  };

  // Get user data from localStorage and set to in profile.
  const [user, setUser] = useState<User | null>(parseStoredUser);

  useEffect(() => {
    const syncUser = () => {
      setUser(parseStoredUser());
    };

    window.addEventListener("userUpdated", syncUser);
    window.addEventListener("storage", syncUser);
    return () => {
      window.removeEventListener("userUpdated", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);
  
  const navigate = useNavigate();

   const handleLogout = () => {
    // Remove login session
    localStorage.removeItem("isLoggedIn");

    // Optional: Remove user data
    // localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <aside
        className={clsx(
          " bg-gray-100 dark:bg-slate-900 fixed inset-y-0 left-0 z-50 flex h-screen min-h-screen flex-col justify-between bg-gradient-to-b from-blue-700 to-blue-900 text-white transition-all duration-300 overflow-hidden ",
          sidebarVisible ? "translate-x-0" : "-translate-x-full",
          "lg:fixed lg:translate-x-0",
          widthClasses
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b border-blue-600 px-3">
          {showLabels ? (
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
                    showLabels ? "px-4 py-3" : "px-2 py-3 justify-center",
                    isActive ? "bg-white text-blue-700 shadow-md" : "hover:bg-blue-600 text-white"
                  )
                }
              >
                <span className={showLabels ? "" : "flex w-full items-center justify-center"}>
                  <Icon size={showLabels ? 22 : 20} />
                </span>

                <span
                  className={clsx(
                    "ml-4 whitespace-nowrap transition-all duration-300",
                    showLabels ? "opacity-100" : "hidden"
                  )}
                >
                  {item.title}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom User Section */}
        <div className={clsx("w-full pb-6", showLabels ? "px-3" : "px-0 flex justify-center")}>
          {showLabels ? (
            <div className="flex items-center justify-between gap-4 rounded-xl bg-blue-600 px-3 py-3">
              <div className="flex items-center gap-3">
                <img
                  src={user?.profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgl6XLGmKN4GX1drT9TmSldDW2TZCpG2p3tEIiJWY7QQ&s=10"}
                  alt="User"
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
                </div>
              </div>

              <button onClick={handleLogout} className="rounded-lg p-2 transition hover:bg-blue-500">
                <FiLogOut />
              </button>
            </div>
          ) : (
            <div className="  gap-2 rounded-full bg-blue-600 p-2">
              <img
                src={user?.profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgl6XLGmKN4GX1drT9TmSldDW2TZCpG2p3tEIiJWY7QQ&s=10"}
                alt="User"
                className="h-10 w-10 rounded-full "
              />
              <button onClick={handleLogout} className="rounded-full p-2 transition hover:bg-blue-500 pl-3">
                <FiLogOut/>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;