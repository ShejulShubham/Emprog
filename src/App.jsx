import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Modal from "./components/Modal";
import { AppProvider } from "./AppContext";

function App() {
  return (
    <AppProvider>
      <Modal />
      <Router>
        <Header />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
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
