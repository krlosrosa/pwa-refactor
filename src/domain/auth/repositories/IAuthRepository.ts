export interface IAuthRepository {
  login(): Promise<void>;
  logout(): Promise<void>;
  getUser(): Promise<string | null>;
  getToken(): Promise<string | null>;
  isAuthenticated(): Promise<boolean>;
}