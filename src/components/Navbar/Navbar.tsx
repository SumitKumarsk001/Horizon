
import { FiMenu, FiSearch, FiBell, FiMoon ,FiSun} from "react-icons/fi";
import { useEffect, useState } from "react";

type NavbarProps = {
  onMenuClick: () => void;
};

const Navbar = ({ onMenuClick }: NavbarProps) => {

  // State to manage theme (light/dark)
  const [theme, setTheme] = useState(() => {
  return localStorage.getItem("theme") || "light";
  }); 

  const toggleTheme = () => {
  const newTheme = theme === "light" ? "dark" : "light";

  setTheme(newTheme);

  localStorage.setItem("theme", newTheme);

  if (newTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  };

   useEffect(() => {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
   }, [theme]);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 shadow-sm transition-colors duration-300 dark:bg-slate-900 dark:border-slate-700 text-slate-900 dark:text-slate-200">
      <div className="flex h-full items-center justify-between px-6">

        {/* Left Section */}
        <div className="flex items-center gap-4">

          {/* Menu Button */}
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <FiMenu size={22} />
          </button>

          {/* Title */}
          <div>
            <h1 className="text-xl font-bold text-slate-800">
             Horizon
            </h1>

            <p className="text-xs text-slate-500">
              Welcome Back 👋
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 justify-center px-10">
          <div className="flex w-full max-w-md items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">

            <FiSearch className="text-slate-400" />

            <input
              type="text"
              placeholder="Search anything..."
              className="ml-3 w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Notification */}
          <button className="rounded-full p-2 transition hover:bg-slate-100">
            <FiBell size={20} />
          </button>

          {/* Theme */}
          <button className="rounded-full p-2 transition hover:bg-slate-100" onClick={toggleTheme}>
            {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>
         
         
          {/* Profile */}
          {/* <div className="flex items-center gap-3">

            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgl6XLGmKN4GX1drT9TmSldDW2TZCpG2p3tEIiJWY7QQ&s=10"
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover"
            />

            <div className="hidden lg:block">
              <h4 className="text-sm font-semibold text-slate-700">
                James
              </h4>
            </div>
          </div>   */}

          

        </div>
      </div>
    </header>
  );
};

export default Navbar;