// application/usecases/load-demand-list.usecase.ts
import type { DemandLocalRecord } from '@/_shared/db/database-local';
import type { IDevolucaoApiRepository } from '@/domain/repositories/api/IDevolucao-api.inteface';
import type { IDevolucaoDemandCacheRepository } from '@/domain/repositories/cache/IDevolucao-cache.inteface';

export class LoadDemandListUseCase {
  constructor(
    private demandRepository: IDevolucaoDemandCacheRepository,
    private apiRepository: IDevolucaoApiRepository
  ) {}

  async execute(centerId: string): Promise<DemandLocalRecord[]> {
    const demandsApi = await this.apiRepository.loadDemandList(centerId);
    console.log('demandsApi', demandsApi);
    if(demandsApi.length > 0) {
      this.demandRepository.saveDemandList(demandsApi.map(demand => ({
        ...demand,
        localProgress: 'NOT_STARTED',
        telefone: demand.telefone ?? undefined,
        idTransportadora: demand.idTransportadora ?? undefined,
        cargaSegregada: demand.cargaSegregada ?? undefined,
        quantidadePaletes: demand.quantidadePaletes ?? undefined,
        doca: demand.doca ?? undefined,
        centerId: demand.centerId,
        adicionadoPorId: demand.adicionadoPorId,
        conferenteId: demand.conferenteId ?? undefined,
      })));
    }
    const demands = await this.demandRepository.loadDemandList(centerId);
    return demands;
  }
}
