import { ObjectId } from "mongodb";
import { client } from "../db.js";

function getCollection() {
    const db = client.db(process.env.DB_NAME || "recettesdb");
    return db.collection("avis");
}

export async function creerAvis(idUser, idRecette, note, commentaire) {
    const avis = {
        id_user: new ObjectId(idUser),
        id_recette: new ObjectId(idRecette),
        note: Number(note),
        commentaire,
        date_avis: new Date()
    };

    return await getCollection().insertOne(avis);
}
