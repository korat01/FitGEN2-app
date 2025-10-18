import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem('userEmail');
      const isLoggedInStatus = await AsyncStorage.getItem('isLoggedIn');
      
      if (savedEmail && isLoggedInStatus === 'true') {
        setIsLoggedIn(true);
        setUserName(savedEmail.split('@')[0]); // Utiliser la partie avant @ comme nom
      } else {
        // Rediriger vers le login si pas connecté
        router.replace('/login');
      }
    } catch (error) {
      console.log('Erreur lors de la vérification:', error);
      router.replace('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.removeItem('userPassword');
      await AsyncStorage.removeItem('isLoggedIn');
      router.replace('/login');
    } catch (error) {
      console.log('Erreur lors de la déconnexion:', error);
    }
  };

  if (!isLoggedIn) {
    return null; // Ou un loader
  }

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
            <View style={styles.headerTop}>
              <View>
                <Text style={styles.greeting}>Bonjour,</Text>
                <Text style={styles.userName}>{userName}</Text>
              </View>
              <TouchableOpacity style={styles.profileButton} onPress={handleLogout}>
                <Ionicons name="person-circle-outline" size={32} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Ionicons name="fitness" size={24} color="#667eea" />
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Séances</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="flame" size={24} color="#ff6b6b" />
                <Text style={styles.statNumber}>2,847</Text>
                <Text style={styles.statLabel}>Calories</Text>
              </View>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Ionicons name="time" size={24} color="#4ecdc4" />
                <Text style={styles.statNumber}>8h 30m</Text>
                <Text style={styles.statLabel}>Temps</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="trophy" size={24} color="#ffd93d" />
                <Text style={styles.statNumber}>5</Text>
                <Text style={styles.statLabel}>Objectifs</Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsContainer}>
            <Text style={styles.sectionTitle}>Actions Rapides</Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity 
                style={styles.quickActionCard}
                onPress={() => router.push('/exercises')}
              >
                <LinearGradient
                  colors={['#ff6b6b', '#ee5a52']}
                  style={styles.quickActionGradient}
                >
                  <Ionicons name="play-circle" size={32} color="white" />
                  <Text style={styles.quickActionText}>Commencer</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickActionCard}>
                <LinearGradient
                  colors={['#4ecdc4', '#44a08d']}
                  style={styles.quickActionGradient}
                >
                  <Ionicons name="calendar" size={32} color="white" />
                  <Text style={styles.quickActionText}>Programme</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickActionCard}>
                <LinearGradient
                  colors={['#a8edea', '#fed6e3']}
                  style={styles.quickActionGradient}
                >
                  <Ionicons name="bar-chart" size={32} color="#333" />
                  <Text style={[styles.quickActionText, { color: '#333' }]}>Progrès</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickActionCard}>
                <LinearGradient
                  colors={['#ffd93d', '#ff6b6b']}
                  style={styles.quickActionGradient}
                >
                  <Ionicons name="trophy" size={32} color="white" />
                  <Text style={styles.quickActionText}>Objectifs</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Today's Workout */}
          <View style={styles.todayWorkoutContainer}>
            <Text style={styles.sectionTitle}>Séance d'Aujourd'hui</Text>
            <View style={styles.workoutCard}>
              <View style={styles.workoutHeader}>
                <View style={styles.workoutIcon}>
                  <Ionicons name="barbell" size={24} color="#667eea" />
                </View>
                <View style={styles.workoutInfo}>
                  <Text style={styles.workoutTitle}>Powerlifting - Cycle 1</Text>
                  <Text style={styles.workoutSubtitle}>Squat + Bench Press</Text>
                </View>
                <TouchableOpacity 
                  style={styles.startButton}
                  onPress={() => router.push('/exercises')}
                >
                  <Ionicons name="play" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.workoutStats}>
                <View style={styles.workoutStat}>
                  <Text style={styles.workoutStatNumber}>8</Text>
                  <Text style={styles.workoutStatLabel}>Exercices</Text>
                </View>
                <View style={styles.workoutStat}>
                  <Text style={styles.workoutStatNumber}>75</Text>
                  <Text style={styles.workoutStatLabel}>Minutes</Text>
                </View>
                <View style={styles.workoutStat}>
                  <Text style={styles.workoutStatNumber}>450</Text>
                  <Text style={styles.workoutStatLabel}>Calories</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.recentActivityContainer}>
            <Text style={styles.sectionTitle}>Activité Récente</Text>
            <View style={styles.activityList}>
              <View style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons name="checkmark-circle" size={20} color="#4ecdc4" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Séance terminée</Text>
                  <Text style={styles.activitySubtitle}>Powerlifting - Deadlift</Text>
                </View>
                <Text style={styles.activityTime}>Il y a 2h</Text>
              </View>
              
              <View style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons name="trophy" size={20} color="#ffd93d" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Objectif atteint</Text>
                  <Text style={styles.activitySubtitle}>3 séances cette semaine</Text>
                </View>
                <Text style={styles.activityTime}>Hier</Text>
              </View>
              
              <View style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons name="trending-up" size={20} color="#ff6b6b" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Nouveau record</Text>
                  <Text style={styles.activitySubtitle}>Squat: 150kg</Text>
                </View>
                <Text style={styles.activityTime}>Il y a 3 jours</Text>
              </View>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileButton: {
    padding: 8,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: (width - 60) / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 2,
    height: 100,
    marginBottom: 15,
    borderRadius: 16,
    overflow: 'hidden',
  },
  quickActionGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  quickActionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  todayWorkoutContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  workoutCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  workoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  workoutIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  workoutSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  startButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  workoutStat: {
    alignItems: 'center',
  },
  workoutStatNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  workoutStatLabel: {
    fontSize: 12,
    color: '#666',
  },
  recentActivityContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  activityList: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#666',
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
});
