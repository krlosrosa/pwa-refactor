import type { AnomalyRecord, DemandaConferenciaRecord } from "@/_shared/db/database-local";
import { makeGetItemConferenceUseCase } from "@/factories/devolucao/conferencia/getItemconfeente.factory";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { makeAddConferenceUseCase } from "@/factories/devolucao/conferencia/addConference.factory";
import { makeDeleteConferenceUseCase } from "@/factories/devolucao/conferencia/deletarConferencia.factory";
import { makeGetProdutoBySkuUseCase } from "@/factories/devolucao/produtos/getProdutoBySku.factory";
import { makeGetAnomaliasByItemAndDemandaUseCase } from "@/factories/devolucao/anomalia/getAnomaliasByItemAndDemanda.factory";
import { makeDeleteAnomaliaUseCase } from "@/factories/devolucao/anomalia/deleteAnomalia.factory";
import { useAddItemConferenciaForm } from "../forms/addItemConferencia/addItem.useform";
import { initialDataFormAddItemConferencia, type AddItemConferenciaFormData } from "../forms/addItemConferencia/addItem.schema";

const getItemConferenceUseCase = makeGetItemConferenceUseCase();
const addConferenceUseCase = makeAddConferenceUseCase();
const deleteConferenceUseCase = makeDeleteConferenceUseCase();
const getProdutoBySkuUseCase = makeGetProdutoBySkuUseCase();
const getAnomaliasByItemAndDemandaUseCase = makeGetAnomaliasByItemAndDemandaUseCase();
const deleteAnomaliaUseCase = makeDeleteAnomaliaUseCase();

export function useConferenceItem() {
  const params = useParams({ strict: false });
  const navigate = useNavigate();
  const itemId = params.itemId as string;
  const demandaId = params.id as string;
  const [conference, setConference] = useState<DemandaConferenciaRecord | null>(null);
  const [anomalies, setAnomalies] = useState<AnomalyRecord[]>([]);
  const { form } = useAddItemConferenciaForm();

  useEffect(() => {
    if (conference) {
      if(conference?.tipo === 'FISICO') {
        form.reset({
          sku: conference?.sku ?? '',
          quantidadeCaixas: conference?.quantidadeCaixas ?? 0,
          quantidadeUnidades: conference?.quantidadeUnidades ?? 0,
          lote: conference?.lote ?? '',
          descricao: conference?.descricao ?? '',
        });
      } else {
        form.reset(initialDataFormAddItemConferencia);
      }
    }
  }, [conference]);

  useEffect(() => {
    if (!itemId || !demandaId) return;
    getItemConferenceUseCase.execute(demandaId, itemId).then((conference) => {
      if (conference) {
        setConference(conference);
      }
    });
  }, [itemId, demandaId]);

  useEffect(() => {
    if (!itemId || !demandaId) return;
    getAnomaliasByItemAndDemandaUseCase.execute(itemId, demandaId).then((anomalies) => {
      setAnomalies(anomalies);
    });
  }, [itemId, demandaId]);

  async function onSubmit(data: AddItemConferenciaFormData) {
    const produto = await getProdutoBySkuUseCase.execute(data.sku);
    await addConferenceUseCase.execute(demandaId, {
      id: conference?.tipo === 'FISICO' ? conference?.id : undefined,
      sku: data.sku,
      quantidadeCaixas: data.quantidadeCaixas,
      quantidadeUnidades: data.quantidadeUnidades,
      lote: data.lote,
      tipo: 'FISICO',
      descricao: produto?.descricao || '',
      demandaId: Number(demandaId),
      synced: 'NOT_READY',
      tipo_dev: conference?.tipo_dev === 'DEVOLUCAO' ? 'DEVOLUCAO' : 'REENTREGA',
    });
    form.reset();
    navigate({
      to: '/demands/$id',
      params: { id: demandaId }
    });
  }

  async function getProdutoBySku(sku: string) {
    const produto = await getProdutoBySkuUseCase.execute(sku);
    return produto;
  }

  async function onDelete() {
    if (!conference) return;
    await deleteConferenceUseCase.execute(demandaId, conference.id!.toString());
    navigate({
      to: '/demands/$id',
      params: { id: demandaId }
    });
  }

  function handleNavigateToAddAnomalia() {
    navigate({
      to: '/demands/$id/items/$itemId/anomaly-registration',
      params: { id: demandaId, itemId: itemId }
    });
  }

  async function handleDeleteAnomalia(anomalyId: string) {
    await deleteAnomaliaUseCase.execute(anomalyId)
    getAnomaliasByItemAndDemandaUseCase.execute(itemId, demandaId).then((anomalies) => {
      setAnomalies(anomalies);
    });
  }


  return { 
    conference, 
    form, 
    onSubmit, 
    onDelete, 
    getProdutoBySku, 
    handleNavigateToAddAnomalia,
    anomalies,
    handleDeleteAnomalia,
  };
}