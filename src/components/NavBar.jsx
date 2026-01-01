import { useState } from "react";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../store/useAuthStore";
import { useUserSettings } from "../store/useSettingStore";
import useAuthStore from "../store/useAuthStore";
import DarkMode from "./DarkMode";

const NavBar = ({ handleLogout }) => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);
  const { settings, updateSetting } = useUserSettings();
  const isDirectToDashboard = settings.directToDashboard;

  function toggleDirectToDashboard() {
    updateSetting("directToDashboard", !settings.directToDashboard);
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-950 text-white shadow-lg z-50">
      <nav className="px-2 flex justify-between items-center flex-wrap">
        {/* Logo */}
        <div className="text-xl font-bold cursor-default">
          {isDirectToDashboard ? (
            <img className="h-20 w-20 " src="logo_text.png" alt="logo" />
          ) : (
            <NavLink to="/" onClick={() => setIsOpen(false)}>
              <img className="h-20 w-20 " src="logo_text.png" alt="logo" />
            </NavLink>
          )}
        </div>

        <div className="hidden sm:block scale-75">
          <DarkMode />
        </div>

        {/* Login menu */}
        <div>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="hidden sm:block bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>

        {/* TODO: Create dropdown menu */}
        <div className="sm:hidden">
          <label>
            <div className="w-9 h-10 cursor-pointer flex flex-col items-center justify-center">
              <input className="hidden peer" type="checkbox" />
              <div className="w-[50%] h-[2px] bg-white rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]" />
              <div className="w-[50%] h-[2px] bg-white rounded-md transition-all duration-300 origin-center peer-checked:hidden" />
              <div className="w-[50%] h-[2px] bg-white rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]" />
            </div>
          </label>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
