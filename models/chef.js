import mongoose from 'mongoose';

const chefSchema = new mongoose.Schema({

    // Nom du chef
    nom: {
        type: String,
        required: [true, "Le nom du chef est obligatoire."],
        trim: true
    },

    // Prénom du chef
    prenom: {
        type: String,
        required: [true, "Le prénom du chef est obligatoire."],
        trim: true
    },

    // Diplôme / description
    description: {
        type: String,
        required: [true, "La description (diplôme) du chef est obligatoire."],
        trim: true
    },

    // Origines du chef
    origines: {
        type: String,
        required: [true, "L'origine du chef est obligatoire."],
        trim: true
    },

    // Liste des recettes du chef (IDs venant de la collection 'Recette')
    listerecettes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recette'   //ID de recettes
    }]

}, { timestamps: true });

const Chef = mongoose.model('Chef', chefSchema);
export default Chef;