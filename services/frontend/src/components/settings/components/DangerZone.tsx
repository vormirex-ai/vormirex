import React, { useState } from "react";
import BaseModal from "../../common/Modals/BaseModal";
import { deleteAccount } from "../../../api/user";
import { useNavigate } from "react-router-dom";

const DangerZone: React.FC = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const reasons = [
    "I don’t want to use Vormirex anymore",
    "I’m using a different account",
    "I’m concerned about my privacy",
    "Too many emails/notifications",
    "The app is not working properly",
    "Other",
  ];

  const handleClose = () => {
    setIsDeleteOpen(false);
    setConfirmText("");
    setSelectedReason("");
  };

  const handlePermanentDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Not authenticated");

      setLoading(true);

      await deleteAccount(token);

      //clear token after deletion
      localStorage.removeItem("accessToken");

      //close modal
      handleClose();

      //redirect to homepage
      navigate("/");

    } catch (error: any) {
      alert(error.message || "Failed to delete account");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="danger-zone-page">

      <div className="account-security-wrapper">

        {/* Danger Card */}
        <div className="settings-card danger-card">
          <h4>Delete Account</h4>

          <p className="danger-text">
            This action is permanent and cannot be undone.
          </p>

          <button
            className="danger-btn"
            onClick={() => setIsDeleteOpen(true)}
          >
            Delete Account
          </button>
        </div>

        {/* Confirmation Modal */}
        <BaseModal
          isOpen={isDeleteOpen}
          onClose={handleClose}
        >
          {!selectedReason ? (
            <>
              <h3>Delete Account</h3>
              <p>Why would you like to delete your account?</p>

              <div className="danger-reasons-list">
                {reasons.map((reason) => (
                  <div
                    key={reason}
                    className="danger-reason-item"
                    onClick={() => setSelectedReason(reason)}
                  >
                    {reason}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h3>Confirm Account Deletion</h3>
              <p><strong>Reason:</strong>{selectedReason}</p>
              <p className="modal-warning">
                This action will permanently delete your account and all associated data.
              </p>

              <p>
                To confirm, type <strong>DELETE</strong> below:
              </p>

              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="danger-input"
              />
              <div className="danger-actions">
                <button
                  className="danger-btn"
                  disabled={confirmText !== "DELETE" || loading}
                  onClick={handlePermanentDelete}
                >
                  {loading ? "Deleting..." : "Permanently Delete"}
                </button>
                
                <button
                  className="secondary-btn"
                  onClick={() => setSelectedReason("")}
                  disabled={loading}
                >
                  Back
                </button>
              </div>
            </>
          )}



        </BaseModal>

      </div>
    </div>
  );
};

export default DangerZone;
