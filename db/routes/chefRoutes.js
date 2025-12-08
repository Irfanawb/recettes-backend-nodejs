import express from "express";
import fs from "fs";
import Chef from "../models/ChefModel.js";

const router = express.Router();

//CRÉER UN CHEF (POST)

router.post("/", async (req, res) => {
    try {
        const chef = await Chef.create(req.body);
        res.status(201).json(chef);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//AFFICHER TOUS LES CHEFS (GET)

router.get("/", async (req, res) => {
    try {
        const chefs = await Chef.find();
        res.status(200).json(chefs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

 //EXPORTER LES CHEFS EN FICHIER JSON

router.get("/export/json", async (req, res) => {
    try {
        const chefs = await Chef.find();

        // Convertir en JSON formaté
        const json = JSON.stringify(chefs, null, 2);

        // Sauvegarder dans un fichier local
        fs.writeFileSync("chefs_export.json", json);

        // Télécharger le fichier
        res.download("chefs_export.json");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//AFFICHER UN CHEF PAR ID (GET)

router.get("/:id", async (req, res) =>{
    try{
        const chef = await Chef.findById(req.params.id);

        if(!chef)return res.status(404).json({ message: "Chef non trouvé" });

        res.status(200).json(chef);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
});

//AFFICHER LES RECETTES D’UN CHEF

router.get("/:id/recettes", async (req, res) =>{
    try{
        const chef = await Chef.findById(req.params.id);

        if(!chef) return res.status(404).json({ message: "Chef non trouvé" });

        res.status(200).json(chef.listerecettes);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
});

//MODIFIER UN CHEF (PUT)

router.put("/:id", async (req, res) => {
    try{
        const chef = await Chef.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if(!chef) return res.status(404).json({ message: "Chef non trouvé" });

        res.status(200).json(chef);
    }catch (error){
        res.status(400).json({ message: error.message });
    }
});

//SUPPRIMER UN CHEF (DELETE)

router.delete("/:id", async (req, res) =>{
    try{
        const chef = await Chef.findByIdAndDelete(req.params.id);

        if(!chef) return res.status(404).json({ message: "Chef non trouvé" });

        res.status(200).json({ message: "Chef supprimé avec succès" });
    }catch (error){
        res.status(500).json({ message: error.message });
    }
});

export default router;
