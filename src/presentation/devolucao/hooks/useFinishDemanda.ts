import type { ResumoDemandaDto } from "@/domain/devolucao/dtos/resumoDemanda.dto";
import { makeFinalizarDemandaUseCase } from "@/factories/devolucao/demanda/finalizarDemanda.factory";
import { makeGetResumoDemandaUseCase } from "@/factories/devolucao/demanda/getResumoDemanda.factory";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const resumoDemandaUseCase = makeGetResumoDemandaUseCase();
const finalizarDemandaUseCase = makeFinalizarDemandaUseCase();

export function useFinishDemanda() {

  const params = useParams({ strict: false });
  const demandaId = params.id as string;
  const navigate = useNavigate();

  const [resumoDemanda, setResumoDemanda] = useState<ResumoDemandaDto | null>(null);

  useEffect(() => {
    resumoDemandaUseCase.execute(demandaId).then(setResumoDemanda);
  }, [demandaId]);

  async function finalizarDemanda() {
    await finalizarDemandaUseCase.execute(demandaId);
    navigate({ to: '/retorno-devolucao/lista' });
  }

  return {    
    resumoDemanda,
    finalizarDemanda,
  };
}