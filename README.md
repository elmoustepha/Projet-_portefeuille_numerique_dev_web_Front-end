# Mon Projet Full-Stack: Portefeuille Numérique

Application web full-stack pour gérer un portefeuille numérique, avec un front-end responsive et un back-end sécurisé.

## Technologies Utilisées
- Front-end: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" width="20" height="20"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" width="20" height="20"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="20" height="20"> (avec Font Awesome pour les icônes)
- Back-end: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" width="20" height="20"> ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg" width="20" height="20"> (non inclus dans ce repo pour des raisons de sécurité)

## Fonctionnalités
- Authentification des utilisateurs (connexion, inscription)
- Gestion des cryptomonnaies (ajouter, afficher, supprimer)
- Historique des transferts
- Cours en temps réel des crypto-monnaies
- Intégration d’une API externe pour la récupération en temps réel des prix des cryptomonnaies
- Gestion des utilisateurs (modifier, supprimer)
- Interface responsive avec sidebar mobile

## Structure du Projet
- `connexion.html/css/js`: Page de connexion
- `inscrire.html/css/js`: Page d'inscription
- `accueil.html/css/js`: Page d'accueil
- `accounts.html/css/js`: Gestion du portefeuille
- `tempsreel.html/css/js`: Cours en temps réel
- `profile.html/css/js`: Profil utilisateur

## Back-End (Non Inclus)
Pour des raisons de sécurité, le back-end n'est pas inclus dans ce repo. Il comprend:
- `server.js`: Serveur Express avec routes pour cryptos, transfers, et users
- `db.js`: Connexion à la base de données MySQL
- Routes: `CryptoRoute.js`, `TransferRoute.js`, `UserRoute.js` pour les opérations CRUD
- Port: Configurable
- Sécurité: Utilise des variables d'environnement pour les données sensibles (comme DB credentials et API keys)

## Installation et Exécution (Front-End Seulement)
1. Clonez le repo: `git clone https://github.com/elmoustepha/Projet_portefeuille_numerique_dev_web_Front-end.git`
2. Ouvrez les fichiers HTML dans un navigateur (ou utilisez un serveur local comme Live Server)
3. Pour le back-end complet, contactez-moi pour des détails privés.

## Sécurité
Les informations sensibles (mots de passe, clés API) sont exclues pour éviter les risques. Utilisez des variables d'environnement pour la configuration.

## Licence
MIT
