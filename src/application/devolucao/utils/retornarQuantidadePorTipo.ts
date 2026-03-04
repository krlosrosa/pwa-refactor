import type { DemandaConferenciaRecord } from "@/_shared/db/database-local";
import type { tipoContabilFisico } from "@/_shared/db/database-local";

export function retornarQuantidadePorTipo(
  conferences: DemandaConferenciaRecord[],
  sku: string,
  tipo: tipoContabilFisico
): { caixas: number; unidades: number } {
  return conferences.reduce(
    (acc, curr) => {
      if (curr.sku === sku && curr.tipo === tipo) {
        return {
          caixas: acc.caixas + (curr.quantidadeCaixas ?? 0),
          unidades: acc.unidades + (curr.quantidadeUnidades ?? 0),
        };
      }
      return acc;
    },
    { caixas: 0, unidades: 0 }
  );
}
