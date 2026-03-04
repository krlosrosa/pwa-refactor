import { HeaderMobile } from "@/_shared/components/headerMobile";
import { DemandListItem } from "../components/DemandListItem";
import { useListaDemanda } from "../hooks/useListaDemanda";
import { useNavigate } from "@tanstack/react-router";

export function ListaDemandaView() {
  const { demands, handleSelectDemand, isLoading, error } = useListaDemanda();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Carregando...</div>;
  }
  if (error) {
    return <div>Erro ao carregar demandas: {error}</div>;
  }

  return (
    <div>
      <HeaderMobile
        backButtonAction={() => navigate({ to: '/retorno-devolucao/lista' })}
        title="Lista de Demanda"
        showBackButton={true}
        subtitle={`${demands.length} demanda${demands.length > 1 ? 's' : ''}`}
      />
      <div className="p-2 space-y-2 overflow-y-auto mb-16">
        {demands.map((demand) => (
          <DemandListItem
            key={demand.id}
            demand={demand}
            onClick={() =>
            handleSelectDemand(demand.id.toString())}
          />
        ))}
      </div>
    </div>
  )
}