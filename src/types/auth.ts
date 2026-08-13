export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface CreateLoginRequest {
  customer_id: string;
  username: string;
  password: string;
}

export interface UserOut {
  id: string;
  username: string;
  role: string;
  customer_id: string | null;
}

export interface AdminUpdateUserRequest {
  admin_password: string;
  username?: string;
  new_password?: string;
}

export interface SelfPasswordChangeRequest {
  current_password: string;
  new_password: string;
}
