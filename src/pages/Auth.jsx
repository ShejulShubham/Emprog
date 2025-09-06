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
      setError(err.message || "Something went wrong.");
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pb-20">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isSignUp ? "Create Account" : "Sign In"}
        </h2>

        {error && (
          <div className="text-center mb-4 text-red-600 text-sm bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            className="text-blue-600 hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
        {!isSignUp && (
          <p className="mt-2 text-center text-gray-600">
            Login with test account{" "}
            <button
              type="button"
              onClick={handleTestSignIn}
              className="text-blue-600 hover:underline"
            >
              Click here
            </button>
          </p>
        )}

        {/* Sign in with Google  */}

        <div className="flex items-center gap-2 my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="flex items-center justify-center w-full gap-3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
          >
            {/* Google Icon */}
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google logo"
              className="w-5 h-5"
            />
            <span className="text-gray-700 font-medium">
              Continue with Google
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
