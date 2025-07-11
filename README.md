# 📱 Projet mobile React Native – Cours Udemy

Bienvenue dans ce cours **"Créer votre première application mobile avec React Native, Expo et TypeScript"**.

Ce repo contient le code final complet présenté dans les vidéos. Il vous permettra de suivre, tester, modifier et réutiliser le code à votre rythme.

---

## 🚀 Objectifs du projet

- Initialiser une application mobile avec **Expo**
- Comprendre l’**architecture** d’un projet React Native moderne
- Utiliser **TypeScript** dans une app mobile
- Créer des **vues**, des **composants réutilisables**, et gérer les **états**
- Mettre en place la **navigation** (React Navigation : Stack, Tabs, Drawer)
- Faire des **requêtes API REST** et **GraphQL**
- Gérer les **formulaires** avec `react-hook-form` et `Yup`
- Utiliser **AsyncStorage** pour stocker des données localement
- Structurer le projet avec des **bonnes pratiques**
- Découvrir les **hooks**, **contextes**, la gestion d’erreurs TypeScript, et bien plus encore

---

## 🧰 Technologies & outils

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- ESLint & Prettier

---

## ▶️ Lancer le projet en local

### Prérequis

- Node.js (v18+ recommandé)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Un simulateur Android/iOS ou l’app mobile **Expo Go**

### Installation

```bash
git clone https://github.com/SK-Tutos/WatchBuddy.git
cd WatchBuddy
npm install
expo start
```

📱 Scannez ensuite le QR code avec votre téléphone via Expo Go ou ouvrez dans un simulateur.

---

## 📂 Structure du projet

```bash
├── ressources/                                 # Dossier contenant les fichiers textes d'accompagnement du cours
│   ├── 01 - Présentation.txt                   # Section 2 : Sites, mentions, lignes de commandes, notes, etc.
│   ├── 02 - Création de l'application.txt      # Section 3 : Sites, mentions, lignes de commandes, notes, etc.
│   ├── 03 - Création de l'application.txt      # Section 4 : Sites, mentions, lignes de commandes, notes, etc.
│   ├── 04 - Création de l'application.txt      # Section 5 : Sites, mentions, lignes de commandes, notes, etc.
│   └── 05 - Création de l'application.txt      # Section 6 : Sites, mentions, lignes de commandes, notes, etc.

├── src/
│   ├── assets/            # Images, polices, icônes, etc.
│   ├── components/        # Composants réutilisables (UI, widgets, etc.)
│   ├── constants/         # Constantes globales (couleurs, textes, configs)
│   ├── contexts/          # Contextes React (état global, thèmes, etc.)
│   ├── hooks/             # Hooks personnalisés (logique réutilisable)
│   ├── navigation/        # Configuration de la navigation (stack, tabs, drawer)
│   ├── screens/           # Écrans / vues de l'application (pages)
│   ├── services/          # Appels API, clients GraphQL, fonctions réseau
│   ├── types/             # Déclarations de types TypeScript
│   └── utils/             # Fonctions utilitaires et helpers

├── App.tsx                # Point d’entrée principal de l’application
├── app.json               # Configuration Expo de l'application
├── eslint.config.js       # Configuration ESLint (format .js recommandé par Expo)
├── prettier.config.js     # Configuration Prettier
├── tsconfig.json          # Configuration TypeScript
├── package.json           # Dépendances et scripts npm/yarn
├── yarn.lock              # Fichier de verrouillage Yarn     
├── README.md              # Documentation du projet
```

---

## 🙌 Remerciements
Merci d’avoir suivi ce cours 🙏
Si vous avez des questions, n’hésitez pas à les poser sur Udemy dans la section Q&A du cours.
Et si le cours vous a plu, pensez à laisser un avis ⭐️ !

🧑‍💻 Projet réalisé par SK-Tutos

📘 Cours disponible sur [Udemy](https://www.udemy.com/course/react-native-expo-creez-votre-premiere-app-mobile)