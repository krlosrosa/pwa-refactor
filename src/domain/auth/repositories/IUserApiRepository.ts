import type { AuthUser } from "../model/AuthUser";

export default interface IUserApiRepository {
  getUserInfo(): Promise<AuthUser | null>;
}