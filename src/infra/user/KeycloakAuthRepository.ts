import type { IAuthRepository } from "@/domain/auth/repositories/IAuthRepository";
import { keycloak } from "./keycloakClient";

export class KeycloakAuthRepository implements IAuthRepository {
  async login() {
    await keycloak.login();
  }

  async logout() {
    await keycloak.logout();
  }

  async isAuthenticated() {
    return !!keycloak.authenticated;
  }

  async getToken() {
    return keycloak.token ?? null;
  }

  async getUser(): Promise<string | null> {
    if (!keycloak.tokenParsed) return null;

    return keycloak.subject!;
  }
}
