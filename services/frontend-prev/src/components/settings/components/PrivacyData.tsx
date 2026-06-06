import React, { useState } from "react";
import { updatePrivacySettings } from "../../../api/user";

interface PrivacyProps {
  onAction: (title: string, content: React.ReactNode) => void;
}

const PrivacyData: React.FC<PrivacyProps> = ({ onAction }) => {
  const [visibility, setVisibility] = useState<"Public" | "Private">("Public");
  const [loading, setLoading] = useState(false);

  const [preferences, setPreferences] = useState({
    showProgress: true,
    showCourses: true,
  });

  const handlePreferenceChange = (key: "showProgress" | "showCourses") => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Not authenticated");

      setLoading(true);

      await updatePrivacySettings(token, {
        isProfilePublic: visibility === "Public",
        showProgress: preferences.showProgress,
        showCourses: preferences.showCourses,
      });

      alert("Privacy settings updated successfully!");
    } catch (error: any) {
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="privacy-page">
      <div className="account-security-wrapper">

        {/* Profile Visibility */}
        <div className="settings-card account-card">
          <h4>Profile Visibility</h4>

          <div className="visibility-badge">
            {visibility}
          </div>

          <p>Control who can view your profile information</p>

          <button
            className="primary-btn"
            onClick={() =>
              onAction(
                "Profile Visibility",
                <div>
                  <p>Select who can view your profile:</p>
                  <select
                    className="privacy-select"
                    value={visibility}
                    onChange={(e) =>
                      setVisibility(e.target.value as "Public" | "Private")
                    }
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
              )
            }
          >
            Update Visibility
          </button>
        </div>

        {/* Data Usage Preferences */}
        <div className="settings-card account-card">
          <h4>Data Usage Preferences</h4>
          <p>Manage how your data is used.</p>

          <div className="toggle-group">
            <label>
              <input
                type="checkbox"
                checked={preferences.showProgress}
                onChange={() => handlePreferenceChange("showProgress")}
              />
              Show Learning Progress
            </label>

            <label>
              <input
                type="checkbox"
                checked={preferences.showCourses}
                onChange={() => handlePreferenceChange("showCourses")}
              />
              Show Enrolled Courses
            </label>
          </div>

          <button
            className="primary-btn"
            disabled={loading}
            onClick={handleSave}
          >
            {loading ? "Saving..." : "Save Preferences"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default PrivacyData;
