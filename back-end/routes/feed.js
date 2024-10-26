const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/feed");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// GET /feed/posts
router.get("/posts", isAuth, feedController.getPosts);
router.get("/post/:postId", isAuth, feedController.getPost);

// PUT /feed/post/:postId
router.put(
  "/post/:postId",
  [
    body("title")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 characters long"),
    body("content")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Content must be at least 5 characters long"),
  ],
  feedController.updatePost // Corrected method name
);

// POST /feed/post
router.post(
  "/post",
  isAuth,
  [
    body("title")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 characters long"),
    body("content")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Content must be at least 5 characters long"),
  ],
  feedController.createPost
);

// DELETE /feed/post
router.delete("/post/:postId", isAuth, feedController.deletePost);

module.exports = router;
