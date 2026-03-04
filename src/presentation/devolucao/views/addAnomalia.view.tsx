import { useAnomalia } from '../hooks/useAnomalia';
import { AnomaliaPhotosStep } from '../components/anomalia/AnomaliaPhotosStep';
import { AnomaliaNaturezaStep } from '../components/anomalia/AnomaliaNaturezaStep';
import { AnomaliaTipoStep } from '../components/anomalia/AnomaliaTipoStep';
import { AnomaliaCausaStep } from '../components/anomalia/AnomaliaCausaStep';
import { AnomaliaObservationStep } from '../components/anomalia/AnomaliaObservationStep';
import { Button } from '@/_shared/components/ui/button';
import { HeaderMobile } from '@/_shared/components/headerMobile';
import { useNavigate } from '@tanstack/react-router';
import { BottomActionBar } from '@/_shared/components/layout/BottomActionBar';
import { ReplicarItem } from '../components/anomalia/replicarItem';
import validateFieldAnomalia from '../validate.util';

export function AddAnomaliaView() {
  const { onSubmit, 
    formData, 
    updateField, 
    handleNext, 
    currentStep, 
    handleBack, 
    itemConference, 
    anomalias,
    replicarAnomalia, 
    setReplicarAnomalia, 
    handleAddPhoto,
    handleRemovePhoto,
    photos,
  } = useAnomalia();

  const navigate = useNavigate()

  const somaCaixas = anomalias.reduce((acc, anomaly) => acc + (anomaly.quantityBox ?? 0) || 0, 0);
  const somaUnidades = anomalias.reduce((acc, anomaly) => acc + (anomaly.quantityUnit ?? 0) || 0, 0);
  const quantidaMaximaCaixas = (itemConference?.quantidadeCaixas ?? 0) - somaCaixas;
  const quantidaMaximaUnidades = (itemConference?.quantidadeUnidades ?? 0) - somaUnidades;

  function onBackButtonClick() {
    if (currentStep === 'natureza') {
      navigate({ to: '/retorno-devolucao/lista' })
    } else {
      handleBack()
    }
  }

  const heCanAddMoreCaixas = quantidaMaximaCaixas >= Number(formData.quantityBox);
  const heCanAddMoreUnidades = quantidaMaximaUnidades >= Number(formData.quantityUnit);

  const canAddMore = (heCanAddMoreCaixas && heCanAddMoreUnidades && ((Number(formData.quantityBox) > 0) || (Number(formData.quantityUnit) > 0)));

  return (
    <div>
      <HeaderMobile
        backButtonAction={onBackButtonClick}
        title="Registrar Anomalia"
        showBackButton={true}
      />
      <div className='p-2 space-y-2'>
        <form className='space-y-4' onSubmit={onSubmit}>
          {currentStep === 'natureza' &&
            <div className='space-y-4'>
              <AnomaliaNaturezaStep
                natureza={formData.natureza}
                updateField={updateField as (field: string, value: string) => void}
              />
              <AnomaliaTipoStep
                tipo={formData.tipoNaoConformidade}
                updateField={updateField as (field: string, value: string) => void}
              />
              <AnomaliaCausaStep
                natureza={formData.natureza}
                causa={formData.causaAvaria}
                updateField={updateField as (field: string, value: string) => void}
              />
            </div>}

          {currentStep === 'fotos' &&
            <div className='space-y-4'>
              <AnomaliaPhotosStep
                handleAddPhoto={handleAddPhoto}
                handleRemovePhoto={handleRemovePhoto}
                photos={photos}
              />
            </div>}
          {currentStep === 'quantidade' &&
            <div>
              <ReplicarItem
                onReplicateToAllItemsChange={setReplicarAnomalia}
                replicate={replicarAnomalia}
              />
              <AnomaliaObservationStep
                formData={formData}
                onObservationChange={updateField as (field: string, value: string) => void}
                onQuantityBoxChange={updateField as (field: string, value: string) => void}
                onQuantityUnitChange={updateField as (field: string, value: string) => void} />
              <p className='text-sm text-muted-foreground space-y-0.5 flex flex-col'>
                <span className='font-bold my-2'>Atenção: quantidade máxima de caixas e unidades:</span>
                <span className='font-semibold'>Quantidade máxima de caixas: {quantidaMaximaCaixas}</span> 
                <span className='font-semibold'>Quantidade máxima de unidades: {quantidaMaximaUnidades}</span> 
              </p>
            </div>
          }
          {currentStep !== 'quantidade' && <Button disabled={!validateFieldAnomalia(currentStep, formData)} className='w-full mt-4' type='button' onClick={handleNext}>Proxima etapa</Button>}
          <BottomActionBar>
            {
              currentStep === 'quantidade' &&
              <Button disabled={!canAddMore} className='w-full' type="submit">
                Cadastrar Anomalia
              </Button>
            }
          </BottomActionBar>
        </form>
      </div>
    </div>
  )
}