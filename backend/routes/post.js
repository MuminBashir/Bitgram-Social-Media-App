const express = require("express");
const {
  createPost,
  likeandUnlikePost,
  deletePost,
  getPostOfFollowing,
  updateCaption,
  addComment,
  deleteComment,
  updateComment,
} = require("../controllers/post");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);
router
  .route("/post/:id")
  .post(isAuthenticated, likeandUnlikePost)
  .put(isAuthenticated, updateCaption)
  .delete(isAuthenticated, deletePost);

router.route("/posts").get(isAuthenticated, getPostOfFollowing);
router
  .route("/post/comment/:id")
  .get(isAuthenticated, addComment)
  .delete(isAuthenticated, deleteComment)
  .put(isAuthenticated, updateComment);

module.exports = router;
