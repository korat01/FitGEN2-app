import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, QrCode, Search, AlertCircle, CheckCircle } from 'lucide-react';

export const Scan: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  const handleScan = () => {
    setIsScanning(true);
    setScanError(null);
    
    // Simuler un scan
    setTimeout(() => {
      const success = Math.random() > 0.3;
      if (success) {
        setScanResult('Produit scanné avec succès !');
      } else {
        setScanError('Impossible de scanner le produit');
      }
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 p-8 text-white shadow-2xl mb-8">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
              <QrCode className="w-10 h-10" />
              Scanner un Produit
            </h1>
            <p className="text-blue-100 text-lg">Scannez le code-barres d'un produit pour obtenir ses informations nutritionnelles</p>
          </div>
        </div>

        {/* Zone de scan */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Camera className="w-6 h-6 text-blue-500" />
              Scanner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="w-64 h-64 mx-auto bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-6">
                {isScanning ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Scan en cours...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Zone de scan</p>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={handleScan}
                disabled={isScanning}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3"
              >
                <Camera className="w-5 h-5 mr-2" />
                {isScanning ? 'Scan en cours...' : 'Démarrer le scan'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Résultats */}
        {scanResult && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Résultat du scan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-semibold">{scanResult}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {scanError && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-500" />
                Erreur de scan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-semibold">{scanError}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Informations sur le scan */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <Search className="w-6 h-6 text-purple-500" />
              Comment ça marche ?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Camera className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">1. Scanner</h3>
                <p className="text-gray-600 text-sm">Pointez votre caméra vers le code-barres du produit</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">2. Analyser</h3>
                <p className="text-gray-600 text-sm">L'application identifie le produit et récupère ses données</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">3. Résultat</h3>
                <p className="text-gray-600 text-sm">Obtenez les informations nutritionnelles complètes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 