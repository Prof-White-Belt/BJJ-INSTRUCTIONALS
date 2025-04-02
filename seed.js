import mongoose from "mongoose";
import dotenv from "dotenv";
import Instructional from "./models/Instructional.js";
import "./db/connection.js";

dotenv.config();

const seedInstructionals = [
  {
    title: "Leg Locks Unlocked",
    instructor: "Craig Jones",
    price: 49.99,
    videoUrl: "https://www.youtube.com/watch?v=example1",
    thumbnailUrl: "/images/instructionals/leglock.png"
},
  {
    title: "Passing the Guard",
    instructor: "Gordon Ryan",
    price: 59.99,
    videoUrl: "https://www.youtube.com/watch?v=example2",
    thumbnailUrl: "https://i.imgur.com/mn9UazF.jpg"
  },
  {
    title: "Top Pressure System",
    instructor: "Lucas Lepri",
    price: 44.99,
    videoUrl: "https://www.youtube.com/watch?v=example3",
    thumbnailUrl: "https://i.imgur.com/4AiXzf8.jpeg"
  },
  {
    title: "No-Gi Takedowns",
    instructor: "ADCC Champions",
    price: 39.99,
    videoUrl: "https://www.youtube.com/watch?v=example4",
    thumbnailUrl: "https://i.imgur.com/0XhN9uT.jpeg"
  },
  {
    title: "The Triangle Trap",
    instructor: "Ryan Hall",
    price: 34.99,
    videoUrl: "https://www.youtube.com/watch?v=example5",
    thumbnailUrl: "https://i.imgur.com/BoN9kdC.png"
  },
  {
    title: "Breaking the Closed Guard",
    instructor: "Marcelo Garcia",
    price: 89.99,
    videoUrl: "https://www.youtube.com/watch?v=example6",
    thumbnailUrl: "https://i.imgur.com/8Km9tLL.jpg"
  }
];

const seedDB = async () => {
  try {
    console.log("⏳ Deleting old instructionals...");
    await Instructional.deleteMany({});
    console.log("🚀 Inserting new instructionals...");
    await Instructional.insertMany(seedInstructionals);
    console.log("✅ Instructionals seeded successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
