import { Label } from "@/_shared/components/ui/label";
import { MessageSquare } from "lucide-react";
import { Textarea } from "@/_shared/components/ui/textarea";
import { useCheckList } from "../../hooks/useCheckList";
import { useEffect, useState } from "react";

export function ObservacaoStep() {
  const [observation, setObservation] = useState('');
  const { updateField } = useCheckList();

  useEffect(() => {
    updateField('anomalias', observation);
  }, [observation]);

  return (
    <div className="p-0 flex flex-col">
      {/* Cabeçalho compacto */}
      <div className="text-center mb-3">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Observações
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Registre anomalias encontradas
        </p>
      </div>

      {/* Área do Textarea - Ocupa espaço principal */}
      <div className="flex-1 flex flex-col">
        <div className="space-y-2 mb-3">
          <Label htmlFor="observations" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <MessageSquare className="h-4 w-4" />
            Observações (opcional)
          </Label>
          <Textarea
            id="observations"
            placeholder="Ex: Porta quebrada, odor forte, insetos, vazamentos, sujeira excessiva..."
            className="min-h-[100px] resize-none text-base"
            value={observation || ''}
            onChange={(e) => setObservation(e.target.value)}
          />
        </div>

        {/* Dicas específicas para veículo/carro */}
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-100 dark:border-amber-800">
          <p className="text-xs font-medium text-amber-700 dark:text-amber-300 mb-1">
            🚨 O que verificar no veículo:
          </p>
          <ul className="text-xs text-amber-600 dark:text-amber-400 space-y-0.5">
            <li>• Portas/travas quebradas</li>
            <li>• Odor forte ou estranho</li>
            <li>• Presença de insetos/roedores</li>
            <li>• Vazamentos de água/óleo</li>
            <li>• Sujeira excessiva no baú</li>
            <li>• Danos nas paredes internas</li>
            <li>• Iluminação do baú com defeito</li>
          </ul>
        </div>
      </div>

    </div>
  );
}