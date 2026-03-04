import imageCompression from 'browser-image-compression';

export async function convertImageToWebp(file: File, name: string): Promise<File> {
  // 1. Converte Base64 para um objeto File inicial (seu método original ou via fetch)
  const originalFile = new File([file], file.name, { type: file.type });

  // 2. Configurações de compressão
  const options = {
    maxSizeMB: 0.8,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/webp' as string, // Força a saída para WebP
  };

  // 3. Executa a compressão
  const compressedBlob = await imageCompression(originalFile, options);

  return new File([compressedBlob], name, { type: 'image/webp' });
}

