// 🌱 Environment + Core
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import methodOverride from "method-override";
import morgan from "morgan";
import session from "express-session";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(path.join(__dirname, 'views', 'partials', 'navbar.ejs'));

// 🌐 DB Connection
import "./db/connection.js";

// ✋ Middleware
import { isSignedIn } from "./middleware/isSignedIn.js";
import { passUserToView } from "./middleware/passUserToView.js";

// 📡 Controllers
import authController from "./controllers/auth.js";
import instructionalController from "./controllers/instructionals.js";
import usersController from "./controllers/users.js";
import postsController from "./controllers/posts.js";
import Post from "./models/post.js"; // Ensure the Post model is imported

const app = express();
const port = process.env.PORT || 3000;

// 🛠️ Middleware Setup
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

//  Custom Middleware
app.use(passUserToView);

//  Public Routes
app.use("/auth", authController);

// 🏠 Landing Page (Only for guests)
app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    res.render("index.ejs", {
      user: req.session.user,
    });
  }
});

// 🏠 Home Dashboard Page (For logged-in users)
app.get("/home", isSignedIn, (req, res) => {
  res.render("home.ejs", { user: req.session.user });
});

// GET /posts - show all community posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'username rank age').sort({ createdAt: -1 });
    console.log(posts); // Log the fetched posts to see if they are being returned
    res.render('posts/index.ejs', { posts: posts, user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading posts');
  }
});

// 🔐 Protected Routes (Only for signed in users)
app.use(isSignedIn);
app.use("/instructionals", instructionalController);
app.use("/users", usersController);
app.use("/posts", postsController);

// 🚀 Start server
app.listen(port, () => {
  console.log(`The express app is running on port ${port}`);
});
