import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { 
  Dumbbell, 
  Play, 
  Clock, 
  Target, 
  Zap,
  Calendar,
  CalendarDays,
  List,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Activity,
  Timer,
  Eye
} from 'lucide-react';

export const Programme: React.FC = () => {
  const { user } = useAuth();
  const [programme, setProgramme] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTab, setCurrentTab] = useState<'today' | 'weekly' | 'planning'>('today');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Charger le programme existant
  useEffect(() => {
    const savedProgramme = localStorage.getItem('userProgramme');
    if (savedProgramme) {
      try {
        setProgramme(JSON.parse(savedProgramme));
      } catch (error) {
        console.error('Erreur lors du chargement du programme:', error);
      }
    }
  }, []);

  // Fonction pour générer un programme personnalisé selon le profil
  const handleGenerateProgramme = () => {
    console.log('🔴 Bouton cliqué !');
    
    if (!user) {
      alert('❌ Vous devez être connecté');
      return;
    }
    
    setIsGenerating(true);
    
    // Simuler une génération
    setTimeout(() => {
      const userProfile = user;
      console.log('👤 Profil utilisateur COMPLET:', userProfile);
      console.log('👤 Clés disponibles:', Object.keys(userProfile));
      
      // Analyser le profil avec des valeurs par défaut
      const sportClass = userProfile.sportClass || userProfile.sport || 'classique';
      const level = userProfile.generalLevel || userProfile.level || 'intermediaire';
      const weight = userProfile.weight || 70;
      const age = userProfile.age || 25;
      const sex = userProfile.sex || 'male';
      const trainingDays = userProfile.trainingDays || ['lundi', 'mercredi', 'vendredi'];
      const trainingMonths = userProfile.trainingMonths || userProfile.duration || 3;
      
      console.log('📊 Données extraites:');
      console.log('- Classe sport:', sportClass);
      console.log('- Niveau:', level);
      console.log('- Poids:', weight);
      console.log('- Âge:', age);
      console.log('- Sexe:', sex);
      console.log('- Jours:', trainingDays);
      console.log('- Mois:', trainingMonths);
      
      // Vérifier les focus
      const focusAreas = [];
      if (userProfile.focus_pectoraux) focusAreas.push('Pectoraux');
      if (userProfile.focus_dorsaux) focusAreas.push('Dorsaux');
      if (userProfile.focus_quadriceps) focusAreas.push('Quadriceps');
      if (userProfile.focus_fessiers) focusAreas.push('Fessiers');
      if (userProfile.focus_epaules) focusAreas.push('Épaules');
      if (userProfile.focus_biceps) focusAreas.push('Biceps');
      if (userProfile.focus_triceps) focusAreas.push('Triceps');
      if (userProfile.focus_abdominaux) focusAreas.push('Abdominaux');
      if (userProfile.focus_ischio_jambiers) focusAreas.push('Ischio-jambiers');
      if (userProfile.focus_mollets) focusAreas.push('Mollets');
      if (userProfile.focus_avant_bras) focusAreas.push('Avant-bras');
      if (userProfile.focus_trapezes) focusAreas.push('Trapèzes');
      
      console.log('🎯 Focus détectés:', focusAreas);
      
      // Créer les sessions selon les jours sélectionnés
      let sessions = [];
      
      // Définir les exercices selon la classe de sport
      let exerciseTemplates = [];
      
      if (sportClass === 'power') {
        exerciseTemplates = [
          {
            nom: 'Séance Squat 5-3-1',
            exercises: [
              {
                id: 'ex-1',
                nom: 'Squat',
                categorie: 'Force',
                muscles: ['Quadriceps', 'Fessiers', 'Ischio-jambiers'],
                equipement: ['Barre', 'Rack'],
                progression: { 
                  sets: level === 'debutant' ? 3 : 4, 
                  reps: '5-3-1', 
                  poids: level === 'debutant' ? '65-75%' : level === 'intermediaire' ? '70-80%' : '75-85%', 
                  repos: level === 'debutant' ? '2-3min' : '3-4min' 
                },
                instructions: ['Position debout', 'Descendre lentement', 'Remonter explosivement'],
                conseils: `Powerlifting 5-3-1 pour ${sex} de ${weight}kg, ${age} ans, niveau ${level}`,
                variations: ['Squat goblet', 'Squat bulgare']
              },
              {
                id: 'ex-2',
                nom: 'Presse à Jambes',
                categorie: 'Force',
                muscles: ['Quadriceps', 'Fessiers'],
                equipement: ['Presse'],
                progression: { sets: 3, reps: '8-12', poids: '60-70%', repos: '2min' },
                instructions: ['Assis sur la presse', 'Pousser avec les jambes', 'Contrôler la descente'],
                conseils: 'Exercice complémentaire pour le squat',
                variations: ['Presse inclinée', 'Presse horizontale']
              },
              {
                id: 'ex-3',
                nom: 'Fentes',
                categorie: 'Force',
                muscles: ['Quadriceps', 'Fessiers'],
                equipement: ['Haltères'],
                progression: { sets: 3, reps: '10-12', poids: 'Poids du corps', repos: '90sec' },
                instructions: ['Position debout', 'Faire un grand pas', 'Descendre contrôlé'],
                conseils: 'Renforcement unilatéral',
                variations: ['Fentes bulgares', 'Fentes marchées']
              },
              {
                id: 'ex-4',
                nom: 'Planche',
                categorie: 'Gainage',
                muscles: ['Abdominaux', 'Épaules'],
                equipement: ['Aucun'],
                progression: { sets: 3, reps: '30-60sec', poids: 'Poids du corps', repos: '1min' },
                instructions: ['Position planche', 'Maintenir la position', 'Garder le corps droit'],
                conseils: 'Stabilité du tronc',
                variations: ['Planche latérale', 'Planche sur les coudes']
              }
            ],
            equipment: ['Barre', 'Rack', 'Presse', 'Haltères']
          },
          {
            nom: 'Séance Bench 5-3-1',
            exercises: [
              {
                id: 'ex-5',
                nom: 'Développé Couché',
                categorie: 'Force',
                muscles: ['Pectoraux', 'Triceps', 'Épaules'],
                equipement: ['Barre', 'Banc'],
                progression: { 
                  sets: level === 'debutant' ? 3 : 4, 
                  reps: '5-3-1', 
                  poids: level === 'debutant' ? '65-75%' : level === 'intermediaire' ? '70-80%' : '75-85%', 
                  repos: level === 'debutant' ? '2-3min' : '3-4min' 
                },
                instructions: ['Allongé sur le banc', 'Descendre contrôlé', 'Pousser explosivement'],
                conseils: `Développé 5-3-1 pour ${sex}, ${weight}kg, niveau ${level}`,
                variations: ['Développé incliné', 'Développé haltères']
              },
              {
                id: 'ex-6',
                nom: 'Dips',
                categorie: 'Calisthenics',
                muscles: ['Triceps', 'Pectoraux'],
                equipement: ['Barres parallèles'],
                progression: { sets: 3, reps: '8-12', poids: 'Poids du corps', repos: '2min' },
                instructions: ['Sur les barres', 'Descendre lentement', 'Remonter explosivement'],
                conseils: 'Renforcement des triceps',
                variations: ['Dips assistés', 'Dips lestés']
              },
              {
                id: 'ex-7',
                nom: 'Élévations Latérales',
                categorie: 'Force',
                muscles: ['Épaules'],
                equipement: ['Haltères'],
                progression: { sets: 3, reps: '12-15', poids: 'Léger', repos: '90sec' },
                instructions: ['Debout', 'Soulever latéralement', 'Contrôler la descente'],
                conseils: 'Isolation des épaules',
                variations: ['Élévations frontales', 'Élévations arrière']
              },
              {
                id: 'ex-8',
                nom: 'Pompes',
                categorie: 'Calisthenics',
                muscles: ['Pectoraux', 'Triceps'],
                equipement: ['Aucun'],
                progression: { sets: 3, reps: '10-20', poids: 'Poids du corps', repos: '90sec' },
                instructions: ['Position planche', 'Descendre contrôlé', 'Remonter explosivement'],
                conseils: 'Exercice complémentaire',
                variations: ['Pompes inclinées', 'Pompes déclinées']
              }
            ],
            equipment: ['Barre', 'Banc', 'Barres parallèles', 'Haltères']
          },
          {
            nom: 'Séance Deadlift 5-3-1',
            exercises: [
              {
                id: 'ex-9',
                nom: 'Soulevé de Terre',
                categorie: 'Force',
                muscles: ['Fessiers', 'Ischio-jambiers', 'Dorsaux', 'Trapèzes'],
                equipement: ['Barre'],
                progression: { 
                  sets: level === 'debutant' ? 3 : 4, 
                  reps: '5-3-1', 
                  poids: level === 'debutant' ? '65-75%' : level === 'intermediaire' ? '70-80%' : '75-85%', 
                  repos: level === 'debutant' ? '2-3min' : '3-4min' 
                },
                instructions: ['Barre au sol', 'Saisir large', 'Soulever en extension'],
                conseils: `Soulevé 5-3-1 pour ${sex} de ${weight}kg, niveau ${level}`,
                variations: ['Soulevé sumo', 'Soulevé roumain']
              },
              {
                id: 'ex-10',
                nom: 'Rowing',
                categorie: 'Force',
                muscles: ['Dorsaux', 'Biceps', 'Trapèzes'],
                equipement: ['Barre', 'Banc'],
                progression: { sets: 3, reps: '8-10', poids: '70-80%', repos: '2min' },
                instructions: ['Penché sur le banc', 'Tirer vers le ventre', 'Contrôler la descente'],
                conseils: 'Renforcement du dos',
                variations: ['Rowing haltères', 'Rowing T-bar']
              },
              {
                id: 'ex-11',
                nom: 'Tractions',
                categorie: 'Calisthenics',
                muscles: ['Dorsaux', 'Biceps'],
                equipement: ['Barre de traction'],
                progression: { sets: 3, reps: '5-10', poids: 'Poids du corps', repos: '2min' },
                instructions: ['Suspendu à la barre', 'Tirer jusqu\'au menton', 'Descendre contrôlé'],
                conseils: 'Exercice complémentaire',
                variations: ['Tractions assistées', 'Tractions lestées']
              },
              {
                id: 'ex-12',
                nom: 'Gainage',
                categorie: 'Gainage',
                muscles: ['Abdominaux', 'Dorsaux'],
                equipement: ['Aucun'],
                progression: { sets: 3, reps: '30-60sec', poids: 'Poids du corps', repos: '1min' },
                instructions: ['Position planche', 'Maintenir la position', 'Garder le corps droit'],
                conseils: 'Stabilité du tronc',
                variations: ['Gainage latéral', 'Gainage sur les coudes']
              }
            ],
            equipment: ['Barre', 'Banc', 'Barre de traction']
          }
        ];
      } else if (sportClass === 'crossfit') {
        exerciseTemplates = [
          {
            nom: 'Séance WOD Métabolique',
            exercises: [
              {
                id: 'ex-1',
                nom: 'Burpees',
                categorie: 'Cardio',
                muscles: ['Tout le corps'],
                equipement: ['Aucun'],
                progression: { sets: 4, reps: '10-15', poids: 'Poids du corps', repos: '1min' },
                instructions: ['Position debout', 'Squat + planche', 'Pompe + saut'],
                conseils: `WOD Crossfit pour ${level}, ${weight}kg`,
                variations: ['Burpees lestés', 'Burpees sans saut']
              },
              {
                id: 'ex-2',
                nom: 'Mountain Climbers',
                categorie: 'Cardio',
                muscles: ['Tout le corps'],
                equipement: ['Aucun'],
                progression: { sets: 3, reps: '20-30', poids: 'Poids du corps', repos: '90sec' },
                instructions: ['Position planche', 'Alterner les jambes', 'Maintenir le rythme'],
                conseils: 'Cardio haute intensité',
                variations: ['Mountain climbers lents', 'Mountain climbers rapides']
              },
              {
                id: 'ex-3',
                nom: 'Jumping Jacks',
                categorie: 'Cardio',
                muscles: ['Tout le corps'],
                equipement: ['Aucun'],
                progression: { sets: 3, reps: '30-50', poids: 'Poids du corps', repos: '1min' },
                instructions: ['Position debout', 'Sauter en écartant', 'Retour à la position'],
                conseils: 'Échauffement cardio',
                variations: ['Jumping jacks lents', 'Jumping jacks rapides']
              },
              {
                id: 'ex-4',
                nom: 'Planche',
                categorie: 'Gainage',
                muscles: ['Abdominaux', 'Épaules'],
                equipement: ['Aucun'],
                progression: { sets: 3, reps: '30-60sec', poids: 'Poids du corps', repos: '1min' },
                instructions: ['Position planche', 'Maintenir la position', 'Garder le corps droit'],
                conseils: 'Stabilité du tronc',
                variations: ['Planche latérale', 'Planche sur les coudes']
              }
            ],
            equipment: ['Aucun']
          },
          {
            nom: 'Séance WOD Force',
            exercises: [
              {
                id: 'ex-5',
                nom: 'Squat',
                categorie: 'Force',
                muscles: ['Quadriceps', 'Fessiers'],
                equipement: ['Barre', 'Rack'],
                progression: { sets: 4, reps: '8-12', poids: '70-80%', repos: '2-3min' },
                instructions: ['Position debout', 'Descendre lentement', 'Remonter explosivement'],
                conseils: `Squat Crossfit pour ${level}`,
                variations: ['Squat goblet', 'Squat bulgare']
              },
              {
                id: 'ex-6',
                nom: 'Développé Couché',
                categorie: 'Force',
                muscles: ['Pectoraux', 'Triceps'],
                equipement: ['Barre', 'Banc'],
                progression: { sets: 4, reps: '8-12', poids: '70-80%', repos: '2-3min' },
                instructions: ['Allongé sur le banc', 'Descendre contrôlé', 'Pousser explosivement'],
                conseils: 'Force des pectoraux',
                variations: ['Développé incliné', 'Développé haltères']
              },
              {
                id: 'ex-7',
                nom: 'Tractions',
                categorie: 'Calisthenics',
                muscles: ['Dorsaux', 'Biceps'],
                equipement: ['Barre de traction'],
                progression: { sets: 3, reps: '5-10', poids: 'Poids du corps', repos: '2min' },
                instructions: ['Suspendu à la barre', 'Tirer jusqu\'au menton', 'Descendre contrôlé'],
                conseils: 'Force des dorsaux',
                variations: ['Tractions assistées', 'Tractions lestées']
              },
              {
                id: 'ex-8',
                nom: 'Dips',
                categorie: 'Calisthenics',
                muscles: ['Triceps', 'Pectoraux'],
                equipement: ['Barres parallèles'],
                progression: { sets: 3, reps: '8-12', poids: 'Poids du corps', repos: '2min' },
                instructions: ['Sur les barres', 'Descendre lentement', 'Remonter explosivement'],
                conseils: 'Force des triceps',
                variations: ['Dips assistés', 'Dips lestés']
              }
            ],
            equipment: ['Barre', 'Rack', 'Banc', 'Barre de traction', 'Barres parallèles']
          },
          {
            nom: 'Séance WOD Mixte',
            exercises: [
              {
                id: 'ex-9',
                nom: 'Squat Thrust',
                categorie: 'Cardio',
                muscles: ['Tout le corps'],
                equipement: ['Aucun'],
                progression: { sets: 3, reps: '15-25', poids: 'Poids du corps', repos: '90sec' },
                instructions: ['Position debout', 'Squat + planche', 'Retour debout'],
                conseils: 'Cardio fonctionnel',
                variations: ['Squat thrust lents', 'Squat thrust rapides']
              },
              {
                id: 'ex-10',
                nom: 'Pompes',
                categorie: 'Calisthenics',
                muscles: ['Pectoraux', 'Triceps'],
                equipement: ['Aucun'],
                progression: { sets: 3, reps: '10-20', poids: 'Poids du corps', repos: '90sec' },
                instructions: ['Position planche', 'Descendre contrôlé', 'Remonter explosivement'],
                conseils: 'Force des pectoraux',
                variations: ['Pompes inclinées', 'Pompes déclinées']
              },
              {
                id: 'ex-11',
                nom: 'Squat',
                categorie: 'Force',
                muscles: ['Quadriceps', 'Fessiers'],
                equipement: ['Barre', 'Rack'],
                progression: { sets: 3, reps: '12-15', poids: '60-70%', repos: '2min' },
                instructions: ['Position debout', 'Descendre lentement', 'Remonter explosivement'],
                conseils: 'Endurance de force',
                variations: ['Squat goblet', 'Squat bulgare']
              },
              {
                id: 'ex-12',
                nom: 'Gainage',
                categorie: 'Gainage',
                muscles: ['Abdominaux', 'Dorsaux'],
                equipement: ['Aucun'],
                progression: { sets: 3, reps: '30-60sec', poids: 'Poids du corps', repos: '1min' },
                instructions: ['Position planche', 'Maintenir la position', 'Garder le corps droit'],
                conseils: 'Stabilité du tronc',
                variations: ['Gainage latéral', 'Gainage sur les coudes']
              }
            ],
            equipment: ['Barre', 'Rack']
          }
        ];
      } else if (sportClass === 'marathon') {
        exerciseTemplates = [
          {
            nom: 'Séance Course Longue',
            exercises: [
              {
                id: 'ex-1',
                nom: 'Course à Pied',
                categorie: 'Cardio',
                muscles: ['Jambes', 'Cardio'],
                equipement: ['Chaussures de course'],
                progression: { sets: 1, reps: level === 'debutant' ? '20min' : level === 'intermediaire' ? '30min' : '45min', poids: 'Allure modérée', repos: '5min' },
                instructions: ['Échauffement 5min', 'Course à allure modérée', 'Récupération 5min'],
                conseils: `Course longue adaptée pour ${level}, ${weight}kg`,
                variations: ['Course fractionnée', 'Course en côte']
              },
              {
                id: 'ex-2',
                nom: 'Étirements',
                categorie: 'Récupération',
                muscles: ['Tout le corps'],
                equipement: ['Aucun'],
                progression: { sets: 1, reps: '15min', poids: 'Poids du corps', repos: 'Aucun' },
                instructions: ['Étirements des jambes', 'Étirements du dos', 'Étirements des bras'],
                conseils: 'Récupération active',
                variations: ['Étirements dynamiques', 'Étirements statiques']
              }
            ],
            equipment: ['Chaussures de course']
          },
          {
            nom: 'Séance Renforcement',
            exercises: [
              {
                id: 'ex-3',
                nom: 'Squat',
                categorie: 'Force',
                muscles: ['Quadriceps', 'Fessiers'],
                equipement: ['Aucun'],
                progression: { sets: 3, reps: '15-20', poids: 'Poids du corps', repos: '90sec' },
                instructions: ['Position debout', 'Descendre lentement', 'Remonter explosivement'],
                conseils: `Renforcement pour ${level}`,
                variations: ['Squat goblet', 'Squat bulgare']
              },
              {
                id: 'ex-4',
                nom: 'Fentes',
                categorie: 'Force',
                muscles: ['Quadriceps', 'Fessiers'],
                equipement: ['Aucun'],
                progression: { sets: 3, reps: '12-15', poids: 'Poids du corps', repos: '90sec' },
                instructions: ['Position debout', 'Faire un grand pas', 'Descendre contrôlé'],
                conseils: 'Renforcement unilatéral',
                variations: ['Fentes bulgares', 'Fentes marchées']
              },
              {
                id: 'ex-5',
                nom: 'Planche',
                categorie: 'Gainage',
                muscles: ['Abdominaux', 'Épaules'],
                equipement: ['Aucun'],
                progression: { sets: 3, reps: '30-60sec', poids: 'Poids du corps', repos: '1min' },
                instructions: ['Position planche', 'Maintenir la position', 'Garder le corps droit'],
                conseils: 'Stabilité du tronc',
                variations: ['Planche latérale', 'Planche sur les coudes']
              },
              {
                id: 'ex-6',
                nom: 'Gainage',
                categorie: 'Gainage',
                muscles: ['Abdominaux', 'Dorsaux'],
                equipement: ['Aucun'],
                progression: { sets: 3, reps: '30-60sec', poids: 'Poids du corps', repos: '1min' },
                instructions: ['Position planche', 'Maintenir la position', 'Garder le corps droit'],
                conseils: 'Stabilité du tronc',
                variations: ['Gainage latéral', 'Gainage sur les coudes']
              }
            ],
            equipment: ['Aucun']
          },
          {
            nom: 'Séance Course Fractionnée',
            exercises: [
              {
                id: 'ex-7',
                nom: 'Course Fractionnée',
                categorie: 'Cardio',
                muscles: ['Jambes', 'Cardio'],
                equipement: ['Chaussures de course'],
                progression: { sets: 1, reps: level === 'debutant' ? '15min' : level === 'intermediaire' ? '25min' : '35min', poids: 'Allure élevée', repos: '5min' },
                instructions: ['Échauffement 5min', 'Intervalles rapides', 'Récupération 5min'],
                conseils: `Fractionné pour ${level}`,
                variations: ['Fractionné court', 'Fractionné long']
              },
              {
                id: 'ex-8',
                nom: 'Étirements',
                categorie: 'Récupération',
                muscles: ['Tout le corps'],
                equipement: ['Aucun'],
                progression: { sets: 1, reps: '10min', poids: 'Poids du corps', repos: 'Aucun' },
                instructions: ['Étirements des jambes', 'Étirements du dos', 'Étirements des bras'],
                conseils: 'Récupération active',
                variations: ['Étirements dynamiques', 'Étirements statiques']
              }
            ],
            equipment: ['Chaussures de course']
          }
        ];
      } else {
        // Programme Classique
        exerciseTemplates = [
          {
            nom: 'Séance Force',
            exercises: [
              {
                id: 'ex-1',
                nom: 'Squat',
                categorie: 'Force',
                muscles: ['Quadriceps', 'Fessiers'],
                equipement: ['Barre', 'Rack'],
                progression: { sets: 3, reps: '8-12', poids: '70-80%', repos: '2-3min' },
                instructions: ['Position debout', 'Descendre lentement', 'Remonter explosivement'],
                conseils: `Squat classique pour ${level}`,
                variations: ['Squat goblet', 'Squat bulgare']
              },
              {
                id: 'ex-2',
                nom: 'Développé Couché',
                categorie: 'Force',
                muscles: ['Pectoraux', 'Triceps'],
                equipement: ['Barre', 'Banc'],
                progression: { sets: 3, reps: '8-12', poids: '70-80%', repos: '2-3min' },
                instructions: ['Allongé sur le banc', 'Descendre contrôlé', 'Pousser explosivement'],
                conseils: 'Développé classique',
                variations: ['Développé incliné', 'Développé haltères']
              },
              {
                id: 'ex-3',
                nom: 'Soulevé de Terre',
                categorie: 'Force',
                muscles: ['Fessiers', 'Ischio-jambiers', 'Dorsaux'],
                equipement: ['Barre'],
                progression: { sets: 3, reps: '5-8', poids: '80-90%', repos: '3-4min' },
                instructions: ['Barre au sol', 'Saisir large', 'Soulever en extension'],
                conseils: 'Soulevé classique',
                variations: ['Soulevé sumo', 'Soulevé roumain']
              },
              {
                id: 'ex-4',
                nom: 'Tractions',
                categorie: 'Calisthenics',
                muscles: ['Dorsaux', 'Biceps'],
                equipement: ['Barre de traction'],
                progression: { sets: 3, reps: '5-10', poids: 'Poids du corps', repos: '2min' },
                instructions: ['Suspendu à la barre', 'Tirer jusqu\'au menton', 'Descendre contrôlé'],
                conseils: 'Tractions classiques',
                variations: ['Tractions assistées', 'Tractions lestées']
              }
            ],
            equipment: ['Barre', 'Rack', 'Banc', 'Barre de traction']
          },
          {
            nom: 'Séance Cardio',
            exercises: [
              {
                id: 'ex-5',
                nom: 'Course à Pied',
                categorie: 'Cardio',
                muscles: ['Jambes', 'Cardio'],
                equipement: ['Chaussures de course'],
                progression: { sets: 1, reps: level === 'debutant' ? '20min' : level === 'intermediaire' ? '30min' : '45min', poids: 'Allure modérée', repos: '5min' },
                instructions: ['Échauffement 5min', 'Course à allure modérée', 'Récupération 5min'],
                conseils: `Cardio pour ${level}`,
                variations: ['Course fractionnée', 'Course en côte']
              },
              {
                id: 'ex-6',
                nom: 'Burpees',
                categorie: 'Cardio',
                muscles: ['Tout le corps'],
                equipement: ['Aucun'],
                progression: { sets: 3, reps: '10-15', poids: 'Poids du corps', repos: '1min' },
                instructions: ['Position debout', 'Squat + planche', 'Pompe + saut'],
                conseils: 'Cardio haute intensité',
                variations: ['Burpees lestés', 'Burpees sans saut']
              },
              {
                id: 'ex-7',
                nom: 'Jumping Jacks',
                categorie: 'Cardio',
                muscles: ['Tout le corps'],
                equipement: ['Aucun'],
                progression: { sets: 3, reps: '30-50', poids: 'Poids du corps', repos: '1min' },
                instructions: ['Position debout', 'Sauter en écartant', 'Retour à la position'],
                conseils: 'Échauffement cardio',
                variations: ['Jumping jacks lents', 'Jumping jacks rapides']
              }
            ],
            equipment: ['Chaussures de course']
          },
          {
            nom: 'Séance Force',
            exercises: [
              {
                id: 'ex-8',
                nom: 'Squat',
                categorie: 'Force',
                muscles: ['Quadriceps', 'Fessiers'],
                equipement: ['Barre', 'Rack'],
                progression: { sets: 4, reps: '6-8', poids: '75-85%', repos: '3-4min' },
                instructions: ['Position debout', 'Descendre lentement', 'Remonter explosivement'],
                conseils: 'Progression cette semaine',
                variations: ['Squat goblet', 'Squat bulgare']
              },
              {
                id: 'ex-9',
                nom: 'Développé Couché',
                categorie: 'Force',
                muscles: ['Pectoraux', 'Triceps'],
                equipement: ['Barre', 'Banc'],
                progression: { sets: 4, reps: '6-8', poids: '75-85%', repos: '3-4min' },
                instructions: ['Allongé sur le banc', 'Descendre contrôlé', 'Pousser explosivement'],
                conseils: 'Progression cette semaine',
                variations: ['Développé incliné', 'Développé haltères']
              },
              {
                id: 'ex-10',
                nom: 'Soulevé de Terre',
                categorie: 'Force',
                muscles: ['Fessiers', 'Ischio-jambiers', 'Dorsaux'],
                equipement: ['Barre'],
                progression: { sets: 4, reps: '3-5', poids: '85-95%', repos: '4-5min' },
                instructions: ['Barre au sol', 'Saisir large', 'Soulever en extension'],
                conseils: 'Charge maximale cette semaine',
                variations: ['Soulevé sumo', 'Soulevé roumain']
              },
              {
                id: 'ex-11',
                nom: 'Rowing',
                categorie: 'Force',
                muscles: ['Dorsaux', 'Biceps'],
                equipement: ['Barre', 'Banc'],
                progression: { sets: 3, reps: '8-10', poids: '70-80%', repos: '2-3min' },
                instructions: ['Penché sur le banc', 'Tirer vers le ventre', 'Contrôler la descente'],
                conseils: 'Renforcement du dos',
                variations: ['Rowing haltères', 'Rowing T-bar']
              }
            ],
            equipment: ['Barre', 'Rack', 'Banc']
          }
        ];
      }
      
      // Créer les sessions selon les jours sélectionnés
      sessions = trainingDays.map((day, index) => {
        const template = exerciseTemplates[index % exerciseTemplates.length];
        return {
          id: `session-${index + 1}`,
          nom: template.nom,
          day: day,
          phase: 'Adaptation',
          intensity: level === 'debutant' ? 'Faible' : level === 'intermediaire' ? 'Modérée' : 'Élevée',
          duration: level === 'debutant' ? 45 : level === 'intermediaire' ? 60 : 75,
          exercises: template.exercises,
          notes: `Programme ${sportClass} adapté pour ${level}, ${trainingMonths} mois d'entraînement`,
          equipment: template.equipment
        };
      });
      
      console.log('📅 Sessions créées:', sessions.map(s => ({ day: s.day, nom: s.nom })));
      
      const personalizedProgramme = {
        id: 'personalized-programme',
        nom: `Programme ${sportClass} - ${level}`,
        sessions: sessions,
        userProfile: {
          sportClass,
          level,
          weight,
          age,
          sex,
          trainingDays,
          trainingMonths,
          focusAreas
        }
      };
      
      localStorage.setItem('userProgramme', JSON.stringify(personalizedProgramme));
      setProgramme(personalizedProgramme);
      setIsGenerating(false);
      
      alert(`🎉 Programme ${sportClass} généré avec succès ! Adapté pour ${level}, ${weight}kg, ${age} ans, ${sex}. ${sessions.length} séances sur ${trainingDays.join(', ')}. Focus: ${focusAreas.join(', ') || 'Aucun'}`);
    }, 2000);
  };

  // Fonction pour régénérer
  const handleRegenerateProgramme = () => {
    const confirmRegenerate = confirm('🔄 Voulez-vous régénérer votre programme ?');
    if (confirmRegenerate) {
      handleGenerateProgramme();
    }
  };

  // Obtenir la session d'aujourd'hui
  const getTodaysSession = () => {
    if (!programme) return null;
    
    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const today = days[new Date().getDay()];
    
    return programme.sessions.find((session: any) => session.day === today);
  };

  const todaySession = getTodaysSession();

  // Fonction pour générer le calendrier
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const calendar = [];
    let currentDate = new Date(startDate);
    
    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        weekDays.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      calendar.push(weekDays);
      
      if (currentDate.getMonth() !== month && week > 3) break;
    }
    
    return calendar;
  };

  // Fonction pour obtenir le nom du jour
  const getDayName = (dayIndex: number) => {
    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    return days[dayIndex];
  };

  // Fonction pour vérifier si c'est aujourd'hui
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Fonction pour vérifier si c'est le mois actuel
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  // Fonction pour obtenir la session d'une date
  const getSessionForDate = (date: Date) => {
    if (!programme) return null;
    
    const dayName = getDayName(date.getDay());
    return programme.sessions.find((session: any) => session.day === dayName);
  };

  // Fonction pour obtenir le nom du mois
  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { month: 'long' });
  };

  const calendar = generateCalendar();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Header Principal */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 p-8 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">🏋️ Mon Programme</h1>
                <p className="text-xl text-blue-100">Programme personnalisé selon votre profil</p>
              </div>
              <div className="flex gap-3">
                {programme && (
                  <Button 
                    onClick={handleRegenerateProgramme}
                    disabled={isGenerating}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Mise à jour...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Mise à jour
                      </>
                    )}
                  </Button>
                )}
                <Button 
                  onClick={handleGenerateProgramme}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Génération...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Générer Mon Programme
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Message si pas de programme */}
        {!programme && (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🏋️</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun Programme Généré</h3>
              <p className="text-gray-500 mb-6">Générez votre programme personnalisé pour commencer votre entraînement !</p>
              <Button 
                onClick={handleGenerateProgramme}
                disabled={isGenerating}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Génération...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Générer Mon Programme
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Programme Généré */}
        {programme && (
          <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as any)} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="today" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Aujourd'hui
              </TabsTrigger>
              <TabsTrigger value="weekly" className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                Hebdomadaire
              </TabsTrigger>
              <TabsTrigger value="planning" className="flex items-center gap-2">
                <List className="w-4 h-4" />
                Planning
              </TabsTrigger>
            </TabsList>

            {/* Onglet Aujourd'hui */}
            <TabsContent value="today">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-blue-500" />
                    Programme du Jour
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {todaySession ? (
                    <div className="space-y-6">
                      {/* Informations de la session */}
                      <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200/50">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-800">{todaySession.nom}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                              {todaySession.intensity}
                            </Badge>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              {todaySession.duration} min
                            </Badge>
                            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
                              {todaySession.phase}
                            </Badge>
                          </div>
                        </div>
                        
                        {todaySession.notes && (
                          <div className="p-3 bg-blue-50 rounded-lg mb-4">
                            <p className="text-sm text-blue-800"><strong>Notes:</strong> {todaySession.notes}</p>
                          </div>
                        )}

                        {todaySession.equipment && todaySession.equipment.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Équipement requis:</p>
                            <div className="flex flex-wrap gap-2">
                              {todaySession.equipment.map((eq: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-gray-600">{eq}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Exercices */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-800">Exercices ({todaySession.exercises.length})</h4>
                        {todaySession.exercises.map((exercise: any, index: number) => (
                          <Card key={exercise.id} className="bg-white/60 backdrop-blur-sm border border-gray-200">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">{exercise.nom}</CardTitle>
                                <Badge variant="outline">{exercise.categorie}</Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div className="text-center p-2 bg-gray-50 rounded">
                                    <p className="text-sm text-gray-600">Séries</p>
                                    <p className="font-bold text-gray-800">{exercise.progression.sets}</p>
                                  </div>
                                  <div className="text-center p-2 bg-gray-50 rounded">
                                    <p className="text-sm text-gray-600">Reps</p>
                                    <p className="font-bold text-gray-800">{exercise.progression.reps}</p>
                                  </div>
                                  <div className="text-center p-2 bg-gray-50 rounded">
                                    <p className="text-sm text-gray-600">Poids</p>
                                    <p className="font-bold text-gray-800">{exercise.progression.poids}</p>
                                  </div>
                                  <div className="text-center p-2 bg-gray-50 rounded">
                                    <p className="text-sm text-gray-600">Repos</p>
                                    <p className="font-bold text-gray-800">{exercise.progression.repos}</p>
                                  </div>
                                </div>
                                
                                <div className="text-sm text-gray-600">
                                  <p><strong>Muscles:</strong> {exercise.muscles.join(', ')}</p>
                                  <p><strong>Équipement:</strong> {exercise.equipement.join(', ')}</p>
                                </div>
                                
                                {exercise.conseils && (
                                  <div className="p-3 bg-yellow-50 rounded-lg">
                                    <p className="text-sm text-yellow-800"><strong>Conseil:</strong> {exercise.conseils}</p>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <RefreshCw className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Jour de Repos</h3>
                      <p className="text-gray-600 mb-6">Profitez de cette journée pour récupérer et vous détendre.</p>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          💡 <strong>Conseil:</strong> La récupération est essentielle pour progresser. 
                          Vous pouvez faire des étirements légers ou une marche.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Hebdomadaire */}
            <TabsContent value="weekly">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                    <CalendarDays className="w-6 h-6 text-green-500" />
                    Planning Hebdomadaire
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'].map(day => {
                      const daySession = programme.sessions.find((s: any) => s.day === day);
                      return (
                        <Card key={day} className={`${daySession ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'} border-2`}>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg capitalize">{day}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {daySession ? (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="bg-green-100 text-green-800">
                                    {daySession.intensity}
                                  </Badge>
                                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                    {daySession.duration}min
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600">
                                  <strong>{daySession.exercises.length}</strong> exercices
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong>Phase:</strong> {daySession.phase}
                                </p>
                                <div className="text-xs text-gray-500">
                                  {daySession.exercises.slice(0, 2).map((ex: any) => ex.nom).join(', ')}
                                  {daySession.exercises.length > 2 && '...'}
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-4">
                                <RefreshCw className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">Repos</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Planning */}
            <TabsContent value="planning">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-purple-500" />
                    Planning Mensuel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {programme ? (
                    <div className="space-y-6">
                      {/* Navigation du calendrier */}
                      <div className="flex items-center justify-between mb-6">
                        <Button 
                          variant="outline" 
                          onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                          className="hover:bg-purple-50 hover:border-purple-300"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <h2 className="text-xl font-bold text-gray-800">
                          {getMonthName(currentMonth)} {currentMonth.getFullYear()}
                        </h2>
                        <Button 
                          variant="outline" 
                          onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                          className="hover:bg-purple-50 hover:border-purple-300"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Stats du programme */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <Activity className="w-6 h-6 text-blue-200" />
                              <div>
                                <p className="text-xl font-bold">{programme.sessions.length}</p>
                                <p className="text-sm text-blue-200">Sessions/Semaine</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <Timer className="w-6 h-6 text-green-200" />
                              <div>
                                <p className="text-xl font-bold">{Math.round(programme.sessions.reduce((acc: number, session: any) => acc + session.duration, 0) / programme.sessions.length)}</p>
                                <p className="text-sm text-green-200">Min/Session</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <Target className="w-6 h-6 text-purple-200" />
                              <div>
                                <p className="text-xl font-bold">{programme.userProfile?.sportClass || 'N/A'}</p>
                                <p className="text-sm text-purple-200">Classe Sport</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* En-têtes des jours */}
                      <div className="grid grid-cols-7 gap-2 mb-4">
                        {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
                          <div key={day} className="text-center text-sm font-bold text-gray-700 p-3 bg-gray-100 rounded-lg">
                            {day}
                          </div>
                        ))}
                      </div>
                      
                      {/* Grille du calendrier */}
                      <div className="grid grid-cols-7 gap-2">
                        {calendar.map((week, weekIndex) =>
                          week.map((date, dayIndex) => {
                            const dayName = getDayName(dayIndex);
                            const sessionForDate = getSessionForDate(date);
                            const isCurrentMonthDay = isCurrentMonth(date);
                            const isTodayDate = isToday(date);
                            
                            return (
                              <div
                                key={`${weekIndex}-${dayIndex}`}
                                className={`
                                  min-h-[120px] p-3 rounded-xl border-2 transition-all duration-200
                                  ${isCurrentMonthDay ? 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-md' : 'bg-gray-50 border-gray-100'}
                                  ${isTodayDate ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-300' : ''}
                                `}
                              >
                                {/* Numéro du jour */}
                                <div className="flex items-center justify-between mb-2">
                                  <span className={`text-lg font-bold ${isCurrentMonthDay ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {date.getDate()}
                                  </span>
                                  {isTodayDate && (
                                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                  )}
                                </div>
                                
                                {/* Session du jour */}
                                <div className="space-y-1">
                                  {sessionForDate ? (
                                    <div
                                      className={`
                                        text-xs p-2 rounded-lg text-white font-medium shadow-sm cursor-pointer
                                        ${sessionForDate.phase === 'Adaptation' ? 'bg-gradient-to-r from-green-500 to-green-600' : 
                                          sessionForDate.phase === 'Progression' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 
                                          'bg-gradient-to-r from-red-500 to-red-600'}
                                        hover:scale-105 transition-transform duration-200
                                      `}
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="truncate">{sessionForDate.nom}</span>
                                        <Eye className="w-3 h-3 opacity-90" />
                                      </div>
                                      <div className="text-xs opacity-90 mt-1">
                                        {sessionForDate.duration}min • {sessionForDate.intensity}
                                      </div>
                                    </div>
                                  ) : (
                                    isCurrentMonthDay && (
                                      <div className="text-xs text-gray-400 text-center py-3 bg-gray-50 rounded-lg">
                                        <RefreshCw className="w-4 h-4 mx-auto mb-1" />
                                        Repos
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                      
                      {/* Légende */}
                      <div className="flex items-center justify-center gap-8 pt-6 border-t border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded-lg"></div>
                          <span className="text-sm font-medium text-gray-700">Adaptation</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg"></div>
                          <span className="text-sm font-medium text-gray-700">Progression</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-lg"></div>
                          <span className="text-sm font-medium text-gray-700">Spécialisation</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-gray-700">Aujourd'hui</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Calendar className="w-16 h-16 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">Aucun Programme</h3>
                      <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Générez un programme personnalisé pour voir votre calendrier d'entraînement avec toutes vos sessions.
                      </p>
                      <Button 
                        onClick={handleGenerateProgramme} 
                        disabled={isGenerating}
                        className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-3 text-lg"
                      >
                        {isGenerating ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Génération...
                          </>
                        ) : (
                          <>
                            <Play className="w-5 h-5 mr-3" />
                            Générer Programme
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Programme;