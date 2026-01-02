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
      console.log("OAuthSuccess: handleLoginSuccess started. AccessToken present:", !!accessToken); // DEBUG
      if (accessToken) {
        try {
          // 1. Store tokens
          localStorage.setItem('accessToken', accessToken);
          if (refreshToken) localStorage.setItem('refreshToken', refreshToken);

          // 2. Fetch User Details
          console.log("OAuthSuccess: Fetching user details..."); // DEBUG
          const res = await fetchCurrentUser(accessToken);
          console.log("OAuthSuccess: fetchCurrentUser result:", res); // DEBUG

          if (res.success && res.user) {
             const userStr = JSON.stringify(res.user);
             console.log("OAuthSuccess: Storing user in localStorage:", userStr); // DEBUG
             localStorage.setItem('user', userStr);
             
             // Verify storage immediately
             console.log("OAuthSuccess: Immediate check of localStorage:", localStorage.getItem('user')); // DEBUG

             // 3. Redirect to Dashboard
             console.log("OAuthSuccess: Redirecting to /dashboard"); // DEBUG
             // Force full reload to ensure localStorage is recognized by all components
             window.location.href = '/dashboard';
          } else {
             console.error("OAuthSuccess: Failed to load user data (success or user missing)", res);
             navigate('/auth');
          }
        } catch (error) {
          console.error("OAuthSuccess: OAuth success error:", error);
          navigate('/auth');
        }
      } else {
        console.warn("OAuthSuccess: No accessToken found in params");
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
