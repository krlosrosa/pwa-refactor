import { useNavigate, useParams } from "@tanstack/react-router";
import { useConferenceStore } from "../stores/conference.store";
import { useEffect } from "react";
import { makeSyncApiToLocalUseCase } from "@/factories/devolucao/anomalia/syncApiToLocalAnomalia";

const syncAnomaliaApiForLocalUseCase = makeSyncApiToLocalUseCase();

export function   useConference() {
  const navigate = useNavigate();
  const params = useParams({ strict: false });
  const demandaId = params.id as string;
  const conferences = useConferenceStore((s) => s.conferences);
  const isLoading = useConferenceStore((s) => s.isLoading);
  const error = useConferenceStore((s) => s.error);
  const loadConferences = useConferenceStore((s) => s.loadConferences);

  function handleNavigateToConferenceItem(itemId: string) {
    navigate({ to: '/demands/$id/items/$itemId/conference', params: { id: demandaId, itemId } });
  }

  function handleNavigateToAddExtraItem() {
    navigate({ to: '/demands/$id/items/add-extra', params: { id: demandaId } });
  }

  useEffect(() => {
    if (!demandaId) return;
    loadConferences(demandaId);
  }, [demandaId]);

  function handleNavigateToFinishDemanda() {
    navigate({ to: '/demands/$id/finish', params: { id: demandaId } });
  }

  async function handleSyncAnomaliaApiForLocal() {
    await syncAnomaliaApiForLocalUseCase.execute(demandaId);
  }

  return { 
    conferences, 
    isLoading, 
    error, 
    handleNavigateToConferenceItem, 
    handleNavigateToAddExtraItem,
    handleNavigateToFinishDemanda,
    handleSyncAnomaliaApiForLocal,
  };
}