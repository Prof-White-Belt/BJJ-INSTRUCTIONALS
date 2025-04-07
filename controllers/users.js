import express from "express";
const router = express.Router();

import User from "../models/user.js";
import Instructional from "../models/Instructional.js";

// GET /users/:id/profile – Show Current user's profile
router.get("/:id/profile", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("favorites");
    res.render("users/profile", { userProfile: user });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).send("Server error");
  }
});

// GET /users/:id/edit – Show current user's edit form
router.get("/:id/edit", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("users/edit", { user });
  } catch (err) {
    console.error("Edit form error:", err);
    res.status(500).send("Error loading edit form");
  }
});

// PUT /users/:id – Update current user's profile
router.put("/:id", async (req, res) => {
  try {
    const { age, rank, bio } = req.body;
    await User.findByIdAndUpdate(req.params.id, { age, rank, bio });
    res.redirect(`/users/${req.params.id}/profile`);
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).send("Error updating profile");
  }
});

// POST /users/:userId/favorites/:instructionalId – Add to current user's favorites
router.post("/:userId/favorites/:instructionalId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const instructionalId = req.params.instructionalId;

    if (!user.favorites.includes(instructionalId)) {
      user.favorites.push(instructionalId);
      await user.save();

      // Update session
      if (req.session.user && req.session.user._id === user._id.toString()) {
        req.session.user.favorites = user.favorites.map(fav => fav.toString());
      }
    }

    res.redirect("/instructionals");
  } catch (err) {
    console.error("Favorite error:", err);
    res.status(500).send("Server error");
  }
});

router.delete("/:userId/favorites/:instructionalId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const instructionalId = req.params.instructionalId;

    user.favorites = user.favorites.filter(
      favId => favId.toString() !== instructionalId
    );
    await user.save();

    if (req.session.user && req.session.user._id === user._id.toString()) {
      req.session.user.favorites = user.favorites.map(fav => fav.toString());
    }

    //  Redirects user back to the page they came from
    res.redirect(req.get("Referer") || `/users/${req.params.userId}/profile`);
  } catch (err) {
    console.error("Unfavorite error:", err);
    res.status(500).send("Server error");
  }
});


router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("favorites");
    res.render("users/profile", { userProfile: user });
  } catch (err) {
    console.error("Fallback profile error:", err);
    res.status(500).send("Server error");
  }
});

export default router;
