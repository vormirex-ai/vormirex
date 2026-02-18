const API_ROOT = import.meta.env.VITE_API_URL || 'http://localhost/api';
export const BASE_URL = `${API_ROOT}/users`;

export interface NotificationPreferences {
  streakReminders: boolean;
  newCourseAlerts: boolean;
  securityAlerts: boolean;
}

export const updateNotificationPreferences = async (
  preferences: NotificationPreferences,
  token: string
): Promise<{success: boolean; message?: string}> =>{

  const response = await fetch(`${BASE_URL}/me/notifications`, {
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(preferences),
  });

  if(!response.ok){
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update notifications');
  }
  

  return response.json();
}

export const deleteAccount = async (token: string) =>{
  const response = await fetch(`${BASE_URL}/me`,{
    method: 'DELETE',
    headers:{
      'Authorization' : `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if(!response.ok){
    throw new Error('Failed to delete account');
  }
  //handle 204
  return response.status === 204 ? null : response.json();
}