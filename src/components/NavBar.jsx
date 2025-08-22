import { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { handleSignOut } from "../utils/authHandlers";

const NavBar = () => {
  const user = useAuthStore((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `block px-4 py-2 transition ${
      isActive
        ? "text-blue-500 font-semibold border-b-2 border-blue-500"
        : "hover:text-blue-400"
    }`;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-lg z-50">
      <nav className="px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            Emprog
          </NavLink>
        </div>

        {/* Login menu */}
        <div>
          {user ? (
            <button
              onClick={handleSignOut}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className="mr-4">
                Sign In
              </NavLink>
              <NavLink to="/auth" className="bg-blue-500 px-4 py-2 rounded">
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClasses}>
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? (
            // Close Icon (X)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Menu Icon (Hamburger)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 flex flex-col items-center md:hidden shadow-lg">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `w-full text-center py-3 hover:bg-gray-800 ${
                  isActive ? "text-blue-500 font-semibold bg-gray-800" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default NavBar;
