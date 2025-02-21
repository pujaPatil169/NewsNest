// Previous imports remain unchanged
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import { logout, setToken } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import Search from "../specific/Search";
import TemporaryDrawer from "../Sidebar/TemporaryDrawer";

export default function Header() {
  // Previous state and functions remain unchanged
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Add handleSearchToggle function
  const handleSearchToggle = () => setToggleSearch((prev) => !prev);

  // Responsive styles
  const headerStyles = "sticky top-0 z-50 w-full bg-opacity-70 backdrop-blur-md shadow-md";
  const navStyles = "mx-auto px-4 sm:px-6 py-3 flex justify-between items-center";
  const desktopNavStyles = "hidden lg:flex items-center space-x-6";
  const mobileNavButtonStyles = "lg:hidden p-2 text-gray-600 hover:text-orange-500";
  const mobileMenuStyles = "lg:hidden absolute top-16 left-0 w-full bg-gray-900 bg-opacity-95 backdrop-blur-md p-4 sm:p-6 shadow-lg";
  const navLinkClass = ({ isActive }) =>
    `relative text-base sm:text-lg font-medium tracking-wide px-3 sm:px-4 py-2 transition-all duration-300 ${
      isActive ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-300 hover:text-white"
    }`;

  // Previous handleLogout and useEffect remain unchanged
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      setIsAuthenticated(false);
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const authFunc = () => {
      axios
        .get("http://localhost:4000/api/auth/check-auth", {
          withCredentials: true,
        })
        .then((response) => {
          setIsAuthenticated(true);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            setIsAuthenticated(false);
            navigate("/auth");
          } else {
            console.error("Auth check failed:", error);
          }
        });
    };
    authFunc();
  }, [navigate]);

  return (
    <header className={headerStyles}>
      <nav className={navStyles}>
        {/* Desktop Navigation */}
        <div className={desktopNavStyles}>
          Category <TemporaryDrawer />
          <NavLink to="/home" className={navLinkClass}>
            Sources
          </NavLink>
          <NavLink to="/media" className={navLinkClass}>
            Media
          </NavLink>
          <NavLink to="/enewspapers" className={navLinkClass}>
            E-NewsPapers
          </NavLink>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base text-white bg-red-600 rounded hover:bg-red-700 transition-all"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/auth"
                className="hidden lg:block px-4 sm:px-5 py-1 sm:py-2 text-sm sm:text-base text-white bg-orange-600 rounded-full hover:bg-orange-700 transition-all"
              >
                Register
              </Link>
              <Link
                to="/auth"
                className="hidden lg:block px-4 sm:px-5 py-1 sm:py-2 text-sm sm:text-base text-white bg-orange-600 rounded-full hover:bg-orange-700 transition-all"
              >
                Log in
              </Link>
            </>
          )}

          <IconButton
            onClick={handleSearchToggle}
            aria-label="Toggle Search"
            color="inherit"
            className="text-white"
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className={mobileNavButtonStyles}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={mobileMenuStyles}
          >
            <div className="flex flex-col space-y-3 sm:space-y-4">
              {["politics", "world", "business", "technology", "science", "entertainment", "sports", "general", "health"].map((category) => (
                <NavLink
                  key={category}
                  to={`/news/${category}`}
                  className="text-white text-base sm:text-lg font-medium tracking-wide px-3 sm:px-4 py-2 hover:bg-gray-700 rounded-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </NavLink>
              ))}

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base text-white bg-red-600 rounded hover:bg-red-700 transition-all"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base text-white bg-orange-600 rounded-full hover:bg-orange-700 transition-all"
                  >
                    Register
                  </Link>
                  <Link
                    to="/auth"
                    className="px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base text-white bg-orange-600 rounded-full hover:bg-orange-700 transition-all"
                  >
                    Log in
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Search
        toggleSearch={toggleSearch}
        handleSearchToggle={handleSearchToggle}
      />
    </header>
  );
}
