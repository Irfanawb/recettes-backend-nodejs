import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
export const client = new MongoClient(uri);

export async function connectDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB connecté");
  } catch (err) {
    console.error("❌ Erreur Mongo :", err.message);
  }
}
