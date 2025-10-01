import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, Database, Settings, Bug, Terminal, Eye } from 'lucide-react';

export const Developer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'debug' | 'data' | 'settings'>('debug');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 p-8 text-white shadow-2xl mb-8">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
              <Code className="w-10 h-10" />
              Zone Développeur
            </h1>
            <p className="text-blue-100 text-lg">Outils de développement et debug pour FitGEN2</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setActiveTab('debug')}
            variant={activeTab === 'debug' ? 'default' : 'outline'}
            className="flex items-center gap-2"
          >
            <Bug className="w-4 h-4" />
            Debug
          </Button>
          <Button
            onClick={() => setActiveTab('data')}
            variant={activeTab === 'data' ? 'default' : 'outline'}
            className="flex items-center gap-2"
          >
            <Database className="w-4 h-4" />
            Données
          </Button>
          <Button
            onClick={() => setActiveTab('settings')}
            variant={activeTab === 'settings' ? 'default' : 'outline'}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Paramètres
          </Button>
        </div>

        {/* Contenu des tabs */}
        {activeTab === 'debug' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-green-500" />
                  Console Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
                  <div>[INFO] Application démarrée</div>
                  <div>[DEBUG] Chargement du profil utilisateur</div>
                  <div>[INFO] Connexion établie</div>
                  <div>[WARN] Données manquantes dans le profil</div>
                  <div>[ERROR] Erreur de calcul du rang</div>
                  <div>[INFO] Programme généré avec succès</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <Eye className="w-5 h-5 text-blue-500" />
                  État de l'Application
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Utilisateur connecté:</span>
                    <Badge variant="secondary">Oui</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Profil complet:</span>
                    <Badge variant="secondary">Oui</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Performances:</span>
                    <Badge variant="secondary">3</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Programme généré:</span>
                    <Badge variant="secondary">Oui</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'data' && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <Database className="w-5 h-5 text-purple-500" />
                Données LocalStorage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">Profil Utilisateur</h3>
                  <pre className="text-sm text-gray-600 overflow-x-auto">
                    {JSON.stringify({
                      id: "1758590279628",
                      nom: "Alexandre",
                      email: "alexandre@example.com",
                      poids: 126,
                      age: 23,
                      sexe: "male",
                      sportClass: "power"
                    }, null, 2)}
                  </pre>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">Performances</h3>
                  <pre className="text-sm text-gray-600 overflow-x-auto">
                    {JSON.stringify([
                      { discipline: "bench", value: 190 },
                      { discipline: "squat", value: 260 },
                      { discipline: "deadlift", value: 300 }
                    ], null, 2)}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <Settings className="w-5 h-5 text-orange-500" />
                  Paramètres de Debug
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mode Debug:</span>
                    <Badge variant="secondary">Activé</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Logs Console:</span>
                    <Badge variant="secondary">Activé</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Données Mock:</span>
                    <Badge variant="secondary">Activé</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <Code className="w-5 h-5 text-red-500" />
                  Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Effacer localStorage
                  </Button>
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                    Réinitialiser profil
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Exporter données
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
```

## **✅ Résumé des pages créées :**

1. **AlimentDetail.tsx** - Page de détail des aliments avec informations nutritionnelles
2. 