import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Star, Zap, TrendingUp, Lock } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';

interface PremiumGateProps {
  feature: string;
  description?: string;
  children?: React.ReactNode;
}

const PremiumGate: React.FC<PremiumGateProps> = ({ feature, description, children }) => {
  const { isSubscribed, createCheckoutSession } = useSubscription();

  if (isSubscribed) {
    return <>{children}</>;
  }

  return (
    <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Crown className="w-12 h-12 text-yellow-500" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Fonctionnalité Premium
        </CardTitle>
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 font-semibold">
          <Star className="w-4 h-4 mr-1" />
          FitGEN22 Pro
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {feature}
          </h3>
          {description && (
            <p className="text-gray-600 mb-4">
              {description}
            </p>
          )}
        </div>

        <div className="bg-white rounded-lg p-4 border border-yellow-200">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-500" />
            Avec FitGEN22 Pro, débloquez :
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
              Programmes d'entraînement personnalisés illimités
            </li>
            <li className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
              Base de données nutritionnelle complète
            </li>
            <li className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
              Statistiques avancées et analytics
            </li>
            <li className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
              Planification de repas intelligente
            </li>
            <li className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
              Support prioritaire
            </li>
          </ul>
        </div>

        <div className="text-center">
          <div className="mb-4">
            <span className="text-3xl font-bold text-gray-800">29,99€</span>
            <span className="text-gray-600">/mois</span>
          </div>
          <Button 
            onClick={createCheckoutSession}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 text-lg"
          >
            <Crown className="w-5 h-5 mr-2" />
            Devenir Pro Maintenant
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Annulable à tout moment • Facturation sécurisée via Stripe
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumGate;