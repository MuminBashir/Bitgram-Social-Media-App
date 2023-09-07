import React, { useEffect, useState } from "react";
import "./Post.css";
import {
  Avatar,
  Button,
  Typography,
  Dialog,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
  EditOutlined,
} from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  deletePost,
  getMyPosts,
  getUserPosts,
  likePost,
  updatePost,
} from "../../Actions/Posts";
import { getPostOfFollowing, loadUser } from "../../Actions/User";
import { User, CommentCard } from "../";

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerId,
  ownerImage,
  ownerName,
  createdAt,
  isAccount = false,
  isUser = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  // For menu form material UI
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { user: getUser } = useSelector((state) => state.getUser);

  const handleLike = async () => {
    setLiked(!liked);
    await dispatch(likePost(postId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else if (isUser) {
      dispatch(getUserPosts(getUser._id));
    } else {
      dispatch(getPostOfFollowing());
    }
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(addComment(postId, commentValue));

    if (isAccount) {
      dispatch(getMyPosts());
    } else if (isUser) {
      dispatch(getUserPosts(getUser._id));
    } else {
      dispatch(getPostOfFollowing());
    }
  };

  const handleEditCaption = (e) => {
    e.preventDefault();
    dispatch(updatePost(captionValue, postId));
    dispatch(getMyPosts());
  };

  const handleDeletePost = async () => {
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
    dispatch(loadUser());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditCaptionClose = () => {
    setCaptionToggle(!captionToggle);
    setAnchorEl(null);
  };
  const handleDeletePostClose = async () => {
    await handleDeletePost();
    setAnchorEl(null);
  };

  useEffect(() => {
    likes.forEach((like) => {
      if (user._id === like._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  return (
    <div className="post">
      <div className="postHeader">
        {isAccount && (
          <Button
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVert />
          </Button>
        )}
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleEditCaptionClose}>
          <EditOutlined style={{ marginRight: "0.5vmax" }} /> Edit Caption
        </MenuItem>
        <MenuItem onClick={handleDeletePostClose}>
          <DeleteOutline style={{ marginRight: "0.5vmax" }} /> Delete Post
        </MenuItem>
      </Menu>

      <img src={postImage} alt="Post" />

      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt={ownerName}
          sx={{ width: "3vmax", height: "3vmax" }}
        />

        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight="700">{ownerName}</Typography>
        </Link>

        <Typography
          fontWeight="100"
          color="rgba(0,0,0,0.582)"
          sx={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>

      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        onClick={() => setLikesUser(!likesUser)}
        disabled={likes.length === 0 ? true : false}
      >
        {likes.length} Likes
      </button>

      <div className="postFooter">
        <Button onClick={handleLike}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>
        <Button>
          <ChatBubbleOutline onClick={() => setCommentToggle(!commentToggle)} />
        </Button>

        <Typography
          variant="caption"
          margin="0 1vmax"
          color="rgba(0,0,0,0.734)"
        >
          {moment(createdAt).startOf("ss").fromNow()}
        </Typography>
      </div>

      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <div className="DialogBox">
          <Typography variant="h4">Liked By</Typography>
          {likes.map((like) => (
            <User
              key={like._id}
              userId={like._id}
              name={like.name}
              avatar={like.avatar.url}
            />
          ))}
        </div>
      </Dialog>
      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="DialogBox">
          <Typography variant={isSmallScreen ? "h6" : "h4"}>
            Comments
          </Typography>

          <form className="commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Comment Here..."
              required
            />

            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>

          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard
                key={comment._id}
                userId={comment.user._id}
                name={comment.user.name}
                avatar={comment.user.avatar.url}
                comment={comment.comment}
                commentId={comment._id}
                postId={postId}
                isAccount={isAccount}
                isUser={isUser}
              />
            ))
          ) : (
            <Typography>No Comments Yet</Typography>
          )}
        </div>
      </Dialog>
      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="EditDialogBox">
          <Typography variant={isSmallScreen ? "h6" : "h4"}>Edit Caption</Typography>

          <form className="editForm" onSubmit={handleEditCaption}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Caption..."
              required
            />

            <Button type="submit" variant="contained">
              Edit
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
