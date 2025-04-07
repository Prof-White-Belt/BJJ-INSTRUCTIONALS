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

// GET /instructionals/:id – Show unique individual instructional
router.get("/:id", async (req, res) => {
  try {
    const instructional = await Instructional.findById(req.params.id);
    res.render("instructionals/show", { instructional, user: req.session.user });
  } catch (err) {
    console.error("Show error:", err);
    res.status(500).send("Error loading instructional page");
  }
});


export default router;
