import React, { useState } from "react";
import ComingSoonModal from "../common/ComingSoonModal";
import SEO from "../common/SEO";
import SidebarLeft from "../layout/SidebarLeft";
import SidebarRight from "../layout/SidebarRight";
import AccountSecurity from "./components/AccountSecurity";
import Appearance from "./components/Appearance";
import Notifications from "./components/Notifications";
import LearningPreferences from "./components/LearningPreferences";
import ChatAI from "./components/ChatAI";
import PrivacyData from "./components/PrivacyData";
import HelpSupport from "./components/HelpSupport";
import Legal from "./components/Legal";
import DangerZone from "./components/DangerZone";
import SettingsHub from "./components/SettingsHub";
import { faBars, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard } from "lucide-react";



type SettingsSection =
  | "hub"
  | "account-security"
  | "appearance"
  | "notifications"
  | "learning-preferences"
  | "chat-ai"
  | "privacy-data"
  | "help-support"
  | "legal"
  | "danger-zone";

export default function SettingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SettingsSection>("hub");

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

  const handleSectionChange = (section: SettingsSection) => {
    setActiveSection(section);
  };

  const navigate = useNavigate();
  const handleDashboard = () => {
    navigate('/');
  };

  const renderContent = () => {
    switch (activeSection) {
      case "hub":
        return <SettingsHub onSectionSelect={handleSectionChange} />;
      case "account-security":
        return <AccountSecurity onBack={() => setActiveSection("hub")} />;
      case "appearance":
        return <Appearance onBack={() => setActiveSection("hub")} />;
      case "notifications":
        return <Notifications onBack={() => setActiveSection("hub")} />;
      case "learning-preferences":
        return <LearningPreferences onBack={() => setActiveSection("hub")} />;
      case "chat-ai":
        return <ChatAI onBack={() => setActiveSection("hub")} />;
      case "privacy-data":
        return <PrivacyData onBack={() => setActiveSection("hub")} />;
      case "help-support":
        return <HelpSupport onBack={() => setActiveSection("hub")} />;
      case "legal":
        return <Legal onBack={() => setActiveSection("hub")} />;
      case "danger-zone":
        return <DangerZone onBack={() => setActiveSection("hub")} />;
      default:
        return <SettingsHub onSectionSelect={handleSectionChange} />;
    }
  };

  return (

    <div className="dashboard-container">
      <SEO
        title="Settings – Vormirex"
        description="Manage your account, appearance, notifications, and more."
      />
      <ComingSoonModal isOpen={isModalOpen} onClose={closeModal} />

      <header className="settings-top-bar">
        <button
          className="mobile-menu-toggle"
          onClick={toggleLeftSidebar}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <h1 className="settings-title-mobile">Settings</h1>

        <button
          className="tools-button-mobile"
          onClick={toggleRightSidebar}
        >
          <FontAwesomeIcon icon={faThumbTack} />
        </button>
        <button
            className="nav-button dashboard-btn"
            onClick={handleDashboard}
            aria-label="Go to dashboard"
          >
            <LayoutDashboard size={22} />
          </button>
      </header>


      <SidebarLeft
        isOpen={isLeftSidebarOpen}
        toggleSidebar={toggleLeftSidebar}
        showComingSoon={showComingSoon}
      />

      <main className="main-content settings-main-content">
        {renderContent()}
      </main>

      <SidebarRight
        isOpen={isRightSidebarOpen}
        toggleSidebar={toggleRightSidebar}
        showComingSoon={showComingSoon}
      />
    </div>
  );
}