
import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import SidebarLeft from '../layout/SidebarLeft';
import SidebarRight from '../layout/SidebarRight';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './settings.css';

const SettingsLayout = () => {
  const location = useLocation();
  const isSubSettingsPage = location.pathname !== "/settings";

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState<boolean>(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState<boolean>(false);

  return (
    <div className="settings-page-container"> 

      <SidebarLeft
        isOpen={isLeftSidebarOpen}
        toggleSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
        showComingSoon={() => setIsModalOpen(true)}
      />
      <SidebarRight
        isOpen={isRightSidebarOpen}
        toggleSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
        showComingSoon={() => setIsModalOpen(true)}
      />

      <div className="settings-content-wrapper">
        <div className="settings-subpage">
          {isSubSettingsPage && (
            <div className="settings-subpage-header">
              <Link to="/settings" className="back-button">
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Back to Settings</span>
              </Link>
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;