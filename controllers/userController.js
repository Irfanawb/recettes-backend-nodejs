import mongoose from 'mongoose';
import User from '../models/UserModel.js';

// @desc    Créer un nouvel utilisateur
// @route   POST /api/users
export const createUser = async (req, res) => {
    // 1. On récupère les infos envoyées par le client (Postman/Front)
    const { nom, email } = req.body;

    try {
        // 2. On vérifie si l'utilisateur existe déjà (email unique)
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        // 3. On crée l'utilisateur
        const newUser = await User.create({
            nom,
            email,
            listeavis: [] // Vide à la création
        });

        // 4. On renvoie une réponse de succès (201 = Créé)
        res.status(201).json({
            message: 'Utilisateur créé avec succès !',
            user: newUser
        });

    } catch (error) {
        // Gestion des erreurs (ex: email mal formé détecté par le modèle)
        res.status(500).json({ message: error.message });
    }
};
// @desc    Récupérer tous les utilisateurs
// @route   GET /api/users
export const getAllUsers = async (req, res) => {
    try {
        // On cherche tous les users ( {} signifie "tous" )
        // .select('-password') permettrait de cacher le mot de passe si on en avait un
        const users = await User.find({});

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// @desc    Chercher un utilisateur (Filtre par nom ou email)
// @route   GET /api/users/search
export const searchUser = async (req, res) => {
    // On récupère les filtres depuis l'URL (ex: ?nom=Chef)
    const { nom, email } = req.query;

    try {
        let filtre = {};

        // Si on cherche par nom, on utilise une "Regex" pour chercher même si ce n'est pas le mot exact
        // 'i' veut dire "insensible à la casse" (Majuscule/minuscule on s'en fiche)
        if (nom) {
            filtre.nom = { $regex: nom, $options: 'i' };
        }

        // Si on cherche par email, on cherche la correspondance exacte
        if (email) {
            filtre.email = email;
        }

        const users = await User.find(filtre);

        if (users.length === 0) {
            return res.status(404).json({ message: 'Aucun utilisateur trouvé avec ces critères.' });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// @desc    Récupérer les avis d'un utilisateur (Agrégation)
// @route   GET /api/users/:id/reviews
// ... (début du fichier identique)

export const getUserReviews = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.id);

        const userWithReviews = await User.aggregate([
            { $match: { _id: userId } },
            
            {
                $lookup: {
                    from: 'avis',          // <--- C'EST ICI QU'ON CHANGE ! (Nom de ta collection)
                    localField: '_id',
                    foreignField: 'users', // Le champ dans la collection 'avis' qui contient l'ID du user
                    as: 'les_avis_recuperes'
                }
            },
            
            {
                $project: {
                    nom: 1,
                    email: 1,
                    les_avis_recuperes: 1
                }
            }
        ]);

        if (!userWithReviews || userWithReviews.length === 0) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        res.status(200).json(userWithReviews[0]);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};