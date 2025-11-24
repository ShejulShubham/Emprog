import { useNavigate } from "react-router-dom";
import useAuthStore, { selectIsLoggedIn } from "../store/useAuthStore";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Home() {
  usePageTitle("Home");
  const isLoggedIn = useAuthStore(selectIsLoggedIn);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto space-y-8">
        {/* Logo/Brand */}
        <div className="space-y-2">
          <h1 className="text-4xl font-light text-gray-900 tracking-tight">
            Emprog
          </h1>
          <div className="w-12 h-px bg-gray-900 mx-auto"></div>
        </div>

        {/* Main message */}
        <div className="space-y-4">
          <p className="text-lg text-gray-600 leading-relaxed">
            Track your favorite shows and movies with simplicity.
          </p>
        </div>

        {/* CTA */}
        <div className="pt-4">
          <button
            onClick={handleGetStarted}
            className="w-full sm:w-auto px-8 py-3 bg-gray-900 text-white font-medium rounded-none hover:bg-gray-800 transition-colors duration-200"
          >
            {isLoggedIn ? "Turn here for Watchlist" : "Get Started"}
          </button>
        </div>

        {/* Simple feature list */}
        <div className="pt-8 space-y-3 text-sm text-gray-500">
          <p>• Keep track of what you're watching</p>
          <p>• Organize your entertainment</p>
          <p>• Never forget where you left off</p>
        </div>
      </div>
    </div>
  );
}