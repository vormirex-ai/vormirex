import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard } from 'lucide-react';
import SEO from '../common/SEO';
import logo from '../../assets/logo.png';
import {
  loginUser,
  signupUser,
  forgotPassword,
  BASE_URL,
} from '../../api/auth.js';

const css = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  .login-page-root {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #0a0b0f;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    position: relative;
  }
  .nav-button-left {
    position: fixed;
    top: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #ffffff;
    padding: 12px 16px; /* Increased from 8px 16px */
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 100;
    min-height: 44px; /* Apple's recommended minimum touch target */
    min-width: 44px;
  }
  .nav-button-right {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #ffffff;
    padding: 12px 16px; /* Increased from 8px 16px */
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 100;
    min-height: 44px; /* Apple's recommended minimum touch target */
    min-width: 44px;
  }
  .nav-button-left:hover, .nav-button-right:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }
  .login-container {
    width: 100%;
    max-width: 400px;
    padding: 40px 24px;
    text-align: center;
    padding-bottom: max(40px, env(safe-area-inset-bottom) + 20px); /* Add safe area support */
  }
  .logo-section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin-bottom: 30px;
  }
  .logo {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
  .brand-details {
    text-align: left;
  }
  .brand-name {
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 2px;
  }
  .tagline {
    color: #6b7280;
    font-size: 13px;
  }
  .tabs {
    display: flex;
    background-color: #1a1d24;
    border-radius: 25px;
    padding: 6px; /* Increased from 4px */
    margin-bottom: 30px;
  }
  .tab {
    flex: 1;
    padding: 14px 12px; /* Increased vertical padding from 12px */
    border: none;
    background: transparent;
    color: #6b7280;
    font-size: 14px;
    cursor: pointer;
    border-radius: 22px;
    transition: 0.3s;
    min-height: 44px; /* Ensure minimum touch target */
  }
  .tab.active { background-color: #2a2d35; color: #ffffff; }
  .form-group { margin-bottom: 20px; text-align: left; }
  .form-label { display: block; color: #9ca3af; font-size: 13px; margin-bottom: 8px; }
  .input-wrapper { position: relative; display: flex; align-items: center; }
  .form-input {
    width: 100%;
    padding: 14px 50px 14px 16px; /* Increased right padding from 16px to 50px */
    background-color: #12141a;
    border: 1px solid #2a2d35;
    border-radius: 12px;
    color: #ffffff;
    font-size: 14px;
  }
  .form-input:focus { outline: none; border-color: #00d4d4; }
  .password-toggle {
    position: absolute;
    right: 16px; /* Increased from 12px */
    background: none;
    border: none;
    color: #00d4d4;
    cursor: pointer;
    font-size: 12px;
    padding: 4px; /* Add padding for better touch target */
    min-height: 32px; /* Ensure minimum touch target */
    min-width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .forgot-password {
    text-align: right;
    margin-top: 8px;
    margin-bottom: 20px;
  }
  .forgot-password a { color: #00d4d4; font-size: 13px; text-decoration: none; }
  .login-btn {
    width: 100%;
    padding: 16px;
    background-color: #00d4d4;
    border: none;
    border-radius: 12px;
    color: #0a0b0f;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
  }
  .divider { display: flex; align-items: center; margin: 25px 0; }
  .divider-line { flex: 1; height: 1px; background: #2a2d35; }
  .divider-text { padding: 0 10px; color: #4b5563; font-size: 11px; }
  .google-btn {
    width: 100%;
    padding: 14px;
    background: transparent;
    border: 1px solid #2a2d35;
    border-radius: 12px;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: max(20px, env(safe-area-inset-bottom) + 10px); /* Add safe area support */
    min-height: 48px; /* Ensure minimum touch target */
  }
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.85);
    display: flex; justify-content: center; align-items: center;
    z-index: 1000;
  }
  .modal {
    background: #12141a;
    padding: 30px;
    border-radius: 16px;
    width: 90%;
    max-width: 400px;
    position: relative;
    border: 1px solid #2a2d35;
  }
  .modal-close {
    position: absolute; top: 15px; right: 15px;
    background: none; border: none; color: white; cursor: pointer;
  }
  
  /* Mobile adjustments */
  @media (max-width: 480px) {
    .nav-button-left, .nav-button-right {
      padding: 10px 14px; /* Increased from 6px 12px */
      font-size: 12px;
      top: 10px;
      min-height: 44px; /* Ensure minimum touch target */
    }
    .nav-button-left {
      left: 10px;
    }
    .nav-button-right {
      right: 10px;
    }
    
    .login-container {
      padding-top: 60px; /* Add more space to avoid overlap with nav buttons */
      padding-bottom: max(30px, env(safe-area-inset-bottom) + 20px); /* Adjust for mobile */
    }
    
    .logo-section {
      margin-bottom: 24px; /* Slightly reduce margin */
    }
    
    .logo {
      width: 50px; /* Slightly smaller logo */
      height: 50px;
    }
    
    .brand-name {
      font-size: 20px; /* Slightly smaller brand name */
    }
    
    .tagline {
      font-size: 12px; /* Slightly smaller tagline */
    }
    
    .tabs {
      margin-bottom: 24px; /* Slightly reduce margin */
    }
    
    .tab {
      padding: 12px 8px; /* Adjust padding for smaller screens */
      font-size: 13px; /* Slightly smaller text */
    }
    
    .google-btn {
      margin-bottom: max(15px, env(safe-area-inset-bottom) + 10px); /* Adjust for mobile */
    }
  }
`;

interface VormirexAuthProps {
  defaultTab?: 'login' | 'signup';
}

const VormirexAuth: React.FC<VormirexAuthProps> = ({ defaultTab }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');
  const [guestOTP, setGuestOTP] = useState('');
  const [isGuestOTPMode, setIsGuestOTPMode] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);


  // FIXED: Set initial tab based on URL path and props
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0); // Force scroll to top on load/refresh

    if (defaultTab) {
      setActiveTab(defaultTab);
    } else if (location.pathname.includes('signup')) {
      setActiveTab('signup');
    } else {
      setActiveTab('login');
    }
  }, [location.pathname, defaultTab]);

  const handleForgotPasswordSubmit = async () => {
    if (!resetEmail) {
      setError('Please enter your email.');
      return;
    }
    setForgotPasswordLoading(true);
    setError('');
    try {
      const res = await forgotPassword(resetEmail);
      if (res.success) {
        setIsModalOpen(false);
        setResetEmail('');
        setTimeout(() => {
          alert(res.message || 'Password reset link sent!');
        }, 100);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link');
    } finally {
      setForgotPasswordLoading(false);
    }
  };

    const handleGuestEmailSubmit = async () => {
    if (!guestEmail) {
      setError('Please enter your email.');
      return;
    }

    // NEW: Enforce strict email formatting for Guests
    const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(guestEmail)) {
      setError('Invalid email address (cannot start with special characters)');
      return;
    }

    setGuestLoading(true);
    setError('');
    try {
      const response = await fetch(`${BASE_URL}/guest/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: guestEmail }),
      });
      const res = await response.json();
      if (!response.ok) throw new Error(res.message || 'Failed to send verification code');
      
      setIsGuestOTPMode(true);
    } catch (err: any) {
      setError(err.message || 'Failed to request guest access');
    } finally {
      setGuestLoading(false);
    }
  };


  const handleGuestOTPSubmit = async () => {
    if (!guestOTP || guestOTP.length !== 6) {
      setError('Please enter a valid 6-digit code.');
      return;
    }
    setGuestLoading(true);
    setError('');
    try {
      const response = await fetch(`${BASE_URL}/guest/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: guestEmail, code: guestOTP }),
      });
      const res = await response.json();
      if (!response.ok) throw new Error(res.message || 'Invalid verification code');

      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('user', JSON.stringify(res.user));
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message || 'Verification failed');
    } finally {
      setGuestLoading(false);
    }
  };


  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side strict name check
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (activeTab === 'signup' && !nameRegex.test(name)) {
      setError('Name can only contain letters and spaces');
      return;
    }

    // Client-side strict email check
    // Must start with alphanumeric, no leading underscores or dots
    const emailRegex =
      /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email) && activeTab === 'signup') {
      setError('Invalid email address (cannot start with special characters)');
      return;
    }

    setLoading(true);

    try {
      if (activeTab === 'signup') {
        const res = await signupUser(name, email, password);
        if (res.success) {
          alert(
            res.message || 'Account created! Please check your email to verify.'
          );
          navigate('/auth/login'); // Stay within auth routes
          setName('');
          setEmail('');
          setPassword('');
        }
      } else {
        const res = await loginUser(email, password);
        if (res.success) {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('user', JSON.stringify(res.user));
          window.location.href = '/dashboard';
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-root">
      <style>{css}</style>
      <SEO
        title={
          activeTab === 'login' ? 'Log In - Vormirex' : 'Sign Up - Vormirex'
        }
        description="Access your personal AI tutor or create a new account to start mastering coding skills with Vormirex."
        url={
          activeTab === 'login'
            ? 'https://vormirex.com/auth/login'
            : 'https://vormirex.com/auth/signup'
        }
      />

      {/* Navigation buttons at corners */}
      <button className="nav-button-left" onClick={() => navigate('/landing')}>
        <Home size={16} />
        Home
      </button>

      <button
        className="nav-button-right"
        onClick={() => navigate('/dashboard')}
      >
        <LayoutDashboard size={16} />
        Back to Dashboard
      </button>

      <div className="login-container">
        <div className="logo-section">
          <img src={logo} alt="Vormirex Logo" className="logo" />
          <div className="brand-details">
            <h1 className="brand-name">VORMIREX</h1>
            <p className="tagline">Your personal AI tutor.</p>
          </div>
        </div>
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => navigate('/auth/login')}
          >
            Log In
          </button>
          <button
            className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => navigate('/auth/signup')}
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={handleAuth}>
          {error && (
            <p style={{ color: 'red', marginBottom: '10px', fontSize: '13px' }}>
              {error}
            </p>
          )}

          {activeTab === 'signup' && (
            <div className="form-group">
              <label className="form-label">
                Full Name<span style={{ color: 'red' }}> *</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">
              Email Address<span style={{ color: 'red' }}> *</span>
            </label>
            <input
              type="email"
              className="form-input"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Password<span style={{ color: 'red' }}> *</span>
            </label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>

          {activeTab === 'login' && (
            <div className="forgot-password">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setError('');
                  setIsModalOpen(true);
                }}
              >
                Forgot Password?
              </a>
            </div>
          )}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading
              ? 'Processing...'
              : activeTab === 'login'
                ? 'Log In'
                : 'Create Account'}
          </button>

           {activeTab === 'signup' && (
            <button 
              type="button" 
              className="login-btn" 
              style={{ marginTop: '15px', background: 'transparent', border: '1px solid #00d4d4', color: '#00d4d4' }}
              onClick={() => {
                setError('');
                setIsGuestOTPMode(false);
                setIsGuestModalOpen(true);
              }}
            >
              Continue as Guest
            </button>
          )}

        </form>
        <div className="divider">
          <div className="divider-line"></div>
          <span className="divider-text">OR</span>
          <div className="divider-line"></div>
        </div>
        <button
          className="google-btn"
          type="button"
          onClick={() => {
            window.location.href = `${BASE_URL}/google`;
          }}
        >
          Continue with Google
        </button>
      </div>

            {/* Guest Login Modal */}
      {isGuestModalOpen && (
        <div className="modal-overlay" onClick={() => setIsGuestModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setIsGuestModalOpen(false)}
            >
              ✕
            </button>
            <h2 style={{ color: 'white', marginBottom: '15px' }}>
              Guest Access
            </h2>
            <p
              style={{
                color: '#9ca3af',
                fontSize: '14px',
                marginBottom: '20px',
              }}
            >
              {!isGuestOTPMode 
                 ? "Enter your email. We'll send you a secure one-time code to grant you access."
                 : `Enter the 6-digit code we sent to ${guestEmail}.`}
            </p>
            
            <div className="form-group">
              {!isGuestOTPMode ? (
                <input
                  type="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                />
              ) : (
                 <input
                  type="text"
                  className="form-input"
                  placeholder="000000"
                  maxLength={6}
                  value={guestOTP}
                  onChange={(e) => setGuestOTP(e.target.value)}
                />
              )}
            </div>
            
            {error && (
              <p style={{ color: 'red', marginBottom: '10px', fontSize: '13px' }}>
                {error}
              </p>
            )}
            
            <button
              className="login-btn"
              disabled={guestLoading}
              onClick={!isGuestOTPMode ? handleGuestEmailSubmit : handleGuestOTPSubmit}
            >
              {guestLoading 
                ? 'Processing...' 
                : !isGuestOTPMode ? 'Get Access Code' : 'Verify & Login'}
            </button>
          </div>
        </div>
      )}


      {/* Forgot Password Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h2 style={{ color: 'white', marginBottom: '15px' }}>
              Reset Password
            </h2>
            <p
              style={{
                color: '#9ca3af',
                fontSize: '14px',
                marginBottom: '20px',
              }}
            >
              Enter your email to receive a reset link.
            </p>
            <div className="form-group">
              <input
                type="email"
                className="form-input"
                placeholder="name@example.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>
            {error && (
              <p
                style={{ color: 'red', marginBottom: '10px', fontSize: '13px' }}
              >
                {error}
              </p>
            )}
            <button
              className="login-btn"
              disabled={forgotPasswordLoading}
              onClick={handleForgotPasswordSubmit}
            >
              {forgotPasswordLoading ? 'Sending...' : 'Send Link'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VormirexAuth;
