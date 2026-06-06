import React from "react";

interface LegalProps {
  onBack?: () => void;
  onAction: (content: string) => void;
}

const Legal: React.FC<LegalProps> = ({ onAction }) => {
  return (
    <div className="legal-page">
      <div className="account-security-wrapper">

        {/* Privacy Policy */}
        <div className="settings-card account-card">
          <h4>Privacy Policy</h4>
          <p>
            Learn how we collect, use, and protect your data while using Vormirex.
          </p>

          <button
            className="primary-btn"
            onClick={() =>
              onAction("This is the Privacy Policy content. Here we describe how user data is handled, stored, and protected.")
            }
          >
            View Policy
          </button>

        </div>

        {/* Terms of Service */}
        <div className="settings-card account-card">
          <h4>Terms of Service</h4>
          <p>
            Understand the rules, responsibilities, and guidelines for using the platform.
          </p>

          <button
            className="primary-btn"
            onClick={() =>
              onAction("These are the Terms of Service. Users must follow platform rules and guidelines.")
            }
          >
            Read Terms
          </button>

        </div>

        {/* Open Source Licenses */}
        <div className="settings-card account-card">
          <h4>Open Source Licenses</h4>
          <p>
            View third-party libraries and open-source licenses used in this application.
          </p>

          <button
            className="primary-btn"
            onClick={() =>
              onAction("This application uses open-source libraries. License details are listed here.")
            }
          >
            View Licenses
          </button>

        </div>

      </div>
    </div>
  );
};

export default Legal;
