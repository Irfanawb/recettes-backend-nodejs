import mongoose from "mongoose";

const avisSchema = new mongoose.Schema({
    utilisateur: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },

    recette: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Recette", 
        required: true 
    },

    note: { 
        type: Number, 
        required: true, 
        min: 0, 
        max: 5 
    },

    commentaire: { 
        type: String, 
        default: "" 
    },

    date_avis: { 
        type: Date, 
        default: Date.now 
    }
});

// NOM DE LA COLLECTION : "avis"
const Avis = mongoose.model("Avis", avisSchema);

export default Avis;
