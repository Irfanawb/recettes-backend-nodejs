import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";

// ✅ Routes
import avisRoutes from "./db/routes/avisRoutes.js";
// (tu pourras ajouter usersRoutes plus tard si tu veux)

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Connexion MongoDB AU DÉMARRAGE
await connectDB();

// ✅ Routes existantes
app.use("/api/avis", avisRoutes);

// ✅ Port
const PORT = process.env.PORT || 3000;

// ✅ Lancement du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
