import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useDemandListStore } from '../stores/devolucao-demanda.store';
import { makeSelectDemandUseCase } from '@/factories/devolucao/demanda/select-demand.factory';
import { DemandFlowStep } from '@/application/devolucao/demanda/selectDemand.usecase';
import { makeLoadAndPrepareDemandUseCase } from '@/factories/devolucao/conferencia/loadAndPrepareDemand.factory';
import { useConferenceStore } from '../stores/conference.store';
import { makeLoadDemandListUseCase } from '@/factories/devolucao/demanda/load-demand-list.factory';
import { keycloak } from '@/infra/user/keycloakClient';
import { useAuthStore } from '@/presentation/user/authStore';

const selectDemandUseCase = makeSelectDemandUseCase();
const loadAndPrepareDemandUseCase = makeLoadAndPrepareDemandUseCase();
const loadDemandListUseCase = makeLoadDemandListUseCase();

export function useListaDemanda() {
  const navigate = useNavigate();
  const { centerSelected } = useAuthStore();
  const { demands, loadDemands, isLoading, error } = useDemandListStore();
  const { loadConferences } = useConferenceStore();

  useEffect(() => {
    loadDemandList()
  }, [loadDemands, centerSelected]);

  async function loadDemandList() {
    console.log(keycloak.token);  
    if(!centerSelected) {
      return;
    }
    const demands = await loadDemandListUseCase.execute(centerSelected);
    loadDemands(demands.filter((demanda) => demanda.status === 'AGUARDANDO_CONFERENCIA' || demanda.status === 'EM_CONFERENCIA'));
  }

  const handleSelectDemand = async (demandId: string) => {
    try {
      // 1️⃣ Carrega e prepara os dados locais
      await loadAndPrepareDemandUseCase.execute(demandId);
      await loadConferences(demandId);

      // 2️⃣ Decide o próximo passo
      const result = await selectDemandUseCase.execute(demandId);

      // 3️⃣ Navega
      switch (result.nextStep) {
        case DemandFlowStep.START:
          navigate({ to: '/demands/$id/start', params: { id: demandId } });
          break;
        case DemandFlowStep.CHECKLIST:
          navigate({ to: '/demands/$id/checklist', params: { id: demandId } });
          break;
        case DemandFlowStep.CONFERENCE:
          navigate({ to: '/demands/$id', params: { id: demandId } });
          break;
        case DemandFlowStep.FINALIZATION:
          navigate({ to: '/demands/$id/finish', params: { id: demandId } });
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };


  return {
    demands,
    handleSelectDemand,
    isLoading,
    error,
  };
}
