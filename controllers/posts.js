// controllers/posts.js
import express from "express";
import Post from "../models/post.js";
import { isSignedIn } from "../middleware/isSignedIn.js";

const router = express.Router();

// GET /posts - show all community posts
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("userId", "username rank age").sort({ createdAt: -1 });
  res.render("posts/index.ejs", { posts, user: req.session.user });
});

// GET /posts/new - form to create new post
router.get("/new", isSignedIn, (req, res) => {
  res.render("posts/new.ejs", { user: req.session.user });
});

// POST /posts - create new post
router.post("/", isSignedIn, async (req, res) => {
  await Post.create({
    title: req.body.title,
    body: req.body.body,
    userId: req.session.user._id
  });
  res.redirect("/posts");
});

// GET /posts/:id/edit - edit form (only user’s own)
router.get("/:id/edit", isSignedIn, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.userId.equals(req.session.user._id)) return res.redirect("/posts");
  res.render("posts/edit.ejs", { post, user: req.session.user });
});

// PUT /posts/:id - update post
router.put("/:id", isSignedIn, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.userId.equals(req.session.user._id)) return res.redirect("/posts");

  post.title = req.body.title;
  post.body = req.body.body;
  await post.save();

  res.redirect("/posts");
});

// DELETE /posts/:id - delete post
router.delete("/:id", isSignedIn, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.userId.equals(req.session.user._id)) return res.redirect("/posts");
  await post.deleteOne();
  res.redirect("/posts");
});

export default router;
