import mongoose from "mongoose";
import dotenv from "dotenv";
import Instructional from "./models/Instructional.js";
import "./db/connection.js";

dotenv.config();

const seedInstructionals = [
    {
        title: "Mikey Lock",
        instructor: "Mikey Musumeci",
        price: 49.99,
        videoUrl: "https://www.youtube.com/watch?v=FP6CLsmL3jQ&ab_channel=BernardoFariaBJJFanatics",
        thumbnailUrl: "/images/instructionals/leglock.png"
      },
      
  {
    title: "Destroying the Guard",
    instructor: "Gordon Ryan",
    price: 59.99,
    videoUrl: "https://www.youtube.com/watch?v=example2",
    thumbnailUrl: "/images/instructionals/passing.png"
  },
  {
    title: "Top Pressure System",
    instructor: "Leandro Lo",
    price: 44.99,
    videoUrl: "https://www.youtube.com/watch?v=example3",
    thumbnailUrl: "/images/instructionals/leo.png"
  },
  {
    title: "Darce from Anywhere",
    instructor: "Kade Ruotolo",
    price: 39.99,
    videoUrl: "https://www.youtube.com/watch?v=example4",
    thumbnailUrl: "/images/instructionals/kade.png"
  },
  {
    title: "The Triangle Trap",
    instructor: "Craig Jones",
    price: 34.99,
    videoUrl: "https://www.youtube.com/watch?v=example5",
    thumbnailUrl: "/images/instructionals/jones.png"
  },
  {
    title: "Unstoppable Backtake",
    instructor: "Mica Galvao",
    price: 89.99,
    videoUrl: "https://www.youtube.com/watch?v=example6",
    thumbnailUrl: "/images/instructionals/mica.png"
  }
];

const seedDB = async () => {
  try {
    console.log("⏳ Deleting old instructionals...");
    await Instructional.deleteMany({});
    console.log(" Inserting new instructionals...");
    await Instructional.insertMany(seedInstructionals);
    console.log(" Instructionals seeded successfully!");
  } catch (err) {
    console.error(" Seeding failed:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
