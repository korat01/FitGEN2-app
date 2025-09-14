import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

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
      // Mock implementation - Supabase needs to be connected first
      console.log('Subscription check - Supabase not connected yet');
      setIsSubscribed(false);
      setProductId(null);
      setSubscriptionEnd(null);
    } catch (error) {
      console.error('Error checking subscription:', error);
      setIsSubscribed(false);
    } finally {
      setLoading(false);
    }
  };

  const createCheckoutSession = async () => {
    if (!user) return;

    try {
      // Mock implementation - Supabase needs to be connected first
      console.log('Creating checkout session...');
      alert('Fonctionnalité de paiement en développement. Veuillez connecter Supabase d\'abord.');
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  const manageSubscription = async () => {
    if (!user) return;

    try {
      // Mock implementation - Supabase needs to be connected first
      console.log('Opening customer portal...');
      alert('Fonctionnalité de gestion d\'abonnement en développement.');
    } catch (error) {
      console.error('Error opening customer portal:', error);
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