import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddItem from "./pages/AddItem";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { ModalProvider } from "./context/modalContext";
import Modal from "./components/Modal";

function App() {
  return (
    <ModalProvider>
      <Modal />
      <Router>
        <Header />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddItem />} />
            <Route path="/auth" element={<Auth isRegistration={true} />} />
            <Route path="/login" element={<Auth />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ModalProvider>
  );
}

export default App;
