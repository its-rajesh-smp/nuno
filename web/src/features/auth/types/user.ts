export interface User {
  id: string;
  name: string;
  email: string;
  imageUrl: string | null;
}

export type AuthField = 'name' | 'email' | 'password';

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignUpInput extends SignInInput {
  name: string;
}
