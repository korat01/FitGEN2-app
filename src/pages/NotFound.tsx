import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-card border-primary/20">
        <CardHeader className="text-center">
          <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-foreground">{t('notfound.code')}</CardTitle>
          <p className="text-lg text-muted-foreground mt-2">{t('notfound.title')}</p>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            {t('notfound.message')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('notfound.back')}
            </Button>

            <Button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 gradient-primary hover:opacity-90 text-white"
            >
              <Home className="w-4 h-4" />
              {t('notfound.home')}
            </Button>
      </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;