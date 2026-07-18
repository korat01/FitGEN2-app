import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BrowserMultiFormatReader } from '@zxing/browser';
import type { IScannerControls } from '@zxing/browser';
import { Camera } from 'lucide-react';

interface BarcodeScannerModalProps {
  onClose: () => void;
  onDetected: (barcode: string) => void;
}

// Scanner de code-barres via la caméra (ZXing) — vise la caméra arrière sur mobile (facingMode
// 'environment'), s'arrête automatiquement dès qu'un code est détecté. Monté/démonté par le parent
// (pas de prop `open`) : ça permet de lazy-charger ce composant — et la lib ZXing qu'il embarque —
// uniquement quand l'utilisateur ouvre réellement le scanner, au lieu d'alourdir le bundle partagé.
export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({ onClose, onDetected }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    setError(null);
    const reader = new BrowserMultiFormatReader();
    let cancelled = false;

    reader
      .decodeFromConstraints(
        { video: { facingMode: 'environment' } },
        videoRef.current,
        (result, _err, controls) => {
          controlsRef.current = controls;
          if (cancelled || !result) return;
          controls.stop();
          onDetected(result.getText());
        }
      )
      .catch((e: any) => {
        if (!cancelled) {
          setError(e?.name === 'NotAllowedError'
            ? "Accès à la caméra refusé — autorisez-le dans les réglages du navigateur."
            : "Impossible d'accéder à la caméra sur cet appareil.");
        }
      });

    return () => {
      cancelled = true;
      controlsRef.current?.stop();
      controlsRef.current = null;
    };
  }, [onDetected]);

  return (
    <Dialog open onOpenChange={(next) => { if (!next) onClose(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-secondary" />
            Scanner un aliment
          </DialogTitle>
        </DialogHeader>

        {error ? (
          <div className="text-center py-8 space-y-2">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
              <div className="absolute inset-8 border-2 border-secondary/70 rounded-lg pointer-events-none" />
            </div>
            <p className="text-xs text-center text-muted-foreground">
              Visez le code-barres du produit (EAN/UPC)
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BarcodeScannerModal;
