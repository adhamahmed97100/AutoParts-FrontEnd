export interface AuthResponse {
  token: string;
  expiration: Date;
  username: string;
  userID: string;
  sellerId: string;
  roles: string[];
}
