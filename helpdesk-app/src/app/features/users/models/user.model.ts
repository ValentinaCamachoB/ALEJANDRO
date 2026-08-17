export type UserRole = 'client' | 'agent' | 'admin';

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
