import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addComment, likePost } from "../../Actions/Posts";
import { getPostOfFollowing } from "../../Actions/User";
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
  isDelete = false,
  isAccount = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const handleLike = async () => {
    setLiked(!liked);
    await dispatch(likePost(postId));

    if (isAccount) {
    } else {
      dispatch(getPostOfFollowing());
    }
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(addComment(postId, commentValue));

    if (isAccount) {
    } else {
      dispatch(getPostOfFollowing());
    }
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
          <Button>
            <MoreVert />
          </Button>
        )}
      </div>

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
        {isDelete && (
          <Button>
            <DeleteOutline />
          </Button>
        )}
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
          <Typography variant="h4">Comments</Typography>

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
            comments
              .toReversed()
              .map((comment) => (
                <CommentCard
                  key={comment._id}
                  userId={comment.user._id}
                  name={comment.user.name}
                  avatar={comment.user.avatar.url}
                  comment={comment.comment}
                  commentId={comment._id}
                  postId={postId}
                  isAccount={isAccount}
                />
              ))
          ) : (
            <Typography>No Comments Yet</Typography>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
