import type { AddAnomaliaDto, DemandDto, GetAnomaliasByDemandaDto, GetItensDemandaDto, ProdutoDto } from "@/infra/_services/api/model";
import { addAnomaliaDevolucao, getAnomaliasByDemanda, getItensByDemandaIdDevolucaoMobile, getPresignedUrlAnomaliaDevolucao, listarDemandasEmAbertoDevolucaoMobile, removeImangesBucket } from "@/infra/_services/api/service/devolucao/devolucao";
import { findAllProdutos } from "@/infra/_services/api/service/produto/produto";
import type { IDevolucaoApiRepository } from "@/domain/repositories/api/IDevolucao-api.inteface";

export class DemandDevolucaoApiRepository implements IDevolucaoApiRepository {

  async loadDemandList(centerId: string): Promise<DemandDto[]> {
    const response = await listarDemandasEmAbertoDevolucaoMobile(centerId);
    return response;
  }

  async getAnomalyPresignedUrl(anomalyId: string): Promise<string> {
    const response = await getPresignedUrlAnomaliaDevolucao(anomalyId);
    return response;
  }

  async addAnomaly(anomaly: AddAnomaliaDto): Promise<void> {
    await addAnomaliaDevolucao(anomaly);
  }

  async findConferencesByDemandId(demandId: string): Promise<GetItensDemandaDto[]> {
    const response = await getItensByDemandaIdDevolucaoMobile(demandId);
    return response;
  }

  async findAllProdutos(): Promise<ProdutoDto[]> {
    const response = await findAllProdutos();
    return response;
  }

  async deleteImages(bucketName: string, imagesNames: string[]): Promise<void> {
    await removeImangesBucket(bucketName, imagesNames);
  }

  async getAnomaliasByDemandaId(demandaId: string): Promise<GetAnomaliasByDemandaDto[]> {
    const response = await getAnomaliasByDemanda(demandaId);
    return response;
  }
}