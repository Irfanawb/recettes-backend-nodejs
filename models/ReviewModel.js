import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    // Qui a écrit l'avis ? (Lien vers User)
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Sur quelle recette ? (Lien vers Recipe)
    recettes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },
    // La note sur 5
    note: {
        type: Number,
        required: [true, "La note est obligatoire."],
        min: 1, 
        max: 5 
    },
    // Le commentaire texte
    commentaire: {
        type: String,
        trim: true
    }
}, {
    timestamps: true 
});

// Le 3ème argument 'avis' force le nom de la collection
const Review = mongoose.model('Review', reviewSchema, 'avis');
export default Review;