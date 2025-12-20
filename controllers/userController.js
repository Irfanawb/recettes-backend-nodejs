import fs from "fs";
import mongoose from "mongoose";
import User from "../models/UserModel.js";
import Avis from "../models/avisModel.js";

// @desc    Créer un nouvel utilisateur
// @route   POST /api/users
export const createUser = async (req, res) => {
    const { nom, email } = req.body;

    try {
        // Vérifier si l'email existe déjà
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        // Créer l'utilisateur
        const newUser = await User.create({
            nom,
            email,
            listeAvis: []
        });

        res.status(201).json({
            message: "Utilisateur créé avec succès !",
            user: newUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Récupérer tous les utilisateurs
// @route   GET /api/users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Rechercher un utilisateur par nom ou email
// @route   GET /api/users/search
export const searchUser = async (req, res) => {
    const { nom, email } = req.query;

    try {
        let filtre = {};

        if (nom) {
            filtre.nom = { $regex: nom, $options: "i" };
        }

        if (email) {
            filtre.email = email;
        }

        const users = await User.find(filtre);

        if (users.length === 0) {
            return res.status(404).json({ message: "Aucun utilisateur trouvé." });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Récupérer les avis d'un utilisateur
// @route   GET /api/users/:id/avis
export const getUserReviews = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("listeAvis");

        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        res.status(200).json({
            nom: user.nom,
            email: user.email,
            avis: user.listeAvis
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Exporter les utilisateurs vers un fichier JSON
// @route   GET /api/users/export
export const exportUsersToJson = async (req, res) => {
    try {
        const users = await User.find({});

        const filePath = "./data/users_export.json";
        const jsonData = JSON.stringify(users, null, 2);

        fs.writeFileSync(filePath, jsonData);

        res.status(200).json({
            message: "Export effectué avec succès.",
            path: filePath
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'export.", error: error.message });
    }
};
