import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // On importe ta connexion BDD
import userRoutes from './routes/userRoutes.js'; // On importe tes routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour comprendre le JSON (très important !)
app.use(express.json());

// 1. On lance la connexion à la base de données
connectDB();

// 2. On configure tes routes
app.use('/api/users', userRoutes);

// 3. On démarre le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});