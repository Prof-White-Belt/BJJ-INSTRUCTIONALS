import express from "express";
import User from "../models/user.js";
import Instructional from "../models/Instructional.js";

const router = express.Router();

// GET /users/:userId – show user profile
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("favorites");
    res.render("users/profile", { userProfile: user });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).send("Server error");
  }
});

// GET /users/:id/edit – show edit form
router.get("/:id/edit", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("users/edit", { user });
  } catch (err) {
    console.error("Edit form error:", err);
    res.status(500).send("Error loading edit form");
  }
});

// PUT /users/:id – update user profile
router.put("/:id", async (req, res) => {
  try {
    const { age, rank, bio } = req.body;
    await User.findByIdAndUpdate(req.params.id, { age, rank, bio });
    res.redirect(`/users/${req.params.id}`);
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).send("Error updating profile");
  }
});

// POST /users/:userId/favorites/:instructionalId – add to favorites
router.post("/:userId/favorites/:instructionalId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const instructionalId = req.params.instructionalId;

    if (!user.favorites.includes(instructionalId)) {
      user.favorites.push(instructionalId);
      await user.save();
    }

    res.redirect("/instructionals");
  } catch (err) {
    console.error("Favorite error:", err);
    res.status(500).send("Server error");
  }
});

// DELETE /users/:userId/favorites/:instructionalId – remove from favorites
router.delete("/:userId/favorites/:instructionalId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const instructionalId = req.params.instructionalId;

    user.favorites = user.favorites.filter(
      (favId) => favId.toString() !== instructionalId
    );
    await user.save();

    res.redirect(`/users/${req.params.userId}`);
  } catch (err) {
    console.error("Unfavorite error:", err);
    res.status(500).send("Server error");
  }
});

export default router;
