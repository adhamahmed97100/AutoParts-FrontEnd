export interface AuthResponse {
  token: string;
  expiration: Date;
  username: string;
  userID: string;
  roles: string[];
}
