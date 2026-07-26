export interface AuthState {
  user: {
    id: string;
    email: string;
    full_name?: string;
  } | null;
  sessionToken: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
