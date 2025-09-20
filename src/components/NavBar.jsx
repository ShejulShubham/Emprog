import { useState } from "react";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../store/useAuthStore";
import { useUserSettings } from "../store/useSettingStore";
import useAuthStore from "../store/useAuthStore";

const NavBar = ({ handleLogout }) => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);
  const { settings, updateSetting } = useUserSettings();
  const isDirectToDashboard = settings.directToDashboard;

  function toggleDirectToDashboard() {
    updateSetting("directToDashboard", !settings.directToDashboard);
  }

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

        <div>
          {isLoggedIn &&
            (isDirectToDashboard ? (
              <button
                title="Disable Direct to Dashboard"
                onClick={toggleDirectToDashboard}
                className="bg-green-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold transition-transform transform hover:scale-105"
              >
                On
              </button>
            ) : (
              <button
                title="Enable Direct to Dashboard"
                onClick={toggleDirectToDashboard}
                className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-semibold transition-transform transform hover:scale-105"
              >
                Off
              </button>
            ))}
        </div>

        {/* Login menu */}
        <div>
          {isLoggedIn && (
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
