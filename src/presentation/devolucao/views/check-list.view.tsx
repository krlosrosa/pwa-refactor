import { BauAbertoStep } from '../components/checkList/BauAbertoStep';
import { BauFechadoStep } from '../components/checkList/BauFechadoStep';
import { TemperaturaStep } from '../components/checkList/TemperaturaStep';
import { ObservacaoStep } from '../components/checkList/ObservacaoStep';
import { useCheckList } from '../hooks/useCheckList';
import { HeaderMobile } from '@/_shared/components/headerMobile';
import { Button } from '@/_shared/components/ui/button';
import { ValidateStep } from '../components/checkList/validateStep';
import { useState } from 'react';

export function ChecklistPage() {
  const { checklist, isLoading, error, advanceStep, goBackStep, finishProcessChecklist} = useCheckList();
  const [validateStep, setValidateStep] = useState(false);
  
  if (isLoading || error) {
    return <p>Carregando checklist...</p>;
  }

  if (!checklist) {
    return <p>Checklist não encontrado</p>;
  }

  return (
    <div>
      <HeaderMobile
        title="Checklist"
        showBackButton={true}
        backButtonAction={goBackStep}
      />
      <div className="p-2">
        {checklist.currentStep === 'BAU_ABERTO' && <BauAbertoStep setValidateStep={setValidateStep} />}
        {checklist.currentStep === 'BAU_FECHADO' && <BauFechadoStep setValidateStep={setValidateStep} />}
        {checklist.currentStep === 'TEMPERATURAS' && <TemperaturaStep setValidateStep={setValidateStep} />}
        {checklist.currentStep === 'OBSERVAÇÕES' && <ObservacaoStep />}
        {checklist.currentStep === 'VALIDACAO' && <ValidateStep />}

        <div className="flex flex-col  gap-2 justify-between mt-4">
          {checklist.currentStep !== 'VALIDACAO' && <Button disabled={!validateStep} onClick={advanceStep}>
            Próxima etapa
          </Button>}
          {checklist.currentStep === 'VALIDACAO' && <Button onClick={finishProcessChecklist}>
            Finalizar Checklist
          </Button> }
            <Button onClick={goBackStep}>
              Voltar etapa
            </Button>
        </div>
      </div>
    </div>
  );
}
