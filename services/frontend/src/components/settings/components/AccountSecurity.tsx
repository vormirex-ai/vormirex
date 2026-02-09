import { faUserShield } from "@fortawesome/free-solid-svg-icons/faUserShield";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const AccountSecurity: React.FC = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  return (
    <div className="account-security-page">
      
      {/* Header */}
      <div className="detail-header">
        <FontAwesomeIcon icon={faUserShield} className="header-icon" />
        <h2>Account & Security</h2>

      </div>

      {/*Card 1: profile info*/}
      <div className="settings-card account-card">
        <h4>Profile Information</h4>
        <p>Manage your personal details</p>

        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Enter your name" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>

        <button className="primary-btn">Save Changes</button>
      </div>

      {/*Card 2: change password*/}
      <div className="settings-card account-card">
        <h4>Change Password</h4>
        <p>Update your account password</p>

        <div className="form-group password-field">
          <label>Current Password</label>
          <input type={showCurrent ? "text" : "password"} />
          <span onClick={() => setShowCurrent(!showCurrent)}> </span>
        </div>

        <div className="form-group password-field">
          <label>New Password</label>
          <input type={showNew ? "text" : "password"} />
          <span onClick={() => setShowNew(!showNew)}> </span>
        </div>

        <div className="form-group password-field">
          <label>Confirm Password</label>
          <input type={showConfirm ? "text" : "password"} />
          <span onClick={() => setShowConfirm(!showConfirm)}></span>
        </div>
        <button className="primary-btn">Update Password</button>
      </div>

    </div>

  );
};

export default AccountSecurity;