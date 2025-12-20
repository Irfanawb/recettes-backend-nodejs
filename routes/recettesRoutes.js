// routes/recettesRoutes.js
import express from "express";
import { createRecipe,getRecipes,getRecipesStatsByCategory,updateRecipe,getChefByRecipe,exportRecipesAsJSON } from "../controllers/recetteController.js";

const router = express.Router();

// Simple route GET pour tester
router.get("/test", (req, res) => {
  res.send("yessssss")
  res.json({ message: "Route GET /api/recettes/test OK" });
});

// Route POST pour créer une recette
router.post("/creer", createRecipe);
// Route GET pour récupérer toutes les recettes
router.get("/liste", getRecipes);
//Route GET pour récupérer les stats des recettes par catégorie
router.get("/stats/categories", getRecipesStatsByCategory);
//Route pour la mise à jour 
router.patch("/modifier/:id", updateRecipe);
//Infos du chef à partir de l'id de la recette
router.get("/chef/:id", getChefByRecipe);
//Export JSON de toutes les recettes avec infos des chefs
router.get("/export/json", exportRecipesAsJSON);
export default router;
