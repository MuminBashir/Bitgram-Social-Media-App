const express = require("express");
const {
  createPost,
  likeandUnlikePost,
  deletePost,
} = require("../controllers/post");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);
router
  .route("/post/:id")
  .post(isAuthenticated, likeandUnlikePost)
  .delete(isAuthenticated, deletePost);

module.exports = router;
