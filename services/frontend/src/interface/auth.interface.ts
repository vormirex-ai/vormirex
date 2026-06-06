export interface User {
  id?: string;
  name: string;
  email: string;
}

export interface LoginDateType {
  email: string;
  password: string;
}

export interface SignupDataType {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  accessToken?: string;
  user?: User;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
}
