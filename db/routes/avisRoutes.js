import express from "express";
import{ client } from "../db.js";
import{ ObjectId } from "mongodb";

const router = express.Router();

function getCollection(){
    const db = client.db(process.env.DB_NAME || "recettesdb");
    return db.collection("avis");
}

//CRÉER UN AVIS
router.post("/", async (req, res) => {
    const { id_user, id_recette, note, commentaire } = req.body;

    if(!id_user || !id_recette || note === undefined || !commentaire){
        return res.status(400).json({ error: "Champs manquants" });
    }

    if(note < 0 || note > 5){
        return res.status(400).json({ error: "La note doit être entre 0 et 5" });
    }

    try{
        const avis ={
            id_user: new ObjectId(id_user),
            id_recette: new ObjectId(id_recette),
            note: Number(note),
            commentaire,
            date_avis: new Date()
        };

        const result = await getCollection().insertOne(avis);
        res.status(201).json({ message: "Avis créé", id: result.insertedId });

    }catch (err){
        res.status(500).json({ error: err.message });
    }
});


//AFFICHER LES AVIS D’UNE RECETTE
router.get("/recette/:id", async (req, res) => {
    try {
        const avis = await getCollection().find({
            id_recette: new ObjectId(req.params.id)
        }).toArray();

        res.json(avis);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//SUPPRIMER UN AVIS
router.delete("/:id", async (req, res) => {
    try {
        const result = await getCollection().deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Avis introuvable" });
        }

        res.json({ message: "Avis supprimé" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//FILTRER LES AVIS PAR NOTE
router.get("/filtre/:note", async (req, res) =>{
    const note = Number(req.params.note);

    if(note < 0 || note > 5){
        return res.status(400).json({ error: "Note invalide" });
    }

    try {
        const avis = await getCollection().find({ note }).toArray();
        res.json(avis);

    }catch (err){
        res.status(500).json({ error: err.message });
    }
});

export default router;
