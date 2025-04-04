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
        videoUrl: "https://www.youtube.com/watch?v=FP6CLsmL3jQ&t=1s&ab_channel=BernardoFariaBJJFanatics",
        thumbnailUrl: "/images/instructionals/leglock.png"
      },
      
  {
    title: "Destroying the Guard",
    instructor: "Gordon Ryan",
    price: 59.99,
    videoUrl: "https://www.youtube.com/watch?v=OdscGUlottI&ab_channel=BernardoFariaBJJFanatics",
    thumbnailUrl: "/images/instructionals/passing.png"
  },
  {
    title: "50/50 Guard",
    instructor: "Leandro Lo",
    price: 44.99,
    videoUrl: "https://www.youtube.com/watch?v=pX8XYxW9tIg&ab_channel=BJJFanatics",
    thumbnailUrl: "/images/instructionals/leo.png"
  },
  {
    title: "Darce from Anywhere",
    instructor: "Kade Ruotolo",
    price: 39.99,
    videoUrl: "https://www.youtube.com/watch?v=MWMNq8DGHyo&ab_channel=BernardoFariaBJJFanatics",
    thumbnailUrl: "/images/instructionals/kade.png"
  },
  {
    title: "The Triangle Trap",
    instructor: "Craig Jones",
    price: 34.99,
    videoUrl: "https://www.youtube.com/watch?v=xnlx_hNfuZ4&ab_channel=BernardoFariaBJJFanatics",
    thumbnailUrl: "/images/instructionals/jones.png"
  },
  {
    title: "Unstoppable Backtake",
    instructor: "Mica Galvao",
    price: 89.99,
    videoUrl: "https://www.youtube.com/watch?v=SUi3IXit7xo&ab_channel=BernardoFariaBJJFanatics",
    thumbnailUrl: "/images/instructionals/mica.png"
  }
];

const seedDB = async () => {
  await Instructional.deleteMany({});

  try {
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
