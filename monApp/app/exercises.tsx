import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

interface Exercise {
  id: string;
  nom: string;
  description: string;
  categorie: string;
  type: string;
  difficulte: string;
  muscles: string[];
  equipement: string;
  image: string;
  couleur: string;
  bgCouleur: string;
  borderCouleur: string;
  icon: string;
  instructions: string[];
  conseils: string;
  variations: string[];
}

export default function ExercisesScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const isLoggedInStatus = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedInStatus === 'true') {
        setIsLoggedIn(true);
      } else {
        router.replace('/login');
      }
    } catch (error) {
      console.log('Erreur lors de la vérification:', error);
      router.replace('/login');
    }
  };

  // Données des exercices (version mobile de la page web)
  const exercices: Exercise[] = [
    // Force/Powerlifting
    {
      id: 'squat',
      nom: 'Squat',
      description: 'Exercice de base pour développer la force des jambes et du dos',
      categorie: 'Force',
      type: 'Compound',
      difficulte: 'Intermédiaire',
      muscles: ['Quadriceps', 'Fessiers', 'Ischio-jambiers', 'Dos'],
      equipement: 'Barre + Rack',
      image: '🏋️‍♂️',
      couleur: 'from-red-500 to-pink-500',
      bgCouleur: 'from-red-50 to-pink-50',
      borderCouleur: 'border-red-200/50',
      icon: 'barbell',
      instructions: [
        'Positionnez-vous sous la barre',
        'Placez la barre sur vos trapèzes',
        'Descendez en gardant le dos droit',
        'Remontez en contractant les jambes'
      ],
      conseils: 'Gardez les genoux alignés avec les pieds',
      variations: ['Squat avant', 'Squat bulgare', 'Squat sumo']
    },
    {
      id: 'bench-press',
      nom: 'Développé Couché',
      description: 'Exercice roi pour développer la force de la poitrine',
      categorie: 'Force',
      type: 'Compound',
      difficulte: 'Intermédiaire',
      muscles: ['Poitrine', 'Triceps', 'Épaules'],
      equipement: 'Barre + Banc',
      image: '💪',
      couleur: 'from-blue-500 to-cyan-500',
      bgCouleur: 'from-blue-50 to-cyan-50',
      borderCouleur: 'border-blue-200/50',
      icon: 'barbell',
      instructions: [
        'Allongez-vous sur le banc',
        'Saisissez la barre avec une prise large',
        'Descendez la barre vers la poitrine',
        'Poussez vers le haut avec force'
      ],
      conseils: 'Gardez les pieds bien ancrés au sol',
      variations: ['Développé incliné', 'Développé décliné', 'Développé haltères']
    },
    {
      id: 'deadlift',
      nom: 'Soulevé de Terre',
      description: 'Exercice complet pour développer la force totale du corps',
      categorie: 'Force',
      type: 'Compound',
      difficulte: 'Avancé',
      muscles: ['Dos', 'Fessiers', 'Ischio-jambiers', 'Trapèzes'],
      equipement: 'Barre',
      image: '🏋️‍♀️',
      couleur: 'from-purple-500 to-violet-500',
      bgCouleur: 'from-purple-50 to-violet-50',
      borderCouleur: 'border-purple-200/50',
      icon: 'barbell',
      instructions: [
        'Positionnez-vous devant la barre',
        'Saisissez la barre avec une prise mixte',
        'Gardez le dos droit et les jambes fléchies',
        'Soulevez en contractant tout le corps'
      ],
      conseils: 'Ne jamais arrondir le dos',
      variations: ['Deadlift sumo', 'Deadlift roumain', 'Deadlift trap bar']
    },
    {
      id: 'overhead-press',
      nom: 'Développé Militaire',
      description: 'Exercice pour développer la force des épaules',
      categorie: 'Force',
      type: 'Compound',
      difficulte: 'Intermédiaire',
      muscles: ['Épaules', 'Triceps', 'Core'],
      equipement: 'Barre',
      image: '💪',
      couleur: 'from-indigo-500 to-blue-500',
      bgCouleur: 'from-indigo-50 to-blue-50',
      borderCouleur: 'border-indigo-200/50',
      icon: 'barbell',
      instructions: [
        'Tenez la barre au niveau des épaules',
        'Gardez le dos droit',
        'Poussez la barre vers le haut',
        'Descendez lentement'
      ],
      conseils: 'Gardez le core contracté',
      variations: ['Développé assis', 'Développé haltères', 'Développé poussée']
    },
    {
      id: 'barbell-row',
      nom: 'Rowing Barre',
      description: 'Exercice pour développer la force du dos',
      categorie: 'Force',
      type: 'Compound',
      difficulte: 'Intermédiaire',
      muscles: ['Dos', 'Biceps', 'Épaules'],
      equipement: 'Barre',
      image: '🏋️‍♂️',
      couleur: 'from-green-500 to-emerald-500',
      bgCouleur: 'from-green-50 to-emerald-50',
      borderCouleur: 'border-green-200/50',
      icon: 'barbell',
      instructions: [
        'Penchez-vous vers l\'avant',
        'Tirez la barre vers le bas du torse',
        'Contractez les omoplates',
        'Descendez lentement'
      ],
      conseils: 'Gardez le dos droit',
      variations: ['Rowing haltères', 'Rowing T-bar', 'Rowing inversé']
    },
    // Endurance/Cardio
    {
      id: 'course-5k',
      nom: 'Course 5km',
      description: 'Course de fond pour développer l\'endurance',
      categorie: 'Endurance',
      type: 'Cardio',
      difficulte: 'Débutant',
      muscles: ['Jambes', 'Cœur', 'Poumons'],
      equipement: 'Chaussures de course',
      image: '🏃‍♂️',
      couleur: 'from-green-500 to-emerald-500',
      bgCouleur: 'from-green-50 to-emerald-50',
      borderCouleur: 'border-green-200/50',
      icon: 'walk',
      instructions: [
        'Échauffez-vous 10 minutes',
        'Maintenez un rythme régulier',
        'Respirez profondément',
        'Hydratez-vous régulièrement'
      ],
      conseils: 'Écoutez votre corps et ajustez le rythme',
      variations: ['Course 10km', 'Course 21km', 'Course trail']
    },
    {
      id: 'natation-libre',
      nom: 'Natation Libre',
      description: 'Nage complète pour l\'endurance',
      categorie: 'Endurance',
      type: 'Aquatique',
      difficulte: 'Intermédiaire',
      muscles: ['Tout le corps'],
      equipement: 'Maillot de bain',
      image: '🏊‍♂️',
      couleur: 'from-cyan-500 to-blue-500',
      bgCouleur: 'from-cyan-50 to-blue-50',
      borderCouleur: 'border-cyan-200/50',
      icon: 'water',
      instructions: [
        'Échauffez-vous dans l\'eau',
        'Maintenez un rythme régulier',
        'Respirez de manière coordonnée',
        'Terminez par un retour au calme'
      ],
      conseils: 'Technique de respiration importante',
      variations: ['Crawl', 'Brasse', 'Dos crawlé']
    },
    // Calisthéniques
    {
      id: 'tractions',
      nom: 'Tractions',
      description: 'Exercice au poids du corps pour le haut du corps',
      categorie: 'Calisthéniques',
      type: 'Bodyweight',
      difficulte: 'Intermédiaire',
      muscles: ['Dos', 'Biceps', 'Épaules'],
      equipement: 'Barre de traction',
      image: '🤸‍♂️',
      couleur: 'from-orange-500 to-yellow-500',
      bgCouleur: 'from-orange-50 to-yellow-50',
      borderCouleur: 'border-orange-200/50',
      icon: 'fitness',
      instructions: [
        'Suspendez-vous à la barre',
        'Tirez vers le haut jusqu\'au menton',
        'Descendez lentement',
        'Répétez le mouvement'
      ],
      conseils: 'Gardez le corps droit et stable',
      variations: ['Tractions larges', 'Tractions serrées', 'Tractions lestées']
    },
    {
      id: 'pompes',
      nom: 'Pompes',
      description: 'Exercice de base pour la poitrine',
      categorie: 'Calisthéniques',
      type: 'Bodyweight',
      difficulte: 'Débutant',
      muscles: ['Poitrine', 'Triceps', 'Épaules'],
      equipement: 'Aucun',
      image: '💪',
      couleur: 'from-blue-500 to-cyan-500',
      bgCouleur: 'from-blue-50 to-cyan-50',
      borderCouleur: 'border-blue-200/50',
      icon: 'fitness',
      instructions: [
        'Positionnez-vous en planche',
        'Descendez vers le sol',
        'Poussez vers le haut',
        'Répétez le mouvement'
      ],
      conseils: 'Gardez le corps droit',
      variations: ['Pompes inclinées', 'Pompes déclinées', 'Pompes diamant']
    },
    {
      id: 'planche',
      nom: 'Planche',
      description: 'Exercice isométrique pour le core',
      categorie: 'Calisthéniques',
      type: 'Isométrique',
      difficulte: 'Débutant',
      muscles: ['Abdominaux', 'Dos', 'Épaules'],
      equipement: 'Aucun',
      image: '🧘‍♂️',
      couleur: 'from-indigo-500 to-blue-500',
      bgCouleur: 'from-indigo-50 to-blue-50',
      borderCouleur: 'border-indigo-200/50',
      icon: 'fitness',
      instructions: [
        'Positionnez-vous en appui sur les avant-bras',
        'Gardez le corps droit',
        'Contractez les abdominaux',
        'Maintenez la position'
      ],
      conseils: 'Ne pas retenir votre souffle',
      variations: ['Planche latérale', 'Planche sur les mains', 'Planche dynamique']
    },
    // Crossfit
    {
      id: 'burpees',
      nom: 'Burpees',
      description: 'Exercice complet pour le conditionnement métabolique',
      categorie: 'Crossfit',
      type: 'Métabolique',
      difficulte: 'Intermédiaire',
      muscles: ['Tout le corps'],
      equipement: 'Aucun',
      image: '🔥',
      couleur: 'from-red-500 to-orange-500',
      bgCouleur: 'from-red-50 to-orange-50',
      borderCouleur: 'border-red-200/50',
      icon: 'flame',
      instructions: [
        'Commencez debout',
        'Descendez en position de pompe',
        'Faites une pompe',
        'Remontez et sautez'
      ],
      conseils: 'Maintenez un rythme régulier',
      variations: ['Burpees lestés', 'Burpees avec saut', 'Burpees modifiés']
    },
    {
      id: 'thruster',
      nom: 'Thruster',
      description: 'Exercice combiné squat + développé pour le Crossfit',
      categorie: 'Crossfit',
      type: 'Compound',
      difficulte: 'Avancé',
      muscles: ['Jambes', 'Épaules', 'Triceps'],
      equipement: 'Barre + Plates',
      image: '⚡',
      couleur: 'from-yellow-500 to-orange-500',
      bgCouleur: 'from-yellow-50 to-orange-50',
      borderCouleur: 'border-yellow-200/50',
      icon: 'flash',
      instructions: [
        'Commencez avec la barre sur les épaules',
        'Descendez en squat',
        'Remontez en développant la barre',
        'Répétez le mouvement'
      ],
      conseils: 'Synchronisez le mouvement des jambes et des bras',
      variations: ['Thruster haltères', 'Thruster kettlebell', 'Thruster dynamique']
    }
  ];

  const categories = [
    { value: 'all', label: 'Tous' },
    { value: 'Force', label: 'Force' },
    { value: 'Endurance', label: 'Endurance' },
    { value: 'Calisthéniques', label: 'Calisthéniques' },
    { value: 'Crossfit', label: 'Crossfit' }
  ];

  const filteredExercices = exercices.filter(exercice => {
    const matchesSearch = exercice.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercice.muscles.some(muscle => muscle.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || exercice.categorie === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getIconName = (iconType: string) => {
    switch (iconType) {
      case 'barbell': return 'barbell';
      case 'walk': return 'walk';
      case 'water': return 'water';
      case 'fitness': return 'fitness';
      case 'flame': return 'flame';
      case 'flash': return 'flash';
      default: return 'fitness';
    }
  };

  const getDifficultyColor = (difficulte: string) => {
    switch (difficulte) {
      case 'Débutant': return '#4ecdc4';
      case 'Intermédiaire': return '#ffd93d';
      case 'Avancé': return '#ff6b6b';
      case 'Expert': return '#667eea';
      default: return '#666';
    }
  };

  const getCategoryColor = (categorie: string) => {
    switch (categorie) {
      case 'Force': return '#ff6b6b';
      case 'Endurance': return '#4ecdc4';
      case 'Calisthéniques': return '#ffd93d';
      case 'Crossfit': return '#667eea';
      default: return '#666';
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Exercices</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Stats Header */}
          <View style={styles.statsHeader}>
            <View style={styles.statsCard}>
              <View style={styles.statsIcon}>
                <Ionicons name="barbell" size={32} color="#667eea" />
              </View>
              <View style={styles.statsContent}>
                <Text style={styles.statsNumber}>{exercices.length}</Text>
                <Text style={styles.statsLabel}>Exercices</Text>
              </View>
            </View>
            <View style={styles.statsCard}>
              <View style={styles.statsIcon}>
                <Ionicons name="list" size={32} color="#4ecdc4" />
              </View>
              <View style={styles.statsContent}>
                <Text style={styles.statsNumber}>{categories.length - 1}</Text>
                <Text style={styles.statsLabel}>Catégories</Text>
              </View>
            </View>
          </View>

          {/* Search and Filters */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Rechercher un exercice..."
                placeholderTextColor="#999"
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesScroll}
              contentContainerStyle={styles.categoriesContainer}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.value}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.value && styles.categoryButtonActive
                  ]}
                  onPress={() => setSelectedCategory(category.value)}
                >
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category.value && styles.categoryTextActive
                  ]}>
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.viewModeContainer}>
              <TouchableOpacity
                style={[styles.viewModeButton, viewMode === 'grid' && styles.viewModeButtonActive]}
                onPress={() => setViewMode('grid')}
              >
                <Ionicons name="grid" size={20} color={viewMode === 'grid' ? 'white' : '#666'} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.viewModeButton, viewMode === 'list' && styles.viewModeButtonActive]}
                onPress={() => setViewMode('list')}
              >
                <Ionicons name="list" size={20} color={viewMode === 'list' ? 'white' : '#666'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Exercises List */}
          <View style={styles.exercisesContainer}>
            {viewMode === 'grid' ? (
              <View style={styles.gridContainer}>
                {filteredExercices.map((exercice) => (
                  <TouchableOpacity
                    key={exercice.id}
                    style={styles.exerciseCard}
                    onPress={() => setSelectedExercise(exercice.id)}
                  >
                    <View style={styles.exerciseCardHeader}>
                      <View style={[styles.exerciseIcon, { backgroundColor: getCategoryColor(exercice.categorie) }]}>
                        <Ionicons name={getIconName(exercice.icon) as any} size={24} color="white" />
                      </View>
                      <View style={styles.exerciseBadges}>
                        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(exercice.difficulte) }]}>
                          <Text style={styles.difficultyText}>{exercice.difficulte}</Text>
                        </View>
                        <View style={styles.typeBadge}>
                          <Text style={styles.typeText}>{exercice.type}</Text>
                        </View>
                      </View>
                    </View>
                    
                    <Text style={styles.exerciseName}>{exercice.nom}</Text>
                    <Text style={styles.exerciseDescription} numberOfLines={2}>
                      {exercice.description}
                    </Text>
                    
                    <View style={styles.exerciseDetails}>
                      <View style={styles.exerciseDetail}>
                        <Ionicons name="list" size={14} color="#666" />
                        <Text style={styles.exerciseDetailText}>{exercice.categorie}</Text>
                      </View>
                      <View style={styles.exerciseDetail}>
                        <Ionicons name="fitness" size={14} color="#666" />
                        <Text style={styles.exerciseDetailText} numberOfLines={1}>
                          {exercice.muscles.slice(0, 2).join(', ')}
                        </Text>
                      </View>
                    </View>
                    
                    <TouchableOpacity 
                      style={styles.viewButton}
                      onPress={() => setSelectedExercise(exercice.id)}
                    >
                      <Ionicons name="eye" size={16} color="white" />
                      <Text style={styles.viewButtonText}>Voir</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.listContainer}>
                {filteredExercices.map((exercice) => (
                  <TouchableOpacity
                    key={exercice.id}
                    style={styles.exerciseListItem}
                    onPress={() => setSelectedExercise(exercice.id)}
                  >
                    <View style={[styles.listExerciseIcon, { backgroundColor: getCategoryColor(exercice.categorie) }]}>
                      <Ionicons name={getIconName(exercice.icon) as any} size={24} color="white" />
                    </View>
                    
                    <View style={styles.listExerciseContent}>
                      <View style={styles.listExerciseHeader}>
                        <Text style={styles.listExerciseName}>{exercice.nom}</Text>
                        <View style={styles.listExerciseBadges}>
                          <View style={[styles.listDifficultyBadge, { backgroundColor: getDifficultyColor(exercice.difficulte) }]}>
                            <Text style={styles.listDifficultyText}>{exercice.difficulte}</Text>
                          </View>
                          <View style={styles.listTypeBadge}>
                            <Text style={styles.listTypeText}>{exercice.type}</Text>
                          </View>
                        </View>
                      </View>
                      
                      <Text style={styles.listExerciseDescription} numberOfLines={2}>
                        {exercice.description}
                      </Text>
                      
                      <View style={styles.listExerciseDetails}>
                        <View style={styles.listExerciseDetail}>
                          <Ionicons name="list" size={14} color="#666" />
                          <Text style={styles.listExerciseDetailText}>{exercice.categorie}</Text>
                        </View>
                        <View style={styles.listExerciseDetail}>
                          <Ionicons name="fitness" size={14} color="#666" />
                          <Text style={styles.listExerciseDetailText}>
                            {exercice.muscles.slice(0, 3).join(', ')}
                          </Text>
                        </View>
                        <View style={styles.listExerciseDetail}>
                          <Ionicons name="barbell" size={14} color="#666" />
                          <Text style={styles.listExerciseDetailText}>{exercice.equipement}</Text>
                        </View>
                      </View>
                    </View>
                    
                    <TouchableOpacity 
                      style={styles.listViewButton}
                      onPress={() => setSelectedExercise(exercice.id)}
                    >
                      <Ionicons name="eye" size={16} color="white" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </ScrollView>

        {/* Exercise Detail Modal */}
        <Modal
          visible={selectedExercise !== null}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          {selectedExercise && (() => {
            const exercice = exercices.find(e => e.id === selectedExercise);
            if (!exercice) return null;

            return (
              <SafeAreaView style={styles.modalContainer}>
                <StatusBar barStyle="dark-content" backgroundColor="white" />
                
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <TouchableOpacity 
                    style={styles.modalCloseButton}
                    onPress={() => setSelectedExercise(null)}
                  >
                    <Ionicons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Détails de l'exercice</Text>
                  <View style={styles.modalPlaceholder} />
                </View>

                <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                  {/* Exercise Header */}
                  <View style={styles.modalExerciseHeader}>
                    <View style={[styles.modalExerciseIcon, { backgroundColor: getCategoryColor(exercice.categorie) }]}>
                      <Ionicons name={getIconName(exercice.icon) as any} size={32} color="white" />
                    </View>
                    <View style={styles.modalExerciseInfo}>
                      <Text style={styles.modalExerciseName}>{exercice.nom}</Text>
                      <Text style={styles.modalExerciseDescription}>{exercice.description}</Text>
                    </View>
                  </View>

                  {/* Exercise Stats */}
                  <View style={styles.modalStatsContainer}>
                    <View style={styles.modalStatCard}>
                      <Text style={styles.modalStatLabel}>Catégorie</Text>
                      <Text style={styles.modalStatValue}>{exercice.categorie}</Text>
                    </View>
                    <View style={styles.modalStatCard}>
                      <Text style={styles.modalStatLabel}>Type</Text>
                      <Text style={styles.modalStatValue}>{exercice.type}</Text>
                    </View>
                    <View style={styles.modalStatCard}>
                      <Text style={styles.modalStatLabel}>Difficulté</Text>
                      <Text style={styles.modalStatValue}>{exercice.difficulte}</Text>
                    </View>
                    <View style={styles.modalStatCard}>
                      <Text style={styles.modalStatLabel}>Équipement</Text>
                      <Text style={styles.modalStatValue}>{exercice.equipement}</Text>
                    </View>
                  </View>

                  {/* Muscles Worked */}
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>
                      <Ionicons name="fitness" size={20} color="#667eea" />
                      Muscles Travaillés
                    </Text>
                    <View style={styles.modalMusclesContainer}>
                      {exercice.muscles.map((muscle, index) => (
                        <View key={index} style={styles.modalMuscleTag}>
                          <Text style={styles.modalMuscleText}>{muscle}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Instructions */}
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>
                      <Ionicons name="list" size={20} color="#4ecdc4" />
                      Instructions
                    </Text>
                    <View style={styles.modalInstructionsContainer}>
                      {exercice.instructions.map((instruction, index) => (
                        <View key={index} style={styles.modalInstructionItem}>
                          <View style={styles.modalInstructionNumber}>
                            <Text style={styles.modalInstructionNumberText}>{index + 1}</Text>
                          </View>
                          <Text style={styles.modalInstructionText}>{instruction}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Tips */}
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>
                      <Ionicons name="star" size={20} color="#ffd93d" />
                      Conseils
                    </Text>
                    <View style={styles.modalTipsContainer}>
                      <Text style={styles.modalTipsText}>{exercice.conseils}</Text>
                    </View>
                  </View>

                  {/* Variations */}
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>
                      <Ionicons name="flash" size={20} color="#667eea" />
                      Variations
                    </Text>
                    <View style={styles.modalVariationsContainer}>
                      {exercice.variations.map((variation, index) => (
                        <View key={index} style={styles.modalVariationTag}>
                          <Text style={styles.modalVariationText}>{variation}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </ScrollView>
              </SafeAreaView>
            );
          })()}
        </Modal>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  statsHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 5,
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
  statsIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statsContent: {
    alignItems: 'center',
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categoriesScroll: {
    marginBottom: 15,
  },
  categoriesContainer: {
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
  viewModeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 4,
  },
  viewModeButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewModeButtonActive: {
    backgroundColor: 'white',
  },
  exercisesContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  exerciseCard: {
    width: (width - 60) / 2,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  exerciseCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  exerciseIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseBadges: {
    alignItems: 'flex-end',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  typeBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#666',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  exerciseDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginBottom: 12,
  },
  exerciseDetails: {
    marginBottom: 15,
  },
  exerciseDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  exerciseDetailText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 6,
    flex: 1,
  },
  viewButton: {
    backgroundColor: '#667eea',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  listContainer: {
    flex: 1,
  },
  exerciseListItem: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
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
  listExerciseIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  listExerciseContent: {
    flex: 1,
  },
  listExerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  listExerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  listExerciseBadges: {
    alignItems: 'flex-end',
  },
  listDifficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  listDifficultyText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  listTypeBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  listTypeText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#666',
  },
  listExerciseDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
    marginBottom: 8,
  },
  listExerciseDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listExerciseDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 4,
  },
  listExerciseDetailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  listViewButton: {
    backgroundColor: '#667eea',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalCloseButton: {
    padding: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalPlaceholder: {
    width: 40,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalExerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalExerciseIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  modalExerciseInfo: {
    flex: 1,
  },
  modalExerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  modalExerciseDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  modalStatsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalStatCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    marginRight: '2%',
  },
  modalStatLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  modalStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  modalSection: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalMusclesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  modalMuscleTag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  modalMuscleText: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: '500',
  },
  modalInstructionsContainer: {
    flex: 1,
  },
  modalInstructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  modalInstructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4ecdc4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  modalInstructionNumberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  modalInstructionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  modalTipsContainer: {
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#ffd93d',
  },
  modalTipsText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    lineHeight: 22,
  },
  modalVariationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  modalVariationTag: {
    backgroundColor: '#f3e5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e1bee7',
  },
  modalVariationText: {
    fontSize: 14,
    color: '#7b1fa2',
    fontWeight: '500',
  },
});
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  workoutInfoContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  workoutCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  workoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  workoutIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  workoutDetails: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  workoutStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  workoutStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  workoutStatText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  startWorkoutButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  exercisesContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  exerciseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#666',
  },
  exerciseWeight: {
    alignItems: 'flex-end',
  },
  weightText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 2,
  },
  restText: {
    fontSize: 12,
    color: '#999',
  },
  activeWorkoutContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  currentExerciseCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  currentExerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  currentExerciseIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  currentExerciseInfo: {
    flex: 1,
  },
  currentExerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  currentExerciseDetails: {
    fontSize: 16,
    color: '#666',
  },
  currentExerciseWeight: {
    alignItems: 'flex-end',
  },
  currentWeightText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#667eea',
  },
  setsContainer: {
    marginBottom: 20,
  },
  setsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  setButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  setButtonCompleted: {
    backgroundColor: '#e8f5e8',
    borderColor: '#4ecdc4',
  },
  setNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667eea',
    width: 30,
    textAlign: 'center',
    marginRight: 15,
  },
  setNumberCompleted: {
    color: '#4ecdc4',
  },
  setInfo: {
    flex: 1,
  },
  setReps: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  setWeight: {
    fontSize: 14,
    color: '#666',
  },
  restTimer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#667eea',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  navButtonDisabled: {
    backgroundColor: 'rgba(102, 126, 234, 0.5)',
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
  },
});
