import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Charge les infos du fichier .env

const connectDB = async () => {
    try {
        // On se connecte avec l'adresse stockée dans .env
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connexion à MongoDB Atlas réussie !');
    } catch (error) {
        console.error('❌ ERREUR de connexion :', error.message);
        process.exit(1); 
    }
};

export default connectDB;