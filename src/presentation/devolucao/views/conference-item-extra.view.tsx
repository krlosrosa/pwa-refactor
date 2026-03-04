import { Button } from "@/_shared/components/ui/button"
import { useConferenceItem } from "../hooks/useConferenceItem"
import { HeaderMobile } from "@/_shared/components/headerMobile"
import { useNavigate, useParams } from "@tanstack/react-router"
import { FormAddItemConferencia } from "../forms/addItemConferencia/addItem.form"

export function ConferenceItemExtraView() {
  const { form, onSubmit } = useConferenceItem()
  const {id} = useParams({strict: false})
  const navigate = useNavigate();
  return (
    <div className="space-y-2">
      <HeaderMobile
        backButtonAction={() => navigate({ to: `/demands/${id}` })}
        title="Conferência de Item"
        showBackButton={true}
      />
      <div className="p-4 space-y-2">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormAddItemConferencia form={form} />
        </form>
      </div>
    </div>
  )
}