
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const AccountSecurity: React.FC = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  return (
    <div className="account-security-page">

      {/*Card 1: profile info*/}
      <div className="account-security-wrapper">


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
            <span onClick={() => setShowCurrent(!showCurrent)}>
              <FontAwesomeIcon icon={showCurrent ? faEyeSlash : faEye} />
            </span>
          </div>

          <div className="form-group password-field">
            <label>New Password</label>
            <input type={showNew ? "text" : "password"} />
            <span onClick={() => setShowNew(!showNew)}>
              <FontAwesomeIcon icon={showNew ? faEyeSlash : faEye} />
            </span>
          </div>

          <div className="form-group password-field">
            <label>Confirm Password</label>
            <input type={showConfirm ? "text" : "password"} />
            <span onClick={() => setShowConfirm(!showConfirm)}>
              <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} />
            </span>
          </div>
          <button className="primary-btn">Update Password</button>
        </div>

      </div>
    </div>
  );
};

export default AccountSecurity;