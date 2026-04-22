import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import "./AdminPage.css";

// IMPORT YOUR AUTH SERVICES
import { loginUser, adminVerifyMfa } from "../api/auth";

const AdminPage = () => {
  const navigate = useNavigate();
  
  // State Handlers
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isMfaMode, setIsMfaMode] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Phase 1: Submit Credentials
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(email, password);
      
      // If backend recognizes them as an Admin, it sends an email and asks for MFA
      if (res.requireTwoFactor) {
        setIsMfaMode(true);
      } else {
        setError("Access Denied. You do not have Admin privileges.");
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // Phase 2: Submit the 6-digit Code
  const handleMfaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await adminVerifyMfa(email, otp);
      if (res.success) {
        // Officially logged in! Save tokens and redirect to the dashboard.
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/super-admin"); 
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      setError(err.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <div className="admin-header">
          <div className="admin-icon-box">
            <Lock size={16} color="#fff" />
          </div>
          <span className="admin-platform">AI Platform</span>
        </div>

        <h1 className="admin-title">Admin Portal</h1>
        <p className="admin-desc">
          {isMfaMode ? "Enter the secure 6-digit code sent to your email." : "Restricted Access. Authorized personnel only."}
        </p>

        {error && <p style={{ color: 'red', fontSize: '13px', marginBottom: '15px' }}>{error}</p>}

        {!isMfaMode ? (
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="email" 
              placeholder="Admin Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: '14px', borderRadius: '12px', background: '#12141a', border: '1px solid #2a2d35', color: 'white' }}
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: '14px', borderRadius: '12px', background: '#12141a', border: '1px solid #2a2d35', color: 'white' }}
            />
            <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
              {loading ? "Authenticating..." : "Login"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleMfaSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="text" 
              placeholder="000000" 
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              style={{ padding: '14px', borderRadius: '12px', background: '#12141a', border: '1px solid #2a2d35', color: 'white', textAlign: 'center', letterSpacing: '4px', fontSize: '18px' }}
            />
            <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Enter"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
