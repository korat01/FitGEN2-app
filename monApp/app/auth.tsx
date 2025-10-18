import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

interface UserProfile {
  id: string;
  nom: string;
  email: string;
  password: string;
  age: number;
  poids: number;
  taille: number;
  niveau: string;
  objectif: string;
  experience: string;
  trainingDays: string[];
  maxSquat: number;
  maxBench: number;
  maxDeadlift: number;
  preferences: {
    dureeSeance: number;
    intensite: string;
    exercicesPref: string[];
  };
}

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Register fields (Profile information)
  const [profileData, setProfileData] = useState<UserProfile>({
    id: '',
    nom: '',
    email: '',
    password: '',
    age: 25,
    poids: 70,
    taille: 175,
    niveau: 'Débutant',
    objectif: 'Force',
    experience: '0-1 an',
    trainingDays: ['Lundi', 'Mercredi', 'Vendredi'],
    maxSquat: 100,
    maxBench: 80,
    maxDeadlift: 120,
    preferences: {
      dureeSeance: 60,
      intensite: 'Modérée',
      exercicesPref: ['Squat', 'Développé Couché', 'Soulevé de Terre']
    }
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      const userProfile = await AsyncStorage.getItem('userProfile');
      
      if (isLoggedIn === 'true' && userProfile) {
        // L'utilisateur est déjà connecté, rediriger directement
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.log('Erreur lors de la vérification de l\'authentification:', error);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulation d'un délai de connexion
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Vérifier les credentials
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.email === email && profile.password === password) {
          // Connexion réussie
          await AsyncStorage.setItem('isLoggedIn', 'true');
          await AsyncStorage.setItem('currentUser', JSON.stringify(profile));
          
          Alert.alert('Succès', 'Connexion réussie ! Bienvenue dans FitGEN !');
          router.replace('/(tabs)');
        } else {
          Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
        }
      } else {
        Alert.alert('Erreur', 'Aucun compte trouvé avec cet email.');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!profileData.nom || !profileData.email || !profileData.password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulation d'un délai d'inscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Générer un ID unique
      const userId = Date.now().toString();
      
      // Créer le profil complet
      const newProfile: UserProfile = {
        ...profileData,
        id: userId
      };
      
      // Sauvegarder le profil
      await AsyncStorage.setItem('userProfile', JSON.stringify(newProfile));
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('currentUser', JSON.stringify(newProfile));
      
      Alert.alert('Succès', 'Compte créé avec succès ! Bienvenue dans FitGEN !');
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la création du compte.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfileField = (field: keyof UserProfile, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updatePreferencesField = (field: keyof UserProfile['preferences'], value: any) => {
    setProfileData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  const toggleTrainingDay = (day: string) => {
    setProfileData(prev => ({
      ...prev,
      trainingDays: prev.trainingDays.includes(day)
        ? prev.trainingDays.filter(d => d !== day)
        : [...prev.trainingDays, day]
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.logoContainer}>
                  <Ionicons name="fitness" size={60} color="white" />
                </View>
                <Text style={styles.title}>FitGEN</Text>
                <Text style={styles.subtitle}>
                  {isLogin ? 'Connectez-vous' : 'Créez votre profil'}
                </Text>
              </View>

              {/* Auth Toggle */}
              <View style={styles.authToggle}>
                <TouchableOpacity
                  style={[styles.toggleButton, isLogin && styles.toggleButtonActive]}
                  onPress={() => setIsLogin(true)}
                >
                  <Text style={[styles.toggleText, isLogin && styles.toggleTextActive]}>
                    Connexion
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.toggleButton, !isLogin && styles.toggleButtonActive]}
                  onPress={() => setIsLogin(false)}
                >
                  <Text style={[styles.toggleText, !isLogin && styles.toggleTextActive]}>
                    Inscription
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Form Container */}
              <View style={styles.formContainer}>
                {isLogin ? (
                  /* Login Form */
                  <View style={styles.loginForm}>
                    <View style={styles.inputContainer}>
                      <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        placeholderTextColor="#999"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                      />
                      <TouchableOpacity 
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Ionicons 
                          name={showPassword ? "eye-outline" : "eye-off-outline"} 
                          size={20} 
                          color="#666" 
                        />
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity 
                      style={[styles.authButton, isLoading && styles.authButtonDisabled]} 
                      onPress={handleLogin}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <ActivityIndicator color="white" />
                      ) : (
                        <Text style={styles.authButtonText}>Se connecter</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                ) : (
                  /* Register Form (Profile) */
                  <View style={styles.registerForm}>
                    {/* Informations personnelles */}
                    <Text style={styles.sectionTitle}>Informations personnelles</Text>
                    
                    <View style={styles.inputContainer}>
                      <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Nom complet"
                        placeholderTextColor="#999"
                        value={profileData.nom}
                        onChangeText={(value) => updateProfileField('nom', value)}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={profileData.email}
                        onChangeText={(value) => updateProfileField('email', value)}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        placeholderTextColor="#999"
                        secureTextEntry={!showPassword}
                        value={profileData.password}
                        onChangeText={(value) => updateProfileField('password', value)}
                      />
                      <TouchableOpacity 
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Ionicons 
                          name={showPassword ? "eye-outline" : "eye-off-outline"} 
                          size={20} 
                          color="#666" 
                        />
                      </TouchableOpacity>
                    </View>

                    {/* Informations physiques */}
                    <Text style={styles.sectionTitle}>Informations physiques</Text>
                    
                    <View style={styles.rowContainer}>
                      <View style={[styles.inputContainer, styles.halfInput]}>
                        <Ionicons name="calendar-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                          style={styles.input}
                          placeholder="Âge"
                          placeholderTextColor="#999"
                          keyboardType="numeric"
                          value={profileData.age.toString()}
                          onChangeText={(value) => updateProfileField('age', parseInt(value) || 25)}
                        />
                      </View>
                      <View style={[styles.inputContainer, styles.halfInput]}>
                        <Ionicons name="scale-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                          style={styles.input}
                          placeholder="Poids (kg)"
                          placeholderTextColor="#999"
                          keyboardType="numeric"
                          value={profileData.poids.toString()}
                          onChangeText={(value) => updateProfileField('poids', parseInt(value) || 70)}
                        />
                      </View>
                    </View>

                    <View style={styles.inputContainer}>
                      <Ionicons name="resize-outline" size={20} color="#666" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Taille (cm)"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                        value={profileData.taille.toString()}
                        onChangeText={(value) => updateProfileField('taille', parseInt(value) || 175)}
                      />
                    </View>

                    {/* Niveau et objectif */}
                    <Text style={styles.sectionTitle}>Niveau et objectif</Text>
                    
                    <View style={styles.selectContainer}>
                      <Text style={styles.selectLabel}>Niveau</Text>
                      <View style={styles.selectButtons}>
                        {['Débutant', 'Intermédiaire', 'Avancé', 'Expert'].map((level) => (
                          <TouchableOpacity
                            key={level}
                            style={[
                              styles.selectButton,
                              profileData.niveau === level && styles.selectButtonActive
                            ]}
                            onPress={() => updateProfileField('niveau', level)}
                          >
                            <Text style={[
                              styles.selectButtonText,
                              profileData.niveau === level && styles.selectButtonTextActive
                            ]}>
                              {level}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>

                    <View style={styles.selectContainer}>
                      <Text style={styles.selectLabel}>Objectif</Text>
                      <View style={styles.selectButtons}>
                        {['Force', 'Musculation', 'Endurance', 'Perte de poids'].map((goal) => (
                          <TouchableOpacity
                            key={goal}
                            style={[
                              styles.selectButton,
                              profileData.objectif === goal && styles.selectButtonActive
                            ]}
                            onPress={() => updateProfileField('objectif', goal)}
                          >
                            <Text style={[
                              styles.selectButtonText,
                              profileData.objectif === goal && styles.selectButtonTextActive
                            ]}>
                              {goal}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>

                    {/* Jours d'entraînement */}
                    <Text style={styles.sectionTitle}>Jours d'entraînement</Text>
                    <View style={styles.daysContainer}>
                      {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((day) => (
                        <TouchableOpacity
                          key={day}
                          style={[
                            styles.dayButton,
                            profileData.trainingDays.includes(day) && styles.dayButtonActive
                          ]}
                          onPress={() => toggleTrainingDay(day)}
                        >
                          <Text style={[
                                styles.dayButtonText,
                                profileData.trainingDays.includes(day) && styles.dayButtonTextActive
                              ]}>
                            {day.slice(0, 3)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    {/* Records personnels */}
                    <Text style={styles.sectionTitle}>Records personnels (kg)</Text>
                    
                    <View style={styles.rowContainer}>
                      <View style={[styles.inputContainer, styles.halfInput]}>
                        <Ionicons name="barbell-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                          style={styles.input}
                          placeholder="Squat"
                          placeholderTextColor="#999"
                          keyboardType="numeric"
                          value={profileData.maxSquat.toString()}
                          onChangeText={(value) => updateProfileField('maxSquat', parseInt(value) || 100)}
                        />
                      </View>
                      <View style={[styles.inputContainer, styles.halfInput]}>
                        <Ionicons name="barbell-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                          style={styles.input}
                          placeholder="Développé"
                          placeholderTextColor="#999"
                          keyboardType="numeric"
                          value={profileData.maxBench.toString()}
                          onChangeText={(value) => updateProfileField('maxBench', parseInt(value) || 80)}
                        />
                      </View>
                    </View>

                    <View style={styles.inputContainer}>
                      <Ionicons name="barbell-outline" size={20} color="#666" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Soulevé de terre"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                        value={profileData.maxDeadlift.toString()}
                        onChangeText={(value) => updateProfileField('maxDeadlift', parseInt(value) || 120)}
                      />
                    </View>

                    <TouchableOpacity 
                      style={[styles.authButton, isLoading && styles.authButtonDisabled]} 
                      onPress={handleRegister}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <ActivityIndicator color="white" />
                      ) : (
                        <Text style={styles.authButtonText}>Créer mon compte</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  authToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    padding: 4,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: 'white',
  },
  toggleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#667eea',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 15,
  },
  loginForm: {
    // Styles spécifiques au formulaire de connexion
  },
  registerForm: {
    // Styles spécifiques au formulaire d'inscription
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 15,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 5,
  },
  authButton: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  authButtonDisabled: {
    opacity: 0.7,
  },
  authButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  selectContainer: {
    marginBottom: 20,
  },
  selectLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  selectButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectButton: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  selectButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  selectButtonTextActive: {
    color: 'white',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  dayButton: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minWidth: 50,
    alignItems: 'center',
  },
  dayButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  dayButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  dayButtonTextActive: {
    color: 'white',
  },
});
