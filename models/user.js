import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  age: Number,
  rank: String,
  bio: String,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Instructional" }]
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
