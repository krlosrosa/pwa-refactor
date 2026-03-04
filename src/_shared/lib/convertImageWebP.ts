import imageCompression from 'browser-image-compression';

export async function compressAndConvertToWebP(base64: string, filename: string): Promise<File> {
  // 1. Converte Base64 para um objeto File inicial (seu método original ou via fetch)
  const response = await fetch(base64);
  const blob = await response.blob();
  const originalFile = new File([blob], filename, { type: blob.type });

  // 2. Configurações de compressão
  const options = {
    maxSizeMB: 0.8,           // Alvo de 800KB (ajuste conforme necessário)
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/webp' as string, // Força a saída para WebP
  };

  // 3. Executa a compressão
  const compressedBlob = await imageCompression(originalFile, options);
  
  // 4. Retorna como um File com a extensão correta
  const newFilename = filename.replace(/\.[^/.]+$/, "") + ".webp";
  return new File([compressedBlob], newFilename, { type: 'image/webp' });
}

