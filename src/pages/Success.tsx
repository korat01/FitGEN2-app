import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Crown, ArrowRight } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import PageLayout from '@/components/PageLayout';

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { checkSubscription } = useSubscription();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Vérifier le statut d'abonnement après le succès du paiement
    checkSubscription();
  }, [checkSubscription]);

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto py-8">
        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800">
              Bienvenue dans FitGEN22 Pro !
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="bg-white rounded-lg p-6 border border-green-200">
              <div className="flex items-center justify-center mb-4">
                <Crown className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Votre abonnement est maintenant actif !
              </h3>
              <p className="text-gray-600 mb-4">
                Vous avez maintenant accès à toutes les fonctionnalités premium de FitGEN22.
              </p>
              {sessionId && (
                <p className="text-sm text-gray-500">
                  ID de session : {sessionId}
                </p>
              )}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-3">
                Que pouvez-vous faire maintenant ?
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 text-left">
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-blue-500" />
                  Créer des programmes d'entraînement personnalisés
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-blue-500" />
                  Accéder à la base de données nutritionnelle complète
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-blue-500" />
                  Consulter vos statistiques avancées
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-blue-500" />
                  Planifier vos repas intelligemment
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/stats')}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3"
              >
                Commencer votre parcours Pro
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/programme')}
                className="w-full"
              >
                Créer votre premier programme
              </Button>
            </div>

            <p className="text-xs text-gray-500">
              Un email de confirmation a été envoyé à votre adresse.
              <br />
              Vous pouvez gérer votre abonnement depuis votre profil.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Success;