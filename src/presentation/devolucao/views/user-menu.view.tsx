import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/_shared/components/ui/sheet";
import { Building2, Check, LogOut, User } from "lucide-react";
import { Button } from "@/_shared/components/ui/button";
import { Badge } from "@/_shared/components/ui/badge";
import { useUserMenu } from "../hooks/useUserMenu";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/presentation/user/authStore";


export default function UserMenuView() {

  const { isOpen, setIsOpen, centerSelected, showCenterSelection, handleSelectCenter, setShowCenterSelection, availableCenters } = useUserMenu();
  const navigate = useNavigate();
  const { user } = useAuthStore();


  return (
    <div>
      <div>
        <Button onClick={() => setIsOpen(true)}>
          <User className="h-5 w-5" />
        </Button>
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom" className="h-[85vh] max-h-[85vh] rounded-t-2xl pb-safe pb-8">
          <SheetHeader className="text-left">
            <SheetTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Perfil do Usuário
            </SheetTitle>
            <SheetDescription>
              Gerencie suas configurações e preferências
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto space-y-6 px-4 py-4">
            {/* User Info Section */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Informações
              </h3>
              <div className="rounded-lg border bg-card p-4 space-y-2">
                <div>
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">ID: {user?.id}</p>
                </div>
              </div>
            </div>

            {/* Current Center Section */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Centro Atual
              </h3>
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {centerSelected || 'Não selecionado'}
                    </span>
                  </div>
                  {centerSelected && (
                    <Badge variant="secondary" className="gap-1">
                      <Check className="h-3 w-3" />
                      Ativo
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Change Center Section */}
            {!showCenterSelection ? (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Ações
                </h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12"
                    onClick={() => {
                      navigate({ to: '/sync-data-dashboard' });
                    }}
                  >
                    Sincronizar Dados
                  </Button>
                  {availableCenters && availableCenters.length > 1 && (
                    <Button
                      variant="outline"
                      className="w-full justify-start h-12"
                      onClick={() => setShowCenterSelection(true)}
                    >
                      <Building2 className="h-4 w-4 mr-2" />
                      Trocar Centro
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Selecione um Centro
                </h3>
                <div className="space-y-2">
                  {availableCenters && availableCenters.map((center) => (
                    <Button
                      key={center}
                      variant={centerSelected === center ? 'default' : 'outline'}
                      className="w-full justify-start h-12"
                      onClick={() => handleSelectCenter(center)}
                    >
                      <Building2 className="h-4 w-4 mr-2" />
                      {center}
                      {centerSelected === center && (
                        <Check className="h-4 w-4 ml-auto" />
                      )}
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    className="w-full h-12"
                    onClick={() => setShowCenterSelection(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <SheetFooter className="px-4 pb-4 pt-4 border-t flex-col gap-2">
            <Button
              variant="destructive"
              className="w-full h-12"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair da Conta
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}