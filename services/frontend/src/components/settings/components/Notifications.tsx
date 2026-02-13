import React, { useState } from "react";

const Notifications: React.FC = () => {

  const [inAppNotif, setInAppNotif] = useState({
    codingReminders: true,
    streakAlerts: true,
    achievementAlerts: false,
  });

  const [emailNotif, setEmailNotif] = useState({
    weeklyReports: true,
    productUpdates: true,
    marketingEmails: false,
  })

  //toggle handler
  const handleToggle = (key: string) => {
    setInAppNotif(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  }

  const handleEmailToggle = (key: string) => {
    setEmailNotif(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  }


  return (
    <div className="notifications-page">

      <div className="account-security-wrapper">
      {/*card 1 - In App Notifications*/}
      <div className="settings-card account-card">
        <h4>In-App Notifications</h4>
        <p>Manage notifications you receive inside the app</p>

        <div className="toggle-group">
          {/*coding reminders */}
          <label className="toggle-item">
            <span>Coding Reminders</span>
            <div className={`toggle-switch ${inAppNotif.codingReminders ? "active" : ""}`}
              onClick={() => handleToggle("codingReminders")}>
              <div className="toggle-knob"></div>
            </div>
          </label>

          {/*streak alerts */}
          <label className="toggle-item">
            <span>Streak Alerts</span>
            <div className={`toggle-switch ${inAppNotif.streakAlerts ? "active" : ""}`}
              onClick={() => handleToggle("streakAlerts")}>
              <div className="toggle-knob"></div>
            </div>
          </label>
        </div>

        <button className="primary-btn"
          onClick={() => console.log(inAppNotif)}>Save Preferences</button>
      </div>

      {/*Email Notifications */}
      <div className="settings-card account-card">
        <h4>Email Notifications</h4>
        <p>Manage email updates and communication preferences</p>

        <div className="toggle-group">
          {/*weekly reports*/}
          <label className="toggle-item">
            <span>Weekly Reports</span>
            <div className={`toggle-switch ${emailNotif.weeklyReports ? "active" : ""}`}
              onClick={() => handleEmailToggle("weeklyReports")}>
              <div className="toggle-knob"></div>
            </div>
          </label>

          {/*product updates */}
          <label className="toggle-item">
            <span>Product Updates</span>
            <div className={`toggle-switch ${emailNotif.productUpdates ? "active" : ""}`}
              onClick={() => handleEmailToggle("productUpdates")}>
              <div className="toggle-knob"></div>
            </div>
          </label>
        </div>
        <button className="primary-btn"
          onClick={() => console.log(emailNotif)}>Save Preferences</button>
      </div>
    </div>
    </div>
  );
};

export default Notifications;