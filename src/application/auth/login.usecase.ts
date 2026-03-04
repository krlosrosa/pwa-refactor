import type { IAuthRepository } from "@/domain/auth/repositories/IAuthRepository";

export class LoginUseCase {
  constructor(private authRepo: IAuthRepository) {}

  execute() {
    return this.authRepo.login();
  }
}