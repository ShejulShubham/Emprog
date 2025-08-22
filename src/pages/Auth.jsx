import { useState } from "react";
import { handleSignIn, handleSignUp } from "../utils/authHandlers";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Auth(props) {
  const { isRegistration } = props;

  const [isSignUp, setIsSignUp] = useState(isRegistration || false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  usePageTitle(isSignUp ? "Registration" : "Log-In");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await handleSignUp(email, password);
        alert("Sign Up Successful!");
      } else {
        await handleSignIn(email, password);
        alert("Sign In Successful!");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isSignUp ? "Create Account" : "Sign In"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
