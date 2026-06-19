import { Link, useLocation } from "react-router-dom";
import { MdMenu, MdClose, MdLightMode, MdDarkMode } from "react-icons/md";
import { useState } from "react";

const Navbar = ({ darkTheme, setDarkTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/tasks", label: "Tasks" },
    { path: "/attendance", label: "Attendance" },
    { path: "/notes", label: "Notes" },
  ];

  return (
    <nav className="relative bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800 shadow-lg shadow-blue-900/20 dark:shadow-blue-950/40 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-shrink-0 min-w-0">
            <h1 className="text-white dark:text-gray-100 text-base xs:text-lg sm:text-xl md:text-2xl font-bold tracking-tight truncate">
              <Link to="/">📊 Smart Dashboard</Link>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-2 ml-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 text-sm whitespace-nowrap ${
                  isActive(link.path)
                    ? "bg-white dark:bg-gray-200 text-blue-600 dark:text-blue-800 shadow-lg hover:shadow-xl"
                    : "text-white hover:bg-blue-500/50 dark:hover:bg-blue-700/50 hover:shadow-md"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button onClick={() => setDarkTheme((prev) => !prev)}>
              {darkTheme ? (
                <MdDarkMode className="text-white w-5 h-5" />
              ) : (
                <MdLightMode className="text-white w-5 h-5" />
              )}
            </button>
          </div>
          {/* Mobile Menu */}
          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800 shadow-lg dark:shadow-blue-950/40 px-4 py-5 flex flex-col gap-2 z-50 rounded-b-3xl">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`w-full text-center px-4 py-3 rounded-2xl text-base font-semibold transition-all duration-300 ${
                    isActive(link.path)
                      ? "bg-white dark:bg-gray-200 text-blue-600 dark:text-blue-800 shadow-md"
                      : "text-white hover:bg-white/10 dark:hover:bg-gray-700/30"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white dark:text-gray-300 text-4xl font-light"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
