import {Outlet} from "react-router-dom"
import Header from "../components/Header";
import Footer from "../components/Footer";

// This component acts as a wrapper for pages that NEED the Header and Footer
export default function MainLayout(){
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Outlet is where the child route (Home, Dashboard, etc.) renders */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};