import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchCurrentUser } from '../../api/auth';

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    
    const handleLoginSuccess = async () => {
      if (accessToken) {
        try {
          // 1. Store tokens
          localStorage.setItem('accessToken', accessToken);
          if (refreshToken) localStorage.setItem('refreshToken', refreshToken);

          // 2. Fetch User Details
          const res = await fetchCurrentUser(accessToken);
          if (res.success && res.user) {
             localStorage.setItem('user', JSON.stringify(res.user));
             // 3. Redirect to Dashboard
             navigate('/dashboard');
          } else {
             console.error("Failed to load user data");
             navigate('/auth');
          }
        } catch (error) {
          console.error("OAuth success error:", error);
          navigate('/auth');
        }
      } else {
        navigate('/auth');
      }
    };

    handleLoginSuccess();
  }, [searchParams, navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0a0b0f',
      color: 'white'
    }}>
      <p>Logging you in...</p>
    </div>
  );
};

export default OAuthSuccess;
