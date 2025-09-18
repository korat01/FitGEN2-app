import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  ChefHat, 
  Clock, 
  Users, 
  Flame, 
  Star, 
  Plus,
  Minus,
  Heart,
  Target,
  Zap,
  Utensils,
  ShoppingCart,
  BookOpen,
  Timer,
  Scale
} from 'lucide-react';

const RecetteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [servings, setServings] = useState(1);

  // Données des repas (même structure que dans Nutrition.tsx)
  const repasData = [
    {
    id: 1,
    name: "Bowl protéiné aux fruits",
      emoji: "🥣",
    category: "Petit-déjeuner",
      goal: "Prise de masse",
    calories: 650,
    prepTime: 15,
    difficulty: "Facile",
    rating: 4.7,
    protein: 35,
    carbs: 65,
    fat: 18,
    fiber: 12,
    servings: 1,
      isPopular: true,
    ingredients: [
        { name: "Flocons d'avoine", amount: "50g", category: "Céréales" },
        { name: "Protéine en poudre", amount: "30g", category: "Protéines" },
        { name: "Banane", amount: "1 moyenne", category: "Fruits" },
        { name: "Myrtilles", amount: "50g", category: "Fruits" },
        { name: "Amandes", amount: "15g", category: "Lipides" },
        { name: "Lait d'amande", amount: "200ml", category: "Liquides" },
        { name: "Miel", amount: "1 c.à.s", category: "Édulcorants" }
      ],
      instructions: [
        "Mélanger les flocons d'avoine avec le lait d'amande dans un bol",
        "Ajouter la protéine en poudre et bien mélanger",
        "Couper la banane en rondelles et l'ajouter au mélange",
        "Garnir avec les myrtilles et les amandes",
        "Arroser de miel et servir immédiatement"
      ],
      tips: [
        "Utilisez des flocons d'avoine sans gluten si nécessaire",
        "Ajoutez des graines de chia pour plus de fibres",
        "Préparez la veille pour un petit-déjeuner express"
      ],
      equipment: ["Bol", "Cuillère", "Balance"],
      nutritionPerServing: {
        calories: 650,
        protein: 35,
        carbs: 65,
        fat: 18,
        fiber: 12,
        sugar: 25,
        sodium: 120
      }
    },
    {
      id: 2,
      name: "Omelette aux 3 œufs et fromage",
      emoji: "🍳",
      category: "Petit-déjeuner",
      goal: "Prise de masse",
      calories: 520,
      prepTime: 12,
      difficulty: "Facile",
      rating: 4.5,
      protein: 42,
      carbs: 8,
      fat: 35,
      fiber: 2,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Œufs", amount: "3 gros", category: "Protéines" },
        { name: "Fromage râpé", amount: "30g", category: "Protéines" },
        { name: "Beurre", amount: "1 c.à.s", category: "Lipides" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" },
        { name: "Persil frais", amount: "1 c.à.s", category: "Herbes" }
      ],
      instructions: [
        "Casser les œufs dans un bol et les battre avec le sel et le poivre",
        "Faire chauffer le beurre dans une poêle anti-adhésive à feu moyen",
        "Verser les œufs battus dans la poêle",
        "Ajouter le fromage râpé sur la moitié de l'omelette",
        "Plier l'omelette en deux et laisser cuire 1-2 minutes",
        "Garnir de persil frais et servir"
      ],
      tips: [
        "Utilisez une poêle anti-adhésive pour éviter que l'omelette colle",
        "Ne remuez pas trop les œufs pour garder une texture moelleuse",
        "Ajoutez des légumes si vous le souhaitez"
      ],
      equipment: ["Poêle anti-adhésive", "Bol", "Fouet", "Spatule"],
      nutritionPerServing: {
        calories: 520,
        protein: 42,
        carbs: 8,
        fat: 35,
        fiber: 2,
        sugar: 2,
        sodium: 450
      }
    },
    {
      id: 3,
      name: "Poulet rôti aux patates douces",
      emoji: "🍗",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 720,
      prepTime: 45,
      difficulty: "Moyen",
      rating: 4.6,
      protein: 55,
      carbs: 75,
      fat: 18,
      fiber: 10,
      servings: 2,
      isPopular: true,
      ingredients: [
        { name: "Filets de poulet", amount: "300g", category: "Protéines" },
        { name: "Patates douces", amount: "400g", category: "Glucides" },
        { name: "Huile d'olive", amount: "2 c.à.s", category: "Lipides" },
        { name: "Ail", amount: "2 gousses", category: "Aromates" },
        { name: "Romarin", amount: "2 branches", category: "Herbes" },
        { name: "Thym", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 c.à.c", category: "Épices" },
        { name: "Poivre", amount: "1/2 c.à.c", category: "Épices" }
      ],
      instructions: [
        "Préchauffer le four à 200°C",
        "Couper les patates douces en cubes de 2cm",
        "Mélanger l'huile d'olive avec l'ail écrasé, le romarin et le thym",
        "Enrober les patates douces avec la moitié du mélange d'huile",
        "Assaisonner les filets de poulet avec le sel et le poivre",
        "Disposer le poulet et les patates douces sur une plaque de cuisson",
        "Enrober le poulet avec le reste du mélange d'huile",
        "Enfourner pour 35-40 minutes jusqu'à ce que le poulet soit cuit"
      ],
      tips: [
        "Vérifiez la cuisson du poulet avec un thermomètre (75°C)",
        "Retournez les patates douces à mi-cuisson",
        "Ajoutez des légumes verts en accompagnement"
      ],
      equipment: ["Plaque de cuisson", "Four", "Thermomètre", "Couteau"],
      nutritionPerServing: {
        calories: 720,
        protein: 55,
        carbs: 75,
        fat: 18,
        fiber: 10,
        sugar: 15,
        sodium: 380
      }
    },
    {
      id: 4,
      name: "Saumon aux légumes vapeur",
      emoji: "🐟",
      category: "Dîner",
      goal: "Perte de poids",
      calories: 380,
      prepTime: 30,
      difficulty: "Facile",
      rating: 4.5,
      protein: 35,
      carbs: 25,
      fat: 18,
      fiber: 8,
      servings: 1,
      isPopular: false,
      ingredients: [
        { name: "Filet de saumon", amount: "150g", category: "Protéines" },
        { name: "Brocoli", amount: "100g", category: "Légumes" },
        { name: "Carottes", amount: "80g", category: "Légumes" },
        { name: "Courgette", amount: "100g", category: "Légumes" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Citron", amount: "1/2", category: "Fruits" },
        { name: "Aneth", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Préparer un cuit-vapeur ou une casserole avec un panier vapeur",
        "Couper les légumes en morceaux de taille similaire",
        "Assaisonner le saumon avec le sel, le poivre et l'aneth",
        "Disposer les légumes dans le panier vapeur",
        "Placer le saumon sur les légumes",
        "Cuire à la vapeur pendant 15-20 minutes",
        "Arroser d'huile d'olive et de jus de citron avant de servir"
      ],
      tips: [
        "Ne surcuisez pas le saumon pour garder sa tendreté",
        "Ajoutez des épices comme le paprika ou le cumin",
        "Servez avec du riz complet en accompagnement"
      ],
      equipment: ["Cuit-vapeur", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 380,
        protein: 35,
        carbs: 25,
        fat: 18,
        fiber: 8,
        sugar: 8,
        sodium: 280
      }
    },
    {
      id: 5,
      name: "Smoothie récupération",
      emoji: "🥤",
      category: "Collation",
      goal: "Récupération",
      calories: 250,
      prepTime: 5,
      difficulty: "Facile",
      rating: 4.6,
      protein: 20,
      carbs: 35,
      fat: 8,
      fiber: 6,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Protéine en poudre", amount: "25g", category: "Protéines" },
        { name: "Banane", amount: "1 moyenne", category: "Fruits" },
        { name: "Myrtilles", amount: "50g", category: "Fruits" },
        { name: "Lait d'amande", amount: "200ml", category: "Liquides" },
        { name: "Graines de chia", amount: "1 c.à.s", category: "Lipides" },
        { name: "Miel", amount: "1 c.à.s", category: "Édulcorants" },
        { name: "Glace", amount: "3-4 glaçons", category: "Liquides" }
      ],
      instructions: [
        "Ajouter tous les ingrédients dans un blender",
        "Mixer à haute vitesse pendant 30-45 secondes",
        "Vérifier la consistance et ajouter plus de liquide si nécessaire",
        "Verser dans un verre et servir immédiatement"
      ],
      tips: [
        "Utilisez des fruits congelés pour une texture plus crémeuse",
        "Ajoutez des épinards pour plus de nutriments",
        "Buvez dans les 30 minutes après l'entraînement"
      ],
      equipment: ["Blender", "Verre", "Cuillère"],
      nutritionPerServing: {
        calories: 250,
        protein: 20,
        carbs: 35,
        fat: 8,
        fiber: 6,
        sugar: 28,
        sodium: 80
      }
    },
    {
      id: 6,
      name: "Bowl d'énergie pré-entraînement",
      emoji: "⚡",
      category: "Pre-workout",
      goal: "Performance",
      calories: 320,
      prepTime: 10,
      difficulty: "Facile",
      rating: 4.4,
      protein: 15,
      carbs: 55,
      fat: 8,
      fiber: 8,
      servings: 1,
      isPopular: false,
      ingredients: [
        { name: "Flocons d'avoine", amount: "40g", category: "Céréales" },
        { name: "Banane", amount: "1", category: "Fruits" },
        { name: "Miel", amount: "1 c.à.s", category: "Édulcorants" },
        { name: "Graines de chia", amount: "1 c.à.s", category: "Lipides" },
        { name: "Lait d'amande", amount: "150ml", category: "Liquides" },
        { name: "Cannelle", amount: "1 c.à.c", category: "Épices" },
        { name: "Noix", amount: "10g", category: "Lipides" },
        { name: "Baies", amount: "30g", category: "Fruits" }
      ],
      instructions: [
        "Mélanger les flocons d'avoine avec le lait d'amande",
        "Ajouter la banane écrasée et le miel",
        "Saupoudrer de cannelle et de graines de chia",
        "Garnir avec les noix et les baies",
        "Laisser reposer 5 minutes avant de servir"
      ],
      tips: [
        "Consommez 1-2 heures avant l'entraînement",
        "Ajoutez des fruits secs pour plus d'énergie",
        "Hydratez-vous bien après"
      ],
      equipment: ["Bol", "Cuillère", "Fourchette"],
      nutritionPerServing: {
        calories: 320,
        protein: 15,
        carbs: 55,
        fat: 8,
        fiber: 8,
        sugar: 25,
        sodium: 60
      }
    },
    {
      id: 7,
      name: "Salade de thon aux légumes",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Perte de poids",
      calories: 280,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.3,
      protein: 32,
      carbs: 20,
      fat: 8,
      fiber: 6,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Thon en boîte", amount: "100g", category: "Protéines" },
        { name: "Tomates", amount: "150g", category: "Légumes" },
        { name: "Concombre", amount: "100g", category: "Légumes" },
        { name: "Oignon rouge", amount: "1/4", category: "Légumes" },
        { name: "Olives noires", amount: "10g", category: "Lipides" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Vinaigre", amount: "1 c.à.s", category: "Condiments" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Égoutter le thon et l'émietter",
        "Couper les tomates et le concombre en dés",
        "Émincer l'oignon rouge",
        "Mélanger tous les ingrédients dans un saladier",
        "Préparer la vinaigrette avec l'huile et le vinaigre",
        "Arroser la salade et assaisonner",
        "Mélanger délicatement et servir"
      ],
      tips: [
        "Utilisez du thon au naturel",
        "Ajoutez des câpres pour plus de saveur",
        "Servez avec du pain complet"
      ],
      equipment: ["Saladier", "Couteau", "Planche à découper", "Cuillère"],
      nutritionPerServing: {
        calories: 280,
        protein: 32,
        carbs: 20,
        fat: 8,
        fiber: 6,
        sugar: 8,
        sodium: 350
      }
    },
    {
      id: 8,
      name: "Pancakes protéinés",
      emoji: "🥞",
      category: "Petit-déjeuner",
      goal: "Prise de masse",
      calories: 580,
      prepTime: 20,
      difficulty: "Moyen",
      rating: 4.6,
      protein: 38,
      carbs: 45,
      fat: 22,
      fiber: 6,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Protéine en poudre", amount: "30g", category: "Protéines" },
        { name: "Flocons d'avoine", amount: "40g", category: "Céréales" },
        { name: "Œufs", amount: "2", category: "Protéines" },
        { name: "Banane", amount: "1", category: "Fruits" },
        { name: "Lait d'amande", amount: "100ml", category: "Liquides" },
        { name: "Levure", amount: "1 c.à.c", category: "Épices" },
        { name: "Huile de coco", amount: "1 c.à.s", category: "Lipides" },
        { name: "Miel", amount: "1 c.à.s", category: "Édulcorants" },
        { name: "Baies", amount: "50g", category: "Fruits" }
      ],
      instructions: [
        "Mixer les flocons d'avoine en farine",
        "Mélanger avec la protéine en poudre et la levure",
        "Écraser la banane et mélanger avec les œufs",
        "Ajouter le lait d'amande et mélanger",
        "Incorporer les ingrédients secs",
        "Faire chauffer l'huile dans une poêle",
        "Cuire les pancakes 2-3 minutes de chaque côté",
        "Servir avec le miel et les baies"
      ],
      tips: [
        "Utilisez une poêle anti-adhésive",
        "Ajoutez des noix pour plus de croquant",
        "Servez chaud"
      ],
      equipment: ["Mixer", "Poêle", "Bol", "Cuillère"],
      nutritionPerServing: {
        calories: 580,
        protein: 38,
        carbs: 45,
        fat: 22,
        fiber: 6,
        sugar: 20,
        sodium: 200
      }
    },
    {
      id: 9,
      name: "Bowl de quinoa aux légumes",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 420,
      prepTime: 25,
      difficulty: "Facile",
      rating: 4.4,
      protein: 18,
      carbs: 55,
      fat: 12,
      fiber: 10,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Quinoa", amount: "80g", category: "Glucides" },
        { name: "Tomates cerises", amount: "100g", category: "Légumes" },
        { name: "Concombre", amount: "80g", category: "Légumes" },
        { name: "Avocat", amount: "1/2", category: "Lipides" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Citron", amount: "1/2", category: "Fruits" },
        { name: "Persil", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Cuire le quinoa selon les instructions du paquet",
        "Couper les tomates cerises en deux",
        "Éplucher et couper le concombre en dés",
        "Couper l'avocat en cubes",
        "Mélanger tous les ingrédients dans un saladier",
        "Arroser d'huile d'olive et de jus de citron",
        "Assaisonner avec le sel, le poivre et le persil",
        "Mélanger délicatement et servir"
      ],
      tips: [
        "Laissez refroidir le quinoa avant de l'ajouter",
        "Ajoutez des graines de tournesol pour plus de croquant",
        "Servez frais pour une meilleure saveur"
      ],
      equipment: ["Saladier", "Couteau", "Planche à découper", "Cuillère"],
      nutritionPerServing: {
        calories: 420,
        protein: 18,
        carbs: 55,
        fat: 12,
        fiber: 10,
        sugar: 8,
        sodium: 280
      }
    },
    {
      id: 10,
      name: "Smoothie vert détox",
      emoji: "🥤",
      category: "Collation",
      goal: "Perte de poids",
      calories: 150,
      prepTime: 8,
      difficulty: "Facile",
      rating: 4.2,
      protein: 8,
      carbs: 25,
      fat: 4,
      fiber: 8,
      servings: 1,
      isPopular: false,
      ingredients: [
        { name: "Épinards", amount: "50g", category: "Légumes" },
        { name: "Kiwi", amount: "1", category: "Fruits" },
        { name: "Pomme verte", amount: "1/2", category: "Fruits" },
        { name: "Concombre", amount: "1/2", category: "Légumes" },
        { name: "Gingembre", amount: "1 c.à.c", category: "Aromates" },
        { name: "Eau", amount: "200ml", category: "Liquides" },
        { name: "Miel", amount: "1 c.à.s", category: "Édulcorants" },
        { name: "Glace", amount: "3-4 glaçons", category: "Liquides" }
      ],
      instructions: [
        "Laver et préparer tous les ingrédients",
        "Ajouter tous les ingrédients dans un blender",
        "Mixer à haute vitesse pendant 30-45 secondes",
        "Vérifier la consistance et ajouter plus d'eau si nécessaire",
        "Verser dans un verre et servir immédiatement"
      ],
      tips: [
        "Utilisez des fruits congelés pour une texture plus crémeuse",
        "Ajoutez des graines de chia pour plus de nutriments",
        "Buvez dans les 30 minutes après l'entraînement"
      ],
      equipment: ["Blender", "Verre", "Cuillère"],
      nutritionPerServing: {
        calories: 150,
        protein: 8,
        carbs: 25,
        fat: 4,
        fiber: 8,
        sugar: 18,
        sodium: 80
      }
    },
    {
      id: 11,
      name: "Burger de bœuf aux patates douces",
      emoji: "🍔",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 850,
      prepTime: 35,
      difficulty: "Moyen",
      rating: 4.8,
      protein: 45,
      carbs: 65,
      fat: 35,
      fiber: 8,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Steak haché", amount: "150g", category: "Protéines" },
        { name: "Pain à burger", amount: "1", category: "Glucides" },
        { name: "Patate douce", amount: "200g", category: "Glucides" },
        { name: "Salade", amount: "2 feuilles", category: "Légumes" },
        { name: "Tomate", amount: "2 tranches", category: "Légumes" },
        { name: "Oignon", amount: "2 tranches", category: "Légumes" },
        { name: "Fromage", amount: "1 tranche", category: "Protéines" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Préchauffer le four à 200°C",
        "Couper les patates douces en frites",
        "Enrober les frites d'huile d'olive et assaisonner",
        "Enfourner les frites pour 25-30 minutes",
        "Former le steak haché en burger",
        "Cuire le burger dans une poêle à feu moyen",
        "Griller le pain à burger",
        "Assembler le burger avec tous les ingrédients",
        "Servir avec les frites de patates douces"
      ],
      tips: [
        "Utilisez un pain à burger complet pour plus de fibres",
        "Ajoutez des épices au steak haché",
        "Servez avec une sauce au choix"
      ],
      equipment: ["Poêle", "Four", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 850,
        protein: 45,
        carbs: 65,
        fat: 35,
        fiber: 8,
        sugar: 12,
        sodium: 450
      }
    },
    {
      id: 12,
      name: "Poisson blanc aux herbes",
      emoji: "🐟",
      category: "Dîner",
      goal: "Perte de poids",
      calories: 220,
      prepTime: 25,
      difficulty: "Facile",
      rating: 4.3,
      protein: 35,
      carbs: 15,
      fat: 5,
      fiber: 8,
      servings: 1,
      isPopular: false,
      ingredients: [
        { name: "Filet de poisson blanc", amount: "150g", category: "Protéines" },
        { name: "Brocoli", amount: "100g", category: "Légumes" },
        { name: "Carottes", amount: "80g", category: "Légumes" },
        { name: "Courgette", amount: "100g", category: "Légumes" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Citron", amount: "1/2", category: "Fruits" },
        { name: "Aneth", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Préparer un cuit-vapeur ou une casserole avec un panier vapeur",
        "Couper les légumes en morceaux de taille similaire",
        "Assaisonner le poisson avec le sel, le poivre et l'aneth",
        "Disposer les légumes dans le panier vapeur",
        "Placer le poisson sur les légumes",
        "Cuire à la vapeur pendant 15-20 minutes",
        "Arroser d'huile d'olive et de jus de citron avant de servir"
      ],
      tips: [
        "Ne surcuisez pas le poisson pour garder sa tendreté",
        "Ajoutez des épices comme le paprika ou le cumin",
        "Servez avec du riz complet en accompagnement"
      ],
      equipment: ["Cuit-vapeur", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 220,
        protein: 35,
        carbs: 15,
        fat: 5,
        fiber: 8,
        sugar: 8,
        sodium: 280
      }
    },
    {
      id: 13,
      name: "Energy balls aux dattes",
      emoji: "🍯",
      category: "Collation",
      goal: "Performance",
      calories: 180,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.6,
      protein: 6,
      carbs: 25,
      fat: 8,
      fiber: 4,
      servings: 4,
      isPopular: true,
      ingredients: [
        { name: "Dattes", amount: "100g", category: "Fruits" },
        { name: "Amandes", amount: "50g", category: "Lipides" },
        { name: "Noix de coco râpée", amount: "2 c.à.s", category: "Lipides" },
        { name: "Cacao en poudre", amount: "1 c.à.s", category: "Épices" },
        { name: "Huile de coco", amount: "1 c.à.s", category: "Lipides" },
        { name: "Vanille", amount: "1 c.à.c", category: "Aromates" },
        { name: "Sel", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Dénoyauter les dattes",
        "Ajouter tous les ingrédients dans un robot culinaire",
        "Mixer jusqu'à obtenir une pâte homogène",
        "Former des boules de la taille d'une noix",
        "Rouler dans la noix de coco râpée",
        "Réfrigérer pendant 30 minutes avant de servir"
      ],
      tips: [
        "Utilisez des dattes Medjool pour plus de douceur",
        "Ajoutez des graines de chia pour plus de nutriments",
        "Conservez au réfrigérateur jusqu'à 1 semaine"
      ],
      equipment: ["Robot culinaire", "Cuillère", "Plaque"],
      nutritionPerServing: {
        calories: 180,
        protein: 6,
        carbs: 25,
        fat: 8,
        fiber: 4,
        sugar: 20,
        sodium: 80
      }
    },
    {
      id: 14,
      name: "Pâtes complètes au thon",
      emoji: "🍝",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 480,
      prepTime: 20,
      difficulty: "Facile",
      rating: 4.4,
      protein: 30,
      carbs: 65,
      fat: 12,
      fiber: 6,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Pâtes complètes", amount: "100g", category: "Glucides" },
        { name: "Thon en boîte", amount: "80g", category: "Protéines" },
        { name: "Tomates", amount: "200g", category: "Légumes" },
        { name: "Oignon", amount: "1/2", category: "Légumes" },
        { name: "Ail", amount: "1 gousse", category: "Aromates" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Basilic", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Cuire les pâtes selon les instructions du paquet",
        "Égoutter le thon et l'émietter",
        "Couper les tomates en dés",
        "Émincer l'oignon et l'ail",
        "Faire revenir l'oignon et l'ail dans l'huile d'olive",
        "Ajouter les tomates et laisser mijoter 10 minutes",
        "Ajouter le thon et le basilic",
        "Mélanger avec les pâtes et assaisonner",
        "Servir chaud"
      ],
      tips: [
        "Utilisez des pâtes complètes pour plus de fibres",
        "Ajoutez des olives noires pour plus de saveur",
        "Servez avec du parmesan râpé"
      ],
      equipment: ["Casserole", "Poêle", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 480,
        protein: 30,
        carbs: 65,
        fat: 12,
        fiber: 6,
        sugar: 8,
        sodium: 380
      }
    },
    {
      id: 15,
      name: "Toast à l'avocat et œufs",
      emoji: "🥑",
      category: "Petit-déjeuner",
      goal: "Performance",
      calories: 380,
      prepTime: 12,
      difficulty: "Facile",
      rating: 4.4,
      protein: 20,
      carbs: 25,
      fat: 25,
      fiber: 8,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Pain complet", amount: "2 tranches", category: "Glucides" },
        { name: "Avocat", amount: "1", category: "Lipides" },
        { name: "Œufs", amount: "2", category: "Protéines" },
        { name: "Citron", amount: "1/2", category: "Fruits" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" },
        { name: "Persil", amount: "1 c.à.s", category: "Herbes" }
      ],
      instructions: [
        "Griller les tranches de pain",
        "Écraser l'avocat avec le jus de citron",
        "Assaisonner l'avocat avec le sel et le poivre",
        "Cuire les œufs au plat",
        "Tartiner l'avocat sur le pain grillé",
        "Déposer les œufs sur l'avocat",
        "Arroser d'huile d'olive et garnir de persil",
        "Servir immédiatement"
      ],
      tips: [
        "Utilisez du pain complet pour plus de fibres",
        "Ajoutez des graines de chia sur l'avocat",
        "Servez avec des tomates cerises"
      ],
      equipment: ["Grille-pain", "Poêle", "Fourchette", "Couteau"],
      nutritionPerServing: {
        calories: 380,
        protein: 20,
        carbs: 25,
        fat: 25,
        fiber: 8,
        sugar: 4,
        sodium: 320
      }
    },
    {
      id: 16,
      name: "Soupe de légumes minceur",
      emoji: "🍲",
      category: "Dîner",
      goal: "Perte de poids",
      calories: 180,
      prepTime: 30,
      difficulty: "Facile",
      rating: 4.2,
      protein: 8,
      carbs: 25,
      fat: 5,
      fiber: 12,
      servings: 2,
      isPopular: false,
      ingredients: [
        { name: "Courgette", amount: "200g", category: "Légumes" },
        { name: "Carottes", amount: "150g", category: "Légumes" },
        { name: "Tomates", amount: "200g", category: "Légumes" },
        { name: "Oignon", amount: "1", category: "Légumes" },
        { name: "Ail", amount: "2 gousses", category: "Aromates" },
        { name: "Bouillon de légumes", amount: "500ml", category: "Liquides" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Basilic", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Couper tous les légumes en morceaux",
        "Faire revenir l'oignon et l'ail dans l'huile d'olive",
        "Ajouter les légumes et le bouillon",
        "Porter à ébullition et laisser mijoter 20 minutes",
        "Mixer la soupe jusqu'à obtenir une consistance lisse",
        "Assaisonner avec le sel, le poivre et le basilic",
        "Servir chaud"
      ],
      tips: [
        "Ajoutez des légumes verts pour plus de nutriments",
        "Servez avec des croûtons de pain complet",
        "Conservez au réfrigérateur jusqu'à 3 jours"
      ],
      equipment: ["Casserole", "Mixeur", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 180,
        protein: 8,
        carbs: 25,
        fat: 5,
        fiber: 12,
        sugar: 12,
        sodium: 280
      }
    },
    {
      id: 17,
      name: "Bowl de riz au poulet teriyaki",
      emoji: "🍱",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 750,
      prepTime: 30,
      difficulty: "Moyen",
      rating: 4.6,
      protein: 55,
      carbs: 85,
      fat: 18,
      fiber: 6,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Riz complet", amount: "150g", category: "Glucides" },
        { name: "Filet de poulet", amount: "150g", category: "Protéines" },
        { name: "Brocoli", amount: "100g", category: "Légumes" },
        { name: "Carottes", amount: "80g", category: "Légumes" },
        { name: "Sauce teriyaki", amount: "2 c.à.s", category: "Sauces" },
        { name: "Huile de sésame", amount: "1 c.à.s", category: "Lipides" },
        { name: "Gingembre", amount: "1 c.à.c", category: "Aromates" },
        { name: "Ail", amount: "1 gousse", category: "Aromates" },
        { name: "Sésame", amount: "1 c.à.s", category: "Lipides" }
      ],
      instructions: [
        "Cuire le riz selon les instructions du paquet",
        "Couper le poulet en dés",
        "Préparer les légumes en morceaux",
        "Faire revenir le poulet dans l'huile de sésame",
        "Ajouter les légumes et l'ail",
        "Arroser de sauce teriyaki",
        "Laisser mijoter 10 minutes",
        "Servir sur le riz et garnir de sésame"
      ],
      tips: [
        "Utilisez du riz complet pour plus de fibres",
        "Ajoutez des légumes verts pour plus de nutriments",
        "Servez avec des algues nori"
      ],
      equipment: ["Casserole", "Poêle", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 750,
        protein: 55,
        carbs: 85,
        fat: 18,
        fiber: 6,
        sugar: 15,
        sodium: 450
      }
    },
    {
      id: 18,
      name: "Smoothie chocolat-banane",
      emoji: "🥤",
      category: "Post-workout",
      goal: "Récupération",
      calories: 350,
      prepTime: 8,
      difficulty: "Facile",
      rating: 4.7,
      protein: 25,
      carbs: 45,
      fat: 12,
      fiber: 8,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Protéine en poudre", amount: "30g", category: "Protéines" },
        { name: "Banane", amount: "1", category: "Fruits" },
        { name: "Cacao en poudre", amount: "1 c.à.s", category: "Épices" },
        { name: "Lait d'amande", amount: "200ml", category: "Liquides" },
        { name: "Beurre de cacahuète", amount: "1 c.à.s", category: "Lipides" },
        { name: "Miel", amount: "1 c.à.s", category: "Édulcorants" },
        { name: "Glace", amount: "3-4 glaçons", category: "Liquides" }
      ],
      instructions: [
        "Ajouter tous les ingrédients dans un blender",
        "Mixer à haute vitesse pendant 30-45 secondes",
        "Vérifier la consistance et ajouter plus de liquide si nécessaire",
        "Verser dans un verre et servir immédiatement"
      ],
      tips: [
        "Utilisez des fruits congelés pour une texture plus crémeuse",
        "Ajoutez des épinards pour plus de nutriments",
        "Buvez dans les 30 minutes après l'entraînement"
      ],
      equipment: ["Blender", "Verre", "Cuillère"],
      nutritionPerServing: {
        calories: 350,
        protein: 25,
        carbs: 45,
        fat: 12,
        fiber: 8,
        sugar: 30,
        sodium: 100
      }
    },
    {
      id: 19,
      name: "Salade de chou",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Perte de poids",
      calories: 180,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.1,
      protein: 8,
      carbs: 20,
      fat: 8,
      fiber: 6,
      servings: 2,
      isPopular: false,
      ingredients: [
        { name: "Chou blanc", amount: "300g", category: "Légumes" },
        { name: "Carottes", amount: "100g", category: "Légumes" },
        { name: "Oignon", amount: "1/2", category: "Légumes" },
        { name: "Vinaigre", amount: "2 c.à.s", category: "Condiments" },
        { name: "Huile d'olive", amount: "2 c.à.s", category: "Lipides" },
        { name: "Moutarde", amount: "1 c.à.s", category: "Condiments" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" },
        { name: "Persil", amount: "1 c.à.s", category: "Herbes" }
      ],
      instructions: [
        "Râper le chou blanc finement",
        "Râper les carottes",
        "Émincer l'oignon",
        "Mélanger tous les légumes dans un saladier",
        "Préparer la vinaigrette avec vinaigre, huile, moutarde",
        "Assaisonner avec sel et poivre",
        "Verser la vinaigrette sur la salade",
        "Mélanger délicatement et laisser mariner 30 minutes",
        "Garnir de persil avant de servir"
      ],
      tips: [
        "Laissez mariner au moins 30 minutes pour plus de saveur",
        "Ajoutez des graines de tournesol pour plus de croquant",
        "Servez frais pour une meilleure texture"
      ],
      equipment: ["Saladier", "Râpe", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 180,
        protein: 8,
        carbs: 20,
        fat: 8,
        fiber: 6,
        sugar: 12,
        sodium: 280
      }
    },
    {
      id: 20,
      name: "Smoothie protéiné",
      emoji: "🥤",
      category: "Post-workout",
      goal: "Récupération",
      calories: 280,
      prepTime: 5,
      difficulty: "Facile",
      rating: 4.5,
      protein: 30,
      carbs: 25,
      fat: 8,
      fiber: 4,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Protéine en poudre", amount: "30g", category: "Protéines" },
        { name: "Banane", amount: "1", category: "Fruits" },
        { name: "Lait d'amande", amount: "250ml", category: "Liquides" },
        { name: "Beurre de cacahuète", amount: "1 c.à.s", category: "Lipides" },
        { name: "Miel", amount: "1 c.à.s", category: "Édulcorants" },
        { name: "Glace", amount: "3-4 glaçons", category: "Liquides" }
      ],
      instructions: [
        "Ajouter tous les ingrédients dans un blender",
        "Mixer à haute vitesse pendant 30-45 secondes",
        "Vérifier la consistance et ajouter plus de liquide si nécessaire",
        "Verser dans un verre et servir immédiatement"
      ],
      tips: [
        "Utilisez des fruits congelés pour une texture plus crémeuse",
        "Buvez dans les 30 minutes après l'entraînement",
        "Ajoutez des épinards pour plus de nutriments"
      ],
      equipment: ["Blender", "Verre", "Cuillère"],
      nutritionPerServing: {
        calories: 280,
        protein: 30,
        carbs: 25,
        fat: 8,
        fiber: 4,
        sugar: 20,
        sodium: 120
      }
    },
    {
      id: 21,
      name: "Bowl de légumes grillés",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 320,
      prepTime: 30,
      difficulty: "Facile",
      rating: 4.3,
      protein: 12,
      carbs: 35,
      fat: 15,
      fiber: 8,
      servings: 1,
      isPopular: false,
      ingredients: [
        { name: "Aubergine", amount: "150g", category: "Légumes" },
        { name: "Courgette", amount: "150g", category: "Légumes" },
        { name: "Poivron", amount: "1", category: "Légumes" },
        { name: "Tomates", amount: "100g", category: "Légumes" },
        { name: "Huile d'olive", amount: "2 c.à.s", category: "Lipides" },
        { name: "Ail", amount: "2 gousses", category: "Aromates" },
        { name: "Basilic", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Préchauffer le four à 200°C",
        "Couper tous les légumes en morceaux",
        "Disposer sur une plaque de cuisson",
        "Arroser d'huile d'olive et assaisonner",
        "Enfourner pour 25-30 minutes",
        "Retourner à mi-cuisson",
        "Garnir de basilic avant de servir"
      ],
      tips: [
        "Ne surcuisez pas les légumes pour garder leur texture",
        "Ajoutez des herbes fraîches pour plus de saveur",
        "Servez avec du quinoa ou du riz complet"
      ],
      equipment: ["Four", "Plaque de cuisson", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 320,
        protein: 12,
        carbs: 35,
        fat: 15,
        fiber: 8,
        sugar: 15,
        sodium: 320
      }
    },
    {
      id: 22,
      name: "Poulet aux herbes",
      emoji: "🍗",
      category: "Dîner",
      goal: "Prise de masse",
      calories: 450,
      prepTime: 35,
      difficulty: "Moyen",
      rating: 4.6,
      protein: 55,
      carbs: 20,
      fat: 18,
      fiber: 4,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Filet de poulet", amount: "200g", category: "Protéines" },
        { name: "Pommes de terre", amount: "200g", category: "Glucides" },
        { name: "Brocoli", amount: "100g", category: "Légumes" },
        { name: "Huile d'olive", amount: "2 c.à.s", category: "Lipides" },
        { name: "Thym", amount: "1 c.à.s", category: "Herbes" },
        { name: "Romarin", amount: "1 c.à.s", category: "Herbes" },
        { name: "Ail", amount: "2 gousses", category: "Aromates" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Préchauffer le four à 180°C",
        "Couper les pommes de terre en morceaux",
        "Assaisonner le poulet avec les herbes",
        "Disposer le poulet et les pommes de terre sur une plaque",
        "Arroser d'huile d'olive et assaisonner",
        "Enfourner pour 30-35 minutes",
        "Ajouter le brocoli 10 minutes avant la fin",
        "Vérifier la cuisson et servir"
      ],
      tips: [
        "Utilisez des herbes fraîches pour plus de saveur",
        "Ne surcuisez pas le poulet pour garder sa tendreté",
        "Servez avec une sauce au choix"
      ],
      equipment: ["Four", "Plaque de cuisson", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 450,
        protein: 55,
        carbs: 20,
        fat: 18,
        fiber: 4,
        sugar: 8,
        sodium: 380
      }
    },
    {
      id: 23,
      name: "Salade de quinoa",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 380,
      prepTime: 25,
      difficulty: "Facile",
      rating: 4.4,
      protein: 15,
      carbs: 45,
      fat: 12,
      fiber: 8,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Quinoa", amount: "100g", category: "Glucides" },
        { name: "Tomates cerises", amount: "100g", category: "Légumes" },
        { name: "Concombre", amount: "80g", category: "Légumes" },
        { name: "Avocat", amount: "1/2", category: "Lipides" },
        { name: "Huile d'olive", amount: "2 c.à.s", category: "Lipides" },
        { name: "Citron", amount: "1/2", category: "Fruits" },
        { name: "Persil", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Cuire le quinoa selon les instructions du paquet",
        "Couper les tomates cerises en deux",
        "Éplucher et couper le concombre en dés",
        "Couper l'avocat en cubes",
        "Mélanger tous les ingrédients dans un saladier",
        "Arroser d'huile d'olive et de jus de citron",
        "Assaisonner avec le sel, le poivre et le persil",
        "Mélanger délicatement et servir"
      ],
      tips: [
        "Laissez refroidir le quinoa avant de l'ajouter",
        "Ajoutez des graines de tournesol pour plus de croquant",
        "Servez frais pour une meilleure saveur"
      ],
      equipment: ["Saladier", "Couteau", "Planche à découper", "Cuillère"],
      nutritionPerServing: {
        calories: 380,
        protein: 15,
        carbs: 45,
        fat: 12,
        fiber: 8,
        sugar: 8,
        sodium: 280
      }
    },
    {
      id: 24,
      name: "Smoothie vert",
      emoji: "🥤",
      category: "Collation",
      goal: "Perte de poids",
      calories: 120,
      prepTime: 8,
      difficulty: "Facile",
      rating: 4.2,
      protein: 6,
      carbs: 20,
      fat: 3,
      fiber: 6,
      servings: 1,
      isPopular: false,
      ingredients: [
        { name: "Épinards", amount: "50g", category: "Légumes" },
        { name: "Kiwi", amount: "1", category: "Fruits" },
        { name: "Pomme verte", amount: "1/2", category: "Fruits" },
        { name: "Concombre", amount: "1/2", category: "Légumes" },
        { name: "Gingembre", amount: "1 c.à.c", category: "Aromates" },
        { name: "Eau", amount: "200ml", category: "Liquides" },
        { name: "Miel", amount: "1 c.à.s", category: "Édulcorants" },
        { name: "Glace", amount: "3-4 glaçons", category: "Liquides" }
      ],
      instructions: [
        "Laver et préparer tous les ingrédients",
        "Ajouter tous les ingrédients dans un blender",
        "Mixer à haute vitesse pendant 30-45 secondes",
        "Vérifier la consistance et ajouter plus d'eau si nécessaire",
        "Verser dans un verre et servir immédiatement"
      ],
      tips: [
        "Utilisez des fruits congelés pour une texture plus crémeuse",
        "Ajoutez des graines de chia pour plus de nutriments",
        "Buvez dans les 30 minutes après l'entraînement"
      ],
      equipment: ["Blender", "Verre", "Cuillère"],
      nutritionPerServing: {
        calories: 120,
        protein: 6,
        carbs: 20,
        fat: 3,
        fiber: 6,
        sugar: 15,
        sodium: 60
      }
    },
    {
      id: 25,
      name: "Burger de bœuf",
      emoji: "🍔",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 750,
      prepTime: 30,
      difficulty: "Moyen",
      rating: 4.7,
      protein: 40,
      carbs: 55,
      fat: 35,
      fiber: 6,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Steak haché", amount: "150g", category: "Protéines" },
        { name: "Pain à burger", amount: "1", category: "Glucides" },
        { name: "Salade", amount: "2 feuilles", category: "Légumes" },
        { name: "Tomate", amount: "2 tranches", category: "Légumes" },
        { name: "Oignon", amount: "2 tranches", category: "Légumes" },
        { name: "Fromage", amount: "1 tranche", category: "Protéines" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Former le steak haché en burger",
        "Cuire le burger dans une poêle à feu moyen",
        "Griller le pain à burger",
        "Assembler le burger avec tous les ingrédients",
        "Servir avec des frites ou une salade"
      ],
      tips: [
        "Utilisez un pain à burger complet pour plus de fibres",
        "Ajoutez des épices au steak haché",
        "Servez avec une sauce au choix"
      ],
      equipment: ["Poêle", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 750,
        protein: 40,
        carbs: 55,
        fat: 35,
        fiber: 6,
        sugar: 8,
        sodium: 450
      }
    },
    {
      id: 26,
      name: "Poisson blanc",
      emoji: "🐟",
      category: "Dîner",
      goal: "Perte de poids",
      calories: 200,
      prepTime: 20,
      difficulty: "Facile",
      rating: 4.3,
      protein: 30,
      carbs: 10,
      fat: 4,
      fiber: 4,
      servings: 1,
      isPopular: false,
      ingredients: [
        { name: "Filet de poisson blanc", amount: "150g", category: "Protéines" },
        { name: "Brocoli", amount: "100g", category: "Légumes" },
        { name: "Carottes", amount: "80g", category: "Légumes" },
        { name: "Courgette", amount: "100g", category: "Légumes" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Citron", amount: "1/2", category: "Fruits" },
        { name: "Aneth", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Préparer un cuit-vapeur ou une casserole avec un panier vapeur",
        "Couper les légumes en morceaux de taille similaire",
        "Assaisonner le poisson avec le sel, le poivre et l'aneth",
        "Disposer les légumes dans le panier vapeur",
        "Placer le poisson sur les légumes",
        "Cuire à la vapeur pendant 15-20 minutes",
        "Arroser d'huile d'olive et de jus de citron avant de servir"
      ],
      tips: [
        "Ne surcuisez pas le poisson pour garder sa tendreté",
        "Ajoutez des épices comme le paprika ou le cumin",
        "Servez avec du riz complet en accompagnement"
      ],
      equipment: ["Cuit-vapeur", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 200,
        protein: 30,
        carbs: 10,
        fat: 4,
        fiber: 4,
        sugar: 6,
        sodium: 280
      }
    },
    {
      id: 27,
      name: "Energy balls",
      emoji: "🍯",
      category: "Collation",
      goal: "Performance",
      calories: 160,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.5,
      protein: 5,
      carbs: 22,
      fat: 7,
      fiber: 3,
      servings: 4,
      isPopular: true,
      ingredients: [
        { name: "Dattes", amount: "100g", category: "Fruits" },
        { name: "Amandes", amount: "50g", category: "Lipides" },
        { name: "Noix de coco râpée", amount: "2 c.à.s", category: "Lipides" },
        { name: "Cacao en poudre", amount: "1 c.à.s", category: "Épices" },
        { name: "Huile de coco", amount: "1 c.à.s", category: "Lipides" },
        { name: "Vanille", amount: "1 c.à.c", category: "Aromates" },
        { name: "Sel", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Dénoyauter les dattes",
        "Ajouter tous les ingrédients dans un robot culinaire",
        "Mixer jusqu'à obtenir une pâte homogène",
        "Former des boules de la taille d'une noix",
        "Rouler dans la noix de coco râpée",
        "Réfrigérer pendant 30 minutes avant de servir"
      ],
      tips: [
        "Utilisez des dattes Medjool pour plus de douceur",
        "Ajoutez des graines de chia pour plus de nutriments",
        "Conservez au réfrigérateur jusqu'à 1 semaine"
      ],
      equipment: ["Robot culinaire", "Cuillère", "Plaque"],
      nutritionPerServing: {
        calories: 160,
        protein: 5,
        carbs: 22,
        fat: 7,
        fiber: 3,
        sugar: 18,
        sodium: 60
      }
    },
    {
      id: 28,
      name: "Pâtes complètes",
      emoji: "🍝",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 420,
      prepTime: 18,
      difficulty: "Facile",
      rating: 4.3,
      protein: 25,
      carbs: 60,
      fat: 10,
      fiber: 5,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Pâtes complètes", amount: "100g", category: "Glucides" },
        { name: "Tomates", amount: "200g", category: "Légumes" },
        { name: "Oignon", amount: "1/2", category: "Légumes" },
        { name: "Ail", amount: "1 gousse", category: "Aromates" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Basilic", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Cuire les pâtes selon les instructions du paquet",
        "Couper les tomates en dés",
        "Émincer l'oignon et l'ail",
        "Faire revenir l'oignon et l'ail dans l'huile d'olive",
        "Ajouter les tomates et laisser mijoter 10 minutes",
        "Mélanger avec les pâtes et assaisonner",
        "Garnir de basilic et servir chaud"
      ],
      tips: [
        "Utilisez des pâtes complètes pour plus de fibres",
        "Ajoutez des olives noires pour plus de saveur",
        "Servez avec du parmesan râpé"
      ],
      equipment: ["Casserole", "Poêle", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 420,
        protein: 25,
        carbs: 60,
        fat: 10,
        fiber: 5,
        sugar: 6,
        sodium: 320
      }
    },
    {
      id: 29,
      name: "Toast à l'avocat",
      emoji: "🥑",
      category: "Petit-déjeuner",
      goal: "Performance",
      calories: 320,
      prepTime: 10,
      difficulty: "Facile",
      rating: 4.4,
      protein: 15,
      carbs: 20,
      fat: 22,
      fiber: 6,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Pain complet", amount: "2 tranches", category: "Glucides" },
        { name: "Avocat", amount: "1", category: "Lipides" },
        { name: "Citron", amount: "1/2", category: "Fruits" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" },
        { name: "Persil", amount: "1 c.à.s", category: "Herbes" }
      ],
      instructions: [
        "Griller les tranches de pain",
        "Écraser l'avocat avec le jus de citron",
        "Assaisonner l'avocat avec le sel et le poivre",
        "Tartiner l'avocat sur le pain grillé",
        "Arroser d'huile d'olive et garnir de persil",
        "Servir immédiatement"
      ],
      tips: [
        "Utilisez du pain complet pour plus de fibres",
        "Ajoutez des graines de chia sur l'avocat",
        "Servez avec des tomates cerises"
      ],
      equipment: ["Grille-pain", "Fourchette", "Couteau"],
      nutritionPerServing: {
        calories: 320,
        protein: 15,
        carbs: 20,
        fat: 22,
        fiber: 6,
        sugar: 3,
        sodium: 280
      }
    },
    {
      id: 30,
      name: "Soupe de légumes",
      emoji: "🍲",
      category: "Dîner",
      goal: "Perte de poids",
      calories: 150,
      prepTime: 25,
      difficulty: "Facile",
      rating: 4.1,
      protein: 6,
      carbs: 20,
      fat: 4,
      fiber: 8,
      servings: 2,
      isPopular: false,
      ingredients: [
        { name: "Courgette", amount: "200g", category: "Légumes" },
        { name: "Carottes", amount: "150g", category: "Légumes" },
        { name: "Tomates", amount: "200g", category: "Légumes" },
        { name: "Oignon", amount: "1", category: "Légumes" },
        { name: "Ail", amount: "2 gousses", category: "Aromates" },
        { name: "Bouillon de légumes", amount: "500ml", category: "Liquides" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Basilic", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Couper tous les légumes en morceaux",
        "Faire revenir l'oignon et l'ail dans l'huile d'olive",
        "Ajouter les légumes et le bouillon",
        "Porter à ébullition et laisser mijoter 20 minutes",
        "Mixer la soupe jusqu'à obtenir une consistance lisse",
        "Assaisonner avec le sel, le poivre et le basilic",
        "Servir chaud"
      ],
      tips: [
        "Ajoutez des légumes verts pour plus de nutriments",
        "Servez avec des croûtons de pain complet",
        "Conservez au réfrigérateur jusqu'à 3 jours"
      ],
      equipment: ["Casserole", "Mixeur", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 150,
        protein: 6,
        carbs: 20,
        fat: 4,
        fiber: 8,
        sugar: 10,
        sodium: 240
      }
    },
    {
      id: 31,
      name: "Bowl de riz au poulet",
      emoji: "🍱",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 680,
      prepTime: 25,
      difficulty: "Moyen",
      rating: 4.5,
      protein: 50,
      carbs: 75,
      fat: 15,
      fiber: 5,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Riz complet", amount: "150g", category: "Glucides" },
        { name: "Filet de poulet", amount: "150g", category: "Protéines" },
        { name: "Brocoli", amount: "100g", category: "Légumes" },
        { name: "Carottes", amount: "80g", category: "Légumes" },
        { name: "Huile de sésame", amount: "1 c.à.s", category: "Lipides" },
        { name: "Gingembre", amount: "1 c.à.c", category: "Aromates" },
        { name: "Ail", amount: "1 gousse", category: "Aromates" },
        { name: "Sésame", amount: "1 c.à.s", category: "Lipides" }
      ],
      instructions: [
        "Cuire le riz selon les instructions du paquet",
        "Couper le poulet en dés",
        "Préparer les légumes en morceaux",
        "Faire revenir le poulet dans l'huile de sésame",
        "Ajouter les légumes et l'ail",
        "Laisser mijoter 10 minutes",
        "Servir sur le riz et garnir de sésame"
      ],
      tips: [
        "Utilisez du riz complet pour plus de fibres",
        "Ajoutez des légumes verts pour plus de nutriments",
        "Servez avec des algues nori"
      ],
      equipment: ["Casserole", "Poêle", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 680,
        protein: 50,
        carbs: 75,
        fat: 15,
        fiber: 5,
        sugar: 8,
        sodium: 380
      }
    },
    {
      id: 32,
      name: "Smoothie chocolat",
      emoji: "🥤",
      category: "Post-workout",
      goal: "Récupération",
      calories: 300,
      prepTime: 6,
      difficulty: "Facile",
      rating: 4.6,
      protein: 20,
      carbs: 35,
      fat: 10,
      fiber: 6,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Protéine en poudre", amount: "25g", category: "Protéines" },
        { name: "Banane", amount: "1", category: "Fruits" },
        { name: "Cacao en poudre", amount: "1 c.à.s", category: "Épices" },
        { name: "Lait d'amande", amount: "200ml", category: "Liquides" },
        { name: "Beurre de cacahuète", amount: "1 c.à.s", category: "Lipides" },
        { name: "Miel", amount: "1 c.à.s", category: "Édulcorants" },
        { name: "Glace", amount: "3-4 glaçons", category: "Liquides" }
      ],
      instructions: [
        "Ajouter tous les ingrédients dans un blender",
        "Mixer à haute vitesse pendant 30-45 secondes",
        "Vérifier la consistance et ajouter plus de liquide si nécessaire",
        "Verser dans un verre et servir immédiatement"
      ],
      tips: [
        "Utilisez des fruits congelés pour une texture plus crémeuse",
        "Ajoutez des épinards pour plus de nutriments",
        "Buvez dans les 30 minutes après l'entraînement"
      ],
      equipment: ["Blender", "Verre", "Cuillère"],
      nutritionPerServing: {
        calories: 300,
        protein: 20,
        carbs: 35,
        fat: 10,
        fiber: 6,
        sugar: 25,
        sodium: 80
      }
    },
    {
      id: 33,
      name: "Salade de quinoa aux légumes",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 420,
      prepTime: 25,
      difficulty: "Facile",
      rating: 4.4,
      protein: 18,
      carbs: 55,
      fat: 12,
      fiber: 10,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Quinoa", amount: "80g", category: "Glucides" },
        { name: "Tomates cerises", amount: "100g", category: "Légumes" },
        { name: "Concombre", amount: "80g", category: "Légumes" },
        { name: "Avocat", amount: "1/2", category: "Lipides" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Citron", amount: "1/2", category: "Fruits" },
        { name: "Persil", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Cuire le quinoa selon les instructions du paquet",
        "Couper les tomates cerises en deux",
        "Éplucher et couper le concombre en dés",
        "Couper l'avocat en cubes",
        "Mélanger tous les ingrédients dans un saladier",
        "Arroser d'huile d'olive et de jus de citron",
        "Assaisonner avec le sel, le poivre et le persil",
        "Mélanger délicatement et servir"
      ],
      tips: [
        "Laissez refroidir le quinoa avant de l'ajouter",
        "Ajoutez des graines de tournesol pour plus de croquant",
        "Servez frais pour une meilleure saveur"
      ],
      equipment: ["Saladier", "Couteau", "Planche à découper", "Cuillère"],
      nutritionPerServing: {
        calories: 420,
        protein: 18,
        carbs: 55,
        fat: 12,
        fiber: 10,
        sugar: 8,
        sodium: 280
      }
    },
    {
      id: 34,
      name: "Smoothie vert détox",
      emoji: "🥤",
      category: "Collation",
      goal: "Perte de poids",
      calories: 150,
      prepTime: 8,
      difficulty: "Facile",
      rating: 4.2,
      protein: 8,
      carbs: 25,
      fat: 4,
      fiber: 8,
      servings: 1,
      isPopular: false,
      ingredients: [
        { name: "Épinards", amount: "50g", category: "Légumes" },
        { name: "Kiwi", amount: "1", category: "Fruits" },
        { name: "Pomme verte", amount: "1/2", category: "Fruits" },
        { name: "Concombre", amount: "1/2", category: "Légumes" },
        { name: "Gingembre", amount: "1 c.à.c", category: "Aromates" },
        { name: "Eau", amount: "200ml", category: "Liquides" },
        { name: "Miel", amount: "1 c.à.s", category: "Édulcorants" },
        { name: "Glace", amount: "3-4 glaçons", category: "Liquides" }
      ],
      instructions: [
        "Laver et préparer tous les ingrédients",
        "Ajouter tous les ingrédients dans un blender",
        "Mixer à haute vitesse pendant 30-45 secondes",
        "Vérifier la consistance et ajouter plus d'eau si nécessaire",
        "Verser dans un verre et servir immédiatement"
      ],
      tips: [
        "Utilisez des fruits congelés pour une texture plus crémeuse",
        "Ajoutez des graines de chia pour plus de nutriments",
        "Buvez dans les 30 minutes après l'entraînement"
      ],
      equipment: ["Blender", "Verre", "Cuillère"],
      nutritionPerServing: {
        calories: 150,
        protein: 8,
        carbs: 25,
        fat: 4,
        fiber: 8,
        sugar: 18,
        sodium: 80
      }
    },
    {
      id: 35,
      name: "Burger de bœuf aux patates douces",
      emoji: "🍔",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 850,
      prepTime: 35,
      difficulty: "Moyen",
      rating: 4.8,
      protein: 45,
      carbs: 65,
      fat: 35,
      fiber: 8,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Steak haché", amount: "150g", category: "Protéines" },
        { name: "Pain à burger", amount: "1", category: "Glucides" },
        { name: "Patate douce", amount: "200g", category: "Glucides" },
        { name: "Salade", amount: "2 feuilles", category: "Légumes" },
        { name: "Tomate", amount: "2 tranches", category: "Légumes" },
        { name: "Oignon", amount: "2 tranches", category: "Légumes" },
        { name: "Fromage", amount: "1 tranche", category: "Protéines" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Préchauffer le four à 200°C",
        "Couper les patates douces en frites",
        "Enrober les frites d'huile d'olive et assaisonner",
        "Enfourner les frites pour 25-30 minutes",
        "Former le steak haché en burger",
        "Cuire le burger dans une poêle à feu moyen",
        "Griller le pain à burger",
        "Assembler le burger avec tous les ingrédients",
        "Servir avec les frites de patates douces"
      ],
      tips: [
        "Utilisez un pain à burger complet pour plus de fibres",
        "Ajoutez des épices au steak haché",
        "Servez avec une sauce au choix"
      ],
      equipment: ["Poêle", "Four", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 850,
        protein: 45,
        carbs: 65,
        fat: 35,
        fiber: 8,
        sugar: 12,
        sodium: 450
      }
    },
    {
      id: 36,
      name: "Poisson blanc aux herbes",
      emoji: "🐟",
      category: "Dîner",
      goal: "Perte de poids",
      calories: 220,
      prepTime: 25,
      difficulty: "Facile",
      rating: 4.3,
      protein: 35,
      carbs: 15,
      fat: 5,
      fiber: 8,
      servings: 1,
      isPopular: false,
      ingredients: [
        { name: "Filet de poisson blanc", amount: "150g", category: "Protéines" },
        { name: "Brocoli", amount: "100g", category: "Légumes" },
        { name: "Carottes", amount: "80g", category: "Légumes" },
        { name: "Courgette", amount: "100g", category: "Légumes" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Citron", amount: "1/2", category: "Fruits" },
        { name: "Aneth", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Préparer un cuit-vapeur ou une casserole avec un panier vapeur",
        "Couper les légumes en morceaux de taille similaire",
        "Assaisonner le poisson avec le sel, le poivre et l'aneth",
        "Disposer les légumes dans le panier vapeur",
        "Placer le poisson sur les légumes",
        "Cuire à la vapeur pendant 15-20 minutes",
        "Arroser d'huile d'olive et de jus de citron avant de servir"
      ],
      tips: [
        "Ne surcuisez pas le poisson pour garder sa tendreté",
        "Ajoutez des épices comme le paprika ou le cumin",
        "Servez avec du riz complet en accompagnement"
      ],
      equipment: ["Cuit-vapeur", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 220,
        protein: 35,
        carbs: 15,
        fat: 5,
        fiber: 8,
        sugar: 8,
        sodium: 280
      }
    },
    {
      id: 37,
      name: "Energy balls aux dattes",
      emoji: "🍯",
      category: "Collation",
      goal: "Performance",
      calories: 180,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.6,
      protein: 6,
      carbs: 25,
      fat: 8,
      fiber: 4,
      servings: 4,
      isPopular: true,
      ingredients: [
        { name: "Dattes", amount: "100g", category: "Fruits" },
        { name: "Amandes", amount: "50g", category: "Lipides" },
        { name: "Noix de coco râpée", amount: "2 c.à.s", category: "Lipides" },
        { name: "Cacao en poudre", amount: "1 c.à.s", category: "Épices" },
        { name: "Huile de coco", amount: "1 c.à.s", category: "Lipides" },
        { name: "Vanille", amount: "1 c.à.c", category: "Aromates" },
        { name: "Sel", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Dénoyauter les dattes",
        "Ajouter tous les ingrédients dans un robot culinaire",
        "Mixer jusqu'à obtenir une pâte homogène",
        "Former des boules de la taille d'une noix",
        "Rouler dans la noix de coco râpée",
        "Réfrigérer pendant 30 minutes avant de servir"
      ],
      tips: [
        "Utilisez des dattes Medjool pour plus de douceur",
        "Ajoutez des graines de chia pour plus de nutriments",
        "Conservez au réfrigérateur jusqu'à 1 semaine"
      ],
      equipment: ["Robot culinaire", "Cuillère", "Plaque"],
      nutritionPerServing: {
        calories: 180,
        protein: 6,
        carbs: 25,
        fat: 8,
        fiber: 4,
        sugar: 20,
        sodium: 80
      }
    },
    {
      id: 38,
      name: "Pâtes complètes au thon",
      emoji: "🍝",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 480,
      prepTime: 20,
      difficulty: "Facile",
      rating: 4.4,
      protein: 30,
      carbs: 65,
      fat: 12,
      fiber: 6,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Pâtes complètes", amount: "100g", category: "Glucides" },
        { name: "Thon en boîte", amount: "80g", category: "Protéines" },
        { name: "Tomates", amount: "200g", category: "Légumes" },
        { name: "Oignon", amount: "1/2", category: "Légumes" },
        { name: "Ail", amount: "1 gousse", category: "Aromates" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Basilic", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Cuire les pâtes selon les instructions du paquet",
        "Égoutter le thon et l'émietter",
        "Couper les tomates en dés",
        "Émincer l'oignon et l'ail",
        "Faire revenir l'oignon et l'ail dans l'huile d'olive",
        "Ajouter les tomates et laisser mijoter 10 minutes",
        "Ajouter le thon et le basilic",
        "Mélanger avec les pâtes et assaisonner",
        "Servir chaud"
      ],
      tips: [
        "Utilisez des pâtes complètes pour plus de fibres",
        "Ajoutez des olives noires pour plus de saveur",
        "Servez avec du parmesan râpé"
      ],
      equipment: ["Casserole", "Poêle", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 480,
        protein: 30,
        carbs: 65,
        fat: 12,
        fiber: 6,
        sugar: 8,
        sodium: 380
      }
    },
    {
      id: 39,
      name: "Toast à l'avocat et œufs",
      emoji: "🥑",
      category: "Petit-déjeuner",
      goal: "Performance",
      calories: 380,
      prepTime: 12,
      difficulty: "Facile",
      rating: 4.4,
      protein: 20,
      carbs: 25,
      fat: 25,
      fiber: 8,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Pain complet", amount: "2 tranches", category: "Glucides" },
        { name: "Avocat", amount: "1", category: "Lipides" },
        { name: "Œufs", amount: "2", category: "Protéines" },
        { name: "Citron", amount: "1/2", category: "Fruits" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" },
        { name: "Persil", amount: "1 c.à.s", category: "Herbes" }
      ],
      instructions: [
        "Griller les tranches de pain",
        "Écraser l'avocat avec le jus de citron",
        "Assaisonner l'avocat avec le sel et le poivre",
        "Cuire les œufs au plat",
        "Tartiner l'avocat sur le pain grillé",
        "Déposer les œufs sur l'avocat",
        "Arroser d'huile d'olive et garnir de persil",
        "Servir immédiatement"
      ],
      tips: [
        "Utilisez du pain complet pour plus de fibres",
        "Ajoutez des graines de chia sur l'avocat",
        "Servez avec des tomates cerises"
      ],
      equipment: ["Grille-pain", "Poêle", "Fourchette", "Couteau"],
      nutritionPerServing: {
        calories: 380,
        protein: 20,
        carbs: 25,
        fat: 25,
        fiber: 8,
        sugar: 4,
        sodium: 320
      }
    },
    {
      id: 40,
      name: "Soupe de légumes minceur",
      emoji: "🍲",
      category: "Dîner",
      goal: "Perte de poids",
      calories: 180,
      prepTime: 30,
      difficulty: "Facile",
      rating: 4.2,
      protein: 8,
      carbs: 25,
      fat: 5,
      fiber: 12,
      servings: 2,
      isPopular: false,
      ingredients: [
        { name: "Courgette", amount: "200g", category: "Légumes" },
        { name: "Carottes", amount: "150g", category: "Légumes" },
        { name: "Tomates", amount: "200g", category: "Légumes" },
        { name: "Oignon", amount: "1", category: "Légumes" },
        { name: "Ail", amount: "2 gousses", category: "Aromates" },
        { name: "Bouillon de légumes", amount: "500ml", category: "Liquides" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Basilic", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Couper tous les légumes en morceaux",
        "Faire revenir l'oignon et l'ail dans l'huile d'olive",
        "Ajouter les légumes et le bouillon",
        "Porter à ébullition et laisser mijoter 20 minutes",
        "Mixer la soupe jusqu'à obtenir une consistance lisse",
        "Assaisonner avec le sel, le poivre et le basilic",
        "Servir chaud"
      ],
      tips: [
        "Ajoutez des légumes verts pour plus de nutriments",
        "Servez avec des croûtons de pain complet",
        "Conservez au réfrigérateur jusqu'à 3 jours"
      ],
      equipment: ["Casserole", "Mixeur", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 180,
        protein: 8,
        carbs: 25,
        fat: 5,
        fiber: 12,
        sugar: 12,
        sodium: 280
      }
    },
    {
      id: 41,
      name: "Bowl de riz au poulet teriyaki",
      emoji: "🍱",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 750,
      prepTime: 30,
      difficulty: "Moyen",
      rating: 4.6,
      protein: 55,
      carbs: 85,
      fat: 18,
      fiber: 6,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Riz complet", amount: "150g", category: "Glucides" },
        { name: "Filet de poulet", amount: "150g", category: "Protéines" },
        { name: "Brocoli", amount: "100g", category: "Légumes" },
        { name: "Carottes", amount: "80g", category: "Légumes" },
        { name: "Sauce teriyaki", amount: "2 c.à.s", category: "Sauces" },
        { name: "Huile de sésame", amount: "1 c.à.s", category: "Lipides" },
        { name: "Gingembre", amount: "1 c.à.c", category: "Aromates" },
        { name: "Ail", amount: "1 gousse", category: "Aromates" },
        { name: "Sésame", amount: "1 c.à.s", category: "Lipides" }
      ],
      instructions: [
        "Cuire le riz selon les instructions du paquet",
        "Couper le poulet en dés",
        "Préparer les légumes en morceaux",
        "Faire revenir le poulet dans l'huile de sésame",
        "Ajouter les légumes et l'ail",
        "Arroser de sauce teriyaki",
        "Laisser mijoter 10 minutes",
        "Servir sur le riz et garnir de sésame"
      ],
      tips: [
        "Utilisez du riz complet pour plus de fibres",
        "Ajoutez des légumes verts pour plus de nutriments",
        "Servez avec des algues nori"
      ],
      equipment: ["Casserole", "Poêle", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 750,
        protein: 55,
        carbs: 85,
        fat: 18,
        fiber: 6,
        sugar: 15,
        sodium: 450
      }
    },
    {
      id: 42,
      name: "Smoothie chocolat-banane",
      emoji: "🥤",
      category: "Post-workout",
      goal: "Récupération",
      calories: 350,
      prepTime: 8,
      difficulty: "Facile",
      rating: 4.7,
      protein: 25,
      carbs: 45,
      fat: 12,
      fiber: 8,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Protéine en poudre", amount: "30g", category: "Protéines" },
        { name: "Banane", amount: "1", category: "Fruits" },
        { name: "Cacao en poudre", amount: "1 c.à.s", category: "Épices" },
        { name: "Lait d'amande", amount: "200ml", category: "Liquides" },
        { name: "Beurre de cacahuète", amount: "1 c.à.s", category: "Lipides" },
        { name: "Miel", amount: "1 c.à.s", category: "Édulcorants" },
        { name: "Glace", amount: "3-4 glaçons", category: "Liquides" }
      ],
      instructions: [
        "Ajouter tous les ingrédients dans un blender",
        "Mixer à haute vitesse pendant 30-45 secondes",
        "Vérifier la consistance et ajouter plus de liquide si nécessaire",
        "Verser dans un verre et servir immédiatement"
      ],
      tips: [
        "Utilisez des fruits congelés pour une texture plus crémeuse",
        "Ajoutez des épinards pour plus de nutriments",
        "Buvez dans les 30 minutes après l'entraînement"
      ],
      equipment: ["Blender", "Verre", "Cuillère"],
      nutritionPerServing: {
        calories: 350,
        protein: 25,
        carbs: 45,
        fat: 12,
        fiber: 8,
        sugar: 30,
        sodium: 100
      }
    },
    {
      id: 43,
      name: "Salade de chou",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Perte de poids",
      calories: 180,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.1,
      protein: 8,
      carbs: 20,
      fat: 8,
      fiber: 6,
      servings: 2,
      isPopular: false,
      ingredients: [
        { name: "Chou blanc", amount: "300g", category: "Légumes" },
        { name: "Carottes", amount: "100g", category: "Légumes" },
        { name: "Oignon", amount: "1/2", category: "Légumes" },
        { name: "Vinaigre", amount: "2 c.à.s", category: "Condiments" },
        { name: "Huile d'olive", amount: "2 c.à.s", category: "Lipides" },
        { name: "Moutarde", amount: "1 c.à.s", category: "Condiments" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" },
        { name: "Persil", amount: "1 c.à.s", category: "Herbes" }
      ],
      instructions: [
        "Râper le chou blanc finement",
        "Râper les carottes",
        "Émincer l'oignon",
        "Mélanger tous les légumes dans un saladier",
        "Préparer la vinaigrette avec vinaigre, huile, moutarde",
        "Assaisonner avec sel et poivre",
        "Verser la vinaigrette sur la salade",
        "Mélanger délicatement et laisser mariner 30 minutes",
        "Garnir de persil avant de servir"
      ],
      tips: [
        "Laissez mariner au moins 30 minutes pour plus de saveur",
        "Ajoutez des graines de tournesol pour plus de croquant",
        "Servez frais pour une meilleure texture"
      ],
      equipment: ["Saladier", "Râpe", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 180,
        protein: 8,
        carbs: 20,
        fat: 8,
        fiber: 6,
        sugar: 12,
        sodium: 280
      }
    },
    {
      id: 44,
      name: "Bowl de légumes grillés",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 320,
      prepTime: 30,
      difficulty: "Facile",
      rating: 4.3,
      protein: 12,
      carbs: 35,
      fat: 15,
      fiber: 8,
      servings: 1,
      isPopular: false,
      ingredients: [
        { name: "Aubergine", amount: "150g", category: "Légumes" },
        { name: "Courgette", amount: "150g", category: "Légumes" },
        { name: "Poivron", amount: "1", category: "Légumes" },
        { name: "Tomates", amount: "100g", category: "Légumes" },
        { name: "Huile d'olive", amount: "2 c.à.s", category: "Lipides" },
        { name: "Ail", amount: "2 gousses", category: "Aromates" },
        { name: "Basilic", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Préchauffer le four à 200°C",
        "Couper tous les légumes en morceaux",
        "Disposer sur une plaque de cuisson",
        "Arroser d'huile d'olive et assaisonner",
        "Enfourner pour 25-30 minutes",
        "Retourner à mi-cuisson",
        "Garnir de basilic avant de servir"
      ],
      tips: [
        "Ne surcuisez pas les légumes pour garder leur texture",
        "Ajoutez des herbes fraîches pour plus de saveur",
        "Servez avec du quinoa ou du riz complet"
      ],
      equipment: ["Four", "Plaque de cuisson", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 320,
        protein: 12,
        carbs: 35,
        fat: 15,
        fiber: 8,
        sugar: 15,
        sodium: 320
      }
    },
    {
      id: 45,
      name: "Poulet aux herbes",
      emoji: "🍗",
      category: "Dîner",
      goal: "Prise de masse",
      calories: 450,
      prepTime: 35,
      difficulty: "Moyen",
      rating: 4.6,
      protein: 55,
      carbs: 20,
      fat: 18,
      fiber: 4,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Filet de poulet", amount: "200g", category: "Protéines" },
        { name: "Pommes de terre", amount: "200g", category: "Glucides" },
        { name: "Brocoli", amount: "100g", category: "Légumes" },
        { name: "Huile d'olive", amount: "2 c.à.s", category: "Lipides" },
        { name: "Thym", amount: "1 c.à.s", category: "Herbes" },
        { name: "Romarin", amount: "1 c.à.s", category: "Herbes" },
        { name: "Ail", amount: "2 gousses", category: "Aromates" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Préchauffer le four à 180°C",
        "Couper les pommes de terre en morceaux",
        "Assaisonner le poulet avec les herbes",
        "Disposer le poulet et les pommes de terre sur une plaque",
        "Arroser d'huile d'olive et assaisonner",
        "Enfourner pour 30-35 minutes",
        "Ajouter le brocoli 10 minutes avant la fin",
        "Vérifier la cuisson et servir"
      ],
      tips: [
        "Utilisez des herbes fraîches pour plus de saveur",
        "Ne surcuisez pas le poulet pour garder sa tendreté",
        "Servez avec une sauce au choix"
      ],
      equipment: ["Four", "Plaque de cuisson", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 450,
        protein: 55,
        carbs: 20,
        fat: 18,
        fiber: 4,
        sugar: 8,
        sodium: 380
      }
    },
    {
      id: 46,
      name: "Salade de quinoa",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 380,
      prepTime: 25,
      difficulty: "Facile",
      rating: 4.4,
      protein: 15,
      carbs: 45,
      fat: 12,
      fiber: 8,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Quinoa", amount: "100g", category: "Glucides" },
        { name: "Tomates cerises", amount: "100g", category: "Légumes" },
        { name: "Concombre", amount: "80g", category: "Légumes" },
        { name: "Avocat", amount: "1/2", category: "Lipides" },
        { name: "Huile d'olive", amount: "2 c.à.s", category: "Lipides" },
        { name: "Citron", amount: "1/2", category: "Fruits" },
        { name: "Persil", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Cuire le quinoa selon les instructions du paquet",
        "Couper les tomates cerises en deux",
        "Éplucher et couper le concombre en dés",
        "Couper l'avocat en cubes",
        "Mélanger tous les ingrédients dans un saladier",
        "Arroser d'huile d'olive et de jus de citron",
        "Assaisonner avec le sel, le poivre et le persil",
        "Mélanger délicatement et servir"
      ],
      tips: [
        "Laissez refroidir le quinoa avant de l'ajouter",
        "Ajoutez des graines de tournesol pour plus de croquant",
        "Servez frais pour une meilleure saveur"
      ],
      equipment: ["Saladier", "Couteau", "Planche à découper", "Cuillère"],
      nutritionPerServing: {
        calories: 380,
        protein: 15,
        carbs: 45,
        fat: 12,
        fiber: 8,
        sugar: 8,
        sodium: 280
      }
    },
    {
      id: 47,
      name: "Smoothie vert",
      emoji: "🥤",
      category: "Collation",
      goal: "Perte de poids",
      calories: 120,
      prepTime: 8,
      difficulty: "Facile",
      rating: 4.2,
      protein: 6,
      carbs: 20,
      fat: 3,
      fiber: 6,
      servings: 1,
      isPopular: false,
      ingredients: [
        { name: "Épinards", amount: "50g", category: "Légumes" },
        { name: "Kiwi", amount: "1", category: "Fruits" },
        { name: "Pomme verte", amount: "1/2", category: "Fruits" },
        { name: "Concombre", amount: "1/2", category: "Légumes" },
        { name: "Gingembre", amount: "1 c.à.c", category: "Aromates" },
        { name: "Eau", amount: "200ml", category: "Liquides" },
        { name: "Miel", amount: "1 c.à.s", category: "Édulcorants" },
        { name: "Glace", amount: "3-4 glaçons", category: "Liquides" }
      ],
      instructions: [
        "Laver et préparer tous les ingrédients",
        "Ajouter tous les ingrédients dans un blender",
        "Mixer à haute vitesse pendant 30-45 secondes",
        "Vérifier la consistance et ajouter plus d'eau si nécessaire",
        "Verser dans un verre et servir immédiatement"
      ],
      tips: [
        "Utilisez des fruits congelés pour une texture plus crémeuse",
        "Ajoutez des graines de chia pour plus de nutriments",
        "Buvez dans les 30 minutes après l'entraînement"
      ],
      equipment: ["Blender", "Verre", "Cuillère"],
      nutritionPerServing: {
        calories: 120,
        protein: 6,
        carbs: 20,
        fat: 3,
        fiber: 6,
        sugar: 15,
        sodium: 60
      }
    },
    {
      id: 48,
      name: "Burger de bœuf",
      emoji: "🍔",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 750,
      prepTime: 30,
      difficulty: "Moyen",
      rating: 4.7,
      protein: 40,
      carbs: 55,
      fat: 35,
      fiber: 6,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Steak haché", amount: "150g", category: "Protéines" },
        { name: "Pain à burger", amount: "1", category: "Glucides" },
        { name: "Salade", amount: "2 feuilles", category: "Légumes" },
        { name: "Tomate", amount: "2 tranches", category: "Légumes" },
        { name: "Oignon", amount: "2 tranches", category: "Légumes" },
        { name: "Fromage", amount: "1 tranche", category: "Protéines" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Former le steak haché en burger",
        "Cuire le burger dans une poêle à feu moyen",
        "Griller le pain à burger",
        "Assembler le burger avec tous les ingrédients",
        "Servir avec des frites ou une salade"
      ],
      tips: [
        "Utilisez un pain à burger complet pour plus de fibres",
        "Ajoutez des épices au steak haché",
        "Servez avec une sauce au choix"
      ],
      equipment: ["Poêle", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 750,
        protein: 40,
        carbs: 55,
        fat: 35,
        fiber: 6,
        sugar: 8,
        sodium: 450
      }
    },
    {
      id: 49,
      name: "Poisson blanc",
      emoji: "🐟",
      category: "Dîner",
      goal: "Perte de poids",
      calories: 200,
      prepTime: 20,
      difficulty: "Facile",
      rating: 4.3,
      protein: 30,
      carbs: 10,
      fat: 4,
      fiber: 4,
      servings: 1,
      isPopular: false,
      ingredients: [
        { name: "Filet de poisson blanc", amount: "150g", category: "Protéines" },
        { name: "Brocoli", amount: "100g", category: "Légumes" },
        { name: "Carottes", amount: "80g", category: "Légumes" },
        { name: "Courgette", amount: "100g", category: "Légumes" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Citron", amount: "1/2", category: "Fruits" },
        { name: "Aneth", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Préparer un cuit-vapeur ou une casserole avec un panier vapeur",
        "Couper les légumes en morceaux de taille similaire",
        "Assaisonner le poisson avec le sel, le poivre et l'aneth",
        "Disposer les légumes dans le panier vapeur",
        "Placer le poisson sur les légumes",
        "Cuire à la vapeur pendant 15-20 minutes",
        "Arroser d'huile d'olive et de jus de citron avant de servir"
      ],
      tips: [
        "Ne surcuisez pas le poisson pour garder sa tendreté",
        "Ajoutez des épices comme le paprika ou le cumin",
        "Servez avec du riz complet en accompagnement"
      ],
      equipment: ["Cuit-vapeur", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 200,
        protein: 30,
        carbs: 10,
        fat: 4,
        fiber: 4,
        sugar: 6,
        sodium: 280
      }
    },
    {
      id: 50,
      name: "Energy balls",
      emoji: "🍯",
      category: "Collation",
      goal: "Performance",
      calories: 160,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.5,
      protein: 5,
      carbs: 22,
      fat: 7,
      fiber: 3,
      servings: 4,
      isPopular: true,
      ingredients: [
        { name: "Dattes", amount: "100g", category: "Fruits" },
        { name: "Amandes", amount: "50g", category: "Lipides" },
        { name: "Noix de coco râpée", amount: "2 c.à.s", category: "Lipides" },
        { name: "Cacao en poudre", amount: "1 c.à.s", category: "Épices" },
        { name: "Huile de coco", amount: "1 c.à.s", category: "Lipides" },
        { name: "Vanille", amount: "1 c.à.c", category: "Aromates" },
        { name: "Sel", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Dénoyauter les dattes",
        "Ajouter tous les ingrédients dans un robot culinaire",
        "Mixer jusqu'à obtenir une pâte homogène",
        "Former des boules de la taille d'une noix",
        "Rouler dans la noix de coco râpée",
        "Réfrigérer pendant 30 minutes avant de servir"
      ],
      tips: [
        "Utilisez des dattes Medjool pour plus de douceur",
        "Ajoutez des graines de chia pour plus de nutriments",
        "Conservez au réfrigérateur jusqu'à 1 semaine"
      ],
      equipment: ["Robot culinaire", "Cuillère", "Plaque"],
      nutritionPerServing: {
        calories: 160,
        protein: 5,
        carbs: 22,
        fat: 7,
        fiber: 3,
        sugar: 18,
        sodium: 60
      }
    },
    {
      id: 51,
      name: "Pâtes complètes",
      emoji: "🍝",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 420,
      prepTime: 18,
      difficulty: "Facile",
      rating: 4.3,
      protein: 25,
      carbs: 60,
      fat: 10,
      fiber: 5,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Pâtes complètes", amount: "100g", category: "Glucides" },
        { name: "Tomates", amount: "200g", category: "Légumes" },
        { name: "Oignon", amount: "1/2", category: "Légumes" },
        { name: "Ail", amount: "1 gousse", category: "Aromates" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Basilic", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Cuire les pâtes selon les instructions du paquet",
        "Couper les tomates en dés",
        "Émincer l'oignon et l'ail",
        "Faire revenir l'oignon et l'ail dans l'huile d'olive",
        "Ajouter les tomates et laisser mijoter 10 minutes",
        "Mélanger avec les pâtes et assaisonner",
        "Garnir de basilic et servir chaud"
      ],
      tips: [
        "Utilisez des pâtes complètes pour plus de fibres",
        "Ajoutez des olives noires pour plus de saveur",
        "Servez avec du parmesan râpé"
      ],
      equipment: ["Casserole", "Poêle", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 420,
        protein: 25,
        carbs: 60,
        fat: 10,
        fiber: 5,
        sugar: 6,
        sodium: 320
      }
    },
    {
      id: 52,
      name: "Toast à l'avocat",
      emoji: "🥑",
      category: "Petit-déjeuner",
      goal: "Performance",
      calories: 320,
      prepTime: 10,
      difficulty: "Facile",
      rating: 4.4,
      protein: 15,
      carbs: 20,
      fat: 22,
      fiber: 6,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Pain complet", amount: "2 tranches", category: "Glucides" },
        { name: "Avocat", amount: "1", category: "Lipides" },
        { name: "Citron", amount: "1/2", category: "Fruits" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" },
        { name: "Persil", amount: "1 c.à.s", category: "Herbes" }
      ],
      instructions: [
        "Griller les tranches de pain",
        "Écraser l'avocat avec le jus de citron",
        "Assaisonner l'avocat avec le sel et le poivre",
        "Tartiner l'avocat sur le pain grillé",
        "Arroser d'huile d'olive et garnir de persil",
        "Servir immédiatement"
      ],
      tips: [
        "Utilisez du pain complet pour plus de fibres",
        "Ajoutez des graines de chia sur l'avocat",
        "Servez avec des tomates cerises"
      ],
      equipment: ["Grille-pain", "Fourchette", "Couteau"],
      nutritionPerServing: {
        calories: 320,
        protein: 15,
        carbs: 20,
        fat: 22,
        fiber: 6,
        sugar: 3,
        sodium: 280
      }
    },
    {
      id: 53,
      name: "Soupe de légumes",
      emoji: "🍲",
      category: "Dîner",
      goal: "Perte de poids",
      calories: 150,
      prepTime: 25,
      difficulty: "Facile",
      rating: 4.1,
      protein: 6,
      carbs: 20,
      fat: 4,
      fiber: 8,
      servings: 2,
      isPopular: false,
      ingredients: [
        { name: "Courgette", amount: "200g", category: "Légumes" },
        { name: "Carottes", amount: "150g", category: "Légumes" },
        { name: "Tomates", amount: "200g", category: "Légumes" },
        { name: "Oignon", amount: "1", category: "Légumes" },
        { name: "Ail", amount: "2 gousses", category: "Aromates" },
        { name: "Bouillon de légumes", amount: "500ml", category: "Liquides" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Basilic", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Couper tous les légumes en morceaux",
        "Faire revenir l'oignon et l'ail dans l'huile d'olive",
        "Ajouter les légumes et le bouillon",
        "Porter à ébullition et laisser mijoter 20 minutes",
        "Mixer la soupe jusqu'à obtenir une consistance lisse",
        "Assaisonner avec le sel, le poivre et le basilic",
        "Servir chaud"
      ],
      tips: [
        "Ajoutez des légumes verts pour plus de nutriments",
        "Servez avec des croûtons de pain complet",
        "Conservez au réfrigérateur jusqu'à 3 jours"
      ],
      equipment: ["Casserole", "Mixeur", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 150,
        protein: 6,
        carbs: 20,
        fat: 4,
        fiber: 8,
        sugar: 10,
        sodium: 240
      }
    },
    {
      id: 54,
      name: "Bowl de riz au poulet",
      emoji: "🍱",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 680,
      prepTime: 25,
      difficulty: "Moyen",
      rating: 4.5,
      protein: 50,
      carbs: 75,
      fat: 15,
      fiber: 5,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Riz complet", amount: "150g", category: "Glucides" },
        { name: "Filet de poulet", amount: "150g", category: "Protéines" },
        { name: "Brocoli", amount: "100g", category: "Légumes" },
        { name: "Carottes", amount: "80g", category: "Légumes" },
        { name: "Huile de sésame", amount: "1 c.à.s", category: "Lipides" },
        { name: "Gingembre", amount: "1 c.à.c", category: "Aromates" },
        { name: "Ail", amount: "1 gousse", category: "Aromates" },
        { name: "Sésame", amount: "1 c.à.s", category: "Lipides" }
      ],
      instructions: [
        "Cuire le riz selon les instructions du paquet",
        "Couper le poulet en dés",
        "Préparer les légumes en morceaux",
        "Faire revenir le poulet dans l'huile de sésame",
        "Ajouter les légumes et l'ail",
        "Laisser mijoter 10 minutes",
        "Servir sur le riz et garnir de sésame"
      ],
      tips: [
        "Utilisez du riz complet pour plus de fibres",
        "Ajoutez des légumes verts pour plus de nutriments",
        "Servez avec des algues nori"
      ],
      equipment: ["Casserole", "Poêle", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 680,
        protein: 50,
        carbs: 75,
        fat: 15,
        fiber: 5,
        sugar: 8,
        sodium: 380
      }
    },
    {
      id: 55,
      name: "Smoothie chocolat",
      emoji: "🥤",
      category: "Post-workout",
      goal: "Récupération",
      calories: 300,
      prepTime: 6,
      difficulty: "Facile",
      rating: 4.6,
      protein: 20,
      carbs: 35,
      fat: 10,
      fiber: 6,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Protéine en poudre", amount: "25g", category: "Protéines" },
        { name: "Banane", amount: "1", category: "Fruits" },
        { name: "Cacao en poudre", amount: "1 c.à.s", category: "Épices" },
        { name: "Lait d'amande", amount: "200ml", category: "Liquides" },
        { name: "Beurre de cacahuète", amount: "1 c.à.s", category: "Lipides" },
        { name: "Miel", amount: "1 c.à.s", category: "Édulcorants" },
        { name: "Glace", amount: "3-4 glaçons", category: "Liquides" }
      ],
      instructions: [
        "Ajouter tous les ingrédients dans un blender",
        "Mixer à haute vitesse pendant 30-45 secondes",
        "Vérifier la consistance et ajouter plus de liquide si nécessaire",
        "Verser dans un verre et servir immédiatement"
      ],
      tips: [
        "Utilisez des fruits congelés pour une texture plus crémeuse",
        "Ajoutez des épinards pour plus de nutriments",
        "Buvez dans les 30 minutes après l'entraînement"
      ],
      equipment: ["Blender", "Verre", "Cuillère"],
      nutritionPerServing: {
        calories: 300,
        protein: 20,
        carbs: 35,
        fat: 10,
        fiber: 6,
        sugar: 25,
        sodium: 80
      }
    },
    {
      id: 56,
      name: "Salade de chou",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Perte de poids",
      calories: 180,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.1,
      protein: 8,
      carbs: 20,
      fat: 8,
      fiber: 6,
      servings: 2,
      isPopular: false,
      ingredients: [
        { name: "Chou blanc", amount: "300g", category: "Légumes" },
        { name: "Carottes", amount: "100g", category: "Légumes" },
        { name: "Oignon", amount: "1/2", category: "Légumes" },
        { name: "Vinaigre", amount: "2 c.à.s", category: "Condiments" },
        { name: "Huile d'olive", amount: "2 c.à.s", category: "Lipides" },
        { name: "Moutarde", amount: "1 c.à.s", category: "Condiments" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" },
        { name: "Persil", amount: "1 c.à.s", category: "Herbes" }
      ],
      instructions: [
        "Râper le chou blanc finement",
        "Râper les carottes",
        "Émincer l'oignon",
        "Mélanger tous les légumes dans un saladier",
        "Préparer la vinaigrette avec vinaigre, huile, moutarde",
        "Assaisonner avec sel et poivre",
        "Verser la vinaigrette sur la salade",
        "Mélanger délicatement et laisser mariner 30 minutes",
        "Garnir de persil avant de servir"
      ],
      tips: [
        "Laissez mariner au moins 30 minutes pour plus de saveur",
        "Ajoutez des graines de tournesol pour plus de croquant",
        "Servez frais pour une meilleure texture"
      ],
      equipment: ["Saladier", "Râpe", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 180,
        protein: 8,
        carbs: 20,
        fat: 8,
        fiber: 6,
        sugar: 12,
        sodium: 280
      }
    },
    {
      id: 57,
      name: "Bowl de légumes grillés",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 320,
      prepTime: 30,
      difficulty: "Facile",
      rating: 4.3,
      protein: 12,
      carbs: 35,
      fat: 15,
      fiber: 8,
      servings: 1,
      isPopular: false,
      ingredients: [
        { name: "Aubergine", amount: "150g", category: "Légumes" },
        { name: "Courgette", amount: "150g", category: "Légumes" },
        { name: "Poivron", amount: "1", category: "Légumes" },
        { name: "Tomates", amount: "100g", category: "Légumes" },
        { name: "Huile d'olive", amount: "2 c.à.s", category: "Lipides" },
        { name: "Ail", amount: "2 gousses", category: "Aromates" },
        { name: "Basilic", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Préchauffer le four à 200°C",
        "Couper tous les légumes en morceaux",
        "Disposer sur une plaque de cuisson",
        "Arroser d'huile d'olive et assaisonner",
        "Enfourner pour 25-30 minutes",
        "Retourner à mi-cuisson",
        "Garnir de basilic avant de servir"
      ],
      tips: [
        "Ne surcuisez pas les légumes pour garder leur texture",
        "Ajoutez des herbes fraîches pour plus de saveur",
        "Servez avec du quinoa ou du riz complet"
      ],
      equipment: ["Four", "Plaque de cuisson", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 320,
        protein: 12,
        carbs: 35,
        fat: 15,
        fiber: 8,
        sugar: 15,
        sodium: 320
      }
    },
    {
      id: 58,
      name: "Poulet aux herbes",
      emoji: "🍗",
      category: "Dîner",
      goal: "Prise de masse",
      calories: 450,
      prepTime: 35,
      difficulty: "Moyen",
      rating: 4.6,
      protein: 55,
      carbs: 20,
      fat: 18,
      fiber: 4,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Filet de poulet", amount: "200g", category: "Protéines" },
        { name: "Pommes de terre", amount: "200g", category: "Glucides" },
        { name: "Brocoli", amount: "100g", category: "Légumes" },
        { name: "Huile d'olive", amount: "2 c.à.s", category: "Lipides" },
        { name: "Thym", amount: "1 c.à.s", category: "Herbes" },
        { name: "Romarin", amount: "1 c.à.s", category: "Herbes" },
        { name: "Ail", amount: "2 gousses", category: "Aromates" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Préchauffer le four à 180°C",
        "Couper les pommes de terre en morceaux",
        "Assaisonner le poulet avec les herbes",
        "Disposer le poulet et les pommes de terre sur une plaque",
        "Arroser d'huile d'olive et assaisonner",
        "Enfourner pour 30-35 minutes",
        "Ajouter le brocoli 10 minutes avant la fin",
        "Vérifier la cuisson et servir"
      ],
      tips: [
        "Utilisez des herbes fraîches pour plus de saveur",
        "Ne surcuisez pas le poulet pour garder sa tendreté",
        "Servez avec une sauce au choix"
      ],
      equipment: ["Four", "Plaque de cuisson", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 450,
        protein: 55,
        carbs: 20,
        fat: 18,
        fiber: 4,
        sugar: 8,
        sodium: 380
      }
    },
    {
      id: 59,
      name: "Salade de quinoa",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 380,
      prepTime: 25,
      difficulty: "Facile",
      rating: 4.4,
      protein: 15,
      carbs: 45,
      fat: 12,
      fiber: 8,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Quinoa", amount: "100g", category: "Glucides" },
        { name: "Tomates cerises", amount: "100g", category: "Légumes" },
        { name: "Concombre", amount: "80g", category: "Légumes" },
        { name: "Avocat", amount: "1/2", category: "Lipides" },
        { name: "Huile d'olive", amount: "2 c.à.s", category: "Lipides" },
        { name: "Citron", amount: "1/2", category: "Fruits" },
        { name: "Persil", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Cuire le quinoa selon les instructions du paquet",
        "Couper les tomates cerises en deux",
        "Éplucher et couper le concombre en dés",
        "Couper l'avocat en cubes",
        "Mélanger tous les ingrédients dans un saladier",
        "Arroser d'huile d'olive et de jus de citron",
        "Assaisonner avec le sel, le poivre et le persil",
        "Mélanger délicatement et servir"
      ],
      tips: [
        "Laissez refroidir le quinoa avant de l'ajouter",
        "Ajoutez des graines de tournesol pour plus de croquant",
        "Servez frais pour une meilleure saveur"
      ],
      equipment: ["Saladier", "Couteau", "Planche à découper", "Cuillère"],
      nutritionPerServing: {
        calories: 380,
        protein: 15,
        carbs: 45,
        fat: 12,
        fiber: 8,
        sugar: 8,
        sodium: 280
      }
    },
    {
      id: 60,
      name: "Smoothie vert",
      emoji: "🥤",
      category: "Collation",
      goal: "Perte de poids",
      calories: 120,
      prepTime: 8,
      difficulty: "Facile",
      rating: 4.2,
      protein: 6,
      carbs: 20,
      fat: 3,
      fiber: 6,
      servings: 1,
      isPopular: false,
      ingredients: [
        { name: "Épinards", amount: "50g", category: "Légumes" },
        { name: "Kiwi", amount: "1", category: "Fruits" },
        { name: "Pomme verte", amount: "1/2", category: "Fruits" },
        { name: "Concombre", amount: "1/2", category: "Légumes" },
        { name: "Gingembre", amount: "1 c.à.c", category: "Aromates" },
        { name: "Eau", amount: "200ml", category: "Liquides" },
        { name: "Miel", amount: "1 c.à.s", category: "Édulcorants" },
        { name: "Glace", amount: "3-4 glaçons", category: "Liquides" }
      ],
      instructions: [
        "Laver et préparer tous les ingrédients",
        "Ajouter tous les ingrédients dans un blender",
        "Mixer à haute vitesse pendant 30-45 secondes",
        "Vérifier la consistance et ajouter plus d'eau si nécessaire",
        "Verser dans un verre et servir immédiatement"
      ],
      tips: [
        "Utilisez des fruits congelés pour une texture plus crémeuse",
        "Ajoutez des graines de chia pour plus de nutriments",
        "Buvez dans les 30 minutes après l'entraînement"
      ],
      equipment: ["Blender", "Verre", "Cuillère"],
      nutritionPerServing: {
        calories: 120,
        protein: 6,
        carbs: 20,
        fat: 3,
        fiber: 6,
        sugar: 15,
        sodium: 60
      }
    },
    {
      id: 61,
      name: "Burger de bœuf",
      emoji: "🍔",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 750,
      prepTime: 30,
      difficulty: "Moyen",
      rating: 4.7,
      protein: 40,
      carbs: 55,
      fat: 35,
      fiber: 6,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Steak haché", amount: "150g", category: "Protéines" },
        { name: "Pain à burger", amount: "1", category: "Glucides" },
        { name: "Salade", amount: "2 feuilles", category: "Légumes" },
        { name: "Tomate", amount: "2 tranches", category: "Légumes" },
        { name: "Oignon", amount: "2 tranches", category: "Légumes" },
        { name: "Fromage", amount: "1 tranche", category: "Protéines" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Former le steak haché en burger",
        "Cuire le burger dans une poêle à feu moyen",
        "Griller le pain à burger",
        "Assembler le burger avec tous les ingrédients",
        "Servir avec des frites ou une salade"
      ],
      tips: [
        "Utilisez un pain à burger complet pour plus de fibres",
        "Ajoutez des épices au steak haché",
        "Servez avec une sauce au choix"
      ],
      equipment: ["Poêle", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 750,
        protein: 40,
        carbs: 55,
        fat: 35,
        fiber: 6,
        sugar: 8,
        sodium: 450
      }
    },
    {
      id: 62,
      name: "Poisson blanc",
      emoji: "🐟",
      category: "Dîner",
      goal: "Perte de poids",
      calories: 200,
      prepTime: 20,
      difficulty: "Facile",
      rating: 4.3,
      protein: 30,
      carbs: 10,
      fat: 4,
      fiber: 4,
      servings: 1,
      isPopular: false,
      ingredients: [
        { name: "Filet de poisson blanc", amount: "150g", category: "Protéines" },
        { name: "Brocoli", amount: "100g", category: "Légumes" },
        { name: "Carottes", amount: "80g", category: "Légumes" },
        { name: "Courgette", amount: "100g", category: "Légumes" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Citron", amount: "1/2", category: "Fruits" },
        { name: "Aneth", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Préparer un cuit-vapeur ou une casserole avec un panier vapeur",
        "Couper les légumes en morceaux de taille similaire",
        "Assaisonner le poisson avec le sel, le poivre et l'aneth",
        "Disposer les légumes dans le panier vapeur",
        "Placer le poisson sur les légumes",
        "Cuire à la vapeur pendant 15-20 minutes",
        "Arroser d'huile d'olive et de jus de citron avant de servir"
      ],
      tips: [
        "Ne surcuisez pas le poisson pour garder sa tendreté",
        "Ajoutez des épices comme le paprika ou le cumin",
        "Servez avec du riz complet en accompagnement"
      ],
      equipment: ["Cuit-vapeur", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 200,
        protein: 30,
        carbs: 10,
        fat: 4,
        fiber: 4,
        sugar: 6,
        sodium: 280
      }
    },
    {
      id: 63,
      name: "Energy balls",
      emoji: "🍯",
      category: "Collation",
      goal: "Performance",
      calories: 160,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.5,
      protein: 5,
      carbs: 22,
      fat: 7,
      fiber: 3,
      servings: 4,
      isPopular: true,
      ingredients: [
        { name: "Dattes", amount: "100g", category: "Fruits" },
        { name: "Amandes", amount: "50g", category: "Lipides" },
        { name: "Noix de coco râpée", amount: "2 c.à.s", category: "Lipides" },
        { name: "Cacao en poudre", amount: "1 c.à.s", category: "Épices" },
        { name: "Huile de coco", amount: "1 c.à.s", category: "Lipides" },
        { name: "Vanille", amount: "1 c.à.c", category: "Aromates" },
        { name: "Sel", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Dénoyauter les dattes",
        "Ajouter tous les ingrédients dans un robot culinaire",
        "Mixer jusqu'à obtenir une pâte homogène",
        "Former des boules de la taille d'une noix",
        "Rouler dans la noix de coco râpée",
        "Réfrigérer pendant 30 minutes avant de servir"
      ],
      tips: [
        "Utilisez des dattes Medjool pour plus de douceur",
        "Ajoutez des graines de chia pour plus de nutriments",
        "Conservez au réfrigérateur jusqu'à 1 semaine"
      ],
      equipment: ["Robot culinaire", "Cuillère", "Plaque"],
      nutritionPerServing: {
        calories: 160,
        protein: 5,
        carbs: 22,
        fat: 7,
        fiber: 3,
        sugar: 18,
        sodium: 60
      }
    },
    {
      id: 64,
      name: "Pâtes complètes",
      emoji: "🍝",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 420,
      prepTime: 18,
      difficulty: "Facile",
      rating: 4.3,
      protein: 25,
      carbs: 60,
      fat: 10,
      fiber: 5,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Pâtes complètes", amount: "100g", category: "Glucides" },
        { name: "Tomates", amount: "200g", category: "Légumes" },
        { name: "Oignon", amount: "1/2", category: "Légumes" },
        { name: "Ail", amount: "1 gousse", category: "Aromates" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Basilic", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Cuire les pâtes selon les instructions du paquet",
        "Couper les tomates en dés",
        "Émincer l'oignon et l'ail",
        "Faire revenir l'oignon et l'ail dans l'huile d'olive",
        "Ajouter les tomates et laisser mijoter 10 minutes",
        "Mélanger avec les pâtes et assaisonner",
        "Garnir de basilic et servir chaud"
      ],
      tips: [
        "Utilisez des pâtes complètes pour plus de fibres",
        "Ajoutez des olives noires pour plus de saveur",
        "Servez avec du parmesan râpé"
      ],
      equipment: ["Casserole", "Poêle", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 420,
        protein: 25,
        carbs: 60,
        fat: 10,
        fiber: 5,
        sugar: 6,
        sodium: 320
      }
    },
    {
      id: 65,
      name: "Toast à l'avocat",
      emoji: "🥑",
      category: "Petit-déjeuner",
      goal: "Performance",
      calories: 320,
      prepTime: 10,
      difficulty: "Facile",
      rating: 4.4,
      protein: 15,
      carbs: 20,
      fat: 22,
      fiber: 6,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Pain complet", amount: "2 tranches", category: "Glucides" },
        { name: "Avocat", amount: "1", category: "Lipides" },
        { name: "Citron", amount: "1/2", category: "Fruits" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" },
        { name: "Persil", amount: "1 c.à.s", category: "Herbes" }
      ],
      instructions: [
        "Griller les tranches de pain",
        "Écraser l'avocat avec le jus de citron",
        "Assaisonner l'avocat avec le sel et le poivre",
        "Tartiner l'avocat sur le pain grillé",
        "Arroser d'huile d'olive et garnir de persil",
        "Servir immédiatement"
      ],
      tips: [
        "Utilisez du pain complet pour plus de fibres",
        "Ajoutez des graines de chia sur l'avocat",
        "Servez avec des tomates cerises"
      ],
      equipment: ["Grille-pain", "Fourchette", "Couteau"],
      nutritionPerServing: {
        calories: 320,
        protein: 15,
        carbs: 20,
        fat: 22,
        fiber: 6,
        sugar: 3,
        sodium: 280
      }
    },
    {
      id: 66,
      name: "Soupe de légumes",
      emoji: "🍲",
      category: "Dîner",
      goal: "Perte de poids",
      calories: 150,
      prepTime: 25,
      difficulty: "Facile",
      rating: 4.1,
      protein: 6,
      carbs: 20,
      fat: 4,
      fiber: 8,
      servings: 2,
      isPopular: false,
      ingredients: [
        { name: "Courgette", amount: "200g", category: "Légumes" },
        { name: "Carottes", amount: "150g", category: "Légumes" },
        { name: "Tomates", amount: "200g", category: "Légumes" },
        { name: "Oignon", amount: "1", category: "Légumes" },
        { name: "Ail", amount: "2 gousses", category: "Aromates" },
        { name: "Bouillon de légumes", amount: "500ml", category: "Liquides" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Basilic", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Couper tous les légumes en morceaux",
        "Faire revenir l'oignon et l'ail dans l'huile d'olive",
        "Ajouter les légumes et le bouillon",
        "Porter à ébullition et laisser mijoter 20 minutes",
        "Mixer la soupe jusqu'à obtenir une consistance lisse",
        "Assaisonner avec le sel, le poivre et le basilic",
        "Servir chaud"
      ],
      tips: [
        "Ajoutez des légumes verts pour plus de nutriments",
        "Servez avec des croûtons de pain complet",
        "Conservez au réfrigérateur jusqu'à 3 jours"
      ],
      equipment: ["Casserole", "Mixeur", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 150,
        protein: 6,
        carbs: 20,
        fat: 4,
        fiber: 8,
        sugar: 10,
        sodium: 240
      }
    },
    {
      id: 67,
      name: "Bowl de riz au poulet",
      emoji: "🍱",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 680,
      prepTime: 25,
      difficulty: "Moyen",
      rating: 4.5,
      protein: 50,
      carbs: 75,
      fat: 15,
      fiber: 5,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Riz complet", amount: "150g", category: "Glucides" },
        { name: "Filet de poulet", amount: "150g", category: "Protéines" },
        { name: "Brocoli", amount: "100g", category: "Légumes" },
        { name: "Carottes", amount: "80g", category: "Légumes" },
        { name: "Huile de sésame", amount: "1 c.à.s", category: "Lipides" },
        { name: "Gingembre", amount: "1 c.à.c", category: "Aromates" },
        { name: "Ail", amount: "1 gousse", category: "Aromates" },
        { name: "Sésame", amount: "1 c.à.s", category: "Lipides" }
      ],
      instructions: [
        "Cuire le riz selon les instructions du paquet",
        "Couper le poulet en dés",
        "Préparer les légumes en morceaux",
        "Faire revenir le poulet dans l'huile de sésame",
        "Ajouter les légumes et l'ail",
        "Laisser mijoter 10 minutes",
        "Servir sur le riz et garnir de sésame"
      ],
      tips: [
        "Utilisez du riz complet pour plus de fibres",
        "Ajoutez des légumes verts pour plus de nutriments",
        "Servez avec des algues nori"
      ],
      equipment: ["Casserole", "Poêle", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 680,
        protein: 50,
        carbs: 75,
        fat: 15,
        fiber: 5,
        sugar: 8,
        sodium: 380
      }
    },
    {
      id: 68,
      name: "Smoothie chocolat",
      emoji: "🥤",
      category: "Post-workout",
      goal: "Récupération",
      calories: 300,
      prepTime: 6,
      difficulty: "Facile",
      rating: 4.6,
      protein: 20,
      carbs: 35,
      fat: 10,
      fiber: 6,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Protéine en poudre", amount: "25g", category: "Protéines" },
        { name: "Banane", amount: "1", category: "Fruits" },
        { name: "Cacao en poudre", amount: "1 c.à.s", category: "Épices" },
        { name: "Lait d'amande", amount: "200ml", category: "Liquides" },
        { name: "Beurre de cacahuète", amount: "1 c.à.s", category: "Lipides" },
        { name: "Miel", amount: "1 c.à.s", category: "Édulcorants" },
        { name: "Glace", amount: "3-4 glaçons", category: "Liquides" }
      ],
      instructions: [
        "Ajouter tous les ingrédients dans un blender",
        "Mixer à haute vitesse pendant 30-45 secondes",
        "Vérifier la consistance et ajouter plus de liquide si nécessaire",
        "Verser dans un verre et servir immédiatement"
      ],
      tips: [
        "Utilisez des fruits congelés pour une texture plus crémeuse",
        "Ajoutez des épinards pour plus de nutriments",
        "Buvez dans les 30 minutes après l'entraînement"
      ],
      equipment: ["Blender", "Verre", "Cuillère"],
      nutritionPerServing: {
        calories: 300,
        protein: 20,
        carbs: 35,
        fat: 10,
        fiber: 6,
        sugar: 25,
        sodium: 80
      }
    },
    {
      id: 69,
      name: "Salade de chou",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Perte de poids",
      calories: 180,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.1,
      protein: 8,
      carbs: 20,
      fat: 8,
      fiber: 6,
      servings: 2,
      isPopular: false,
      ingredients: [
        { name: "Chou blanc", amount: "300g", category: "Légumes" },
        { name: "Carottes", amount: "100g", category: "Légumes" },
        { name: "Oignon", amount: "1/2", category: "Légumes" },
        { name: "Vinaigre", amount: "2 c.à.s", category: "Condiments" },
        { name: "Huile d'olive", amount: "2 c.à.s", category: "Lipides" },
        { name: "Moutarde", amount: "1 c.à.s", category: "Condiments" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" },
        { name: "Persil", amount: "1 c.à.s", category: "Herbes" }
      ],
      instructions: [
        "Râper le chou blanc finement",
        "Râper les carottes",
        "Émincer l'oignon",
        "Mélanger tous les légumes dans un saladier",
        "Préparer la vinaigrette avec vinaigre, huile, moutarde",
        "Assaisonner avec sel et poivre",
        "Verser la vinaigrette sur la salade",
        "Mélanger délicatement et laisser mariner 30 minutes",
        "Garnir de persil avant de servir"
      ],
      tips: [
        "Laissez mariner au moins 30 minutes pour plus de saveur",
        "Ajoutez des graines de tournesol pour plus de croquant",
        "Servez frais pour une meilleure texture"
      ],
      equipment: ["Saladier", "Râpe", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 180,
        protein: 8,
        carbs: 20,
        fat: 8,
        fiber: 6,
        sugar: 12,
        sodium: 280
      }
    },
    {
      id: 70,
      name: "Bowl de légumes grillés",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 320,
      prepTime: 30,
      difficulty: "Facile",
      rating: 4.3,
      protein: 12,
      carbs: 35,
      fat: 15,
      fiber: 8,
      servings: 1,
      isPopular: false,
      ingredients: [
        { name: "Aubergine", amount: "150g", category: "Légumes" },
        { name: "Courgette", amount: "150g", category: "Légumes" },
        { name: "Poivron", amount: "1", category: "Légumes" },
        { name: "Tomates", amount: "100g", category: "Légumes" },
        { name: "Huile d'olive", amount: "2 c.à.s", category: "Lipides" },
        { name: "Ail", amount: "2 gousses", category: "Aromates" },
        { name: "Basilic", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Préchauffer le four à 200°C",
        "Couper tous les légumes en morceaux",
        "Disposer sur une plaque de cuisson",
        "Arroser d'huile d'olive et assaisonner",
        "Enfourner pour 25-30 minutes",
        "Retourner à mi-cuisson",
        "Garnir de basilic avant de servir"
      ],
      tips: [
        "Ne surcuisez pas les légumes pour garder leur texture",
        "Ajoutez des herbes fraîches pour plus de saveur",
        "Servez avec du quinoa ou du riz complet"
      ],
      equipment: ["Four", "Plaque de cuisson", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 320,
        protein: 12,
        carbs: 35,
        fat: 15,
        fiber: 8,
        sugar: 15,
        sodium: 320
      }
    },
    {
      id: 71,
      name: "Poulet aux herbes",
      emoji: "🍗",
      category: "Dîner",
      goal: "Prise de masse",
      calories: 450,
      prepTime: 35,
      difficulty: "Moyen",
      rating: 4.6,
      protein: 55,
      carbs: 20,
      fat: 18,
      fiber: 4,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Filet de poulet", amount: "200g", category: "Protéines" },
        { name: "Pommes de terre", amount: "200g", category: "Glucides" },
        { name: "Brocoli", amount: "100g", category: "Légumes" },
        { name: "Huile d'olive", amount: "2 c.à.s", category: "Lipides" },
        { name: "Thym", amount: "1 c.à.s", category: "Herbes" },
        { name: "Romarin", amount: "1 c.à.s", category: "Herbes" },
        { name: "Ail", amount: "2 gousses", category: "Aromates" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Préchauffer le four à 180°C",
        "Couper les pommes de terre en morceaux",
        "Assaisonner le poulet avec les herbes",
        "Disposer le poulet et les pommes de terre sur une plaque",
        "Arroser d'huile d'olive et assaisonner",
        "Enfourner pour 30-35 minutes",
        "Ajouter le brocoli 10 minutes avant la fin",
        "Vérifier la cuisson et servir"
      ],
      tips: [
        "Utilisez des herbes fraîches pour plus de saveur",
        "Ne surcuisez pas le poulet pour garder sa tendreté",
        "Servez avec une sauce au choix"
      ],
      equipment: ["Four", "Plaque de cuisson", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 450,
        protein: 55,
        carbs: 20,
        fat: 18,
        fiber: 4,
        sugar: 8,
        sodium: 380
      }
    },
    {
      id: 72,
      name: "Salade de quinoa",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 380,
      prepTime: 25,
      difficulty: "Facile",
      rating: 4.4,
      protein: 15,
      carbs: 45,
      fat: 12,
      fiber: 8,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Quinoa", amount: "100g", category: "Glucides" },
        { name: "Tomates cerises", amount: "100g", category: "Légumes" },
        { name: "Concombre", amount: "80g", category: "Légumes" },
        { name: "Avocat", amount: "1/2", category: "Lipides" },
        { name: "Huile d'olive", amount: "2 c.à.s", category: "Lipides" },
        { name: "Citron", amount: "1/2", category: "Fruits" },
        { name: "Persil", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Cuire le quinoa selon les instructions du paquet",
        "Couper les tomates cerises en deux",
        "Éplucher et couper le concombre en dés",
        "Couper l'avocat en cubes",
        "Mélanger tous les ingrédients dans un saladier",
        "Arroser d'huile d'olive et de jus de citron",
        "Assaisonner avec le sel, le poivre et le persil",
        "Mélanger délicatement et servir"
      ],
      tips: [
        "Laissez refroidir le quinoa avant de l'ajouter",
        "Ajoutez des graines de tournesol pour plus de croquant",
        "Servez frais pour une meilleure saveur"
      ],
      equipment: ["Saladier", "Couteau", "Planche à découper", "Cuillère"],
      nutritionPerServing: {
        calories: 380,
        protein: 15,
        carbs: 45,
        fat: 12,
        fiber: 8,
        sugar: 8,
        sodium: 280
      }
    },
    {
      id: 73,
      name: "Smoothie vert",
      emoji: "🥤",
      category: "Collation",
      goal: "Perte de poids",
      calories: 120,
      prepTime: 8,
      difficulty: "Facile",
      rating: 4.2,
      protein: 6,
      carbs: 20,
      fat: 3,
      fiber: 6,
      servings: 1,
      isPopular: false,
      ingredients: [
        { name: "Épinards", amount: "50g", category: "Légumes" },
        { name: "Kiwi", amount: "1", category: "Fruits" },
        { name: "Pomme verte", amount: "1/2", category: "Fruits" },
        { name: "Concombre", amount: "1/2", category: "Légumes" },
        { name: "Gingembre", amount: "1 c.à.c", category: "Aromates" },
        { name: "Eau", amount: "200ml", category: "Liquides" },
        { name: "Miel", amount: "1 c.à.s", category: "Édulcorants" },
        { name: "Glace", amount: "3-4 glaçons", category: "Liquides" }
      ],
      instructions: [
        "Laver et préparer tous les ingrédients",
        "Ajouter tous les ingrédients dans un blender",
        "Mixer à haute vitesse pendant 30-45 secondes",
        "Vérifier la consistance et ajouter plus d'eau si nécessaire",
        "Verser dans un verre et servir immédiatement"
      ],
      tips: [
        "Utilisez des fruits congelés pour une texture plus crémeuse",
        "Ajoutez des graines de chia pour plus de nutriments",
        "Buvez dans les 30 minutes après l'entraînement"
      ],
      equipment: ["Blender", "Verre", "Cuillère"],
      nutritionPerServing: {
        calories: 120,
        protein: 6,
        carbs: 20,
        fat: 3,
        fiber: 6,
        sugar: 15,
        sodium: 60
      }
    },
    {
      id: 74,
      name: "Burger de bœuf",
      emoji: "🍔",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 750,
      prepTime: 30,
      difficulty: "Moyen",
      rating: 4.7,
      protein: 40,
      carbs: 55,
      fat: 35,
      fiber: 6,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Steak haché", amount: "150g", category: "Protéines" },
        { name: "Pain à burger", amount: "1", category: "Glucides" },
        { name: "Salade", amount: "2 feuilles", category: "Légumes" },
        { name: "Tomate", amount: "2 tranches", category: "Légumes" },
        { name: "Oignon", amount: "2 tranches", category: "Légumes" },
        { name: "Fromage", amount: "1 tranche", category: "Protéines" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Former le steak haché en burger",
        "Cuire le burger dans une poêle à feu moyen",
        "Griller le pain à burger",
        "Assembler le burger avec tous les ingrédients",
        "Servir avec des frites ou une salade"
      ],
      tips: [
        "Utilisez un pain à burger complet pour plus de fibres",
        "Ajoutez des épices au steak haché",
        "Servez avec une sauce au choix"
      ],
      equipment: ["Poêle", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 750,
        protein: 40,
        carbs: 55,
        fat: 35,
        fiber: 6,
        sugar: 8,
        sodium: 450
      }
    },
    {
      id: 75,
      name: "Poisson blanc",
      emoji: "🐟",
      category: "Dîner",
      goal: "Perte de poids",
      calories: 200,
      prepTime: 20,
      difficulty: "Facile",
      rating: 4.3,
      protein: 30,
      carbs: 10,
      fat: 4,
      fiber: 4,
      servings: 1,
      isPopular: false,
      ingredients: [
        { name: "Filet de poisson blanc", amount: "150g", category: "Protéines" },
        { name: "Brocoli", amount: "100g", category: "Légumes" },
        { name: "Carottes", amount: "80g", category: "Légumes" },
        { name: "Courgette", amount: "100g", category: "Légumes" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Citron", amount: "1/2", category: "Fruits" },
        { name: "Aneth", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Préparer un cuit-vapeur ou une casserole avec un panier vapeur",
        "Couper les légumes en morceaux de taille similaire",
        "Assaisonner le poisson avec le sel, le poivre et l'aneth",
        "Disposer les légumes dans le panier vapeur",
        "Placer le poisson sur les légumes",
        "Cuire à la vapeur pendant 15-20 minutes",
        "Arroser d'huile d'olive et de jus de citron avant de servir"
      ],
      tips: [
        "Ne surcuisez pas le poisson pour garder sa tendreté",
        "Ajoutez des épices comme le paprika ou le cumin",
        "Servez avec du riz complet en accompagnement"
      ],
      equipment: ["Cuit-vapeur", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 200,
        protein: 30,
        carbs: 10,
        fat: 4,
        fiber: 4,
        sugar: 6,
        sodium: 280
      }
    },
    {
      id: 76,
      name: "Energy balls",
      emoji: "🍯",
      category: "Collation",
      goal: "Performance",
      calories: 160,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.5,
      protein: 5,
      carbs: 22,
      fat: 7,
      fiber: 3,
      servings: 4,
      isPopular: true,
      ingredients: [
        { name: "Dattes", amount: "100g", category: "Fruits" },
        { name: "Amandes", amount: "50g", category: "Lipides" },
        { name: "Noix de coco râpée", amount: "2 c.à.s", category: "Lipides" },
        { name: "Cacao en poudre", amount: "1 c.à.s", category: "Épices" },
        { name: "Huile de coco", amount: "1 c.à.s", category: "Lipides" },
        { name: "Vanille", amount: "1 c.à.c", category: "Aromates" },
        { name: "Sel", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Dénoyauter les dattes",
        "Ajouter tous les ingrédients dans un robot culinaire",
        "Mixer jusqu'à obtenir une pâte homogène",
        "Former des boules de la taille d'une noix",
        "Rouler dans la noix de coco râpée",
        "Réfrigérer pendant 30 minutes avant de servir"
      ],
      tips: [
        "Utilisez des dattes Medjool pour plus de douceur",
        "Ajoutez des graines de chia pour plus de nutriments",
        "Conservez au réfrigérateur jusqu'à 1 semaine"
      ],
      equipment: ["Robot culinaire", "Cuillère", "Plaque"],
      nutritionPerServing: {
        calories: 160,
        protein: 5,
        carbs: 22,
        fat: 7,
        fiber: 3,
        sugar: 18,
        sodium: 60
      }
    },
    {
      id: 77,
      name: "Pâtes complètes",
      emoji: "🍝",
      category: "Déjeuner",
      goal: "Équilibre",
      calories: 420,
      prepTime: 18,
      difficulty: "Facile",
      rating: 4.3,
      protein: 25,
      carbs: 60,
      fat: 10,
      fiber: 5,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Pâtes complètes", amount: "100g", category: "Glucides" },
        { name: "Tomates", amount: "200g", category: "Légumes" },
        { name: "Oignon", amount: "1/2", category: "Légumes" },
        { name: "Ail", amount: "1 gousse", category: "Aromates" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Basilic", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Cuire les pâtes selon les instructions du paquet",
        "Couper les tomates en dés",
        "Émincer l'oignon et l'ail",
        "Faire revenir l'oignon et l'ail dans l'huile d'olive",
        "Ajouter les tomates et laisser mijoter 10 minutes",
        "Mélanger avec les pâtes et assaisonner",
        "Garnir de basilic et servir chaud"
      ],
      tips: [
        "Utilisez des pâtes complètes pour plus de fibres",
        "Ajoutez des olives noires pour plus de saveur",
        "Servez avec du parmesan râpé"
      ],
      equipment: ["Casserole", "Poêle", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 420,
        protein: 25,
        carbs: 60,
        fat: 10,
        fiber: 5,
        sugar: 6,
        sodium: 320
      }
    },
    {
      id: 78,
      name: "Toast à l'avocat",
      emoji: "🥑",
      category: "Petit-déjeuner",
      goal: "Performance",
      calories: 320,
      prepTime: 10,
      difficulty: "Facile",
      rating: 4.4,
      protein: 15,
      carbs: 20,
      fat: 22,
      fiber: 6,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Pain complet", amount: "2 tranches", category: "Glucides" },
        { name: "Avocat", amount: "1", category: "Lipides" },
        { name: "Citron", amount: "1/2", category: "Fruits" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" },
        { name: "Persil", amount: "1 c.à.s", category: "Herbes" }
      ],
      instructions: [
        "Griller les tranches de pain",
        "Écraser l'avocat avec le jus de citron",
        "Assaisonner l'avocat avec le sel et le poivre",
        "Tartiner l'avocat sur le pain grillé",
        "Arroser d'huile d'olive et garnir de persil",
        "Servir immédiatement"
      ],
      tips: [
        "Utilisez du pain complet pour plus de fibres",
        "Ajoutez des graines de chia sur l'avocat",
        "Servez avec des tomates cerises"
      ],
      equipment: ["Grille-pain", "Fourchette", "Couteau"],
      nutritionPerServing: {
        calories: 320,
        protein: 15,
        carbs: 20,
        fat: 22,
        fiber: 6,
        sugar: 3,
        sodium: 280
      }
    },
    {
      id: 79,
      name: "Soupe de légumes",
      emoji: "🍲",
      category: "Dîner",
      goal: "Perte de poids",
      calories: 150,
      prepTime: 25,
      difficulty: "Facile",
      rating: 4.1,
      protein: 6,
      carbs: 20,
      fat: 4,
      fiber: 8,
      servings: 2,
      isPopular: false,
      ingredients: [
        { name: "Courgette", amount: "200g", category: "Légumes" },
        { name: "Carottes", amount: "150g", category: "Légumes" },
        { name: "Tomates", amount: "200g", category: "Légumes" },
        { name: "Oignon", amount: "1", category: "Légumes" },
        { name: "Ail", amount: "2 gousses", category: "Aromates" },
        { name: "Bouillon de légumes", amount: "500ml", category: "Liquides" },
        { name: "Huile d'olive", amount: "1 c.à.s", category: "Lipides" },
        { name: "Basilic", amount: "1 c.à.s", category: "Herbes" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" }
      ],
      instructions: [
        "Couper tous les légumes en morceaux",
        "Faire revenir l'oignon et l'ail dans l'huile d'olive",
        "Ajouter les légumes et le bouillon",
        "Porter à ébullition et laisser mijoter 20 minutes",
        "Mixer la soupe jusqu'à obtenir une consistance lisse",
        "Assaisonner avec le sel, le poivre et le basilic",
        "Servir chaud"
      ],
      tips: [
        "Ajoutez des légumes verts pour plus de nutriments",
        "Servez avec des croûtons de pain complet",
        "Conservez au réfrigérateur jusqu'à 3 jours"
      ],
      equipment: ["Casserole", "Mixeur", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 150,
        protein: 6,
        carbs: 20,
        fat: 4,
        fiber: 8,
        sugar: 10,
        sodium: 240
      }
    },
    {
      id: 80,
      name: "Bowl de riz au poulet",
      emoji: "🍱",
      category: "Déjeuner",
      goal: "Prise de masse",
      calories: 680,
      prepTime: 25,
      difficulty: "Moyen",
      rating: 4.5,
      protein: 50,
      carbs: 75,
      fat: 15,
      fiber: 5,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Riz complet", amount: "150g", category: "Glucides" },
        { name: "Filet de poulet", amount: "150g", category: "Protéines" },
        { name: "Brocoli", amount: "100g", category: "Légumes" },
        { name: "Carottes", amount: "80g", category: "Légumes" },
        { name: "Huile de sésame", amount: "1 c.à.s", category: "Lipides" },
        { name: "Gingembre", amount: "1 c.à.c", category: "Aromates" },
        { name: "Ail", amount: "1 gousse", category: "Aromates" },
        { name: "Sésame", amount: "1 c.à.s", category: "Lipides" }
      ],
      instructions: [
        "Cuire le riz selon les instructions du paquet",
        "Couper le poulet en dés",
        "Préparer les légumes en morceaux",
        "Faire revenir le poulet dans l'huile de sésame",
        "Ajouter les légumes et l'ail",
        "Laisser mijoter 10 minutes",
        "Servir sur le riz et garnir de sésame"
      ],
      tips: [
        "Utilisez du riz complet pour plus de fibres",
        "Ajoutez des légumes verts pour plus de nutriments",
        "Servez avec des algues nori"
      ],
      equipment: ["Casserole", "Poêle", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 680,
        protein: 50,
        carbs: 75,
        fat: 15,
        fiber: 5,
        sugar: 8,
        sodium: 380
      }
    },
    {
      id: 81,
      name: "Smoothie chocolat",
      emoji: "🥤",
      category: "Post-workout",
      goal: "Récupération",
      calories: 300,
      prepTime: 6,
      difficulty: "Facile",
      rating: 4.6,
      protein: 20,
      carbs: 35,
      fat: 10,
      fiber: 6,
      servings: 1,
      isPopular: true,
      ingredients: [
        { name: "Protéine en poudre", amount: "25g", category: "Protéines" },
        { name: "Banane", amount: "1", category: "Fruits" },
        { name: "Cacao en poudre", amount: "1 c.à.s", category: "Épices" },
        { name: "Lait d'amande", amount: "200ml", category: "Liquides" },
        { name: "Beurre de cacahuète", amount: "1 c.à.s", category: "Lipides" },
        { name: "Miel", amount: "1 c.à.s", category: "Édulcorants" },
        { name: "Glace", amount: "3-4 glaçons", category: "Liquides" }
      ],
      instructions: [
        "Ajouter tous les ingrédients dans un blender",
        "Mixer à haute vitesse pendant 30-45 secondes",
        "Vérifier la consistance et ajouter plus de liquide si nécessaire",
        "Verser dans un verre et servir immédiatement"
      ],
      tips: [
        "Utilisez des fruits congelés pour une texture plus crémeuse",
        "Ajoutez des épinards pour plus de nutriments",
        "Buvez dans les 30 minutes après l'entraînement"
      ],
      equipment: ["Blender", "Verre", "Cuillère"],
      nutritionPerServing: {
        calories: 300,
        protein: 20,
        carbs: 35,
        fat: 10,
        fiber: 6,
        sugar: 25,
        sodium: 80
      }
    },
    {
      id: 82,
      name: "Salade de chou",
      emoji: "🥗",
      category: "Déjeuner",
      goal: "Perte de poids",
      calories: 180,
      prepTime: 15,
      difficulty: "Facile",
      rating: 4.1,
      protein: 8,
      carbs: 20,
      fat: 8,
      fiber: 6,
      servings: 2,
      isPopular: false,
      ingredients: [
        { name: "Chou blanc", amount: "300g", category: "Légumes" },
        { name: "Carottes", amount: "100g", category: "Légumes" },
        { name: "Oignon", amount: "1/2", category: "Légumes" },
        { name: "Vinaigre", amount: "2 c.à.s", category: "Condiments" },
        { name: "Huile d'olive", amount: "2 c.à.s", category: "Lipides" },
        { name: "Moutarde", amount: "1 c.à.s", category: "Condiments" },
        { name: "Sel", amount: "1 pincée", category: "Épices" },
        { name: "Poivre", amount: "1 pincée", category: "Épices" },
        { name: "Persil", amount: "1 c.à.s", category: "Herbes" }
      ],
      instructions: [
        "Râper le chou blanc finement",
        "Râper les carottes",
        "Émincer l'oignon",
        "Mélanger tous les légumes dans un saladier",
        "Préparer la vinaigrette avec vinaigre, huile, moutarde",
        "Assaisonner avec sel et poivre",
        "Verser la vinaigrette sur la salade",
        "Mélanger délicatement et laisser mariner 30 minutes",
        "Garnir de persil avant de servir"
      ],
      tips: [
        "Laissez mariner au moins 30 minutes pour plus de saveur",
        "Ajoutez des graines de tournesol pour plus de croquant",
        "Servez frais pour une meilleure texture"
      ],
      equipment: ["Saladier", "Râpe", "Couteau", "Planche à découper"],
      nutritionPerServing: {
        calories: 180,
        protein: 8,
        carbs: 20,
        fat: 8,
        fiber: 6,
        sugar: 12,
        sodium: 280
      }
    }
  ];

  // Trouver la recette par ID
  const recette = repasData.find(repas => repas.id === parseInt(id || '0'));

  if (!recette) {
    return (
      <PageLayout
        title="Recette non trouvée"
        subtitle="La recette demandée n'existe pas"
        icon={<ChefHat className="h-6 w-6 text-red-600" />}
        actions={
          <Button 
            onClick={() => navigate('/nutrition')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à la nutrition
          </Button>
        }
      >
        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Recette non trouvée
            </h3>
            <p className="text-gray-600 mb-6">
              La recette que vous recherchez n'existe pas dans notre base de données.
            </p>
            <Button 
              onClick={() => navigate('/nutrition')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Retour à la nutrition
            </Button>
          </CardContent>
        </Card>
      </PageLayout>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return 'bg-green-100 text-green-800 border-green-200';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Difficile': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getGoalColor = (goal: string) => {
    switch (goal) {
      case 'Prise de masse': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Perte de poids': return 'bg-red-100 text-red-800 border-red-200';
      case 'Récupération': return 'bg-green-100 text-green-800 border-green-200';
      case 'Performance': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Équilibre': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const adjustServings = (newServings: number) => {
    if (newServings >= 1) {
      setServings(newServings);
    }
  };

  return (
    <PageLayout
      title={recette.name}
      subtitle="Recette détaillée"
      icon={<ChefHat className="h-6 w-6 text-blue-600" />}
      actions={
        <div className="flex gap-2">
        <Button
            onClick={() => navigate('/nutrition')}
          variant="outline"
            className="flex items-center gap-2"
        >
            <ArrowLeft className="h-4 w-4" />
            Retour
        </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Liste de courses
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* En-tête de la recette */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{recette.emoji}</div>
                <div>
                  <CardTitle className="text-3xl text-gray-800 mb-2">
                    {recette.name}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-blue-500" />
                      {recette.prepTime} min
                  </div>
                  <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-green-500" />
                      {recette.servings} portion{recette.servings > 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      {recette.rating}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getDifficultyColor(recette.difficulty)}>
                    {recette.difficulty}
                  </Badge>
                    <Badge 
                      variant="outline" 
                      className="border-blue-300 text-blue-700 bg-blue-50"
                    >
                    {recette.category}
                  </Badge>
                    <Badge className={getGoalColor(recette.goal)}>
                      {recette.goal}
                    </Badge>
                  {recette.isPopular && (
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                      <Star className="h-3 w-3 mr-1" />
                      Populaire
                    </Badge>
                  )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-gray-800 mb-1">
                  {recette.calories}
                </div>
                <div className="text-sm text-gray-600">Calories</div>
                <div className="text-sm text-gray-500 mt-2">
                  par portion
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Onglets pour les détails */}
        <Tabs defaultValue="ingredients" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ingredients" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Ingrédients
            </TabsTrigger>
            <TabsTrigger value="instructions" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Instructions
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Nutrition
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Conseils
            </TabsTrigger>
          </TabsList>

          {/* Onglet Ingrédients */}
          <TabsContent value="ingredients" className="space-y-4">
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
                <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                    <ShoppingCart className="h-5 w-5 text-blue-600" />
                Ingrédients
              </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustServings(servings - 1)}
                      disabled={servings <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium text-gray-700">
                      {servings} portion{servings > 1 ? 's' : ''}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustServings(servings + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recette.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">{ingredient.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {ingredient.category}
                        </Badge>
                    </div>
                      <span className="text-gray-600 font-semibold">
                        {ingredient.amount}
                      </span>
                    </div>
                  ))}
                  </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Utensils className="h-5 w-5 text-green-600" />
                  Équipement nécessaire
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {recette.equipment.map((item, index) => (
                    <Badge key={index} variant="outline" className="border-green-300 text-green-700 bg-green-50">
                      {item}
                    </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          </TabsContent>

          {/* Onglet Instructions */}
          <TabsContent value="instructions" className="space-y-4">
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  Instructions de préparation
              </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                  {recette.instructions.map((instruction, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                </div>
                      <p className="text-gray-700 leading-relaxed">{instruction}</p>
                </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Nutrition */}
          <TabsContent value="nutrition" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {recette.nutritionPerServing.calories}
                </div>
                  <div className="text-sm text-gray-600 mb-2">Calories</div>
                  <Progress value={(recette.nutritionPerServing.calories / 1000) * 100} className="h-2" />
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {recette.nutritionPerServing.protein}g
              </div>
                  <div className="text-sm text-gray-600 mb-2">Protéines</div>
                  <Progress value={(recette.nutritionPerServing.protein / 50) * 100} className="h-2" />
            </CardContent>
          </Card>

              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {recette.nutritionPerServing.carbs}g
        </div>
                  <div className="text-sm text-gray-600 mb-2">Glucides</div>
                  <Progress value={(recette.nutritionPerServing.carbs / 100) * 100} className="h-2" />
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {recette.nutritionPerServing.fat}g
                  </div>
                  <div className="text-sm text-gray-600 mb-2">Lipides</div>
                  <Progress value={(recette.nutritionPerServing.fat / 30) * 100} className="h-2" />
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Target className="h-5 w-5 text-orange-600" />
                  Valeurs nutritionnelles détaillées
            </CardTitle>
          </CardHeader>
          <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-800">{recette.nutritionPerServing.fiber}g</div>
                    <div className="text-sm text-gray-600">Fibres</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-800">{recette.nutritionPerServing.sugar}g</div>
                    <div className="text-sm text-gray-600">Sucre</div>
                </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-800">{recette.nutritionPerServing.sodium}mg</div>
                    <div className="text-sm text-gray-600">Sodium</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-800">{recette.prepTime}min</div>
                    <div className="text-sm text-gray-600">Préparation</div>
                  </div>
            </div>
          </CardContent>
        </Card>
          </TabsContent>

          {/* Onglet Conseils */}
          <TabsContent value="tips" className="space-y-4">
            <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  Conseils et astuces
            </CardTitle>
          </CardHeader>
          <CardContent>
                <div className="space-y-3">
                  {recette.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{tip}</span>
                    </div>
                  ))}
            </div>
          </CardContent>
        </Card>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Ajouter à la liste de courses
          </Button>
              <Button variant="outline" className="border-gray-200 hover:border-gray-300">
                <Heart className="h-4 w-4 mr-2" />
            Ajouter aux favoris
          </Button>
              <Button variant="outline" className="border-gray-200 hover:border-gray-300">
                <Timer className="h-4 w-4 mr-2" />
                Planifier la préparation
              </Button>
        </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default RecetteDetail; 