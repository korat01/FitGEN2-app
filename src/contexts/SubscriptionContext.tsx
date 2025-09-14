import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { createClient } from '@supabase/supabase-js';

interface SubscriptionContextType {
  isSubscribed: boolean;
  productId: string | null;
  subscriptionEnd: string | null;
  loading: boolean;
  checkSubscription: () => Promise<void>;
  createCheckoutSession: () => Promise<void>;
  manageSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const checkSubscription = async () => {
    if (!user) {
      setIsSubscribed(false);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL!,
        import.meta.env.VITE_SUPABASE_ANON_KEY!
      );

      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        console.log('No Supabase session found');
        setIsSubscribed(false);
        setProductId(null);
        setSubscriptionEnd(null);
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (error) {
        console.error('Error checking subscription:', error);
        setIsSubscribed(false);
        setProductId(null);
        setSubscriptionEnd(null);
        return;
      }

      setIsSubscribed(data.subscribed || false);
      setProductId(data.product_id || null);
      setSubscriptionEnd(data.subscription_end || null);
      
      console.log('Subscription status:', data);
    } catch (error) {
      console.error('Error checking subscription:', error);
      setIsSubscribed(false);
      setProductId(null);
      setSubscriptionEnd(null);
    } finally {
      setLoading(false);
    }
  };

  const createCheckoutSession = async () => {
    if (!user) return;

    try {
      const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL!,
        import.meta.env.VITE_SUPABASE_ANON_KEY!
      );

      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        alert('Vous devez être connecté pour vous abonner.');
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (error) {
        console.error('Error creating checkout session:', error);
        alert('Erreur lors de la création de la session de paiement.');
        return;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Erreur lors de la création de la session de paiement.');
    }
  };

  const manageSubscription = async () => {
    if (!user) return;

    try {
      const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL!,
        import.meta.env.VITE_SUPABASE_ANON_KEY!
      );

      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        alert('Vous devez être connecté pour gérer votre abonnement.');
        return;
      }

      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (error) {
        console.error('Error opening customer portal:', error);
        alert('Erreur lors de l\'ouverture du portail client.');
        return;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      alert('Erreur lors de l\'ouverture du portail client.');
    }
  };

  useEffect(() => {
    checkSubscription();
  }, [user]);

  return (
    <SubscriptionContext.Provider value={{
      isSubscribed,
      productId,
      subscriptionEnd,
      loading,
      checkSubscription,
      createCheckoutSession,
      manageSubscription,
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};