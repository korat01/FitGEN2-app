import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Palette, RefreshCw } from 'lucide-react';

// Import du système de design centralisé
import { useTheme } from '../hooks/useTheme';

const ThemeDemo: React.FC = () => {
  const { colors, getGradient, config, setVariant } = useTheme();
  const [currentTheme, setCurrentTheme] = useState('futuristic');

  const themes = [
    { id: 'futuristic', name: 'Futuriste', colors: ['#00C2FF', '#6B2AFF', '#FF7D3B'] },
    { id: 'neon', name: 'Néon', colors: ['#6B2AFF', '#00C2FF', '#FF7D3B'] },
    { id: 'circuit', name: 'Circuit', colors: ['#00C2FF', '#1E2335', '#FF7D3B'] },
    { id: 'dark', name: 'Sombre', colors: ['#3498DB', '#2ECC71', '#F39C12'] },
  ];

  const changeTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    setVariant(themeId);
  };

  return (
    <Card 
      className="backdrop-blur-sm border-0 shadow-xl"
      style={{
        backgroundColor: colors.background + 'E6',
        borderRadius: config.dimensions.card.borderRadius,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      <CardHeader>
        <CardTitle 
          className="flex items-center gap-3 text-2xl"
          style={{
            color: colors.text.primary,
            fontSize: config.typography.styles.h2.fontSize,
            fontWeight: config.typography.styles.h2.fontWeight
          }}
        >
          <div 
            className="rounded-full p-2"
            style={{
              backgroundColor: colors.accent + '20',
              borderRadius: config.dimensions.border.radius.full
            }}
          >
            <Palette 
              className="h-6 w-6" 
              style={{ color: colors.accent }}
            />
          </div>
          Démonstration du système de design
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Sélecteur de thème */}
          <div>
            <h3 
              className="text-lg font-semibold mb-4"
              style={{
                color: colors.text.primary,
                fontSize: config.typography.styles.h4.fontSize,
                fontWeight: config.typography.styles.h4.fontWeight
              }}
            >
              Changer le thème :
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {themes.map((theme) => (
                <Button
                  key={theme.id}
                  onClick={() => changeTheme(theme.id)}
                  className="p-4 h-auto flex flex-col items-center gap-2"
                  style={{
                    backgroundColor: currentTheme === theme.id ? colors.primary : colors.surface,
                    color: currentTheme === theme.id ? colors.text.inverse : colors.text.primary,
                    borderRadius: config.dimensions.card.borderRadius,
                    border: currentTheme === theme.id ? `2px solid ${colors.accent}` : `1px solid ${colors.border}`
                  }}
                >
                  <div className="flex gap-1">
                    {theme.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span 
                    className="text-sm font-medium"
                    style={{
                      fontSize: config.typography.styles.bodySmall.fontSize,
                      fontWeight: config.typography.styles.bodySmall.fontWeight
                    }}
                  >
                    {theme.name}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Démonstration des couleurs */}
          <div>
            <h3 
              className="text-lg font-semibold mb-4"
              style={{
                color: colors.text.primary,
                fontSize: config.typography.styles.h4.fontSize,
                fontWeight: config.typography.styles.h4.fontWeight
              }}
            >
              Couleurs du thème actuel :
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div 
                className="p-4 rounded-xl"
                style={{
                  backgroundColor: colors.primary + '20',
                  border: `1px solid ${colors.primary}`,
                  borderRadius: config.dimensions.card.borderRadius
                }}
              >
                <div 
                  className="w-full h-8 rounded mb-2"
                  style={{ backgroundColor: colors.primary }}
                />
                <span 
                  className="text-sm font-medium"
                  style={{
                    color: colors.text.primary,
                    fontSize: config.typography.styles.bodySmall.fontSize
                  }}
                >
                  Primary
                </span>
              </div>
              
              <div 
                className="p-4 rounded-xl"
                style={{
                  backgroundColor: colors.secondary + '20',
                  border: `1px solid ${colors.secondary}`,
                  borderRadius: config.dimensions.card.borderRadius
                }}
              >
                <div 
                  className="w-full h-8 rounded mb-2"
                  style={{ backgroundColor: colors.secondary }}
                />
                <span 
                  className="text-sm font-medium"
                  style={{
                    color: colors.text.primary,
                    fontSize: config.typography.styles.bodySmall.fontSize
                  }}
                >
                  Secondary
                </span>
              </div>
              
              <div 
                className="p-4 rounded-xl"
                style={{
                  backgroundColor: colors.accent + '20',
                  border: `1px solid ${colors.accent}`,
                  borderRadius: config.dimensions.card.borderRadius
                }}
              >
                <div 
                  className="w-full h-8 rounded mb-2"
                  style={{ backgroundColor: colors.accent }}
                />
                <span 
                  className="text-sm font-medium"
                  style={{
                    color: colors.text.primary,
                    fontSize: config.typography.styles.bodySmall.fontSize
                  }}
                >
                  Accent
                </span>
              </div>
              
              <div 
                className="p-4 rounded-xl"
                style={{
                  backgroundColor: colors.success + '20',
                  border: `1px solid ${colors.success}`,
                  borderRadius: config.dimensions.card.borderRadius
                }}
              >
                <div 
                  className="w-full h-8 rounded mb-2"
                  style={{ backgroundColor: colors.success }}
                />
                <span 
                  className="text-sm font-medium"
                  style={{
                    color: colors.text.primary,
                    fontSize: config.typography.styles.bodySmall.fontSize
                  }}
                >
                  Success
                </span>
              </div>
            </div>
          </div>

          {/* Démonstration des composants */}
          <div>
            <h3 
              className="text-lg font-semibold mb-4"
              style={{
                color: colors.text.primary,
                fontSize: config.typography.styles.h4.fontSize,
                fontWeight: config.typography.styles.h4.fontWeight
              }}
            >
              Composants avec le thème actuel :
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4 flex-wrap">
                <Button 
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    color: colors.text.inverse,
                    borderRadius: config.dimensions.button.borderRadius.large,
                    padding: `${config.spacing.md}px ${config.spacing.lg}px`
                  }}
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Bouton Principal
                </Button>
                
                <Button 
                  variant="outline"
                  style={{
                    borderColor: colors.border,
                    color: colors.text.primary,
                    borderRadius: config.dimensions.button.borderRadius.medium
                  }}
                >
                  Bouton Secondaire
                </Button>
              </div>
              
              <div className="flex gap-4 flex-wrap">
                <Badge 
                  style={{
                    backgroundColor: colors.success,
                    color: colors.text.inverse,
                    borderRadius: config.dimensions.border.radius.full,
                    padding: `${config.spacing.xs}px ${config.spacing.sm}px`
                  }}
                >
                  Succès
                </Badge>
                
                <Badge 
                  style={{
                    backgroundColor: colors.warning,
                    color: colors.text.inverse,
                    borderRadius: config.dimensions.border.radius.full,
                    padding: `${config.spacing.xs}px ${config.spacing.sm}px`
                  }}
                >
                  Avertissement
                </Badge>
                
                <Badge 
                  style={{
                    backgroundColor: colors.error,
                    color: colors.text.inverse,
                    borderRadius: config.dimensions.border.radius.full,
                    padding: `${config.spacing.xs}px ${config.spacing.sm}px`
                  }}
                >
                  Erreur
                </Badge>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div 
            className="p-4 rounded-xl"
            style={{
              backgroundColor: colors.info + '10',
              border: `1px solid ${colors.info}`,
              borderRadius: config.dimensions.card.borderRadius
            }}
          >
            <h4 
              className="font-semibold mb-2"
              style={{
                color: colors.info,
                fontSize: config.typography.styles.h5.fontSize,
                fontWeight: config.typography.styles.h5.fontWeight
              }}
            >
              💡 Comment changer les couleurs :
            </h4>
            <p 
              className="text-sm"
              style={{
                color: colors.text.secondary,
                fontSize: config.typography.styles.bodySmall.fontSize,
                lineHeight: config.typography.lineHeight
              }}
            >
              1. Ouvrez le fichier <code className="bg-gray-100 px-1 rounded">monApp/src/config/QuickConfig.ts</code><br/>
              2. Modifiez les valeurs dans la section <code className="bg-gray-100 px-1 rounded">colors</code><br/>
              3. Redémarrez l'application pour voir les changements<br/>
              4. Ou utilisez les boutons ci-dessus pour changer de thème instantanément !
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeDemo;
