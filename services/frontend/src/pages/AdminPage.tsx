// import React from "react";
import "./AdminPage.css";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-container">
      <div className="admin-card">

        {/* Header */}
        <div className="admin-header">
          <div className="admin-icon-box">
            <Lock size={16} color="#fff" />
          </div>
          <span className="admin-platform">AI Platform</span>
        </div>

        {/* Title */}
        <h1 className="admin-title">Admin Panel</h1>

        {/* Description */}
        <p className="admin-desc">
          This is a demo to showcase role-based access.
        </p>

        {/* Buttons */}
        <button 
        className="admin-btn admin-btn-primary"
        onClick={() => navigate("/super-admin")}>
          Login as Super Admin
        </button>

        <button className="admin-btn admin-btn-secondary">
          Login as Admin
        </button>

      </div>
    </div>
  );
};

export default AdminPage;