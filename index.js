import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";

// Routes
import chefRoutes from "./routes/chefRoutes.js";
import avisRoutes from "./routes/avisRoutes.js";
import recettesRoutes from "./routes/recettesRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Connexion DB
connectDB();

// Routes
app.use("/api/chefs", chefRoutes);
app.use("/api/avis", avisRoutes);
app.use("/api/recettes", recettesRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
