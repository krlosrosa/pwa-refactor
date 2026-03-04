export interface IMinioRepository {
  uploadImageMinio(presignedUrl: string, file: File): Promise<boolean>;
}