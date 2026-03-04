import { KeycloakAuthRepository } from "@/infra/user/KeycloakAuthRepository";
import { GetAuthenticatedUserUseCase } from "@/application/auth/getAuthenticatedUser.usecase";
import { UserApiRepository } from "@/infra/user/user.repository";


export function makeGetAuthenticatedUser() {
  const authRepo = new KeycloakAuthRepository();
  const userRepo = new UserApiRepository();
  return new GetAuthenticatedUserUseCase(authRepo, userRepo);
}