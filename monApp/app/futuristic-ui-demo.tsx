// Démonstration des éléments UI futuristes pour FitGEN
// Cette page montre comment utiliser les nouveaux composants basés sur les éléments visuels fournis

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

// Import des composants futuristes
import {
  FuturisticButton,
  FuturisticCard,
  FuturisticBadge,
  FuturisticIcon,
  FuturisticText,
  FuturisticProgressBar,
} from '../src/components/FuturisticComponents';
import { FitGENUIElements, getUIElementGradient } from '../src/theme/FitGENUIElements';

const { width } = Dimensions.get('window');

export default function FuturisticUIDemo() {
  const [progress, setProgress] = useState(67);
  const [selectedVariant, setSelectedVariant] = useState('primary');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={FitGENUIElements.colors.background.dark} />
      
      <LinearGradient
        colors={getUIElementGradient('futuristic')}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <View style={styles.header}>
            <FuturisticButton
              variant="secondary"
              size="small"
              icon="arrow-back"
              onPress={() => router.back()}
              style={styles.backButton}
            />
            <FuturisticText variant="h2" color="#FFFFFF" align="center" glow>
              🚀 UI Futuriste
            </FuturisticText>
            <FuturisticIcon name="settings-outline" variant="glow" size="lg" />
          </View>

          {/* Section Boutons Futuristes */}
          <FuturisticCard variant="glow" style={styles.section}>
            <FuturisticText variant="h4" color="#FFFFFF" style={styles.sectionTitle}>
              Boutons Futuristes
            </FuturisticText>
            
            <View style={styles.buttonRow}>
              <FuturisticButton variant="primary" style={styles.button}>
                Primaire
              </FuturisticButton>
              <FuturisticButton variant="secondary" style={styles.button}>
                Secondaire
              </FuturisticButton>
            </View>
            
            <View style={styles.buttonRow}>
              <FuturisticButton variant="accent" style={styles.button}>
                Accent
              </FuturisticButton>
              <FuturisticButton variant="glow" style={styles.button}>
                Glow
              </FuturisticButton>
            </View>
            
            <FuturisticButton 
              variant="primary" 
              icon="arrow-forward"
              iconPosition="right"
              style={styles.fullButton}
            >
              Bouton avec Icône
            </FuturisticButton>
          </FuturisticCard>

          {/* Section Badges Futuristes */}
          <FuturisticCard variant="neon" style={styles.section}>
            <FuturisticText variant="h4" color="#FFFFFF" style={styles.sectionTitle}>
              Badges Futuristes
            </FuturisticText>
            
            <View style={styles.badgeRow}>
              <FuturisticBadge variant="default">Par défaut</FuturisticBadge>
              <FuturisticBadge variant="success">Succès</FuturisticBadge>
              <FuturisticBadge variant="warning">Avertissement</FuturisticBadge>
              <FuturisticBadge variant="error">Erreur</FuturisticBadge>
            </View>
            
            <View style={styles.badgeRow}>
              <FuturisticBadge variant="info">Information</FuturisticBadge>
              <FuturisticBadge variant="neon">Néon</FuturisticBadge>
            </View>
          </FuturisticCard>

          {/* Section Icônes Futuristes */}
          <FuturisticCard variant="circuit" style={styles.section}>
            <FuturisticText variant="h4" color="#FFFFFF" style={styles.sectionTitle}>
              Icônes Futuristes
            </FuturisticText>
            
            <View style={styles.iconRow}>
              <FuturisticIcon name="fitness" size="lg" variant="glow" />
              <FuturisticIcon name="barbell" size="lg" variant="neon" />
              <FuturisticIcon name="flame" size="lg" variant="accent" />
              <FuturisticIcon name="flash" size="lg" variant="glow" />
              <FuturisticIcon name="heart" size="lg" variant="neon" />
            </View>
            
            <View style={styles.iconRow}>
              <FuturisticIcon name="play-circle" size="xl" variant="glow" />
              <FuturisticIcon name="calendar" size="xl" variant="neon" />
              <FuturisticIcon name="bar-chart" size="xl" variant="accent" />
              <FuturisticIcon name="trophy" size="xl" variant="glow" />
            </View>
          </FuturisticCard>

          {/* Section Typographie Futuriste */}
          <FuturisticCard variant="glow" style={styles.section}>
            <FuturisticText variant="h4" color="#FFFFFF" style={styles.sectionTitle}>
              Typographie Futuriste
            </FuturisticText>
            
            <FuturisticText variant="h1" color="#FFFFFF" glow style={styles.textSample}>
              Titre H1
            </FuturisticText>
            <FuturisticText variant="h2" color="#FFFFFF" glow style={styles.textSample}>
              Titre H2
            </FuturisticText>
            <FuturisticText variant="h3" color="#FFFFFF" style={styles.textSample}>
              Titre H3
            </FuturisticText>
            <FuturisticText variant="h4" color="#FFFFFF" style={styles.textSample}>
              Titre H4
            </FuturisticText>
            
            <FuturisticText variant="body" color="#B8B9C3" style={styles.textSample}>
              Texte de corps normal avec une ligne de texte pour montrer l'apparence.
            </FuturisticText>
            <FuturisticText variant="caption" color="#B8B9C3" style={styles.textSample}>
              Texte de légende pour les informations secondaires.
            </FuturisticText>
          </FuturisticCard>

          {/* Section Barres de Progression */}
          <FuturisticCard variant="neon" style={styles.section}>
            <FuturisticText variant="h4" color="#FFFFFF" style={styles.sectionTitle}>
              Barres de Progression
            </FuturisticText>
            
            <View style={styles.progressSection}>
              <FuturisticText variant="body" color="#B8B9C3" style={styles.progressLabel}>
                Progression: {progress}%
              </FuturisticText>
              <FuturisticProgressBar
                progress={progress}
                variant="default"
                height={12}
                style={styles.progressBar}
              />
            </View>
            
            <View style={styles.progressSection}>
              <FuturisticText variant="body" color="#B8B9C3" style={styles.progressLabel}>
                Variante Néon
              </FuturisticText>
              <FuturisticProgressBar
                progress={85}
                variant="neon"
                height={10}
                style={styles.progressBar}
              />
            </View>
            
            <View style={styles.progressSection}>
              <FuturisticText variant="body" color="#B8B9C3" style={styles.progressLabel}>
                Variante Glow
              </FuturisticText>
              <FuturisticProgressBar
                progress={45}
                variant="glow"
                height={8}
                style={styles.progressBar}
              />
            </View>
            
            <View style={styles.progressSection}>
              <FuturisticText variant="body" color="#B8B9C3" style={styles.progressLabel}>
                Variante Circuit
              </FuturisticText>
              <FuturisticProgressBar
                progress={92}
                variant="circuit"
                height={14}
                style={styles.progressBar}
              />
            </View>
          </FuturisticCard>

          {/* Section Types de Cartes */}
          <FuturisticCard variant="default" style={styles.section}>
            <FuturisticText variant="h4" color="#FFFFFF" style={styles.sectionTitle}>
              Types de Cartes
            </FuturisticText>
            
            <FuturisticCard variant="glow" style={styles.cardSample}>
              <FuturisticText variant="h6" color="#FFFFFF">Carte avec Glow</FuturisticText>
              <FuturisticText variant="body" color="#B8B9C3">
                Cette carte a un effet de lueur bleu cyan.
              </FuturisticText>
            </FuturisticCard>
            
            <FuturisticCard variant="neon" style={styles.cardSample}>
              <FuturisticText variant="h6" color="#FFFFFF">Carte Néon</FuturisticText>
              <FuturisticText variant="body" color="#B8B9C3">
                Cette carte a un effet néon violet.
              </FuturisticText>
            </FuturisticCard>
            
            <FuturisticCard variant="circuit" style={styles.cardSample}>
              <FuturisticText variant="h6" color="#FFFFFF">Carte Circuit</FuturisticText>
              <FuturisticText variant="body" color="#B8B9C3">
                Cette carte a un style circuit board.
              </FuturisticText>
            </FuturisticCard>
          </FuturisticCard>

          {/* Section Contrôles */}
          <FuturisticCard variant="glow" style={styles.section}>
            <FuturisticText variant="h4" color="#FFFFFF" style={styles.sectionTitle}>
              Contrôles Interactifs
            </FuturisticText>
            
            <View style={styles.controlRow}>
              <FuturisticButton
                variant="primary"
                onPress={() => setProgress(Math.min(progress + 10, 100))}
                style={styles.controlButton}
              >
                +10%
              </FuturisticButton>
              <FuturisticButton
                variant="secondary"
                onPress={() => setProgress(Math.max(progress - 10, 0))}
                style={styles.controlButton}
              >
                -10%
              </FuturisticButton>
            </View>
            
            <View style={styles.controlRow}>
              <FuturisticButton
                variant="accent"
                onPress={() => setSelectedVariant('primary')}
                style={styles.controlButton}
              >
                Primaire
              </FuturisticButton>
              <FuturisticButton
                variant="glow"
                onPress={() => setSelectedVariant('secondary')}
                style={styles.controlButton}
              >
                Secondaire
              </FuturisticButton>
            </View>
          </FuturisticCard>

          {/* Bouton de retour */}
          <FuturisticButton
            variant="primary"
            icon="arrow-back"
            iconPosition="left"
            style={styles.backButton}
            onPress={() => router.back()}
          >
            Retour
          </FuturisticButton>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
  },
  section: {
    margin: 20,
    marginTop: 0,
  },
  sectionTitle: {
    marginBottom: 20,
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
  progressSection: {
    marginBottom: 20,
  },
  progressLabel: {
    marginBottom: 8,
  },
  progressBar: {
    marginBottom: 5,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  controlButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});
