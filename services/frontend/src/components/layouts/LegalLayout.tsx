import LandingNavbar from "../landing/Navbar";
import Footer from "../landing/Footer";
import { Outlet } from "react-router-dom";

const LegalLayout = () => {
  return (
    <div className="min-h-screen bg-[#020004] text-white flex flex-col">
      
      <LandingNavbar />

      <main className="flex-1 pt-16 px-6">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
};

export default LegalLayout;