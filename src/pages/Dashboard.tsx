import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [clientName, setClientName] = useState('');
  const [programme, setProgramme] = useState('');

  const generateProgramme = () => {
    if (!clientName.trim()) return;
    
    const programmes = [
      `Programme pour ${clientName}:\n• Échauffement: 10 min\n• Squat: 3x10\n• Pompes: 3x8\n• Planche: 3x30s\n• Étirements: 10 min`,
      `Programme pour ${clientName}:\n• Course: 15 min\n• Burpees: 3x5\n• Mountain climbers: 3x20\n• Jumping jacks: 3x30\n• Récupération: 5 min`,
      `Programme pour ${clientName}:\n• Vélo: 20 min\n• Développé couché: 3x8\n• Rowing: 3x10\n• Abdos: 3x15\n• Stretching: 10 min`
    ];
    
    const randomProgramme = programmes[Math.floor(Math.random() * programmes.length)];
    setProgramme(randomProgramme);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <Link to="/" className="text-2xl font-bold text-primary hover:underline">
            ← FITGEN
          </Link>
          <h1 className="text-3xl font-bold mt-4">Générateur de Programme</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Nouveau Client</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Nom du client
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
                placeholder="Entrez le nom du client"
              />
            </div>
            <Button onClick={generateProgramme} disabled={!clientName.trim()}>
              Générer Programme
            </Button>
          </CardContent>
        </Card>

        {programme && (
          <Card>
            <CardHeader>
              <CardTitle>Programme Généré</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-sm">{programme}</pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;