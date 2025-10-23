import React, { useState, useEffect } from 'react';
import { UIConfig, defaultUIConfig, saveUIConfig, loadUIConfig, resetUIConfig } from '../config/UIConfig';
import { CustomHomeIcon } from '../components/CustomHomeIcon';

const UICustomizer: React.FC = () => {
  const [config, setConfig] = useState<UIConfig>(defaultUIConfig);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Charger la configuration au montage
  useEffect(() => {
    setConfig(loadUIConfig());
  }, []);

  // Appliquer les modifications
  const applyChanges = () => {
    saveUIConfig(config);
    setIsPreviewMode(false);
    // Forcer le rechargement des composants
    window.dispatchEvent(new CustomEvent('ui-config-updated', { detail: config }));
    
    // Notification de succès
    alert('✅ Modifications appliquées ! La page UI/DA va se mettre à jour automatiquement.');
  };

  // Réinitialiser à la configuration par défaut
  const resetToDefault = () => {
    setConfig(defaultUIConfig);
    resetUIConfig();
    setIsPreviewMode(false);
    window.dispatchEvent(new CustomEvent('ui-config-updated', { detail: defaultUIConfig }));
    
    // Notification de réinitialisation
    alert('🔄 Configuration réinitialisée !');
  };

  // Prévisualiser les changements
  const previewChanges = () => {
    setIsPreviewMode(true);
    // Appliquer temporairement les changements pour la prévisualisation
    window.dispatchEvent(new CustomEvent('ui-config-updated', { detail: config }));
  };

  // Mettre à jour une propriété spécifique
  const updateConfig = (path: string, value: any) => {
    setConfig(prev => {
      const newConfig = { ...prev };
      const keys = path.split('.');
      let current = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      // Mise à jour en temps réel pour la prévisualisation
      if (isPreviewMode) {
        window.dispatchEvent(new CustomEvent('ui-config-updated', { detail: newConfig }));
      }
      
      return newConfig;
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">🎨 Personnalisateur UI/DA</h1>
          <p className="text-gray-400">Modifiez l'apparence de votre application en temps réel</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panneau de contrôle */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Couleurs */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">🎨 Couleurs</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Couleur principale</label>
                  <input
                    type="color"
                    value={config.colors.primary}
                    onChange={(e) => updateConfig('colors.primary', e.target.value)}
                    className="w-full h-10 rounded border border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Couleur secondaire</label>
                  <input
                    type="color"
                    value={config.colors.secondary}
                    onChange={(e) => updateConfig('colors.secondary', e.target.value)}
                    className="w-full h-10 rounded border border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Couleur d'accent</label>
                  <input
                    type="color"
                    value={config.colors.accent}
                    onChange={(e) => updateConfig('colors.accent', e.target.value)}
                    className="w-full h-10 rounded border border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Arrière-plan</label>
                  <input
                    type="color"
                    value={config.colors.background}
                    onChange={(e) => updateConfig('colors.background', e.target.value)}
                    className="w-full h-10 rounded border border-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Typographie */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">📝 Typographie</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Famille de police</label>
                  <select
                    value={config.typography.fontFamily}
                    onChange={(e) => updateConfig('typography.fontFamily', e.target.value)}
                    className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
                  >
                    <option value="Inter, system-ui, sans-serif">Inter</option>
                    <option value="Roboto, sans-serif">Roboto</option>
                    <option value="Poppins, sans-serif">Poppins</option>
                    <option value="Montserrat, sans-serif">Montserrat</option>
                    <option value="Open Sans, sans-serif">Open Sans</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Taille de base</label>
                    <select
                      value={config.typography.fontSize.base}
                      onChange={(e) => updateConfig('typography.fontSize.base', e.target.value)}
                      className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
                    >
                      <option value="0.875rem">Petit (14px)</option>
                      <option value="1rem">Normal (16px)</option>
                      <option value="1.125rem">Grand (18px)</option>
                      <option value="1.25rem">Très grand (20px)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Poids de police</label>
                    <select
                      value={config.typography.fontWeight.normal}
                      onChange={(e) => updateConfig('typography.fontWeight.normal', parseInt(e.target.value))}
                      className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
                    >
                      <option value="300">Léger (300)</option>
                      <option value="400">Normal (400)</option>
                      <option value="500">Medium (500)</option>
                      <option value="600">Semi-bold (600)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Icône Home */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">🏠 Icône Home</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Couleur du haut (gradient)</label>
                  <input
                    type="color"
                    value={config.icons.home.gradientColors.top}
                    onChange={(e) => updateConfig('icons.home.gradientColors.top', e.target.value)}
                    className="w-full h-10 rounded border border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Couleur du bas (gradient)</label>
                  <input
                    type="color"
                    value={config.icons.home.gradientColors.bottom}
                    onChange={(e) => updateConfig('icons.home.gradientColors.bottom', e.target.value)}
                    className="w-full h-10 rounded border border-gray-600"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Couleur de lueur</label>
                    <input
                      type="color"
                      value={config.icons.home.glow.color.replace('rgba(', '').replace(')', '').split(',').slice(0, 3).join(',')}
                      onChange={(e) => {
                        const rgb = e.target.value;
                        updateConfig('icons.home.glow.color', `rgba(${rgb}, 0.6)`);
                      }}
                      className="w-full h-10 rounded border border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Intensité de lueur</label>
                    <input
                      type="range"
                      min="2"
                      max="20"
                      value={parseInt(config.icons.home.glow.blur)}
                      onChange={(e) => updateConfig('icons.home.glow.blur', `${e.target.value}px`)}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-400">{config.icons.home.glow.blur}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Échelle au survol</label>
                  <input
                    type="range"
                    min="1"
                    max="1.5"
                    step="0.1"
                    value={config.icons.home.hover.scale}
                    onChange={(e) => updateConfig('icons.home.hover.scale', parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-400">{config.icons.home.hover.scale}x</span>
                </div>
              </div>
            </div>

            {/* Effets */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">✨ Effets</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rayon de bordure</label>
                  <select
                    value={config.effects.borderRadius.md}
                    onChange={(e) => updateConfig('effects.borderRadius.md', e.target.value)}
                    className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
                  >
                    <option value="0px">Aucun</option>
                    <option value="4px">Petit (4px)</option>
                    <option value="8px">Moyen (8px)</option>
                    <option value="12px">Grand (12px)</option>
                    <option value="16px">Très grand (16px)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Vitesse de transition</label>
                  <select
                    value={config.effects.transition.normal}
                    onChange={(e) => updateConfig('effects.transition.normal', e.target.value)}
                    className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
                  >
                    <option value="all 0.15s ease">Rapide</option>
                    <option value="all 0.3s ease">Normal</option>
                    <option value="all 0.5s ease">Lent</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Personnalisation de la page UI/DA */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">🎨 Page UI/DA</h2>
              
              {/* Arrière-plan */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Arrière-plan</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Couleur principale</label>
                    <input
                      type="color"
                      value={config.uiPage.background.primary}
                      onChange={(e) => updateConfig('uiPage.background.primary', e.target.value)}
                      className="w-full h-10 rounded border border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Couleur secondaire</label>
                    <input
                      type="color"
                      value={config.uiPage.background.secondary}
                      onChange={(e) => updateConfig('uiPage.background.secondary', e.target.value)}
                      className="w-full h-10 rounded border border-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Cartes */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Cartes</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Arrière-plan des cartes</label>
                    <input
                      type="color"
                      value={config.uiPage.cards.background.replace('rgba(', '').replace(')', '').split(',').slice(0, 3).join(',')}
                      onChange={(e) => {
                        const rgb = e.target.value;
                        updateConfig('uiPage.cards.background', `rgba(${rgb}, 0.8)`);
                      }}
                      className="w-full h-10 rounded border border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Rayon de bordure</label>
                    <select
                      value={config.uiPage.cards.borderRadius}
                      onChange={(e) => updateConfig('uiPage.cards.borderRadius', e.target.value)}
                      className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
                    >
                      <option value="8px">Petit (8px)</option>
                      <option value="12px">Moyen (12px)</option>
                      <option value="16px">Grand (16px)</option>
                      <option value="20px">Très grand (20px)</option>
                      <option value="24px">Énorme (24px)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Texte */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Texte</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Texte principal</label>
                    <input
                      type="color"
                      value={config.uiPage.text.primary}
                      onChange={(e) => updateConfig('uiPage.text.primary', e.target.value)}
                      className="w-full h-10 rounded border border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Texte secondaire</label>
                    <input
                      type="color"
                      value={config.uiPage.text.secondary}
                      onChange={(e) => updateConfig('uiPage.text.secondary', e.target.value)}
                      className="w-full h-10 rounded border border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Texte accent</label>
                    <input
                      type="color"
                      value={config.uiPage.text.accent}
                      onChange={(e) => updateConfig('uiPage.text.accent', e.target.value)}
                      className="w-full h-10 rounded border border-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Boutons */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Boutons</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Bouton principal - Arrière-plan</label>
                    <input
                      type="color"
                      value={config.uiPage.buttons.primary.background.replace('linear-gradient(135deg, ', '').replace(' 0%, ', ',').replace(' 100%)', '').split(',')[0]}
                      onChange={(e) => {
                        const color1 = e.target.value;
                        const color2 = config.uiPage.buttons.primary.background.split(',')[1].trim();
                        updateConfig('uiPage.buttons.primary.background', `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`);
                      }}
                      className="w-full h-10 rounded border border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bouton secondaire - Arrière-plan</label>
                    <input
                      type="color"
                      value={config.uiPage.buttons.secondary.background.replace('rgba(', '').replace(')', '').split(',').slice(0, 3).join(',')}
                      onChange={(e) => {
                        const rgb = e.target.value;
                        updateConfig('uiPage.buttons.secondary.background', `rgba(${rgb}, 0.1)`);
                      }}
                      className="w-full h-10 rounded border border-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Layout */}
              <div>
                <h3 className="text-lg font-medium mb-3">Espacement</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Padding</label>
                    <select
                      value={config.uiPage.layout.padding}
                      onChange={(e) => updateConfig('uiPage.layout.padding', e.target.value)}
                      className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
                    >
                      <option value="1rem">Petit (1rem)</option>
                      <option value="1.5rem">Moyen (1.5rem)</option>
                      <option value="2rem">Grand (2rem)</option>
                      <option value="2.5rem">Très grand (2.5rem)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Margin</label>
                    <select
                      value={config.uiPage.layout.margin}
                      onChange={(e) => updateConfig('uiPage.layout.margin', e.target.value)}
                      className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
                    >
                      <option value="0.5rem">Petit (0.5rem)</option>
                      <option value="1rem">Moyen (1rem)</option>
                      <option value="1.5rem">Grand (1.5rem)</option>
                      <option value="2rem">Très grand (2rem)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Gap</label>
                    <select
                      value={config.uiPage.layout.gap}
                      onChange={(e) => updateConfig('uiPage.layout.gap', e.target.value)}
                      className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
                    >
                      <option value="1rem">Petit (1rem)</option>
                      <option value="1.5rem">Moyen (1.5rem)</option>
                      <option value="2rem">Grand (2rem)</option>
                      <option value="2.5rem">Très grand (2.5rem)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">🎯 Actions</h2>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={previewChanges}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  👁️ Prévisualiser
                </button>
                <button
                  onClick={applyChanges}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  ✅ Appliquer les modifications
                </button>
                <button
                  onClick={resetToDefault}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  🔄 Réinitialiser
                </button>
                <button
                  onClick={() => window.open('/ui-test', '_blank')}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  🎨 Voir la page UI/DA
                </button>
              </div>
            </div>
          </div>

          {/* Aperçu */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">👀 Aperçu</h2>
              
              {/* Aperçu de l'icône */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Icône Home</h3>
                <div className="flex justify-center p-4 bg-gray-700 rounded-lg">
                  <CustomHomeIcon size={48} />
                </div>
              </div>

              {/* Aperçu des couleurs */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Palette de couleurs</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded" style={{ backgroundColor: config.colors.primary }}>
                    <span className="text-xs">Principal</span>
                  </div>
                  <div className="p-2 rounded" style={{ backgroundColor: config.colors.secondary }}>
                    <span className="text-xs">Secondaire</span>
                  </div>
                  <div className="p-2 rounded" style={{ backgroundColor: config.colors.accent }}>
                    <span className="text-xs">Accent</span>
                  </div>
                  <div className="p-2 rounded" style={{ backgroundColor: config.colors.background }}>
                    <span className="text-xs">Arrière-plan</span>
                  </div>
                </div>
              </div>

              {/* Aperçu de la typographie */}
              <div>
                <h3 className="text-lg font-medium mb-3">Typographie</h3>
                <div className="space-y-2">
                  <p style={{ 
                    fontFamily: config.typography.fontFamily,
                    fontSize: config.typography.fontSize.base,
                    fontWeight: config.typography.fontWeight.normal,
                    color: config.colors.text
                  }}>
                    Texte normal
                  </p>
                  <p style={{ 
                    fontFamily: config.typography.fontFamily,
                    fontSize: config.typography.fontSize.lg,
                    fontWeight: config.typography.fontWeight.semibold,
                    color: config.colors.text
                  }}>
                    Titre
                  </p>
                </div>
              </div>
            </div>

            {/* Statut */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">📊 Statut</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Mode prévisualisation:</span>
                  <span className={isPreviewMode ? 'text-yellow-400' : 'text-gray-400'}>
                    {isPreviewMode ? 'Actif' : 'Inactif'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Configuration:</span>
                  <span className="text-green-400">Chargée</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UICustomizer;
