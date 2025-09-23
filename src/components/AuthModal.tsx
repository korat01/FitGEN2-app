import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dumbbell, UserPlus, LogIn, X } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSuccess = () => {
    console.log('AuthModal: handleSuccess appelé');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {isLogin ? 'Connexion' : 'Inscription'}
              </h2>
            </div>
            <Button
              onClick={onClose}
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Boutons de basculement */}
          <div className="flex gap-2 mb-6">
            <Button
              onClick={() => setIsLogin(true)}
              variant={isLogin ? 'default' : 'outline'}
              className="flex-1 h-12"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Connexion
            </Button>
            <Button
              onClick={() => setIsLogin(false)}
              variant={!isLogin ? 'default' : 'outline'}
              className="flex-1 h-12"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Inscription
            </Button>
          </div>

          {/* Formulaire */}
          {isLogin ? (
            <LoginForm onSuccess={handleSuccess} onCancel={onClose} />
          ) : (
            <RegisterForm onSuccess={handleSuccess} onCancel={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}; 