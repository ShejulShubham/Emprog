import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddItem from "./pages/AddItem";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Header />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddItem />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
