import { Button } from "@/_shared/components/ui/button";
import { DivergenciasConferencia } from "../components/demanda/divergenciasConferencia";
import { ItensNaoConferidos } from "../components/demanda/itensNaoConferidos";
import { ResumoConferencia } from "../components/demanda/resumoConferencia";
import { useFinishDemanda } from "../hooks/useFinishDemanda";
import { BottomActionBar } from "@/_shared/components/layout/BottomActionBar";
import { HeaderMobile } from "@/_shared/components/headerMobile";
import { useNavigate, useParams } from "@tanstack/react-router";

export function FinishDemandaView() {
  const { resumoDemanda, finalizarDemanda } = useFinishDemanda();
  const navigate = useNavigate();
  const params = useParams({ strict: false });
  const demandaId = params.id as string;

  return (
    <div>
        <HeaderMobile
          title="Finalizar Demanda"
          subtitle={`Demanda #${demandaId}`}
          showBackButton={true}
          backButtonAction={() => navigate({ to: `/demands/${demandaId}` })}
        />
      <div className="p-4 mb-16 space-y-2">
        <ResumoConferencia
          total={resumoDemanda?.totalItens ?? 0}
          checked={resumoDemanda?.itensConferidos ?? 0}
          unchecked={resumoDemanda?.ItenPendentes ?? 0}
          anomaliesCount={resumoDemanda?.ItensComAnomalias ?? 0}
        />
        <DivergenciasConferencia
          divergentItems={resumoDemanda?.divergencias ?? []}
        />
        <ItensNaoConferidos
          divergentItems={resumoDemanda?.itensNaoConferidos ?? []}
        />
        <BottomActionBar>
          <Button className="w-full" type="button" onClick={finalizarDemanda}>
            Confirmar Demanda
          </Button>
        </BottomActionBar>
      </div>
    </div>
  )
}