import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    // Le nom est obligatoire
    nom: {
        type: String,
        required: [true, "Le nom d'utilisateur est obligatoire."],
        trim: true
    },
    // L'email doit être unique et valide
    email: {
        type: String,
        required: [true, "L'email est obligatoire."],
        unique: true, 
        lowercase: true,
        trim: true,
        validate: { 
            // On utilise le module 'validator' qu'on a installé
            validator: (value) => validator.isEmail(value),
            message: props => `${props.value} n'est pas un email valide !`
        }
    },
    // Liste des avis laissés par l'utilisateur (référence vers Review)
    listeavis: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, {
    timestamps: true // Ajoute automatiquement la date de création
});

const User = mongoose.model('User', userSchema);
export default User;