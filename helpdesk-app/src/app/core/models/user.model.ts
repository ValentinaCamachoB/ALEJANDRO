export type UserRole = 'client' | 'agent' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
