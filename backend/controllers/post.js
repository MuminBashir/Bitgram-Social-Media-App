const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async (req, res) => {
  try {
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: "req.body.public_id",
        url: "req.body.url",
      },
      owner: req.user._id,
    };

    const newPost = await Post.create(newPostData);

    const user = await User.findById(req.user._id);

    user.posts.push(newPost._id);
    await user.save();

    res.status(201).json({
      success: true,
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      await post.deleteOne();

      const user = await User.findById(req.user._id);
      const index = user.posts.indexOf(req.params.id);
      user.posts.splice(index, 1);
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Post deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCaption = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      post.caption = req.body.caption;
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Post updated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.likeandUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);
      post.likes.splice(index, 1);
      await post.save();

      return res.status(200).json({
        success: true,
        messagae: "Post Unliked",
      });
    } else {
      post.likes.push(req.user._id);
      await post.save();

      return res.status(200).json({
        success: true,
        messagae: "Post liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPostOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = await Post.find({
      owner: { $in: user.following },
    }).populate("owner likes comments.user");

    res.status(200).json({
      success: true,
      posts: posts.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (!req.body.comment) {
      return res.status(400).json({
        success: false,
        message: "Comment can't be blank",
      });
    }

    post.comments.push({
      user: req.user._id,
      comment: req.body.comment,
    });

    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (req.body.commentId == undefined) {
      return res.status(400).json({
        success: false,
        message: "Comment id required",
      });
    }

    if (post.owner.toString() === req.user._id.toString()) {
      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Selected comment was deleted successfully",
      });
    } else {
      let commentFound = false;
      post.comments.forEach(async (item, index) => {
        if (
          item.user.toString() === req.user._id.toString() &&
          item._id.toString() === req.body.commentId
        ) {
          commentFound = true;
          return post.comments.splice(index, 1);
        }
      });

      if (commentFound) {
        await post.save();
        return res.status(200).json({
          success: true,
          message: "Your comment was deleted successfully",
        });
      } else {
        await post.save();
        return res.status(404).json({
          success: false,
          message: "You cannot delete this comment",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (req.body.commentId == undefined) {
      return res.status(400).json({
        success: false,
        message: "Comment id required",
      });
    }

    if (req.body.comment == undefined) {
      return res.status(400).json({
        success: false,
        message: "Comment can't be blank",
      });
    }

    let commentFound = false;

    post.comments.forEach(async (item) => {
      if (item._id.toString() === req.body.commentId) {
        commentFound = true;
        item.comment = req.body.comment;
      }
    });

    if (commentFound) {
      await post.save();

      return res.status(200).json({
        success: true,
        message: "Your comment was updated successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "You cannot edit this comment",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
