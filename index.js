import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";

// Routes
import chefRoutes from "./db/routes/chefRoutes.js";
import avisRoutes from "./db/routes/avisRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Connexion MongoDB
connectDB();

// Routes API
app.use("/api/chefs", chefRoutes);
app.use("/api/avis", avisRoutes);

// Port et lancement serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});