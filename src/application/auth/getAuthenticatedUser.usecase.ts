import type { UserInfoDto } from "@/domain/auth/model/User.dto";
import type { IAuthRepository } from "@/domain/auth/repositories/IAuthRepository";
import type IUserApiRepository from "@/domain/auth/repositories/IUserApiRepository";

export class GetAuthenticatedUserUseCase {
  constructor(
    private authRepo: IAuthRepository,
    private user: IUserApiRepository
  ) {}

  async execute(): Promise<UserInfoDto | null> {
    const userId = await this.authRepo.getUser();
    if (!userId) return null;
    const userInfo = await this.user.getUserInfo();
    if (!userInfo) return null;
    return {
      ...userInfo,
      access_token: await this.authRepo.getToken() ?? '',
      empresa: userInfo.empresa ?? '',
    };
  }
}
