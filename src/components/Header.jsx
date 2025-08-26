import NavBar from "./NavBar";
import { handleSignOut } from "../utils/authHandlers";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    if (handleSignOut()) {
      navigate("/login");
    }
  }

  return (
    <header>
      <div
        id="space"
        placeholder="space created for pushing content down"
        className="pt-20"
      ></div>
      <NavBar handleLogout={handleLogout}/>
    </header>
  );
}
