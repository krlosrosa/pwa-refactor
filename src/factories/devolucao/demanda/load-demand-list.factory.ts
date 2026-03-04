// factories/load-demand-list.factory.ts
import { LoadDemandListUseCase } from '@/application/devolucao/demanda/loadDemandList.usecase';
import { DemandDevolucaoLocalRepository } from '@/infra/devolucao/demandLocal.repository';
import { DemandDevolucaoApiRepository } from '@/infra/devolucao/apidevolucao.api.repository';
import { makeLocalDb } from '../makeLocalDb';

export function makeLoadDemandListUseCase() {
  const apiRepo = new DemandDevolucaoApiRepository();

  const repository = new DemandDevolucaoLocalRepository(
    makeLocalDb(),
    apiRepo
  );

  return new LoadDemandListUseCase(repository, apiRepo);
}
