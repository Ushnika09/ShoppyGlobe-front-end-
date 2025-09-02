import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv()

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB successfully ✅");
  } catch (err) {
    console.log("Failed to connect ❌", err);
    process.exit(1); // stop server if DB fails
  }
}

export default connectDb