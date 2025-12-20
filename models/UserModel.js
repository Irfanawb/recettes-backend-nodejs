import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },          // nom de l'utilisateur
  email: { type: String, required: true },        // email
  listeAvis: [{ type: mongoose.Schema.Types.ObjectId, ref: "Avis" }] // liste des avis
});

const User = mongoose.model("User", userSchema);

export default User;
