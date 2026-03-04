import { Camera, X } from 'lucide-react';
import { Card, CardContent } from '@/_shared/components/ui/card';
import { Label } from '@/_shared/components/ui/label';
import { Button } from '@/_shared/components/ui/button';

/**
 * Step component for adding photos to anomaly
 */
export function AnomaliaPhotosStep({
  handleAddPhoto,
  handleRemovePhoto,
  photos,
}: {
  handleAddPhoto: (file: File) => void;
  handleRemovePhoto: (index: number) => void;
  photos: File[];
}) {
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione uma imagem válida');
      return;
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB');
      return;
    }

    try {
      handleAddPhoto(file);
    } catch (error) {
      console.error('Erro ao converter arquivo:', error);
      alert('Erro ao processar a imagem. Tente novamente.');
    }
  };

  const photosList = [...photos.map((photo) => ({
    id: crypto.randomUUID(),
    url: URL.createObjectURL(photo),
  }))];

  return (
    <Card className="p-0">
      <CardContent className="p-4 space-y-4">
        <div>
          <Label>Fotos da Anomalia (opcional)</Label>
          <p className="text-sm text-muted-foreground mt-1">
            Adicione fotos para documentar a anomalia
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {photosList.map((photo, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={photo.url}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full shadow-md"
                  onClick={() => handleRemovePhoto(index)}
                  aria-label="Remover foto"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <label className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="sr-only"
                onChange={handleFileSelect}
              />
              <Camera className="h-8 w-8 text-muted-foreground" />
              <span className="text-xs text-muted-foreground mt-1">Adicionar</span>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
