import express from "express";
import Avis from "../models/avisModel.js";
import User from "../models/UserModel.js";
import Recette from "../models/recette.js";

const router = express.Router();

// CRÉER UN AVIS
// POST /api/avis
router.post("/", async (req, res) => {
    const { id_user, id_recette, note, commentaire } = req.body;

    // Log incoming body to help debug missing-field errors
    console.log("POST /api/avis body:", req.body);

    // Require id_user, id_recette and note (note must be numeric)
    if (id_user == null || id_recette == null || note == null) {
        return res.status(400).json({ error: "Champs manquants: id_user, id_recette et note sont obligatoires." });
    }

    const numericNote = Number(note);
    if (Number.isNaN(numericNote) || numericNote < 0 || numericNote > 5) {
        return res.status(400).json({ error: "La note doit être un nombre entre 0 et 5." });
    }

    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findById(id_user);
        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable." });
        }

        // Vérifier si la recette existe
        const recette = await Recette.findById(id_recette);
        if (!recette) {
            return res.status(404).json({ error: "Recette introuvable." });
        }

        // Créer l'avis
        const avisCree = await Avis.create({
            utilisateur: id_user,
            recette: id_recette,
            note: numericNote,
            commentaire: commentaire || "",
            date_avis: new Date()
        });

        // Ajouter l'avis dans listeAvis de l'utilisateur
        user.listeAvis.push(avisCree._id);
        await user.save();

        res.status(201).json({
            message: "Avis créé avec succès",
            avis: avisCree
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// AFFICHER LES AVIS D’UNE RECETTE
// GET /api/avis/recette/:id

router.get("/recette/:id", async (req, res) => {
    try {
        const avis = await Avis.find({ recette: req.params.id })
            .populate("utilisateur", "nom email")
            .populate("recette", "titre photoUrl");

        res.json(avis);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// SUPPRIMER UN AVIS
// DELETE /api/avis/:id

router.delete("/:id", async (req, res) => {
    try {
        const avis = await Avis.findById(req.params.id);

        if (!avis) {
            return res.status(404).json({ message: "Avis introuvable." });
        }

        // Retirer l'avis de la listeAvis de l'utilisateur
        await User.findByIdAndUpdate(
            avis.utilisateur,
            { $pull: { listeAvis: avis._id } }
        );

        await avis.deleteOne();

        res.json({ message: "Avis supprimé avec succès." });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// FILTRER LES AVIS PAR NOTE
// GET /api/avis/filtre/:note

router.get("/filtre/:note", async (req, res) => {
    const note = Number(req.params.note);

    if (note < 0 || note > 5) {
        return res.status(400).json({ error: "Note invalide." });
    }

    try {
        const avis = await Avis.find({ note });
        res.json(avis);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
