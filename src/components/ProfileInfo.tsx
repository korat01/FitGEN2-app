import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ProfileInfoProps {
  user: any;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations de profil</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Poids:</span> {user.weight || 'Non défini'} kg
          </div>
          <div>
            <span className="font-medium">Âge:</span> {user.age || 'Non défini'} ans
          </div>
          <div>
            <span className="font-medium">Sexe:</span> {user.sex === 'male' ? 'Homme' : user.sex === 'female' ? 'Femme' : 'Non défini'}
          </div>
          <div>
            <span className="font-medium">Profil:</span> {user.profileType || 'Non défini'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
