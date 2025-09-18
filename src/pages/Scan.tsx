import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scan, Camera, Search, Zap, Target, Activity, Heart, Clock, Flame, Star, Dumbbell, CheckCircle } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const Scan: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItem, setScannedItem] = useState<any>(null);

  const recentScans = [
    { nom: 'Pomme', calories: 52, date: 'Il y a 2h', type: 'Fruit' },
    { nom: 'Banane', calories: 89, date: 'Il y a 3h', type: 'Fruit' },
    { nom: 'Yaourt grec', calories: 120, date: 'Hier', type: 'Produit laitier' },
    { nom: 'Poulet grillé', calories: 165, date: 'Hier', type: 'Viande' }
  ];

  const scanHistory = [
    { nom: 'Squats', series: '4x8', poids: '80kg', date: 'Aujourd\'hui', type: 'Exercice' },
    { nom: 'Développé couché', series: '3x6', poids: '70kg', date: 'Aujourd\'hui', type: 'Exercice' },
    { nom: 'Pomme', calories: 52, date: 'Aujourd\'hui', type: 'Aliment' },
    { nom: 'Banane', calories: 89, date: 'Aujourd\'hui', type: 'Aliment' }
  ];

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScannedItem({
        nom: 'Pomme',
        calories: 52,
        type: 'Fruit',
        description: 'Fruit riche en fibres et vitamines'
      });
    }, 2000);
  };

  const getDifficulteColor = (difficulte: string) => {
    switch (difficulte) {
      case 'Débutant':
        return 'bg-blue-200 text-blue-800 border-blue-300';
      case 'Intermédiaire':
        return 'bg-purple-200 text-purple-800 border-purple-300';
      case 'Avancé':
        return 'bg-red-200 text-red-800 border-red-300';
      default:
        return 'bg-gray-200 text-gray-800 border-gray-300';
    }
  };

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Header avec animation */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
            <div className="absolute top-8 right-8 w-1 h-1 bg-blue-400/50 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-1/4 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-bounce"></div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                    <Scan className="w-8 h-8 group-hover:animate-pulse" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight text-white group-hover:scale-105 transition-transform duration-300">
                      Scanner
                    </h1>
                    <p className="text-white/90 text-lg font-medium">Scannez vos aliments et exercices</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                  <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300">
                    <Star className="w-4 h-4 mr-2" />
                    Rang B
                  </Badge>
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group">
                    <Zap className="w-5 h-5 group-hover:animate-pulse" />
                    <span className="text-white font-medium">×1.25 assiduité</span>
                  </div>
                </div>
              </div>

              <div className="lg:text-right space-y-3">
                <div className="text-white/90 font-medium">Scans aujourd'hui</div>
                <div className="text-4xl font-bold text-white">12</div>
                <div className="text-sm text-white/80">+3 depuis hier</div>
              </div>
            </div>
          </div>
        </div>

        {/* Zone de scan */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 shadow-2xl hover:shadow-3xl transition-all duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-black text-2xl">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Camera className="w-6 h-6 text-white" />
              </div>
              Scanner un élément
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`w-64 h-64 mx-auto rounded-2xl border-4 border-dashed flex items-center justify-center transition-all duration-500 ${
                isScanning 
                  ? 'border-blue-500 bg-blue-100 animate-pulse' 
                  : 'border-slate-300 bg-slate-100 hover:border-blue-400 hover:bg-blue-50'
              }`}>
                {isScanning ? (
                  <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
                    <p className="text-black font-medium">Scan en cours...</p>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <Scan className="w-16 h-16 text-slate-400 mx-auto" />
                    <p className="text-black font-medium">Placez l'élément dans le cadre</p>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              <Button 
                onClick={handleScan}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold px-8 py-4"
                disabled={isScanning}
              >
                <Camera className="w-5 h-5 mr-2" />
                {isScanning ? 'Scan en cours...' : 'Commencer le scan'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Résultat du scan */}
        {scannedItem && (
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-300 shadow-2xl hover:shadow-3xl transition-all duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-black text-2xl">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Search className="w-6 h-6 text-white" />
                </div>
                Résultat du scan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                <div className="text-6xl animate-bounce">🍎</div>
                <h3 className="text-3xl font-bold text-black">{scannedItem.nom}</h3>
                <p className="text-lg text-black font-medium">{scannedItem.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-xl border-2 border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                    <div className="text-2xl font-bold text-black group-hover:scale-110 transition-transform duration-300">{scannedItem.calories}</div>
                    <div className="text-sm text-black font-medium">Calories</div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border-2 border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                    <div className="text-2xl font-bold text-black group-hover:scale-110 transition-transform duration-300">{scannedItem.type}</div>
                    <div className="text-sm text-black font-medium">Type</div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border-2 border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                    <div className="text-2xl font-bold text-black group-hover:scale-110 transition-transform duration-300">✓</div>
                    <div className="text-sm text-black font-medium">Ajouté</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Scans récents */}
        <Card className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-300 shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-black text-2xl">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              Scans récents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentScans.map((scan, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Search className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-black group-hover:scale-105 transition-transform duration-300">{scan.nom}</div>
                      <div className="text-sm text-black">{scan.type} • {scan.calories} cal</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-black font-medium">{scan.date}</div>
                    <Badge className="bg-green-200 text-green-800 border-green-300 text-xs">
                      Scanné
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Historique des scans */}
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300 shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-black text-2xl">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              Historique des scans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scanHistory.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-orange-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                      item.type === 'Exercice' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                      {item.type === 'Exercice' ? (
                        <Dumbbell className="w-5 h-5 text-white" />
                      ) : (
                        <Search className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-lg text-black group-hover:scale-105 transition-transform duration-300">{item.nom}</div>
                      <div className="text-sm text-black">
                        {item.type === 'Exercice' ? `${item.series} • ${item.poids}` : `${item.calories} cal`}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-black font-medium">{item.date}</div>
                    <Badge className={`text-xs ${
                      item.type === 'Exercice' 
                        ? 'bg-blue-200 text-blue-800 border-blue-300' 
                        : 'bg-green-200 text-green-800 border-green-300'
                    }`}>
                      {item.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Scan;