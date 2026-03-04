import { Camera } from 'lucide-react';
import { useCheckList } from '../../hooks/useCheckList';
import { useEffect } from 'react';

type BauFechadoStepProps = {
  setValidateStep: (validate: boolean) => void;
}

export function BauFechadoStep({ setValidateStep }: BauFechadoStepProps) {
  const { updateField, checklist } = useCheckList();

  useEffect(() => {
    setValidateStep(false);
  }, []);

  async function handlePhotoCaptured(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    updateField('fotoBauFechado', file);
    setValidateStep(true);
  }

  return (
    <div className="p-4 flex flex-col">
    {/* Cabeçalho compacto */}
    <div className="text-center mb-3">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
        Baú Fechado
      </h1>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Foto com o baú completamente fechado
      </p>
    </div>

    {/* Área principal - Foto ou botão */}
    <div className="flex-1 flex items-center justify-center">
      {checklist?.data?.fotoBauFechado ? (
        <div className="w-full space-y-3">
          {/* Foto Preview */}
          <div className="relative aspect-4/3 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
            <img
              src={URL.createObjectURL(checklist.data.fotoBauFechado)}
              alt="Foto do Baú Fechado"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
              ✓
            </div>
          </div>

          {/* Botão para alterar */}
          <label className="block">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="sr-only"
              onChange={handlePhotoCaptured}
            />
            <div className="flex items-center justify-center gap-2 p-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95">
              <Camera className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Alterar Foto
              </span>
            </div>
          </label>
        </div>
      ) : (
        /* Estado sem foto */
        <label className="block w-full">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="sr-only"
            onChange={handlePhotoCaptured}
          />
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 active:scale-95">
            <div className="bg-blue-500 p-3 rounded-full mb-3">
              <Camera className="h-8 w-8 text-white" />
            </div>
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              Tirar Foto
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
              Toque para capturar
            </span>
          </div>
        </label>
      )}
    </div>
  </div>
)
}