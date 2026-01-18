import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Modal from "./components/Modal";
import { AppProvider } from "./AppContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RedirectIfNeeded from "./components/RouteGuard";
import NotFound from "./pages/NotFound";
import MainLayout from "./layout/MainLayout";
import UserSettings from "./pages/UserSettings";

function App() {
  return (
    <Router>
      <AppProvider>
        <Modal />

        <Routes>
          {/* GROUP 1: Pages with Header & Footer */}
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={
                <RedirectIfNeeded>
                  <Home />
                </RedirectIfNeeded>
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth" element={<Auth isRegistration={true} />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/settings" element={<UserSettings />} />
          </Route>

          {/* GROUP 2: Standalone Pages */}
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
