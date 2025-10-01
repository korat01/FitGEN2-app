import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User as UserIcon, Mail, Weight, Calendar, Trophy } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <Card className="bg-card shadow-card">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Aucun utilisateur connecté</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <Card className="bg-card shadow-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">{user.name}</CardTitle>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
            {user.rank && (
              <Badge variant="secondary" className="text-lg px-4 py-2 w-fit">
                <Trophy className="w-4 h-4 mr-2" />
                Rang {user.rank}
              </Badge>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Informations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card className="bg-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Weight className="w-5 h-5 text-primary" />
              Poids
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl md:text-3xl font-bold text-foreground">{user.weight} kg</p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Calendar className="w-5 h-5 text-primary" />
              Âge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl md:text-3xl font-bold text-foreground">{user.age} ans</p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <UserIcon className="w-5 h-5 text-primary" />
              Sexe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg md:text-xl text-foreground capitalize">{user.sex === 'male' ? 'Homme' : 'Femme'}</p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Trophy className="w-5 h-5 text-primary" />
              Sport
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg md:text-xl text-foreground capitalize">{user.sportClass}</p>
          </CardContent>
        </Card>
      </div>

      {user.globalScore !== undefined && (
        <Card className="bg-card shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Score Global</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-3xl md:text-4xl font-bold text-primary">{user.globalScore.toFixed(0)} points</p>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="gradient-primary h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((user.globalScore / 1000) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Profile;
