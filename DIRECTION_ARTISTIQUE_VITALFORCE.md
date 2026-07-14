# Direction Artistique — VitalForce (FitGEN)

> Document de référence à donner tel quel à Cursor. Objectif : une seule source de vérité visuelle, appliquée partout, pour arrêter l'incohérence actuelle.

## 0. Diagnostic (pourquoi ça "fait pas beau" aujourd'hui)

La DA VitalForce existe déjà et est bien construite dans `src/index.css` (tokens, glass cards, glow, badges hexagonaux). Le problème n'est **pas** l'absence de palette, c'est son application :

1. **206 couleurs codées en dur** trouvées dans `src/pages/*` (`bg-blue-500`, `bg-purple-500`, `#rrggbb`, `from-blue-500 to-blue-700`...) au lieu des tokens `primary` / `secondary` / `accent`. Exemple concret : `src/pages/Dashboard.tsx:128,525,553` utilise du bleu/violet Tailwind par défaut au lieu du violet `#6B2AFF` / cyan `#00C2FF` officiels.
2. **Un deuxième système de thème concurrent** : `src/styles/solo-leveling-theme.css` est importé dans `src/index.css` avec sa propre palette légèrement différente (`--sl-blue: #00BFFF`, `--sl-purple: #8A2BE2`) et sa propre police (Orbitron). Il n'est quasi pas utilisé dans les composants (bon signe) mais reste chargé et risque de créer des divergences si quelqu'un (humain ou IA) réutilise ses classes `sl-*` par erreur.
3. Résultat : certains écrans/composants (ex. `MobileNavigation.tsx`) respectent parfaitement les tokens, d'autres (ex. `Dashboard.tsx`) partent sur des couleurs Tailwind génériques → incohérence visuelle d'un écran à l'autre.

**La correction n'est donc pas "recréer une DA" mais : verrouiller une seule palette/système, et migrer tout le code dessus.**

---

## 1. Identité visuelle

Application de fitness gamifiée, esthétique "sci-fi / gaming premium" : fond bleu nuit très sombre, accents néon violet→cyan en dégradé, cartes en verre dépoli (glassmorphism), glow subtil sur les éléments actifs, badges hexagonaux façon RPG. Référence de ton : un mix entre un HUD de jeu vidéo et une app fitness haut de gamme — jamais criard, le glow sert à hiérarchiser, pas à décorer partout.

---

## 2. Palette officielle (verrouillée — source unique)

Ne pas utiliser d'autres couleurs que celles-ci (ni les couleurs Tailwind par défaut `blue-500`, `purple-500`, etc., ni les valeurs de `solo-leveling-theme.css`).

| Rôle | Hex | Token CSS existant | Usage |
|---|---|---|---|
| Fond principal | `#0A0E1F` | `--background` | Fond de toutes les pages |
| Surface / carte | `#1E2335` | `--card`, `--muted` | Cartes, panels, inputs |
| Primaire (violet néon) | `#6B2AFF` | `--primary` | CTA principaux, éléments actifs, glow |
| Secondaire (cyan néon) | `#00C2FF` | `--secondary` | Accents, navigation active, highlights |
| Accent (orange) | `#FF7D3B` | `--accent` | Alertes positives, XP, éléments à forte saillance |
| Succès | `#2ECC71` | `--success` | Validation, progression positive |
| Texte principal | `#FFFFFF` | `--foreground` | Titres, texte primaire |
| Texte secondaire | `#B8B9C3` | `--muted-foreground` | Sous-titres, labels, texte tertiaire |
| Bordure | rgba tokens existants (`--border`) | `--border` | Séparateurs, contours de carte |

Dégradé signature : `linear-gradient(135deg, #6B2AFF 0%, #00C2FF 100%)` → déjà défini en `--gradient-primary` et en classe `.gradient-primary`. C'est LE dégradé de marque : barres de progression, CTA principal, logo, éléments de célébration.

**Règle stricte : aucune couleur ne doit être écrite en dur dans un composant.** Toujours passer par les classes Tailwind mappées aux tokens (`bg-primary`, `text-secondary`, `bg-card`, `border-border`...) ou les classes utilitaires déjà présentes (`.glass-card`, `.gradient-primary`, `.glow-primary`...).

---

## 3. Typographie

