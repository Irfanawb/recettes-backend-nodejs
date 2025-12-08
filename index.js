import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import chefRoutes from './db/routes/chefRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connexion MongoDB
connectDB();

app.use('/api/chefs', chefRoutes);

app.listen(PORT, () => {
  console.log("Serveur démarré sur le port");
});
