import { createContext, useContext, useState, useCallback, useMemo, useEffect, ReactNode } from 'react';

export type Language = 'fr' | 'en';

type Translations = {
  [key: string]: {
    fr: string;
    en: string;
  };
};

const STORAGE_KEY = 'ascend-language';

// Dictionnaire organisé par page/composant (préfixe avant le premier point). t(key) retombe sur la
// clé elle-même si absente, donc un texte oublié reste visible (en français) plutôt que de casser
// l'affichage — pratique pour étendre la couverture progressivement sans tout bloquer.
const translations: Translations = {
  // Navigation (barre du bas)
  'nav.home': { fr: 'Accueil', en: 'Home' },
  'nav.programme': { fr: 'Programme', en: 'Program' },
  'nav.coaching': { fr: 'Coaching', en: 'Coaching' },
  'nav.nutrition': { fr: 'Nutrition', en: 'Nutrition' },
  'nav.stats': { fr: 'Stats', en: 'Stats' },
  'nav.profile': { fr: 'Profil', en: 'Profile' },

  // Libellés communs réutilisés partout
  'common.save': { fr: 'Sauvegarder', en: 'Save' },
  'common.cancel': { fr: 'Annuler', en: 'Cancel' },
  'common.edit': { fr: 'Modifier', en: 'Edit' },
  'common.delete': { fr: 'Supprimer', en: 'Delete' },
  'common.close': { fr: 'Fermer', en: 'Close' },
  'common.back': { fr: 'Retour', en: 'Back' },
  'common.loading': { fr: 'Chargement...', en: 'Loading...' },
  'common.add': { fr: 'Ajouter', en: 'Add' },
  'common.search': { fr: 'Rechercher', en: 'Search' },
  'common.male': { fr: 'Homme', en: 'Male' },
  'common.female': { fr: 'Femme', en: 'Female' },
  'common.notDefined': { fr: 'Non défini', en: 'Not set' },
  'common.years': { fr: 'ans', en: 'years' },
  'common.months': { fr: 'mois', en: 'months' },
  'common.days': { fr: 'jours', en: 'days' },
  'common.today': { fr: 'Aujourd\'hui', en: 'Today' },
  'common.week': { fr: 'Semaine', en: 'Week' },
  'common.month': { fr: 'Mois', en: 'Month' },

  // Écran de verrouillage paysage (App.tsx)
  'landscape.title': { fr: 'Tourne ton téléphone', en: 'Rotate your phone' },
  'landscape.subtitle': { fr: 'Ascend est optimisé pour un usage en mode portrait.', en: 'Ascend is optimized for portrait use.' },

  // Page 404
  'notfound.code': { fr: '404', en: '404' },
  'notfound.title': { fr: 'Page non trouvée', en: 'Page not found' },
  'notfound.message': { fr: 'Désolé, la page que vous recherchez n\'existe pas ou a été déplacée.', en: 'Sorry, the page you are looking for does not exist or has been moved.' },
  'notfound.back': { fr: 'Retour', en: 'Back' },
  'notfound.home': { fr: 'Accueil', en: 'Home' },

  // Page Login (création de profil)
  'login.title': { fr: 'Créer votre Profil', en: 'Create your Profile' },
  'login.subtitle': { fr: 'Commence ton ascension avec Ascend', en: 'Start your ascent with Ascend' },
  'login.name': { fr: 'Nom complet *', en: 'Full name *' },
  'login.namePlaceholder': { fr: 'Votre nom', en: 'Your name' },
  'login.email': { fr: 'Email *', en: 'Email *' },
  'login.password': { fr: 'Mot de passe *', en: 'Password *' },
  'login.passwordPlaceholder': { fr: 'Votre mot de passe', en: 'Your password' },
  'login.personalInfo': { fr: 'Informations personnelles', en: 'Personal information' },
  'login.personalInfoHint': { fr: 'Modifiables à tout moment depuis ton profil.', en: 'Editable anytime from your profile.' },
  'login.weight': { fr: 'Poids (kg)', en: 'Weight (kg)' },
  'login.height': { fr: 'Taille (cm)', en: 'Height (cm)' },
  'login.age': { fr: 'Âge', en: 'Age' },
  'login.sex': { fr: 'Sexe', en: 'Sex' },
  'login.sportType': { fr: 'Type de sport', en: 'Sport type' },
  'login.submitting': { fr: 'Création en cours...', en: 'Creating...' },
  'login.submit': { fr: 'Créer mon Profil', en: 'Create my Profile' },
  'login.sport.classique': { fr: 'Classique', en: 'General fitness' },
  'login.sport.crossfit': { fr: 'CrossFit', en: 'CrossFit' },
  'login.sport.power': { fr: 'Powerlifting', en: 'Powerlifting' },
  'login.sport.marathon': { fr: 'Marathon', en: 'Marathon' },
  'login.sport.calisthenics': { fr: 'Calisthenics', en: 'Calisthenics' },
  'login.sport.sprint': { fr: 'Sprint', en: 'Sprint' },
  'login.sport.streetlifting': { fr: 'Streetlifting', en: 'Streetlifting' },

  // Dashboard
  'dashboard.loading': { fr: 'Chargement...', en: 'Loading...' },
  'dashboard.greeting': { fr: 'Bonjour', en: 'Hello' },
  'dashboard.recalculate': { fr: 'Recalculer', en: 'Recalculate' },
  'dashboard.performances': { fr: 'Performances', en: 'Performances' },
  'dashboard.progressTo': { fr: 'Progression vers le rang', en: 'Progress toward rank' },
  'dashboard.towardRank': { fr: 'vers le rang', en: 'toward rank' },
  'dashboard.weight': { fr: 'Poids', en: 'Weight' },
  'dashboard.age': { fr: 'Âge', en: 'Age' },
  'dashboard.sport': { fr: 'Sport', en: 'Sport' },
  'dashboard.achievements': { fr: 'Achievements', en: 'Achievements' },
  'dashboard.badge.beginner': { fr: 'Débutant', en: 'Beginner' },
  'dashboard.badge.regular': { fr: 'Régulier', en: 'Regular' },
  'dashboard.badge.confirmed': { fr: 'Confirmé', en: 'Confirmed' },
  'dashboard.badge.expert': { fr: 'Expert', en: 'Expert' },
  'dashboard.badge.legend': { fr: 'Légende', en: 'Legend' },
  'dashboard.weeklyProgress': { fr: 'Progression hebdomadaire', en: 'Weekly progress' },
  'dashboard.quickActions.progress.title': { fr: 'Ma progression', en: 'My progress' },
  'dashboard.quickActions.progress.desc': { fr: 'Records, graphiques et classement', en: 'Records, charts and ranking' },
  'dashboard.quickActions.programme.title': { fr: 'Mon Programme', en: 'My Program' },
  'dashboard.quickActions.programme.desc': { fr: 'Gérer mes entraînements', en: 'Manage my workouts' },
  'dashboard.quickActions.nutrition.title': { fr: 'Nutrition', en: 'Nutrition' },
  'dashboard.quickActions.nutrition.desc': { fr: 'Aliments, repas et objectifs', en: 'Foods, meals and goals' },
  'dashboard.quickActions.profile.title': { fr: 'Mon Profil', en: 'My Profile' },
  'dashboard.quickActions.profile.desc': { fr: 'Modifier mes informations', en: 'Edit my information' },
  'dashboard.mainStat.bestTotal': { fr: 'Meilleur Total', en: 'Best Total' },
  'dashboard.mainStat.bestTotalStreet': { fr: 'Meilleur Total Street', en: 'Best Street Total' },
  'dashboard.mainStat.best100m': { fr: 'Meilleur 100m', en: 'Best 100m' },
  'dashboard.mainStat.bestMarathon': { fr: 'Meilleur Marathon', en: 'Best Marathon' },
  'dashboard.mainStat.bestDistance': { fr: 'Meilleure Distance', en: 'Best Distance' },
  'dashboard.mainStat.bestPerf': { fr: 'Meilleure Perf', en: 'Best Performance' },
  'dashboard.mainStat.bestPullups': { fr: 'Meilleures Tractions', en: 'Best Pull-ups' },
  'dashboard.mainStat.globalScore': { fr: 'Score Global', en: 'Global Score' },
  'dashboard.mainStat.generalPerf': { fr: 'Performance générale', en: 'Overall performance' },
  'dashboard.mainStat.recordTime': { fr: 'Temps record', en: 'Record time' },
  'dashboard.mainStat.in30min': { fr: 'En 30 minutes', en: 'In 30 minutes' },
  'dashboard.mainStat.oneSet': { fr: 'En une série', en: 'In one set' },

  // Profil
  'profile.notFound.title': { fr: 'Profil non trouvé', en: 'Profile not found' },
  'profile.notFound.message': { fr: 'Veuillez vous connecter pour accéder à votre profil.', en: 'Please log in to access your profile.' },
  'profile.rank': { fr: 'Rang', en: 'Rank' },
  'profile.focus.title': { fr: 'Mes Zones de Focus', en: 'My Focus Areas' },
  'profile.focus.subtitle': { fr: 'Sélectionnez les zones que vous voulez travailler en priorité', en: 'Select the areas you want to prioritize' },
  'profile.focus.muscleGroups': { fr: 'Groupes musculaires', en: 'Muscle groups' },
  'profile.focus.specialized': { fr: 'Focus spécialisés', en: 'Specialized focus' },
  'profile.level.title': { fr: 'Niveau Général', en: 'General Level' },
  'profile.level.hint': { fr: 'Ce niveau sera utilisé pour adapter vos programmes d\'entraînement.', en: 'This level will be used to tailor your training programs.' },
  'profile.level.beginner': { fr: 'Débutant', en: 'Beginner' },
  'profile.level.intermediate': { fr: 'Intermédiaire', en: 'Intermediate' },
  'profile.level.advanced': { fr: 'Avancé', en: 'Advanced' },
  'profile.level.expert': { fr: 'Expert', en: 'Expert' },
  'profile.trainingDays.title': { fr: 'Jours d\'entraînement', en: 'Training days' },
  'profile.trainingDuration.title': { fr: 'Durée d\'entraînement', en: 'Training duration' },
  'profile.trainingDuration.planning': { fr: 'Planification', en: 'Planning' },
  'profile.trainingDuration.summary1': { fr: 'Vous vous entraînerez pendant', en: 'You will train for' },
  'profile.trainingDuration.summary2': { fr: 'sur', en: 'over' },
  'profile.trainingDuration.summary3': { fr: 'jours par semaine.', en: 'days per week.' },
  'profile.personalInfo.title': { fr: 'Informations personnelles', en: 'Personal information' },
  'profile.personalInfo.fullName': { fr: 'Nom complet', en: 'Full name' },
  'profile.personalInfo.email': { fr: 'Email', en: 'Email' },
  'profile.personalInfo.phone': { fr: 'Téléphone', en: 'Phone' },
  'profile.personalInfo.location': { fr: 'Localisation', en: 'Location' },
  'profile.physicalInfo.title': { fr: 'Informations physiques', en: 'Physical information' },
  'profile.physicalInfo.weight': { fr: 'Poids', en: 'Weight' },
  'profile.physicalInfo.height': { fr: 'Taille', en: 'Height' },
  'profile.physicalInfo.age': { fr: 'Âge', en: 'Age' },
  'profile.physicalInfo.sex': { fr: 'Sexe', en: 'Sex' },
  'profile.sportInfo.title': { fr: 'Informations sportives', en: 'Sport information' },
  'profile.sportInfo.sportClass': { fr: 'Classe de sport', en: 'Sport class' },
  'profile.sportInfo.mainGoal': { fr: 'Objectif principal', en: 'Main goal' },
  'profile.goal.performance': { fr: 'Performance', en: 'Performance' },
  'profile.goal.musculation': { fr: 'Musculation', en: 'Muscle building' },
  'profile.goal.endurance': { fr: 'Endurance', en: 'Endurance' },
  'profile.goal.sante': { fr: 'Santé', en: 'Health' },
  'profile.stats.title': { fr: 'Statistiques', en: 'Statistics' },
  'profile.stats.performances': { fr: 'Performances', en: 'Performances' },
  'profile.stats.daysPerWeek': { fr: 'Jours / semaine', en: 'Days / week' },
  'profile.stats.program': { fr: 'Programme', en: 'Program' },
  'profile.account.title': { fr: 'Compte', en: 'Account' },
  'profile.account.rankColor': { fr: 'Couleur du rang dans l\'app', en: 'Rank color in the app' },
  'profile.account.simplifiedMode': { fr: 'Mode simplifié (épuré)', en: 'Simplified mode (minimal)' },
  'profile.account.coachMode': { fr: 'Mode Coach', en: 'Coach mode' },
  'profile.account.language': { fr: 'Langue de l\'app', en: 'App language' },
  'profile.account.becomePro': { fr: 'Devenir Pro', en: 'Go Pro' },
  'profile.account.logout': { fr: 'Déconnexion', en: 'Log out' },
  'profile.day.lundi': { fr: 'Lundi', en: 'Monday' },
  'profile.day.mardi': { fr: 'Mardi', en: 'Tuesday' },
  'profile.day.mercredi': { fr: 'Mercredi', en: 'Wednesday' },
  'profile.day.jeudi': { fr: 'Jeudi', en: 'Thursday' },
  'profile.day.vendredi': { fr: 'Vendredi', en: 'Friday' },
  'profile.day.samedi': { fr: 'Samedi', en: 'Saturday' },
  'profile.day.dimanche': { fr: 'Dimanche', en: 'Sunday' },

  // Page Stats (saisie des performances)
  'stats.intro': { fr: 'Saisissez et gérez vos performances ici. Records, graphiques et classement sont sur l\'accueil.', en: 'Enter and manage your performances here. Records, charts and rankings are on the home page.' },
  'stats.viewStats': { fr: 'Voir mes statistiques', en: 'View my statistics' },
  'stats.backHome': { fr: 'Retour à l\'accueil', en: 'Back to home' },
  'stats.header.performances': { fr: 'Performances', en: 'Performances' },
  'stats.header.champion': { fr: 'Champion', en: 'Champion' },
  'stats.header.refresh': { fr: 'Actualiser', en: 'Refresh' },
  'stats.header.rank': { fr: 'Rang', en: 'Rank' },
  'stats.header.score': { fr: 'Score', en: 'Score' },
  'stats.header.progression': { fr: 'Progression', en: 'Progress' },

  // Page Progression
  'progression.intro': { fr: 'Records, graphiques, classement et objectifs — consultation uniquement.', en: 'Records, charts, rankings and goals — view only.' },
  'progression.enterPerf': { fr: 'Saisir une performance', en: 'Enter a performance' },
  'progression.tab.overview': { fr: 'Vue', en: 'Overview' },
  'progression.tab.records': { fr: 'Records', en: 'Records' },
  'progression.tab.progress': { fr: 'Évol.', en: 'Trends' },
  'progression.tab.ranking': { fr: 'Classe.', en: 'Rank' },

  // Page Nutrition (chrome statique — les noms d'aliments/recettes restent en français pour l'instant)
  'nutrition.title': { fr: 'Nutrition', en: 'Nutrition' },
  'nutrition.subtitle': { fr: 'Gérez votre alimentation', en: 'Manage your diet' },
  'nutrition.createMeal': { fr: 'Créer un repas', en: 'Create a meal' },
  'nutrition.searchPlaceholder': { fr: 'Rechercher un aliment ou un repas...', en: 'Search for a food or meal...' },
  'nutrition.photoLog': { fr: 'Journal photo des repas', en: 'Meal photo log' },
  'nutrition.addPhoto': { fr: 'Ajouter une photo', en: 'Add a photo' },
  'nutrition.tab.foods': { fr: 'Aliments', en: 'Foods' },
  'nutrition.tab.recipes': { fr: 'Recettes', en: 'Recipes' },
  'nutrition.scanFood': { fr: 'Scanner un aliment', en: 'Scan a food' },
  'nutrition.scanned': { fr: 'Scanné', en: 'Scanned' },
  'nutrition.class': { fr: 'Classe', en: 'Class' },
  'nutrition.micronutrients': { fr: 'Micronutriments :', en: 'Micronutrients:' },
  'nutrition.addToMeal': { fr: 'Ajouter à un repas', en: 'Add to a meal' },
  'nutrition.ingredients': { fr: 'Ingrédients :', en: 'Ingredients:' },
  'nutrition.viewRecipe': { fr: 'Voir la recette', en: 'View recipe' },
  'nutrition.filter.all': { fr: 'Tous', en: 'All' },
  'nutrition.filter.proteins': { fr: 'Protéines', en: 'Proteins' },
  'nutrition.filter.carbs': { fr: 'Glucides', en: 'Carbs' },
  'nutrition.filter.fats': { fr: 'Lipides', en: 'Fats' },
  'nutrition.filter.micronutrients': { fr: 'Micronutriments', en: 'Micronutrients' },
  'nutrition.filter.allRecipes': { fr: 'Toutes', en: 'All' },
  'nutrition.filter.massGain': { fr: 'Prise de masse', en: 'Mass gain' },
  'nutrition.filter.cut': { fr: 'Sèche', en: 'Cutting' },
  'nutrition.filter.recovery': { fr: 'Récupération', en: 'Recovery' },
  'nutrition.filter.antiInflammatory': { fr: 'Anti-inflammatoire', en: 'Anti-inflammatory' },
  'nutrition.filter.balance': { fr: 'Équilibre', en: 'Balance' },
  'nutrition.filter.allMoments': { fr: 'Tous les moments', en: 'All times' },
  'nutrition.filter.breakfast': { fr: 'Petit-déjeuner', en: 'Breakfast' },
  'nutrition.filter.lunch': { fr: 'Déjeuner', en: 'Lunch' },
  'nutrition.filter.dinner': { fr: 'Dîner', en: 'Dinner' },
  'nutrition.filter.snack': { fr: 'Collation', en: 'Snack' },
  'nutrition.filter.postTraining': { fr: 'Post-training', en: 'Post-workout' },
  'nutrition.scanNotFound': { fr: 'Produit non reconnu — il n\'est pas encore référencé dans la base Open Food Facts.', en: 'Product not recognized — it is not yet listed in the Open Food Facts database.' },
  'nutrition.scanNetworkError': { fr: 'Erreur réseau pendant la recherche du produit. Réessayez.', en: 'Network error while looking up the product. Please try again.' },

  // Page Programme
  'programme.title': { fr: 'Mon Programme', en: 'My Program' },
  'programme.subtitle': { fr: 'Programme personnalisé basé sur vos performances', en: 'Personalized program based on your performance' },
  'programme.updating': { fr: 'Mise à jour...', en: 'Updating...' },
  'programme.newProgram': { fr: 'Nouveau programme', en: 'New program' },
  'programme.update': { fr: 'Mise à jour', en: 'Update' },
  'programme.generating': { fr: 'Génération...', en: 'Generating...' },
  'programme.generateMine': { fr: 'Générer Mon Programme', en: 'Generate My Program' },
  'programme.stale.title': { fr: 'Ton programme actuel date d\'avant les dernières améliorations', en: 'Your current program predates the latest improvements' },
  'programme.stale.desc': { fr: 'Régénère-le pour avoir l\'échauffement, tous les accessoires (renfos) et la séance SBD à jour.', en: 'Regenerate it to get the warm-up, all accessory work, and the up-to-date SBD session.' },
  'programme.stale.button': { fr: 'Régénérer maintenant', en: 'Regenerate now' },
  'programme.testWeek.title': { fr: 'Semaine de test en cours', en: 'Test week in progress' },
  'programme.testWeek.desc': { fr: 'Complétez cette semaine puis enregistrez vos résultats (Squat, Développé Couché, Soulevé de Terre) dans l\'onglet Stats. Votre programme complet se génère ensuite automatiquement à partir de la Semaine 2.', en: 'Complete this week then log your results (Squat, Bench Press, Deadlift) in the Stats tab. Your full program then generates automatically from Week 2.' },
  'programme.testWeek.button': { fr: 'Générer la suite du programme', en: 'Generate the rest of the program' },
  'programme.none.title': { fr: 'Aucun Programme Généré', en: 'No Program Generated' },
  'programme.none.desc': { fr: 'Générez votre programme personnalisé pour commencer votre entraînement !', en: 'Generate your personalized program to start training!' },
  'programme.trainingDays.title': { fr: 'Jours d\'Entraînement Configurés', en: 'Configured Training Days' },
  'programme.trainingDays.tip': { fr: 'Astuce : Si vous avez modifié vos jours d\'entraînement, cliquez sur "Générer Mon Programme" pour créer un nouveau programme adapté à vos nouveaux jours.', en: 'Tip: If you\'ve changed your training days, click "Generate My Program" to create a new program matching your new days.' },
  'programme.maxes.title': { fr: 'Vos 1RM actuels', en: 'Your current 1RMs' },
  'programme.maxes.noteLabel': { fr: 'Note :', en: 'Note:' },
  'programme.maxes.note.tm': { fr: 'les pourcentages du programme sont calculés sur votre Training Max (90% de ces 1RM), avec une petite progression à chaque nouveau cycle.', en: 'the program percentages are calculated from your Training Max (90% of these 1RMs), with a small progression each new cycle.' },
  'programme.maxes.note.direct': { fr: 'tous les pourcentages du programme sont calculés directement sur ces 1RM.', en: 'all program percentages are calculated directly from these 1RMs.' },
  'programme.maxes.changed': { fr: '1RM mis à jour :', en: '1RM updated:' },
  'programme.maxes.changedDesc': { fr: 'ce programme a été généré avec Squat {squat}kg / Bench {bench}kg / Deadlift {deadlift}kg — les charges affichées ne suivent pas encore vos derniers 1RM.', en: 'this program was generated with Squat {squat}kg / Bench {bench}kg / Deadlift {deadlift}kg — the displayed loads don\'t reflect your latest 1RMs yet.' },
  'programme.maxes.recalculate': { fr: 'Recalculer les charges', en: 'Recalculate loads' },
  'programme.tab.today': { fr: 'Aujourd\'hui', en: 'Today' },
  'programme.tab.weekly': { fr: 'Hebdo', en: 'Weekly' },
  'programme.tab.planning': { fr: 'Planning', en: 'Planning' },
  'programme.today.title': { fr: 'Programme du Jour', en: 'Today\'s Program' },
  'programme.today.intensity': { fr: 'Intensité', en: 'Intensity' },
  'programme.today.duration': { fr: 'Durée', en: 'Duration' },
  'programme.today.phase': { fr: 'Phase', en: 'Phase' },
  'programme.today.notes': { fr: 'Notes:', en: 'Notes:' },
  'programme.today.equipment': { fr: 'Équipement requis:', en: 'Equipment needed:' },
  'programme.today.exercises': { fr: 'Exercices', en: 'Exercises' },
  'programme.today.restDay.title': { fr: 'Jour de Repos', en: 'Rest Day' },
  'programme.today.restDay.desc': { fr: 'Profitez de cette journée pour récupérer et vous détendre.', en: 'Take this day to recover and relax.' },
  'programme.today.restDay.tip': { fr: 'Conseil: La récupération est essentielle pour progresser. Vous pouvez faire des étirements légers ou une marche.', en: 'Tip: Recovery is essential for progress. Try light stretching or a walk.' },
  'programme.weekly.title': { fr: 'Planning Hebdomadaire', en: 'Weekly Schedule' },
  'programme.weekly.exercises': { fr: 'exercices', en: 'exercises' },
  'programme.weekly.phase': { fr: 'Phase:', en: 'Phase:' },
  'programme.weekly.completed': { fr: 'Terminé', en: 'Completed' },
  'programme.weekly.failed': { fr: 'Échoué', en: 'Failed' },
  'programme.weekly.partial': { fr: 'En cours', en: 'In progress' },
  'programme.weekly.noExercise': { fr: 'Aucun exercice', en: 'No exercise' },
  'programme.weekly.rest': { fr: 'Repos', en: 'Rest' },
  'programme.weekly.recovery': { fr: 'Récupération', en: 'Recovery' },
  'programme.planning.title': { fr: 'Planning Mensuel', en: 'Monthly Planning' },
  'programme.planning.subtitle': { fr: 'Calendrier d\'entraînement', en: 'Training calendar' },
  'programme.planning.sessions': { fr: 'Sessions', en: 'Sessions' },
  'programme.planning.min': { fr: 'Min', en: 'Min' },
  'programme.planning.sport': { fr: 'Sport', en: 'Sport' },
  'programme.planning.legend.progression': { fr: 'Progression', en: 'Progression' },
  'programme.planning.legend.deload': { fr: 'Deload', en: 'Deload' },
  'programme.planning.legend.adaptation': { fr: 'Adaptation', en: 'Adaptation' },
  'programme.planning.legend.specialisation': { fr: 'Spécialisation', en: 'Specialization' },
  'programme.planning.legend.rest': { fr: 'Repos', en: 'Rest' },
  'programme.planning.legend.today': { fr: 'Aujourd\'hui', en: 'Today' },
  'programme.planning.none.title': { fr: 'Aucun Programme', en: 'No Program' },
  'programme.planning.none.desc': { fr: 'Générez un programme personnalisé pour voir votre calendrier d\'entraînement avec toutes vos sessions organisées.', en: 'Generate a personalized program to see your training calendar with all your sessions organized.' },
  'programme.planning.none.button': { fr: 'Générer Programme', en: 'Generate Program' },
  'programme.modal.equipment': { fr: 'Équipement requis:', en: 'Equipment needed:' },
  'programme.modal.exercises': { fr: 'Exercices', en: 'Exercises' },
  'programme.rpe.title': { fr: 'Séance terminée — c\'était comment ?', en: 'Session complete — how did it feel?' },
  'programme.rpe.desc': { fr: 'Notez la difficulté de {session} : ça sert à ajuster la charge de votre prochaine séance sur ce mouvement.', en: 'Rate the difficulty of {session}: this helps adjust the load for your next session on this lift.' },
  'programme.rpe.easy': { fr: 'Très facile', en: 'Very easy' },
  'programme.rpe.hard': { fr: 'Hardcore', en: 'Hardcore' },
  'programme.rpe.submit': { fr: 'Valider ma note', en: 'Submit rating' },
  'programme.rpe.skip': { fr: 'Passer', en: 'Skip' },
  'programme.day.dim': { fr: 'Dim', en: 'Sun' },
  'programme.day.lun': { fr: 'Lun', en: 'Mon' },
  'programme.day.mar': { fr: 'Mar', en: 'Tue' },
  'programme.day.mer': { fr: 'Mer', en: 'Wed' },
  'programme.day.jeu': { fr: 'Jeu', en: 'Thu' },
  'programme.day.ven': { fr: 'Ven', en: 'Fri' },
  'programme.day.sam': { fr: 'Sam', en: 'Sat' },
  'programme.alert.mustLogin': { fr: '❌ Vous devez être connecté', en: '❌ You must be logged in' },
  'programme.alert.genError': { fr: '❌ Erreur lors de la génération du programme', en: '❌ Error while generating the program' },
  'programme.alert.confirmRegenerate': { fr: '🔄 Voulez-vous régénérer votre programme ?', en: '🔄 Do you want to regenerate your program?' },
  'programme.alert.generated': { fr: '🎉 Programme {sport} généré avec succès !\n\n📅 {count} séances créées pour les jours :\n{days}\n\n✅ Vous pouvez maintenant voir vos entraînements dans les onglets "Hebdomadaire" et "Planning" !', en: '🎉 {sport} program generated successfully!\n\n📅 {count} sessions created for:\n{days}\n\n✅ You can now see your workouts in the "Weekly" and "Planning" tabs!' },
  'programme.alert.notSpecified': { fr: 'Non spécifiés', en: 'Not specified' },
  'programme.alert.missingLifts': { fr: '📋 Aucune performance connue pour : {lifts}.\n\nUne semaine de test a été générée pour estimer vos charges. Une fois vos résultats saisis dans "Stats", revenez ici et cliquez sur "Générer la suite du programme".', en: '📋 No known performance for: {lifts}.\n\nA test week was generated to estimate your loads. Once your results are logged in "Stats", come back here and click "Generate the rest of the program".' },
  'programme.alert.plGenerated': { fr: '🎉 Programme "{name}" généré avec succès !\n\n📅 {count} séances sur {days} jours/semaine.', en: '🎉 Program "{name}" generated successfully!\n\n📅 {count} sessions over {days} days/week.' },
  'programme.alert.missingPerf': { fr: '⏳ Il manque encore au moins une performance (Squat, Bench ou Deadlift). Rendez-vous dans l\'onglet Stats pour la renseigner, puis revenez ici.', en: '⏳ At least one performance is still missing (Squat, Bench or Deadlift). Go to the Stats tab to log it, then come back here.' },
  'programme.alert.fullProgramReady': { fr: '🎉 Votre programme complet est prêt, à partir de la Semaine 2 !', en: '🎉 Your full program is ready, starting from Week 2!' },
  'programme.alert.recalculated': { fr: '✅ Charges recalculées avec votre 1RM à jour !', en: '✅ Loads recalculated with your up-to-date 1RM!' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'en' || stored === 'fr' ? stored : 'fr';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }, []);

  const t = useCallback((key: string): string => {
    return translations[key]?.[language] || key;
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
