// Démonstration du système de design centralisé FitGEN
// Ce fichier montre comment modifier l'UI/UX sans toucher au code des composants

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

// Import du système de design centralisé
import { useTheme, useColors, useGradients } from '../src/hooks/useTheme';
import { Button, Card, Input, Badge, Icon, Text, Separator } from '../src/components/UIComponents';

export default function DesignSystemDemo() {
  const { colors, getGradient, getColor, setMode, setVariant, mode, variant } = useTheme();
  const gradients = useGradients();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleThemeChange = (newVariant: string) => {
    setVariant(newVariant as any);
    Alert.alert('Thème changé', `Thème ${newVariant} appliqué !`);
  };

  const handleModeToggle = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
    Alert.alert('Mode changé', `Mode ${mode === 'light' ? 'sombre' : 'clair'} activé !`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      <LinearGradient
        colors={gradients.primary}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text variant="h2" color="white" align="center">
              🎨 Système de Design
            </Text>
            <Text variant="body" color="rgba(255,255,255,0.8)" align="center">
              Modifiez l'UI/UX sans toucher au code !
            </Text>
          </View>

          {/* Contrôles de thème */}
          <Card variant="base" style={styles.section}>
            <Text variant="h4" style={styles.sectionTitle}>🎨 Contrôles de Thème</Text>
            
            <View style={styles.buttonRow}>
              <Button variant="primary" onPress={handleModeToggle}>
                {mode === 'light' ? '🌙 Mode Sombre' : '☀️ Mode Clair'}
              </Button>
            </View>
            
            <View style={styles.buttonRow}>
              <Button variant="secondary" onPress={() => handleThemeChange('default')}>
                Par défaut
              </Button>
              <Button variant="secondary" onPress={() => handleThemeChange('colorful')}>
                Coloré
              </Button>
            </View>
            
            <View style={styles.buttonRow}>
              <Button variant="secondary" onPress={() => handleThemeChange('minimal')}>
                Minimal
              </Button>
              <Button variant="secondary" onPress={() => handleThemeChange('professional')}>
                Professionnel
              </Button>
            </View>
          </Card>

          {/* Section Boutons */}
          <Card variant="base" style={styles.section}>
            <Text variant="h4" style={styles.sectionTitle}>🔘 Boutons</Text>
            
            <View style={styles.buttonRow}>
              <Button variant="primary" style={styles.button}>
                Primaire
              </Button>
              <Button variant="secondary" style={styles.button}>
                Secondaire
              </Button>
            </View>
            
            <View style={styles.buttonRow}>
              <Button variant="success" style={styles.button}>
                Succès
              </Button>
              <Button variant="danger" style={styles.button}>
                Danger
              </Button>
            </View>
            
            <Button 
              variant="primary" 
              gradient={true}
              icon="arrow-forward"
              iconPosition="right"
              style={styles.fullButton}
            >
              Bouton avec Gradient
            </Button>
          </Card>

          {/* Section Inputs */}
          <Card variant="base" style={styles.section}>
            <Text variant="h4" style={styles.sectionTitle}>📝 Champs de Saisie</Text>
            
            <Input
              variant="base"
              label="Email"
              icon="mail-outline"
              placeholder="Votre email"
              value={email}
              onChangeText={setEmail}
            />
            
            <Input
              variant="base"
              label="Mot de passe"
              icon="lock-closed-outline"
              iconPosition="right"
              placeholder="Votre mot de passe"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            
            <Input
              variant="search"
              icon="search"
              placeholder="Rechercher..."
            />
            
            <Input
              variant="error"
              label="Champ avec erreur"
              placeholder="Ce champ a une erreur"
              error="Ce champ est requis"
            />
          </Card>

          {/* Section Badges */}
          <Card variant="base" style={styles.section}>
            <Text variant="h4" style={styles.sectionTitle}>🏷️ Badges</Text>
            
            <View style={styles.badgeRow}>
              <Badge variant="base" color={colors.primary}>
                Par défaut
              </Badge>
              <Badge variant="success" color={colors.success}>
                Succès
              </Badge>
              <Badge variant="warning" color={colors.warning}>
                Avertissement
              </Badge>
              <Badge variant="error" color={colors.error}>
                Erreur
              </Badge>
            </View>
            
            <View style={styles.badgeRow}>
              <Badge variant="difficulty" color={getColor('difficulty.beginner')}>
                Débutant
              </Badge>
              <Badge variant="difficulty" color={getColor('difficulty.intermediate')}>
                Intermédiaire
              </Badge>
              <Badge variant="difficulty" color={getColor('difficulty.advanced')}>
                Avancé
              </Badge>
            </View>
          </Card>

          {/* Section Icônes */}
          <Card variant="base" style={styles.section}>
            <Text variant="h4" style={styles.sectionTitle}>🎯 Icônes</Text>
            
            <View style={styles.iconRow}>
              <Icon name="fitness" size="lg" variant="accent" />
              <Icon name="barbell" size="lg" variant="success" />
              <Icon name="flame" size="lg" variant="warning" />
              <Icon name="flash" size="lg" variant="error" />
              <Icon name="heart" size="lg" variant="info" />
            </View>
            
            <View style={styles.iconRow}>
              <Icon name="play-circle" size="xl" variant="accent" />
              <Icon name="calendar" size="xl" variant="success" />
              <Icon name="bar-chart" size="xl" variant="warning" />
              <Icon name="trophy" size="xl" variant="error" />
            </View>
          </Card>

          {/* Section Typographie */}
          <Card variant="base" style={styles.section}>
            <Text variant="h4" style={styles.sectionTitle}>📝 Typographie</Text>
            
            <Text variant="h1" style={styles.textSample}>Titre H1</Text>
            <Text variant="h2" style={styles.textSample}>Titre H2</Text>
            <Text variant="h3" style={styles.textSample}>Titre H3</Text>
            <Text variant="h4" style={styles.textSample}>Titre H4</Text>
            <Text variant="h5" style={styles.textSample}>Titre H5</Text>
            <Text variant="h6" style={styles.textSample}>Titre H6</Text>
            
            <Separator />
            
            <Text variant="body" style={styles.textSample}>
              Texte de corps normal avec une ligne de texte pour montrer l'apparence.
            </Text>
            <Text variant="bodySmall" style={styles.textSample}>
              Texte de corps petit pour les descriptions.
            </Text>
            <Text variant="caption" style={styles.textSample}>
              Texte de légende pour les informations secondaires.
            </Text>
          </Card>

          {/* Section Cartes */}
          <Card variant="base" style={styles.section}>
            <Text variant="h4" style={styles.sectionTitle}>🃏 Types de Cartes</Text>
            
            <Card variant="bordered" style={styles.cardSample}>
              <Text variant="h6">Carte avec Bordure</Text>
              <Text variant="bodySmall">
                Cette carte a une bordure pour la distinguer.
              </Text>
            </Card>
            
            <Card variant="stat" style={styles.cardSample}>
              <Icon name="fitness" size="2xl" variant="accent" />
              <Text variant="h3" style={styles.statNumber}>12</Text>
              <Text variant="caption">Séances</Text>
            </Card>
          </Card>

          {/* Section Séparateurs */}
          <Card variant="base" style={styles.section}>
            <Text variant="h4" style={styles.sectionTitle}>➖ Séparateurs</Text>
            
            <Text variant="body">Texte au-dessus</Text>
            <Separator variant="horizontal" />
            <Text variant="body">Texte au-dessous</Text>
            
            <Separator variant="withText" text="OU" />
            
            <View style={styles.separatorVertical}>
              <Text variant="body">Texte à gauche</Text>
              <Separator variant="vertical" />
              <Text variant="body">Texte à droite</Text>
            </View>
          </Card>

          {/* Instructions */}
          <Card variant="base" style={styles.section}>
            <Text variant="h4" style={styles.sectionTitle}>📋 Comment modifier l'UI</Text>
            
            <Text variant="body" style={styles.instruction}>
              1. Ouvrez le fichier <Text variant="body" weight="bold">src/config/QuickConfig.ts</Text>
            </Text>
            
            <Text variant="body" style={styles.instruction}>
              2. Modifiez les valeurs dans <Text variant="body" weight="bold">colors</Text>, <Text variant="body" weight="bold">typography</Text>, ou <Text variant="body" weight="bold">spacing</Text>
            </Text>
            
            <Text variant="body" style={styles.instruction}>
              3. Redémarrez l'application pour voir les changements
            </Text>
            
            <Text variant="body" style={styles.instruction}>
              4. Utilisez les boutons ci-dessus pour tester les thèmes
            </Text>
          </Card>

          {/* Bouton de retour */}
          <Button
            variant="primary"
            gradient={true}
            icon="arrow-back"
            iconPosition="left"
            style={styles.backButton}
            onPress={() => router.back()}
          >
            Retour
          </Button>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  section: {
    margin: 20,
    marginTop: 0,
  },
  sectionTitle: {
    marginBottom: 20,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  fullButton: {
    marginTop: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  textSample: {
    marginBottom: 10,
  },
  cardSample: {
    marginBottom: 15,
  },
  statNumber: {
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  separatorVertical: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  instruction: {
    marginBottom: 10,
    lineHeight: 24,
  },
  backButton: {
    margin: 20,
    marginTop: 0,
  },
});
