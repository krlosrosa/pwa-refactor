import { useMemo } from "react";
import { ItemCardListItem } from "../components/ItemCard";
import { useConference } from "../hooks/useConference";
import { Button } from "@/_shared/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useDevolucaoItensFiltroStore } from "../stores/filtro.store";
import { HeaderMobile } from "@/_shared/components/headerMobile";
import { useNavigate, useParams } from "@tanstack/react-router";
import { FiltrosConference } from "../components/filtros";
import { BottomActionBar } from "@/_shared/components/layout/BottomActionBar";
import { SyncAnomaliaApiForLocal } from "../components/anomalia/syncAnomaliaApiForLocal";

export function ConferenceView() {
  const { conferences, isLoading, error, handleNavigateToConferenceItem, handleNavigateToFinishDemanda, handleSyncAnomaliaApiForLocal, } = useConference();
  const { hasAnomaly, isChecked, notChecked, setHasAnomaly, setIsChecked, setNotChecked, sku, setSku, tipoDevolucao, setReentrega } = useDevolucaoItensFiltroStore();
  const { id: demandaId } = useParams({ strict: false });
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const quantidadeItensConferidos = useMemo(() => {
    return 
  }, [conferences]);
  const quantidadeItensNaoConferidos = useMemo(() => {
    return conferences.filter((c) => !c.isChecked).length;
  }, [conferences, demandaId]);

  const filteredConferences = useMemo(() => {
    let list = conferences;
    if (hasAnomaly) list = list.filter((c) => c.hasAnomaly);
    if (isChecked) list = list.filter((c) => c.isChecked);
    if (notChecked) list = list.filter((c) => !c.isChecked);
    if (sku.length > 0) list = list.filter((c) => c.sku.includes(sku));
    if (tipoDevolucao === 'REENTREGA') list = list.filter((c) => c.tipo_dev === 'REENTREGA');
    return list;
  }, [conferences, hasAnomaly, isChecked, notChecked, sku, demandaId, tipoDevolucao]);

  return (
    <div>
      <HeaderMobile
        backButtonAction={() => navigate({ to: '/retorno-devolucao/lista' })}
        title="Conferência"
        subtitle={`#${demandaId} • ${quantidadeItensConferidos}/${quantidadeItensNaoConferidos} itens`}
        showBackButton={true}
        showExtraButton={true}
        extraButtonAction={() => navigate({ to: '/demands/$id/items/add-extra', params: { id: demandaId! } })}
        extraButtonIcon={
          <div className="flex items-center gap-2 border py-1 px-2 rounded-md">
            <PlusCircle className="h-4 w-4" />
            <span>extra</span>
          </div>
        }
        extraButtonText="Perfil"
    
      />
      <div className="p-4 space-y-3 mb-16">
        <SyncAnomaliaApiForLocal handleSyncAnomaliaApiForLocal={handleSyncAnomaliaApiForLocal} />
        <FiltrosConference
          sku={sku}
          setSku={setSku}
          hasAnomaly={hasAnomaly}
          setHasAnomaly={setHasAnomaly}
          notChecked={notChecked}
          setNotChecked={setNotChecked}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          tipoDevolucao={tipoDevolucao}
          setReentrega={setReentrega}
        />
        {filteredConferences.map((conference) => (
          <ItemCardListItem
            key={conference.id}
            item={conference}
            onClick={() => handleNavigateToConferenceItem(conference.id)}
          />
        ))}
      </div>
      <BottomActionBar>
        <Button className="w-full" onClick={handleNavigateToFinishDemanda}>
          Finalizar Demanda
        </Button>
      </BottomActionBar>
    </div>
  )
}