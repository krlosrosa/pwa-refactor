import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL || 'https://auth.lilog.app',
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'lilog',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'vite',
});