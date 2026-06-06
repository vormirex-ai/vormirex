
import React, { useState } from 'react';
import ComingSoonModal from '../common/ComingSoonModal';
import SEO from '../common/SEO';
import SidebarLeft from '../layout/SidebarLeft';
import SidebarRight from '../layout/SidebarRight';
import Appearance from './components/Appearance';
import Notifications from './components/Notifications';
import LearningPreferences from './components/LearningPreferences';
import ChatAI from './components/ChatAI';
import PrivacyData from './components/PrivacyData';
import HelpSupport from './components/HelpSupport';
import Legal from './components/Legal';
import DangerZone from './components/DangerZone';
import SettingsHub from './components/SettingsHub';
import { faBars, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import BaseModal from '../common/Modals/BaseModal';

type SettingsSection =
  | 'hub'
  | 'appearance'
  | 'notifications'
  | 'learning-preferences'
  | 'chat-ai'
  | 'privacy-data'
  | 'help-support'
  | 'legal'
  | 'danger-zone';

export default function SettingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SettingsSection>('hub');
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const [modalTitle, setModalTitle] = useState<string>('');

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
    navigate('/dashboard');
  };

  const openContentModal = (title: string, content: React.ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setIsContentModalOpen(true);
  };

  const closeContentModal = () => {
    setIsContentModalOpen(false);
    setModalContent('');
    setModalTitle('');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'hub':
        return <SettingsHub onSectionSelect={handleSectionChange} />;
      case 'appearance':
        return <Appearance onBack={() => setActiveSection('hub')} />;
      case 'notifications':
        return <Notifications onBack={() => setActiveSection('hub')} />;
      case 'learning-preferences':
        return <LearningPreferences onBack={() => setActiveSection('hub')} />;
      case 'chat-ai':
        return <ChatAI onBack={() => setActiveSection('hub')} />;
      case 'privacy-data':
        return (
          <PrivacyData
            onBack={() => setActiveSection('hub')}
            onAction={openContentModal}
          />
        );
      case 'help-support':
        return (
          <HelpSupport
            onBack={() => setActiveSection('hub')}
            onAction={openContentModal}
          />
        );
      case 'legal':
        return (
          <Legal
            onBack={() => setActiveSection('hub')}
            onAction={(content) =>
              openContentModal('Legal Information', content)
            }
          />
        );

      case 'danger-zone':
        return <DangerZone onBack={() => setActiveSection('hub')} />;
      default:
        return <SettingsHub onSectionSelect={handleSectionChange} />;
    }
  };
  const sectionTitles: Record<SettingsSection, string> = {
    hub: 'Settings',
    appearance: 'Appearance',
    notifications: 'Notifications',
    'learning-preferences': 'Learning Preferences',
    'chat-ai': 'Chat AI',
    'privacy-data': 'Privacy & Data',
    'help-support': 'Help & Support',
    legal: 'Legal',
    'danger-zone': 'Danger Zone',
  };

  return (
    <div className="dashboard-container">
      <SEO
        title="Settings – Vormirex"
        description="Manage your account, appearance, notifications, and more."
      />
      <ComingSoonModal isOpen={isModalOpen} onClose={closeModal} />
      <BaseModal isOpen={isContentModalOpen} onClose={closeContentModal}>
        <h3>{modalTitle}</h3>
        <div className="modal-body-content">{modalContent}</div>
      </BaseModal>

      <header className="settings-top-bar">
        <button className="mobile-menu-toggle" onClick={toggleLeftSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>

        <h1 className="settings-title-mobile">
          {sectionTitles[activeSection]}
        </h1>

        <button className="tools-button-mobile" onClick={toggleRightSidebar}>
          <FontAwesomeIcon icon={faThumbTack} />
        </button>
        {activeSection === 'hub' ? (
          <button
            className="dashboard-btn mobile-only"
            onClick={handleDashboard}
            aria-label="Go to dashboard"
          >
            <LayoutDashboard size={22} />
          </button>
        ) : (
          <button
            className="dashboard-btn mobile-only"
            onClick={() => setActiveSection('hub')}
            aria-label="Back to settings"
          >
            ←
          </button>
        )}
      </header>

      <SidebarLeft
        isOpen={isLeftSidebarOpen}
        toggleSidebar={toggleLeftSidebar}
        showComingSoon={showComingSoon}
      />

      <main className="main-content settings-main-content">
        <div className="settings-header-row">
          <h1 className="settings-title-desktop">
            {sectionTitles[activeSection]}
          </h1>

          {activeSection === 'hub' ? (
            <button
              className="dashboard-btn desktop-only"
              onClick={handleDashboard}
              aria-label="Go to dashboard"
            >
              <LayoutDashboard size={22} />
            </button>
          ) : (
            <button
              className="dashboard-btn desktop-only"
              onClick={() => setActiveSection('hub')}
              aria-label="Back to settings"
            >
              ← Back
            </button>
          )}
        </div>
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