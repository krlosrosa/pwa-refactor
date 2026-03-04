import { HeaderMobile } from "@/_shared/components/headerMobile";
import { StartDemandaForm } from "../forms/startDemanda/startDemanda.form";
import { useNavigate } from "@tanstack/react-router";
import { useStartDemanda } from "../hooks/useStartDemanda";

export function StartDemandaView() {
  const { form, handleStartDemanda } = useStartDemanda();
  const navigate = useNavigate();

  return (
    <div className="">
      <HeaderMobile
        backButtonAction={() => navigate({ to: '/retorno-devolucao/lista' })}
        title="Iniciar Demanda"
        showBackButton={true}
      />
      <div className="p-4 space-y-4">
        <form onSubmit={form.handleSubmit(handleStartDemanda)} className="space-y-2">
          <StartDemandaForm form={form} />
        </form>
      </div>
    </div>
  )
}