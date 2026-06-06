import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import DashboardNavbar from "../dashboard/Navbar";
import ScrollToTop from "../scroll-tops";
import AITutorWidget from "../ai-tutor-widget";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">

      <ScrollToTop />

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <DashboardNavbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="lg:ml-64  pt-20 lg:pt-[4rem] p-6">
        <Outlet />
        <AITutorWidget />
      </main>
    </div>
  );
};

export default DashboardLayout;

