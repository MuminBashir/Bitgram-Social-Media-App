const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary");

exports.createPost = async (req, res) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "Bitgram_posts",
    });
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: req.user._id,
    };

    const newPost = await Post.create(newPostData);

    const user = await User.findById(req.user._id);

    user.posts.unshift(newPost._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Post uploaded successfully!",
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
      await cloudinary.v2.uploader.destroy(post.image.public_id);
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
    const otherUser = await User.findById(post.owner);
    const loggedUser = await User.findById(req.user._id);

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

      for (let i = 0; i < otherUser.notifications.length; i++) {
        if (
          otherUser.notifications[i].notification ===
            `${loggedUser.name} has liked your post` &&
          otherUser.notifications[i].post.toString() === post._id.toString()
        ) {
          otherUser.notifications.splice(i, 1);
        }
      }

      await otherUser.save();

      return res.status(200).json({
        success: true,
        message: "Post Unliked",
      });
    } else {
      post.likes.push(req.user._id);
      await post.save();

      if (otherUser.notifications.length === 20) {
        otherUser.notifications.pop();
      }

      otherUser.notifications.unshift({
        user: loggedUser._id,
        notification: `${loggedUser.name} has liked your post`,
        post: post._id,
      });

      await otherUser.save();

      return res.status(200).json({
        success: true,
        message: "Post liked",
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

exports.getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    let posts = [];
    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    let posts = [];
    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts: posts,
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
    let post = await Post.findById(req.params.id);
    const otherUser = await User.findById(post.owner);
    const loggedUser = await User.findById(req.user._id);

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

    post.comments.unshift({
      user: req.user._id,
      comment: req.body.comment,
    });

    await post.save();

    post = await Post.findById(req.params.id);
    const lastComment = post.comments[0]._id.toString();

    otherUser.notifications.unshift({
      user: loggedUser._id,
      notification: `${loggedUser.name} has commented on your post *${req.body.comment}*`,
      post: post._id,
      comment: lastComment,
    });

    await otherUser.save();

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
    const otherUser = await User.findById(post.owner);

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
          for (let i = 0; i < otherUser.notifications.length; i++) {
            if (otherUser.notifications[i].comment === req.body.commentId) {
              otherUser.notifications.splice(i, 1);
            }
          }
          return post.comments.splice(index, 1);
        }
      });

      await otherUser.save();
      await post.save();

      return res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
      });
    } else {
      let commentFound = false;
      post.comments.forEach(async (item, index) => {
        if (
          item.user.toString() === req.user._id.toString() &&
          item._id.toString() === req.body.commentId
        ) {
          for (let i = 0; i < otherUser.notifications.length; i++) {
            if (otherUser.notifications[i].comment === req.body.commentId) {
              otherUser.notifications.splice(i, 1);
            }
          }
          commentFound = true;
          return post.comments.splice(index, 1);
        }
      });

      if (commentFound) {
        await otherUser.save();
        await post.save();
        return res.status(200).json({
          success: true,
          message: "Comment deleted successfully",
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
    const otherUser = await User.findById(post.owner);
    const loggedUser = await User.findById(req.user._id);

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
        for (let i = 0; i < otherUser.notifications.length; i++) {
          if (otherUser.notifications[i].comment === req.body.commentId) {
            otherUser.notifications[
              i
            ].notification = `${loggedUser.name} has commented on your post *${req.body.comment}*`;
          }
        }
        commentFound = true;
        item.comment = req.body.comment;
      }
    });

    if (commentFound) {
      await post.save();
      await otherUser.save();

      return res.status(200).json({
        success: true,
        message: "Comment updated successfully!",
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