- **Police unique pour l'UI : Inter** (déjà chargée). Tout le texte fonctionnel (titres de page, corps, labels, boutons) est en Inter.
- Orbitron/Exo 2 (déjà chargées via `solo-leveling-theme.css`) : à réserver **uniquement** à de gros chiffres/stats hero (XP, niveau, score) si on veut garder un accent "gaming" — jamais pour du texte courant, trop peu lisible en petite taille.
- Échelle (déjà définie dans `ThemeConfig.ts`, à garder) :
  - H1 `2.5rem / 700`, H2 `2rem / 600`, H3 `1.75rem / 600`, H4 `1.5rem / 600`
  - Body `1rem / 400`, Body small `0.875rem / 400`, Bouton `1rem / 500`

---

## 4. Espacement, rayons, ombres

- Rayons : cartes `16px` (`rounded-2xl`/`--radius`), boutons `8–16px` selon taille, badges/pills `9999px`.
- Espacement de base (multiples de 4) : `4 / 8 / 16 / 24 / 32`.
- Ombres/glow : réserver le glow (`.glow-primary`, `.glow-secondary`, `.neon-glow`) aux états **actifs/hover/sélectionnés**. Une carte au repos n'a pas de glow — sinon tout l'écran clignote et rien ne ressort.

---

## 5. Composants standards (classes déjà présentes dans `index.css`, à réutiliser partout)

| Composant | Classe à utiliser | Ne pas faire |
|---|---|---|
| Carte | `.glass-card` (ou `.surface-panel` pour une carte plus neutre) | Redéfinir un `bg-[#...]` custom par carte |
| Bouton primaire | `bg-primary` + `.gradient-primary` pour les CTA principaux | `bg-blue-500`, `bg-purple-600` |
| Barre de progression | `.vitalforce-progress` + `.vitalforce-progress-bar` | Une barre custom avec des couleurs différentes |
| Badge / icône ronde | `.icon-badge` ou `.hexagon-badge` pour les badges de succès | Un `div` avec couleur en dur |
| Navigation basse | `.gaming-nav` (déjà bien fait dans `MobileNavigation.tsx` — **prendre ce fichier comme référence de qualité**) | — |
| État actif (nav, tab, filtre) | `text-secondary` + glow `drop-shadow(0_0_10px_rgba(0,194,255,0.8))` | Couleur différente par écran |

---

## 6. Iconographie

- Traits fins (`stroke-2`, `stroke-[2.5]` sur l'état actif), style outline (lucide-react déjà utilisé — le garder, ne pas mélanger avec des sets d'icônes différents).
- Glow uniquement sur icône active/sélectionnée, pas au repos.
- Pour les badges/succès/récompenses : forme hexagonale (`.clip-path-hexagon`) + dégradé de marque, cohérent avec l'esthétique RPG déjà en place.

---

## 7. Plan de nettoyage à exécuter (pour Cursor)

1. **Remplacer les 206 couleurs codées en dur** dans `src/pages/*.tsx` (priorité : `Dashboard.tsx`, `Programme.tsx`, `BlocsEntrainement.tsx`, `ProfileSummary.tsx`, `VitalForcePage.tsx` — les plus gros contrevenants) par les tokens/classes du tableau §2 et §5.
2. **Retirer `solo-leveling-theme.css`** de l'import dans `src/index.css` (ligne 5) si aucune classe `sl-*` n'est utilisée ailleurs dans le code (vérifié : aucune occurrence actuellement) — ou le fusionner explicitement dans le système officiel si certains effets (glow, shimmer) doivent être repris, mais alors aligner ses variables de couleur sur celles de `--primary`/`--secondary` au lieu de garder `#00BFFF`/`#8A2BE2`.
3. **Auditer `Dashboard.tsx` lignes 128, 525, 553** en priorité (exemples confirmés de `blue-500`/`purple-500` hors palette).
4. Prendre `src/components/MobileNavigation.tsx` comme gabarit de référence pour la bonne application des tokens.
5. Ne créer aucune nouvelle couleur/gradient sans l'ajouter d'abord à ce document.

---

## Instruction à donner à Cursor

> Applique strictement la Direction Artistique VitalForce décrite dans `DIRECTION_ARTISTIQUE_VITALFORCE.md`. Remplace toutes les couleurs codées en dur (classes Tailwind par défaut type `bg-blue-500`/`bg-purple-500`, et valeurs hex inline) par les tokens et classes utilitaires déjà définis dans `src/index.css` (`--primary`, `--secondary`, `--accent`, `.glass-card`, `.gradient-primary`, `.vitalforce-progress`, etc.). Ne modifie pas les valeurs de la palette elle-même. Supprime l'import de `src/styles/solo-leveling-theme.css` dans `src/index.css` si ses classes `sl-*` ne sont utilisées nulle part ailleurs dans le code. `src/components/MobileNavigation.tsx` est l'exemple de référence à suivre pour le niveau de cohérence attendu.
