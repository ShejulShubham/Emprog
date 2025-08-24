import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";
import Modal from "./components/Modal";
import { AppProvider } from "./AppContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AppProvider>
      <Modal />
      <Router>
        <Header />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth" element={<Auth isRegistration={true} />} />
            <Route path="/login" element={<Auth />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AppProvider>
  );
}

export default App;
