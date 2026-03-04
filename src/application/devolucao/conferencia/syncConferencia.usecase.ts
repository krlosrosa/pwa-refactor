import type { ISyncConferenciaCacheRepository } from "@/domain/repositories/cache/sync-conferencia.interface";
import { addContagemCegaIndividual, deleteContagemCega, updateContagemCega } from "@/infra/_services/api/service/devolucao/devolucao";
export class SyncConferenciaUseCase {

  constructor(
    private syncConferenciaCacheRepository: ISyncConferenciaCacheRepository,
  ) { }

  async execute(): Promise<void> {
    const conferencias = (await this.syncConferenciaCacheRepository.getConferenciasToSync()).filter(c => c.status !== 'syncing').sort((a, b) => a.createdAt - b.createdAt);
    console.log('conferencias', conferencias);
    for (const conferencia of conferencias) {
      if (conferencia.operation === 'CREATE') {
        await addContagemCegaIndividual(conferencia.payload.demandaId.toString(), {
          descricao: conferencia.payload.descricao,
          sku: conferencia.payload.sku,
          lote: conferencia.payload.lote ?? '',
          uuid: conferencia.uuid!,
          quantidadeUnidades: conferencia.payload.quantidadeUnidades ?? 0,
          quantidadeCaixas: conferencia.payload.quantidadeCaixas ?? 0,
        }).then(() => {
          this.syncConferenciaCacheRepository.markConferenciaAsSynced(conferencia.id!);
        }).catch((error) => {
          console.error('Erro ao adicionar contagem cega', error);
        });
      }
      else if (conferencia.operation === 'UPDATE') {
        await updateContagemCega(conferencia.uuid!, {
          uuid: conferencia.uuid!,
          descricao: conferencia.payload.descricao,
          sku: conferencia.payload.sku,
          lote: conferencia.payload.lote ?? '',
          quantidadeUnidades: conferencia.payload.quantidadeUnidades ?? 0,
          quantidadeCaixas: conferencia.payload.quantidadeCaixas ?? 0,
        }).then(() => {
          this.syncConferenciaCacheRepository.markConferenciaAsSynced(conferencia.id!);
        }).catch((error) => {
          console.error('Erro ao atualizar contagem cega', error);
        });
      }
      else if (conferencia.operation === 'DELETE') {
        await deleteContagemCega(conferencia.uuid!).then(() => {
          this.syncConferenciaCacheRepository.markConferenciaAsSynced(conferencia.id!);
        }).catch((error) => {
          console.error('Erro ao deletar contagem cega', error);
        });
      }
    }
  }
}
