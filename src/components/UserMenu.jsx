import { useState, useRef, useEffect } from "react";
import useAuthStore, { selectUser } from "../store/useAuthStore";
import { handleSignOut } from "../utils/authHandlers"
import { useLocation, useNavigate } from "react-router-dom";

export default function UserMenu({ toggleDirectToDashboard, isDirectToDashboard }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const user = useAuthStore(selectUser);
    const { displayName, email, photoURL } = user;

    function handleLogout() {
        if (handleSignOut()) {
            navigate("/login");
        }
    }

    function handleSettings(){
        setOpen(false);
        navigate("/settings")
    }


    // Close menu when clicking outside
    useEffect(() => {

        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            {/* Profile Avatar */}
            <button
                onClick={() => setOpen(!open)}
                className="focus:outline-none"
            >
                <img
                    src={photoURL || "./user-regular-full.svg"}
                    alt="User profile"
                    className="w-10 h-10 bg-white rounded-full border border-gray-300"
                />
            </button>

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute right-0 mt-3 w-64 bg-zinc-900 text-white rounded-xl shadow-xl p-4 z-50">
                    {/* User Info */}
                    <div className="text-center mb-4">
                        <p className="font-medium">Hi, {displayName || "User"}!</p>
                        <p className="text-sm text-gray-400">
                            {email}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                        {/* TODO: Create this as toggle button */}
                        { pathname === "/dashboard" && <label className="px-2 flex justify-between">
                            Direct To Dashboard
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
                        </label>}
                        {/* TODO: Implement User Settings */}
                        <button onClick={()=>{alert("Action Coming Soon!")}} className="w-full py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition">
                            Manage your account
                        </button>
                        <button className="py-2 w-full rounded-lg bg-red-800 hover:bg-zinc-700 transition" onClick={handleLogout}>
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
