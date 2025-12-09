import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import recettesRoutes from "./routes/recettesRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour lire le JSON
app.use(express.json());

// Connexion MongoDB
connectDB();

// Routes Recettes
app.use("/api/recettes", recettesRoutes);

// Middleware de gestion d’erreurs
app.use((err, req, res, next) => {
  console.error("❌ Erreur détectée :", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Erreur serveur",
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});

