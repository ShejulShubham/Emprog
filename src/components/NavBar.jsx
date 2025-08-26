import { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const NavBar = ({ handleLogout }) => {
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
    { name: "Dashboard", path: "/dashboard" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
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

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClasses}>
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Login menu */}
        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <div className="m-2">
              <NavLink to="/login" className="px-4 py-2">
                Sign In
              </NavLink>
              <NavLink to="/auth" className="bg-blue-500 px-4 py-2 rounded">
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
