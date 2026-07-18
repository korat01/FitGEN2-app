import React, { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, ImagePlus } from 'lucide-react';

interface MealPhotoModalProps {
  onClose: () => void;
  onSave: (entry: { imageDataUrl: string; nom: string; calories?: number; proteines?: number; glucides?: number; lipides?: number }) => void;
}

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

// Journal photo d'un repas — PAS d'estimation automatique par IA (voir useMealPhotoLog). Juste une
// photo + des valeurs saisies à la main si l'utilisateur veut les noter, en aide-mémoire visuel.
export const MealPhotoModal: React.FC<MealPhotoModalProps> = ({ onClose, onSave }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [nom, setNom] = useState('');
  const [calories, setCalories] = useState<number | ''>('');
  const [proteines, setProteines] = useState<number | ''>('');
  const [glucides, setGlucides] = useState<number | ''>('');
  const [lipides, setLipides] = useState<number | ''>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await readFileAsDataUrl(file);
    setImageDataUrl(dataUrl);
  };

  const handleSave = () => {
    if (!imageDataUrl) return;
    onSave({
      imageDataUrl,
      nom: nom.trim() || 'Repas',
      calories: calories === '' ? undefined : calories,
      proteines: proteines === '' ? undefined : proteines,
      glucides: glucides === '' ? undefined : glucides,
      lipides: lipides === '' ? undefined : lipides,
    });
    onClose();
  };

  return (
    <Dialog open onOpenChange={(next) => { if (!next) onClose(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-secondary" />
            Photo d'un repas
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-xs text-muted-foreground">
            Simple aide-mémoire visuel — aucune estimation automatique des calories n'est faite (pas d'IA de vision branchée). Notez vos valeurs si vous les connaissez.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />

          {imageDataUrl ? (
            <div className="relative rounded-xl overflow-hidden">
              <img src={imageDataUrl} alt="Repas" className="w-full max-h-56 object-cover" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2 right-2 bg-black/50 border-white/20 text-white hover:bg-black/70"
              >
                Changer
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-video rounded-xl border-2 border-dashed border-white/15 hover:border-primary/40 flex flex-col items-center justify-center gap-2 text-muted-foreground transition-colors"
            >
              <ImagePlus className="w-8 h-8" />
              <span className="text-sm">Prendre ou choisir une photo</span>
            </button>
          )}

          <Input
            placeholder="Nom du repas (optionnel)"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="glass-card border-2 border-white/15 rounded-xl"
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value === '' ? '' : Number(e.target.value))}
              className="glass-card border-2 border-white/15 rounded-xl"
            />
            <Input
              type="number"
              placeholder="Protéines (g)"
              value={proteines}
              onChange={(e) => setProteines(e.target.value === '' ? '' : Number(e.target.value))}
              className="glass-card border-2 border-white/15 rounded-xl"
            />
            <Input
              type="number"
              placeholder="Glucides (g)"
              value={glucides}
              onChange={(e) => setGlucides(e.target.value === '' ? '' : Number(e.target.value))}
              className="glass-card border-2 border-white/15 rounded-xl"
            />
            <Input
              type="number"
              placeholder="Lipides (g)"
              value={lipides}
              onChange={(e) => setLipides(e.target.value === '' ? '' : Number(e.target.value))}
              className="glass-card border-2 border-white/15 rounded-xl"
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={!imageDataUrl}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white"
          >
            Enregistrer dans le journal photo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MealPhotoModal;
