
import { useEffect, useState } from "react";
import { keycloak } from "@/infra/user/keycloakClient";
import { useAuthStore } from "./authStore";
import { makeGetAuthenticatedUser } from "@/factories/user/getAuthenticatedUser.factory";


const getAuthenticatedUser = makeGetAuthenticatedUser();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const setCenterSelected = useAuthStore((s) => s.setCenterSelected);

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    keycloak
      .init({ 
        onLoad: "login-required",
        checkLoginIframe: false 
      })
      .then(async (authenticated) => {
        if (!authenticated) {
          await keycloak.login();
          return;
        }

        const user = await getAuthenticatedUser.execute();
        setUser(user);
        if(user?.roles) {
          if(user.roles.length === 1) {
            const center = user.roles[0].split(':')[2];
            setCenterSelected(center);
          }
        }
        setInitialized(true);
      });
  }, []);

  if (!initialized) {
    return <div>Carregando...</div>;
  }

  return <>{children}</>;
}
