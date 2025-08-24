import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/loadingContext";
import useAuthStore, { selectIsLoggedIn } from "../store/useAuthStore";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Home() {
  usePageTitle("Home")
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "white",
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "16px",
  };

  const paragraphStyle = {
    fontSize: "1.2rem",
    marginBottom: "24px",
  };

  const buttonStyle = {
    backgroundColor: "white",
    color: "#4f46e5",
    padding: "12px 24px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    transition: "transform 0.2s, background 0.3s",
  };

  const buttonHover = {
    transform: "scale(1.05)",
    backgroundColor: "#f3f4f6",
  };

  const isLoggedIn = useAuthStore(selectIsLoggedIn);
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    showLoading();

    setTimeout(() => {
      hideLoading();
      if (isLoggedIn) {
        navigate("/dashboard"); // Redirect to dashboard if logged in
      } else {
        navigate("/login"); // Otherwise, go to login
      }
    }, 1000); // simulate loading for UX
  };

  return (
    <div style={containerStyle}>
      <div>
        <h1 style={headingStyle}>Welcome to WatchTrack</h1>
        <p style={paragraphStyle}>
          Track your favorite movies, shows, and videos all in one place.
        </p>
        <button
          onClick={handleGetStarted}
          style={buttonStyle}
          onMouseOver={(e) => Object.assign(e.target.style, buttonHover)}
          onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
