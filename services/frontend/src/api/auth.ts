
import { API_ROOT } from "./api.config";

const AUTH_BASE_URL = `${API_ROOT}/auth`;

export const GOOGLE_AUTH_URL = `${AUTH_BASE_URL}/google`;

export const SEND_OTP_URL = `${AUTH_BASE_URL}/guest/send-otp`;

export const VERIFY_OTP_URL = `${AUTH_BASE_URL}/guest/verify-otp`;

export interface User {
  id: string;
  name: string;
  email: string;
  learningPreferences?: {
    dailyGoal: number;
    focusAreas: string[];
    currentSkillLevel?: string;
    profileImage?: string;
    // Add other fields as needed
  };
}

export interface AuthResponse {
  success: boolean;
  accessToken?: string;
  user?: User;
  requireTwoFactor?: boolean;
}

export interface SignupResponse {
  success: boolean;
  message: string;
}

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${AUTH_BASE_URL}/login`, {
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
  const response = await fetch(`${AUTH_BASE_URL}/signup`, {
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

export const adminVerifyMfa = async (email: string, code: string) => {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/verify-2fa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || 'Invalid MFA code' };
    }

    return { 
      success: true, 
      user: data.user, 
      accessToken: data.accessToken, 
      refreshToken: data.refreshToken 
    };
  } catch (error: any) {
    return { 
      success: false, 
      message: error.message || 'Network error during MFA verification' 
    };
  }
};

export const forgotPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(`${AUTH_BASE_URL}/forgot-password`, {
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
  const response = await fetch(`${AUTH_BASE_URL}/verify-email?token=${token}`, {
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
  const response = await fetch(`${AUTH_BASE_URL}/reset-password`, {
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
  const response = await fetch(`${AUTH_BASE_URL}/me`, {
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

export const updateProfile = async (
  token: string,
  data: { name: string; timezone?: string }
) => {
  const res = await fetch(`${API_ROOT}/users/me/profile`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to update profile");
  }

  return res.json();
}