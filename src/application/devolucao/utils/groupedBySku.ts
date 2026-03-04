import type { DemandaConferenciaRecord } from "@/_shared/db/database-local";
import type { ReturnListConferenceGroupedSku } from "@/domain/devolucao/dtos/returnListConferenceUi";

export function groupedBySku(conferences: DemandaConferenciaRecord[]): ReturnListConferenceGroupedSku[] {
  const grouped = conferences.reduce((acc, conference) => {
    const sku = `${conference.sku}-${conference.lote}` ;
    if (!acc[sku]) {
      acc[sku] = [];
    }
    acc[sku].push(conference);
    return acc;
  }, {} as Record<string, DemandaConferenciaRecord[]>);

  return Object.entries(grouped).map(([sku, items]): ReturnListConferenceGroupedSku => {
    const first = items[0]!;
    console.log(items);
    const caixasContabil = items
      .filter((c) => c.tipo === "CONTABIL")
      .reduce((sum, c) => sum + (c.quantidadeCaixas ?? 0), 0);
    const caixasFisico = items
      .filter((c) => c.tipo === "FISICO")
      .reduce((sum, c) => sum + (c.quantidadeCaixas ?? 0), 0);
    const unidadesContabil = items
      .filter((c) => c.tipo === "CONTABIL")
      .reduce((sum, c) => sum + (c.quantidadeUnidades ?? 0), 0);
    const unidadesFisico = items
      .filter((c) => c.tipo === "FISICO")
      .reduce((sum, c) => sum + (c.quantidadeUnidades ?? 0), 0);

    return {
      id: String(first.id ?? sku),
      sku,
      descricao: first.descricao,
      tipo_dev: first.tipo_dev,
      lote: first.lote ?? "",
      caixasContabil,
      caixasFisico,
      unidadesContabil,
      unidadesFisico,
      demandaId: first.demandaId,
      tipo: first.tipo,
    };
  });
}