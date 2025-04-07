// controllers/posts.js
import express from "express";
import Post from "../models/post.js";
import { isSignedIn } from "../middleware/isSignedIn.js";

const router = express.Router();

// GET /posts - show ALL community posts
router.get("/", async (req, res) => {
  try {
    // Fetch the posts from the database, populate the 'userId' field with user details
    const posts = await Post.find().populate('userId', 'username rank age').sort({ createdAt: -1 });
    res.render("posts/index.ejs", { posts, user: req.session.user }); // Passing posts and user to the view
  } catch (error) {
    console.error("Error loading posts", error);
    res.status(500).send("Error loading posts");
  }
});

// GET /posts/new - Form to create a new post
router.get("/new", isSignedIn, (req, res) => {
  res.render("posts/new.ejs", { user: req.session.user });
});

// POST /posts - Create a new post
router.post("/", isSignedIn, async (req, res) => {
  await Post.create({
    title: req.body.title,
    body: req.body.body,
    userId: req.session.user._id
  });
  res.redirect("/posts");
});

// GET /posts/:id/edit - Edit form (only current user)
router.get("/:id/edit", isSignedIn, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.userId.equals(req.session.user._id)) return res.redirect("/posts");
  res.render("posts/edit.ejs", { post, user: req.session.user });
});

// PUT /posts/:id - Update current users post
router.put("/:id", isSignedIn, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.userId.equals(req.session.user._id)) return res.redirect("/posts");

  post.title = req.body.title;
  post.body = req.body.body;
  await post.save();

  res.redirect("/posts");
});

// DELETE /posts/:id - Delete current user post
router.delete("/:id", isSignedIn, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.userId.equals(req.session.user._id)) return res.redirect("/posts");
  await post.deleteOne();
  res.redirect("/posts");
});

export default router;
