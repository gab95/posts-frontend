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

export interface UserPost {
  name: string;
  lastname: string;
}

export interface Profile {
  name: string;
  lastname: string;
  email: string;
  password: string;
}
