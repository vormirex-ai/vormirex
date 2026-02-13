import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserShield,
  faMoon,
  faBell,
  faBook,
  faCommentDots,
  faShieldAlt,
  faQuestionCircle,
  faGavel,
  faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";
import '../settings.css';
import BaseModal from "../../common/Modals/BaseModal";


interface SettingsHubProps {
  onSectionSelect: (section: string) => void;
}

const SettingsHub: React.FC<SettingsHubProps> = ({ onSectionSelect }) => {
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [comingSoonTitle, setComingSoonTitle] = useState("");

  const handleComingSoon = (title: string) => {
    setComingSoonTitle(title);
    setIsComingSoonOpen(true);
  };


  return (
    <div className="settings-hub">


      <div className="settings-grid">
        <div
          className="settings-card"
          onClick={() => onSectionSelect("account-security")}
        >
          <FontAwesomeIcon icon={faUserShield} className="card-icon" />
          <h3>Account & Security</h3>
          <p>Profile, password, security settings</p>
        </div>

        <div
          className="settings-card"
          // onClick={() => onSectionSelect("appearance")}
          onClick={() => handleComingSoon("Appearance")}

        >
          <FontAwesomeIcon icon={faMoon} className="card-icon" />
          <h3>Appearance</h3>
          <p>Dark/light mode, language</p>
        </div>

        <div
          className="settings-card"
          onClick={() => onSectionSelect("notifications")}
        >
          <FontAwesomeIcon icon={faBell} className="card-icon" />
          <h3>Notifications</h3>
          <p>Manage in-app and email alerts</p>
        </div>

        <div
          className="settings-card"
          onClick={() => onSectionSelect("learning-preferences")}
        >
          <FontAwesomeIcon icon={faBook} className="card-icon" />
          <h3>Learning Preferences</h3>
          <p>Skills, difficulty level, learning goal</p>
        </div>

        <div
          className="settings-card"
          // onClick={() => onSectionSelect("chat-ai")}
          onClick={() => handleComingSoon("Chat & AI")}
        >
          <FontAwesomeIcon icon={faCommentDots} className="card-icon" />
          <h3>Chat & AI</h3>
          <p>AI response style, chat history</p>
        </div>

        <div
          className="settings-card"
          onClick={() => onSectionSelect("privacy-data")}
        >
          <FontAwesomeIcon icon={faShieldAlt} className="card-icon" />
          <h3>Privacy & Data</h3>
          <p>Profile visibility, data permissions</p>
        </div>

        <div
          className="settings-card"
          onClick={() => onSectionSelect("help-support")}
        >
          <FontAwesomeIcon icon={faQuestionCircle} className="card-icon" />
          <h3>Help & Support</h3>
          <p>FAQs, bug reports, contact us</p>
        </div>

        <div
          className="settings-card"
          onClick={() => onSectionSelect("legal")}
        >
          <FontAwesomeIcon icon={faGavel} className="card-icon" />
          <h3>Legal</h3>
          <p>Privacy policy, terms of use</p>
        </div>

        <div
          className="settings-card danger"
          onClick={() => onSectionSelect("danger-zone")}
        >
          <FontAwesomeIcon icon={faTriangleExclamation} className="danger-icon" />
          <h3>Danger Zone</h3>
          <p>Permanently delete your account and all associated data</p>
        </div>
      </div>
      <BaseModal
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
      >
        <h3>{comingSoonTitle}</h3>
        <p>This feature is currently under development.</p>
        <p>Stay tuned for upcoming updates 🚀</p>
      </BaseModal>

    </div>
  );
};

export default SettingsHub;