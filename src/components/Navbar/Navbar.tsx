
import { FiSearch, FiBell, FiMoon ,FiSun,FiSidebar} from "react-icons/fi";
import { sidebarItems, } from "../Sidebar/sidebarData";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { toggleTheme } from "../../features/theme/themeSlice";
import { searchPagesApi,} from "../../services/searchService";
import axios from "axios";

type NavbarProps = {
  onMenuClick: () => void;
};

const Navbar = ({ onMenuClick }: NavbarProps) => {

const [search, setSearch] = useState("");
const [showResult, setShowResult] = useState(false);
const [filteredPages, setFilteredPages] = useState(sidebarItems);

const controllerRef = useRef<AbortController | null>(null);

const navigate = useNavigate();
 
  const dispatch = useAppDispatch();

  const theme = useAppSelector((state) => state.theme.mode);

   useEffect(() => {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
   }, [theme]);
  
  useEffect(() => {
  if (!search.trim()) {
    return;
  }

  const fetchResults = async () => {
    try {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const newController = new AbortController();
      controllerRef.current=newController;

      const response = await searchPagesApi(
        search,
        newController.signal
      );

      setFilteredPages(response.data);
    } catch (error) {
  if (axios.isCancel(error)) {
    return; // Ignore cancelled requests
  }
    }
  };

  fetchResults();
}, [search]); 

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
            <FiSidebar size={22} />
          </button>

          {/* Title */}
          <div>
            <h1 className="text-xl font-bold text-blue-600 dark:text-white">
             Horizon
            </h1>

            <p className="text-xs text-slate-500">
              Welcome Back 👋
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 justify-center px-10">
          <div className="relative w-full max-w-md">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
              <FiSearch className="text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowResult(true);
                }}
                className="w-full bg-transparent border-none px-2 py-1 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>

            {showResult && search && (
              <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-2xl bg-white shadow-xl border border-slate-200 overflow-hidden dark:bg-slate-900 dark:border-slate-700">
                {filteredPages.length > 0 ? (
                  filteredPages.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setSearch("");
                        setShowResult(false);
                      }}
                      className="block w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      {item.title}
                    </button>
                  ))
                ) : (
                  <p className="p-4 text-sm text-slate-500 dark:text-slate-400">No page found</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Notification */}
          <button className="rounded-full p-2 transition hover:bg-slate-100">
            <FiBell size={20} />
          </button>

          {/* Theme */}
          <button className="rounded-full p-2 transition hover:bg-slate-100" onClick={()=>dispatch(toggleTheme())}>
            {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>
         
         
        </div>
      </div>
    </header>
  );
};

export default Navbar;