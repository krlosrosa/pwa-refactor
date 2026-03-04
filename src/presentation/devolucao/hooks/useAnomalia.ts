import { useEffect, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import type z from "zod";
import type { AnomalyRecord, DemandaConferenciaRecord } from "@/_shared/db/database-local";
import { makeAddAnomaliaUseCase } from "@/factories/devolucao/anomalia/addAnomalia.factory";
import { makeGetAnomaliasByItemAndDemandaUseCase } from "@/factories/devolucao/anomalia/getAnomaliasByItemAndDemanda.factory";
import { makeReplicarAnomaliaUseCase } from "@/factories/devolucao/anomalia/replicarAnomalia";
import { makeGetItemConferenceUseCase } from "@/factories/devolucao/conferencia/getItemconfeente.factory";
import { makeGetFotosByDemandaAndTipoUseCase } from "@/factories/devolucao/fotos/get-fotos-byDemanda-and-tipo.factory";
import { cadastrarAnomaliaSchema } from "../forms/schemas/cadastrarAnomalia.schema";

export type AnomalyFormData = z.infer<typeof cadastrarAnomaliaSchema>;

export const ANOMALIA_STEPS = ['natureza', 'fotos', 'quantidade'];

const initialFormData: AnomalyFormData = {
  natureza: '',
  tipoNaoConformidade: '',
  causaAvaria: '',
  description: '',
  observacao: '',
  quantityBox: '',
  quantityUnit: '',
};

const addAnomaliaUseCase = makeAddAnomaliaUseCase();
const replicarAnomaliaUseCase = makeReplicarAnomaliaUseCase();
const getItemConferenceUseCase = makeGetItemConferenceUseCase();
const getAnomaliasByItemAndDemandaUseCase = makeGetAnomaliasByItemAndDemandaUseCase();
const getFotosByDemandaAndTipoUseCase = makeGetFotosByDemandaAndTipoUseCase();

export function useAnomalia() {
  // Roteamento
  const params = useParams({ strict: false });
  const navigate = useNavigate();
  const demandaId = params.id as string;
  const itemId = params.itemId as string;

  // Estado: dados carregados (preenchidos pelo useEffect)
  const [itemConference, setItemConference] = useState<DemandaConferenciaRecord | null>(null);
  const [anomalias, setAnomalias] = useState<AnomalyRecord[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);

  // Estado: passo atual do wizard
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = ANOMALIA_STEPS[currentStepIndex];

  // Estado: formulário e opção replicar
  const [formData, setFormData] = useState<AnomalyFormData>(initialFormData);
  const [replicarAnomalia, setReplicarAnomalia] = useState(false);

  // Efeito: carrega item, anomalias e fotos quando mudam demanda/item
  useEffect(() => {
    getItemConferenceUseCase.execute(demandaId, itemId).then((item) => {
      if (item) setItemConference(item);
    });
    getAnomaliasByItemAndDemandaUseCase.execute(itemId, demandaId).then((anomalias) => {
      if (anomalias) setAnomalias(anomalias);
    });

  }, [itemId, demandaId, getFotosByDemandaAndTipoUseCase]);

  // Navegação entre steps
  function handleNext() {
    if (currentStepIndex === ANOMALIA_STEPS.length - 1) return;
    setCurrentStepIndex(prev => prev + 1);
  }

  function handleBack() {
    if (currentStepIndex === 0) return;
    setCurrentStepIndex(prev => prev - 1);
  }

  // Edição do formulário
  function updateField(field: keyof AnomalyFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  // Fotos (step do meio)
  function handleAddPhoto(file: File) {
    setPhotos((prev) => [...prev, file]);
  }

  function handleRemovePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  // Envio final
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const itemData = {
      itemId,
      demandaId,
      natureza: formData.natureza,
      tipo: formData.tipoNaoConformidade,
      causa: formData.causaAvaria,
      photos: photos,
      description: `${formData.natureza} | ${formData.tipoNaoConformidade} | ${formData.causaAvaria}`,
      quantityBox: formData.quantityBox ? Number(formData.quantityBox) : undefined,
      quantityUnit: formData.quantityUnit ? Number(formData.quantityUnit) : undefined,
    };
    try {
      if (replicarAnomalia) {
        await replicarAnomaliaUseCase.execute(itemData);
      } else {
        await addAnomaliaUseCase.execute(itemData);
      }
      setFormData(initialFormData);
      navigate({
        to: '/demands/$id/items/$itemId/conference',
        params: { id: demandaId, itemId: itemId }
      });
    } catch (error) {
      console.error('Error adding anomaly:', error);
      alert('Erro ao cadastrar anomalia. Tente novamente.');
      return;
    }
  }

  return {
    currentStep,
    currentStepIndex,
    handleNext,
    handleBack,
    formData,
    updateField,
    onSubmit,
    itemConference,
    anomalias,
    replicarAnomalia,
    setReplicarAnomalia,
    handleAddPhoto,
    handleRemovePhoto,
    photos,
  };
}
