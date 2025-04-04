import mongoose from "mongoose";

const instructionalSchema = new mongoose.Schema({
  title: String,
  instructor: String,
  price: Number,
  thumbnailUrl: String,
  videoUrl: String 
});

const Instructional = mongoose.model("Instructional", instructionalSchema);
export default Instructional;
