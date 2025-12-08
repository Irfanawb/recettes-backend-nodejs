import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connecté !");
  } catch (error) {
    console.log("ERREUR de connexion :", error.message);
    process.exit(1);
  }
};

export default connectDB;
