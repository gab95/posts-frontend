export type Roles = 'user' | 'admin';

export interface User {
  email: string;
  password: string;
  role: Roles;
}

export interface UserResponse {
  status: string;
  message: string;
  token: string;
  userId: number;
  role: Roles;
}
