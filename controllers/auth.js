import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const router = express.Router();

// GET sign-up page
router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up", { user: req.session.user });
});

// POST sign-up
router.post("/sign-up", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
      age: req.body.age,
      rank: req.body.rank,
      bio: req.body.bio,
    });

    req.session.user = {
      _id: user._id,
      username: user.username,
      favorites: [] // New user has no favorites yet
    };

    res.redirect("/");
  } catch (err) {
    res.status(400).send("Error creating account");
  }
});

// POST sign-in
router.post("/sign-in", async (req, res) => {
  try {
    const userInDb = await User.findOne({ username: req.body.username });

    if (!userInDb) return res.redirect("/");

    const validPassword = await bcrypt.compare(req.body.password, userInDb.password);

    if (!validPassword) return res.redirect("/");

    req.session.user = {
      _id: userInDb._id,
      username: userInDb.username,
      favorites: userInDb.favorites.map(fav => fav.toString()),
    };

    res.redirect("/home");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

// GET logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

export default router;
