import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback>
                <User className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Âge</p>
              <p className="text-lg font-semibold">{user.age} ans</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Poids</p>
              <p className="text-lg font-semibold">{user.weight} kg</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sexe</p>
              <p className="text-lg font-semibold">{user.sex === 'male' ? 'Homme' : 'Femme'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Classe</p>
              <p className="text-lg font-semibold">{user.sportClass}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
