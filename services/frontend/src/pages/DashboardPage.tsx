import React, { useState } from "react";
import ComingSoonModal from "../components/common/ComingSoonModal";
import SEO from "../components/common/SEO";
import SidebarLeft from "../components/layout/SidebarLeft";
import SidebarRight from "../components/layout/SidebarRight";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState<boolean>(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState<boolean>(false);

  const showComingSoon = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
    setIsRightSidebarOpen(false);
  };

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
    setIsLeftSidebarOpen(false);
  };

  return (
    <div className="dashboard-container">
      <SEO
        title="Dashboard – Vormirex"
        description="Your personal learning dashboard. Track your courses, streaks, and upcoming live sessions."
        url="https://vormirex.com/"
      />
      <ComingSoonModal isOpen={isModalOpen} onClose={closeModal} />

      {/* LEFT SIDEBAR */}
      <SidebarLeft
        isOpen={isLeftSidebarOpen}
        toggleSidebar={toggleLeftSidebar}
        showComingSoon={showComingSoon}
      />

      {/* MAIN CONTENT */}
      <DashboardLayout
        toggleLeftSidebar={toggleLeftSidebar}
        toggleRightSidebar={toggleRightSidebar}
        showComingSoon={showComingSoon}
      />

      {/* RIGHT SIDEBAR */}
      <SidebarRight
        isOpen={isRightSidebarOpen}
        toggleSidebar={toggleRightSidebar}
        showComingSoon={showComingSoon}
      />
    </div>
  );
}
