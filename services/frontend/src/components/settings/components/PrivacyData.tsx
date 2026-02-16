import React, { useState } from "react";
interface PrivacyProps {
  onAction: (title: string, content: React.ReactNode) => void;
}
const PrivacyData: React.FC<PrivacyProps> = ({ onAction }) => {
  const [visibility, setVisibility] = useState("Public");
  const [requestSent, setRequestSent] = useState(false);
  const [preferences, setPreferences] = useState({
    recommendations: true,
    analytics: true,
    emails: false,
  })

  const handlePreferenceChange = (key: string) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  return (
    <div className="privacy-page">
      <div className="account-security-wrapper">
        <div className="settings-card account-card">

          <h4>Profile Visibility </h4>
          <div className="visibility-badge">
            {visibility}
          </div>

          <p>Control who can view your profile Information</p>
          <button className="primary-btn"
            onClick={() =>
              onAction(
                "Profile Visibility",
                <div>
                  <p>
                    Control who can view your profile information.
                  </p>
                  <select className="privacy-select"
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}>
                    <option>Public</option>
                    <option>Private</option>

                  </select>
                  {/* <button className="primary-btn">Save Visibility</button> */}
                </div>
              )
            }
          >Update Visibility</button>
        </div>

        <div className="settings-card account-card">

          <h4>Download Your Data</h4>
          <p>Request a copy of your account data.</p>
          <button
            className="primary-btn"
            disabled={requestSent}
            onClick={() => setRequestSent(true)}
          >
            {requestSent ? "Request Sent ✔" : "Request Data"}
          </button>
        </div>


        <div className="settings-card account-card">

          <h4>Data Usage Preferences</h4>
          <p>Manage how your data is used to improve your experience.</p>

          <div className="toggle-group">
            <label>
              <input type="checkbox"
                checked={preferences.recommendations}
                onChange={() => handlePreferenceChange("recommendations")} />
              Personalized Recommendations
            </label>
            <label>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={() => handlePreferenceChange("analytics")}
              />
              Analytics Tracking
            </label>

            <label>
              <input
                type="checkbox"
                checked={preferences.emails}
                onChange={() => handlePreferenceChange("emails")}
              />
              Email Usage Insights
            </label>
          </div>
          <button className="primary-btn">Save Preferences</button>
        </div>

      </div>

    </div>
  );
};

export default PrivacyData;