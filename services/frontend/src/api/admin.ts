const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to manage standard fetch boilerplate
const authFetch = async (endpoint: string, token: string) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch admin data');
  }

  return data;
};

// 1. Get the Top 4 Stat Blocks
export const fetchAdminStats = async (token: string) => {
  return authFetch('/analytics/stats', token);
};

// 2. Get the User Growth aggregation array
export const fetchUserGrowth = async (token: string) => {
  return authFetch('/analytics/user-growth', token);
};

// 3. Get the native Node.js System metrics
export const fetchSystemHealth = async (token: string) => {
  return authFetch('/analytics/system-health', token);
};

// 4. Get Captured Guest Leads
export const fetchGuestLeads = async (token: string) => {
  return authFetch('/users/guests', token);
};

// 5. Get the Audit Logs
export const fetchAuditLogs = async (token: string) => {
  return authFetch('/analytics/audit-logs', token);
};

// 6. Get Admin Accounts
export const fetchAdminAccounts = async (token: string) => {
  return authFetch('/users/admins', token);
};

// 7. Create Admin Account
export const createAdminAccount = async (payload: any, token: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/users/admins`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create admin');
  }
  return data;
};

// 8. Fetch Role Permissions Matrix
export const fetchRoleConfig = async (roleName: string, token: string) => {
  return authFetch(`/roles?roleName=${encodeURIComponent(roleName)}`, token);
};

// 9. Update Role Permissions Matrix
export const updateRoleConfig = async (payload: { roleName: string; matrix: any[] }, token: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/roles`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to update role configuration');
  }
  return data;
};

