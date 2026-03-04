import { KeycloakAuthRepository } from "@/infra/user/KeycloakAuthRepository";

export function makeKeycloak() {
  return new KeycloakAuthRepository();
}