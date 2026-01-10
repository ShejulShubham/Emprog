import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/loadingContext";
import {
  handleGoogleSignIn,
  handleSignIn,
  handleSignUp,
} from "../utils/authHandlers";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Auth({ isRegistration }) {
  const [isSignUp, setIsSignUp] = useState(isRegistration || false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  usePageTitle("Auth");

  const handleGoogleLogin = async () => {
    try {
      await handleGoogleSignIn();

      navigate("/dashboard");
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setError(error.message || "Something went wrong.");
    }
  };

  const validateForm = () => {
    if (!email || !password) {
      setError("All fields are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    showLoading();
    try {
      if (isSignUp) {
        if (email === "test@gmail.com" && password === "password") {
          setError("You have entered the test credentials");
          return;
        }

        await handleSignUp(email, password);
      } else {
        await handleSignIn(email, password);
      }
      navigate("/dashboard");
    } catch (err) {
      if (err.message === "Firebase: Error (auth/invalid-credential).") {
        setError("Email or Password is wrong");
      } else {
        setError(err.message || "Something went wrong.");
      }
    } finally {
      hideLoading();
    }
  };

  function handleTestSignIn() {
    setEmail("test@gmail.com");
    setPassword("password");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-950 pb-20 transition-colors duration-300">
  <div className="bg-white dark:bg-slate-900 shadow-lg dark:shadow-black/30 rounded-xl w-full max-w-md p-8 border border-transparent dark:border-slate-800">
    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
      {isSignUp ? "Create Account" : "Sign In"}
    </h2>

    {error && (
      <div className="text-center mb-4 text-red-600 dark:text-red-400 text-sm bg-red-100 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-900/30">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all active:scale-[0.98] font-semibold"
      >
        {isSignUp ? "Sign Up" : "Sign In"}
      </button>
    </form>

    <div className="mt-6 text-center space-y-2">
      <p className="text-gray-600 dark:text-gray-400">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError("");
          }}
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
      
      {!isSignUp && (
        <p className="text-gray-600 dark:text-gray-400">
          Login with test account{" "}
          <button
            type="button"
            onClick={handleTestSignIn}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Click here
          </button>
        </p>
      )}
    </div>

    {/* Divider */}
    <div className="flex items-center gap-2 my-6">
      <div className="flex-grow h-px bg-gray-300 dark:bg-slate-700"></div>
      <span className="text-gray-500 dark:text-gray-500 text-sm">or</span>
      <div className="flex-grow h-px bg-gray-300 dark:bg-slate-700"></div>
    </div>

    {/* Google Login */}
    <div className="mt-6">
      <button
        onClick={handleGoogleLogin}
        type="button"
        className="flex items-center justify-center w-full gap-3 px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg shadow-sm bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-white transition-all active:scale-[0.98]"
      >
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google logo"
          className="w-5 h-5"
        />
        <span className="font-medium">
          Continue with Google
        </span>
      </button>
    </div>
  </div>
</div>
  );
}
