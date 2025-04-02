import express from "express";
import Instructional from "../models/Instructional.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const instructionals = await Instructional.find();
    res.render("instructionals/index.ejs", {
      instructionals,
      user: req.session.user
    });
  } catch (err) {
    console.error("Instructionals error:", err);
    res.status(500).send("Server error");
  }
});

export default router;
