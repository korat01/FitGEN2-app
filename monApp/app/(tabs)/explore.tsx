import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ProgramsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const categories = ['Tous', 'Powerlifting', 'Musculation', 'Cardio', 'HIIT'];
  
  const programs = [
    {
      id: 1,
      title: 'Programme Powerlifting Débutant',
      category: 'Powerlifting',
      duration: '12 semaines',
      difficulty: 'Débutant',
      sessions: '3x/semaine',
      description: 'Programme complet pour débuter le powerlifting avec progression 5/3/1',
      color: ['#667eea', '#764ba2'],
      icon: 'barbell',
    },
    {
      id: 2,
      title: 'Musculation Hypertrophie',
      category: 'Musculation',
      duration: '8 semaines',
      difficulty: 'Intermédiaire',
      sessions: '4x/semaine',
      description: 'Programme Push/Pull/Legs pour maximiser la croissance musculaire',
      color: ['#ff6b6b', '#ee5a52'],
      icon: 'fitness',
    },
    {
      id: 3,
      title: 'HIIT Cardio Intense',
      category: 'HIIT',
      duration: '6 semaines',
      difficulty: 'Avancé',
      sessions: '3x/semaine',
      description: 'Séances courtes et intenses pour brûler les graisses',
      color: ['#4ecdc4', '#44a08d'],
      icon: 'flash',
    },
    {
      id: 4,
      title: 'Street Lifting',
      category: 'Musculation',
      duration: '10 semaines',
      difficulty: 'Intermédiaire',
      sessions: '3x/semaine',
      description: 'Musculation au poids du corps avec progression lestée',
      color: ['#ffd93d', '#ff6b6b'],
      icon: 'body',
    },
    {
      id: 5,
      title: 'CrossFit WOD',
      category: 'Cardio',
      duration: '8 semaines',
      difficulty: 'Avancé',
      sessions: '5x/semaine',
      description: 'Workouts of the Day variés et intenses',
      color: ['#a8edea', '#fed6e3'],
      icon: 'timer',
    },
    {
      id: 6,
      title: 'Calisthenics Pro',
      category: 'Musculation',
      duration: '16 semaines',
      difficulty: 'Expert',
      sessions: '4x/semaine',
      description: 'Progression avancée au poids du corps',
      color: ['#667eea', '#764ba2'],
      icon: 'hand-left',
    },
  ];

  const filteredPrograms = selectedCategory === 'Tous' 
    ? programs 
    : programs.filter(program => program.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Programmes</Text>
            <Text style={styles.subtitle}>Choisissez votre programme d'entraînement</Text>
          </View>

          {/* Categories */}
          <View style={styles.categoriesContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScroll}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.categoryButtonActive
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category && styles.categoryTextActive
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Programs Grid */}
          <View style={styles.programsContainer}>
            {filteredPrograms.map((program) => (
              <TouchableOpacity key={program.id} style={styles.programCard}>
                <LinearGradient
                  colors={program.color}
                  style={styles.programGradient}
                >
                  <View style={styles.programHeader}>
                    <View style={styles.programIcon}>
                      <Ionicons name={program.icon as any} size={24} color="white" />
                    </View>
                    <View style={styles.programBadge}>
                      <Text style={styles.programBadgeText}>{program.difficulty}</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.programTitle}>{program.title}</Text>
                  <Text style={styles.programDescription}>{program.description}</Text>
                  
                  <View style={styles.programStats}>
                    <View style={styles.programStat}>
                      <Ionicons name="time" size={16} color="rgba(255,255,255,0.8)" />
                      <Text style={styles.programStatText}>{program.duration}</Text>
                    </View>
                    <View style={styles.programStat}>
                      <Ionicons name="calendar" size={16} color="rgba(255,255,255,0.8)" />
                      <Text style={styles.programStatText}>{program.sessions}</Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.startProgramButton}
                    onPress={() => router.push('/exercises')}
                  >
                    <Text style={styles.startProgramText}>Commencer</Text>
                    <Ionicons name="arrow-forward" size={16} color="white" />
                  </TouchableOpacity>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quick Start */}
          <View style={styles.quickStartContainer}>
            <Text style={styles.sectionTitle}>Démarrage Rapide</Text>
            <View style={styles.quickStartCard}>
              <View style={styles.quickStartIcon}>
                <Ionicons name="flash" size={32} color="#667eea" />
              </View>
              <View style={styles.quickStartContent}>
                <Text style={styles.quickStartTitle}>Séance Express</Text>
                <Text style={styles.quickStartSubtitle}>20 minutes d'entraînement rapide</Text>
              </View>
              <TouchableOpacity 
                style={styles.quickStartButton}
                onPress={() => router.push('/exercises')}
              >
                <Ionicons name="play" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  categoriesScroll: {
    paddingRight: 20,
  },
  categoryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  categoryButtonActive: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#667eea',
  },
  programsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  programCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  programGradient: {
    padding: 20,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  programIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  programBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  programBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  programTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  programDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 15,
    lineHeight: 20,
  },
  programStats: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  programStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  programStatText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginLeft: 6,
  },
  startProgramButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  startProgramText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  quickStartContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  quickStartCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quickStartIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  quickStartContent: {
    flex: 1,
  },
  quickStartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  quickStartSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  quickStartButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
