API Plateforme de Recettes

Bienvenue sur la documentation de l'API de notre plateforme culinaire. Cette API RESTful a été conçue avec Node.js et MongoDB. Elle permet la gestion complète de recettes de cuisine, incluant la gestion des chefs, des utilisateurs et des avis communautaires.

Fonctionnalités Principales
L'API gère quatre entités principales :

1. Recettes : Affichage, création, modification et filtrage.
2. Chefs : Gestion complète (CRUD), lien avec leurs recettes et export de données.
3. Avis : Ajout de commentaires/notes, filtrage par note et export.
4. Utilisateurs : Inscription, recherche, historique d'avis et export.
Architecture Base de Données (MongoDB)
Le projet repose sur 4 collections :
• recettes
• chefs
• avis
• users
Installation et Démarrage
1. Cloner le projet :
git clone https://github.com/le-repo/projet-recettes.git
2. Installer les dépendances :
npm install
3. Configurer l'environnement :
Créez un fichier .env et ajoutez : MONGO_URI=... et PORT=3000
4. Lancer le serveur :
npm start
Documentation des Endpoints
Voici la liste détaillée des routes disponibles pour chaque fonctionnalité.
1. Gestion des Recettes
• GET /api/recettes : Affiche la liste de toutes les recettes disponibles.
• GET /api/recettes?filtre=valeur : Permet de filtrer les recettes (selon les critères définis).
• POST /api/recettes : Créer et enregistrer une nouvelle recette en base de données.
• PUT /api/recettes/:id : Modifier les informations d'une recette existante via son ID.
2. Gestion des Chefs
• GET /api/chefs : Affiche la liste complète des chefs.
• POST /api/chefs : Créer un nouveau profil de chef.
• PUT /api/chefs/:id : Mettre à jour les informations d'un chef.
• DELETE /api/chefs/:id : Supprimer un chef de la base de données.
• GET /api/chefs/:id/recettes : Affiche toutes les recettes associées à un chef spécifique.
• GET /api/chefs/export : Génère et télécharge la liste des chefs au format JSON.
3. Gestion des Avis
• POST /api/avis : Créer un nouvel avis pour une recette.
• DELETE /api/avis/:id : Supprimer un avis existant.
• GET /api/recettes/:id/avis : Affiche tous les avis liés à une recette spécifique.
• GET /api/avis?note=X : Filtre les avis par note (ex: récupérer tous les avis à 5 étoiles).
• GET /api/avis/export : Génère et télécharge la liste des avis au format JSON.
4. Gestion des Utilisateurs (Users)
• POST /api/users : Créer un nouvel utilisateur (Inscription).
• GET /api/users : Affiche la liste de tous les utilisateurs inscrits.
• GET /api/users/search : Chercher un utilisateur par son nom ou son email via des paramètres de requête.
• GET /api/users/:id/avis : Récupère l'historique de tous les avis laissés par un utilisateur spécifique.
• GET /api/users/export : Génère et télécharge la liste des utilisateurs au format JSON.
Auteurs
Projet réalisé par Jalila ,Irfane ,Ousmane,Amadou
