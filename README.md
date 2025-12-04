# 🐺 Tool Management



## 🚀 Quick Start
```bash
# 1. Créer un fichier .env en copiant .env.example

# 2. Installer les dépendances
npm install

# 3. Lancer le projet
npm run dev
```


## 🏗️ Architecture
**Architecture type base**, structurée de manière claire et modulaire. Chaque dossier a une responsabilité précise: interfaces, services, appels API, constantes, utilitaires et composants. Cette organisation permet:

- Une maintenabilité simplifiée: chaque couche est indépendante, il est facile de remplacer ou de faire évoluer une partie du code sans impacter le reste.

- Une réutilisation optimisée: les composants, filtres et classes utilitaires sont centralisés et peuvent être utilisés partout.

- Une abstraction claire: la couche service appelle la couche api, ce qui permet de ne pas dépendre directement de l’implémentation réseau et de pouvoir remplacer facilement l’API ou ajouter du mock pour les tests.

- Une cohérence forte: les interfaces TypeScript et les constantes globales garantissent que toutes les parties du projet utilisent les mêmes types et valeurs.

Cette structure sert de base solide pour faire évoluer l’application en ajoutant de nouvelles pages, fonctionnalités ou composants tout en gardant un code lisible et fiable.


- ### interfaces/
Contient les définitions de types et interfaces TypeScript pour toutes les entités.
- Permet d’avoir une source unique de vérité pour le typage et facilite la réutilisation et la cohérence dans tout le projet.

- ### api/
Contient les appels directs à l’API (axios).
Sépare la logique réseau de la logique métier, facilitant le test et le remplacement de l’API si nécessaire.

- ### services/
Couche intermédiaire qui utilise les APIs pour exposer des méthodes métiers aux composants.
Fournit une abstraction supplémentaire et réduit la dépendance directe des composants à l’implémentation de l’API.

- ### constantes/
Stocke les constantes globales (ex. couleurs, enums, types, ...).
Centralise les valeurs fixes pour éviter la duplication et faciliter la maintenance.

- ### utils/
Contient des classes utilitaires avec méthodes static pour des fonctionnalités réutilisables (UtilDate, UtilNumber, ...).
Permet d’utiliser des méthodes communes partout sans instanciation inutile, et simplifie le code.

- ### components/inputs/
Ensemble des composants input personnalisés (InputText, InputSelect, ...).
Standardise le comportement des champs de formulaire et facilite leur réutilisation.

- ### components/shared/
Composants UI réutilisables avec logique intégrée (Card, Tag, Title, Drawer, ...).
Favorise la cohérence visuelle et la réutilisation à travers l’application.

- ### components/filters/
Contient tous les filtres pour les side panels et la gestion des données filtrées.
Permet d’avoir une structure claire et extensible pour les composants de filtrage.


## 🎨 Design System Evolution
- Palette de couleurs cohérente
- Composants UI réutilisables (Cards, Tags, ...)
- Adaptation progressive à chaque page pour un rendu harmonieux

## 🔗 Navigation & User Journey
- Flow utilisateur complet:
    - Dashboard – Vue synthétique des métriques
    - Tools – Gestion et édition des outils
    - Analytics – Visualisation détaillée et reporting

Navigation fluide grâce à un header commun et des menus adaptés mobile/desktop. 
Le logo en haut a gauche devient clickable sur mobile et permet de naviguer entre toutes les pages.

## 📊 Data Integration Strategy
- Gestion des données à partir d’un JSON server, avec:
    - Services centralisés pour chaque entité (Tools, Analytics, Departments)
    - Tanstack Query et computed pour la récupération et la réactivité des données
    - Pagination et tri gérés côté client pour de meilleures performances
    - Loading infini sur la page des Tools

## 📱 Progressive Responsive Design
- Approche mobile-first (lol), avec:
    - Composants flexibles et adaptables par page
    - Menus et popovers optimisés pour mobile
    - Tables et dashboards responsives pour tout type d’écran


## ⚡ Performance Optimizations
- Techniques utilisées pour optimiser l’app:
    - Caching avec TanStack Query (staleTime)
    - Lazy loading des composants et tables
    - Minimisation des re-renders grâce aux computed

## 🎯 Design Consistency Approach
- Cohérence maintenue sans mockups:
    - Composants UI centralisés
    - Principes de design stricts respectés sur toutes les pages

## 📈 Data Visualization Philosophy
- Choix de PrimeVue Charts et intégration avec le design system
- Couleurs et styles uniformes pour une lecture rapide
- Dashboard synthétique et Analytics détaillés

## 🔮 Next Steps / Complete App Vision
- Gestion multi-organisation et permissions
- Export de rapports
- Notifications avancées
- Historique et tracking des actions utilisateurs
- Mise en place de Pinia pour gérer le context (authStore, toolStore, etc)
- CRUD complet de toutes les entités