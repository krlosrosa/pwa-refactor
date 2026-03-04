import { Card, CardContent } from "@/_shared/components/ui/card";
import { useCheckList } from "../../hooks/useCheckList";

export function ValidateStep() {
  const { checklist } = useCheckList();
  
  return (
    <div className="p-2 dark:bg-gray-900">
      <div className="max-w-md mx-auto space-y-4">
        {/* Cabeçalho simples */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Checklist Finalizado
          </h2>
        </div>
        
        {/* Card Principal */}
        <Card className="border p-0 border-gray-200 dark:border-gray-800">
          <CardContent className="p-4 space-y-4">
            
            {/* Fotos lado a lado */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Baú Fechado</p>
                <div className="aspect-square rounded border border-gray-300 dark:border-gray-700 overflow-hidden">
                  <img 
                    src={URL.createObjectURL(checklist?.data?.fotoBauFechado ?? new Blob())} 
                    alt="Baú Fechado"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Baú Aberto</p>
                <div className="aspect-square rounded border border-gray-300 dark:border-gray-700 overflow-hidden">
                  <img 
                    src={URL.createObjectURL(checklist?.data?.fotoBauAberto ?? new Blob())} 
                    alt="Baú Aberto"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Temperaturas */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Temp. Baú</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {checklist?.data?.temperaturaBau}°C
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Temp. Produto</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {checklist?.data?.temperaturaProduto}°C
                </p>
              </div>
            </div>
            
            {/* Observações */}
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Observações</p>
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {checklist?.data?.anomalias || "Nenhuma observação registrada"}
                </p>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}