import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../api/auth';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');

  const verifyAttempted = React.useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link.');
      return;
    }

    if (verifyAttempted.current) return;
    verifyAttempted.current = true;

    const verify = async () => {
      try {
        const res = await verifyEmail(token);
        setStatus('success');
        setMessage(res.message);
        setTimeout(() => {
          navigate('/auth'); // Redirect to login after 3 seconds
        }, 3000);
      } catch (err: any) {
        setStatus('error');
        setMessage(err.message || 'Verification failed.');
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0a0b0f',
      color: 'white',
      textAlign: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ padding: '40px', maxWidth: '400px' }}>
        <h1 style={{ marginBottom: '20px', color: status === 'success' ? '#00d4d4' : status === 'error' ? '#ff4d4d' : 'white' }}>
          {status === 'verifying' ? 'Verifying...' : status === 'success' ? 'Email Verified!' : 'Verification Failed'}
        </h1>
        <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>{message}</p>
        
        {status === 'success' && (
          <p style={{ marginTop: '20px', fontSize: '14px', color: '#6b7280' }}>
            Redirecting to login...
          </p>
        )}
        
        {status === 'error' && (
          <button 
            onClick={() => navigate('/auth')}
            style={{
              marginTop: '25px',
              padding: '12px 24px',
              background: '#2a2d35',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
