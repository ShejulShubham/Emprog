import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../store/useAuthStore";
import { useUserSettings } from "../store/useSettingStore";
import useAuthStore from "../store/useAuthStore";
import DarkMode from "./DarkMode";
import UserMenu from "./UserMenu";

const NavBar = () => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);
  const { settings, updateSetting } = useUserSettings();
  const isDirectToDashboard = settings.directToDashboard;

  function toggleDirectToDashboard() {
    updateSetting("directToDashboard", !settings.directToDashboard);
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-950 text-white shadow-lg z-50 transition-colors duration-300 ease-in-out">
      <nav className="px-4 flex justify-between items-center flex-wrap">
        {/* Logo */}
        <div className="text-xl font-bold cursor-default">
          {isDirectToDashboard ? (
            <>
            <div className="group relative" >
              <img className="h-20 w-20 " src="logo_text.png" alt="logo" />
              <span className="absolute -bottom-10 scale-0 transition-all rounded bg-red-900 dark:bg-red-800 p-2 text-xs lg:text-md text-white group-hover:scale-100 z-50 whitespace-nowrap shadow-lg">This Page is Locked</span>
            </div>
            </>
          ) : (
            <NavLink to="/">
              <img className="h-20 w-20 " src="logo_text.png" alt="logo" />
            </NavLink>
          )}
        </div>

        <div className="block scale-75">
          <DarkMode />
        </div>

        {isLoggedIn && <UserMenu toggleDirectToDashboard={toggleDirectToDashboard} isDirectToDashboard={isDirectToDashboard} />}
      </nav>
    </header>
  );
};

export default NavBar;
