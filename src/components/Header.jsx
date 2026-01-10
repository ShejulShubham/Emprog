import NavBar from "./NavBar";
import { handleSignOut } from "../utils/authHandlers";
import { useNavigate, useLocation } from "react-router-dom";
import DarkMode from "./DarkMode";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Render minimal home header on home page
  if (location.pathname === '/') {
    return (
      <header className="fixed w-full flex justify-between flex-wrap">
        <div className="m-1 px-2 flex item-center max-w-6xl">
          {/* Logo */}
          <div className="text-xl font-light text-gray-900 tracking-tight">
            <img className="h-20 w-20" src="logo_text.png" alt="logo" />
          </div>
        </div>
        <div className="m-1 px-2 flex item-center max-w-6xl scale-75">
          <DarkMode />
        </div>
      </header>
    );
  }

  function handleLogout() {
    if (handleSignOut()) {
      navigate("/login");
    }
  }

  return (
      <NavBar handleLogout={handleLogout} />
  );
}