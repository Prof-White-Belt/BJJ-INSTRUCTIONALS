import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import redirectIfLoggedIn from "../middleware/redirectIfLoggedIn.js";

const router = express.Router();

// GET sign-up page
router.get("/sign-up", redirectIfLoggedIn, (req, res) => {
  res.render("auth/sign-up", { user: req.session.user });
});

// GET sign-in page
router.get("/sign-in", redirectIfLoggedIn, (req, res) => {
  res.render("auth/sign-in", { user: req.session.user });
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
      favorites: [],
    };

    res.redirect("/");
  } catch (err) {
    res.status(400).send("Error creating account");
  }
});

// POST SIGN-IN
router.post("/sign-in", async (req, res) => {
  try {
    const userInDb = await User.findOne({ username: req.body.username });

    if (!userInDb) return res.redirect("/auth/sign-in");

    const validPassword = await bcrypt.compare(req.body.password, userInDb.password);

    if (!validPassword) return res.redirect("/auth/sign-in");

    req.session.user = {
      _id: userInDb._id,
      username: userInDb.username,
      favorites: userInDb.favorites.map((fav) => fav.toString()),
    };

    res.redirect("/home");
  } catch (err) {
    console.log(err);
    res.redirect("/auth/sign-in");
  }
});

// GET LOGOUT
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

export default router;
