import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Apple, 
  Utensils, 
  ChefHat,
  Search,
  Plus,
  Clock,
  Users
} from 'lucide-react';

const Nutrition: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('aliments');

  // Base de données étendue des aliments (60 au total)
  const aliments = [
    // Protéines
    { name: 'Poulet', calories: 165, protein: 31, carbs: 0, fat: 3.6, category: 'Viande' },
    { name: 'Dinde', calories: 135, protein: 30, carbs: 0, fat: 1.5, category: 'Viande' },
    { name: 'Boeuf maigre', calories: 250, protein: 26, carbs: 0, fat: 15, category: 'Viande' },
    { name: 'Porc', calories: 242, protein: 27, carbs: 0, fat: 14, category: 'Viande' },
    { name: 'Agneau', calories: 294, protein: 25, carbs: 0, fat: 21, category: 'Viande' },
    { name: 'Veau', calories: 172, protein: 24, carbs: 0, fat: 8, category: 'Viande' },
    { name: 'Canard', calories: 337, protein: 19, carbs: 0, fat: 28, category: 'Viande' },
    { name: 'Saumon', calories: 208, protein: 25, carbs: 0, fat: 12, category: 'Poisson' },
    { name: 'Thon', calories: 144, protein: 30, carbs: 0, fat: 1, category: 'Poisson' },
    { name: 'Cabillaud', calories: 82, protein: 18, carbs: 0, fat: 0.7, category: 'Poisson' },
    { name: 'Crevettes', calories: 99, protein: 24, carbs: 0, fat: 0.3, category: 'Poisson' },
    { name: 'Maquereau', calories: 205, protein: 19, carbs: 0, fat: 14, category: 'Poisson' },
    { name: 'Sardines', calories: 208, protein: 25, carbs: 0, fat: 12, category: 'Poisson' },
    { name: 'Oeufs', calories: 155, protein: 13, carbs: 1.1, fat: 11, category: 'Protéines' },
    { name: 'Fromage blanc', calories: 98, protein: 11, carbs: 3.4, fat: 4.3, category: 'Protéines' },
    { name: 'Yaourt grec', calories: 59, protein: 10, carbs: 3.6, fat: 0.4, category: 'Protéines' },
    { name: 'Tofu', calories: 76, protein: 8, carbs: 1.9, fat: 4.8, category: 'Protéines' },
    { name: 'Lentilles', calories: 116, protein: 9, carbs: 20, fat: 0.4, category: 'Protéines' },
    { name: 'Haricots noirs', calories: 132, protein: 8.9, carbs: 24, fat: 0.5, category: 'Protéines' },
    { name: 'Pois chiches', calories: 164, protein: 8.9, carbs: 27, fat: 2.6, category: 'Protéines' },
    { name: 'Tempeh', calories: 192, protein: 20, carbs: 8, fat: 11, category: 'Protéines' },
    { name: 'Seitan', calories: 370, protein: 75, carbs: 14, fat: 1.9, category: 'Protéines' },
    
    // Céréales
    { name: 'Riz brun', calories: 111, protein: 2.6, carbs: 23, fat: 0.9, category: 'Céréales' },
    { name: 'Quinoa', calories: 120, protein: 4.4, carbs: 22, fat: 1.9, category: 'Céréales' },
    { name: 'Avoine', calories: 389, protein: 17, carbs: 66, fat: 7, category: 'Céréales' },
    { name: 'Pâtes complètes', calories: 124, protein: 5, carbs: 25, fat: 1.1, category: 'Céréales' },
    { name: 'Pain complet', calories: 247, protein: 13, carbs: 41, fat: 4.2, category: 'Céréales' },
    { name: 'Sarrasin', calories: 343, protein: 13, carbs: 72, fat: 3.4, category: 'Céréales' },
    { name: 'Millet', calories: 378, protein: 11, carbs: 73, fat: 4.2, category: 'Céréales' },
    { name: 'Orge', calories: 352, protein: 12, carbs: 73, fat: 2.3, category: 'Céréales' },
    { name: 'Épeautre', calories: 338, protein: 15, carbs: 70, fat: 2.4, category: 'Céréales' },
    { name: 'Riz sauvage', calories: 101, protein: 4, carbs: 21, fat: 0.3, category: 'Céréales' },
    
    // Légumes
    { name: 'Brocolis', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, category: 'Légumes' },
    { name: 'Épinards', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, category: 'Légumes' },
    { name: 'Chou-fleur', calories: 25, protein: 1.9, carbs: 5, fat: 0.3, category: 'Légumes' },
    { name: 'Carottes', calories: 41, protein: 0.9, carbs: 10, fat: 0.2, category: 'Légumes' },
    { name: 'Courgettes', calories: 17, protein: 1.2, carbs: 3.4, fat: 0.2, category: 'Légumes' },
    { name: 'Tomates', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, category: 'Légumes' },
    { name: 'Poivrons', calories: 31, protein: 1, carbs: 7.3, fat: 0.3, category: 'Légumes' },
    { name: 'Concombre', calories: 16, protein: 0.7, carbs: 4, fat: 0.1, category: 'Légumes' },
    { name: 'Patate douce', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, category: 'Légumes' },
    { name: 'Champignons', calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3, category: 'Légumes' },
    { name: 'Aubergines', calories: 25, protein: 1, carbs: 6, fat: 0.2, category: 'Légumes' },
    { name: 'Asperges', calories: 20, protein: 2.2, carbs: 4, fat: 0.1, category: 'Légumes' },
    { name: 'Artichauts', calories: 47, protein: 3.3, carbs: 11, fat: 0.2, category: 'Légumes' },
    { name: 'Betteraves', calories: 43, protein: 1.6, carbs: 10, fat: 0.2, category: 'Légumes' },
    { name: 'Céleri', calories: 16, protein: 0.7, carbs: 3, fat: 0.2, category: 'Légumes' },
    { name: 'Endives', calories: 17, protein: 1.3, carbs: 4, fat: 0.1, category: 'Légumes' },
    { name: 'Fenouil', calories: 31, protein: 1.2, carbs: 7, fat: 0.2, category: 'Légumes' },
    { name: 'Radis', calories: 16, protein: 0.7, carbs: 3.4, fat: 0.1, category: 'Légumes' },
    { name: 'Navets', calories: 28, protein: 0.9, carbs: 6, fat: 0.1, category: 'Légumes' },
    { name: 'Pommes de terre', calories: 77, protein: 2, carbs: 17, fat: 0.1, category: 'Légumes' },
    
    // Fruits
    { name: 'Avocat', calories: 160, protein: 2, carbs: 9, fat: 15, category: 'Fruits' },
    { name: 'Banane', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, category: 'Fruits' },
    { name: 'Pomme', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, category: 'Fruits' },
    { name: 'Orange', calories: 47, protein: 0.9, carbs: 12, fat: 0.1, category: 'Fruits' },
    { name: 'Baies', calories: 57, protein: 0.7, carbs: 14, fat: 0.3, category: 'Fruits' },
    { name: 'Kiwi', calories: 61, protein: 1.1, carbs: 15, fat: 0.5, category: 'Fruits' },
    { name: 'Mangue', calories: 60, protein: 0.8, carbs: 15, fat: 0.4, category: 'Fruits' },
    { name: 'Ananas', calories: 50, protein: 0.5, carbs: 13, fat: 0.1, category: 'Fruits' },
    { name: 'Pêche', calories: 39, protein: 0.9, carbs: 10, fat: 0.3, category: 'Fruits' },
    { name: 'Poire', calories: 57, protein: 0.4, carbs: 15, fat: 0.1, category: 'Fruits' },
    { name: 'Raisins', calories: 67, protein: 0.6, carbs: 17, fat: 0.4, category: 'Fruits' },
    { name: 'Fraise', calories: 32, protein: 0.7, carbs: 8, fat: 0.3, category: 'Fruits' },
    { name: 'Cerise', calories: 50, protein: 1, carbs: 12, fat: 0.3, category: 'Fruits' },
    { name: 'Pamplemousse', calories: 42, protein: 0.8, carbs: 11, fat: 0.1, category: 'Fruits' },
    { name: 'Melon', calories: 34, protein: 0.8, carbs: 8, fat: 0.2, category: 'Fruits' },
    { name: 'Pastèque', calories: 30, protein: 0.6, carbs: 8, fat: 0.2, category: 'Fruits' },
    { name: 'Figue', calories: 74, protein: 0.8, carbs: 19, fat: 0.3, category: 'Fruits' },
    { name: 'Datte', calories: 277, protein: 2.5, carbs: 75, fat: 0.4, category: 'Fruits' },
    { name: 'Grenade', calories: 83, protein: 1.7, carbs: 19, fat: 1.2, category: 'Fruits' },
    { name: 'Coco', calories: 354, protein: 3.3, carbs: 15, fat: 33, category: 'Fruits' },
    
    // Graisses saines
    { name: 'Huile d\'olive', calories: 884, protein: 0, carbs: 0, fat: 100, category: 'Graisses' },
    { name: 'Noix', calories: 654, protein: 15, carbs: 14, fat: 65, category: 'Graisses' },
    { name: 'Amandes', calories: 579, protein: 21, carbs: 22, fat: 50, category: 'Graisses' },
    { name: 'Graines de chia', calories: 486, protein: 17, carbs: 42, fat: 31, category: 'Graisses' },
    { name: 'Noix de cajou', calories: 553, protein: 18, carbs: 30, fat: 44, category: 'Graisses' },
    { name: 'Pistaches', calories: 560, protein: 20, carbs: 28, fat: 45, category: 'Graisses' },
    { name: 'Noix de pécan', calories: 691, protein: 9, carbs: 14, fat: 72, category: 'Graisses' },
    { name: 'Graines de lin', calories: 534, protein: 18, carbs: 29, fat: 42, category: 'Graisses' },
    { name: 'Graines de tournesol', calories: 584, protein: 21, carbs: 20, fat: 51, category: 'Graisses' },
    { name: 'Avocat', calories: 160, protein: 2, carbs: 9, fat: 15, category: 'Graisses' }
  ];

  // Base de données étendue des repas (40 au total)
  const repas = [
    {
      name: 'Salade de poulet grillé',
      calories: 420,
      protein: 35,
      carbs: 15,
      fat: 18,
      temps: '15 min',
      portions: 2,
      ingredients: ['Poulet grillé', 'Salade verte', 'Tomates', 'Concombre', 'Vinaigrette'],
      recette: '1. Griller le poulet 2. Couper les légumes 3. Mélanger avec la vinaigrette'
    },
    {
      name: 'Saumon aux légumes',
      calories: 380,
      protein: 28,
      carbs: 20,
      fat: 22,
      temps: '25 min',
      portions: 2,
      ingredients: ['Saumon', 'Brocolis', 'Carottes', 'Riz brun', 'Huile d\'olive'],
      recette: '1. Cuire le saumon au four 2. Vapeur les légumes 3. Servir avec le riz'
    },
    {
      name: 'Omelette aux épinards',
      calories: 280,
      protein: 18,
      carbs: 8,
      fat: 20,
      temps: '10 min',
      portions: 1,
      ingredients: ['Oeufs', 'Épinards', 'Fromage', 'Beurre'],
      recette: '1. Battre les oeufs 2. Ajouter les épinards 3. Cuire à la poêle'
    },
    {
      name: 'Bowl de quinoa aux légumes',
      calories: 350,
      protein: 12,
      carbs: 45,
      fat: 12,
      temps: '20 min',
      portions: 2,
      ingredients: ['Quinoa', 'Courgettes', 'Poivrons', 'Tomates', 'Huile d\'olive'],
      recette: '1. Cuire le quinoa 2. Sauter les légumes 3. Mélanger et servir'
    },
    {
      name: 'Poulet au curry et riz',
      calories: 450,
      protein: 32,
      carbs: 35,
      fat: 18,
      temps: '30 min',
      portions: 2,
      ingredients: ['Poulet', 'Riz brun', 'Lait de coco', 'Curry', 'Oignons'],
      recette: '1. Faire revenir le poulet 2. Ajouter le curry et le lait de coco 3. Servir avec le riz'
    },
    {
      name: 'Smoothie bowl protéiné',
      calories: 320,
      protein: 25,
      carbs: 35,
      fat: 8,
      temps: '5 min',
      portions: 1,
      ingredients: ['Yaourt grec', 'Banane', 'Baies', 'Graines de chia', 'Miel'],
      recette: '1. Mixer tous les ingrédients 2. Verser dans un bol 3. Garnir avec les baies'
    },
    {
      name: 'Tacos de thon',
      calories: 380,
      protein: 28,
      carbs: 25,
      fat: 18,
      temps: '15 min',
      portions: 2,
      ingredients: ['Thon', 'Tortillas', 'Avocat', 'Tomates', 'Laitue'],
      recette: '1. Écraser le thon 2. Préparer les légumes 3. Assembler les tacos'
    },
    {
      name: 'Risotto aux champignons',
      calories: 420,
      protein: 15,
      carbs: 55,
      fat: 16,
      temps: '35 min',
      portions: 2,
      ingredients: ['Riz arborio', 'Champignons', 'Bouillon', 'Parmesan', 'Oignons'],
      recette: '1. Faire revenir les oignons 2. Ajouter le riz 3. Incorporer le bouillon progressivement'
    },
    {
      name: 'Salade de lentilles',
      calories: 290,
      protein: 18,
      carbs: 35,
      fat: 8,
      temps: '20 min',
      portions: 2,
      ingredients: ['Lentilles', 'Tomates', 'Concombre', 'Persil', 'Vinaigrette'],
      recette: '1. Cuire les lentilles 2. Couper les légumes 3. Mélanger avec la vinaigrette'
    },
    {
      name: 'Pancakes protéinés',
      calories: 280,
      protein: 22,
      carbs: 25,
      fat: 8,
      temps: '15 min',
      portions: 2,
      ingredients: ['Oeufs', 'Avoine', 'Banane', 'Fromage blanc', 'Miel'],
      recette: '1. Mixer tous les ingrédients 2. Cuire à la poêle 3. Servir avec du miel'
    },
    {
      name: 'Buddha bowl',
      calories: 480,
      protein: 20,
      carbs: 55,
      fat: 22,
      temps: '25 min',
      portions: 1,
      ingredients: ['Quinoa', 'Chou-fleur', 'Avocat', 'Haricots noirs', 'Tahini'],
      recette: '1. Cuire le quinoa 2. Rôtir le chou-fleur 3. Assembler dans un bol'
    },
    {
      name: 'Soupe de légumes',
      calories: 180,
      protein: 8,
      carbs: 25,
      fat: 5,
      temps: '30 min',
      portions: 4,
      ingredients: ['Carottes', 'Courgettes', 'Tomates', 'Oignons', 'Bouillon'],
      recette: '1. Couper tous les légumes 2. Faire revenir 3. Ajouter le bouillon et cuire'
    },
    {
      name: 'Wrap au poulet',
      calories: 420,
      protein: 30,
      carbs: 35,
      fat: 16,
      temps: '10 min',
      portions: 1,
      ingredients: ['Tortilla', 'Poulet', 'Laitue', 'Tomates', 'Sauce'],
      recette: '1. Réchauffer le poulet 2. Préparer les légumes 3. Enrouler dans la tortilla'
    },
    {
      name: 'Pâtes aux légumes',
      calories: 380,
      protein: 12,
      carbs: 45,
      fat: 14,
      temps: '20 min',
      portions: 2,
      ingredients: ['Pâtes complètes', 'Brocolis', 'Poivrons', 'Tomates', 'Huile d\'olive'],
      recette: '1. Cuire les pâtes 2. Sauter les légumes 3. Mélanger et servir'
    },
    {
      name: 'Burger de saumon',
      calories: 520,
      protein: 35,
      carbs: 30,
      fat: 28,
      temps: '25 min',
      portions: 1,
      ingredients: ['Saumon', 'Pain complet', 'Avocat', 'Laitue', 'Sauce'],
      recette: '1. Griller le saumon 2. Griller le pain 3. Assembler le burger'
    },
    {
      name: 'Chili con carne',
      calories: 350,
      protein: 25,
      carbs: 30,
      fat: 15,
      temps: '45 min',
      portions: 4,
      ingredients: ['Boeuf maigre', 'Haricots rouges', 'Tomates', 'Oignons', 'Épices'],
      recette: '1. Faire revenir la viande 2. Ajouter les légumes 3. Laisser mijoter'
    },
    {
      name: 'Salade de fruits',
      calories: 120,
      protein: 2,
      carbs: 30,
      fat: 0.5,
      temps: '10 min',
      portions: 2,
      ingredients: ['Pomme', 'Orange', 'Kiwi', 'Baies', 'Miel'],
      recette: '1. Couper tous les fruits 2. Mélanger 3. Arroser de miel'
    },
    {
      name: 'Tofu sauté',
      calories: 280,
      protein: 20,
      carbs: 15,
      fat: 16,
      temps: '20 min',
      portions: 2,
      ingredients: ['Tofu', 'Brocolis', 'Carottes', 'Sauce soja', 'Huile'],
      recette: '1. Couper le tofu 2. Sauter avec les légumes 3. Ajouter la sauce'
    },
    {
      name: 'Ratatouille',
      calories: 150,
      protein: 4,
      carbs: 20,
      fat: 6,
      temps: '40 min',
      portions: 4,
      ingredients: ['Aubergines', 'Courgettes', 'Tomates', 'Poivrons', 'Herbes'],
      recette: '1. Couper tous les légumes 2. Faire revenir 3. Laisser mijoter'
    },
    {
      name: 'Granola maison',
      calories: 320,
      protein: 8,
      carbs: 35,
      fat: 18,
      temps: '30 min',
      portions: 4,
      ingredients: ['Avoine', 'Noix', 'Miel', 'Huile de coco', 'Baies'],
      recette: '1. Mélanger tous les ingrédients 2. Cuire au four 3. Laisser refroidir'
    },
    // 20 nouveaux repas
    {
      name: 'Ceviche de poisson',
      calories: 220,
      protein: 25,
      carbs: 15,
      fat: 6,
      temps: '20 min',
      portions: 2,
      ingredients: ['Poisson blanc', 'Citron vert', 'Oignons', 'Coriandre', 'Avocat'],
      recette: '1. Couper le poisson en dés 2. Mariner dans le citron 3. Ajouter les légumes'
    },
    {
      name: 'Lasagnes aux légumes',
      calories: 380,
      protein: 18,
      carbs: 45,
      fat: 15,
      temps: '60 min',
      portions: 6,
      ingredients: ['Pâtes lasagnes', 'Courgettes', 'Aubergines', 'Tomates', 'Fromage'],
      recette: '1. Préparer les légumes 2. Alterner pâtes et légumes 3. Cuire au four'
    },
    {
      name: 'Couscous aux légumes',
      calories: 320,
      protein: 12,
      carbs: 55,
      fat: 8,
      temps: '25 min',
      portions: 4,
      ingredients: ['Couscous', 'Carottes', 'Courgettes', 'Pois chiches', 'Épices'],
      recette: '1. Cuire le couscous 2. Préparer les légumes 3. Mélanger et servir'
    },
    {
      name: 'Tartare de saumon',
      calories: 280,
      protein: 22,
      carbs: 8,
      fat: 18,
      temps: '15 min',
      portions: 2,
      ingredients: ['Saumon frais', 'Avocat', 'Concombre', 'Sésame', 'Sauce soja'],
      recette: '1. Couper le saumon en dés 2. Mélanger avec l\'avocat 3. Servir frais'
    },
    {
      name: 'Curry de légumes',
      calories: 250,
      protein: 8,
      carbs: 35,
      fat: 10,
      temps: '30 min',
      portions: 4,
      ingredients: ['Légumes variés', 'Lait de coco', 'Curry', 'Riz', 'Épices'],
      recette: '1. Faire revenir les légumes 2. Ajouter le curry 3. Servir avec le riz'
    },
    {
      name: 'Salade de quinoa',
      calories: 340,
      protein: 12,
      carbs: 45,
      fat: 12,
      temps: '20 min',
      portions: 2,
      ingredients: ['Quinoa', 'Tomates cerises', 'Concombre', 'Feta', 'Vinaigrette'],
      recette: '1. Cuire le quinoa 2. Couper les légumes 3. Mélanger avec la feta'
    },
    {
      name: 'Poisson en papillote',
      calories: 290,
      protein: 28,
      carbs: 12,
      fat: 15,
      temps: '25 min',
      portions: 2,
      ingredients: ['Cabillaud', 'Tomates', 'Courgettes', 'Herbes', 'Huile d\'olive'],
      recette: '1. Envelopper le poisson 2. Ajouter les légumes 3. Cuire au four'
    },
    {
      name: 'Risotto aux asperges',
      calories: 380,
      protein: 12,
      carbs: 50,
      fat: 14,
      temps: '30 min',
      portions: 3,
      ingredients: ['Riz arborio', 'Asperges', 'Bouillon', 'Parmesan', 'Oignons'],
      recette: '1. Faire revenir les oignons 2. Ajouter le riz 3. Incorporer les asperges'
    },
    {
      name: 'Soupe miso',
      calories: 120,
      protein: 8,
      carbs: 15,
      fat: 3,
      temps: '15 min',
      portions: 2,
      ingredients: ['Pâte miso', 'Tofu', 'Algues', 'Champignons', 'Bouillon'],
      recette: '1. Faire chauffer le bouillon 2. Ajouter la pâte miso 3. Garnir avec le tofu'
    },
    {
      name: 'Tacos végétariens',
      calories: 320,
      protein: 15,
      carbs: 40,
      fat: 12,
      temps: '20 min',
      portions: 3,
      ingredients: ['Tortillas', 'Haricots noirs', 'Avocat', 'Tomates', 'Laitue'],
      recette: '1. Réchauffer les haricots 2. Préparer les légumes 3. Assembler les tacos'
    },
    {
      name: 'Poke bowl',
      calories: 450,
      protein: 25,
      carbs: 35,
      fat: 22,
      temps: '15 min',
      portions: 1,
      ingredients: ['Thon', 'Riz', 'Avocat', 'Concombre', 'Sauce soja'],
      recette: '1. Couper le thon en dés 2. Préparer le riz 3. Assembler dans un bol'
    },
    {
      name: 'Gratin de chou-fleur',
      calories: 280,
      protein: 15,
      carbs: 20,
      fat: 16,
      temps: '35 min',
      portions: 4,
      ingredients: ['Chou-fleur', 'Fromage', 'Crème', 'Noix de muscade', 'Chapelure'],
      recette: '1. Cuire le chou-fleur 2. Préparer la béchamel 3. Gratiner au four'
    },
    {
      name: 'Salade de betteraves',
      calories: 180,
      protein: 6,
      carbs: 25,
      fat: 6,
      temps: '20 min',
      portions: 2,
      ingredients: ['Betteraves', 'Chèvre', 'Noix', 'Mâche', 'Vinaigrette'],
      recette: '1. Cuire les betteraves 2. Couper en dés 3. Mélanger avec le chèvre'
    },
    {
      name: 'Paella végétarienne',
      calories: 420,
      protein: 15,
      carbs: 60,
      fat: 12,
      temps: '45 min',
      portions: 4,
      ingredients: ['Riz', 'Artichauts', 'Poivrons', 'Tomates', 'Safran'],
      recette: '1. Faire revenir le riz 2. Ajouter les légumes 3. Laisser mijoter'
    },
    {
      name: 'Carpaccio de boeuf',
      calories: 320,
      protein: 25,
      carbs: 8,
      fat: 22,
      temps: '20 min',
      portions: 2,
      ingredients: ['Boeuf', 'Roquette', 'Parmesan', 'Huile d\'olive', 'Citron'],
      recette: '1. Couper le boeuf très fin 2. Disposer sur l\'assiette 3. Garnir et arroser'
    },
    {
      name: 'Soupe de potiron',
      calories: 150,
      protein: 4,
      carbs: 25,
      fat: 5,
      temps: '30 min',
      portions: 4,
      ingredients: ['Potiron', 'Oignons', 'Bouillon', 'Crème', 'Épices'],
      recette: '1. Cuire le potiron 2. Mixer avec le bouillon 3. Ajouter la crème'
    },
    {
      name: 'Tartine avocat',
      calories: 320,
      protein: 12,
      carbs: 25,
      fat: 22,
      temps: '10 min',
      portions: 2,
      ingredients: ['Pain complet', 'Avocat', 'Tomates', 'Graines', 'Citron'],
      recette: '1. Griller le pain 2. Écraser l\'avocat 3. Garnir et servir'
    },
    {
      name: 'Boulettes de lentilles',
      calories: 280,
      protein: 18,
      carbs: 35,
      fat: 8,
      temps: '30 min',
      portions: 4,
      ingredients: ['Lentilles', 'Oignons', 'Ail', 'Épices', 'Chapelure'],
      recette: '1. Cuire les lentilles 2. Mixer avec les légumes 3. Former des boulettes'
    },
    {
      name: 'Salade de pâtes',
      calories: 380,
      protein: 15,
      carbs: 45,
      fat: 16,
      temps: '20 min',
      portions: 3,
      ingredients: ['Pâtes', 'Tomates', 'Mozzarella', 'Basilic', 'Huile d\'olive'],
      recette: '1. Cuire les pâtes 2. Couper les légumes 3. Mélanger et assaisonner'
    },
    {
      name: 'Crumble aux fruits',
      calories: 320,
      protein: 6,
      carbs: 45,
      fat: 14,
      temps: '40 min',
      portions: 4,
      ingredients: ['Pommes', 'Baies', 'Farine', 'Beurre', 'Sucre'],
      recette: '1. Préparer les fruits 2. Faire la pâte à crumble 3. Cuire au four'
    }
  ];

  const filteredAliments = aliments.filter(aliment =>
    aliment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aliment.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRepas = repas.filter(repas =>
    repas.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const AlimentCard = ({ aliment }: any) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">{aliment.name}</h3>
          <Badge variant="secondary">{aliment.category}</Badge>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div>Calories: {aliment.calories}</div>
          <div>Protéines: {aliment.protein}g</div>
          <div>Glucides: {aliment.carbs}g</div>
          <div>Lipides: {aliment.fat}g</div>
        </div>
        <Button size="sm" className="w-full mt-3">
          <Plus className="w-4 h-4 mr-1" />
          Ajouter
        </Button>
      </CardContent>
    </Card>
  );

  const RepasCard = ({ repas }: any) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
          <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{repas.name}</CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {repas.temps}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {repas.portions}
            </Badge>
          </div>
        </div>
        <CardDescription>
          {repas.calories} kcal • {repas.protein}g protéines • {repas.carbs}g glucides • {repas.fat}g lipides
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
            <div>
            <h4 className="font-medium mb-2">Ingrédients :</h4>
            <div className="flex flex-wrap gap-1">
              {repas.ingredients.map((ingredient: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Recette :</h4>
            <p className="text-sm text-muted-foreground">{repas.recette}</p>
          </div>
          <Button className="w-full">
            <ChefHat className="w-4 h-4 mr-2" />
            Voir la recette complète
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Apple className="w-8 h-8 text-primary" />
            Nutrition
          </h1>
          <p className="text-muted-foreground mt-1">
            Aliments et recettes pour une nutrition optimale
          </p>
        </div>
        </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Rechercher un aliment ou un repas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
                </div>
              </CardContent>
            </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="aliments" className="flex items-center gap-2">
            <Apple className="w-4 h-4" />
            Aliments ({aliments.length})
          </TabsTrigger>
          <TabsTrigger value="repas" className="flex items-center gap-2">
            <Utensils className="w-4 h-4" />
            Repas & Recettes ({repas.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="aliments" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAliments.map((aliment, index) => (
              <AlimentCard key={index} aliment={aliment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="repas" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRepas.map((repas, index) => (
              <RepasCard key={index} repas={repas} />
          ))}
        </div>
        </TabsContent>
      </Tabs>
      </div>
  );
};

export default Nutrition;