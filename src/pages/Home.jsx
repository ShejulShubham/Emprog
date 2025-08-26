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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 pb-20">
      <h1 className="text-3xl font-bold mb-4">Welcome to Emprog</h1>
      <p className="text-lg mb-6">Track your favorite shows and movies easily.</p>
      <button
        onClick={handleGetStarted}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Get Started
      </button>
    </div>
  );
}
