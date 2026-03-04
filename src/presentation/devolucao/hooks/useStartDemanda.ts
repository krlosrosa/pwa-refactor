import { makeStartDemandaUseCase } from "@/factories/devolucao/demanda/startDemanda.factory";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useStartDemandaForm } from "../forms/startDemanda/startDemanda.useform";

const startDemandaUseCase = makeStartDemandaUseCase();


export function useStartDemanda() {
  const navigate = useNavigate();
  const { id: demandId } = useParams({ strict: false });
  const {form} = useStartDemandaForm()

  const handleStartDemanda = async () => {
    const data = form.getValues();
    await startDemandaUseCase.execute(demandId as string, data);
    navigate({ to: '/demands/$id/checklist', params: { id: demandId as string } });
  }

  return {
    form,
    handleStartDemanda,
  }
}