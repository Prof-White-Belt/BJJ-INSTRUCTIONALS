import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); 

const uri = process.env.MONGO_URI;

mongoose.connect(uri);
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});
