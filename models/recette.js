import mongoose from "mongoose";
const ingredientSchema = new mongoose.Schema({
  nom: String,
  quantite: Number,
  unit: String,
  prix: Number
});
const recetteSchema = new mongoose.Schema({
  titre: { type: String},
  description: String,
  ingredients: { type: [ingredientSchema] },
  etape: { type: [String] },
  category: String,
  materiel: [String],
  photoUrl: String,
  chef: { type: mongoose.Schema.Types.ObjectId, ref: "Chef" },
});

const Recette = mongoose.model("Recette", recetteSchema);
export default Recette;