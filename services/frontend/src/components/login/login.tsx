import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  }
  .login-container {
    width: 100%;
    max-width: 400px;
    padding: 40px 24px;
    text-align: center;
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
    padding: 4px;
    margin-bottom: 30px;
  }
  .tab {
    flex: 1;
    padding: 12px;
    border: none;
    background: transparent;
    color: #6b7280;
    font-size: 14px;
    cursor: pointer;
    border-radius: 22px;
    transition: 0.3s;
  }
  .tab.active { background-color: #2a2d35; color: #ffffff; }
  .form-group { margin-bottom: 20px; text-align: left; }
  .form-label { display: block; color: #9ca3af; font-size: 13px; margin-bottom: 8px; }
  .input-wrapper { position: relative; display: flex; align-items: center; }
  .form-input {
    width: 100%;
    padding: 14px 16px;
    background-color: #12141a;
    border: 1px solid #2a2d35;
    border-radius: 12px;
    color: #ffffff;
    font-size: 14px;
  }
  .form-input:focus { outline: none; border-color: #00d4d4; }
  .password-toggle {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    color: #00d4d4;
    cursor: pointer;
    font-size: 12px;
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

  // Correctly sync UI state based on URL on load and path changes
  useEffect(() => {
    if (location.pathname.includes('signup')) {
      setActiveTab('signup');
    } else {
      setActiveTab('login');
    }
  }, [location.pathname]);

  const handleForgotPasswordSubmit = async () => {
    if (!resetEmail) {
      setError('Please enter your email.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await forgotPassword(resetEmail);
      if (res.success) {
        alert(res.message || 'Password reset link sent!');
        setIsModalOpen(false);
        setResetEmail('');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (activeTab === 'signup') {
        const res = await signupUser(name, email, password);
        if (res.success) {
          alert(
            res.message || 'Account created! Please check your email to verify.'
          );
          // Redirect to login route instead of just changing state
          navigate('/auth/login');
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
            onClick={() => navigate('/auth/login')} // Updated to sync URL
          >
            Log In
          </button>
          <button
            className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => navigate('/auth/signup')} // Updated to sync URL
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
              <label className="form-label">Full Name</label>
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
            <label className="form-label">Email Address</label>
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
            <label className="form-label">Password</label>
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
              disabled={loading}
              onClick={handleForgotPasswordSubmit}
            >
              {loading ? 'Sending...' : 'Send Link'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VormirexAuth;
