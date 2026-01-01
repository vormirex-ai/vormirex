export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost/api/auth';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  accessToken: string;
  user: User;
}

export interface SignupResponse {
  success: boolean;
  message: string;
}

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
};

export const signupUser = async (name: string, email: string, password: string): Promise<SignupResponse> => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Signup failed');
  }

  return response.json();
};

export const forgotPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(`${BASE_URL}/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Forgot password request failed');
  }

  return response.json();
};

export const verifyEmail = async (token: string): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(`${BASE_URL}/verify-email?token=${token}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Email verification failed');
  }

  return response.json();
};

export const resetPassword = async (token: string, password: string): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(`${BASE_URL}/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ token, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Password reset failed');
  }

  return response.json();
};

export const fetchCurrentUser = async (accessToken: string): Promise<AuthResponse> => {
  const response = await fetch(`${BASE_URL}/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
};
