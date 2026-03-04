import { useProfileMenu } from "../hooks/useProfileMenu";
import { Button } from "@/_shared/components/ui/button";

export function ProfileMenu() {
  const { syncProdutos } = useProfileMenu();

  return (
    <div>
      <Button onClick={syncProdutos}>Sincronizar produtos</Button>
    </div>
  )
}