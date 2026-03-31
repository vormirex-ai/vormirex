const API_ROOT = import.meta.env.VITE_API_URL || 'http://localhost/api';
export const BASE_URL = `${API_ROOT}/users`;

export interface NotificationPreferences {
  streakReminders: boolean;
  newCourseAlerts: boolean;
  securityAlerts: boolean;
}

export interface LearningPreferencesPayload {
  currentSkillLevel?: string;
  focusAreas?: string[];
  dailyGoal?: number;
  primaryFocus?: string;
  curiosity?: string[];
  learningPace?: string;
  learningFormat?: string[];
  challengeLevel?: string;
  learningGoals?: string[];
  timeline?: string;
}

export interface PrivacySettingsPayload {
  isProfilePublic: boolean,
  showProgress: boolean,
  showCourses: boolean,
}

export const updateNotificationPreferences = async (
  preferences: NotificationPreferences,
  token: string
): Promise<{ success: boolean; message?: string }> => {

  const response = await fetch(`${BASE_URL}/me/notifications`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(preferences),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update notifications');
  }


  return response.json();
}

export const deleteAccount = async (token: string) => {
  const response = await fetch(`${BASE_URL}/me`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to delete account');
  }
  //handle 204
  return response.status === 204 ? null : response.json();
}

export const updateLearningPreferences = async (
  token: string,
  data: LearningPreferencesPayload
) => {
  const response = await fetch(`${BASE_URL}/me/preferences`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
    body: JSON.stringify(data),

  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update preferences');
  }

  return response.json();

}

export const updatePrivacySettings = async (
  token: string,
  data: PrivacySettingsPayload
) => {
  const response = await fetch(`${BASE_URL}/me/privacy`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update privacy settings');
  }

  return response.json();
}

export const updateProfile = async (
  token: string,
  data: { name?: string; level?: string }
) => {
  const response = await fetch(`${BASE_URL}/me/profile`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update profile');
  }

  return response.json();
}

export const changePassword = async (
  token: string,
  data: { currentPassword: string; newPassword: string }
) => {
  const response = await fetch(`${BASE_URL}/me/password`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to change password');
  }

  return response.json();
}

export const uploadProfilePhoto = async (token: string, file: File) => {
  const formData = new FormData();
  formData.append("photo", file);

  const res = await fetch(`${API_ROOT}/users/me/profile-photo`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // ⚠️ no Content-Type
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to upload photo");
  }

  return res.json();
};