import { Button } from "@/_shared/components/ui/button"
import { useConferenceItem } from "../hooks/useConferenceItem"
import { AnomaliaCardItem } from "../components/anomaliaCardItem"
import { HeaderMobile } from "@/_shared/components/headerMobile"
import { useNavigate, useParams } from "@tanstack/react-router"
import { ProductInfoCard } from "../components/conferencia/dadosProduto"
import { FormAddItemConferencia } from "../forms/addItemConferencia/addItem.form"

export function ConferenceItemView() {
  const { form, conference, onSubmit, onDelete, handleNavigateToAddAnomalia, anomalies, handleDeleteAnomalia } = useConferenceItem()
  const {id} = useParams({strict: false})
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full mb-16">
      <HeaderMobile
        backButtonAction={() => navigate({ to: `/demands/${id}` })}
        title="Conferência de Item"
        showBackButton={true}
        subtitle={`${conference?.sku}`}
      />

      <div className="p-4 space-y-2">
        {conference?.sku && <ProductInfoCard
          sku={conference.sku}
          description={conference.descricao}
        />}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {/*<FormCadastroItem getProdutoBySku={getProdutoBySku} form={form} tipo={conference?.tipo} />*/}
          <FormAddItemConferencia expectSku={conference?.sku} form={form} />
          <div className="space-y-2">
            {anomalies.map((anomaly) => (
              <AnomaliaCardItem key={anomaly.id} anomaly={anomaly} onDelete={handleDeleteAnomalia} />
            ))}
          </div>
          {conference?.tipo === "FISICO" && (
            <div className="space-y-2">
              <Button
                className="w-full"
                type="button"
                variant="outline"
                onClick={handleNavigateToAddAnomalia}
              >
                Cadastrar Anomalia
              </Button>
              <Button variant="destructive" className="w-full" type="button" onClick={onDelete}>
                Deletar
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}