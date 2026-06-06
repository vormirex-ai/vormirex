import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../api/auth';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return setMessage('Invalid or missing token.');
    if (password !== confirmPassword) return setMessage('Passwords do not match.');
    if (password.length < 6) return setMessage('Password must be at least 6 characters.');

    setLoading(true);
    setMessage('');
    try {
      const res = await resetPassword(token, password);
      setStatus('success');
      setMessage(res.message);
      setTimeout(() => {
        navigate('/auth');
      }, 3000);
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0b0f', color: 'white' }}>
        <p>Invalid password reset link.</p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0a0b0f',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '400px', 
        padding: '30px', 
        background: '#12141a', 
        borderRadius: '16px', 
        border: '1px solid #2a2d35' 
      }}>
        <h2 style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>Set New Password</h2>
        
        {status === 'success' ? (
          <div style={{ textAlign: 'center', color: '#00d4d4' }}>
            <p>{message}</p>
            <p style={{ marginTop: '10px', fontSize: '14px', color: '#6b7280' }}>Redirecting to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', color: '#9ca3af', fontSize: '13px', marginBottom: '8px' }}>New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#0a0b0f',
                  border: '1px solid #2a2d35',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none'
                }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#9ca3af', fontSize: '13px', marginBottom: '8px' }}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#0a0b0f',
                  border: '1px solid #2a2d35',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none'
                }}
                required
              />
            </div>

            {message && status === 'error' && (
              <div style={{ color: '#ff4d4d', fontSize: '13px', marginBottom: '15px', textAlign: 'center' }}>
                {message}
              </div>
            )}
            
            {message && status === 'idle' && (
               <div style={{ color: '#ff4d4d', fontSize: '13px', marginBottom: '15px', textAlign: 'center' }}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: '#00d4d4',
                border: 'none',
                borderRadius: '10px',
                color: '#0a0b0f',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Reseting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
