import { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const NavBar = ({ handleLogout }) => {
  const user = useAuthStore((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);

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
          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
