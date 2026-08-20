export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface AuthUser {
  email: string;
  sub?: string;
  full_name?: string;
  picture_url?: string;
  is_superuser?: boolean;
}