import axios from 'axios';
import type { IMinioRepository } from "./IMinio.repoistory";

export class MinioRepository implements IMinioRepository {
  async uploadImageMinio(presignedUrl: string, file: File): Promise<boolean> {
    try {
      const response = await axios.put(presignedUrl, file, {
        headers: {
          // O Content-Type deve ser o mesmo usado ao gerar a URL no backend
          'Content-Type': 'image/jpeg',
        },
        // Útil para mostrar progresso no seu app offline-first
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          console.log(`Progresso: ${percentCompleted}%`);
        }
      });

      return response.status === 200;
    } catch (error) {
      console.error("Erro ao subir para o MinIO:", error);
      throw error;
    }
  }
}