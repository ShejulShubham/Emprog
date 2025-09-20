import NavBar from "./NavBar";
import { handleSignOut } from "../utils/authHandlers";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Render minimal home header on home page
  if (location.pathname === '/') {
    return (
      <header className="absolute top-0 left-0 right-0 z-10">
        <div className="m-1 px-4 sm:px-6 py-6 flex item-center max-w-6xl mx-auto">
          {/* Logo */}
          <div className="text-xl font-light text-gray-900 tracking-tight">
            Emprog
          </div>
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
    <header>
      <NavBar handleLogout={handleLogout} />
    </header>
  );
}