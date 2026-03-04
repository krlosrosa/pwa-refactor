import type IUserApiRepository from "@/domain/auth/repositories/IUserApiRepository";
import { infoMe } from "../_services/api/service/user/user";
import type { AuthUser } from "@/domain/auth/model/AuthUser";

export class UserApiRepository implements IUserApiRepository {
  async getUserInfo(): Promise<AuthUser | null> {
    const response = await infoMe();
    return response;
  }
}