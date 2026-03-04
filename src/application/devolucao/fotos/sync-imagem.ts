import { convertImageToWebp } from "@/_shared/lib/convertImageToWebp";
import type { IFotosDevolucaoCacheRepository } from "@/domain/repositories/cache/fotos-cache.interface";
import { addImagemAnomalia, addImangesCheckList, getPresignedUrlAnomaliaDevolucao, getPresignedUrlCheckListDevolucao } from "@/infra/_services/api/service/devolucao/devolucao";
import { uploadImageMinio } from "@/infra/_services/http/minio.http";

export class SyncImagemUseCase {
  constructor(
    private readonly fotosDevolucaoCacheRepository: IFotosDevolucaoCacheRepository,
  ) { }
  async execute(): Promise<void> {
    const fotos = (await this.fotosDevolucaoCacheRepository.getFotos()).filter(foto => foto.status !== 'synced');
    for (const foto of fotos) {
      if (foto.processo === 'devolucao-check-list') {
        const urlCaminhaoAberto = await getPresignedUrlCheckListDevolucao(foto.name);
        const urlCaminhaoFechado = await getPresignedUrlCheckListDevolucao(foto.name);

        if (urlCaminhaoAberto) {
          await uploadImageMinio(urlCaminhaoAberto, new File([foto.localBlob!], foto.name));
          foto.remoteKey = urlCaminhaoAberto;
          await addImangesCheckList(foto.demandId, foto.processo, {image: foto.name}).then(async () => {
            await this.fotosDevolucaoCacheRepository.markFotoAsSynced(foto.id!);
          }).catch(async () => {
            await this.fotosDevolucaoCacheRepository.markFotoAsError(foto.id!);
          });
        }
        if (urlCaminhaoFechado) {
          await uploadImageMinio(urlCaminhaoFechado, new File([foto.localBlob!], foto.name));
          foto.remoteKey = urlCaminhaoFechado;
          await addImangesCheckList(foto.demandId, foto.processo, {image: foto.name}).then(async () => {
            await this.fotosDevolucaoCacheRepository.markFotoAsSynced(foto.id!);
          }).catch(async () => {
            await this.fotosDevolucaoCacheRepository.markFotoAsError(foto.id!);
          });
        }
      }
      if(foto.processo === 'devolucao-anomalias') {
        const fileToWebp = await convertImageToWebp(foto.localBlob!, `anomalia-${foto.demandId}-${foto.sku}-${foto.id}.webp`);
        const urlAnomalia = await getPresignedUrlAnomaliaDevolucao(fileToWebp.name);
        if (urlAnomalia) {
          await uploadImageMinio(urlAnomalia, fileToWebp);
          foto.remoteKey = urlAnomalia;
          await addImagemAnomalia(foto.demandId, {image: fileToWebp.name}).then(async () => {
            await this.fotosDevolucaoCacheRepository.markFotoAsSynced(foto.id!);
          }).catch(async (error) => {
            console.log('error adding imagem anomalia', error);
            await this.fotosDevolucaoCacheRepository.markFotoAsError(foto.id!);
          });
        } else {
          console.log('urlAnomalia not found');
        }
      } else {
        console.log('foto not found');
      }
    }
  }
}
