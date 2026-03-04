import type { AddAnomaliaDto } from "@/infra/_services/api/model";
import { addAnomaliaDevolucao, deleteAnomaliaDevolucao } from "@/infra/_services/api/service/devolucao/devolucao";

export class AnomaliaApiRepository {
  
  async addAnomaly(anomaly: AddAnomaliaDto): Promise<void> {
    await addAnomaliaDevolucao(anomaly);
  }

  async deleteAnomaly(anomalyId: string): Promise<void> {
    await deleteAnomaliaDevolucao(anomalyId);
  }
}