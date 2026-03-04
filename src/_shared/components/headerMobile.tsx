// components/HeaderMobile.tsx
import { useNavigate, useRouter } from '@tanstack/react-router'
import { ArrowLeft, UserCircle2 } from 'lucide-react'
import { Button } from '@/_shared/components/ui/button'
import { cn } from '@/_shared/lib/utils'
import UserMenuView from '@/presentation/devolucao/views/user-menu.view'

interface HeaderMobileProps {
  title?: string
  subtitle?: string
  showBackButton?: boolean
  backButtonAction?: () => void
  showExtraButton?: boolean
  extraButtonAction?: () => void
  extraButtonIcon?: React.ReactNode
  extraButtonText?: string
  className?: string
  children?: React.ReactNode
}

export function   HeaderMobile({
  title,
  subtitle,
  showBackButton = true,
  backButtonAction,
  className,
  showExtraButton = false,
  extraButtonAction,
  extraButtonIcon,
  extraButtonText,
  children
}: HeaderMobileProps) {
  const navigate = useNavigate()
  const router = useRouter()

  const handleBack = () => {
    if (backButtonAction) {
      backButtonAction()
    } else {
      // Volta para a página anterior ou para a rota pai
      if (window.history.length > 1) {
        router.history.back()
      } else {
        navigate({ to: '/' }) // ou para sua rota padrão
      }
    }
  }

  const handleExtraButton = () => {
    if (extraButtonAction) {
      extraButtonAction()
    }
  }

  return (
    <header
      className={cn(
        'flex items-center justify-between p-2 border-b bg-background sticky top-0 z-50',
        className
      )}
    >
      <div className="flex items-center">
        {/* Botão Voltar */}
        <div className="flex items-center">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="mr-2"
              aria-label="Voltar"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Título */}
        <div className="flex justify-center flex-col">
          {title && (
            <h1 className="text-lg font-semibold truncate">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-sm text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {/* Conteúdo adicional */}
      <div className="flex items-center justify-end gap-6">
        <div className="flex items-center justify-end gap-2">
          {showExtraButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleExtraButton}
              className="mr-2"
              aria-label={extraButtonText}
            >
              {extraButtonIcon}
            </Button>
          )}
          {children}
        </div>
        <div className="flex items-center justify-end">
          <UserMenuView/>
        </div>
      </div>
    </header>
  )
}