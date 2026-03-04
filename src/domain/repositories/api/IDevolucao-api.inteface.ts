import type { AddAnomaliaDto, DemandDto, GetAnomaliasByDemandaDto, GetItensDemandaDto, ProdutoDto } from "@/infra/_services/api/model";

export interface IDevolucaoApiRepository {
  loadDemandList(centerId: string): Promise<DemandDto[]>;
  findConferencesByDemandId(demandId: string): Promise<GetItensDemandaDto[]>;
  findAllProdutos(): Promise<ProdutoDto[]>;

  //Syncs anomalias
  getAnomalyPresignedUrl(anomalyId: string): Promise<string>;
  addAnomaly(anomaly: AddAnomaliaDto): Promise<void>;
  deleteImages(bucketName: string, imagesNames: string[]): Promise<void>;
  getAnomaliasByDemandaId(demandaId: string): Promise<GetAnomaliasByDemandaDto[]>;
}