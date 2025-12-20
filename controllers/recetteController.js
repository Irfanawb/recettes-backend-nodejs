import Recette from "../models/recette.js";
import mongoose from "mongoose";
import Chef from "../models/ChefModel.js";
import fs from "fs";

export const createRecipe = async (req, res, next) => {
  try {
    const { chefId, ...data } = req.body;  //sépare chefId du reste des données

    console.log("Données reçues pour la création de recette :", req.body);

    let chef = null;

    // Si un chefId est fourni, on vérifie qu'il est valide et que le chef existe
    if (chefId) {
      if (!mongoose.Types.ObjectId.isValid(chefId)) {
        return res.status(400).json({ message: "ID de chef invalide" });
      }

      chef = await Chef.findById(chefId);
      if (!chef) {
        return res.status(404).json({ message: "Chef introuvable" });
      }
    }

    //création la recette en liant le chef si présent
    const newRecette = new Recette({
      ...data,                 // titre, description, ingredients, etape, etc.
      chef: chef ? chef._id : null
    });

    const savedRecette = await newRecette.save();

    //Si un chef était fourni, on ajoute l'id de la recette dans listerecettes
   if (chef) {
  await Chef.findByIdAndUpdate(
    chef._id,
    { $push: { listerecettes: savedRecette._id } }
  );
}

    res.status(201).json(savedRecette);
  } catch (err) {
    next(err);
  }
};

export const getRecipes = async (req, res, next) => {
  try {
    const recettes = await Recette.aggregate([
      {
        $lookup: {
          from: "chefs",       // nom de la collection Chef en base
          localField: "chef",  // champ dans Recette
          foreignField: "_id", // champ dans Chef
          as: "chef"
        }
      },
      {
        $unwind: {
          path: "$chef",
          preserveNullAndEmptyArrays: true // garde les recettes sans chef
        }
      },
      {
        $project: {
          titre: 1,
          description: 1,
          category: 1,
          ingredients: 1,
          etape: 1,
          "chefNom": "$chef.nom",
          "chefPrenom": "$chef.prenom",
        }
      }
    ]);

    res.status(200).json(recettes);
  } catch (err) {
    next(err);
  }
};

//Récupération des recettes par categorie
export const getRecipesStatsByCategory = async (req, res, next) => {
  try {
    const stats = await Recette.aggregate([
      {
        $group: {
          _id: "$category",
          totalRecettes: { $sum: 1 },
          recettes: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          totalRecettes: 1,
          recettes: {
            $map: {
              input: "$recettes",
              as: "recipe",
              in: {
                titre: "$$recipe.titre",
                description: "$$recipe.description",
                ingredients: "$$recipe.ingredients",
                etape: "$$recipe.etape",
                category: "$$recipe.category",
                materiel: "$$recipe.materiel",
                photoUrl: "$$recipe.photoUrl",
                chef: "$$recipe.chef",
                createdAt: "$$recipe.createdAt"
              }
            }
          }
        }
      }
    ]);
    res.status(200).json(stats);
  } catch (err) {
    next(err);
  }
};

//Mise à jour de recette
export const updateRecipe = async (req, res, next) => {
  try {
     
     const recette = await Recette.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(recette);
  } catch (err) {
    next(err);
  }
};
//Infos du chef à partir de l'id de la recette 
export const getChefByRecipe = async (req, res, next) => {
  try {
    const recetteId = req.params.id;

    // Sécuriser l'ObjectId
    if (!mongoose.Types.ObjectId.isValid(recetteId)) {
      return res.status(400).json({ message: "ID de recette invalide" });
    }

    const result = await Recette.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(recetteId) }
      },
      {
        $lookup: {
          from: "chefs",
          localField: "chef",
          foreignField: "_id",
          as: "chef"
        }
      },
      {
        $unwind: {
          path: "$chef",
          preserveNullAndEmptyArrays: false
        }
      },
      {
        $project: {
          _id: 0,
          chef: 1
        }
      }
    ]);

    if (!result.length) {
      return res.status(404).json({ message: "Recette ou chef introuvable" });
    }

    res.status(200).json(result[0].chef);
  } catch (err) {
    next(err);
  }
};

export const exportRecipesAsJSON = async (req, res, next) => {
  try {
    const recettes = await Recette.find().populate("chef");

    fs.writeFileSync("./data/recettes.json", JSON.stringify(recettes, null, 2));

    res.json({
      message: "Fichier JSON exporté dans /data/recettes.json",
      count: recettes.length
    });

  } catch (err) {
    next(err);
  }
};