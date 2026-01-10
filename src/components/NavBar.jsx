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
  const [openMenu, setOpenMenu] = useState(false);

  function toggleDirectToDashboard() {
    updateSetting("directToDashboard", !settings.directToDashboard);
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-950 text-white shadow-lg z-50">
      <nav className="px-4 flex justify-between items-center flex-wrap">
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

        <div className="block scale-75">
          <DarkMode />
        </div>

        {/* Login menu */}
        {isLoggedIn && (
          <div>
            <button
              onClick={handleLogout}
              className="hidden sm:block bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        )}

        {/* TODO: Create dropdown menu */}
        {isLoggedIn && (
          <div className="sm:hidden">
            <label>
              <div className="w-9 h-10 cursor-pointer flex flex-col items-center justify-center">
                <input
                  checked={openMenu}
                  onChange={() => {
                    setOpenMenu((prev) => !prev);
                  }}
                  className="hidden peer"
                  type="checkbox"
                />
                <div className="w-[50%] h-[2px] bg-white rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]" />
                <div className="w-[50%] h-[2px] bg-white rounded-md transition-all duration-300 origin-center peer-checked:hidden" />
                <div className="w-[50%] h-[2px] bg-white rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]" />
              </div>
              <div className={openMenu ? "group relative" : "hidden"}>
                <button
                  onClick={toggleDirectToDashboard}
                  className={
                    isDirectToDashboard
                      ? "px-2 py-1 rounded-full text-sm font-semibold transition-transform transform hover:scale-105 bg-green-100 text-blue-800"
                      : "px-2 py-1 rounded-full text-sm font-semibold transition-transform transform hover:scale-105 bg-purple-100 text-purple-800"
                  }
                >
                  {isDirectToDashboard ? "On" : "Off"}
                </button>
                <span className="absolute -bottom-20 -left-5 scale-0 transition-all rounded bg-gray-700 p-2 text-xs text-white group-hover:scale-100">
                  Direct To Dashboard
                </span>
              </div>
            </label>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
