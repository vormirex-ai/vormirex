import React from "react";

interface HelpProps {
  onAction: (title: string, content: React.ReactNode) => void;
}


const HelpSupport: React.FC<HelpProps> = ({ onAction }) => {
  return (
    <div className="help-support-page">
      <div className="account-security-wrapper">

        {/*card 1 */}
        <div className="settings-card account-card">
          <h4>Contact Support</h4>
          <p>Need help? Reach out to our support team</p>

          <button className="primary-btn"
            onClick={() => onAction("Contact Support",
              <div>
                <p>For assistance, please reach out to:</p>
                <strong>support@vormirex.com</strong>
                <p>We typically respond within 24–48 hours.</p>
              </div>
            )} >
            Contact Us
          </button>
        </div>

        {/*Card 2 */}
        <div className="settings-card account-card">
          <h4>Frequently Asked Questions</h4>
          <p>Find answers to common questions</p>
          <button className="primary-btn" onClick={() =>
            onAction(
              "Frequently Asked Questions",
              <div>
                <strong>Q: How do I change my password?</strong>
                <p>You can update your password from the Account & Security section.</p>

                <strong>Q: How do I update my email address?</strong>
                <p>Go to Profile Information under Account & Security.</p>

                <strong>Q: How do I contact support?</strong>
                <p>Use the Contact Support option in this section.</p>

                <strong>Q: Is my data secure?</strong>
                <p>We use secure authentication and encrypted connections to protect your data.</p>
              </div>
            )
          }
          >View FAQs</button>
        </div>

        {/*Card 3 */}
        <div className="settings-card account-card">
          <h4>Report an Issue</h4>
          <p>Let us know if something isn't working as expected</p>
          <button className="primary-btn"
            onClick={() =>
              onAction(
                "Report an Issue",
                <div>
                  <p>If you're experiencing a problem, please email us at:</p>
                  <strong>support@vormirex.com</strong>
                  <p>
                    Include details about the issue and screenshots (if possible)
                    so we can resolve it quickly.
                  </p>
                </div>
              )
            }
          >Report an Issue</button>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;