import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation de connexion
    const userData = {
      id: '1',
      nom: 'Alexandre Martin',
      email: email,
      isAuthenticated: true
    };
    login(userData.email, 'password'); // Mock password
    // Rediriger vers la page d'accueil après connexion
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      {/* Éléments décoratifs d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <Card className="w-full max-w-md shadow-float border-0 bg-card/95 backdrop-blur-xl animate-bounce-in relative z-10">
        <CardHeader className="text-center gradient-mobile text-white rounded-t-lg p-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-3 bg-white/20 rounded-full">
              <User className="w-8 h-8" />
            </div>
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <CardTitle className="text-3xl font-bold">
            Connexion FitGEN22
          </CardTitle>
          <p className="text-white/90 text-lg">Connectez-vous à votre compte</p>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="pl-11 h-12 text-base bg-muted/30 border-2 focus:border-primary/50 rounded-lg"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-foreground">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  className="pl-11 pr-11 h-12 text-base bg-muted/30 border-2 focus:border-primary/50 rounded-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 gradient-primary text-white hover:shadow-glow text-base font-semibold rounded-lg hover-scale"
            >
              Se connecter
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Pas encore de compte ? 
                <button className="text-primary hover:text-primary/80 font-semibold ml-1 hover:underline">
                  S'inscrire
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;